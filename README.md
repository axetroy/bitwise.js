# bitwise.js

[![Badge](https://img.shields.io/badge/link-996.icu-%23FF4D5B.svg?style=flat-square)](https://996.icu/#/en_US)
[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg?style=flat-square)](https://github.com/996icu/996.ICU/blob/master/LICENSE)
![Node](https://img.shields.io/badge/node-%3E=14-blue.svg?style=flat-square)
[![npm version](https://badge.fury.io/js/bitwise.js.svg)](https://badge.fury.io/js/bitwise.js)

A utility for bitwise operations that supports both `number` and `bigint` types in JavaScript/TypeScript.

## Installation

```bash
npm install bitwise.js --save
```

## Usage

### Example:

```js
import { bitwise } from "bitwise.js";

console.log(bitwise.and(5, 3n)); // => 1n (5 & 3n)
console.log(bitwise.or(2.7, 3)); // => 3 (2 & 3)
console.log(bitwise.xor(5, 3)); // => 6 (5 ^ 3)
console.log(bitwise.not(5)); // => -6 (~5)
console.log(bitwise.leftShift(3.9, 2)); // => 12 (3 << 2)
console.log(bitwise.rightShift(5n, 1)); // => 2n (5n >> 1)
```

## Methods

-   `and(a, b, prefer = 'bigint')`: Performs bitwise AND on `a` and `b`.
-   `or(a, b, prefer = 'bigint')`: Performs bitwise OR on `a` and `b`.
-   `xor(a, b, prefer = 'bigint')`: Performs bitwise XOR on `a` and `b`.
-   `not(a)`: Performs bitwise NOT on `a`.
-   `leftShift(a, bits = 1)`: Performs a left shift operation on `a`.
-   `rightShift(a, bits = 1)`: Performs a right shift operation on `a`.
-   `zeroFillRightShift(a, bits = 1)`: Performs an unsigned right shift on `a` (only works with numbers).

## License

The [Anti 996 License](LICENSE)
