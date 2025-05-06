// bitwise.d.ts

export type BitwiseType = "bigint" | "number";

export interface Bitwise {
	and(a: number | bigint, b: number | bigint, prefer?: BitwiseType): number | bigint;
	or(a: number | bigint, b: number | bigint, prefer?: BitwiseType): number | bigint;
	xor(a: number | bigint, b: number | bigint, prefer?: BitwiseType): number | bigint;
	not(a: number | bigint): number | bigint;
	leftShift(a: number | bigint, bits?: number | bigint): number | bigint;
	rightShift(a: number | bigint, bits?: number | bigint): number | bigint;
	zeroFillRightShift(a: number, bits?: number): number;
}

export const bitwise: Bitwise;
