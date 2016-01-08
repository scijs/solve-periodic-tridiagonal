'use strict'

var tdiag = require('../')

var d = [32, 25, 3, 41]

tdiag(4, [7, -1, 2, 1], [2, 7, -3, 8], [1, 4, 2, 6], d, [])
// => d = [ 1, 2, 3, 4 ]

console.log(d)
