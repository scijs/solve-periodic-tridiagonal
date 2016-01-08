/* global describe, it */

'use strict'

var triper = require('../')

var assert = require('chai').assert
var iota = require('iota-array')
var ndarray = require('ndarray')
var lup = require('ndarray-lup-factorization')
var solve = require('ndarray-lup-solve')
var pool = require('ndarray-scratch')
var ndt = require('ndarray-tests')
var band = require('ndarray-band')
var ops = require('ndarray-ops')

function construct (a, b, c) {
  var n = a.length
  var A = pool.zeros([n, n])
  ops.assign(band(A, 1), ndarray(a).lo(1))
  ops.assign(band(A, 0), ndarray(b))
  ops.assign(band(A, -1), ndarray(c).hi(n - 1))
  if (n > 1) A.set(n - 1, 0, c[n - 1])
  if (n > 1) A.set(0, n - 1, a[0])
  return A
}

describe('solveTridiagonal', function () {
  var k

  it('returns false if diagonal dominance fails', function () {
    //     [0 1 0]
    // A = [2 2 0]
    //     [0 2 3]
    var a = [0, 2, 2]
    var b = [0, 2, 3]
    var c = [1, 0, 0]
    var d = [5, 6, 7]
    var w = []

    assert.isFalse(triper(3, a, b, c, d, w))
  })

  it('returns false if singular', function () {
    //     [1 1 0]
    // A = [2 4 3]
    //     [0 2 3]
    var a = [0, 2, 2]
    var b = [1, 4, 3]
    var c = [1, 3, 0]
    var d = [5, 6, 7]
    var w = []
    assert.isFalse(triper(3, a, b, c, d, w))
  })

  for (k = 0; k <= 2; k++) {
    ;(function (n) {
      it('throw an error for a ' + n + ' x ' + n + ' system', function () {
        assert.throws(function () {
          var a = iota(n)
          var b = iota(n)
          var c = iota(n)
          var d = iota(n)
          triper(n, a, b, c, d, [])
        })
      })
    }(k))
  }

  for (k = 3; k <= 100; k++) {
    ;(function (n) {
      it('solves a ' + n + ' x ' + n + ' periodic tridiagonal system', function () {
        // All unique, irrational, repeatable, and random-ish enough for this
        var a = iota(n).map(function (x) { return Math.cos(10 * x + 1) })
        var b = iota(n).map(function (x) { return Math.cos(Math.sqrt(250) * (x + 1)) })
        var c = iota(n).map(function (x) { return Math.cos(Math.sqrt(300) * (x + 1)) })
        var d = iota(n).map(function (x) { return Math.cos(Math.sqrt(500) * (x + 1)) })

        // Feed random garbage into the work vector:
        var w = iota(n).map(Math.random)

        // Construct dense matrix:
        var P = []
        var A = construct(a.slice(0), b.slice(0), c.slice(0))
        var x = ndarray(d.slice(0))

        // Solve using tridiagonal algorithm:
        assert(triper(n, a, b, c, d, w), 'returns true on success')

        // Solve using dense solver:
        lup(A, A, P)
        solve(A, A, P, x)

        assert(ndt.equal(x, ndarray(d), 1e-8), 'solution is correct')
      })
    }(k))
  }
})
