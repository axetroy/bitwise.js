// bitwise.d.ts

export type BitwiseType = "bigint" | "number";

export interface Bitwise {
	and<T extends number | bigint>(a: T, b: T): T extends bigint ? bigint : number;
	or<T extends number | bigint>(a: T, b: T): T extends bigint ? bigint : number;
	xor<T extends number | bigint>(a: T, b: T): T extends bigint ? bigint : number;
	not<T extends number | bigint>(a: T): T;
	leftShift<T extends number | bigint>(a: T, bits?: T): T extends bigint ? bigint : number;
	rightShift<T extends number | bigint>(a: T, bits?: T): T extends bigint ? bigint : number;
	zeroFillRightShift(a: number, bits?: number): number;
}

export const bitwise: Bitwise;
