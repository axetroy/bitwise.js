// bitwise.js

/**
 * @typedef {'bigint' | 'number'} BitwiseType
 */

/**
 * Clean the input to ensure it is an integer (truncate `Number`, keep `BigInt`)
 * @param {number|bigint} value
 * @returns {number|bigint}
 */
function cleanInput(value) {
	if (typeof value === "bigint") return value;
	if (typeof value === "number") return Math.trunc(value);
	throw new TypeError("Input must be either number or bigint");
}

/**
 * Convert two values to the same type
 * @param {number|bigint} a
 * @param {number|bigint} b
 * @param {BitwiseType} [prefer='bigint']
 * @returns {[number|bigint, number|bigint, boolean]} [a, b, isBigInt]
 */
function toSameType(a, b, prefer = "bigint") {
	a = cleanInput(a);
	b = cleanInput(b);
	const isA_BigInt = typeof a === "bigint";
	const isB_BigInt = typeof b === "bigint";

	if (isA_BigInt && isB_BigInt) return [a, b, true];
	if (!isA_BigInt && !isB_BigInt) return [a, b, false];

	if (prefer === "bigint") return [BigInt(a), BigInt(b), true];
	if (prefer === "number") return [Number(a), Number(b), false];

	throw new Error("prefer parameter must be 'bigint' or 'number'");
}

/**
 * @type {{
 *   and: (a: number|bigint, b: number|bigint, prefer?: BitwiseType) => number|bigint,
 *   or: (a: number|bigint, b: number|bigint, prefer?: BitwiseType) => number|bigint,
 *   xor: (a: number|bigint, b: number|bigint, prefer?: BitwiseType) => number|bigint,
 *   not: (a: number|bigint) => number|bigint,
 *   leftShift: (a: number|bigint, bits?: number|bigint) => number|bigint,
 *   rightShift: (a: number|bigint, bits?: number|bigint) => number|bigint,
 *   zeroFillRightShift: (a: number, bits?: number) => number,
 * }}
 */
export const bitwise = {
	and(a, b, prefer = "bigint") {
		const [x, y] = toSameType(a, b, prefer);
		return x & y;
	},
	or(a, b, prefer = "bigint") {
		const [x, y] = toSameType(a, b, prefer);
		return x | y;
	},
	xor(a, b, prefer = "bigint") {
		const [x, y] = toSameType(a, b, prefer);
		return x ^ y;
	},
	not(a) {
		a = cleanInput(a);
		return ~a;
	},
	leftShift(a, bits = 1) {
		a = cleanInput(a);
		bits = cleanInput(bits);
		return typeof a === "bigint" ? a << BigInt(bits) : a << bits;
	},
	rightShift(a, bits = 1) {
		a = cleanInput(a);
		bits = cleanInput(bits);
		return typeof a === "bigint" ? a >> BigInt(bits) : a >> bits;
	},
	zeroFillRightShift(a, bits = 1) {
		a = cleanInput(a);
		bits = cleanInput(bits);
		if (typeof a === "bigint") {
			throw new Error("BigInt does not support unsigned right shift (>>>)");
		}
		return a >>> bits;
	},
};
