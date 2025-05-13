import { bitwiseAND, bitwiseOR, bitwiseXOR, bitwiseNOT, leftShift, rightShift, unsignedRightShift } from "./bitwise.js";

/**
 * Clean the input to ensure it is an integer (truncate `Number`, keep `BigInt`)
 * @param {number|bigint} value
 * @returns {number|bigint}
 */
function cleanInput(value) {
	if (typeof value === "bigint") return value;
	if (typeof value === "number" && !Number.isNaN(value) && Number.isFinite(value)) return Math.trunc(value);
	if (typeof value === "string") return cleanInput(Number(value));
	throw new TypeError("Input must be either number or bigint");
}

/**
 * Convert two values to the same type
 * @param {number|bigint} a
 * @param {number|bigint} b
 * @returns {[number|bigint, number|bigint, boolean]} [a, b, isBigInt]
 */
function toSameType(a, b) {
	a = cleanInput(a);
	b = cleanInput(b);
	const isA_BigInt = typeof a === "bigint";
	const isB_BigInt = typeof b === "bigint";

	if (isA_BigInt || isB_BigInt) return [isA_BigInt ? a : BigInt(a), isB_BigInt ? b : BigInt(b), true];
	return [a, b, false];
}

export const bitwise = {
	and(a, b) {
		const [x, y] = toSameType(a, b);

		if (typeof x === "bigint") {
			return x & y;
		}

		return bitwiseAND(x, y);
	},
	or(a, b) {
		const [x, y] = toSameType(a, b);

		if (typeof x === "bigint") {
			return x | y;
		}

		return bitwiseOR(x, y);
	},
	xor(a, b) {
		const [x, y] = toSameType(a, b);

		if (typeof x === "bigint") {
			return x ^ y;
		}

		return bitwiseXOR(x, y);
	},
	not(a) {
		const [x] = toSameType(a, 0);

		if (typeof x === "bigint") {
			return ~x;
		}

		return bitwiseNOT(x);
	},
	leftShift(a, bits = 1) {
		const [x, y] = toSameType(a, bits);

		if (typeof x === "bigint") {
			return x << BigInt(y);
		}

		return leftShift(x, y);
	},
	rightShift(a, bits = 1) {
		const [x, y] = toSameType(a, bits);

		if (typeof x === "bigint") {
			return x >> BigInt(y);
		}

		return rightShift(x, y);
	},
	zeroFillRightShift(a, bits = 1) {
		const [x, y] = toSameType(a, bits);

		if (typeof x === "bigint") {
			throw new Error("BigInt does not support unsigned right shift (>>>)");
		}

		return unsignedRightShift(x, y);
	},
};
