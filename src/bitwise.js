/**
 * 将十进制数字转为二进制字符串（支持最大 64 位）
 * @param {number} num - 十进制数字
 * @param {number} length - 二进制字符串的长度
 * @returns {string} 二进制字符串（无前导0）
 */
function toBinaryString(num, length = 64) {
	if (num === 0) return "0".repeat(length);
	let binary = "";
	let isNegative = num < 0;
	if (isNegative) num = Math.abs(num);

	while (num > 0) {
		binary = (num % 2) + binary;
		num = Math.floor(num / 2);
	}

	if (isNegative) {
		// 补码表示负数
		binary = binary.padStart(length, "0");
		binary = binary
			.split("")
			.map((bit) => (bit === "0" ? "1" : "0"))
			.join("");
		binary = (parseInt(binary, 2) + 1).toString(2).padStart(length, "0");
	}

	return binary.padStart(length, "0");
}

/**
 * 对两个二进制字符串逐位运算（自动对齐长度）
 * @param {string} a - 第一个二进制字符串
 * @param {string} b - 第二个二进制字符串
 * @param {(bitA: number, bitB: number) => number} op - 位运算函数
 * @returns {string} 结果二进制字符串
 */
function bitwiseOp(a, b, op) {
	const maxLength = Math.max(a.length, b.length);
	const aPadded = a.padStart(maxLength, "0");
	const bPadded = b.padStart(maxLength, "0");
	let result = "";
	for (let i = 0; i < maxLength; i++) {
		const bitA = parseInt(aPadded[i], 2);
		const bitB = parseInt(bPadded[i], 2);
		result += op(bitA, bitB);
	}
	return result;
}

/**
 * 将一个 64 位的二进制字符串（有符号）转换为十进制整数。
 * 支持负数的二进制补码表示。
 * @param {string} binaryStr - 一个长度为 64 的二进制字符串
 * @returns {number} 对应的十进制整数（带符号）
 */
function binaryToDecimal(binaryStr) {
	const isNegative = binaryStr[0] === "1";

	if (!isNegative) {
		// 正数：直接解析
		return parseInt(binaryStr, 2);
	} else {
		// 负数：按补码处理
		// 先取反
		const inverted = binaryStr
			.split("")
			.map((bit) => (bit === "0" ? "1" : "0"))
			.join("");

		// 然后加 1
		const decimal = parseInt(inverted, 2) + 1;

		return -decimal;
	}
}

/**
 * 64 位按位与
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function bitwiseAND(a, b) {
	const aBinary = toBinaryString(a, 64);
	const bBinary = toBinaryString(b, 64);
	const resultBinary = bitwiseOp(aBinary, bBinary, (bitA, bitB) => bitA & bitB);
	return binaryToDecimal(resultBinary);
}

/**
 * 64 位按位或
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function bitwiseOR(a, b) {
	const aBinary = toBinaryString(a, 64);
	const bBinary = toBinaryString(b, 64);
	const resultBinary = bitwiseOp(aBinary, bBinary, (bitA, bitB) => bitA | bitB);
	return binaryToDecimal(resultBinary);
}

/**
 * 64 位按位异或
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function bitwiseXOR(a, b) {
	const aBinary = toBinaryString(a, 64);
	const bBinary = toBinaryString(b, 64);
	const resultBinary = bitwiseOp(aBinary, bBinary, (bitA, bitB) => bitA ^ bitB);
	return binaryToDecimal(resultBinary);
}

/**
 * 64 位按位取反
 * @param {number} a
 * @returns {number}
 */
export function bitwiseNOT(a) {
	const binary = toBinaryString(a, 64);
	let inverted = "";
	for (const bit of binary) {
		inverted += bit === "0" ? "1" : "0";
	}
	return binaryToDecimal(inverted);
}

/**
 * 64 位左移
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function leftShift(a, b) {
	const binary = toBinaryString(a, 64);
	const shifted = binary.slice(b).padEnd(64, "0");
	return binaryToDecimal(shifted);
}

/**
 * 64 位右移（带符号）
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function rightShift(a, b) {
	const binary = toBinaryString(a, 64);
	const shifted = binary
		.padStart(64, binary[0])
		.slice(0, 64 - b)
		.padStart(64, binary[0]);
	return binaryToDecimal(shifted);
}

/**
 * 64 位无符号右移
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function unsignedRightShift(a, b) {
	const binary = toBinaryString(a, 64);
	const shifted = binary.slice(0, 64 - b).padStart(64, "0");
	return binaryToDecimal(shifted);
}
