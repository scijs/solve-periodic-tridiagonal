# solve-periodic-tridiagonal [![Build Status](https://travis-ci.org/scijs/solve-periodic-tridiagonal.svg)](https://travis-ci.org/scijs/solve-periodic-tridiagonal) [![npm version](https://badge.fury.io/js/solve-periodic-tridiagonal.svg)](https://badge.fury.io/js/solve-periodic-tridiagonal) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> Solve a system of linear tridiagonal equations

## Introduction

This module accepts javascript Arrays or typed arrays representing the bands of a periodic tridiagonal matrix and computes the solution using the [Thomas algorithm](http://www.cfd-online.com/Wiki/Tridiagonal_matrix_algorithm_-_TDMA_(Thomas_algorithm)). The problem in matrix form is

<p align="center"><img alt="&bsol;left&lsqb;&NewLine;&bsol;begin&lcub;matrix&rcub;&NewLine;   &lcub;b&lowbar;0&rcub; &amp; &lcub;c&lowbar;0&rcub; &amp; &lcub;   &rcub; &amp; &lcub;   &rcub; &amp; &lcub; a&lowbar;0 &rcub; &bsol;&bsol;&NewLine;   &lcub;a&lowbar;1&rcub; &amp; &lcub;b&lowbar;1&rcub; &amp; &lcub;c&lowbar;1&rcub; &amp; &lcub;   &rcub; &amp; &lcub;   &rcub; &bsol;&bsol;&NewLine;   &lcub;   &rcub; &amp; &lcub;a&lowbar;2&rcub; &amp; &lcub;b&lowbar;2&rcub; &amp; &bsol;cdot &amp; &lcub;   &rcub; &bsol;&bsol;&NewLine;   &lcub;   &rcub; &amp; &lcub;   &rcub; &amp; &bsol;cdot &amp; &bsol;cdot &amp; &lcub;c&lowbar;&lcub;n-2&rcub;&rcub;&bsol;&bsol;&NewLine;   &lcub; c&lowbar;&lcub;n-1&rcub; &rcub; &amp; &lcub;   &rcub; &amp; &lcub;   &rcub; &amp; &lcub;a&lowbar;&lcub;n-1&rcub;&rcub; &amp; &lcub;b&lowbar;&lcub;n-1&rcub;&rcub;&bsol;&bsol;&NewLine;&bsol;end&lcub;matrix&rcub;&NewLine;&bsol;right&rsqb;&NewLine;&bsol;left&lsqb;&NewLine;&bsol;begin&lcub;matrix&rcub;&NewLine;   &lcub;x&lowbar;0 &rcub;  &bsol;&bsol;&NewLine;   &lcub;x&lowbar;1 &rcub;  &bsol;&bsol;&NewLine;   &bsol;cdot   &bsol;&bsol;&NewLine;   &bsol;cdot   &bsol;&bsol;&NewLine;   &lcub;x&lowbar;&lcub;n-1&rcub; &rcub;  &bsol;&bsol;&NewLine;&bsol;end&lcub;matrix&rcub;&NewLine;&bsol;right&rsqb;&NewLine;&equals;&NewLine;&bsol;left&lsqb;&NewLine;&bsol;begin&lcub;matrix&rcub;&NewLine;   &lcub;d&lowbar;0 &rcub;  &bsol;&bsol;&NewLine;   &lcub;d&lowbar;1 &rcub;  &bsol;&bsol;&NewLine;   &bsol;cdot   &bsol;&bsol;&NewLine;   &bsol;cdot   &bsol;&bsol;&NewLine;   &lcub;d&lowbar;&lcub;n-1&rcub; &rcub;  &bsol;&bsol;&NewLine;&bsol;end&lcub;matrix&rcub;&NewLine;&bsol;right&rsqb;&period;" valign="middle" src="images/left-beginmatrix-b_0-c_0-a_0-a_1-b_1-c_1-a_2--2b154af7a7.png" width="445" height="126"></p>

The solver will fail if the matrix is singular and may not succeed if the matrix is not diagonally dominant. If the solver fails, it will log a console message and return false.

## Example

Consider the solution of

<p align="center"><img alt="&bsol;left&lsqb;&NewLine;&bsol;begin&lcub;matrix&rcub;&NewLine;   2 &amp; 1 &amp;  0  &amp; 7&bsol;&bsol;&NewLine;  -1 &amp; 7 &amp;  4  &amp; 0&bsol;&bsol;&NewLine;   0 &amp; 2 &amp; -3  &amp; 2&bsol;&bsol;&NewLine;   6 &amp; 0 &amp;  1  &amp; 8&bsol;&bsol;&NewLine;&bsol;end&lcub;matrix&rcub;&NewLine;&bsol;right&rsqb;&NewLine;&bsol;left&lsqb;&NewLine;&bsol;begin&lcub;matrix&rcub;&NewLine;   &lcub;x&lowbar;0 &rcub;  &bsol;&bsol;&NewLine;   &lcub;x&lowbar;1 &rcub;  &bsol;&bsol;&NewLine;   &lcub;x&lowbar;2 &rcub;  &bsol;&bsol;&NewLine;   &lcub;x&lowbar;3 &rcub;  &bsol;&bsol;&NewLine;&bsol;end&lcub;matrix&rcub;&NewLine;&bsol;right&rsqb;&NewLine;&equals;&NewLine;&bsol;left&lsqb;&NewLine;&bsol;begin&lcub;matrix&rcub;&NewLine;   &lcub;32&rcub;  &bsol;&bsol;&NewLine;   &lcub;25&rcub;  &bsol;&bsol;&NewLine;   &lcub;-5&rcub;  &bsol;&bsol;&NewLine;   &lcub;41&rcub;  &bsol;&bsol;&NewLine;&bsol;end&lcub;matrix&rcub;&NewLine;&bsol;right&rsqb;&period;" valign="middle" src="images/left-beginmatrix-2-1-0-7-1-7-4-0-0-2-3-2-6-0--d0b5be69c1.png" width="299" height="102"></p>

```javascript
var triper = require('solve-periodic-tridiagonal')

var d = [32, 25, 3, 41]

triper(4, [7, -1, 2, 1], [2, 7, -3, 8], [1, 4, 2, 6], d, [])
// => d = [ 1, 2, 3, 4 ]
```

## Installation

```javascript
$ npm install solve-periodic-tridiagonal
```

## API

#### `require('solve-periodic-tridiagonal')(n, a, b, c, d, w)`
**Arguments**:
- `n`: an integer representing the number of equations in the system
- `a`: a javascript `Array` or typed array of length n representing the subdiagonal, indexed according to the equation above. Left unchanged by the solver.
- `b`: a javascript `Array` or typed array of length n representing the diagonal, indexed as above. This vector is modified by the solver.
- `c`: a javascript `Array` or typed array of length n representing the superdiagonal, indexed as above. This vector is modified by the solver.
- `d`: a javascript `Array` or typed array of length n representing the known vector d. On successful completion, this vector will contain the solution.
- `w`: a work vector. Must be a javascript `Array` or typed array of length n.

**Returns**: True on successful completion, false otherwise.

## License
&copy; 2016 Ricky Reusser. MIT License.