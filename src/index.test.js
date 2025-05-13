import assert from "node:assert";
import test, { describe } from "node:test";

import { bitwise } from "./index.js";

describe("bitwise.js", () => {
	test("AND", () => {
		assert.strictEqual(bitwise.and(5, 3), 1, "5 & 3 should be 1");
		assert.strictEqual(bitwise.and(5.9, 3.2), 1, "5.9 & 3.2 should be 1");
		assert.strictEqual(bitwise.and(5n, 3), 1n, "5n & 3 should be 1n");
		assert.strictEqual(bitwise.and(10, -3), 8, "10 & -3 should be 8");
	});

	test("OR", () => {
		assert.strictEqual(bitwise.or(5, 3), 7, "5 | 3 should be 7");
		assert.strictEqual(bitwise.or(5.9, 3.2), 7, "5.9 | 3.2 should be 7");
		assert.strictEqual(bitwise.or(5n, 3), 7n, "5n | 3 should be 7n");
	});

	test("XOR", () => {
		assert.strictEqual(bitwise.xor(5, 3), 6, "5 ^ 3 should be 6");
		assert.strictEqual(bitwise.xor(5.9, 3.2), 6, "5.9 ^ 3.2 should be 6");
		assert.strictEqual(bitwise.xor(5n, 3), 6n, "5n ^ 3 should be 6n");
	});

	test("NOT", () => {
		assert.strictEqual(bitwise.not(5), -6, "~5 should be -6");
		assert.strictEqual(bitwise.not(5.9), -6, "~5.9 should be -6");
		assert.strictEqual(bitwise.not(2), -3, "~2 should be -3");
	});

	test("Left Shift", () => {
		assert.strictEqual(bitwise.leftShift(3, 2), 12, "3 << 2 should be 12");
		assert.strictEqual(bitwise.leftShift(3.9, 2), 12, "3.9 << 2 should be 12");
		assert.strictEqual(bitwise.leftShift(3n, 2), 12n, "3n << 2 should be 12n");
	});

	test("Right Shift", () => {
		assert.strictEqual(bitwise.rightShift(5, 1), 2, "5 >> 1 should be 2");
		assert.strictEqual(bitwise.rightShift(5.9, 1), 2, "5.9 >> 1 should be 2");
		assert.strictEqual(bitwise.rightShift(5n, 1), 2n, "5n >> 1 should be 2n");
	});

	test("Zero-fill Right Shift", () => {
		assert.strictEqual(bitwise.zeroFillRightShift(5, 1), 2, "5 >>> 1 should be 2");
		assert.throws(
			() => bitwise.zeroFillRightShift(5n, 1),
			{
				name: "Error",
				message: "BigInt does not support unsigned right shift (>>>)",
			},
			"BigInt should throw error on >>> operation"
		);
	});
});

describe("32 bits integer oversize", () => {
	test("AND", () => {
		assert.strictEqual(bitwise.and(1, 8589934592), 0, "1 & 8589934592 should be 0");
	});

	test("OR", () => {
		assert.strictEqual(bitwise.or(1, 8589934592), 8589934593, "1 | 8589934592 should be 8589934593");
	});

	test("NOT", () => {
		assert.strictEqual(bitwise.not(8589934592), -8589934593, "~8589934592 should be -8589934593");
	});

	test("XOR", () => {
		assert.strictEqual(bitwise.xor(1, 8589934592), 8589934593, "1 ^ 8589934592 should be 8589934593");
	});

	test("Left Shift", () => {
		assert.strictEqual(bitwise.leftShift(1, 33), 8589934592, "1 << 33 should be 8589934592");
	});

	test("Right Shift", () => {
		assert.strictEqual(bitwise.rightShift(8589934592, 33), 1, "8589934592 >> 33 should be 1");
	});

	test("Zero-fill Right Shift", () => {
		assert.strictEqual(bitwise.zeroFillRightShift(8589934592, 33), 1, "8589934592 >>> 33 should be 1");
	});
});
