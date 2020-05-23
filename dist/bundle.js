System.built(1,71,[{
	name: "@lumino/algorithm",
	version: "1.2.3",
	root: "node_modules/@lumino/algorithm",
	main: "lib/index.js",
	files: [
		[
			/* @lumino/algorithm: 0 */
			"lib/zip.js", ["cjs","js"], {"./iter": 10}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var iter_1 = require("./iter");
/**
 * Iterate several iterables in lockstep.
 *
 * @param objects - The iterable or array-like objects of interest.
 *
 * @returns An iterator which yields successive tuples of values where
 *   each value is taken in turn from the provided iterables. It will
 *   be as long as the shortest provided iterable.
 *
 * #### Example
 * ```typescript
 * import { zip, toArray } from '@lumino/algorithm';
 *
 * let data1 = [1, 2, 3];
 * let data2 = [4, 5, 6];
 *
 * let stream = zip(data1, data2);
 *
 * toArray(stream);  // [[1, 4], [2, 5], [3, 6]]
 * ```
 */
function zip() {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    return new ZipIterator(objects.map(iter_1.iter));
}
exports.zip = zip;
/**
 * An iterator which iterates several sources in lockstep.
 */
var ZipIterator = /** @class */ (function () {
    /**
     * Construct a new zip iterator.
     *
     * @param source - The iterators of interest.
     */
    function ZipIterator(source) {
        this._source = source;
    }
    /**
     * Get an iterator over the object's values.
     *
     * @returns An iterator which yields the object's values.
     */
    ZipIterator.prototype.iter = function () {
        return this;
    };
    /**
     * Create an independent clone of the iterator.
     *
     * @returns A new independent clone of the iterator.
     */
    ZipIterator.prototype.clone = function () {
        return new ZipIterator(this._source.map(function (it) { return it.clone(); }));
    };
    /**
     * Get the next value from the iterator.
     *
     * @returns The next value from the iterator, or `undefined`.
     */
    ZipIterator.prototype.next = function () {
        var result = new Array(this._source.length);
        for (var i = 0, n = this._source.length; i < n; ++i) {
            var value = this._source[i].next();
            if (value === undefined) {
                return undefined;
            }
            result[i] = value;
        }
        return result;
    };
    return ZipIterator;
}());
exports.ZipIterator = ZipIterator;

})
		], [
			/* @lumino/algorithm: 1 */
			"lib/take.js", ["cjs","js"], {"./iter": 10}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var iter_1 = require("./iter");
/**
 * Take a fixed number of items from an iterable.
 *
 * @param object - The iterable or array-like object of interest.
 *
 * @param count - The number of items to take from the iterable.
 *
 * @returns An iterator which yields the specified number of items
 *   from the source iterable.
 *
 * #### Notes
 * The returned iterator will exhaust early if the source iterable
 * contains an insufficient number of items.
 */
function take(object, count) {
    return new TakeIterator(iter_1.iter(object), count);
}
exports.take = take;
/**
 * An iterator which takes a fixed number of items from a source.
 */
var TakeIterator = /** @class */ (function () {
    /**
     * Construct a new take iterator.
     *
     * @param source - The iterator of interest.
     *
     * @param count - The number of items to take from the source.
     */
    function TakeIterator(source, count) {
        this._source = source;
        this._count = count;
    }
    /**
     * Get an iterator over the object's values.
     *
     * @returns An iterator which yields the object's values.
     */
    TakeIterator.prototype.iter = function () {
        return this;
    };
    /**
     * Create an independent clone of the iterator.
     *
     * @returns A new independent clone of the iterator.
     */
    TakeIterator.prototype.clone = function () {
        return new TakeIterator(this._source.clone(), this._count);
    };
    /**
     * Get the next value from the iterator.
     *
     * @returns The next value from the iterator, or `undefined`.
     */
    TakeIterator.prototype.next = function () {
        if (this._count <= 0) {
            return undefined;
        }
        var value = this._source.next();
        if (value === undefined) {
            return undefined;
        }
        this._count--;
        return value;
    };
    return TakeIterator;
}());
exports.TakeIterator = TakeIterator;

})
		], [
			/* @lumino/algorithm: 2 */
			"lib/string.js", ["cjs","js"], {}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The namespace for string-specific algorithms.
 */
var StringExt;
(function (StringExt) {
    /**
     * Find the indices of characters in a source text.
     *
     * @param source - The source text which should be searched.
     *
     * @param query - The characters to locate in the source text.
     *
     * @param start - The index to start the search.
     *
     * @returns The matched indices, or `null` if there is no match.
     *
     * #### Complexity
     * Linear on `sourceText`.
     *
     * #### Notes
     * In order for there to be a match, all of the characters in `query`
     * **must** appear in `source` in the order given by `query`.
     *
     * Characters are matched using strict `===` equality.
     */
    function findIndices(source, query, start) {
        if (start === void 0) { start = 0; }
        var indices = new Array(query.length);
        for (var i = 0, j = start, n = query.length; i < n; ++i, ++j) {
            j = source.indexOf(query[i], j);
            if (j === -1) {
                return null;
            }
            indices[i] = j;
        }
        return indices;
    }
    StringExt.findIndices = findIndices;
    /**
     * A string matcher which uses a sum-of-squares algorithm.
     *
     * @param source - The source text which should be searched.
     *
     * @param query - The characters to locate in the source text.
     *
     * @param start - The index to start the search.
     *
     * @returns The match result, or `null` if there is no match.
     *   A lower `score` represents a stronger match.
     *
     * #### Complexity
     * Linear on `sourceText`.
     *
     * #### Notes
     * This scoring algorithm uses a sum-of-squares approach to determine
     * the score. In order for there to be a match, all of the characters
     * in `query` **must** appear in `source` in order. The index of each
     * matching character is squared and added to the score. This means
     * that early and consecutive character matches are preferred, while
     * late matches are heavily penalized.
     */
    function matchSumOfSquares(source, query, start) {
        if (start === void 0) { start = 0; }
        var indices = findIndices(source, query, start);
        if (!indices) {
            return null;
        }
        var score = 0;
        for (var i = 0, n = indices.length; i < n; ++i) {
            var j = indices[i] - start;
            score += j * j;
        }
        return { score: score, indices: indices };
    }
    StringExt.matchSumOfSquares = matchSumOfSquares;
    /**
     * A string matcher which uses a sum-of-deltas algorithm.
     *
     * @param source - The source text which should be searched.
     *
     * @param query - The characters to locate in the source text.
     *
     * @param start - The index to start the search.
     *
     * @returns The match result, or `null` if there is no match.
     *   A lower `score` represents a stronger match.
     *
     * #### Complexity
     * Linear on `sourceText`.
     *
     * #### Notes
     * This scoring algorithm uses a sum-of-deltas approach to determine
     * the score. In order for there to be a match, all of the characters
     * in `query` **must** appear in `source` in order. The delta between
     * the indices are summed to create the score. This means that groups
     * of matched characters are preferred, while fragmented matches are
     * penalized.
     */
    function matchSumOfDeltas(source, query, start) {
        if (start === void 0) { start = 0; }
        var indices = findIndices(source, query, start);
        if (!indices) {
            return null;
        }
        var score = 0;
        var last = start - 1;
        for (var i = 0, n = indices.length; i < n; ++i) {
            var j = indices[i];
            score += j - last - 1;
            last = j;
        }
        return { score: score, indices: indices };
    }
    StringExt.matchSumOfDeltas = matchSumOfDeltas;
    /**
     * Highlight the matched characters of a source text.
     *
     * @param source - The text which should be highlighted.
     *
     * @param indices - The indices of the matched characters. They must
     *   appear in increasing order and must be in bounds of the source.
     *
     * @param fn - The function to apply to the matched chunks.
     *
     * @returns An array of unmatched and highlighted chunks.
     */
    function highlight(source, indices, fn) {
        // Set up the result array.
        var result = [];
        // Set up the counter variables.
        var k = 0;
        var last = 0;
        var n = indices.length;
        // Iterator over each index.
        while (k < n) {
            // Set up the chunk indices.
            var i = indices[k];
            var j = indices[k];
            // Advance the right chunk index until it's non-contiguous.
            while (++k < n && indices[k] === j + 1) {
                j++;
            }
            // Extract the unmatched text.
            if (last < i) {
                result.push(source.slice(last, i));
            }
            // Extract and highlight the matched text.
            if (i < j + 1) {
                result.push(fn(source.slice(i, j + 1)));
            }
            // Update the last visited index.
            last = j + 1;
        }
        // Extract any remaining unmatched text.
        if (last < source.length) {
            result.push(source.slice(last));
        }
        // Return the highlighted result.
        return result;
    }
    StringExt.highlight = highlight;
    /**
     * A 3-way string comparison function.
     *
     * @param a - The first string of interest.
     *
     * @param b - The second string of interest.
     *
     * @returns `-1` if `a < b`, else `1` if `a > b`, else `0`.
     */
    function cmp(a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
    }
    StringExt.cmp = cmp;
})(StringExt = exports.StringExt || (exports.StringExt = {}));

})
		], [
			/* @lumino/algorithm: 3 */
			"lib/stride.js", ["cjs","js"], {"./iter": 10}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var iter_1 = require("./iter");
/**
 * Iterate over an iterable using a stepped increment.
 *
 * @param object - The iterable or array-like object of interest.
 *
 * @param step - The distance to step on each iteration. A value
 *   of less than `1` will behave the same as a value of `1`.
 *
 * @returns An iterator which traverses the iterable step-wise.
 *
 * #### Example
 * ```typescript
 * import { stride, toArray } from '@lumino/algorithm';
 *
 * let data = [1, 2, 3, 4, 5, 6];
 *
 * let stream = stride(data, 2);
 *
 * toArray(stream);  // [1, 3, 5];
 * ```
 */
function stride(object, step) {
    return new StrideIterator(iter_1.iter(object), step);
}
exports.stride = stride;
/**
 * An iterator which traverses a source iterator step-wise.
 */
var StrideIterator = /** @class */ (function () {
    /**
     * Construct a new stride iterator.
     *
     * @param source - The iterator of values of interest.
     *
     * @param step - The distance to step on each iteration. A value
     *   of less than `1` will behave the same as a value of `1`.
     */
    function StrideIterator(source, step) {
        this._source = source;
        this._step = step;
    }
    /**
     * Get an iterator over the object's values.
     *
     * @returns An iterator which yields the object's values.
     */
    StrideIterator.prototype.iter = function () {
        return this;
    };
    /**
     * Create an independent clone of the iterator.
     *
     * @returns A new independent clone of the iterator.
     */
    StrideIterator.prototype.clone = function () {
        return new StrideIterator(this._source.clone(), this._step);
    };
    /**
     * Get the next value from the iterator.
     *
     * @returns The next value from the iterator, or `undefined`.
     */
    StrideIterator.prototype.next = function () {
        var value = this._source.next();
        for (var n = this._step - 1; n > 0; --n) {
            this._source.next();
        }
        return value;
    };
    return StrideIterator;
}());
exports.StrideIterator = StrideIterator;

})
		], [
			/* @lumino/algorithm: 4 */
			"lib/sort.js", ["cjs","js"], {"./iter": 10}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var iter_1 = require("./iter");
/**
 * Topologically sort an iterable of edges.
 *
 * @param edges - The iterable or array-like object of edges to sort.
 *   An edge is represented as a 2-tuple of `[fromNode, toNode]`.
 *
 * @returns The topologically sorted array of nodes.
 *
 * #### Notes
 * If a cycle is present in the graph, the cycle will be ignored and
 * the return value will be only approximately sorted.
 *
 * #### Example
 * ```typescript
 * import { topologicSort } from '@lumino/algorithm';
 *
 * let data = [
 *   ['d', 'e'],
 *   ['c', 'd'],
 *   ['a', 'b'],
 *   ['b', 'c']
 * ];
 *
 * topologicSort(data);  // ['a', 'b', 'c', 'd', 'e']
 * ```
 */
function topologicSort(edges) {
    // Setup the shared sorting state.
    var sorted = [];
    var visited = new Set();
    var graph = new Map();
    // Add the edges to the graph.
    iter_1.each(edges, addEdge);
    // Visit each node in the graph.
    graph.forEach(function (v, k) { visit(k); });
    // Return the sorted results.
    return sorted;
    // Add an edge to the graph.
    function addEdge(edge) {
        var fromNode = edge[0], toNode = edge[1];
        var children = graph.get(toNode);
        if (children) {
            children.push(fromNode);
        }
        else {
            graph.set(toNode, [fromNode]);
        }
    }
    // Recursively visit the node.
    function visit(node) {
        if (visited.has(node)) {
            return;
        }
        visited.add(node);
        var children = graph.get(node);
        if (children) {
            children.forEach(visit);
        }
        sorted.push(node);
    }
}
exports.topologicSort = topologicSort;

})
		], [
			/* @lumino/algorithm: 5 */
			"lib/retro.js", ["cjs","js"], {}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create an iterator for a retroable object.
 *
 * @param object - The retroable or array-like object of interest.
 *
 * @returns An iterator which traverses the object's values in reverse.
 *
 * #### Example
 * ```typescript
 * import { retro, toArray } from '@lumino/algorithm';
 *
 * let data = [1, 2, 3, 4, 5, 6];
 *
 * let stream = retro(data);
 *
 * toArray(stream);  // [6, 5, 4, 3, 2, 1]
 * ```
 */
function retro(object) {
    var it;
    if (typeof object.retro === 'function') {
        it = object.retro();
    }
    else {
        it = new RetroArrayIterator(object);
    }
    return it;
}
exports.retro = retro;
/**
 * An iterator which traverses an array-like object in reverse.
 *
 * #### Notes
 * This iterator can be used for any builtin JS array-like object.
 */
var RetroArrayIterator = /** @class */ (function () {
    /**
     * Construct a new retro iterator.
     *
     * @param source - The array-like object of interest.
     */
    function RetroArrayIterator(source) {
        this._source = source;
        this._index = source.length - 1;
    }
    /**
     * Get an iterator over the object's values.
     *
     * @returns An iterator which yields the object's values.
     */
    RetroArrayIterator.prototype.iter = function () {
        return this;
    };
    /**
     * Create an independent clone of the iterator.
     *
     * @returns A new independent clone of the iterator.
     */
    RetroArrayIterator.prototype.clone = function () {
        var result = new RetroArrayIterator(this._source);
        result._index = this._index;
        return result;
    };
    /**
     * Get the next value from the iterator.
     *
     * @returns The next value from the iterator, or `undefined`.
     */
    RetroArrayIterator.prototype.next = function () {
        if (this._index < 0 || this._index >= this._source.length) {
            return undefined;
        }
        return this._source[this._index--];
    };
    return RetroArrayIterator;
}());
exports.RetroArrayIterator = RetroArrayIterator;

})
		], [
			/* @lumino/algorithm: 6 */
			"lib/repeat.js", ["cjs","js"], {}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create an iterator which repeats a value a number of times.
 *
 * @param value - The value to repeat.
 *
 * @param count - The number of times to repeat the value.
 *
 * @returns A new iterator which repeats the specified value.
 *
 * #### Example
 * ```typescript
 * import { repeat, toArray } from '@lumino/algorithm';
 *
 * let stream = repeat(7, 3);
 *
 * toArray(stream);  // [7, 7, 7]
 * ```
 */
function repeat(value, count) {
    return new RepeatIterator(value, count);
}
exports.repeat = repeat;
/**
 * Create an iterator which yields a value a single time.
 *
 * @param value - The value to wrap in an iterator.
 *
 * @returns A new iterator which yields the value a single time.
 *
 * #### Example
 * ```typescript
 * import { once, toArray } from '@lumino/algorithm';
 *
 * let stream = once(7);
 *
 * toArray(stream);  // [7]
 * ```
 */
function once(value) {
    return new RepeatIterator(value, 1);
}
exports.once = once;
/**
 * An iterator which repeats a value a specified number of times.
 */
var RepeatIterator = /** @class */ (function () {
    /**
     * Construct a new repeat iterator.
     *
     * @param value - The value to repeat.
     *
     * @param count - The number of times to repeat the value.
     */
    function RepeatIterator(value, count) {
        this._value = value;
        this._count = count;
    }
    /**
     * Get an iterator over the object's values.
     *
     * @returns An iterator which yields the object's values.
     */
    RepeatIterator.prototype.iter = function () {
        return this;
    };
    /**
     * Create an independent clone of the iterator.
     *
     * @returns A new independent clone of the iterator.
     */
    RepeatIterator.prototype.clone = function () {
        return new RepeatIterator(this._value, this._count);
    };
    /**
     * Get the next value from the iterator.
     *
     * @returns The next value from the iterator, or `undefined`.
     */
    RepeatIterator.prototype.next = function () {
        if (this._count <= 0) {
            return undefined;
        }
        this._count--;
        return this._value;
    };
    return RepeatIterator;
}());
exports.RepeatIterator = RepeatIterator;

})
		], [
			/* @lumino/algorithm: 7 */
			"lib/reduce.js", ["cjs","js"], {"./iter": 10}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var iter_1 = require("./iter");
function reduce(object, fn, initial) {
    // Setup the iterator and fetch the first value.
    var index = 0;
    var it = iter_1.iter(object);
    var first = it.next();
    // An empty iterator and no initial value is an error.
    if (first === undefined && initial === undefined) {
        throw new TypeError('Reduce of empty iterable with no initial value.');
    }
    // If the iterator is empty, return the initial value.
    if (first === undefined) {
        return initial;
    }
    // If the iterator has a single item and no initial value, the
    // reducer is not invoked and the first item is the return value.
    var second = it.next();
    if (second === undefined && initial === undefined) {
        return first;
    }
    // If iterator has a single item and an initial value is provided,
    // the reducer is invoked and that result is the return value.
    if (second === undefined) {
        return fn(initial, first, index++);
    }
    // Setup the initial accumlated value.
    var accumulator;
    if (initial === undefined) {
        accumulator = fn(first, second, index++);
    }
    else {
        accumulator = fn(fn(initial, first, index++), second, index++);
    }
    // Iterate the rest of the values, updating the accumulator.
    var next;
    while ((next = it.next()) !== undefined) {
        accumulator = fn(accumulator, next, index++);
    }
    // Return the final accumulated value.
    return accumulator;
}
exports.reduce = reduce;

})
		], [
			/* @lumino/algorithm: 8 */
			"lib/range.js", ["cjs","js"], {}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create an iterator of evenly spaced values.
 *
 * @param start - The starting value for the range, inclusive.
 *
 * @param stop - The stopping value for the range, exclusive.
 *
 * @param step - The distance between each value.
 *
 * @returns An iterator which produces evenly spaced values.
 *
 * #### Notes
 * In the single argument form of `range(stop)`, `start` defaults to
 * `0` and `step` defaults to `1`.
 *
 * In the two argument form of `range(start, stop)`, `step` defaults
 * to `1`.
 */
function range(start, stop, step) {
    if (stop === undefined) {
        return new RangeIterator(0, start, 1);
    }
    if (step === undefined) {
        return new RangeIterator(start, stop, 1);
    }
    return new RangeIterator(start, stop, step);
}
exports.range = range;
/**
 * An iterator which produces a range of evenly spaced values.
 */
var RangeIterator = /** @class */ (function () {
    /**
     * Construct a new range iterator.
     *
     * @param start - The starting value for the range, inclusive.
     *
     * @param stop - The stopping value for the range, exclusive.
     *
     * @param step - The distance between each value.
     */
    function RangeIterator(start, stop, step) {
        this._index = 0;
        this._start = start;
        this._stop = stop;
        this._step = step;
        this._length = Private.rangeLength(start, stop, step);
    }
    /**
     * Get an iterator over the object's values.
     *
     * @returns An iterator which yields the object's values.
     */
    RangeIterator.prototype.iter = function () {
        return this;
    };
    /**
     * Create an independent clone of the iterator.
     *
     * @returns A new independent clone of the iterator.
     */
    RangeIterator.prototype.clone = function () {
        var result = new RangeIterator(this._start, this._stop, this._step);
        result._index = this._index;
        return result;
    };
    /**
     * Get the next value from the iterator.
     *
     * @returns The next value from the iterator, or `undefined`.
     */
    RangeIterator.prototype.next = function () {
        if (this._index >= this._length) {
            return undefined;
        }
        return this._start + this._step * this._index++;
    };
    return RangeIterator;
}());
exports.RangeIterator = RangeIterator;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * Compute the effective length of a range.
     *
     * @param start - The starting value for the range, inclusive.
     *
     * @param stop - The stopping value for the range, exclusive.
     *
     * @param step - The distance between each value.
     *
     * @returns The number of steps need to traverse the range.
     */
    function rangeLength(start, stop, step) {
        if (step === 0) {
            return Infinity;
        }
        if (start > stop && step > 0) {
            return 0;
        }
        if (start < stop && step < 0) {
            return 0;
        }
        return Math.ceil((stop - start) / step);
    }
    Private.rangeLength = rangeLength;
})(Private || (Private = {}));

})
		], [
			/* @lumino/algorithm: 9 */
			"lib/map.js", ["cjs","js"], {"./iter": 10}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var iter_1 = require("./iter");
/**
 * Transform the values of an iterable with a mapping function.
 *
 * @param object - The iterable or array-like object of interest.
 *
 * @param fn - The mapping function to invoke for each value.
 *
 * @returns An iterator which yields the transformed values.
 *
 * #### Example
 * ```typescript
 * import { map, toArray } from '@lumino/algorithm';
 *
 * let data = [1, 2, 3];
 *
 * let stream = map(data, value => value * 2);
 *
 * toArray(stream);  // [2, 4, 6]
 * ```
 */
function map(object, fn) {
    return new MapIterator(iter_1.iter(object), fn);
}
exports.map = map;
/**
 * An iterator which transforms values using a mapping function.
 */
var MapIterator = /** @class */ (function () {
    /**
     * Construct a new map iterator.
     *
     * @param source - The iterator of values of interest.
     *
     * @param fn - The mapping function to invoke for each value.
     */
    function MapIterator(source, fn) {
        this._index = 0;
        this._source = source;
        this._fn = fn;
    }
    /**
     * Get an iterator over the object's values.
     *
     * @returns An iterator which yields the object's values.
     */
    MapIterator.prototype.iter = function () {
        return this;
    };
    /**
     * Create an independent clone of the iterator.
     *
     * @returns A new independent clone of the iterator.
     */
    MapIterator.prototype.clone = function () {
        var result = new MapIterator(this._source.clone(), this._fn);
        result._index = this._index;
        return result;
    };
    /**
     * Get the next value from the iterator.
     *
     * @returns The next value from the iterator, or `undefined`.
     */
    MapIterator.prototype.next = function () {
        var value = this._source.next();
        if (value === undefined) {
            return undefined;
        }
        return this._fn.call(undefined, value, this._index++);
    };
    return MapIterator;
}());
exports.MapIterator = MapIterator;

})
		], [
			/* @lumino/algorithm: 10 */
			"lib/iter.js", ["cjs","js"], {}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create an iterator for an iterable object.
 *
 * @param object - The iterable or array-like object of interest.
 *
 * @returns A new iterator for the given object.
 *
 * #### Notes
 * This function allows iteration algorithms to operate on user-defined
 * iterable types and builtin array-like objects in a uniform fashion.
 */
function iter(object) {
    var it;
    if (typeof object.iter === 'function') {
        it = object.iter();
    }
    else {
        it = new ArrayIterator(object);
    }
    return it;
}
exports.iter = iter;
/**
 * Create an iterator for the keys in an object.
 *
 * @param object - The object of interest.
 *
 * @returns A new iterator for the keys in the given object.
 *
 * #### Complexity
 * Linear.
 *
 * #### Example
 * ```typescript
 * import { each, keys } from '@lumino/algorithm';
 *
 * let data = { one: 1, two: 2, three: 3 };
 *
 * each(keys(data), key => { console.log(key); }); // 'one', 'two', 'three'
 * ```
 */
function iterKeys(object) {
    return new KeyIterator(object);
}
exports.iterKeys = iterKeys;
/**
 * Create an iterator for the values in an object.
 *
 * @param object - The object of interest.
 *
 * @returns A new iterator for the values in the given object.
 *
 * #### Complexity
 * Linear.
 *
 * #### Example
 * ```typescript
 * import { each, values } from '@lumino/algorithm';
 *
 * let data = { one: 1, two: 2, three: 3 };
 *
 * each(values(data), value => { console.log(value); }); // 1, 2, 3
 * ```
 */
function iterValues(object) {
    return new ValueIterator(object);
}
exports.iterValues = iterValues;
/**
 * Create an iterator for the items in an object.
 *
 * @param object - The object of interest.
 *
 * @returns A new iterator for the items in the given object.
 *
 * #### Complexity
 * Linear.
 *
 * #### Example
 * ```typescript
 * import { each, items } from '@lumino/algorithm';
 *
 * let data = { one: 1, two: 2, three: 3 };
 *
 * each(items(data), value => { console.log(value); }); // ['one', 1], ['two', 2], ['three', 3]
 * ```
 */
function iterItems(object) {
    return new ItemIterator(object);
}
exports.iterItems = iterItems;
/**
 * Create an iterator for an iterator-like function.
 *
 * @param fn - A function which behaves like an iterator `next` method.
 *
 * @returns A new iterator for the given function.
 *
 * #### Notes
 * The returned iterator **cannot** be cloned.
 *
 * #### Example
 * ```typescript
 * import { each, iterFn } from '@lumino/algorithm';
 *
 * let it = iterFn((() => {
 *   let i = 0;
 *   return () => i > 3 ? undefined : i++;
 * })());
 *
 * each(it, v => { console.log(v); }); // 0, 1, 2, 3
 * ```
 */
function iterFn(fn) {
    return new FnIterator(fn);
}
exports.iterFn = iterFn;
/**
 * Invoke a function for each value in an iterable.
 *
 * @param object - The iterable or array-like object of interest.
 *
 * @param fn - The callback function to invoke for each value.
 *
 * #### Notes
 * Iteration can be terminated early by returning `false` from the
 * callback function.
 *
 * #### Complexity
 * Linear.
 *
 * #### Example
 * ```typescript
 * import { each } from '@lumino/algorithm';
 *
 * let data = [5, 7, 0, -2, 9];
 *
 * each(data, value => { console.log(value); });
 * ```
 */
function each(object, fn) {
    var index = 0;
    var it = iter(object);
    var value;
    while ((value = it.next()) !== undefined) {
        if (fn(value, index++) === false) {
            return;
        }
    }
}
exports.each = each;
/**
 * Test whether all values in an iterable satisfy a predicate.
 *
 * @param object - The iterable or array-like object of interest.
 *
 * @param fn - The predicate function to invoke for each value.
 *
 * @returns `true` if all values pass the test, `false` otherwise.
 *
 * #### Notes
 * Iteration terminates on the first `false` predicate result.
 *
 * #### Complexity
 * Linear.
 *
 * #### Example
 * ```typescript
 * import { every } from '@lumino/algorithm';
 *
 * let data = [5, 7, 1];
 *
 * every(data, value => value % 2 === 0);  // false
 * every(data, value => value % 2 === 1);  // true
 * ```
 */
function every(object, fn) {
    var index = 0;
    var it = iter(object);
    var value;
    while ((value = it.next()) !== undefined) {
        if (!fn(value, index++)) {
            return false;
        }
    }
    return true;
}
exports.every = every;
/**
 * Test whether any value in an iterable satisfies a predicate.
 *
 * @param object - The iterable or array-like object of interest.
 *
 * @param fn - The predicate function to invoke for each value.
 *
 * @returns `true` if any value passes the test, `false` otherwise.
 *
 * #### Notes
 * Iteration terminates on the first `true` predicate result.
 *
 * #### Complexity
 * Linear.
 *
 * #### Example
 * ```typescript
 * import { some } from '@lumino/algorithm';
 *
 * let data = [5, 7, 1];
 *
 * some(data, value => value === 7);  // true
 * some(data, value => value === 3);  // false
 * ```
 */
function some(object, fn) {
    var index = 0;
    var it = iter(object);
    var value;
    while ((value = it.next()) !== undefined) {
        if (fn(value, index++)) {
            return true;
        }
    }
    return false;
}
exports.some = some;
/**
 * Create an array from an iterable of values.
 *
 * @param object - The iterable or array-like object of interest.
 *
 * @returns A new array of values from the given object.
 *
 * #### Example
 * ```typescript
 * import { iter, toArray } from '@lumino/algorithm';
 *
 * let data = [1, 2, 3, 4, 5, 6];
 *
 * let stream = iter(data);
 *
 * toArray(stream);  // [1, 2, 3, 4, 5, 6];
 * ```
 */
function toArray(object) {
    var index = 0;
    var result = [];
    var it = iter(object);
    var value;
    while ((value = it.next()) !== undefined) {
        result[index++] = value;
    }
    return result;
}
exports.toArray = toArray;
/**
 * Create an object from an iterable of key/value pairs.
 *
 * @param object - The iterable or array-like object of interest.
 *
 * @returns A new object mapping keys to values.
 *
 * #### Example
 * ```typescript
 * import { toObject } from '@lumino/algorithm';
 *
 * let data = [['one', 1], ['two', 2], ['three', 3]];
 *
 * toObject(data);  // { one: 1, two: 2, three: 3 }
 * ```
 */
function toObject(object) {
    var it = iter(object);
    var pair;
    var result = {};
    while ((pair = it.next()) !== undefined) {
        result[pair[0]] = pair[1];
    }
    return result;
}
exports.toObject = toObject;
/**
 * An iterator for an array-like object.
 *
 * #### Notes
 * This iterator can be used for any builtin JS array-like object.
 */
var ArrayIterator = /** @class */ (function () {
    /**
     * Construct a new array iterator.
     *
     * @param source - The array-like object of interest.
     */
    function ArrayIterator(source) {
        this._index = 0;
        this._source = source;
    }
    /**
     * Get an iterator over the object's values.
     *
     * @returns An iterator which yields the object's values.
     */
    ArrayIterator.prototype.iter = function () {
        return this;
    };
    /**
     * Create an independent clone of the iterator.
     *
     * @returns A new independent clone of the iterator.
     */
    ArrayIterator.prototype.clone = function () {
        var result = new ArrayIterator(this._source);
        result._index = this._index;
        return result;
    };
    /**
     * Get the next value from the iterator.
     *
     * @returns The next value from the iterator, or `undefined`.
     */
    ArrayIterator.prototype.next = function () {
        if (this._index >= this._source.length) {
            return undefined;
        }
        return this._source[this._index++];
    };
    return ArrayIterator;
}());
exports.ArrayIterator = ArrayIterator;
/**
 * An iterator for the keys in an object.
 *
 * #### Notes
 * This iterator can be used for any JS object.
 */
var KeyIterator = /** @class */ (function () {
    /**
     * Construct a new key iterator.
     *
     * @param source - The object of interest.
     *
     * @param keys - The keys to iterate, if known.
     */
    function KeyIterator(source, keys) {
        if (keys === void 0) { keys = Object.keys(source); }
        this._index = 0;
        this._source = source;
        this._keys = keys;
    }
    /**
     * Get an iterator over the object's values.
     *
     * @returns An iterator which yields the object's values.
     */
    KeyIterator.prototype.iter = function () {
        return this;
    };
    /**
     * Create an independent clone of the iterator.
     *
     * @returns A new independent clone of the iterator.
     */
    KeyIterator.prototype.clone = function () {
        var result = new KeyIterator(this._source, this._keys);
        result._index = this._index;
        return result;
    };
    /**
     * Get the next value from the iterator.
     *
     * @returns The next value from the iterator, or `undefined`.
     */
    KeyIterator.prototype.next = function () {
        if (this._index >= this._keys.length) {
            return undefined;
        }
        var key = this._keys[this._index++];
        if (key in this._source) {
            return key;
        }
        return this.next();
    };
    return KeyIterator;
}());
exports.KeyIterator = KeyIterator;
/**
 * An iterator for the values in an object.
 *
 * #### Notes
 * This iterator can be used for any JS object.
 */
var ValueIterator = /** @class */ (function () {
    /**
     * Construct a new value iterator.
     *
     * @param source - The object of interest.
     *
     * @param keys - The keys to iterate, if known.
     */
    function ValueIterator(source, keys) {
        if (keys === void 0) { keys = Object.keys(source); }
        this._index = 0;
        this._source = source;
        this._keys = keys;
    }
    /**
     * Get an iterator over the object's values.
     *
     * @returns An iterator which yields the object's values.
     */
    ValueIterator.prototype.iter = function () {
        return this;
    };
    /**
     * Create an independent clone of the iterator.
     *
     * @returns A new independent clone of the iterator.
     */
    ValueIterator.prototype.clone = function () {
        var result = new ValueIterator(this._source, this._keys);
        result._index = this._index;
        return result;
    };
    /**
     * Get the next value from the iterator.
     *
     * @returns The next value from the iterator, or `undefined`.
     */
    ValueIterator.prototype.next = function () {
        if (this._index >= this._keys.length) {
            return undefined;
        }
        var key = this._keys[this._index++];
        if (key in this._source) {
            return this._source[key];
        }
        return this.next();
    };
    return ValueIterator;
}());
exports.ValueIterator = ValueIterator;
/**
 * An iterator for the items in an object.
 *
 * #### Notes
 * This iterator can be used for any JS object.
 */
var ItemIterator = /** @class */ (function () {
    /**
     * Construct a new item iterator.
     *
     * @param source - The object of interest.
     *
     * @param keys - The keys to iterate, if known.
     */
    function ItemIterator(source, keys) {
        if (keys === void 0) { keys = Object.keys(source); }
        this._index = 0;
        this._source = source;
        this._keys = keys;
    }
    /**
     * Get an iterator over the object's values.
     *
     * @returns An iterator which yields the object's values.
     */
    ItemIterator.prototype.iter = function () {
        return this;
    };
    /**
     * Create an independent clone of the iterator.
     *
     * @returns A new independent clone of the iterator.
     */
    ItemIterator.prototype.clone = function () {
        var result = new ItemIterator(this._source, this._keys);
        result._index = this._index;
        return result;
    };
    /**
     * Get the next value from the iterator.
     *
     * @returns The next value from the iterator, or `undefined`.
     */
    ItemIterator.prototype.next = function () {
        if (this._index >= this._keys.length) {
            return undefined;
        }
        var key = this._keys[this._index++];
        if (key in this._source) {
            return [key, this._source[key]];
        }
        return this.next();
    };
    return ItemIterator;
}());
exports.ItemIterator = ItemIterator;
/**
 * An iterator for an iterator-like function.
 */
var FnIterator = /** @class */ (function () {
    /**
     * Construct a new function iterator.
     *
     * @param fn - The iterator-like function of interest.
     */
    function FnIterator(fn) {
        this._fn = fn;
    }
    /**
     * Get an iterator over the object's values.
     *
     * @returns An iterator which yields the object's values.
     */
    FnIterator.prototype.iter = function () {
        return this;
    };
    /**
     * Create an independent clone of the iterator.
     *
     * @returns A new independent clone of the iterator.
     */
    FnIterator.prototype.clone = function () {
        throw new Error('An `FnIterator` cannot be cloned.');
    };
    /**
     * Get the next value from the iterator.
     *
     * @returns The next value from the iterator, or `undefined`.
     */
    FnIterator.prototype.next = function () {
        return this._fn.call(undefined);
    };
    return FnIterator;
}());
exports.FnIterator = FnIterator;

})
		], [
			/* @lumino/algorithm: 11 */
			"lib/index.js", ["cjs","js"], {"./array": 17, "./chain": 16, "./empty": 15, "./enumerate": 14, "./filter": 13, "./find": 12, "./iter": 10, "./map": 9, "./range": 8, "./reduce": 7, "./repeat": 6, "./retro": 5, "./sort": 4, "./stride": 3, "./string": 2, "./take": 1, "./zip": 0}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
__export(require("./array"));
__export(require("./chain"));
__export(require("./empty"));
__export(require("./enumerate"));
__export(require("./filter"));
__export(require("./find"));
__export(require("./iter"));
__export(require("./map"));
__export(require("./range"));
__export(require("./reduce"));
__export(require("./repeat"));
__export(require("./retro"));
__export(require("./sort"));
__export(require("./stride"));
__export(require("./string"));
__export(require("./take"));
__export(require("./zip"));

})
		], [
			/* @lumino/algorithm: 12 */
			"lib/find.js", ["cjs","js"], {"./iter": 10}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var iter_1 = require("./iter");
/**
 * Find the first value in an iterable which matches a predicate.
 *
 * @param object - The iterable or array-like object to search.
 *
 * @param fn - The predicate function to apply to the values.
 *
 * @returns The first matching value, or `undefined` if no matching
 *   value is found.
 *
 * #### Complexity
 * Linear.
 *
 * #### Example
 * ```typescript
 * import { find } from '@lumino/algorithm';
 *
 * interface IAnimal { species: string, name: string };
 *
 * function isCat(value: IAnimal): boolean {
 *   return value.species === 'cat';
 * }
 *
 * let data: IAnimal[] = [
 *   { species: 'dog', name: 'spot' },
 *   { species: 'cat', name: 'fluffy' },
 *   { species: 'alligator', name: 'pocho' }
 * ];
 *
 * find(data, isCat).name;  // 'fluffy'
 * ```
 */
function find(object, fn) {
    var index = 0;
    var it = iter_1.iter(object);
    var value;
    while ((value = it.next()) !== undefined) {
        if (fn(value, index++)) {
            return value;
        }
    }
    return undefined;
}
exports.find = find;
/**
 * Find the index of the first value which matches a predicate.
 *
 * @param object - The iterable or array-like object to search.
 *
 * @param fn - The predicate function to apply to the values.
 *
 * @returns The index of the first matching value, or `-1` if no
 *   matching value is found.
 *
 * #### Complexity
 * Linear.
 *
 * #### Example
 * ```typescript
 * import { findIndex } from '@lumino/algorithm';
 *
 * interface IAnimal { species: string, name: string };
 *
 * function isCat(value: IAnimal): boolean {
 *   return value.species === 'cat';
 * }
 *
 * let data: IAnimal[] = [
 *   { species: 'dog', name: 'spot' },
 *   { species: 'cat', name: 'fluffy' },
 *   { species: 'alligator', name: 'pocho' }
 * ];
 *
 * findIndex(data, isCat);  // 1
 * ```
 */
function findIndex(object, fn) {
    var index = 0;
    var it = iter_1.iter(object);
    var value;
    while ((value = it.next()) !== undefined) {
        if (fn(value, index++)) {
            return index - 1;
        }
    }
    return -1;
}
exports.findIndex = findIndex;
/**
 * Find the minimum value in an iterable.
 *
 * @param object - The iterable or array-like object to search.
 *
 * @param fn - The 3-way comparison function to apply to the values.
 *   It should return `< 0` if the first value is less than the second.
 *   `0` if the values are equivalent, or `> 0` if the first value is
 *   greater than the second.
 *
 * @returns The minimum value in the iterable. If multiple values are
 *   equivalent to the minimum, the left-most value is returned. If
 *   the iterable is empty, this returns `undefined`.
 *
 * #### Complexity
 * Linear.
 *
 * #### Example
 * ```typescript
 * import { min } from '@lumino/algorithm';
 *
 * function numberCmp(a: number, b: number): number {
 *   return a - b;
 * }
 *
 * min([7, 4, 0, 3, 9, 4], numberCmp);  // 0
 * ```
 */
function min(object, fn) {
    var it = iter_1.iter(object);
    var value = it.next();
    if (value === undefined) {
        return undefined;
    }
    var result = value;
    while ((value = it.next()) !== undefined) {
        if (fn(value, result) < 0) {
            result = value;
        }
    }
    return result;
}
exports.min = min;
/**
 * Find the maximum value in an iterable.
 *
 * @param object - The iterable or array-like object to search.
 *
 * @param fn - The 3-way comparison function to apply to the values.
 *   It should return `< 0` if the first value is less than the second.
 *   `0` if the values are equivalent, or `> 0` if the first value is
 *   greater than the second.
 *
 * @returns The maximum value in the iterable. If multiple values are
 *   equivalent to the maximum, the left-most value is returned. If
 *   the iterable is empty, this returns `undefined`.
 *
 * #### Complexity
 * Linear.
 *
 * #### Example
 * ```typescript
 * import { max } from '@lumino/algorithm';
 *
 * function numberCmp(a: number, b: number): number {
 *   return a - b;
 * }
 *
 * max([7, 4, 0, 3, 9, 4], numberCmp);  // 9
 * ```
 */
function max(object, fn) {
    var it = iter_1.iter(object);
    var value = it.next();
    if (value === undefined) {
        return undefined;
    }
    var result = value;
    while ((value = it.next()) !== undefined) {
        if (fn(value, result) > 0) {
            result = value;
        }
    }
    return result;
}
exports.max = max;
/**
 * Find the minimum and maximum values in an iterable.
 *
 * @param object - The iterable or array-like object to search.
 *
 * @param fn - The 3-way comparison function to apply to the values.
 *   It should return `< 0` if the first value is less than the second.
 *   `0` if the values are equivalent, or `> 0` if the first value is
 *   greater than the second.
 *
 * @returns A 2-tuple of the `[min, max]` values in the iterable. If
 *   multiple values are equivalent, the left-most values are returned.
 *   If the iterable is empty, this returns `undefined`.
 *
 * #### Complexity
 * Linear.
 *
 * #### Example
 * ```typescript
 * import { minmax } from '@lumino/algorithm';
 *
 * function numberCmp(a: number, b: number): number {
 *   return a - b;
 * }
 *
 * minmax([7, 4, 0, 3, 9, 4], numberCmp);  // [0, 9]
 * ```
 */
function minmax(object, fn) {
    var it = iter_1.iter(object);
    var value = it.next();
    if (value === undefined) {
        return undefined;
    }
    var vmin = value;
    var vmax = value;
    while ((value = it.next()) !== undefined) {
        if (fn(value, vmin) < 0) {
            vmin = value;
        }
        else if (fn(value, vmax) > 0) {
            vmax = value;
        }
    }
    return [vmin, vmax];
}
exports.minmax = minmax;

})
		], [
			/* @lumino/algorithm: 13 */
			"lib/filter.js", ["cjs","js"], {"./iter": 10}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var iter_1 = require("./iter");
/**
 * Filter an iterable for values which pass a test.
 *
 * @param object - The iterable or array-like object of interest.
 *
 * @param fn - The predicate function to invoke for each value.
 *
 * @returns An iterator which yields the values which pass the test.
 *
 * #### Example
 * ```typescript
 * import { filter, toArray } from '@lumino/algorithm';
 *
 * let data = [1, 2, 3, 4, 5, 6];
 *
 * let stream = filter(data, value => value % 2 === 0);
 *
 * toArray(stream);  // [2, 4, 6]
 * ```
 */
function filter(object, fn) {
    return new FilterIterator(iter_1.iter(object), fn);
}
exports.filter = filter;
/**
 * An iterator which yields values which pass a test.
 */
var FilterIterator = /** @class */ (function () {
    /**
     * Construct a new filter iterator.
     *
     * @param source - The iterator of values of interest.
     *
     * @param fn - The predicate function to invoke for each value.
     */
    function FilterIterator(source, fn) {
        this._index = 0;
        this._source = source;
        this._fn = fn;
    }
    /**
     * Get an iterator over the object's values.
     *
     * @returns An iterator which yields the object's values.
     */
    FilterIterator.prototype.iter = function () {
        return this;
    };
    /**
     * Create an independent clone of the iterator.
     *
     * @returns A new independent clone of the iterator.
     */
    FilterIterator.prototype.clone = function () {
        var result = new FilterIterator(this._source.clone(), this._fn);
        result._index = this._index;
        return result;
    };
    /**
     * Get the next value from the iterator.
     *
     * @returns The next value from the iterator, or `undefined`.
     */
    FilterIterator.prototype.next = function () {
        var fn = this._fn;
        var it = this._source;
        var value;
        while ((value = it.next()) !== undefined) {
            if (fn(value, this._index++)) {
                return value;
            }
        }
        return undefined;
    };
    return FilterIterator;
}());
exports.FilterIterator = FilterIterator;

})
		], [
			/* @lumino/algorithm: 14 */
			"lib/enumerate.js", ["cjs","js"], {"./iter": 10}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var iter_1 = require("./iter");
/**
 * Enumerate an iterable object.
 *
 * @param object - The iterable or array-like object of interest.
 *
 * @param start - The starting enum value. The default is `0`.
 *
 * @returns An iterator which yields the enumerated values.
 *
 * #### Example
 * ```typescript
 * import { enumerate, toArray } from '@lumino/algorithm';
 *
 * let data = ['foo', 'bar', 'baz'];
 *
 * let stream = enumerate(data, 1);
 *
 * toArray(stream);  // [[1, 'foo'], [2, 'bar'], [3, 'baz']]
 * ```
 */
function enumerate(object, start) {
    if (start === void 0) { start = 0; }
    return new EnumerateIterator(iter_1.iter(object), start);
}
exports.enumerate = enumerate;
/**
 * An iterator which enumerates the source values.
 */
var EnumerateIterator = /** @class */ (function () {
    /**
     * Construct a new enumerate iterator.
     *
     * @param source - The iterator of values of interest.
     *
     * @param start - The starting enum value.
     */
    function EnumerateIterator(source, start) {
        this._source = source;
        this._index = start;
    }
    /**
     * Get an iterator over the object's values.
     *
     * @returns An iterator which yields the object's values.
     */
    EnumerateIterator.prototype.iter = function () {
        return this;
    };
    /**
     * Create an independent clone of the iterator.
     *
     * @returns A new independent clone of the iterator.
     */
    EnumerateIterator.prototype.clone = function () {
        return new EnumerateIterator(this._source.clone(), this._index);
    };
    /**
     * Get the next value from the iterator.
     *
     * @returns The next value from the iterator, or `undefined`.
     */
    EnumerateIterator.prototype.next = function () {
        var value = this._source.next();
        if (value === undefined) {
            return undefined;
        }
        return [this._index++, value];
    };
    return EnumerateIterator;
}());
exports.EnumerateIterator = EnumerateIterator;

})
		], [
			/* @lumino/algorithm: 15 */
			"lib/empty.js", ["cjs","js"], {}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create an empty iterator.
 *
 * @returns A new iterator which yields nothing.
 *
 * #### Example
 * ```typescript
 * import { empty, toArray } from '@lumino/algorithm';
 *
 * let stream = empty<number>();
 *
 * toArray(stream);  // []
 * ```
 */
function empty() {
    return new EmptyIterator();
}
exports.empty = empty;
/**
 * An iterator which is always empty.
 */
var EmptyIterator = /** @class */ (function () {
    /**
     * Construct a new empty iterator.
     */
    function EmptyIterator() {
    }
    /**
     * Get an iterator over the object's values.
     *
     * @returns An iterator which yields the object's values.
     */
    EmptyIterator.prototype.iter = function () {
        return this;
    };
    /**
     * Create an independent clone of the iterator.
     *
     * @returns A new independent clone of the iterator.
     */
    EmptyIterator.prototype.clone = function () {
        return new EmptyIterator();
    };
    /**
     * Get the next value from the iterator.
     *
     * @returns The next value from the iterator, or `undefined`.
     */
    EmptyIterator.prototype.next = function () {
        return undefined;
    };
    return EmptyIterator;
}());
exports.EmptyIterator = EmptyIterator;

})
		], [
			/* @lumino/algorithm: 16 */
			"lib/chain.js", ["cjs","js"], {"./iter": 10}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var iter_1 = require("./iter");
/**
 * Chain together several iterables.
 *
 * @param objects - The iterable or array-like objects of interest.
 *
 * @returns An iterator which yields the values of the iterables
 *   in the order in which they are supplied.
 *
 * #### Example
 * ```typescript
 * import { chain, toArray } from '@lumino/algorithm';
 *
 * let data1 = [1, 2, 3];
 * let data2 = [4, 5, 6];
 *
 * let stream = chain(data1, data2);
 *
 * toArray(stream);  // [1, 2, 3, 4, 5, 6]
 * ```
 */
function chain() {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    return new ChainIterator(iter_1.iter(objects.map(iter_1.iter)));
}
exports.chain = chain;
/**
 * An iterator which chains together several iterators.
 */
var ChainIterator = /** @class */ (function () {
    /**
     * Construct a new chain iterator.
     *
     * @param source - The iterator of iterators of interest.
     */
    function ChainIterator(source) {
        this._cloned = false;
        this._source = source;
        this._active = undefined;
    }
    /**
     * Get an iterator over the object's values.
     *
     * @returns An iterator which yields the object's values.
     */
    ChainIterator.prototype.iter = function () {
        return this;
    };
    /**
     * Create an independent clone of the iterator.
     *
     * @returns A new independent clone of the iterator.
     */
    ChainIterator.prototype.clone = function () {
        var result = new ChainIterator(this._source.clone());
        result._active = this._active && this._active.clone();
        result._cloned = true;
        this._cloned = true;
        return result;
    };
    /**
     * Get the next value from the iterator.
     *
     * @returns The next value from the iterator, or `undefined`.
     */
    ChainIterator.prototype.next = function () {
        if (this._active === undefined) {
            var active = this._source.next();
            if (active === undefined) {
                return undefined;
            }
            this._active = this._cloned ? active.clone() : active;
        }
        var value = this._active.next();
        if (value !== undefined) {
            return value;
        }
        this._active = undefined;
        return this.next();
    };
    return ChainIterator;
}());
exports.ChainIterator = ChainIterator;

})
		], [
			/* @lumino/algorithm: 17 */
			"lib/array.js", ["cjs","js"], {}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The namespace for array-specific algorithms.
 */
var ArrayExt;
(function (ArrayExt) {
    /**
     * Find the index of the first occurrence of a value in an array.
     *
     * @param array - The array-like object to search.
     *
     * @param value - The value to locate in the array. Values are
     *   compared using strict `===` equality.
     *
     * @param start - The index of the first element in the range to be
     *   searched, inclusive. The default value is `0`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @param stop - The index of the last element in the range to be
     *   searched, inclusive. The default value is `-1`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @returns The index of the first occurrence of the value, or `-1`
     *   if the value is not found.
     *
     * #### Notes
     * If `stop < start` the search will wrap at the end of the array.
     *
     * #### Complexity
     * Linear.
     *
     * #### Undefined Behavior
     * A `start` or `stop` which is non-integral.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * let data = ['one', 'two', 'three', 'four', 'one'];
     * ArrayExt.firstIndexOf(data, 'red');        // -1
     * ArrayExt.firstIndexOf(data, 'one');        // 0
     * ArrayExt.firstIndexOf(data, 'one', 1);     // 4
     * ArrayExt.firstIndexOf(data, 'two', 2);     // -1
     * ArrayExt.firstIndexOf(data, 'two', 2, 1);  // 1
     * ```
     */
    function firstIndexOf(array, value, start, stop) {
        if (start === void 0) { start = 0; }
        if (stop === void 0) { stop = -1; }
        var n = array.length;
        if (n === 0) {
            return -1;
        }
        if (start < 0) {
            start = Math.max(0, start + n);
        }
        else {
            start = Math.min(start, n - 1);
        }
        if (stop < 0) {
            stop = Math.max(0, stop + n);
        }
        else {
            stop = Math.min(stop, n - 1);
        }
        var span;
        if (stop < start) {
            span = (stop + 1) + (n - start);
        }
        else {
            span = stop - start + 1;
        }
        for (var i = 0; i < span; ++i) {
            var j = (start + i) % n;
            if (array[j] === value) {
                return j;
            }
        }
        return -1;
    }
    ArrayExt.firstIndexOf = firstIndexOf;
    /**
     * Find the index of the last occurrence of a value in an array.
     *
     * @param array - The array-like object to search.
     *
     * @param value - The value to locate in the array. Values are
     *   compared using strict `===` equality.
     *
     * @param start - The index of the first element in the range to be
     *   searched, inclusive. The default value is `-1`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @param stop - The index of the last element in the range to be
     *   searched, inclusive. The default value is `0`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @returns The index of the last occurrence of the value, or `-1`
     *   if the value is not found.
     *
     * #### Notes
     * If `start < stop` the search will wrap at the front of the array.
     *
     * #### Complexity
     * Linear.
     *
     * #### Undefined Behavior
     * A `start` or `stop` which is non-integral.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * let data = ['one', 'two', 'three', 'four', 'one'];
     * ArrayExt.lastIndexOf(data, 'red');        // -1
     * ArrayExt.lastIndexOf(data, 'one');        // 4
     * ArrayExt.lastIndexOf(data, 'one', 1);     // 0
     * ArrayExt.lastIndexOf(data, 'two', 0);     // -1
     * ArrayExt.lastIndexOf(data, 'two', 0, 1);  // 1
     * ```
     */
    function lastIndexOf(array, value, start, stop) {
        if (start === void 0) { start = -1; }
        if (stop === void 0) { stop = 0; }
        var n = array.length;
        if (n === 0) {
            return -1;
        }
        if (start < 0) {
            start = Math.max(0, start + n);
        }
        else {
            start = Math.min(start, n - 1);
        }
        if (stop < 0) {
            stop = Math.max(0, stop + n);
        }
        else {
            stop = Math.min(stop, n - 1);
        }
        var span;
        if (start < stop) {
            span = (start + 1) + (n - stop);
        }
        else {
            span = start - stop + 1;
        }
        for (var i = 0; i < span; ++i) {
            var j = (start - i + n) % n;
            if (array[j] === value) {
                return j;
            }
        }
        return -1;
    }
    ArrayExt.lastIndexOf = lastIndexOf;
    /**
     * Find the index of the first value which matches a predicate.
     *
     * @param array - The array-like object to search.
     *
     * @param fn - The predicate function to apply to the values.
     *
     * @param start - The index of the first element in the range to be
     *   searched, inclusive. The default value is `0`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @param stop - The index of the last element in the range to be
     *   searched, inclusive. The default value is `-1`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @returns The index of the first matching value, or `-1` if no
     *   matching value is found.
     *
     * #### Notes
     * If `stop < start` the search will wrap at the end of the array.
     *
     * #### Complexity
     * Linear.
     *
     * #### Undefined Behavior
     * A `start` or `stop` which is non-integral.
     *
     * Modifying the length of the array while searching.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * function isEven(value: number): boolean {
     *   return value % 2 === 0;
     * }
     *
     * let data = [1, 2, 3, 4, 3, 2, 1];
     * ArrayExt.findFirstIndex(data, isEven);       // 1
     * ArrayExt.findFirstIndex(data, isEven, 4);    // 5
     * ArrayExt.findFirstIndex(data, isEven, 6);    // -1
     * ArrayExt.findFirstIndex(data, isEven, 6, 5); // 1
     * ```
     */
    function findFirstIndex(array, fn, start, stop) {
        if (start === void 0) { start = 0; }
        if (stop === void 0) { stop = -1; }
        var n = array.length;
        if (n === 0) {
            return -1;
        }
        if (start < 0) {
            start = Math.max(0, start + n);
        }
        else {
            start = Math.min(start, n - 1);
        }
        if (stop < 0) {
            stop = Math.max(0, stop + n);
        }
        else {
            stop = Math.min(stop, n - 1);
        }
        var span;
        if (stop < start) {
            span = (stop + 1) + (n - start);
        }
        else {
            span = stop - start + 1;
        }
        for (var i = 0; i < span; ++i) {
            var j = (start + i) % n;
            if (fn(array[j], j)) {
                return j;
            }
        }
        return -1;
    }
    ArrayExt.findFirstIndex = findFirstIndex;
    /**
     * Find the index of the last value which matches a predicate.
     *
     * @param object - The array-like object to search.
     *
     * @param fn - The predicate function to apply to the values.
     *
     * @param start - The index of the first element in the range to be
     *   searched, inclusive. The default value is `-1`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @param stop - The index of the last element in the range to be
     *   searched, inclusive. The default value is `0`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @returns The index of the last matching value, or `-1` if no
     *   matching value is found.
     *
     * #### Notes
     * If `start < stop` the search will wrap at the front of the array.
     *
     * #### Complexity
     * Linear.
     *
     * #### Undefined Behavior
     * A `start` or `stop` which is non-integral.
     *
     * Modifying the length of the array while searching.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * function isEven(value: number): boolean {
     *   return value % 2 === 0;
     * }
     *
     * let data = [1, 2, 3, 4, 3, 2, 1];
     * ArrayExt.findLastIndex(data, isEven);        // 5
     * ArrayExt.findLastIndex(data, isEven, 4);     // 3
     * ArrayExt.findLastIndex(data, isEven, 0);     // -1
     * ArrayExt.findLastIndex(data, isEven, 0, 1);  // 5
     * ```
     */
    function findLastIndex(array, fn, start, stop) {
        if (start === void 0) { start = -1; }
        if (stop === void 0) { stop = 0; }
        var n = array.length;
        if (n === 0) {
            return -1;
        }
        if (start < 0) {
            start = Math.max(0, start + n);
        }
        else {
            start = Math.min(start, n - 1);
        }
        if (stop < 0) {
            stop = Math.max(0, stop + n);
        }
        else {
            stop = Math.min(stop, n - 1);
        }
        var d;
        if (start < stop) {
            d = (start + 1) + (n - stop);
        }
        else {
            d = start - stop + 1;
        }
        for (var i = 0; i < d; ++i) {
            var j = (start - i + n) % n;
            if (fn(array[j], j)) {
                return j;
            }
        }
        return -1;
    }
    ArrayExt.findLastIndex = findLastIndex;
    /**
     * Find the first value which matches a predicate.
     *
     * @param array - The array-like object to search.
     *
     * @param fn - The predicate function to apply to the values.
     *
     * @param start - The index of the first element in the range to be
     *   searched, inclusive. The default value is `0`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @param stop - The index of the last element in the range to be
     *   searched, inclusive. The default value is `-1`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @returns The first matching value, or `undefined` if no matching
     *   value is found.
     *
     * #### Notes
     * If `stop < start` the search will wrap at the end of the array.
     *
     * #### Complexity
     * Linear.
     *
     * #### Undefined Behavior
     * A `start` or `stop` which is non-integral.
     *
     * Modifying the length of the array while searching.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * function isEven(value: number): boolean {
     *   return value % 2 === 0;
     * }
     *
     * let data = [1, 2, 3, 4, 3, 2, 1];
     * ArrayExt.findFirstValue(data, isEven);       // 2
     * ArrayExt.findFirstValue(data, isEven, 2);    // 4
     * ArrayExt.findFirstValue(data, isEven, 6);    // undefined
     * ArrayExt.findFirstValue(data, isEven, 6, 5); // 2
     * ```
     */
    function findFirstValue(array, fn, start, stop) {
        if (start === void 0) { start = 0; }
        if (stop === void 0) { stop = -1; }
        var index = findFirstIndex(array, fn, start, stop);
        return index !== -1 ? array[index] : undefined;
    }
    ArrayExt.findFirstValue = findFirstValue;
    /**
     * Find the last value which matches a predicate.
     *
     * @param object - The array-like object to search.
     *
     * @param fn - The predicate function to apply to the values.
     *
     * @param start - The index of the first element in the range to be
     *   searched, inclusive. The default value is `-1`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @param stop - The index of the last element in the range to be
     *   searched, inclusive. The default value is `0`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @returns The last matching value, or `undefined` if no matching
     *   value is found.
     *
     * #### Notes
     * If `start < stop` the search will wrap at the front of the array.
     *
     * #### Complexity
     * Linear.
     *
     * #### Undefined Behavior
     * A `start` or `stop` which is non-integral.
     *
     * Modifying the length of the array while searching.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * function isEven(value: number): boolean {
     *   return value % 2 === 0;
     * }
     *
     * let data = [1, 2, 3, 4, 3, 2, 1];
     * ArrayExt.findLastValue(data, isEven);        // 2
     * ArrayExt.findLastValue(data, isEven, 4);     // 4
     * ArrayExt.findLastValue(data, isEven, 0);     // undefined
     * ArrayExt.findLastValue(data, isEven, 0, 1);  // 2
     * ```
     */
    function findLastValue(array, fn, start, stop) {
        if (start === void 0) { start = -1; }
        if (stop === void 0) { stop = 0; }
        var index = findLastIndex(array, fn, start, stop);
        return index !== -1 ? array[index] : undefined;
    }
    ArrayExt.findLastValue = findLastValue;
    /**
     * Find the index of the first element which compares `>=` to a value.
     *
     * @param array - The sorted array-like object to search.
     *
     * @param value - The value to locate in the array.
     *
     * @param fn - The 3-way comparison function to apply to the values.
     *   It should return `< 0` if an element is less than a value, `0` if
     *   an element is equal to a value, or `> 0` if an element is greater
     *   than a value.
     *
     * @param start - The index of the first element in the range to be
     *   searched, inclusive. The default value is `0`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @param stop - The index of the last element in the range to be
     *   searched, inclusive. The default value is `-1`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @returns The index of the first element which compares `>=` to the
     *   value, or `length` if there is no such element. If the computed
     *   index for `stop` is less than `start`, then the computed index
     *   for `start` is returned.
     *
     * #### Notes
     * The array must already be sorted in ascending order according to
     * the comparison function.
     *
     * #### Complexity
     * Logarithmic.
     *
     * #### Undefined Behavior
     * Searching a range which is not sorted in ascending order.
     *
     * A `start` or `stop` which is non-integral.
     *
     * Modifying the length of the array while searching.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * function numberCmp(a: number, b: number): number {
     *   return a - b;
     * }
     *
     * let data = [0, 3, 4, 7, 7, 9];
     * ArrayExt.lowerBound(data, 0, numberCmp);   // 0
     * ArrayExt.lowerBound(data, 6, numberCmp);   // 3
     * ArrayExt.lowerBound(data, 7, numberCmp);   // 3
     * ArrayExt.lowerBound(data, -1, numberCmp);  // 0
     * ArrayExt.lowerBound(data, 10, numberCmp);  // 6
     * ```
     */
    function lowerBound(array, value, fn, start, stop) {
        if (start === void 0) { start = 0; }
        if (stop === void 0) { stop = -1; }
        var n = array.length;
        if (n === 0) {
            return 0;
        }
        if (start < 0) {
            start = Math.max(0, start + n);
        }
        else {
            start = Math.min(start, n - 1);
        }
        if (stop < 0) {
            stop = Math.max(0, stop + n);
        }
        else {
            stop = Math.min(stop, n - 1);
        }
        var begin = start;
        var span = stop - start + 1;
        while (span > 0) {
            var half = span >> 1;
            var middle = begin + half;
            if (fn(array[middle], value) < 0) {
                begin = middle + 1;
                span -= half + 1;
            }
            else {
                span = half;
            }
        }
        return begin;
    }
    ArrayExt.lowerBound = lowerBound;
    /**
     * Find the index of the first element which compares `>` than a value.
     *
     * @param array - The sorted array-like object to search.
     *
     * @param value - The value to locate in the array.
     *
     * @param fn - The 3-way comparison function to apply to the values.
     *   It should return `< 0` if an element is less than a value, `0` if
     *   an element is equal to a value, or `> 0` if an element is greater
     *   than a value.
     *
     * @param start - The index of the first element in the range to be
     *   searched, inclusive. The default value is `0`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @param stop - The index of the last element in the range to be
     *   searched, inclusive. The default value is `-1`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @returns The index of the first element which compares `>` than the
     *   value, or `length` if there is no such element. If the computed
     *   index for `stop` is less than `start`, then the computed index
     *   for `start` is returned.
     *
     * #### Notes
     * The array must already be sorted in ascending order according to
     * the comparison function.
     *
     * #### Complexity
     * Logarithmic.
     *
     * #### Undefined Behavior
     * Searching a range which is not sorted in ascending order.
     *
     * A `start` or `stop` which is non-integral.
     *
     * Modifying the length of the array while searching.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * function numberCmp(a: number, b: number): number {
     *   return a - b;
     * }
     *
     * let data = [0, 3, 4, 7, 7, 9];
     * ArrayExt.upperBound(data, 0, numberCmp);   // 1
     * ArrayExt.upperBound(data, 6, numberCmp);   // 3
     * ArrayExt.upperBound(data, 7, numberCmp);   // 5
     * ArrayExt.upperBound(data, -1, numberCmp);  // 0
     * ArrayExt.upperBound(data, 10, numberCmp);  // 6
     * ```
     */
    function upperBound(array, value, fn, start, stop) {
        if (start === void 0) { start = 0; }
        if (stop === void 0) { stop = -1; }
        var n = array.length;
        if (n === 0) {
            return 0;
        }
        if (start < 0) {
            start = Math.max(0, start + n);
        }
        else {
            start = Math.min(start, n - 1);
        }
        if (stop < 0) {
            stop = Math.max(0, stop + n);
        }
        else {
            stop = Math.min(stop, n - 1);
        }
        var begin = start;
        var span = stop - start + 1;
        while (span > 0) {
            var half = span >> 1;
            var middle = begin + half;
            if (fn(array[middle], value) > 0) {
                span = half;
            }
            else {
                begin = middle + 1;
                span -= half + 1;
            }
        }
        return begin;
    }
    ArrayExt.upperBound = upperBound;
    /**
     * Test whether two arrays are shallowly equal.
     *
     * @param a - The first array-like object to compare.
     *
     * @param b - The second array-like object to compare.
     *
     * @param fn - The comparison function to apply to the elements. It
     *   should return `true` if the elements are "equal". The default
     *   compares elements using strict `===` equality.
     *
     * @returns Whether the two arrays are shallowly equal.
     *
     * #### Complexity
     * Linear.
     *
     * #### Undefined Behavior
     * Modifying the length of the arrays while comparing.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * let d1 = [0, 3, 4, 7, 7, 9];
     * let d2 = [0, 3, 4, 7, 7, 9];
     * let d3 = [42];
     * ArrayExt.shallowEqual(d1, d2);  // true
     * ArrayExt.shallowEqual(d2, d3);  // false
     * ```
     */
    function shallowEqual(a, b, fn) {
        // Check for object identity first.
        if (a === b) {
            return true;
        }
        // Bail early if the lengths are different.
        if (a.length !== b.length) {
            return false;
        }
        // Compare each element for equality.
        for (var i = 0, n = a.length; i < n; ++i) {
            if (fn ? !fn(a[i], b[i]) : a[i] !== b[i]) {
                return false;
            }
        }
        // The array are shallowly equal.
        return true;
    }
    ArrayExt.shallowEqual = shallowEqual;
    /**
     * Create a slice of an array subject to an optional step.
     *
     * @param array - The array-like object of interest.
     *
     * @param options - The options for configuring the slice.
     *
     * @returns A new array with the specified values.
     *
     * @throws An exception if the slice `step` is `0`.
     *
     * #### Complexity
     * Linear.
     *
     * #### Undefined Behavior
     * A `start`, `stop`, or `step` which is non-integral.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * let data = [0, 3, 4, 7, 7, 9];
     * ArrayExt.slice(data);                         // [0, 3, 4, 7, 7, 9]
     * ArrayExt.slice(data, { start: 2 });           // [4, 7, 7, 9]
     * ArrayExt.slice(data, { start: 0, stop: 4 });  // [0, 3, 4, 7]
     * ArrayExt.slice(data, { step: 2 });            // [0, 4, 7]
     * ArrayExt.slice(data, { step: -1 });           // [9, 7, 7, 4, 3, 0]
     * ```
     */
    function slice(array, options) {
        if (options === void 0) { options = {}; }
        // Extract the options.
        var start = options.start, stop = options.stop, step = options.step;
        // Set up the `step` value.
        if (step === undefined) {
            step = 1;
        }
        // Validate the step size.
        if (step === 0) {
            throw new Error('Slice `step` cannot be zero.');
        }
        // Look up the length of the array.
        var n = array.length;
        // Set up the `start` value.
        if (start === undefined) {
            start = step < 0 ? n - 1 : 0;
        }
        else if (start < 0) {
            start = Math.max(start + n, step < 0 ? -1 : 0);
        }
        else if (start >= n) {
            start = step < 0 ? n - 1 : n;
        }
        // Set up the `stop` value.
        if (stop === undefined) {
            stop = step < 0 ? -1 : n;
        }
        else if (stop < 0) {
            stop = Math.max(stop + n, step < 0 ? -1 : 0);
        }
        else if (stop >= n) {
            stop = step < 0 ? n - 1 : n;
        }
        // Compute the slice length.
        var length;
        if ((step < 0 && stop >= start) || (step > 0 && start >= stop)) {
            length = 0;
        }
        else if (step < 0) {
            length = Math.floor((stop - start + 1) / step + 1);
        }
        else {
            length = Math.floor((stop - start - 1) / step + 1);
        }
        // Compute the sliced result.
        var result = [];
        for (var i = 0; i < length; ++i) {
            result[i] = array[start + i * step];
        }
        // Return the result.
        return result;
    }
    ArrayExt.slice = slice;
    /**
     * Move an element in an array from one index to another.
     *
     * @param array - The mutable array-like object of interest.
     *
     * @param fromIndex - The index of the element to move. Negative
     *   values are taken as an offset from the end of the array.
     *
     * @param toIndex - The target index of the element. Negative
     *   values are taken as an offset from the end of the array.
     *
     * #### Complexity
     * Linear.
     *
     * #### Undefined Behavior
     * A `fromIndex` or `toIndex` which is non-integral.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from from '@lumino/algorithm';
     *
     * let data = [0, 1, 2, 3, 4];
     * ArrayExt.move(data, 1, 2);  // [0, 2, 1, 3, 4]
     * ArrayExt.move(data, 4, 2);  // [0, 2, 4, 1, 3]
     * ```
     */
    function move(array, fromIndex, toIndex) {
        var n = array.length;
        if (n <= 1) {
            return;
        }
        if (fromIndex < 0) {
            fromIndex = Math.max(0, fromIndex + n);
        }
        else {
            fromIndex = Math.min(fromIndex, n - 1);
        }
        if (toIndex < 0) {
            toIndex = Math.max(0, toIndex + n);
        }
        else {
            toIndex = Math.min(toIndex, n - 1);
        }
        if (fromIndex === toIndex) {
            return;
        }
        var value = array[fromIndex];
        var d = fromIndex < toIndex ? 1 : -1;
        for (var i = fromIndex; i !== toIndex; i += d) {
            array[i] = array[i + d];
        }
        array[toIndex] = value;
    }
    ArrayExt.move = move;
    /**
     * Reverse an array in-place.
     *
     * @param array - The mutable array-like object of interest.
     *
     * @param start - The index of the first element in the range to be
     *   reversed, inclusive. The default value is `0`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @param stop - The index of the last element in the range to be
     *   reversed, inclusive. The default value is `-1`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * #### Complexity
     * Linear.
     *
     * #### Undefined Behavior
     * A `start` or  `stop` index which is non-integral.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * let data = [0, 1, 2, 3, 4];
     * ArrayExt.reverse(data, 1, 3);  // [0, 3, 2, 1, 4]
     * ArrayExt.reverse(data, 3);     // [0, 3, 2, 4, 1]
     * ArrayExt.reverse(data);        // [1, 4, 2, 3, 0]
     * ```
     */
    function reverse(array, start, stop) {
        if (start === void 0) { start = 0; }
        if (stop === void 0) { stop = -1; }
        var n = array.length;
        if (n <= 1) {
            return;
        }
        if (start < 0) {
            start = Math.max(0, start + n);
        }
        else {
            start = Math.min(start, n - 1);
        }
        if (stop < 0) {
            stop = Math.max(0, stop + n);
        }
        else {
            stop = Math.min(stop, n - 1);
        }
        while (start < stop) {
            var a = array[start];
            var b = array[stop];
            array[start++] = b;
            array[stop--] = a;
        }
    }
    ArrayExt.reverse = reverse;
    /**
     * Rotate the elements of an array in-place.
     *
     * @param array - The mutable array-like object of interest.
     *
     * @param delta - The amount of rotation to apply to the elements. A
     *   positive value will rotate the elements to the left. A negative
     *   value will rotate the elements to the right.
     *
     * @param start - The index of the first element in the range to be
     *   rotated, inclusive. The default value is `0`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @param stop - The index of the last element in the range to be
     *   rotated, inclusive. The default value is `-1`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * #### Complexity
     * Linear.
     *
     * #### Undefined Behavior
     * A `delta`, `start`, or `stop` which is non-integral.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * let data = [0, 1, 2, 3, 4];
     * ArrayExt.rotate(data, 2);        // [2, 3, 4, 0, 1]
     * ArrayExt.rotate(data, -2);       // [0, 1, 2, 3, 4]
     * ArrayExt.rotate(data, 10);       // [0, 1, 2, 3, 4]
     * ArrayExt.rotate(data, 9);        // [4, 0, 1, 2, 3]
     * ArrayExt.rotate(data, 2, 1, 3);  // [4, 2, 0, 1, 3]
     * ```
     */
    function rotate(array, delta, start, stop) {
        if (start === void 0) { start = 0; }
        if (stop === void 0) { stop = -1; }
        var n = array.length;
        if (n <= 1) {
            return;
        }
        if (start < 0) {
            start = Math.max(0, start + n);
        }
        else {
            start = Math.min(start, n - 1);
        }
        if (stop < 0) {
            stop = Math.max(0, stop + n);
        }
        else {
            stop = Math.min(stop, n - 1);
        }
        if (start >= stop) {
            return;
        }
        var length = stop - start + 1;
        if (delta > 0) {
            delta = delta % length;
        }
        else if (delta < 0) {
            delta = ((delta % length) + length) % length;
        }
        if (delta === 0) {
            return;
        }
        var pivot = start + delta;
        reverse(array, start, pivot - 1);
        reverse(array, pivot, stop);
        reverse(array, start, stop);
    }
    ArrayExt.rotate = rotate;
    /**
     * Fill an array with a static value.
     *
     * @param array - The mutable array-like object to fill.
     *
     * @param value - The static value to use to fill the array.
     *
     * @param start - The index of the first element in the range to be
     *   filled, inclusive. The default value is `0`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @param stop - The index of the last element in the range to be
     *   filled, inclusive. The default value is `-1`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * #### Notes
     * If `stop < start` the fill will wrap at the end of the array.
     *
     * #### Complexity
     * Linear.
     *
     * #### Undefined Behavior
     * A `start` or `stop` which is non-integral.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * let data = ['one', 'two', 'three', 'four'];
     * ArrayExt.fill(data, 'r');        // ['r', 'r', 'r', 'r']
     * ArrayExt.fill(data, 'g', 1);     // ['r', 'g', 'g', 'g']
     * ArrayExt.fill(data, 'b', 2, 3);  // ['r', 'g', 'b', 'b']
     * ArrayExt.fill(data, 'z', 3, 1);  // ['z', 'z', 'b', 'z']
     * ```
     */
    function fill(array, value, start, stop) {
        if (start === void 0) { start = 0; }
        if (stop === void 0) { stop = -1; }
        var n = array.length;
        if (n === 0) {
            return;
        }
        if (start < 0) {
            start = Math.max(0, start + n);
        }
        else {
            start = Math.min(start, n - 1);
        }
        if (stop < 0) {
            stop = Math.max(0, stop + n);
        }
        else {
            stop = Math.min(stop, n - 1);
        }
        var span;
        if (stop < start) {
            span = (stop + 1) + (n - start);
        }
        else {
            span = stop - start + 1;
        }
        for (var i = 0; i < span; ++i) {
            array[(start + i) % n] = value;
        }
    }
    ArrayExt.fill = fill;
    /**
     * Insert a value into an array at a specific index.
     *
     * @param array - The array of interest.
     *
     * @param index - The index at which to insert the value. Negative
     *   values are taken as an offset from the end of the array.
     *
     * @param value - The value to set at the specified index.
     *
     * #### Complexity
     * Linear.
     *
     * #### Undefined Behavior
     * An `index` which is non-integral.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * let data = [0, 1, 2];
     * ArrayExt.insert(data, 0, -1);  // [-1, 0, 1, 2]
     * ArrayExt.insert(data, 2, 12);  // [-1, 0, 12, 1, 2]
     * ArrayExt.insert(data, -1, 7);  // [-1, 0, 12, 1, 7, 2]
     * ArrayExt.insert(data, 6, 19);  // [-1, 0, 12, 1, 7, 2, 19]
     * ```
     */
    function insert(array, index, value) {
        var n = array.length;
        if (index < 0) {
            index = Math.max(0, index + n);
        }
        else {
            index = Math.min(index, n);
        }
        for (var i = n; i > index; --i) {
            array[i] = array[i - 1];
        }
        array[index] = value;
    }
    ArrayExt.insert = insert;
    /**
     * Remove and return a value at a specific index in an array.
     *
     * @param array - The array of interest.
     *
     * @param index - The index of the value to remove. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @returns The value at the specified index, or `undefined` if the
     *   index is out of range.
     *
     * #### Complexity
     * Linear.
     *
     * #### Undefined Behavior
     * An `index` which is non-integral.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * let data = [0, 12, 23, 39, 14, 12, 75];
     * ArrayExt.removeAt(data, 2);   // 23
     * ArrayExt.removeAt(data, -2);  // 12
     * ArrayExt.removeAt(data, 10);  // undefined;
     * ```
     */
    function removeAt(array, index) {
        var n = array.length;
        if (index < 0) {
            index += n;
        }
        if (index < 0 || index >= n) {
            return undefined;
        }
        var value = array[index];
        for (var i = index + 1; i < n; ++i) {
            array[i - 1] = array[i];
        }
        array.length = n - 1;
        return value;
    }
    ArrayExt.removeAt = removeAt;
    /**
     * Remove the first occurrence of a value from an array.
     *
     * @param array - The array of interest.
     *
     * @param value - The value to remove from the array. Values are
     *   compared using strict `===` equality.
     *
     * @param start - The index of the first element in the range to be
     *   searched, inclusive. The default value is `0`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @param stop - The index of the last element in the range to be
     *   searched, inclusive. The default value is `-1`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @returns The index of the removed value, or `-1` if the value
     *   is not contained in the array.
     *
     * #### Notes
     * If `stop < start` the search will wrap at the end of the array.
     *
     * #### Complexity
     * Linear.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * let data = [0, 12, 23, 39, 14, 12, 75];
     * ArrayExt.removeFirstOf(data, 12);        // 1
     * ArrayExt.removeFirstOf(data, 17);        // -1
     * ArrayExt.removeFirstOf(data, 39, 3);     // -1
     * ArrayExt.removeFirstOf(data, 39, 3, 2);  // 2
     * ```
     */
    function removeFirstOf(array, value, start, stop) {
        if (start === void 0) { start = 0; }
        if (stop === void 0) { stop = -1; }
        var index = firstIndexOf(array, value, start, stop);
        if (index !== -1) {
            removeAt(array, index);
        }
        return index;
    }
    ArrayExt.removeFirstOf = removeFirstOf;
    /**
     * Remove the last occurrence of a value from an array.
     *
     * @param array - The array of interest.
     *
     * @param value - The value to remove from the array. Values are
     *   compared using strict `===` equality.
     *
     * @param start - The index of the first element in the range to be
     *   searched, inclusive. The default value is `-1`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @param stop - The index of the last element in the range to be
     *   searched, inclusive. The default value is `0`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @returns The index of the removed value, or `-1` if the value
     *   is not contained in the array.
     *
     * #### Notes
     * If `start < stop` the search will wrap at the end of the array.
     *
     * #### Complexity
     * Linear.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * let data = [0, 12, 23, 39, 14, 12, 75];
     * ArrayExt.removeLastOf(data, 12);        // 5
     * ArrayExt.removeLastOf(data, 17);        // -1
     * ArrayExt.removeLastOf(data, 39, 2);     // -1
     * ArrayExt.removeLastOf(data, 39, 2, 3);  // 3
     * ```
     */
    function removeLastOf(array, value, start, stop) {
        if (start === void 0) { start = -1; }
        if (stop === void 0) { stop = 0; }
        var index = lastIndexOf(array, value, start, stop);
        if (index !== -1) {
            removeAt(array, index);
        }
        return index;
    }
    ArrayExt.removeLastOf = removeLastOf;
    /**
     * Remove all occurrences of a value from an array.
     *
     * @param array - The array of interest.
     *
     * @param value - The value to remove from the array. Values are
     *   compared using strict `===` equality.
     *
     * @param start - The index of the first element in the range to be
     *   searched, inclusive. The default value is `0`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @param stop - The index of the last element in the range to be
     *   searched, inclusive. The default value is `-1`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @returns The number of elements removed from the array.
     *
     * #### Notes
     * If `stop < start` the search will conceptually wrap at the end of
     * the array, however the array will be traversed front-to-back.
     *
     * #### Complexity
     * Linear.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * let data = [14, 12, 23, 39, 14, 12, 19, 14];
     * ArrayExt.removeAllOf(data, 12);        // 2
     * ArrayExt.removeAllOf(data, 17);        // 0
     * ArrayExt.removeAllOf(data, 14, 1, 4);  // 1
     * ```
     */
    function removeAllOf(array, value, start, stop) {
        if (start === void 0) { start = 0; }
        if (stop === void 0) { stop = -1; }
        var n = array.length;
        if (n === 0) {
            return 0;
        }
        if (start < 0) {
            start = Math.max(0, start + n);
        }
        else {
            start = Math.min(start, n - 1);
        }
        if (stop < 0) {
            stop = Math.max(0, stop + n);
        }
        else {
            stop = Math.min(stop, n - 1);
        }
        var count = 0;
        for (var i = 0; i < n; ++i) {
            if (start <= stop && (i >= start && i <= stop) && array[i] === value) {
                count++;
            }
            else if (stop < start && (i <= stop || i >= start) && array[i] === value) {
                count++;
            }
            else if (count > 0) {
                array[i - count] = array[i];
            }
        }
        if (count > 0) {
            array.length = n - count;
        }
        return count;
    }
    ArrayExt.removeAllOf = removeAllOf;
    /**
     * Remove the first occurrence of a value which matches a predicate.
     *
     * @param array - The array of interest.
     *
     * @param fn - The predicate function to apply to the values.
     *
     * @param start - The index of the first element in the range to be
     *   searched, inclusive. The default value is `0`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @param stop - The index of the last element in the range to be
     *   searched, inclusive. The default value is `-1`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @returns The removed `{ index, value }`, which will be `-1` and
     *   `undefined` if the value is not contained in the array.
     *
     * #### Notes
     * If `stop < start` the search will wrap at the end of the array.
     *
     * #### Complexity
     * Linear.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * function isEven(value: number): boolean {
     *   return value % 2 === 0;
     * }
     *
     * let data = [0, 12, 23, 39, 14, 12, 75];
     * ArrayExt.removeFirstWhere(data, isEven);     // { index: 0, value: 0 }
     * ArrayExt.removeFirstWhere(data, isEven, 2);  // { index: 3, value: 14 }
     * ArrayExt.removeFirstWhere(data, isEven, 4);  // { index: -1, value: undefined }
     * ```
     */
    function removeFirstWhere(array, fn, start, stop) {
        if (start === void 0) { start = 0; }
        if (stop === void 0) { stop = -1; }
        var value;
        var index = findFirstIndex(array, fn, start, stop);
        if (index !== -1) {
            value = removeAt(array, index);
        }
        return { index: index, value: value };
    }
    ArrayExt.removeFirstWhere = removeFirstWhere;
    /**
     * Remove the last occurrence of a value which matches a predicate.
     *
     * @param array - The array of interest.
     *
     * @param fn - The predicate function to apply to the values.
     *
     * @param start - The index of the first element in the range to be
     *   searched, inclusive. The default value is `-1`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @param stop - The index of the last element in the range to be
     *   searched, inclusive. The default value is `0`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @returns The removed `{ index, value }`, which will be `-1` and
     *   `undefined` if the value is not contained in the array.
     *
     * #### Notes
     * If `start < stop` the search will wrap at the end of the array.
     *
     * #### Complexity
     * Linear.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * function isEven(value: number): boolean {
     *   return value % 2 === 0;
     * }
     *
     * let data = [0, 12, 23, 39, 14, 12, 75];
     * ArrayExt.removeLastWhere(data, isEven);        // { index: 5, value: 12 }
     * ArrayExt.removeLastWhere(data, isEven, 2);     // { index: 1, value: 12 }
     * ArrayExt.removeLastWhere(data, isEven, 2, 1);  // { index: -1, value: undefined }
     * ```
     */
    function removeLastWhere(array, fn, start, stop) {
        if (start === void 0) { start = -1; }
        if (stop === void 0) { stop = 0; }
        var value;
        var index = findLastIndex(array, fn, start, stop);
        if (index !== -1) {
            value = removeAt(array, index);
        }
        return { index: index, value: value };
    }
    ArrayExt.removeLastWhere = removeLastWhere;
    /**
     * Remove all occurrences of values which match a predicate.
     *
     * @param array - The array of interest.
     *
     * @param fn - The predicate function to apply to the values.
     *
     * @param start - The index of the first element in the range to be
     *   searched, inclusive. The default value is `0`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @param stop - The index of the last element in the range to be
     *   searched, inclusive. The default value is `-1`. Negative values
     *   are taken as an offset from the end of the array.
     *
     * @returns The number of elements removed from the array.
     *
     * #### Notes
     * If `stop < start` the search will conceptually wrap at the end of
     * the array, however the array will be traversed front-to-back.
     *
     * #### Complexity
     * Linear.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@lumino/algorithm';
     *
     * function isEven(value: number): boolean {
     *   return value % 2 === 0;
     * }
     *
     * function isNegative(value: number): boolean {
     *   return value < 0;
     * }
     *
     * let data = [0, 12, -13, -9, 23, 39, 14, -15, 12, 75];
     * ArrayExt.removeAllWhere(data, isEven);            // 4
     * ArrayExt.removeAllWhere(data, isNegative, 0, 3);  // 2
     * ```
     */
    function removeAllWhere(array, fn, start, stop) {
        if (start === void 0) { start = 0; }
        if (stop === void 0) { stop = -1; }
        var n = array.length;
        if (n === 0) {
            return 0;
        }
        if (start < 0) {
            start = Math.max(0, start + n);
        }
        else {
            start = Math.min(start, n - 1);
        }
        if (stop < 0) {
            stop = Math.max(0, stop + n);
        }
        else {
            stop = Math.min(stop, n - 1);
        }
        var count = 0;
        for (var i = 0; i < n; ++i) {
            if (start <= stop && (i >= start && i <= stop) && fn(array[i], i)) {
                count++;
            }
            else if (stop < start && (i <= stop || i >= start) && fn(array[i], i)) {
                count++;
            }
            else if (count > 0) {
                array[i - count] = array[i];
            }
        }
        if (count > 0) {
            array.length = n - count;
        }
        return count;
    }
    ArrayExt.removeAllWhere = removeAllWhere;
})(ArrayExt = exports.ArrayExt || (exports.ArrayExt = {}));

})
		]
	]
}, {
	name: "@lumino/collections",
	version: "1.2.3",
	root: "node_modules/@lumino/collections",
	main: "lib/index.js",
	files: [
		[
			/* @lumino/collections: 18 */
			"lib/linkedlist.js", ["cjs","js"], {"@lumino/algorithm": 11}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
/**
 * A generic doubly-linked list.
 */
var LinkedList = /** @class */ (function () {
    /**
     * Construct a new linked list.
     */
    function LinkedList() {
        this._first = null;
        this._last = null;
        this._size = 0;
    }
    Object.defineProperty(LinkedList.prototype, "isEmpty", {
        /**
         * Whether the list is empty.
         *
         * #### Complexity
         * Constant.
         */
        get: function () {
            return this._size === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkedList.prototype, "size", {
        /**
         * The size of the list.
         *
         * #### Complexity
         * `O(1)`
         *
         * #### Notes
         * This is equivalent to `length`.
         */
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkedList.prototype, "length", {
        /**
         * The length of the list.
         *
         * #### Complexity
         * Constant.
         *
         * #### Notes
         * This is equivalent to `size`.
         *
         * This property is deprecated.
         */
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkedList.prototype, "first", {
        /**
         * The first value in the list.
         *
         * This is `undefined` if the list is empty.
         *
         * #### Complexity
         * Constant.
         */
        get: function () {
            return this._first ? this._first.value : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkedList.prototype, "last", {
        /**
         * The last value in the list.
         *
         * This is `undefined` if the list is empty.
         *
         * #### Complexity
         * Constant.
         */
        get: function () {
            return this._last ? this._last.value : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkedList.prototype, "firstNode", {
        /**
         * The first node in the list.
         *
         * This is `null` if the list is empty.
         *
         * #### Complexity
         * Constant.
         */
        get: function () {
            return this._first;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkedList.prototype, "lastNode", {
        /**
         * The last node in the list.
         *
         * This is `null` if the list is empty.
         *
         * #### Complexity
         * Constant.
         */
        get: function () {
            return this._last;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Create an iterator over the values in the list.
     *
     * @returns A new iterator starting with the first value.
     *
     * #### Complexity
     * Constant.
     */
    LinkedList.prototype.iter = function () {
        return new LinkedList.ForwardValueIterator(this._first);
    };
    /**
     * Create a reverse iterator over the values in the list.
     *
     * @returns A new iterator starting with the last value.
     *
     * #### Complexity
     * Constant.
     */
    LinkedList.prototype.retro = function () {
        return new LinkedList.RetroValueIterator(this._last);
    };
    /**
     * Create an iterator over the nodes in the list.
     *
     * @returns A new iterator starting with the first node.
     *
     * #### Complexity
     * Constant.
     */
    LinkedList.prototype.nodes = function () {
        return new LinkedList.ForwardNodeIterator(this._first);
    };
    /**
     * Create a reverse iterator over the nodes in the list.
     *
     * @returns A new iterator starting with the last node.
     *
     * #### Complexity
     * Constant.
     */
    LinkedList.prototype.retroNodes = function () {
        return new LinkedList.RetroNodeIterator(this._last);
    };
    /**
     * Assign new values to the list, replacing all current values.
     *
     * @param values - The values to assign to the list.
     *
     * #### Complexity
     * Linear.
     */
    LinkedList.prototype.assign = function (values) {
        var _this = this;
        this.clear();
        algorithm_1.each(values, function (value) { _this.addLast(value); });
    };
    /**
     * Add a value to the end of the list.
     *
     * @param value - The value to add to the end of the list.
     *
     * #### Complexity
     * Constant.
     *
     * #### Notes
     * This is equivalent to `addLast`.
     */
    LinkedList.prototype.push = function (value) {
        this.addLast(value);
    };
    /**
     * Remove and return the value at the end of the list.
     *
     * @returns The removed value, or `undefined` if the list is empty.
     *
     * #### Complexity
     * Constant.
     *
     * #### Notes
     * This is equivalent to `removeLast`.
     */
    LinkedList.prototype.pop = function () {
        return this.removeLast();
    };
    /**
     * Add a value to the beginning of the list.
     *
     * @param value - The value to add to the beginning of the list.
     *
     * #### Complexity
     * Constant.
     *
     * #### Notes
     * This is equivalent to `addFirst`.
     */
    LinkedList.prototype.shift = function (value) {
        this.addFirst(value);
    };
    /**
     * Remove and return the value at the beginning of the list.
     *
     * @returns The removed value, or `undefined` if the list is empty.
     *
     * #### Complexity
     * Constant.
     *
     * #### Notes
     * This is equivalent to `removeFirst`.
     */
    LinkedList.prototype.unshift = function () {
        return this.removeFirst();
    };
    /**
     * Add a value to the beginning of the list.
     *
     * @param value - The value to add to the beginning of the list.
     *
     * @returns The list node which holds the value.
     *
     * #### Complexity
     * Constant.
     */
    LinkedList.prototype.addFirst = function (value) {
        var node = new Private.LinkedListNode(this, value);
        if (!this._first) {
            this._first = node;
            this._last = node;
        }
        else {
            node.next = this._first;
            this._first.prev = node;
            this._first = node;
        }
        this._size++;
        return node;
    };
    /**
     * Add a value to the end of the list.
     *
     * @param value - The value to add to the end of the list.
     *
     * @returns The list node which holds the value.
     *
     * #### Complexity
     * Constant.
     */
    LinkedList.prototype.addLast = function (value) {
        var node = new Private.LinkedListNode(this, value);
        if (!this._last) {
            this._first = node;
            this._last = node;
        }
        else {
            node.prev = this._last;
            this._last.next = node;
            this._last = node;
        }
        this._size++;
        return node;
    };
    /**
     * Insert a value before a specific node in the list.
     *
     * @param value - The value to insert before the reference node.
     *
     * @param ref - The reference node of interest. If this is `null`,
     *   the value will be added to the beginning of the list.
     *
     * @returns The list node which holds the value.
     *
     * #### Notes
     * The reference node must be owned by the list.
     *
     * #### Complexity
     * Constant.
     */
    LinkedList.prototype.insertBefore = function (value, ref) {
        if (!ref || ref === this._first) {
            return this.addFirst(value);
        }
        if (!(ref instanceof Private.LinkedListNode) || ref.list !== this) {
            throw new Error('Reference node is not owned by the list.');
        }
        var node = new Private.LinkedListNode(this, value);
        var _ref = ref;
        var prev = _ref.prev;
        node.next = _ref;
        node.prev = prev;
        _ref.prev = node;
        prev.next = node;
        this._size++;
        return node;
    };
    /**
     * Insert a value after a specific node in the list.
     *
     * @param value - The value to insert after the reference node.
     *
     * @param ref - The reference node of interest. If this is `null`,
     *   the value will be added to the end of the list.
     *
     * @returns The list node which holds the value.
     *
     * #### Notes
     * The reference node must be owned by the list.
     *
     * #### Complexity
     * Constant.
     */
    LinkedList.prototype.insertAfter = function (value, ref) {
        if (!ref || ref === this._last) {
            return this.addLast(value);
        }
        if (!(ref instanceof Private.LinkedListNode) || ref.list !== this) {
            throw new Error('Reference node is not owned by the list.');
        }
        var node = new Private.LinkedListNode(this, value);
        var _ref = ref;
        var next = _ref.next;
        node.next = next;
        node.prev = _ref;
        _ref.next = node;
        next.prev = node;
        this._size++;
        return node;
    };
    /**
     * Remove and return the value at the beginning of the list.
     *
     * @returns The removed value, or `undefined` if the list is empty.
     *
     * #### Complexity
     * Constant.
     */
    LinkedList.prototype.removeFirst = function () {
        var node = this._first;
        if (!node) {
            return undefined;
        }
        if (node === this._last) {
            this._first = null;
            this._last = null;
        }
        else {
            this._first = node.next;
            this._first.prev = null;
        }
        node.list = null;
        node.next = null;
        node.prev = null;
        this._size--;
        return node.value;
    };
    /**
     * Remove and return the value at the end of the list.
     *
     * @returns The removed value, or `undefined` if the list is empty.
     *
     * #### Complexity
     * Constant.
     */
    LinkedList.prototype.removeLast = function () {
        var node = this._last;
        if (!node) {
            return undefined;
        }
        if (node === this._first) {
            this._first = null;
            this._last = null;
        }
        else {
            this._last = node.prev;
            this._last.next = null;
        }
        node.list = null;
        node.next = null;
        node.prev = null;
        this._size--;
        return node.value;
    };
    /**
     * Remove a specific node from the list.
     *
     * @param node - The node to remove from the list.
     *
     * #### Complexity
     * Constant.
     *
     * #### Notes
     * The node must be owned by the list.
     */
    LinkedList.prototype.removeNode = function (node) {
        if (!(node instanceof Private.LinkedListNode) || node.list !== this) {
            throw new Error('Node is not owned by the list.');
        }
        var _node = node;
        if (_node === this._first && _node === this._last) {
            this._first = null;
            this._last = null;
        }
        else if (_node === this._first) {
            this._first = _node.next;
            this._first.prev = null;
        }
        else if (_node === this._last) {
            this._last = _node.prev;
            this._last.next = null;
        }
        else {
            _node.next.prev = _node.prev;
            _node.prev.next = _node.next;
        }
        _node.list = null;
        _node.next = null;
        _node.prev = null;
        this._size--;
    };
    /**
     * Remove all values from the list.
     *
     * #### Complexity
     * Linear.
     */
    LinkedList.prototype.clear = function () {
        var node = this._first;
        while (node) {
            var next = node.next;
            node.list = null;
            node.prev = null;
            node.next = null;
            node = next;
        }
        this._first = null;
        this._last = null;
        this._size = 0;
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
/**
 * The namespace for the `LinkedList` class statics.
 */
(function (LinkedList) {
    /**
     * Create a linked list from an iterable of values.
     *
     * @param values - The iterable or array-like object of interest.
     *
     * @returns A new linked list initialized with the given values.
     *
     * #### Complexity
     * Linear.
     */
    function from(values) {
        var list = new LinkedList();
        list.assign(values);
        return list;
    }
    LinkedList.from = from;
    /**
     * A forward iterator for values in a linked list.
     */
    var ForwardValueIterator = /** @class */ (function () {
        /**
         * Construct a forward value iterator.
         *
         * @param node - The first node in the list.
         */
        function ForwardValueIterator(node) {
            this._node = node;
        }
        /**
         * Get an iterator over the object's values.
         *
         * @returns An iterator which yields the object's values.
         */
        ForwardValueIterator.prototype.iter = function () {
            return this;
        };
        /**
         * Create an independent clone of the iterator.
         *
         * @returns A new independent clone of the iterator.
         */
        ForwardValueIterator.prototype.clone = function () {
            return new ForwardValueIterator(this._node);
        };
        /**
         * Get the next value from the iterator.
         *
         * @returns The next value from the iterator, or `undefined`.
         */
        ForwardValueIterator.prototype.next = function () {
            if (!this._node) {
                return undefined;
            }
            var node = this._node;
            this._node = node.next;
            return node.value;
        };
        return ForwardValueIterator;
    }());
    LinkedList.ForwardValueIterator = ForwardValueIterator;
    /**
     * A reverse iterator for values in a linked list.
     */
    var RetroValueIterator = /** @class */ (function () {
        /**
         * Construct a retro value iterator.
         *
         * @param node - The last node in the list.
         */
        function RetroValueIterator(node) {
            this._node = node;
        }
        /**
         * Get an iterator over the object's values.
         *
         * @returns An iterator which yields the object's values.
         */
        RetroValueIterator.prototype.iter = function () {
            return this;
        };
        /**
         * Create an independent clone of the iterator.
         *
         * @returns A new independent clone of the iterator.
         */
        RetroValueIterator.prototype.clone = function () {
            return new RetroValueIterator(this._node);
        };
        /**
         * Get the next value from the iterator.
         *
         * @returns The next value from the iterator, or `undefined`.
         */
        RetroValueIterator.prototype.next = function () {
            if (!this._node) {
                return undefined;
            }
            var node = this._node;
            this._node = node.prev;
            return node.value;
        };
        return RetroValueIterator;
    }());
    LinkedList.RetroValueIterator = RetroValueIterator;
    /**
     * A forward iterator for nodes in a linked list.
     */
    var ForwardNodeIterator = /** @class */ (function () {
        /**
         * Construct a forward node iterator.
         *
         * @param node - The first node in the list.
         */
        function ForwardNodeIterator(node) {
            this._node = node;
        }
        /**
         * Get an iterator over the object's values.
         *
         * @returns An iterator which yields the object's values.
         */
        ForwardNodeIterator.prototype.iter = function () {
            return this;
        };
        /**
         * Create an independent clone of the iterator.
         *
         * @returns A new independent clone of the iterator.
         */
        ForwardNodeIterator.prototype.clone = function () {
            return new ForwardNodeIterator(this._node);
        };
        /**
         * Get the next value from the iterator.
         *
         * @returns The next value from the iterator, or `undefined`.
         */
        ForwardNodeIterator.prototype.next = function () {
            if (!this._node) {
                return undefined;
            }
            var node = this._node;
            this._node = node.next;
            return node;
        };
        return ForwardNodeIterator;
    }());
    LinkedList.ForwardNodeIterator = ForwardNodeIterator;
    /**
     * A reverse iterator for nodes in a linked list.
     */
    var RetroNodeIterator = /** @class */ (function () {
        /**
         * Construct a retro node iterator.
         *
         * @param node - The last node in the list.
         */
        function RetroNodeIterator(node) {
            this._node = node;
        }
        /**
         * Get an iterator over the object's values.
         *
         * @returns An iterator which yields the object's values.
         */
        RetroNodeIterator.prototype.iter = function () {
            return this;
        };
        /**
         * Create an independent clone of the iterator.
         *
         * @returns A new independent clone of the iterator.
         */
        RetroNodeIterator.prototype.clone = function () {
            return new RetroNodeIterator(this._node);
        };
        /**
         * Get the next value from the iterator.
         *
         * @returns The next value from the iterator, or `undefined`.
         */
        RetroNodeIterator.prototype.next = function () {
            if (!this._node) {
                return undefined;
            }
            var node = this._node;
            this._node = node.prev;
            return node;
        };
        return RetroNodeIterator;
    }());
    LinkedList.RetroNodeIterator = RetroNodeIterator;
})(LinkedList = exports.LinkedList || (exports.LinkedList = {}));
exports.LinkedList = LinkedList;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * The internal linked list node implementation.
     */
    var LinkedListNode = /** @class */ (function () {
        /**
         * Construct a new linked list node.
         *
         * @param list - The list which owns the node.
         *
         * @param value - The value for the link.
         */
        function LinkedListNode(list, value) {
            /**
             * The linked list which created and owns the node.
             */
            this.list = null;
            /**
             * The next node in the list.
             */
            this.next = null;
            /**
             * The previous node in the list.
             */
            this.prev = null;
            this.list = list;
            this.value = value;
        }
        return LinkedListNode;
    }());
    Private.LinkedListNode = LinkedListNode;
})(Private || (Private = {}));

})
		], [
			/* @lumino/collections: 19 */
			"lib/index.js", ["cjs","js"], {"./bplustree": 20, "./linkedlist": 18}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
__export(require("./bplustree"));
__export(require("./linkedlist"));

})
		], [
			/* @lumino/collections: 20 */
			"lib/bplustree.js", ["cjs","js"], {"@lumino/algorithm": 11}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2018, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
/**
 * A generic B+ tree.
 *
 * #### Notes
 * Most operations have `O(log32 n)` or better complexity.
 */
var BPlusTree = /** @class */ (function () {
    /**
     * Construct a new B+ tree.
     *
     * @param cmp - The item comparison function for the tree.
     */
    function BPlusTree(cmp) {
        this._root = new Private.LeafNode();
        this.cmp = cmp;
    }
    Object.defineProperty(BPlusTree.prototype, "isEmpty", {
        /**
         * Whether the tree is empty.
         *
         * #### Complexity
         * `O(1)`
         */
        get: function () {
            return this._root.size === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BPlusTree.prototype, "size", {
        /**
         * The size of the tree.
         *
         * #### Complexity
         * `O(1)`
         */
        get: function () {
            return this._root.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BPlusTree.prototype, "first", {
        /**
         * The first item in the tree.
         *
         * This is `undefined` if the tree is empty.
         *
         * #### Complexity
         * `O(log32 n)`
         */
        get: function () {
            var node = Private.firstLeaf(this._root);
            return node.size > 0 ? node.items[0] : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BPlusTree.prototype, "last", {
        /**
         * The last item in the tree.
         *
         * This is `undefined` if the tree is empty.
         *
         * #### Complexity
         * `O(log32 n)`
         */
        get: function () {
            var node = Private.lastLeaf(this._root);
            return node.size > 0 ? node.items[node.size - 1] : undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Create an iterator over the items in the tree.
     *
     * @returns A new iterator starting with the first item.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    BPlusTree.prototype.iter = function () {
        return Private.iterItems(this._root);
    };
    /**
     * Create a reverse iterator over the items in the tree.
     *
     * @returns A new iterator starting with the last item.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    BPlusTree.prototype.retro = function () {
        return Private.retroItems(this._root);
    };
    /**
     * Create an iterator for a slice of items in the tree.
     *
     * @param start - The index of the first item, inclusive. This
     *   should be `< stop`. Negative values are taken as an offset
     *   from the end of the tree. The default is `0`.
     *
     * @param stop - The index of the last item, exclusive. This
     *   should be `> start`. Negative values are taken as an offset
     *   from the end of the tree. The default is `size`.
     *
     * @returns A new iterator starting with the specified item.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    BPlusTree.prototype.slice = function (start, stop) {
        return Private.sliceItems(this._root, start, stop);
    };
    /**
     * Create a reverse iterator for a slice of items in the tree.
     *
     * @param start - The index of the first item, inclusive. This
     *   should be `> stop`. Negative values are taken as an offset
     *   from the end of the tree. The default is `size - 1`.
     *
     * @param stop - The index of the last item, exclusive. This
     *   should be `< start`. Negative values are taken as an offset
     *   from the end of the tree. The default is `-size - 1`.
     *
     * @returns A new reverse iterator starting with the specified item.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    BPlusTree.prototype.retroSlice = function (start, stop) {
        return Private.retroSliceItems(this._root, start, stop);
    };
    /**
     * Get the item at a particular index.
     *
     * @param index - The index of the item of interest. Negative
     *   values are taken as an offset from the end of the tree.
     *
     * @returns The item at the specified index, or `undefined` if
     *   the index is out of range.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    BPlusTree.prototype.at = function (index) {
        return Private.itemAt(this._root, index);
    };
    /**
     * Test whether the tree has an item which matches a key.
     *
     * @param key - The key of interest.
     *
     * @param cmp - A function which compares an item against the key.
     *
     * @returns `true` if the tree has an item which matches the given
     *   key, `false` otherwise.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    BPlusTree.prototype.has = function (key, cmp) {
        return Private.hasItem(this._root, key, cmp);
    };
    /**
     * Get the index of an item which matches a key.
     *
     * @param key - The key of interest.
     *
     * @param cmp - A function which compares an item against the key.
     *
     * @returns The index of the item which matches the given key. A
     *   negative value means that a matching item does not exist in
     *   the tree, but if one did it would reside at `-index - 1`.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    BPlusTree.prototype.indexOf = function (key, cmp) {
        return Private.indexOf(this._root, key, cmp);
    };
    /**
     * Get the item which matches a key.
     *
     * @param item - The key of interest.
     *
     * @param cmp - A function which compares an item against the key.
     *
     * @returns The item which matches the given key, or `undefined` if
     *   the tree does not have a matching item.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    BPlusTree.prototype.get = function (key, cmp) {
        return Private.getItem(this._root, key, cmp);
    };
    /**
     * Assign new items to the tree, replacing all current items.
     *
     * @param items - The items to assign to the tree.
     *
     * #### Complexity
     * `O(n log32 n)`
     */
    BPlusTree.prototype.assign = function (items) {
        this.clear();
        this.update(items);
    };
    /**
     * Insert an item into the tree.
     *
     * @param item - The item of interest.
     *
     * @returns If the given item matches an existing item in the tree,
     *   the given item will replace it, and the existing item will be
     *   returned. Otherwise, this method returns `undefined`.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    BPlusTree.prototype.insert = function (item) {
        var existing = Private.insertItem(this._root, item, this.cmp);
        this._root = Private.maybeSplitRoot(this._root);
        return existing;
    };
    /**
     * Update the tree with multiple items.
     *
     * @param items - The items to insert into the tree.
     *
     * #### Complexity
     * `O(k log32 n)`
     */
    BPlusTree.prototype.update = function (items) {
        var _this = this;
        algorithm_1.each(items, function (item) { _this.insert(item); });
    };
    /**
     * Delete an item which matches a particular key.
     *
     * @param key - The key of interest.
     *
     * @param cmp - A function which compares an item against the key.
     *
     * @returns The item removed from the tree, or `undefined` if no
     *   item matched the given key.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    BPlusTree.prototype.delete = function (key, cmp) {
        var item = Private.deleteItem(this._root, key, cmp);
        this._root = Private.maybeExtractRoot(this._root);
        return item;
    };
    /**
     * Remove an item at a particular index.
     *
     * @param index - The index of the item to remove. Negative
     *   values are taken as an offset from the end of the tree.
     *
     * @returns The item removed from the tree, or `undefined` if
     *   the given index is out of range.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    BPlusTree.prototype.remove = function (index) {
        var item = Private.removeItem(this._root, index);
        this._root = Private.maybeExtractRoot(this._root);
        return item;
    };
    /**
     * Clear the contents of the tree.
     *
     * #### Complexity
     * `O(n)`
     */
    BPlusTree.prototype.clear = function () {
        Private.clear(this._root);
        this._root = new Private.LeafNode();
    };
    return BPlusTree;
}());
exports.BPlusTree = BPlusTree;
/**
 * The namespace for the `BPlusTree` class statics.
 */
(function (BPlusTree) {
    /**
     * Create a new B+ tree populated with the given items.
     *
     * @param items - The items to add to the tree.
     *
     * @param cmp - The item comparison function for the tree.
     *
     * @returns A new B+ tree populated with the given items.
     *
     * #### Complexity
     * `O(n log32 n)`
     */
    function from(items, cmp) {
        var tree = new BPlusTree(cmp);
        tree.assign(items);
        return tree;
    }
    BPlusTree.from = from;
})(BPlusTree = exports.BPlusTree || (exports.BPlusTree = {}));
exports.BPlusTree = BPlusTree;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * A branch node in a B+ tree.
     */
    var BranchNode = /** @class */ (function () {
        function BranchNode() {
            /**
             * The left-most item of each child subtree.
             */
            this.items = [];
            /**
             * The cumulative sizes of each child subtree.
             */
            this.sizes = [];
            /**
             * The child nodes of this branch node.
             */
            this.children = [];
        }
        Object.defineProperty(BranchNode.prototype, "type", {
            /**
             * The discriminated type of the node.
             */
            get: function () {
                return 0 /* Branch */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BranchNode.prototype, "size", {
            /**
             * The total number of items in the subtree.
             */
            get: function () {
                return this.sizes[this.sizes.length - 1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BranchNode.prototype, "width", {
            /**
             * The tree width of the node.
             */
            get: function () {
                return this.children.length;
            },
            enumerable: true,
            configurable: true
        });
        return BranchNode;
    }());
    Private.BranchNode = BranchNode;
    /**
     * A leaf node in a B+ tree.
     */
    var LeafNode = /** @class */ (function () {
        function LeafNode() {
            /**
             * The next sibling leaf node of this leaf node.
             */
            this.next = null;
            /**
             * The previous sibling leaf node of this leaf node.
             */
            this.prev = null;
            /**
             * The items of the leaf.
             */
            this.items = [];
        }
        Object.defineProperty(LeafNode.prototype, "type", {
            /**
             * The discriminated type of the node.
             */
            get: function () {
                return 1 /* Leaf */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LeafNode.prototype, "size", {
            /**
             * The total number of items in the leaf.
             */
            get: function () {
                return this.items.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LeafNode.prototype, "width", {
            /**
             * The tree width of the node.
             */
            get: function () {
                return this.items.length;
            },
            enumerable: true,
            configurable: true
        });
        return LeafNode;
    }());
    Private.LeafNode = LeafNode;
    /**
     * Get the first leaf node in the tree.
     *
     * @param node - The root node of interest.
     *
     * @returns The first leaf node in the tree.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    function firstLeaf(node) {
        while (node.type === 0 /* Branch */) {
            node = node.children[0];
        }
        return node;
    }
    Private.firstLeaf = firstLeaf;
    /**
     * Get the last leaf node in the tree.
     *
     * @param node - The root node of interest.
     *
     * @returns The last leaf node in the tree.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    function lastLeaf(node) {
        while (node.type === 0 /* Branch */) {
            node = node.children[node.children.length - 1];
        }
        return node;
    }
    Private.lastLeaf = lastLeaf;
    /**
     * Create a forward iterator for the items in the tree.
     *
     * @param node - The root node of interest.
     *
     * @returns A new forward iterator starting with the first item.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    function iterItems(node) {
        var leaf = firstLeaf(node);
        return new ForwardIterator(leaf, 0, -1);
    }
    Private.iterItems = iterItems;
    /**
     * Create a reverse iterator for the items in the tree.
     *
     * @param node - The root node of interest.
     *
     * @returns A new reverse iterator starting with the last item.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    function retroItems(node) {
        var leaf = lastLeaf(node);
        return new RetroIterator(leaf, leaf.size - 1, -1);
    }
    Private.retroItems = retroItems;
    /**
     * Create an iterator for a slice of items in the tree.
     *
     * @param node - The root node of interest.
     *
     * @param start - The index of the first item, inclusive. This
     *   should be `< stop`. Negative values are taken as an offset
     *   from the end of the tree. The default is `0`.
     *
     * @param stop - The index of the last item, exclusive. This
     *   should be `> start`. Negative values are taken as an offset
     *   from the end of the tree. The default is `size`.
     *
     * @returns A new iterator starting with the specified item.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    function sliceItems(node, start, stop) {
        // Normalize the start index.
        if (start === undefined) {
            start = 0;
        }
        else if (start < 0) {
            start = Math.max(0, start + node.size);
        }
        else {
            start = Math.min(start, node.size);
        }
        // Normalize the stop index.
        if (stop === undefined) {
            stop = node.size;
        }
        else if (stop < 0) {
            stop = Math.max(0, stop + node.size);
        }
        else {
            stop = Math.min(stop, node.size);
        }
        // Compute effective count.
        var count = Math.max(0, stop - start);
        // Bail early if there is nothing to iterate.
        if (count === 0) {
            return algorithm_1.empty();
        }
        // Find the starting leaf node and local index.
        while (node.type === 0 /* Branch */) {
            var i = findPivotIndexByIndex(node.sizes, start);
            if (i > 0)
                start -= node.sizes[i - 1];
            node = node.children[i];
        }
        // Return the forward iterator for the range.
        return new ForwardIterator(node, start, count);
    }
    Private.sliceItems = sliceItems;
    /**
     * Create a reverse iterator for a slice of items in the tree.
     *
     * @param node - The root node of interest.
     *
     * @param start - The index of the first item, inclusive. This
     *   should be `> stop`. Negative values are taken as an offset
     *   from the end of the tree. The default is `size - 1`.
     *
     * @param stop - The index of the last item, exclusive. This
     *   should be `< start`. Negative values are taken as an offset
     *   from the end of the tree. The default is `-size - 1`.
     *
     * @returns A new reverse iterator starting with the specified item.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    function retroSliceItems(node, start, stop) {
        // Normalize the start index.
        if (start === undefined) {
            start = node.size - 1;
        }
        else if (start < 0) {
            start = Math.max(-1, start + node.size);
        }
        else {
            start = Math.min(start, node.size - 1);
        }
        // Normalize the stop index.
        if (stop === undefined) {
            stop = -1;
        }
        else if (stop < 0) {
            stop = Math.max(-1, stop + node.size);
        }
        else {
            stop = Math.min(stop, node.size - 1);
        }
        // Compute the effective count.
        var count = Math.max(0, start - stop);
        // Bail early if there is nothing to iterate.
        if (count === 0) {
            return algorithm_1.empty();
        }
        // Find the starting leaf node and local index.
        while (node.type === 0 /* Branch */) {
            var i = findPivotIndexByIndex(node.sizes, start);
            if (i > 0)
                start -= node.sizes[i - 1];
            node = node.children[i];
        }
        // Return the retro iterator for the range.
        return new RetroIterator(node, start, count);
    }
    Private.retroSliceItems = retroSliceItems;
    /**
     * Get the item at the specified index.
     *
     * @param node - The root node of interest.
     *
     * @param index - The index of the item of interest. Negative
     *   values are taken as an offset from the end of the tree.
     *
     * @returns The item at the specified index, or `undefined` if
     *   the index is out of range.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    function itemAt(node, index) {
        // Wrap negative indices.
        if (index < 0) {
            index += node.size;
        }
        // Bail early if the index is out of range.
        if (index < 0 || index >= node.size) {
            return undefined;
        }
        // Find the containing leaf node and local index.
        while (node.type === 0 /* Branch */) {
            var i = findPivotIndexByIndex(node.sizes, index);
            if (i > 0)
                index -= node.sizes[i - 1];
            node = node.children[i];
        }
        // Return the item at the specified index.
        return node.items[index];
    }
    Private.itemAt = itemAt;
    /**
     * Test whether the tree contains an item which matches a key.
     *
     * @param node - The root node of interest.
     *
     * @param key - The key of interest.
     *
     * @param cmp - The key comparison function.
     *
     * @returns Whether the tree contains a matching item.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    function hasItem(node, key, cmp) {
        // Find the containing leaf node.
        while (node.type === 0 /* Branch */) {
            var i_1 = findPivotIndexByKey(node.items, key, cmp);
            node = node.children[i_1];
        }
        // Find the key index.
        var i = findKeyIndex(node.items, key, cmp);
        // Return whether or not the node contains a matching item.
        return i >= 0;
    }
    Private.hasItem = hasItem;
    /**
     * Get the index of the item which matches a key.
     *
     * @param node - The node of interest.
     *
     * @param key - The key of interest.
     *
     * @param cmp - The key comparison function.
     *
     * @returns The index of the item which matches the given key. A
     *   negative value means that a matching item does not exist in
     *   the tree, but if one did it would reside at `-index - 1`.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    function indexOf(node, key, cmp) {
        // Set up the global index.
        var index = 0;
        // Find the containing leaf node and global index.
        while (node.type === 0 /* Branch */) {
            var i_2 = findPivotIndexByKey(node.items, key, cmp);
            if (i_2 > 0)
                index += node.sizes[i_2 - 1];
            node = node.children[i_2];
        }
        // Find the key index.
        var i = findKeyIndex(node.items, key, cmp);
        // Return the final computed index.
        return i >= 0 ? index + i : -index + i;
    }
    Private.indexOf = indexOf;
    /**
     * Get the item for a particular key.
     *
     * @param node - The node of interest.
     *
     * @param key - The key of interest.
     *
     * @param cmp - The key comparison function.
     *
     * @returns The item for the specified key, or `undefined` if
     *   the tree does not have a matching item for the key.
     *
     * #### Complexity
     * `O(log32 n)`
     */
    function getItem(node, key, cmp) {
        // Find the containing leaf node.
        while (node.type === 0 /* Branch */) {
            var i_3 = findPivotIndexByKey(node.items, key, cmp);
            node = node.children[i_3];
        }
        // Find the key index.
        var i = findKeyIndex(node.items, key, cmp);
        // Return the item for the given key.
        return i >= 0 ? node.items[i] : undefined;
    }
    Private.getItem = getItem;
    /**
     * Insert an item into the tree.
     *
     * @param node - The root node of interest.
     *
     * @param item - The item of interest.
     *
     * @param cmp - The item comparison function.
     *
     * @returns If the given item matches an existing item in the tree,
     *   the given item will replace it, and the existing item will be
     *   returned. Otherwise, this function returns `undefined`.
     *
     * #### Complexity
     * `O(log32 n)`
     *
     * #### Notes
     * The root may be overfull after calling this function.
     */
    function insertItem(node, item, cmp) {
        // Handle leaf nodes first.
        if (node.type === 1 /* Leaf */) {
            // Find the index for the given item.
            var i_4 = findKeyIndex(node.items, item, cmp);
            // Fetch the existing item and insert the new item.
            var existing_1;
            if (i_4 >= 0) {
                existing_1 = node.items[i_4];
                node.items[i_4] = item;
            }
            else {
                existing_1 = undefined;
                algorithm_1.ArrayExt.insert(node.items, -i_4 - 1, item);
            }
            // Return the existing item.
            return existing_1;
        }
        // Find the pivot index for the insert.
        var i = findPivotIndexByKey(node.items, item, cmp);
        // Fetch the pivot child.
        var child = node.children[i];
        // Fetch the current size of the child.
        var prevSize = child.size;
        // Recursively insert the item into the child.
        var existing = insertItem(child, item, cmp);
        // Fetch the updated size of the child.
        var currSize = child.size;
        // Update the item state of the branch.
        node.items[i] = child.items[0];
        // Bail early if the child size did not change.
        if (prevSize === currSize) {
            return existing;
        }
        // Split the child if it's overfull.
        if (child.width > MAX_NODE_WIDTH) {
            var next = splitNode(child);
            algorithm_1.ArrayExt.insert(node.children, i + 1, next);
            algorithm_1.ArrayExt.insert(node.items, i + 1, next.items[0]);
        }
        // Update the dirty sizes of the branch.
        updateSizes(node, i);
        // Return the existing item.
        return existing;
    }
    Private.insertItem = insertItem;
    /**
     * Delete an item in the tree.
     *
     * @param node - The node of interest.
     *
     * @param key - The key of interest.
     *
     * @param cmp - The key comparison function.
     *
     * @returns The deleted item or `undefined`.
     *
     * #### Complexity
     * `O(log32 n)`
     *
     * #### Notes
     * The root may be underfull after calling this function.
     */
    function deleteItem(node, key, cmp) {
        // Handle leaf nodes first.
        if (node.type === 1 /* Leaf */) {
            // Find the index for the given key.
            var i_5 = findKeyIndex(node.items, key, cmp);
            // Bail early if the item does not exist.
            if (i_5 < 0) {
                return undefined;
            }
            // Remove the item at the computed index.
            return algorithm_1.ArrayExt.removeAt(node.items, i_5);
        }
        // Find the pivot index for the delete.
        var i = findPivotIndexByKey(node.items, key, cmp);
        // Fetch the pivot child.
        var child = node.children[i];
        // Fetch the current size of the child.
        var prevSize = child.size;
        // Recursively remove the item from the child.
        var item = deleteItem(child, key, cmp);
        // Fetch the updated size of the child.
        var currSize = child.size;
        // Bail early if the child size did not change.
        if (prevSize === currSize) {
            return item;
        }
        // Update the item state of the branch.
        node.items[i] = child.items[0];
        // Join the child if it's underfull.
        if (child.width < MIN_NODE_WIDTH) {
            i = joinChild(node, i);
        }
        // Update the dirty sizes of the branch.
        updateSizes(node, i);
        // Return the deleted item.
        return item;
    }
    Private.deleteItem = deleteItem;
    /**
     * Remove an item from the tree.
     *
     * @param node - The node of interest.
     *
     * @param index - The index of interest.
     *
     * @returns The removed item or `undefined`.
     *
     * #### Complexity
     * `O(log32 n)`
     *
     * #### Notes
     * The root may be underfull after calling this function.
     */
    function removeItem(node, index) {
        // Wrap negative indices.
        if (index < 0) {
            index += node.size;
        }
        // Bail early if the index is out of range.
        if (index < 0 || index >= node.size) {
            return undefined;
        }
        // Handle leaf nodes first.
        if (node.type === 1 /* Leaf */) {
            return algorithm_1.ArrayExt.removeAt(node.items, index);
        }
        // Find the pivot index for the remove.
        var i = findPivotIndexByIndex(node.sizes, index);
        if (i > 0)
            index -= node.sizes[i];
        // Fetch the pivot child.
        var child = node.children[i];
        // Recursively remove the item from the child.
        var item = removeItem(child, index);
        // Update the item state of the branch.
        node.items[i] = child.items[0];
        // Join the child if it's underfull.
        if (child.width < MIN_NODE_WIDTH) {
            i = joinChild(node, i);
        }
        // Update the dirty sizes of the branch.
        updateSizes(node, i);
        // Return the removed item.
        return item;
    }
    Private.removeItem = removeItem;
    /**
     * Recursively clear the contents of a node.
     *
     * @param node - The node of interest.
     *
     * #### Complexity
     * `O(n)`
     */
    function clear(node) {
        if (node.type === 0 /* Branch */) {
            algorithm_1.each(node.children, clear);
            node.children.length = 0;
            node.sizes.length = 0;
            node.items.length = 0;
        }
        else {
            node.items.length = 0;
            node.next = null;
            node.prev = null;
        }
    }
    Private.clear = clear;
    /**
     * Split a root node and create a new root, if needed.
     *
     * @param node - The root node of interest.
     *
     * @returns The new root node.
     */
    function maybeSplitRoot(node) {
        // Bail early if the current root is not overfull.
        if (node.width <= MAX_NODE_WIDTH) {
            return node;
        }
        // Create a new root branch node.
        var root = new BranchNode();
        // Split the node to the right and create a new sibling.
        var next = splitNode(node);
        // Add the sizes to the root.
        root.sizes[0] = node.size;
        root.sizes[1] = node.size + next.size;
        // Add the children to the root.
        root.children[0] = node;
        root.children[1] = next;
        // Add the items to the root.
        root.items[0] = node.items[0];
        root.items[1] = next.items[0];
        // Return the new root node.
        return root;
    }
    Private.maybeSplitRoot = maybeSplitRoot;
    /**
     * Extract a single node child as a new root, if needed.
     *
     * @param node - The root node of interest.
     *
     * @returns The new root node.
     */
    function maybeExtractRoot(node) {
        // Bail early if the node it already a leaf.
        if (node.type === 1 /* Leaf */) {
            return node;
        }
        // Bail early if the branch has more than one child.
        if (node.children.length > 1) {
            return node;
        }
        // Extract the sole remaining child as the new root.
        var root = node.children.pop();
        // Clear the rest of the node state.
        clear(node);
        // Return the new root.
        return root;
    }
    Private.maybeExtractRoot = maybeExtractRoot;
    /**
     * The maximum width for a node in the tree.
     */
    var MAX_NODE_WIDTH = 32;
    /**
     * The minimum width for a node in the tree.
     */
    var MIN_NODE_WIDTH = MAX_NODE_WIDTH >> 1;
    /**
     * A forward iterator for a B+ tree.
     */
    var ForwardIterator = /** @class */ (function () {
        /**
         * Construct a new forward iterator.
         *
         * @param node - The first leaf node in the chain.
         *
         * @param index - The local index of the first item.
         *
         * @param count - The number of items to iterate. A value `< 0`
         *   will iterate all available items.
         */
        function ForwardIterator(node, index, count) {
            this._node = node;
            this._index = index;
            this._count = count;
        }
        /**
         * Get an iterator over the object's values.
         *
         * @returns An iterator which yields the object's values.
         */
        ForwardIterator.prototype.iter = function () {
            return this;
        };
        /**
         * Create an independent clone of the iterator.
         *
         * @returns A new independent clone of the iterator.
         */
        ForwardIterator.prototype.clone = function () {
            return new ForwardIterator(this._node, this._index, this._count);
        };
        /**
         * Get the next value from the iterator.
         *
         * @returns The next value from the iterator, or `undefined`.
         */
        ForwardIterator.prototype.next = function () {
            if (this._node === null || this._count === 0) {
                return undefined;
            }
            if (this._index >= this._node.size) {
                this._node = this._node.next;
                this._index = 0;
                return this.next();
            }
            if (this._count > 0) {
                this._count--;
            }
            return this._node.items[this._index++];
        };
        return ForwardIterator;
    }());
    /**
     * A reverse iterator for a B+ tree.
     */
    var RetroIterator = /** @class */ (function () {
        /**
         * Construct a new retro iterator.
         *
         * @param node - The last leaf node in the chain.
         *
         * @param index - The local index of the last item.
         *
         * @param count - The number of items to iterate. A value `< 0`
         *   will iterate all available items.
         */
        function RetroIterator(node, index, count) {
            this._node = node;
            this._index = index;
            this._count = count;
        }
        /**
         * Get an iterator over the object's values.
         *
         * @returns An iterator which yields the object's values.
         */
        RetroIterator.prototype.iter = function () {
            return this;
        };
        /**
         * Create an independent clone of the iterator.
         *
         * @returns A new independent clone of the iterator.
         */
        RetroIterator.prototype.clone = function () {
            return new RetroIterator(this._node, this._index, this._count);
        };
        /**
         * Get the next value from the iterator.
         *
         * @returns The next value from the iterator, or `undefined`.
         */
        RetroIterator.prototype.next = function () {
            if (this._node === null || this._count === 0) {
                return undefined;
            }
            if (this._index >= this._node.size) {
                this._index = this._node.size - 1;
            }
            if (this._index < 0) {
                this._node = this._node.prev;
                this._index = this._node ? this._node.size - 1 : -1;
                return this.next();
            }
            if (this._count > 0) {
                this._count--;
            }
            return this._node.items[this._index--];
        };
        return RetroIterator;
    }());
    /**
     * Find the pivot index for a particular local index.
     */
    function findPivotIndexByIndex(sizes, index) {
        var n = sizes.length;
        for (var i = 0; i < n; ++i) {
            if (sizes[i] > index) {
                return i;
            }
        }
        return n - 1;
    }
    /**
     * Find the pivot index for a particular key.
     */
    function findPivotIndexByKey(items, key, cmp) {
        var n = items.length;
        for (var i = 1; i < n; ++i) {
            if (cmp(items[i], key) > 0) {
                return i - 1;
            }
        }
        return n - 1;
    }
    /**
     * Find the key index for a particular key.
     */
    function findKeyIndex(items, key, cmp) {
        var n = items.length;
        for (var i = 0; i < n; ++i) {
            var c = cmp(items[i], key);
            if (c === 0) {
                return i;
            }
            if (c > 0) {
                return -i - 1;
            }
        }
        return -n - 1;
    }
    /**
     * Update the sizes of a branch node starting at the given index.
     */
    function updateSizes(node, i) {
        var sizes = node.sizes, children = node.children;
        var last = i > 0 ? sizes[i - 1] : 0;
        for (var n = children.length; i < n; ++i) {
            last = sizes[i] = last + children[i].size;
        }
        sizes.length = children.length;
    }
    /**
     * Split a node and return its new next sibling.
     *
     * @param node - The node of interest.
     *
     * @returns The new next sibling node.
     */
    function splitNode(node) {
        // Handle leaf nodes first.
        if (node.type === 1 /* Leaf */) {
            // Create the new sibling leaf node.
            var next_1 = new LeafNode();
            // Move the items to the new sibling.
            var v1_1 = node.items;
            var v2_1 = next_1.items;
            for (var i = MIN_NODE_WIDTH, n = v1_1.length; i < n; ++i) {
                v2_1.push(v1_1[i]);
            }
            v1_1.length = MIN_NODE_WIDTH;
            // Patch up the sibling links.
            if (node.next)
                node.next.prev = next_1;
            next_1.next = node.next;
            next_1.prev = node;
            node.next = next_1;
            // Return the new next sibling.
            return next_1;
        }
        // Create the new sibling branch node.
        var next = new BranchNode();
        // Move the children to the new sibling.
        var c1 = node.children;
        var c2 = next.children;
        for (var i = MIN_NODE_WIDTH, n = c1.length; i < n; ++i) {
            c2.push(c1[i]);
        }
        c1.length = MIN_NODE_WIDTH;
        // Move the items to the new sibling.
        var v1 = node.items;
        var v2 = next.items;
        for (var i = MIN_NODE_WIDTH, n = v1.length; i < n; ++i) {
            v2.push(v1[i]);
        }
        v1.length = MIN_NODE_WIDTH;
        // Update the dirty sizes of the nodes.
        updateSizes(node, MIN_NODE_WIDTH);
        updateSizes(next, 0);
        // Return the new next sibling.
        return next;
    }
    /**
     * Join a child node of a branch with one of its siblings.
     *
     * @param node - The branch node of interest.
     *
     * @param i - The index of the child node of interest.
     *
     * @returns The first modified index.
     *
     * #### Notes
     * This may cause the branch to become underfull.
     */
    function joinChild(node, i) {
        var _a, _b, _c, _d, _e, _f;
        // Fetch the child to be joined.
        var child = node.children[i];
        // Fetch the relevant sibling.
        var sibling = i === 0 ? node.children[i + 1] : node.children[i - 1];
        // Compute the flags which control the join behavior.
        var hasNext = i === 0;
        var isLeaf = child.type === 1 /* Leaf */;
        var hasExtra = sibling.width > MIN_NODE_WIDTH;
        // Join case #1: steal from next sibling leaf
        if (isLeaf && hasExtra && hasNext) {
            // Cast the children as leaves.
            var c = child;
            var s = sibling;
            // Steal an item.
            c.items.push(s.items.shift());
            // Update the branch items.
            node.items[i + 1] = s.items[0];
            // Return the first modified index.
            return i;
        }
        // Join case #2: steal from previous sibling leaf
        if (isLeaf && hasExtra && !hasNext) {
            // Cast the children as leaves.
            var c = child;
            var s = sibling;
            // Steal an item.
            c.items.unshift(s.items.pop());
            // Update the branch items.
            node.items[i] = c.items[0];
            // Return the first modified index.
            return i - 1;
        }
        // Join case #3: merge with next sibling leaf
        if (isLeaf && !hasExtra && hasNext) {
            // Cast the children as leaves.
            var c = child;
            var s = sibling;
            // Merge items.
            (_a = s.items).unshift.apply(_a, c.items);
            // Remove the old branch child.
            algorithm_1.ArrayExt.removeAt(node.children, i);
            // Remove the stale branch item.
            algorithm_1.ArrayExt.removeAt(node.items, i + 1);
            // Patch up the sibling links.
            if (c.prev)
                c.prev.next = s;
            s.prev = c.prev;
            // Clear the original child.
            clear(c);
            // Return the first modified index.
            return i;
        }
        // Join case #4: merge with previous sibling leaf
        if (isLeaf && !hasExtra && !hasNext) {
            // Cast the children as leaves.
            var c = child;
            var s = sibling;
            // Merge items.
            (_b = s.items).push.apply(_b, c.items);
            // Remove the old branch child.
            algorithm_1.ArrayExt.removeAt(node.children, i);
            // Remove the stale branch item.
            algorithm_1.ArrayExt.removeAt(node.items, i);
            // Patch up the sibling links.
            if (c.next)
                c.next.prev = s;
            s.next = c.next;
            // Clear the original child.
            clear(c);
            // Return the first modified index.
            return i - 1;
        }
        // Join case #5: steal from next sibling branch
        if (!isLeaf && hasExtra && hasNext) {
            // Cast the children to branches.
            var c = child;
            var s = sibling;
            // Steal a child from the next sibling.
            c.children.push(s.children.shift());
            // Steal an item from the next sibling.
            c.items.push(s.items.shift());
            // Update the branch items.
            node.items[i + 1] = s.items[0];
            // Update the sibling sizes.
            updateSizes(c, c.width - 1);
            updateSizes(s, 0);
            // Return the first modified index.
            return i;
        }
        // Join case #6: steal from previous sibling branch
        if (!isLeaf && hasExtra && !hasNext) {
            // Cast the children to branches.
            var c = child;
            var s = sibling;
            // Steal a child from the previous sibling.
            c.children.unshift(s.children.pop());
            // Steal an item from the previous sibling.
            c.items.unshift(s.items.pop());
            // Update the branch items.
            node.items[i] = c.items[0];
            // Update the sibling sizes.
            updateSizes(c, 0);
            updateSizes(s, s.width - 1);
            // Return the first modified index.
            return i - 1;
        }
        // Join case #7: merge with next sibling branch
        if (!isLeaf && !hasExtra && hasNext) {
            // Cast the children to branches.
            var c = child;
            var s = sibling;
            // Merge the children with the next sibling.
            (_c = s.children).unshift.apply(_c, c.children);
            // Merge the items with the next sibling.
            (_d = s.items).unshift.apply(_d, c.items);
            // Remove the old branch child.
            algorithm_1.ArrayExt.removeAt(node.children, i);
            // Remove the stale branch item.
            algorithm_1.ArrayExt.removeAt(node.items, i + 1);
            // Update the sibling sizes.
            updateSizes(s, 0);
            // Clear the original child but, not its children.
            c.children.length = 0;
            clear(c);
            // Return the first modified index.
            return i;
        }
        // Join case #8: merge with previous sibling branch
        if (!isLeaf && !hasExtra && !hasNext) {
            // Cast the children to branches.
            var c = child;
            var s = sibling;
            // Merge the children with the previous sibling.
            (_e = s.children).push.apply(_e, c.children);
            // Merge the items with the previous sibling.
            (_f = s.items).push.apply(_f, c.items);
            // Remove the old branch child.
            algorithm_1.ArrayExt.removeAt(node.children, i);
            // Remove the stale branch item.
            algorithm_1.ArrayExt.removeAt(node.items, i);
            // Update the sibling sizes.
            updateSizes(s, 0);
            // Clear the original child, but not its children.
            c.children.length = 0;
            clear(c);
            // Return the first modified index.
            return i - 1;
        }
        // One of the above cases must match.
        throw 'unreachable';
    }
})(Private || (Private = {}));

})
		]
	]
}, {
	name: "@lumino/commands",
	version: "1.10.3",
	root: "node_modules/@lumino/commands",
	main: "lib/index.js",
	files: [
		[
			/* @lumino/commands: 21 */
			"lib/index.js", ["cjs","js"], {"@lumino/algorithm": 11, "@lumino/coreutils": 28, "@lumino/disposable": 30, "@lumino/domutils": 33, "@lumino/keyboard": 37, "@lumino/signaling": 40}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
var coreutils_1 = require("@lumino/coreutils");
var disposable_1 = require("@lumino/disposable");
var domutils_1 = require("@lumino/domutils");
var keyboard_1 = require("@lumino/keyboard");
var signaling_1 = require("@lumino/signaling");
/**
 * An object which manages a collection of commands.
 *
 * #### Notes
 * A command registry can be used to populate a variety of action-based
 * widgets, such as command palettes, menus, and toolbars.
 */
var CommandRegistry = /** @class */ (function () {
    /**
     * Construct a new command registry.
     */
    function CommandRegistry() {
        this._timerID = 0;
        this._replaying = false;
        this._keystrokes = [];
        this._keydownEvents = [];
        this._keyBindings = [];
        this._exactKeyMatch = null;
        this._commands = Object.create(null);
        this._commandChanged = new signaling_1.Signal(this);
        this._commandExecuted = new signaling_1.Signal(this);
        this._keyBindingChanged = new signaling_1.Signal(this);
    }
    Object.defineProperty(CommandRegistry.prototype, "commandChanged", {
        /**
         * A signal emitted when a command has changed.
         *
         * #### Notes
         * This signal is useful for visual representations of commands which
         * need to refresh when the state of a relevant command has changed.
         */
        get: function () {
            return this._commandChanged;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandRegistry.prototype, "commandExecuted", {
        /**
         * A signal emitted when a command has executed.
         *
         * #### Notes
         * Care should be taken when consuming this signal. It is intended to
         * be used largely for debugging and logging purposes. It should not
         * be (ab)used for general purpose spying on command execution.
         */
        get: function () {
            return this._commandExecuted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandRegistry.prototype, "keyBindingChanged", {
        /**
         * A signal emitted when a key binding is changed.
         */
        get: function () {
            return this._keyBindingChanged;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandRegistry.prototype, "keyBindings", {
        /**
         * A read-only array of the key bindings in the registry.
         */
        get: function () {
            return this._keyBindings;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * List the ids of the registered commands.
     *
     * @returns A new array of the registered command ids.
     */
    CommandRegistry.prototype.listCommands = function () {
        return Object.keys(this._commands);
    };
    /**
     * Test whether a specific command is registered.
     *
     * @param id - The id of the command of interest.
     *
     * @returns `true` if the command is registered, `false` otherwise.
     */
    CommandRegistry.prototype.hasCommand = function (id) {
        return id in this._commands;
    };
    /**
     * Add a command to the registry.
     *
     * @param id - The unique id of the command.
     *
     * @param options - The options for the command.
     *
     * @returns A disposable which will remove the command.
     *
     * @throws An error if the given `id` is already registered.
     */
    CommandRegistry.prototype.addCommand = function (id, options) {
        var _this = this;
        // Throw an error if the id is already registered.
        if (id in this._commands) {
            throw new Error("Command '" + id + "' already registered.");
        }
        // Add the command to the registry.
        this._commands[id] = Private.createCommand(options);
        // Emit the `commandChanged` signal.
        this._commandChanged.emit({ id: id, type: 'added' });
        // Return a disposable which will remove the command.
        return new disposable_1.DisposableDelegate(function () {
            // Remove the command from the registry.
            delete _this._commands[id];
            // Emit the `commandChanged` signal.
            _this._commandChanged.emit({ id: id, type: 'removed' });
        });
    };
    /**
     * Notify listeners that the state of a command has changed.
     *
     * @param id - The id of the command which has changed. If more than
     *   one command has changed, this argument should be omitted.
     *
     * @throws An error if the given `id` is not registered.
     *
     * #### Notes
     * This method should be called by the command author whenever the
     * application state changes such that the results of the command
     * metadata functions may have changed.
     *
     * This will cause the `commandChanged` signal to be emitted.
     */
    CommandRegistry.prototype.notifyCommandChanged = function (id) {
        if (id !== undefined && !(id in this._commands)) {
            throw new Error("Command '" + id + "' is not registered.");
        }
        this._commandChanged.emit({ id: id, type: id ? 'changed' : 'many-changed' });
    };
    /**
     * Get the display label for a specific command.
     *
     * @param id - The id of the command of interest.
     *
     * @param args - The arguments for the command.
     *
     * @returns The display label for the command, or an empty string
     *   if the command is not registered.
     */
    CommandRegistry.prototype.label = function (id, args) {
        if (args === void 0) { args = coreutils_1.JSONExt.emptyObject; }
        var cmd = this._commands[id];
        return cmd ? cmd.label.call(undefined, args) : '';
    };
    /**
     * Get the mnemonic index for a specific command.
     *
     * @param id - The id of the command of interest.
     *
     * @param args - The arguments for the command.
     *
     * @returns The mnemonic index for the command, or `-1` if the
     *   command is not registered.
     */
    CommandRegistry.prototype.mnemonic = function (id, args) {
        if (args === void 0) { args = coreutils_1.JSONExt.emptyObject; }
        var cmd = this._commands[id];
        return cmd ? cmd.mnemonic.call(undefined, args) : -1;
    };
    /**
     * Get the icon renderer for a specific command.
     *
     * DEPRECATED: if set to a string value, the .icon field will
     * function as an alias for the .iconClass field, for backwards
     * compatibility. In the future when this is removed, the default
     * return type will become undefined.
     *
     * @param id - The id of the command of interest.
     *
     * @param args - The arguments for the command.
     *
     * @returns The icon renderer for the command, or
     *   an empty string if the command is not registered.
     */
    CommandRegistry.prototype.icon = function (id, args) {
        if (args === void 0) { args = coreutils_1.JSONExt.emptyObject; }
        var cmd = this._commands[id];
        return cmd ? cmd.icon.call(undefined, args) : /* <DEPRECATED> */ '' /* </DEPRECATED> */ /* <FUTURE> undefined </FUTURE> */;
    };
    /**
     * Get the icon class for a specific command.
     *
     * @param id - The id of the command of interest.
     *
     * @param args - The arguments for the command.
     *
     * @returns The icon class for the command, or an empty string if
     *   the command is not registered.
     */
    CommandRegistry.prototype.iconClass = function (id, args) {
        if (args === void 0) { args = coreutils_1.JSONExt.emptyObject; }
        var cmd = this._commands[id];
        return cmd ? cmd.iconClass.call(undefined, args) : '';
    };
    /**
     * Get the icon label for a specific command.
     *
     * @param id - The id of the command of interest.
     *
     * @param args - The arguments for the command.
     *
     * @returns The icon label for the command, or an empty string if
     *   the command is not registered.
     */
    CommandRegistry.prototype.iconLabel = function (id, args) {
        if (args === void 0) { args = coreutils_1.JSONExt.emptyObject; }
        var cmd = this._commands[id];
        return cmd ? cmd.iconLabel.call(undefined, args) : '';
    };
    /**
     * Get the short form caption for a specific command.
     *
     * @param id - The id of the command of interest.
     *
     * @param args - The arguments for the command.
     *
     * @returns The caption for the command, or an empty string if the
     *   command is not registered.
     */
    CommandRegistry.prototype.caption = function (id, args) {
        if (args === void 0) { args = coreutils_1.JSONExt.emptyObject; }
        var cmd = this._commands[id];
        return cmd ? cmd.caption.call(undefined, args) : '';
    };
    /**
     * Get the usage help text for a specific command.
     *
     * @param id - The id of the command of interest.
     *
     * @param args - The arguments for the command.
     *
     * @returns The usage text for the command, or an empty string if
     *   the command is not registered.
     */
    CommandRegistry.prototype.usage = function (id, args) {
        if (args === void 0) { args = coreutils_1.JSONExt.emptyObject; }
        var cmd = this._commands[id];
        return cmd ? cmd.usage.call(undefined, args) : '';
    };
    /**
     * Get the extra class name for a specific command.
     *
     * @param id - The id of the command of interest.
     *
     * @param args - The arguments for the command.
     *
     * @returns The class name for the command, or an empty string if
     *   the command is not registered.
     */
    CommandRegistry.prototype.className = function (id, args) {
        if (args === void 0) { args = coreutils_1.JSONExt.emptyObject; }
        var cmd = this._commands[id];
        return cmd ? cmd.className.call(undefined, args) : '';
    };
    /**
     * Get the dataset for a specific command.
     *
     * @param id - The id of the command of interest.
     *
     * @param args - The arguments for the command.
     *
     * @returns The dataset for the command, or an empty dataset if
     *   the command is not registered.
     */
    CommandRegistry.prototype.dataset = function (id, args) {
        if (args === void 0) { args = coreutils_1.JSONExt.emptyObject; }
        var cmd = this._commands[id];
        return cmd ? cmd.dataset.call(undefined, args) : {};
    };
    /**
     * Test whether a specific command is enabled.
     *
     * @param id - The id of the command of interest.
     *
     * @param args - The arguments for the command.
     *
     * @returns A boolean indicating whether the command is enabled,
     *   or `false` if the command is not registered.
     */
    CommandRegistry.prototype.isEnabled = function (id, args) {
        if (args === void 0) { args = coreutils_1.JSONExt.emptyObject; }
        var cmd = this._commands[id];
        return cmd ? cmd.isEnabled.call(undefined, args) : false;
    };
    /**
     * Test whether a specific command is toggled.
     *
     * @param id - The id of the command of interest.
     *
     * @param args - The arguments for the command.
     *
     * @returns A boolean indicating whether the command is toggled,
     *   or `false` if the command is not registered.
     */
    CommandRegistry.prototype.isToggled = function (id, args) {
        if (args === void 0) { args = coreutils_1.JSONExt.emptyObject; }
        var cmd = this._commands[id];
        return cmd ? cmd.isToggled.call(undefined, args) : false;
    };
    /**
     * Test whether a specific command is visible.
     *
     * @param id - The id of the command of interest.
     *
     * @param args - The arguments for the command.
     *
     * @returns A boolean indicating whether the command is visible,
     *   or `false` if the command is not registered.
     */
    CommandRegistry.prototype.isVisible = function (id, args) {
        if (args === void 0) { args = coreutils_1.JSONExt.emptyObject; }
        var cmd = this._commands[id];
        return cmd ? cmd.isVisible.call(undefined, args) : false;
    };
    /**
     * Execute a specific command.
     *
     * @param id - The id of the command of interest.
     *
     * @param args - The arguments for the command.
     *
     * @returns A promise which resolves with the result of the command.
     *
     * #### Notes
     * The promise will reject if the command throws an exception,
     * or if the command is not registered.
     */
    CommandRegistry.prototype.execute = function (id, args) {
        if (args === void 0) { args = coreutils_1.JSONExt.emptyObject; }
        // Reject if the command is not registered.
        var cmd = this._commands[id];
        if (!cmd) {
            return Promise.reject(new Error("Command '" + id + "' not registered."));
        }
        // Execute the command and reject if an exception is thrown.
        var value;
        try {
            value = cmd.execute.call(undefined, args);
        }
        catch (err) {
            value = Promise.reject(err);
        }
        // Create the return promise which resolves the result.
        var result = Promise.resolve(value);
        // Emit the command executed signal.
        this._commandExecuted.emit({ id: id, args: args, result: result });
        // Return the result promise to the caller.
        return result;
    };
    /**
     * Add a key binding to the registry.
     *
     * @param options - The options for creating the key binding.
     *
     * @returns A disposable which removes the added key binding.
     *
     * #### Notes
     * If multiple key bindings are registered for the same sequence, the
     * binding with the highest selector specificity is executed first. A
     * tie is broken by using the most recently added key binding.
     *
     * Ambiguous key bindings are resolved with a timeout. As an example,
     * suppose two key bindings are registered: one with the key sequence
     * `['Ctrl D']`, and another with `['Ctrl D', 'Ctrl W']`. If the user
     * presses `Ctrl D`, the first binding cannot be immediately executed
     * since the user may intend to complete the chord with `Ctrl W`. For
     * such cases, a timer is used to allow the chord to be completed. If
     * the chord is not completed before the timeout, the first binding
     * is executed.
     */
    CommandRegistry.prototype.addKeyBinding = function (options) {
        var _this = this;
        // Create the binding for the given options.
        var binding = Private.createKeyBinding(options);
        // Add the key binding to the bindings array.
        this._keyBindings.push(binding);
        // Emit the `bindingChanged` signal.
        this._keyBindingChanged.emit({ binding: binding, type: 'added' });
        // Return a disposable which will remove the binding.
        return new disposable_1.DisposableDelegate(function () {
            // Remove the binding from the array.
            algorithm_1.ArrayExt.removeFirstOf(_this._keyBindings, binding);
            // Emit the `bindingChanged` signal.
            _this._keyBindingChanged.emit({ binding: binding, type: 'removed' });
        });
    };
    /**
     * Process a `'keydown'` event and invoke a matching key binding.
     *
     * @param event - The event object for a `'keydown'` event.
     *
     * #### Notes
     * This should be called in response to a `'keydown'` event in order
     * to invoke the command for the best matching key binding.
     *
     * The registry **does not** install its own listener for `'keydown'`
     * events. This allows the application full control over the nodes
     * and phase for which the registry processes `'keydown'` events.
     *
     * When the keydown event is processed, if the event target or any of its
     * ancestor nodes has a `data-lm-suppress-shortcuts` attribute, its keydown
     * events will not invoke commands.
     */
    CommandRegistry.prototype.processKeydownEvent = function (event) {
        // Bail immediately if playing back keystrokes.
        if (this._replaying) {
            return;
        }
        // Get the normalized keystroke for the event.
        var keystroke = CommandRegistry.keystrokeForKeydownEvent(event);
        // If the keystroke is not valid for the keyboard layout, replay
        // any suppressed events and clear the pending state.
        if (!keystroke) {
            this._replayKeydownEvents();
            this._clearPendingState();
            return;
        }
        // Add the keystroke to the current key sequence.
        this._keystrokes.push(keystroke);
        // Find the exact and partial matches for the key sequence.
        var _a = Private.matchKeyBinding(this._keyBindings, this._keystrokes, event), exact = _a.exact, partial = _a.partial;
        // If there is no exact match and no partial match, replay
        // any suppressed events and clear the pending state.
        if (!exact && !partial) {
            this._replayKeydownEvents();
            this._clearPendingState();
            return;
        }
        // Stop propagation of the event. If there is only a partial match,
        // the event will be replayed if a final exact match never occurs.
        event.preventDefault();
        event.stopPropagation();
        // If there is an exact match but no partial match, the exact match
        // can be dispatched immediately. The pending state is cleared so
        // the next key press starts from the default state.
        if (exact && !partial) {
            this._executeKeyBinding(exact);
            this._clearPendingState();
            return;
        }
        // If there is both an exact match and a partial match, the exact
        // match is stored for future dispatch in case the timer expires
        // before a more specific match is triggered.
        if (exact) {
            this._exactKeyMatch = exact;
        }
        // Store the event for possible playback in the future.
        this._keydownEvents.push(event);
        // (Re)start the timer to dispatch the most recent exact match
        // in case the partial match fails to result in an exact match.
        this._startTimer();
    };
    /**
     * Start or restart the pending timeout.
     */
    CommandRegistry.prototype._startTimer = function () {
        var _this = this;
        this._clearTimer();
        this._timerID = window.setTimeout(function () {
            _this._onPendingTimeout();
        }, Private.CHORD_TIMEOUT);
    };
    /**
     * Clear the pending timeout.
     */
    CommandRegistry.prototype._clearTimer = function () {
        if (this._timerID !== 0) {
            clearTimeout(this._timerID);
            this._timerID = 0;
        }
    };
    /**
     * Replay the keydown events which were suppressed.
     */
    CommandRegistry.prototype._replayKeydownEvents = function () {
        if (this._keydownEvents.length === 0) {
            return;
        }
        this._replaying = true;
        this._keydownEvents.forEach(Private.replayKeyEvent);
        this._replaying = false;
    };
    /**
     * Execute the command for the given key binding.
     *
     * If the command is missing or disabled, a warning will be logged.
     */
    CommandRegistry.prototype._executeKeyBinding = function (binding) {
        var command = binding.command, args = binding.args;
        if (!this.hasCommand(command) || !this.isEnabled(command, args)) {
            var word = this.hasCommand(command) ? 'enabled' : 'registered';
            var keys = binding.keys.join(', ');
            var msg1 = "Cannot execute key binding '" + keys + "':";
            var msg2 = "command '" + command + "' is not " + word + ".";
            console.warn(msg1 + " " + msg2);
            return;
        }
        this.execute(command, args);
    };
    /**
     * Clear the internal pending state.
     */
    CommandRegistry.prototype._clearPendingState = function () {
        this._clearTimer();
        this._exactKeyMatch = null;
        this._keystrokes.length = 0;
        this._keydownEvents.length = 0;
    };
    /**
     * Handle the partial match timeout.
     */
    CommandRegistry.prototype._onPendingTimeout = function () {
        this._timerID = 0;
        if (this._exactKeyMatch) {
            this._executeKeyBinding(this._exactKeyMatch);
        }
        else {
            this._replayKeydownEvents();
        }
        this._clearPendingState();
    };
    return CommandRegistry;
}());
exports.CommandRegistry = CommandRegistry;
/**
 * The namespace for the `CommandRegistry` class statics.
 */
(function (CommandRegistry) {
    /**
     * Parse a keystroke into its constituent components.
     *
     * @param keystroke - The keystroke of interest.
     *
     * @returns The parsed components of the keystroke.
     *
     * #### Notes
     * The keystroke should be of the form:
     *   `[<modifier 1> [<modifier 2> [<modifier N> ]]]<primary key>`
     *
     * The supported modifiers are: `Accel`, `Alt`, `Cmd`, `Ctrl`, and
     * `Shift`. The `Accel` modifier is translated to `Cmd` on Mac and
     * `Ctrl` on all other platforms.
     *
     * The parsing is tolerant and will not throw exceptions. Notably:
     *   - Duplicate modifiers are ignored.
     *   - Extra primary keys are ignored.
     *   - The order of modifiers and primary key is irrelevant.
     *   - The keystroke parts should be separated by whitespace.
     *   - The keystroke is case sensitive.
     */
    function parseKeystroke(keystroke) {
        var key = '';
        var alt = false;
        var cmd = false;
        var ctrl = false;
        var shift = false;
        for (var _i = 0, _a = keystroke.split(/\s+/); _i < _a.length; _i++) {
            var token = _a[_i];
            if (token === 'Accel') {
                if (domutils_1.Platform.IS_MAC) {
                    cmd = true;
                }
                else {
                    ctrl = true;
                }
            }
            else if (token === 'Alt') {
                alt = true;
            }
            else if (token === 'Cmd') {
                cmd = true;
            }
            else if (token === 'Ctrl') {
                ctrl = true;
            }
            else if (token === 'Shift') {
                shift = true;
            }
            else if (token.length > 0) {
                key = token;
            }
        }
        return { cmd: cmd, ctrl: ctrl, alt: alt, shift: shift, key: key };
    }
    CommandRegistry.parseKeystroke = parseKeystroke;
    /**
     * Normalize a keystroke into a canonical representation.
     *
     * @param keystroke - The keystroke of interest.
     *
     * @returns The normalized representation of the keystroke.
     *
     * #### Notes
     * This normalizes the keystroke by removing duplicate modifiers and
     * extra primary keys, and assembling the parts in a canonical order.
     *
     * The `Cmd` modifier is ignored on non-Mac platforms.
     */
    function normalizeKeystroke(keystroke) {
        var mods = '';
        var parts = parseKeystroke(keystroke);
        if (parts.ctrl) {
            mods += 'Ctrl ';
        }
        if (parts.alt) {
            mods += 'Alt ';
        }
        if (parts.shift) {
            mods += 'Shift ';
        }
        if (parts.cmd && domutils_1.Platform.IS_MAC) {
            mods += 'Cmd ';
        }
        return mods + parts.key;
    }
    CommandRegistry.normalizeKeystroke = normalizeKeystroke;
    /**
     * Get the platform-specific normalized keys for an options object.
     *
     * @param options - The options for the key binding.
     *
     * @returns Array of combined, normalized keys.
     */
    function normalizeKeys(options) {
        var keys;
        if (domutils_1.Platform.IS_WIN) {
            keys = options.winKeys || options.keys;
        }
        else if (domutils_1.Platform.IS_MAC) {
            keys = options.macKeys || options.keys;
        }
        else {
            keys = options.linuxKeys || options.keys;
        }
        return keys.map(normalizeKeystroke);
    }
    CommandRegistry.normalizeKeys = normalizeKeys;
    /**
     * Format a keystroke for display on the local system.
     */
    function formatKeystroke(keystroke) {
        var mods = '';
        var parts = parseKeystroke(keystroke);
        if (domutils_1.Platform.IS_MAC) {
            if (parts.ctrl) {
                mods += '\u2303 ';
            }
            if (parts.alt) {
                mods += '\u2325 ';
            }
            if (parts.shift) {
                mods += '\u21E7 ';
            }
            if (parts.cmd) {
                mods += '\u2318 ';
            }
        }
        else {
            if (parts.ctrl) {
                mods += 'Ctrl+';
            }
            if (parts.alt) {
                mods += 'Alt+';
            }
            if (parts.shift) {
                mods += 'Shift+';
            }
        }
        return mods + parts.key;
    }
    CommandRegistry.formatKeystroke = formatKeystroke;
    /**
     * Create a normalized keystroke for a `'keydown'` event.
     *
     * @param event - The event object for a `'keydown'` event.
     *
     * @returns A normalized keystroke, or an empty string if the event
     *   does not represent a valid keystroke for the given layout.
     */
    function keystrokeForKeydownEvent(event) {
        var key = keyboard_1.getKeyboardLayout().keyForKeydownEvent(event);
        if (!key) {
            return '';
        }
        var mods = '';
        if (event.ctrlKey) {
            mods += 'Ctrl ';
        }
        if (event.altKey) {
            mods += 'Alt ';
        }
        if (event.shiftKey) {
            mods += 'Shift ';
        }
        if (event.metaKey && domutils_1.Platform.IS_MAC) {
            mods += 'Cmd ';
        }
        return mods + key;
    }
    CommandRegistry.keystrokeForKeydownEvent = keystrokeForKeydownEvent;
})(CommandRegistry = exports.CommandRegistry || (exports.CommandRegistry = {}));
exports.CommandRegistry = CommandRegistry;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * The timeout in ms for triggering a key binding chord.
     */
    Private.CHORD_TIMEOUT = 1000;
    /**
     * Create a normalized command from an options object.
     */
    function createCommand(options) {
        var icon;
        var iconClass;
        /* <DEPRECATED> */
        if (!(options.icon) || typeof options.icon === 'string') {
            // alias icon to iconClass
            iconClass = asFunc(options.iconClass || options.icon, emptyStringFunc);
            icon = iconClass;
        }
        else {
            /* /<DEPRECATED> */
            iconClass = asFunc(options.iconClass, emptyStringFunc);
            icon = asFunc(options.icon, undefinedFunc);
            /* <DEPRECATED> */
        }
        /* </DEPRECATED> */
        return {
            execute: options.execute,
            label: asFunc(options.label, emptyStringFunc),
            mnemonic: asFunc(options.mnemonic, negativeOneFunc),
            icon: icon,
            iconClass: iconClass,
            iconLabel: asFunc(options.iconLabel, emptyStringFunc),
            caption: asFunc(options.caption, emptyStringFunc),
            usage: asFunc(options.usage, emptyStringFunc),
            className: asFunc(options.className, emptyStringFunc),
            dataset: asFunc(options.dataset, emptyDatasetFunc),
            isEnabled: options.isEnabled || trueFunc,
            isToggled: options.isToggled || falseFunc,
            isVisible: options.isVisible || trueFunc
        };
    }
    Private.createCommand = createCommand;
    /**
     * Create a key binding object from key binding options.
     */
    function createKeyBinding(options) {
        return {
            keys: CommandRegistry.normalizeKeys(options),
            selector: validateSelector(options),
            command: options.command,
            args: options.args || coreutils_1.JSONExt.emptyObject
        };
    }
    Private.createKeyBinding = createKeyBinding;
    /**
     * Find the key bindings which match a key sequence.
     *
     * This returns a match result which contains the best exact matching
     * binding, and a flag which indicates if there are partial matches.
     */
    function matchKeyBinding(bindings, keys, event) {
        // The current best exact match.
        var exact = null;
        // Whether a partial match has been found.
        var partial = false;
        // The match distance for the exact match.
        var distance = Infinity;
        // The specificity for the exact match.
        var specificity = 0;
        // Iterate over the bindings and search for the best match.
        for (var i = 0, n = bindings.length; i < n; ++i) {
            // Lookup the current binding.
            var binding = bindings[i];
            // Check whether the key binding sequence is a match.
            var sqm = matchSequence(binding.keys, keys);
            // If there is no match, the binding is ignored.
            if (sqm === 0 /* None */) {
                continue;
            }
            // If it is a partial match and no other partial match has been
            // found, ensure the selector matches and set the partial flag.
            if (sqm === 2 /* Partial */) {
                if (!partial && targetDistance(binding.selector, event) !== -1) {
                    partial = true;
                }
                continue;
            }
            // Ignore the match if the selector doesn't match, or if the
            // matched node is farther away than the current best match.
            var td = targetDistance(binding.selector, event);
            if (td === -1 || td > distance) {
                continue;
            }
            // Get the specificity for the selector.
            var sp = domutils_1.Selector.calculateSpecificity(binding.selector);
            // Update the best match if this match is stronger.
            if (!exact || td < distance || sp >= specificity) {
                exact = binding;
                distance = td;
                specificity = sp;
            }
        }
        // Return the match result.
        return { exact: exact, partial: partial };
    }
    Private.matchKeyBinding = matchKeyBinding;
    /**
     * Replay a keyboard event.
     *
     * This synthetically dispatches a clone of the keyboard event.
     */
    function replayKeyEvent(event) {
        event.target.dispatchEvent(cloneKeyboardEvent(event));
    }
    Private.replayKeyEvent = replayKeyEvent;
    /**
     * A singleton empty string function.
     */
    var emptyStringFunc = function () { return ''; };
    /**
     * A singleton `-1` number function
     */
    var negativeOneFunc = function () { return -1; };
    /**
     * A singleton true boolean function.
     */
    var trueFunc = function () { return true; };
    /**
     * A singleton false boolean function.
     */
    var falseFunc = function () { return false; };
    /**
     * A singleton empty dataset function.
     */
    var emptyDatasetFunc = function () { return ({}); };
    /**
     * A singleton undefined function
     */
    var undefinedFunc = function () { return undefined; };
    /**
     * Cast a value or command func to a command func.
     */
    function asFunc(value, dfault) {
        if (value === undefined) {
            return dfault;
        }
        if (typeof value === 'function') {
            return value;
        }
        return function () { return value; };
    }
    /**
     * Validate the selector for an options object.
     *
     * This returns the validated selector, or throws if the selector is
     * invalid or contains commas.
     */
    function validateSelector(options) {
        if (options.selector.indexOf(',') !== -1) {
            throw new Error("Selector cannot contain commas: " + options.selector);
        }
        if (!domutils_1.Selector.isValid(options.selector)) {
            throw new Error("Invalid selector: " + options.selector);
        }
        return options.selector;
    }
    ;
    /**
     * Test whether a key binding sequence matches a key sequence.
     *
     * Returns a `SequenceMatch` value indicating the type of match.
     */
    function matchSequence(bindKeys, userKeys) {
        if (bindKeys.length < userKeys.length) {
            return 0 /* None */;
        }
        for (var i = 0, n = userKeys.length; i < n; ++i) {
            if (bindKeys[i] !== userKeys[i]) {
                return 0 /* None */;
            }
        }
        if (bindKeys.length > userKeys.length) {
            return 2 /* Partial */;
        }
        return 1 /* Exact */;
    }
    /**
     * Find the distance from the target node to the first matching node.
     *
     * This traverses the event path from `target` to `currentTarget` and
     * computes the distance from `target` to the first node which matches
     * the CSS selector. If no match is found, `-1` is returned.
     */
    function targetDistance(selector, event) {
        var targ = event.target;
        var curr = event.currentTarget;
        for (var dist = 0; targ !== null; targ = targ.parentElement, ++dist) {
            if (targ.hasAttribute('data-lm-suppress-shortcuts')) {
                return -1;
            }
            /* <DEPRECATED> */
            if (targ.hasAttribute('data-p-suppress-shortcuts')) {
                return -1;
            }
            /* </DEPRECATED> */
            if (domutils_1.Selector.matches(targ, selector)) {
                return dist;
            }
            if (targ === curr) {
                return -1;
            }
        }
        return -1;
    }
    /**
     * Clone a keyboard event.
     */
    function cloneKeyboardEvent(event) {
        // A custom event is required because Chrome nulls out the
        // `keyCode` field in user-generated `KeyboardEvent` types.
        var clone = document.createEvent('Event');
        var bubbles = event.bubbles || true;
        var cancelable = event.cancelable || true;
        clone.initEvent(event.type || 'keydown', bubbles, cancelable);
        clone.key = event.key || '';
        clone.keyCode = event.keyCode || 0;
        clone.which = event.keyCode || 0;
        clone.ctrlKey = event.ctrlKey || false;
        clone.altKey = event.altKey || false;
        clone.shiftKey = event.shiftKey || false;
        clone.metaKey = event.metaKey || false;
        clone.view = event.view || window;
        return clone;
    }
})(Private || (Private = {}));

})
		]
	]
}, {
	name: "@lumino/coreutils",
	version: "1.4.3",
	root: "node_modules/@lumino/coreutils",
	main: "lib/index.js",
	files: [
		[
			/* @lumino/coreutils: 22 */
			"lib/uuid.js", ["cjs","js"], {"./random": 24}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var random_1 = require("./random");
/**
 * The namespace for UUID related functionality.
 */
var UUID;
(function (UUID) {
    /**
     * A function which generates UUID v4 identifiers.
     *
     * @returns A new UUID v4 string.
     *
     * #### Notes
     * This implementation complies with RFC 4122.
     *
     * This uses `Random.getRandomValues()` for random bytes, which in
     * turn will use the underlying `crypto` module of the platform if
     * it is available. The fallback for randomness is `Math.random`.
     */
    UUID.uuid4 = (function () {
        // Create a 16 byte array to hold the random values.
        var bytes = new Uint8Array(16);
        // Create a look up table from bytes to hex strings.
        var lut = new Array(256);
        // Pad the single character hex digits with a leading zero.
        for (var i = 0; i < 16; ++i) {
            lut[i] = '0' + i.toString(16);
        }
        // Populate the rest of the hex digits.
        for (var i = 16; i < 256; ++i) {
            lut[i] = i.toString(16);
        }
        // Return a function which generates the UUID.
        return function uuid4() {
            // Get a new batch of random values.
            random_1.Random.getRandomValues(bytes);
            // Set the UUID version number to 4.
            bytes[6] = 0x40 | (bytes[6] & 0x0F);
            // Set the clock sequence bit to the RFC spec.
            bytes[8] = 0x80 | (bytes[8] & 0x3F);
            // Assemble the UUID string.
            return (lut[bytes[0]] +
                lut[bytes[1]] +
                lut[bytes[2]] +
                lut[bytes[3]] +
                '-' +
                lut[bytes[4]] +
                lut[bytes[5]] +
                '-' +
                lut[bytes[6]] +
                lut[bytes[7]] +
                '-' +
                lut[bytes[8]] +
                lut[bytes[9]] +
                '-' +
                lut[bytes[10]] +
                lut[bytes[11]] +
                lut[bytes[12]] +
                lut[bytes[13]] +
                lut[bytes[14]] +
                lut[bytes[15]]);
        };
    })();
})(UUID = exports.UUID || (exports.UUID = {}));

})
		], [
			/* @lumino/coreutils: 23 */
			"lib/token.js", ["cjs","js"], {}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A runtime object which captures compile-time type information.
 *
 * #### Notes
 * A token captures the compile-time type of an interface or class in
 * an object which can be used at runtime in a type-safe fashion.
 */
var Token = /** @class */ (function () {
    /**
     * Construct a new token.
     *
     * @param name - A human readable name for the token.
     */
    function Token(name) {
        this.name = name;
        this._tokenStructuralPropertyT = null;
    }
    return Token;
}());
exports.Token = Token;

})
		], [
			/* @lumino/coreutils: 24 */
			"lib/random.js", ["cjs","js"], {"crypto": 68}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The namespace for random number related functionality.
 */
var Random;
(function (Random) {
    /**
     * A function which generates random bytes.
     *
     * @param buffer - The `Uint8Array` to fill with random bytes.
     *
     * #### Notes
     * A cryptographically strong random number generator will be used if
     * available. Otherwise, `Math.random` will be used as a fallback for
     * randomness.
     *
     * The following RNGs are supported, listed in order of precedence:
     *   - `window.crypto.getRandomValues`
     *   - `window.msCrypto.getRandomValues`
     *   - `require('crypto').randomFillSync
     *   - `require('crypto').randomBytes
     *   - `Math.random`
     */
    Random.getRandomValues = (function () {
        // Look up the crypto module if available.
        var crypto = ((typeof window !== 'undefined' && (window.crypto || window.msCrypto)) ||
            (typeof require !== 'undefined' && require('crypto')) || null);
        // Modern browsers and IE 11
        if (crypto && typeof crypto.getRandomValues === 'function') {
            return function getRandomValues(buffer) {
                return crypto.getRandomValues(buffer);
            };
        }
        // Node 7+
        if (crypto && typeof crypto.randomFillSync === 'function') {
            return function getRandomValues(buffer) {
                return crypto.randomFillSync(buffer);
            };
        }
        // Node 0.10+
        if (crypto && typeof crypto.randomBytes === 'function') {
            return function getRandomValues(buffer) {
                var bytes = crypto.randomBytes(buffer.length);
                for (var i = 0, n = bytes.length; i < n; ++i) {
                    buffer[i] = bytes[i];
                }
            };
        }
        // Fallback
        return function getRandomValues(buffer) {
            var value = 0;
            for (var i = 0, n = buffer.length; i < n; ++i) {
                if (i % 4 === 0) {
                    value = Math.random() * 0xFFFFFFFF >>> 0;
                }
                buffer[i] = value & 0xFF;
                value >>>= 8;
            }
        };
    })();
})(Random = exports.Random || (exports.Random = {}));

})
		], [
			/* @lumino/coreutils: 25 */
			"lib/promise.js", ["cjs","js"], {}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A class which wraps a promise into a delegate object.
 *
 * #### Notes
 * This class is useful when the logic to resolve or reject a promise
 * cannot be defined at the point where the promise is created.
 */
var PromiseDelegate = /** @class */ (function () {
    /**
     * Construct a new promise delegate.
     */
    function PromiseDelegate() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this._resolve = resolve;
            _this._reject = reject;
        });
    }
    /**
     * Resolve the wrapped promise with the given value.
     *
     * @param value - The value to use for resolving the promise.
     */
    PromiseDelegate.prototype.resolve = function (value) {
        var resolve = this._resolve;
        resolve(value);
    };
    /**
     * Reject the wrapped promise with the given value.
     *
     * @reason - The reason for rejecting the promise.
     */
    PromiseDelegate.prototype.reject = function (reason) {
        var reject = this._reject;
        reject(reason);
    };
    return PromiseDelegate;
}());
exports.PromiseDelegate = PromiseDelegate;

})
		], [
			/* @lumino/coreutils: 26 */
			"lib/mime.js", ["cjs","js"], {}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An object which stores MIME data for general application use.
 *
 * #### Notes
 * This class does not attempt to enforce "correctness" of MIME types
 * and their associated data. Since this class is designed to transfer
 * arbitrary data and objects within the same application, it assumes
 * that the user provides correct and accurate data.
 */
var MimeData = /** @class */ (function () {
    function MimeData() {
        this._types = [];
        this._values = [];
    }
    /**
     * Get an array of the MIME types contained within the dataset.
     *
     * @returns A new array of the MIME types, in order of insertion.
     */
    MimeData.prototype.types = function () {
        return this._types.slice();
    };
    /**
     * Test whether the dataset has an entry for the given type.
     *
     * @param mime - The MIME type of interest.
     *
     * @returns `true` if the dataset contains a value for the given
     *   MIME type, `false` otherwise.
     */
    MimeData.prototype.hasData = function (mime) {
        return this._types.indexOf(mime) !== -1;
    };
    /**
     * Get the data value for the given MIME type.
     *
     * @param mime - The MIME type of interest.
     *
     * @returns The value for the given MIME type, or `undefined` if
     *   the dataset does not contain a value for the type.
     */
    MimeData.prototype.getData = function (mime) {
        var i = this._types.indexOf(mime);
        return i !== -1 ? this._values[i] : undefined;
    };
    /**
     * Set the data value for the given MIME type.
     *
     * @param mime - The MIME type of interest.
     *
     * @param data - The data value for the given MIME type.
     *
     * #### Notes
     * This will overwrite any previous entry for the MIME type.
     */
    MimeData.prototype.setData = function (mime, data) {
        this.clearData(mime);
        this._types.push(mime);
        this._values.push(data);
    };
    /**
     * Remove the data entry for the given MIME type.
     *
     * @param mime - The MIME type of interest.
     *
     * #### Notes
     * This is a no-op if there is no entry for the given MIME type.
     */
    MimeData.prototype.clearData = function (mime) {
        var i = this._types.indexOf(mime);
        if (i !== -1) {
            this._types.splice(i, 1);
            this._values.splice(i, 1);
        }
    };
    /**
     * Remove all data entries from the dataset.
     */
    MimeData.prototype.clear = function () {
        this._types.length = 0;
        this._values.length = 0;
    };
    return MimeData;
}());
exports.MimeData = MimeData;

})
		], [
			/* @lumino/coreutils: 27 */
			"lib/json.js", ["cjs","js"], {}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The namespace for JSON-specific functions.
 */
var JSONExt;
(function (JSONExt) {
    /**
     * A shared frozen empty JSONObject
     */
    JSONExt.emptyObject = Object.freeze({});
    /**
     * A shared frozen empty JSONArray
     */
    JSONExt.emptyArray = Object.freeze([]);
    /**
     * Test whether a JSON value is a primitive.
     *
     * @param value - The JSON value of interest.
     *
     * @returns `true` if the value is a primitive,`false` otherwise.
     */
    function isPrimitive(value) {
        return (value === null ||
            typeof value === 'boolean' ||
            typeof value === 'number' ||
            typeof value === 'string');
    }
    JSONExt.isPrimitive = isPrimitive;
    function isArray(value) {
        return Array.isArray(value);
    }
    JSONExt.isArray = isArray;
    function isObject(value) {
        return !isPrimitive(value) && !isArray(value);
    }
    JSONExt.isObject = isObject;
    /**
     * Compare two JSON values for deep equality.
     *
     * @param first - The first JSON value of interest.
     *
     * @param second - The second JSON value of interest.
     *
     * @returns `true` if the values are equivalent, `false` otherwise.
     */
    function deepEqual(first, second) {
        // Check referential and primitive equality first.
        if (first === second) {
            return true;
        }
        // If one is a primitive, the `===` check ruled out the other.
        if (isPrimitive(first) || isPrimitive(second)) {
            return false;
        }
        // Test whether they are arrays.
        var a1 = isArray(first);
        var a2 = isArray(second);
        // Bail if the types are different.
        if (a1 !== a2) {
            return false;
        }
        // If they are both arrays, compare them.
        if (a1 && a2) {
            return deepArrayEqual(first, second);
        }
        // At this point, they must both be objects.
        return deepObjectEqual(first, second);
    }
    JSONExt.deepEqual = deepEqual;
    /**
     * Create a deep copy of a JSON value.
     *
     * @param value - The JSON value to copy.
     *
     * @returns A deep copy of the given JSON value.
     */
    function deepCopy(value) {
        // Do nothing for primitive values.
        if (isPrimitive(value)) {
            return value;
        }
        // Deep copy an array.
        if (isArray(value)) {
            return deepArrayCopy(value);
        }
        // Deep copy an object.
        return deepObjectCopy(value);
    }
    JSONExt.deepCopy = deepCopy;
    /**
     * Compare two JSON arrays for deep equality.
     */
    function deepArrayEqual(first, second) {
        // Check referential equality first.
        if (first === second) {
            return true;
        }
        // Test the arrays for equal length.
        if (first.length !== second.length) {
            return false;
        }
        // Compare the values for equality.
        for (var i = 0, n = first.length; i < n; ++i) {
            if (!deepEqual(first[i], second[i])) {
                return false;
            }
        }
        // At this point, the arrays are equal.
        return true;
    }
    /**
     * Compare two JSON objects for deep equality.
     */
    function deepObjectEqual(first, second) {
        // Check referential equality first.
        if (first === second) {
            return true;
        }
        // Check for the first object's keys in the second object.
        for (var key in first) {
            if (first[key] !== undefined && !(key in second)) {
                return false;
            }
        }
        // Check for the second object's keys in the first object.
        for (var key in second) {
            if (second[key] !== undefined && !(key in first)) {
                return false;
            }
        }
        // Compare the values for equality.
        for (var key in first) {
            // Get the values.
            var firstValue = first[key];
            var secondValue = second[key];
            // If both are undefined, ignore the key.
            if (firstValue === undefined && secondValue === undefined) {
                continue;
            }
            // If only one value is undefined, the objects are not equal.
            if (firstValue === undefined || secondValue === undefined) {
                return false;
            }
            // Compare the values.
            if (!deepEqual(firstValue, secondValue)) {
                return false;
            }
        }
        // At this point, the objects are equal.
        return true;
    }
    /**
     * Create a deep copy of a JSON array.
     */
    function deepArrayCopy(value) {
        var result = new Array(value.length);
        for (var i = 0, n = value.length; i < n; ++i) {
            result[i] = deepCopy(value[i]);
        }
        return result;
    }
    /**
     * Create a deep copy of a JSON object.
     */
    function deepObjectCopy(value) {
        var result = {};
        for (var key in value) {
            // Ignore undefined values.
            var subvalue = value[key];
            if (subvalue === undefined) {
                continue;
            }
            result[key] = deepCopy(subvalue);
        }
        return result;
    }
})(JSONExt = exports.JSONExt || (exports.JSONExt = {}));

})
		], [
			/* @lumino/coreutils: 28 */
			"lib/index.js", ["cjs","js"], {"./json": 27, "./mime": 26, "./promise": 25, "./random": 24, "./token": 23, "./uuid": 22}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
__export(require("./json"));
__export(require("./mime"));
__export(require("./promise"));
__export(require("./random"));
__export(require("./token"));
__export(require("./uuid"));

})
		]
	]
}, {
	name: "@lumino/default-theme",
	version: "0.3.2",
	root: "node_modules/@lumino/default-theme",
	main: "index.js",
	files: [
		[
			/* @lumino/default-theme: 29 */
			"style/index.css", ["css"], {}, "/*-----------------------------------------------------------------------------\n| Copyright (c) 2014-2018, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n/*-----------------------------------------------------------------------------\n| Copyright (c) Jupyter Development Team.\n| Copyright (c) 2014-2017, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n/* <DEPRECATED> */\nbody.p-mod-override-cursor *, /* </DEPRECATED> */\nbody.lm-mod-override-cursor * {\n  cursor: inherit !important;\n}\n/*-----------------------------------------------------------------------------\n| Copyright (c) Jupyter Development Team.\n| Copyright (c) 2014-2017, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n/*-----------------------------------------------------------------------------\n| Copyright (c) Jupyter Development Team.\n| Copyright (c) 2014-2017, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n/* <DEPRECATED> */\n.p-Widget, /* </DEPRECATED> */\n.lm-Widget {\n  box-sizing: border-box;\n  position: relative;\n  overflow: hidden;\n  cursor: default;\n}\n/* <DEPRECATED> */\n.p-Widget.p-mod-hidden, /* </DEPRECATED> */\n.lm-Widget.lm-mod-hidden {\n  display: none !important;\n}\n/*-----------------------------------------------------------------------------\n| Copyright (c) Jupyter Development Team.\n| Copyright (c) 2014-2017, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n/* <DEPRECATED> */\n.p-CommandPalette, /* </DEPRECATED> */\n.lm-CommandPalette {\n  display: flex;\n  flex-direction: column;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-search, /* </DEPRECATED> */\n.lm-CommandPalette-search {\n  flex: 0 0 auto;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-content, /* </DEPRECATED> */\n.lm-CommandPalette-content {\n  flex: 1 1 auto;\n  margin: 0;\n  padding: 0;\n  min-height: 0;\n  overflow: auto;\n  list-style-type: none;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-header, /* </DEPRECATED> */\n.lm-CommandPalette-header {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-item, /* </DEPRECATED> */\n.lm-CommandPalette-item {\n  display: flex;\n  flex-direction: row;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-itemIcon, /* </DEPRECATED> */\n.lm-CommandPalette-itemIcon {\n  flex: 0 0 auto;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-itemContent, /* </DEPRECATED> */\n.lm-CommandPalette-itemContent {\n  flex: 1 1 auto;\n  overflow: hidden;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-itemShortcut, /* </DEPRECATED> */\n.lm-CommandPalette-itemShortcut {\n  flex: 0 0 auto;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-itemLabel, /* </DEPRECATED> */\n.lm-CommandPalette-itemLabel {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n/*-----------------------------------------------------------------------------\n| Copyright (c) Jupyter Development Team.\n| Copyright (c) 2014-2017, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n/* <DEPRECATED> */\n.p-DockPanel, /* </DEPRECATED> */\n.lm-DockPanel {\n  z-index: 0;\n}\n/* <DEPRECATED> */\n.p-DockPanel-widget, /* </DEPRECATED> */\n.lm-DockPanel-widget {\n  z-index: 0;\n}\n/* <DEPRECATED> */\n.p-DockPanel-tabBar, /* </DEPRECATED> */\n.lm-DockPanel-tabBar {\n  z-index: 1;\n}\n/* <DEPRECATED> */\n.p-DockPanel-handle, /* </DEPRECATED> */\n.lm-DockPanel-handle {\n  z-index: 2;\n}\n/* <DEPRECATED> */\n.p-DockPanel-handle.p-mod-hidden, /* </DEPRECATED> */\n.lm-DockPanel-handle.lm-mod-hidden {\n  display: none !important;\n}\n/* <DEPRECATED> */\n.p-DockPanel-handle:after, /* </DEPRECATED> */\n.lm-DockPanel-handle:after {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  content: '';\n}\n/* <DEPRECATED> */\n.p-DockPanel-handle[data-orientation='horizontal'],\n/* </DEPRECATED> */\n.lm-DockPanel-handle[data-orientation='horizontal'] {\n  cursor: ew-resize;\n}\n/* <DEPRECATED> */\n.p-DockPanel-handle[data-orientation='vertical'],\n/* </DEPRECATED> */\n.lm-DockPanel-handle[data-orientation='vertical'] {\n  cursor: ns-resize;\n}\n/* <DEPRECATED> */\n.p-DockPanel-handle[data-orientation='horizontal']:after,\n/* </DEPRECATED> */\n.lm-DockPanel-handle[data-orientation='horizontal']:after {\n  left: 50%;\n  min-width: 8px;\n  transform: translateX(-50%);\n}\n/* <DEPRECATED> */\n.p-DockPanel-handle[data-orientation='vertical']:after,\n/* </DEPRECATED> */\n.lm-DockPanel-handle[data-orientation='vertical']:after {\n  top: 50%;\n  min-height: 8px;\n  transform: translateY(-50%);\n}\n/* <DEPRECATED> */\n.p-DockPanel-overlay, /* </DEPRECATED> */\n.lm-DockPanel-overlay {\n  z-index: 3;\n  box-sizing: border-box;\n  pointer-events: none;\n}\n/* <DEPRECATED> */\n.p-DockPanel-overlay.p-mod-hidden, /* </DEPRECATED> */\n.lm-DockPanel-overlay.lm-mod-hidden {\n  display: none !important;\n}\n/*-----------------------------------------------------------------------------\n| Copyright (c) Jupyter Development Team.\n| Copyright (c) 2014-2017, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n/* <DEPRECATED> */\n.p-Menu, /* </DEPRECATED> */\n.lm-Menu {\n  z-index: 10000;\n  position: absolute;\n  white-space: nowrap;\n  overflow-x: hidden;\n  overflow-y: auto;\n  outline: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n/* <DEPRECATED> */\n.p-Menu-content, /* </DEPRECATED> */\n.lm-Menu-content {\n  margin: 0;\n  padding: 0;\n  display: table;\n  list-style-type: none;\n}\n/* <DEPRECATED> */\n.p-Menu-item, /* </DEPRECATED> */\n.lm-Menu-item {\n  display: table-row;\n}\n/* <DEPRECATED> */\n.p-Menu-item.p-mod-hidden,\n.p-Menu-item.p-mod-collapsed,\n/* </DEPRECATED> */\n.lm-Menu-item.lm-mod-hidden,\n.lm-Menu-item.lm-mod-collapsed {\n  display: none !important;\n}\n/* <DEPRECATED> */\n.p-Menu-itemIcon,\n.p-Menu-itemSubmenuIcon,\n/* </DEPRECATED> */\n.lm-Menu-itemIcon,\n.lm-Menu-itemSubmenuIcon {\n  display: table-cell;\n  text-align: center;\n}\n/* <DEPRECATED> */\n.p-Menu-itemLabel, /* </DEPRECATED> */\n.lm-Menu-itemLabel {\n  display: table-cell;\n  text-align: left;\n}\n/* <DEPRECATED> */\n.p-Menu-itemShortcut, /* </DEPRECATED> */\n.lm-Menu-itemShortcut {\n  display: table-cell;\n  text-align: right;\n}\n/*-----------------------------------------------------------------------------\n| Copyright (c) Jupyter Development Team.\n| Copyright (c) 2014-2017, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n/* <DEPRECATED> */\n.p-MenuBar, /* </DEPRECATED> */\n.lm-MenuBar {\n  outline: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n/* <DEPRECATED> */\n.p-MenuBar-content, /* </DEPRECATED> */\n.lm-MenuBar-content {\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: row;\n  list-style-type: none;\n}\n/* <DEPRECATED> */\n.p--MenuBar-item, /* </DEPRECATED> */\n.lm-MenuBar-item {\n  box-sizing: border-box;\n}\n/* <DEPRECATED> */\n.p-MenuBar-itemIcon,\n.p-MenuBar-itemLabel,\n/* </DEPRECATED> */\n.lm-MenuBar-itemIcon,\n.lm-MenuBar-itemLabel {\n  display: inline-block;\n}\n/*-----------------------------------------------------------------------------\n| Copyright (c) Jupyter Development Team.\n| Copyright (c) 2014-2017, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n/* <DEPRECATED> */\n.p-ScrollBar, /* </DEPRECATED> */\n.lm-ScrollBar {\n  display: flex;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n/* <DEPRECATED> */\n.p-ScrollBar[data-orientation='horizontal'],\n/* </DEPRECATED> */\n.lm-ScrollBar[data-orientation='horizontal'] {\n  flex-direction: row;\n}\n/* <DEPRECATED> */\n.p-ScrollBar[data-orientation='vertical'],\n/* </DEPRECATED> */\n.lm-ScrollBar[data-orientation='vertical'] {\n  flex-direction: column;\n}\n/* <DEPRECATED> */\n.p-ScrollBar-button, /* </DEPRECATED> */\n.lm-ScrollBar-button {\n  box-sizing: border-box;\n  flex: 0 0 auto;\n}\n/* <DEPRECATED> */\n.p-ScrollBar-track, /* </DEPRECATED> */\n.lm-ScrollBar-track {\n  box-sizing: border-box;\n  position: relative;\n  overflow: hidden;\n  flex: 1 1 auto;\n}\n/* <DEPRECATED> */\n.p-ScrollBar-thumb, /* </DEPRECATED> */\n.lm-ScrollBar-thumb {\n  box-sizing: border-box;\n  position: absolute;\n}\n/*-----------------------------------------------------------------------------\n| Copyright (c) Jupyter Development Team.\n| Copyright (c) 2014-2017, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n/* <DEPRECATED> */\n.p-SplitPanel-child, /* </DEPRECATED> */\n.lm-SplitPanel-child {\n  z-index: 0;\n}\n/* <DEPRECATED> */\n.p-SplitPanel-handle, /* </DEPRECATED> */\n.lm-SplitPanel-handle {\n  z-index: 1;\n}\n/* <DEPRECATED> */\n.p-SplitPanel-handle.p-mod-hidden, /* </DEPRECATED> */\n.lm-SplitPanel-handle.lm-mod-hidden {\n  display: none !important;\n}\n/* <DEPRECATED> */\n.p-SplitPanel-handle:after, /* </DEPRECATED> */\n.lm-SplitPanel-handle:after {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  content: '';\n}\n/* <DEPRECATED> */\n.p-SplitPanel[data-orientation='horizontal'] > .p-SplitPanel-handle,\n/* </DEPRECATED> */\n.lm-SplitPanel[data-orientation='horizontal'] > .lm-SplitPanel-handle {\n  cursor: ew-resize;\n}\n/* <DEPRECATED> */\n.p-SplitPanel[data-orientation='vertical'] > .p-SplitPanel-handle,\n/* </DEPRECATED> */\n.lm-SplitPanel[data-orientation='vertical'] > .lm-SplitPanel-handle {\n  cursor: ns-resize;\n}\n/* <DEPRECATED> */\n.p-SplitPanel[data-orientation='horizontal'] > .p-SplitPanel-handle:after,\n/* </DEPRECATED> */\n.lm-SplitPanel[data-orientation='horizontal'] > .lm-SplitPanel-handle:after {\n  left: 50%;\n  min-width: 8px;\n  transform: translateX(-50%);\n}\n/* <DEPRECATED> */\n.p-SplitPanel[data-orientation='vertical'] > .p-SplitPanel-handle:after,\n/* </DEPRECATED> */\n.lm-SplitPanel[data-orientation='vertical'] > .lm-SplitPanel-handle:after {\n  top: 50%;\n  min-height: 8px;\n  transform: translateY(-50%);\n}\n/*-----------------------------------------------------------------------------\n| Copyright (c) Jupyter Development Team.\n| Copyright (c) 2014-2017, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n/* <DEPRECATED> */\n.p-TabBar, /* </DEPRECATED> */\n.lm-TabBar {\n  display: flex;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n/* <DEPRECATED> */\n.p-TabBar[data-orientation='horizontal'], /* </DEPRECATED> */\n.lm-TabBar[data-orientation='horizontal'] {\n  flex-direction: row;\n}\n/* <DEPRECATED> */\n.p-TabBar[data-orientation='vertical'], /* </DEPRECATED> */\n.lm-TabBar[data-orientation='vertical'] {\n  flex-direction: column;\n}\n/* <DEPRECATED> */\n.p-TabBar-content, /* </DEPRECATED> */\n.lm-TabBar-content {\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex: 1 1 auto;\n  list-style-type: none;\n}\n/* <DEPRECATED> */\n.p-TabBar[data-orientation='horizontal'] > .p-TabBar-content,\n/* </DEPRECATED> */\n.lm-TabBar[data-orientation='horizontal'] > .lm-TabBar-content {\n  flex-direction: row;\n}\n/* <DEPRECATED> */\n.p-TabBar[data-orientation='vertical'] > .p-TabBar-content,\n/* </DEPRECATED> */\n.lm-TabBar[data-orientation='vertical'] > .lm-TabBar-content {\n  flex-direction: column;\n}\n/* <DEPRECATED> */\n.p-TabBar-tab, /* </DEPRECATED> */\n.lm-TabBar-tab {\n  display: flex;\n  flex-direction: row;\n  box-sizing: border-box;\n  overflow: hidden;\n}\n/* <DEPRECATED> */\n.p-TabBar-tabIcon,\n.p-TabBar-tabCloseIcon,\n/* </DEPRECATED> */\n.lm-TabBar-tabIcon,\n.lm-TabBar-tabCloseIcon {\n  flex: 0 0 auto;\n}\n/* <DEPRECATED> */\n.p-TabBar-tabLabel, /* </DEPRECATED> */\n.lm-TabBar-tabLabel {\n  flex: 1 1 auto;\n  overflow: hidden;\n  white-space: nowrap;\n}\n/* <DEPRECATED> */\n.p-TabBar-tab.p-mod-hidden, /* </DEPRECATED> */\n.lm-TabBar-tab.lm-mod-hidden {\n  display: none !important;\n}\n/* <DEPRECATED> */\n.p-TabBar.p-mod-dragging .p-TabBar-tab, /* </DEPRECATED> */\n.lm-TabBar.lm-mod-dragging .lm-TabBar-tab {\n  position: relative;\n}\n/* <DEPRECATED> */\n.p-TabBar.p-mod-dragging[data-orientation='horizontal'] .p-TabBar-tab,\n/* </DEPRECATED> */\n.lm-TabBar.lm-mod-dragging[data-orientation='horizontal'] .lm-TabBar-tab {\n  left: 0;\n  transition: left 150ms ease;\n}\n/* <DEPRECATED> */\n.p-TabBar.p-mod-dragging[data-orientation='vertical'] .p-TabBar-tab,\n/* </DEPRECATED> */\n.lm-TabBar.lm-mod-dragging[data-orientation='vertical'] .lm-TabBar-tab {\n  top: 0;\n  transition: top 150ms ease;\n}\n/* <DEPRECATED> */\n.p-TabBar.p-mod-dragging .p-TabBar-tab.p-mod-dragging\n/* </DEPRECATED> */\n.lm-TabBar.lm-mod-dragging .lm-TabBar-tab.lm-mod-dragging {\n  transition: none;\n}\n/*-----------------------------------------------------------------------------\n| Copyright (c) Jupyter Development Team.\n| Copyright (c) 2014-2017, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n/* <DEPRECATED> */\n.p-TabPanel-tabBar, /* </DEPRECATED> */\n.lm-TabPanel-tabBar {\n  z-index: 1;\n}\n/* <DEPRECATED> */\n.p-TabPanel-stackedPanel, /* </DEPRECATED> */\n.lm-TabPanel-stackedPanel {\n  z-index: 0;\n}\n/*-----------------------------------------------------------------------------\n| Copyright (c) Jupyter Development Team.\n| Copyright (c) 2014-2017, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n/* <DEPRECATED> */\n.p-CommandPalette, /* </DEPRECATED> */\n.lm-CommandPalette {\n  font-family: sans-serif;\n  background: #F5F5F5;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-search, /* </DEPRECATED> */\n.lm-CommandPalette-search {\n  padding: 8px;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-wrapper, /* </DEPRECATED> */\n.lm-CommandPalette-wrapper {\n  padding: 4px 6px;\n  background: white;\n  border: 1px solid #E0E0E0;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-input, /* </DEPRECATED> */\n.lm-CommandPalette-input {\n  width: 100%;\n  border: none;\n  outline: none;\n  font-size: 16px;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-header, /* </DEPRECATED> */\n.lm-CommandPalette-header {\n  padding: 4px;\n  color: #757575;\n  font-size: 12px;\n  font-weight: 600;\n  background: #E1E1E1;\n  cursor: pointer;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-header:hover::before, /* </DEPRECATED> */\n.lm-CommandPalette-header:hover::before {\n  content: '\\2026'; /* ellipsis */\n  float: right;\n  margin-right: 4px;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-header > mark, /* </DEPRECATED> */\n.lm-CommandPalette-header > mark {\n  background-color: transparent;\n  font-weight: bold;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-item, /* </DEPRECATED> */\n.lm-CommandPalette-item {\n  padding: 4px 8px;\n  color: #757575;\n  font-size: 13px;\n  font-weight: 500;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-emptyMessage, /* </DEPRECATED> */\n.lm-CommandPalette-emptyMessage {\n  padding: 4px;\n  color: #757575;\n  font-size: 12px;\n  font-weight: 600;\n  text-align: center;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-item.p-mod-disabled, /* </DEPRECATED> */\n.lm-CommandPalette-item.lm-mod-disabled {\n  color: rgba(0, 0, 0, 0.25);\n}\n/* <DEPRECATED> */\n.p-CommandPalette-item.p-mod-active, /* </DEPRECATED> */\n.lm-CommandPalette-item.lm-mod-active {\n  background: #7FDBFF;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-item:hover:not(.p-mod-active):not(.p-mod-disabled),\n/* </DEPRECATED> */\n.lm-CommandPalette-item:hover:not(.lm-mod-active):not(.lm-mod-disabled) {\n  background: #E5E5E5;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-itemIcon, /* </DEPRECATED> */\n.lm-CommandPalette-itemIcon {\n  display: none;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-itemLabel > mark, /* </DEPRECATED> */\n.lm-CommandPalette-itemLabel > mark {\n  background-color: transparent;\n  font-weight: bold;\n}\n/* <DEPRECATED> */\n.p-CommandPalette-item.p-mod-disabled mark,\n/* </DEPRECATED> */\n.lm-CommandPalette-item.lm-mod-disabled mark {\n  color: rgba(0, 0, 0, 0.4);\n}\n/* <DEPRECATED> */\n.p-CommandPalette-itemCaption, /* </DEPRECATED> */\n.lm-CommandPalette-itemCaption {\n  color: #9E9E9E;\n  font-size: 11px;\n  font-weight: 400;\n}\n/*-----------------------------------------------------------------------------\n| Copyright (c) 2014-2018, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n/* <DEPRECATED> */\n.p-DataGrid, /* </DEPRECATED> */\n.lm-DataGrid {\n  min-width: 64px;\n  min-height: 64px;\n  border: 1px solid #A0A0A0;\n}\n/* <DEPRECATED> */\n.p-DataGrid-scrollCorner, /* </DEPRECATED> */\n.lm-DataGrid-scrollCorner {\n  background-color: #F0F0F0;\n}\n/* <DEPRECATED> */\n.p-DataGrid-scrollCorner::after, /* </DEPRECATED> */\n.lm-DataGrid-scrollCorner::after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 1px;\n  height: 1px;\n  background-color: #A0A0A0;\n}\n.lm-DataGrid-cellEditorOccluder {\n  pointer-events: none;\n  position: absolute;\n  overflow: hidden;\n}\n.lm-DataGrid-cellEditorContainer {\n  pointer-events: auto;\n  position: absolute;\n  background-color: #ffffff;\n  box-sizing: border-box;\n  box-shadow: 0px 0px 6px #006bf7;\n  border: 2px solid #006bf7;\n}\n.lm-DataGrid-cellEditorContainer.lm-mod-invalid {\n  box-shadow: 0px 0px 6px red;\n  border: 2px solid red;\n}\n.lm-DataGrid-cellEditorContainer > form {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n.lm-DataGrid-cellEditorWidget {\n  width: 100%;\n  height: 100%;\n  outline: none;\n  box-sizing: border-box;\n}\n.lm-DataGrid-cellEditorInput {\n  background-color: #ffffff;\n  border: 0;\n}\n.lm-DataGrid-cellEditorCheckbox {\n  margin: 0;\n}\n.lm-DataGrid-notification {\n  position: absolute;\n  display: flex;\n  overflow: visible;\n  -webkit-animation: fade-in 300ms ease-out;\n          animation: fade-in 300ms ease-out;\n}\n.lm-DataGrid-notificationContainer {\n  box-shadow: 0px 2px 5px #999999;\n  border-radius: 3px;\n  background-color: white;\n  color: black;\n  border: 1px solid black;\n  font-family: sans-serif;\n  font-size: 13px;\n  padding: 4px;\n}\n@-webkit-keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 0.7;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 0.7;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n/*-----------------------------------------------------------------------------\n| Copyright (c) Jupyter Development Team.\n| Copyright (c) 2014-2017, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n/* <DEPRECATED> */\n.p-DockPanel-overlay, /* </DEPRECATED> */\n.lm-DockPanel-overlay {\n  background: rgba(255, 255, 255, 0.6);\n  border: 1px dashed black;\n  transition-property: top, left, right, bottom;\n  transition-duration: 150ms;\n  transition-timing-function: ease;\n}\n/*-----------------------------------------------------------------------------\n| Copyright (c) Jupyter Development Team.\n| Copyright (c) 2014-2017, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n/* <DEPRECATED> */\n.p-Menu, /* </DEPRECATED> */\n.lm-Menu {\n  padding: 3px 0px;\n  background: white;\n  color: rgba(0, 0, 0, 0.87);\n  border: 1px solid #C0C0C0;\n  font: 12px Helvetica, Arial, sans-serif;\n  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.2);\n}\n/* <DEPRECATED> */\n.p-Menu-item.p-mod-active, /* </DEPRECATED> */\n.lm-Menu-item.lm-mod-active {\n  background: #E5E5E5;\n}\n/* <DEPRECATED> */\n.p-Menu-item.p-mod-disabled, /* </DEPRECATED> */\n.lm-Menu-item.lm-mod-disabled {\n  color: rgba(0, 0, 0, 0.25);\n}\n/* <DEPRECATED> */\n.p-Menu-itemIcon, /* </DEPRECATED> */\n.lm-Menu-itemIcon {\n  width: 21px;\n  padding: 4px 2px;\n}\n/* <DEPRECATED> */\n.p-Menu-itemLabel, /* </DEPRECATED> */\n.lm-Menu-itemLabel {\n  padding: 4px 35px 4px 2px;\n}\n/* <DEPRECATED> */\n.p-Menu-itemMnemonic, /* </DEPRECATED> */\n.lm-Menu-itemMnemonic {\n  text-decoration: underline;\n}\n/* <DEPRECATED> */\n.p-Menu-itemShortcut, /* </DEPRECATED> */\n.lm-Menu-itemShortcut {\n  padding: 4px 0px;\n}\n/* <DEPRECATED> */\n.p-Menu-itemSubmenuIcon, /* </DEPRECATED> */\n.lm-Menu-itemSubmenuIcon {\n  width: 16px;\n  padding: 4px 0px;\n}\n/* <DEPRECATED> */\n.p-Menu-item[data-type='separator'] > div,\n/* </DEPRECATED> */\n.lm-Menu-item[data-type='separator'] > div {\n  padding: 0;\n  height: 9px;\n}\n/* <DEPRECATED> */\n.p-Menu-item[data-type='separator'] > div::after,\n/* </DEPRECATED> */\n.lm-Menu-item[data-type='separator'] > div::after {\n  content: '';\n  display: block;\n  position: relative;\n  top: 4px;\n  border-top: 1px solid #DDDDDD;\n}\n/* <DEPRECATED> */\n.p-Menu-itemIcon::before,\n.p-Menu-itemSubmenuIcon::before,\n/* </DEPRECATED> */\n.lm-Menu-itemIcon::before,\n.lm-Menu-itemSubmenuIcon::before {\n  font-family: FontAwesome;\n}\n/* <DEPRECATED> */\n.p-Menu-item.lm-mod-toggled > .p-Menu-itemIcon::before,\n/* </DEPRECATED> */\n.lm-Menu-item.lm-mod-toggled > .lm-Menu-itemIcon::before {\n  content: '\\f00c';\n}\n/* <DEPRECATED> */\n.p-Menu-item[data-type='submenu'] > .p-Menu-itemSubmenuIcon::before,\n/* </DEPRECATED> */\n.lm-Menu-item[data-type='submenu'] > .lm-Menu-itemSubmenuIcon::before {\n  content: '\\f0da';\n}\n/*-----------------------------------------------------------------------------\n| Copyright (c) Jupyter Development Team.\n| Copyright (c) 2014-2017, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n/* <DEPRECATED> */\n.p-MenuBar, /* </DEPRECATED> */\n.lm-MenuBar {\n  padding-left: 5px;\n  background: #FAFAFA;\n  color: rgba(0, 0, 0, 0.87);\n  border-bottom: 1px solid #DDDDDD;\n  font: 13px Helvetica, Arial, sans-serif;\n}\n/* <DEPRECATED> */\n.p-MenuBar-menu, /* </DEPRECATED> */\n.lm-MenuBar-menu {\n  transform: translateY(-1px);\n}\n/* <DEPRECATED> */\n.p-MenuBar-item, /* </DEPRECATED> */\n.lm-MenuBar-item {\n  padding: 4px 8px;\n  border-left: 1px solid transparent;\n  border-right: 1px solid transparent;\n}\n/* <DEPRECATED> */\n.p-MenuBar-item.p-mod-active, /* </DEPRECATED> */\n.lm-MenuBar-item.lm-mod-active {\n  background: #E5E5E5;\n}\n/* <DEPRECATED> */\n.p-MenuBar.p-mod-active .p-MenuBar-item.p-mod-active,\n/* </DEPRECATED> */\n.lm-MenuBar.lm-mod-active .lm-MenuBar-item.lm-mod-active {\n  z-index: 10001;\n  background: white;\n  border-left: 1px solid #C0C0C0;\n  border-right: 1px solid #C0C0C0;\n  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);\n}\n/*-----------------------------------------------------------------------------\n| Copyright (c) Jupyter Development Team.\n| Copyright (c) 2014-2017, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n/* <DEPRECATED> */\n.p-ScrollBar[data-orientation='horizontal'],\n/* </DEPRECATED> */\n.lm-ScrollBar[data-orientation='horizontal'] {\n  min-height: 16px;\n  max-height: 16px;\n  min-width: 45px;\n  border-top: 1px solid #A0A0A0;\n}\n/* <DEPRECATED> */\n.p-ScrollBar[data-orientation='vertical'],\n/* </DEPRECATED> */\n.lm-ScrollBar[data-orientation='vertical'] {\n  min-width: 16px;\n  max-width: 16px;\n  min-height: 45px;\n  border-left: 1px solid #A0A0A0;\n}\n/* <DEPRECATED> */\n.p-ScrollBar-button, /* </DEPRECATED> */\n.lm-ScrollBar-button {\n  background-color: #F0F0F0;\n  background-position: center center;\n  min-height: 15px;\n  max-height: 15px;\n  min-width: 15px;\n  max-width: 15px;\n}\n/* <DEPRECATED> */\n.p-ScrollBar-button:hover, /* </DEPRECATED> */\n.lm-ScrollBar-button:hover {\n  background-color: #DADADA;\n}\n/* <DEPRECATED> */\n.p-ScrollBar-button.p-mod-active, /* </DEPRECATED> */\n.lm-ScrollBar-button.lm-mod-active {\n  background-color: #CDCDCD;\n}\n/* <DEPRECATED> */\n.p-ScrollBar-track, /* </DEPRECATED> */\n.lm-ScrollBar-track {\n  background: #F0F0F0;\n}\n/* <DEPRECATED> */\n.p-ScrollBar-thumb, /* </DEPRECATED> */\n.lm-ScrollBar-thumb {\n  background: #CDCDCD;\n}\n/* <DEPRECATED> */\n.p-ScrollBar-thumb:hover, /* </DEPRECATED> */\n.lm-ScrollBar-thumb:hover {\n  background: #BABABA;\n}\n/* <DEPRECATED> */\n.p-ScrollBar-thumb.lm-mod-active, /* </DEPRECATED> */\n.lm-ScrollBar-thumb.lm-mod-active {\n  background: #A0A0A0;\n}\n/* <DEPRECATED> */\n.p-ScrollBar[data-orientation='horizontal'] .p-ScrollBar-thumb,\n/* </DEPRECATED> */\n.lm-ScrollBar[data-orientation='horizontal'] .lm-ScrollBar-thumb {\n  height: 100%;\n  min-width: 15px;\n  border-left: 1px solid #A0A0A0;\n  border-right: 1px solid #A0A0A0;\n}\n/* <DEPRECATED> */\n.p-ScrollBar[data-orientation='vertical'] .p-ScrollBar-thumb,\n/* </DEPRECATED> */\n.lm-ScrollBar[data-orientation='vertical'] .lm-ScrollBar-thumb {\n  width: 100%;\n  min-height: 15px;\n  border-top: 1px solid #A0A0A0;\n  border-bottom: 1px solid #A0A0A0;\n}\n/* <DEPRECATED> */\n.p-ScrollBar[data-orientation='horizontal'] .p-ScrollBar-button[data-action='decrement'],\n/* </DEPRECATED> */\n.lm-ScrollBar[data-orientation='horizontal'] .lm-ScrollBar-button[data-action='decrement'] {\n  background-image: url(../../../../@lumino/default-theme/images/caretleft.png);\n}\n/* <DEPRECATED> */\n.p-ScrollBar[data-orientation='horizontal'] .p-ScrollBar-button[data-action='increment'],\n/* </DEPRECATED> */\n.lm-ScrollBar[data-orientation='horizontal'] .lm-ScrollBar-button[data-action='increment'] {\n  background-image: url(../../../../@lumino/default-theme/images/caretright.png);\n}\n/* <DEPRECATED> */\n.p-ScrollBar[data-orientation='vertical'] .p-ScrollBar-button[data-action='decrement'],\n/* </DEPRECATED> */\n.lm-ScrollBar[data-orientation='vertical'] .lm-ScrollBar-button[data-action='decrement'] {\n  background-image: url(../../../../@lumino/default-theme/images/caretup.png);\n}\n/* <DEPRECATED> */\n.p-ScrollBar[data-orientation='vertical'] .p-ScrollBar-button[data-action='increment'],\n/* </DEPRECATED> */\n.lm-ScrollBar[data-orientation='vertical'] .lm-ScrollBar-button[data-action='increment'] {\n  background-image: url(../../../../@lumino/default-theme/images/caretdown.png);\n}\n/*-----------------------------------------------------------------------------\n| Copyright (c) Jupyter Development Team.\n| Copyright (c) 2014-2017, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n/* <DEPRECATED> */\n.p-TabBar, /* </DEPRECATED> */\n.lm-TabBar {\n  min-height: 24px;\n  max-height: 24px;\n}\n/* <DEPRECATED> */\n.p-TabBar-content, /* </DEPRECATED> */\n.lm-TabBar-content {\n  min-width: 0;\n  min-height: 0;\n  align-items: flex-end;\n  border-bottom: 1px solid #C0C0C0;\n}\n/* <DEPRECATED> */\n.p-TabBar-tab, /* </DEPRECATED> */\n.lm-TabBar-tab {\n  padding: 0px 10px;\n  background: #E5E5E5;\n  border: 1px solid #C0C0C0;\n  border-bottom: none;\n  font: 12px Helvetica, Arial, sans-serif;\n  flex: 0 1 125px;\n  min-height: 20px;\n  max-height: 20px;\n  min-width: 35px;\n  margin-left: -1px;\n  line-height: 20px;\n}\n/* <DEPRECATED> */\n.p-TabBar-tab.p-mod-current, /* </DEPRECATED> */\n.lm-TabBar-tab.lm-mod-current {\n  background: white;\n}\n/* <DEPRECATED> */\n.p-TabBar-tab:hover:not(.p-mod-current), /* </DEPRECATED> */\n.lm-TabBar-tab:hover:not(.lm-mod-current) {\n  background: #F0F0F0;\n}\n/* <DEPRECATED> */\n.p-TabBar-tab:first-child, /* </DEPRECATED> */\n.lm-TabBar-tab:first-child {\n  margin-left: 0;\n}\n/* <DEPRECATED> */\n.p-TabBar-tab.p-mod-current, /* </DEPRECATED> */\n.lm-TabBar-tab.lm-mod-current {\n  min-height: 23px;\n  max-height: 23px;\n  transform: translateY(1px);\n}\n/* <DEPRECATED> */\n.p-TabBar-tabIcon,\n.p-TabBar-tabLabel,\n.p-TabBar-tabCloseIcon,\n/* </DEPRECATED> */\n.lm-TabBar-tabIcon,\n.lm-TabBar-tabLabel,\n.lm-TabBar-tabCloseIcon {\n  display: inline-block;\n}\n/* <DEPRECATED> */\n.p-TabBar-tab.p-mod-closable > .p-TabBar-tabCloseIcon,\n/* </DEPRECATED> */\n.lm-TabBar-tab.lm-mod-closable > .lm-TabBar-tabCloseIcon {\n  margin-left: 4px;\n}\n/* <DEPRECATED> */\n.p-TabBar-tab.p-mod-closable > .p-TabBar-tabCloseIcon:before,\n/* </DEPRECATED> */\n.lm-TabBar-tab.lm-mod-closable > .lm-TabBar-tabCloseIcon:before {\n  content: '\\f00d';\n  font-family: FontAwesome;\n}\n/* <DEPRECATED> */\n.p-TabBar-tab.p-mod-drag-image,\n/* </DEPRECATED> */\n.lm-TabBar-tab.lm-mod-drag-image {\n  min-height: 23px;\n  max-height: 23px;\n  min-width: 125px;\n  border: none;\n  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);\n  transform: translateX(-40%) translateY(-58%);\n}\n"
		]
	]
}, {
	name: "@lumino/disposable",
	version: "1.3.6",
	root: "node_modules/@lumino/disposable",
	main: "lib/index.js",
	files: [
		[
			/* @lumino/disposable: 30 */
			"lib/index.js", ["cjs","js"], {"@lumino/algorithm": 11, "@lumino/signaling": 40}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
var signaling_1 = require("@lumino/signaling");
/**
 * A disposable object which delegates to a callback function.
 */
var DisposableDelegate = /** @class */ (function () {
    /**
     * Construct a new disposable delegate.
     *
     * @param fn - The callback function to invoke on dispose.
     */
    function DisposableDelegate(fn) {
        this._fn = fn;
    }
    Object.defineProperty(DisposableDelegate.prototype, "isDisposed", {
        /**
         * Test whether the delegate has been disposed.
         */
        get: function () {
            return !this._fn;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose of the delegate and invoke the callback function.
     */
    DisposableDelegate.prototype.dispose = function () {
        if (!this._fn) {
            return;
        }
        var fn = this._fn;
        this._fn = null;
        fn();
    };
    return DisposableDelegate;
}());
exports.DisposableDelegate = DisposableDelegate;
/**
 * An observable disposable object which delegates to a callback function.
 */
var ObservableDisposableDelegate = /** @class */ (function (_super) {
    __extends(ObservableDisposableDelegate, _super);
    function ObservableDisposableDelegate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._disposed = new signaling_1.Signal(_this);
        return _this;
    }
    Object.defineProperty(ObservableDisposableDelegate.prototype, "disposed", {
        /**
         * A signal emitted when the delegate is disposed.
         */
        get: function () {
            return this._disposed;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose of the delegate and invoke the callback function.
     */
    ObservableDisposableDelegate.prototype.dispose = function () {
        if (this.isDisposed) {
            return;
        }
        _super.prototype.dispose.call(this);
        this._disposed.emit(undefined);
        signaling_1.Signal.clearData(this);
    };
    return ObservableDisposableDelegate;
}(DisposableDelegate));
exports.ObservableDisposableDelegate = ObservableDisposableDelegate;
/**
 * An object which manages a collection of disposable items.
 */
var DisposableSet = /** @class */ (function () {
    /**
     * Construct a new disposable set.
     */
    function DisposableSet() {
        this._isDisposed = false;
        this._items = new Set();
    }
    Object.defineProperty(DisposableSet.prototype, "isDisposed", {
        /**
         * Test whether the set has been disposed.
         */
        get: function () {
            return this._isDisposed;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose of the set and the items it contains.
     *
     * #### Notes
     * Items are disposed in the order they are added to the set.
     */
    DisposableSet.prototype.dispose = function () {
        if (this._isDisposed) {
            return;
        }
        this._isDisposed = true;
        this._items.forEach(function (item) { item.dispose(); });
        this._items.clear();
    };
    /**
     * Test whether the set contains a specific item.
     *
     * @param item - The item of interest.
     *
     * @returns `true` if the set contains the item, `false` otherwise.
     */
    DisposableSet.prototype.contains = function (item) {
        return this._items.has(item);
    };
    /**
     * Add a disposable item to the set.
     *
     * @param item - The item to add to the set.
     *
     * #### Notes
     * If the item is already contained in the set, this is a no-op.
     */
    DisposableSet.prototype.add = function (item) {
        this._items.add(item);
    };
    /**
     * Remove a disposable item from the set.
     *
     * @param item - The item to remove from the set.
     *
     * #### Notes
     * If the item is not contained in the set, this is a no-op.
     */
    DisposableSet.prototype.remove = function (item) {
        this._items.delete(item);
    };
    /**
     * Remove all items from the set.
     */
    DisposableSet.prototype.clear = function () {
        this._items.clear();
    };
    return DisposableSet;
}());
exports.DisposableSet = DisposableSet;
/**
 * The namespace for the `DisposableSet` class statics.
 */
(function (DisposableSet) {
    /**
     * Create a disposable set from an iterable of items.
     *
     * @param items - The iterable or array-like object of interest.
     *
     * @returns A new disposable initialized with the given items.
     */
    function from(items) {
        var set = new DisposableSet();
        algorithm_1.each(items, function (item) { set.add(item); });
        return set;
    }
    DisposableSet.from = from;
})(DisposableSet = exports.DisposableSet || (exports.DisposableSet = {}));
exports.DisposableSet = DisposableSet;
/**
 * An observable object which manages a collection of disposable items.
 */
var ObservableDisposableSet = /** @class */ (function (_super) {
    __extends(ObservableDisposableSet, _super);
    function ObservableDisposableSet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._disposed = new signaling_1.Signal(_this);
        return _this;
    }
    Object.defineProperty(ObservableDisposableSet.prototype, "disposed", {
        /**
         * A signal emitted when the set is disposed.
         */
        get: function () {
            return this._disposed;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose of the set and the items it contains.
     *
     * #### Notes
     * Items are disposed in the order they are added to the set.
     */
    ObservableDisposableSet.prototype.dispose = function () {
        if (this.isDisposed) {
            return;
        }
        _super.prototype.dispose.call(this);
        this._disposed.emit(undefined);
        signaling_1.Signal.clearData(this);
    };
    return ObservableDisposableSet;
}(DisposableSet));
exports.ObservableDisposableSet = ObservableDisposableSet;
/**
 * The namespace for the `ObservableDisposableSet` class statics.
 */
(function (ObservableDisposableSet) {
    /**
     * Create an observable disposable set from an iterable of items.
     *
     * @param items - The iterable or array-like object of interest.
     *
     * @returns A new disposable initialized with the given items.
     */
    function from(items) {
        var set = new ObservableDisposableSet();
        algorithm_1.each(items, function (item) { set.add(item); });
        return set;
    }
    ObservableDisposableSet.from = from;
})(ObservableDisposableSet = exports.ObservableDisposableSet || (exports.ObservableDisposableSet = {}));
exports.ObservableDisposableSet = ObservableDisposableSet;

})
		]
	]
}, {
	name: "@lumino/domutils",
	version: "1.1.7",
	root: "node_modules/@lumino/domutils",
	main: "lib/index.js",
	files: [
		[
			/* @lumino/domutils: 31 */
			"lib/selector.js", ["cjs","js"], {}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The namespace for selector related utilities.
 */
var Selector;
(function (Selector) {
    /**
     * Calculate the specificity of a single CSS selector.
     *
     * @param selector - The CSS selector of interest.
     *
     * @returns The specificity of the selector.
     *
     * #### Undefined Behavior
     * The selector is invalid.
     *
     * #### Notes
     * This is based on https://www.w3.org/TR/css3-selectors/#specificity
     *
     * A larger number represents a more specific selector.
     *
     * The smallest possible specificity is `0`.
     *
     * The result is represented as a hex number `0x<aa><bb><cc>` where
     * each component is the count of the respective selector clause.
     *
     * If the selector contains commas, only the first clause is used.
     *
     * The computed result is cached, so subsequent calculations for the
     * same selector are extremely fast.
     */
    function calculateSpecificity(selector) {
        if (selector in Private.specificityCache) {
            return Private.specificityCache[selector];
        }
        var result = Private.calculateSingle(selector);
        return Private.specificityCache[selector] = result;
    }
    Selector.calculateSpecificity = calculateSpecificity;
    /**
     * Test whether a selector is a valid CSS selector.
     *
     * @param selector - The CSS selector of interest.
     *
     * @returns `true` if the selector is valid, `false` otherwise.
     *
     * #### Notes
     * The computed result is cached, so subsequent tests for the same
     * selector are extremely fast.
     */
    function isValid(selector) {
        if (selector in Private.validityCache) {
            return Private.validityCache[selector];
        }
        var result = true;
        try {
            Private.testElem.querySelector(selector);
        }
        catch (err) {
            result = false;
        }
        return Private.validityCache[selector] = result;
    }
    Selector.isValid = isValid;
    /**
     * Test whether an element matches a CSS selector.
     *
     * @param element - The element of interest.
     *
     * @param selector - The valid CSS selector of interest.
     *
     * @returns `true` if the element is a match, `false` otherwise.
     *
     * #### Notes
     * This function uses the builtin browser capabilities when possible,
     * falling back onto a document query otherwise.
     */
    function matches(element, selector) {
        return Private.protoMatchFunc.call(element, selector);
    }
    Selector.matches = matches;
})(Selector = exports.Selector || (exports.Selector = {}));
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * A cache of computed selector specificity values.
     */
    Private.specificityCache = Object.create(null);
    /**
     * A cache of computed selector validity.
     */
    Private.validityCache = Object.create(null);
    /**
     * An empty element for testing selector validity.
     */
    Private.testElem = document.createElement('div');
    /**
     * A cross-browser CSS selector matching prototype function.
     */
    Private.protoMatchFunc = (function () {
        var proto = Element.prototype;
        return (proto.matches ||
            proto.matchesSelector ||
            proto.mozMatchesSelector ||
            proto.msMatchesSelector ||
            proto.oMatchesSelector ||
            proto.webkitMatchesSelector ||
            (function (selector) {
                var elem = this;
                var matches = elem.ownerDocument ? elem.ownerDocument.querySelectorAll(selector) : [];
                return Array.prototype.indexOf.call(matches, elem) !== -1;
            }));
    })();
    /**
     * Calculate the specificity of a single selector.
     *
     * The behavior is undefined if the selector is invalid.
     */
    function calculateSingle(selector) {
        // Ignore anything after the first comma.
        selector = selector.split(',', 1)[0];
        // Setup the aggregate counters.
        var a = 0;
        var b = 0;
        var c = 0;
        // Apply a regex to the front of the selector. If it succeeds, that
        // portion of the selector is removed. Returns a success/fail flag.
        function match(re) {
            var match = selector.match(re);
            if (match === null) {
                return false;
            }
            selector = selector.slice(match[0].length);
            return true;
        }
        // Replace the negation pseudo-class (which is ignored),
        // but keep its inner content (which is not ignored).
        selector = selector.replace(NEGATION_RE, ' $1 ');
        // Continue matching until the selector is consumed.
        while (selector.length > 0) {
            // Match an ID selector.
            if (match(ID_RE)) {
                a++;
                continue;
            }
            // Match a class selector.
            if (match(CLASS_RE)) {
                b++;
                continue;
            }
            // Match an attribute selector.
            if (match(ATTR_RE)) {
                b++;
                continue;
            }
            // Match a pseudo-element selector. This is done before matching
            // a pseudo-class since this regex overlaps with that regex.
            if (match(PSEUDO_ELEM_RE)) {
                c++;
                continue;
            }
            // Match a pseudo-class selector.
            if (match(PSEDUO_CLASS_RE)) {
                b++;
                continue;
            }
            // Match a plain type selector.
            if (match(TYPE_RE)) {
                c++;
                continue;
            }
            // Finally, match any ignored characters.
            if (match(IGNORE_RE)) {
                continue;
            }
            // At this point, the selector is assumed to be invalid.
            return 0;
        }
        // Clamp each component to a reasonable base.
        a = Math.min(a, 0xFF);
        b = Math.min(b, 0xFF);
        c = Math.min(c, 0xFF);
        // Combine the components into a single result.
        return (a << 16) | (b << 8) | c;
    }
    Private.calculateSingle = calculateSingle;
    /**
     * A regex which matches an ID selector at string start.
     */
    var ID_RE = /^#[^\s\+>~#\.\[:]+/;
    /**
     * A regex which matches a class selector at string start.
     */
    var CLASS_RE = /^\.[^\s\+>~#\.\[:]+/;
    /**
     * A regex which matches an attribute selector at string start.
     */
    var ATTR_RE = /^\[[^\]]+\]/;
    /**
     * A regex which matches a type selector at string start.
     */
    var TYPE_RE = /^[^\s\+>~#\.\[:]+/;
    /**
     * A regex which matches a pseudo-element selector at string start.
     */
    var PSEUDO_ELEM_RE = /^(::[^\s\+>~#\.\[:]+|:first-line|:first-letter|:before|:after)/;
    /**
     * A regex which matches a pseudo-class selector at string start.
     */
    var PSEDUO_CLASS_RE = /^:[^\s\+>~#\.\[:]+/;
    /**
     * A regex which matches ignored characters at string start.
     */
    var IGNORE_RE = /^[\s\+>~\*]+/;
    /**
     * A regex which matches the negation pseudo-class globally.
     */
    var NEGATION_RE = /:not\(([^\)]+)\)/g;
})(Private || (Private = {}));

})
		], [
			/* @lumino/domutils: 32 */
			"lib/platform.js", ["cjs","js"], {}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The namespace for platform related utilities.
 */
var Platform;
(function (Platform) {
    /**
     * A flag indicating whether the platform is Mac.
     */
    Platform.IS_MAC = !!navigator.platform.match(/Mac/i);
    /**
     * A flag indicating whether the platform is Windows.
     */
    Platform.IS_WIN = !!navigator.platform.match(/Win/i);
    /**
     * A flag indicating whether the browser is IE.
     */
    Platform.IS_IE = /Trident/.test(navigator.userAgent);
    /**
     * A flag indicating whether the browser is Edge.
     */
    Platform.IS_EDGE = /Edge/.test(navigator.userAgent);
    /**
     * Test whether the `accel` key is pressed.
     *
     * @param event - The keyboard or mouse event of interest.
     *
     * @returns Whether the `accel` key is pressed.
     *
     * #### Notes
     * On Mac the `accel` key is the command key. On all other
     * platforms the `accel` key is the control key.
     */
    function accelKey(event) {
        return Platform.IS_MAC ? event.metaKey : event.ctrlKey;
    }
    Platform.accelKey = accelKey;
})(Platform = exports.Platform || (exports.Platform = {}));

})
		], [
			/* @lumino/domutils: 33 */
			"lib/index.js", ["cjs","js"], {"./clipboard": 35, "./element": 34, "./platform": 32, "./selector": 31}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
__export(require("./clipboard"));
__export(require("./element"));
__export(require("./platform"));
__export(require("./selector"));

})
		], [
			/* @lumino/domutils: 34 */
			"lib/element.js", ["cjs","js"], {}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The namespace for element related utilities.
 */
var ElementExt;
(function (ElementExt) {
    /**
     * Compute the box sizing for an element.
     *
     * @param element - The element of interest.
     *
     * @returns The box sizing data for the specified element.
     */
    function boxSizing(element) {
        var style = window.getComputedStyle(element);
        var bt = parseFloat(style.borderTopWidth) || 0;
        var bl = parseFloat(style.borderLeftWidth) || 0;
        var br = parseFloat(style.borderRightWidth) || 0;
        var bb = parseFloat(style.borderBottomWidth) || 0;
        var pt = parseFloat(style.paddingTop) || 0;
        var pl = parseFloat(style.paddingLeft) || 0;
        var pr = parseFloat(style.paddingRight) || 0;
        var pb = parseFloat(style.paddingBottom) || 0;
        var hs = bl + pl + pr + br;
        var vs = bt + pt + pb + bb;
        return {
            borderTop: bt,
            borderLeft: bl,
            borderRight: br,
            borderBottom: bb,
            paddingTop: pt,
            paddingLeft: pl,
            paddingRight: pr,
            paddingBottom: pb,
            horizontalSum: hs,
            verticalSum: vs
        };
    }
    ElementExt.boxSizing = boxSizing;
    /**
     * Compute the size limits for an element.
     *
     * @param element - The element of interest.
     *
     * @returns The size limit data for the specified element.
     */
    function sizeLimits(element) {
        var style = window.getComputedStyle(element);
        var minWidth = parseFloat(style.minWidth) || 0;
        var minHeight = parseFloat(style.minHeight) || 0;
        var maxWidth = parseFloat(style.maxWidth) || Infinity;
        var maxHeight = parseFloat(style.maxHeight) || Infinity;
        maxWidth = Math.max(minWidth, maxWidth);
        maxHeight = Math.max(minHeight, maxHeight);
        return { minWidth: minWidth, minHeight: minHeight, maxWidth: maxWidth, maxHeight: maxHeight };
    }
    ElementExt.sizeLimits = sizeLimits;
    /**
     * Test whether a client position lies within an element.
     *
     * @param element - The DOM element of interest.
     *
     * @param clientX - The client X coordinate of interest.
     *
     * @param clientY - The client Y coordinate of interest.
     *
     * @returns Whether the point is within the given element.
     */
    function hitTest(element, clientX, clientY) {
        var rect = element.getBoundingClientRect();
        return (clientX >= rect.left &&
            clientX < rect.right &&
            clientY >= rect.top &&
            clientY < rect.bottom);
    }
    ElementExt.hitTest = hitTest;
    /**
     * Vertically scroll an element into view if needed.
     *
     * @param area - The scroll area element.
     *
     * @param element - The element of interest.
     *
     * #### Notes
     * This follows the "nearest" behavior of the native `scrollIntoView`
     * method, which is not supported by all browsers.
     * https://drafts.csswg.org/cssom-view/#element-scrolling-members
     *
     * If the element fully covers the visible area or is fully contained
     * within the visible area, no scrolling will take place. Otherwise,
     * the nearest edges of the area and element are aligned.
     */
    function scrollIntoViewIfNeeded(area, element) {
        var ar = area.getBoundingClientRect();
        var er = element.getBoundingClientRect();
        if (er.top <= ar.top && er.bottom >= ar.bottom) {
            return;
        }
        if (er.top < ar.top && er.height <= ar.height) {
            area.scrollTop -= ar.top - er.top;
            return;
        }
        if (er.bottom > ar.bottom && er.height >= ar.height) {
            area.scrollTop -= ar.top - er.top;
            return;
        }
        if (er.top < ar.top && er.height > ar.height) {
            area.scrollTop -= ar.bottom - er.bottom;
            return;
        }
        if (er.bottom > ar.bottom && er.height < ar.height) {
            area.scrollTop -= ar.bottom - er.bottom;
            return;
        }
    }
    ElementExt.scrollIntoViewIfNeeded = scrollIntoViewIfNeeded;
})(ElementExt = exports.ElementExt || (exports.ElementExt = {}));

})
		], [
			/* @lumino/domutils: 35 */
			"lib/clipboard.js", ["cjs","js"], {}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2019, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The namespace for clipboard related functionality.
 */
var ClipboardExt;
(function (ClipboardExt) {
    /**
     * Copy text to the system clipboard.
     *
     * @param text - The text to copy to the clipboard.
     */
    function copyText(text) {
        // Fetch the document body.
        var body = document.body;
        // Set up the clipboard event listener.
        var handler = function (event) {
            // Stop the event propagation.
            event.preventDefault();
            event.stopPropagation();
            // Set the clipboard data.
            event.clipboardData.setData('text', text);
            // Remove the event listener.
            body.removeEventListener('copy', handler, true);
        };
        // Add the event listener.
        body.addEventListener('copy', handler, true);
        // Trigger the event.
        document.execCommand('copy');
    }
    ClipboardExt.copyText = copyText;
})(ClipboardExt = exports.ClipboardExt || (exports.ClipboardExt = {}));

})
		]
	]
}, {
	name: "@lumino/dragdrop",
	version: "1.5.3",
	root: "node_modules/@lumino/dragdrop",
	main: "lib/index.js",
	files: [
		[
			/* @lumino/dragdrop: 36 */
			"lib/index.js", ["cjs","js"], {"@lumino/disposable": 30}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var disposable_1 = require("@lumino/disposable");
/**
 * An object which manages a drag-drop operation.
 *
 * A drag object dispatches four different events to drop targets:
 *
 * - `'lm-dragenter'` - Dispatched when the mouse enters the target
 *   element. This event must be canceled in order to receive any
 *   of the other events.
 *
 * - `'lm-dragover'` - Dispatched when the mouse moves over the drop
 *   target. It must cancel the event and set the `dropAction` to one
 *   of the supported actions in order to receive drop events.
 *
 * - `'lm-dragleave'` - Dispatched when the mouse leaves the target
 *   element. This includes moving the mouse into child elements.
 *
 * - `'lm-drop'`- Dispatched when the mouse is released over the target
 *   element when the target indicates an appropriate drop action. If
 *   the event is canceled, the indicated drop action is returned to
 *   the initiator through the resolved promise.
 *
 * A drag operation can be terminated at any time by pressing `Escape`
 * or by disposing the drag object.
 *
 * A drag object has the ability to automatically scroll a scrollable
 * element when the mouse is hovered near one of its edges. To enable
 * this, add the `data-lm-dragscroll` attribute to any element which
 * the drag object should consider for scrolling.
 *
 * #### Notes
 * This class is designed to be used when dragging and dropping custom
 * data *within* a single application. It is *not* a replacement for
 * the native drag-drop API. Instead, it provides an API which allows
 * drag operations to be initiated programmatically and enables the
 * transfer of arbitrary non-string objects; features which are not
 * possible with the native drag-drop API.
 */
var Drag = /** @class */ (function () {
    /**
     * Construct a new drag object.
     *
     * @param options - The options for initializing the drag.
     */
    function Drag(options) {
        var _this = this;
        /**
         * The scroll loop handler function.
         */
        this._onScrollFrame = function () {
            // Bail early if there is no scroll target.
            if (!_this._scrollTarget) {
                return;
            }
            // Unpack the scroll target.
            var _a = _this._scrollTarget, element = _a.element, edge = _a.edge, distance = _a.distance;
            // Calculate the scroll delta using nonlinear acceleration.
            var d = Private.SCROLL_EDGE_SIZE - distance;
            var f = Math.pow(d / Private.SCROLL_EDGE_SIZE, 2);
            var s = Math.max(1, Math.round(f * Private.SCROLL_EDGE_SIZE));
            // Scroll the element in the specified direction.
            switch (edge) {
                case 'top':
                    element.scrollTop -= s;
                    break;
                case 'left':
                    element.scrollLeft -= s;
                    break;
                case 'right':
                    element.scrollLeft += s;
                    break;
                case 'bottom':
                    element.scrollTop += s;
                    break;
            }
            // Request the next cycle of the scroll loop.
            requestAnimationFrame(_this._onScrollFrame);
        };
        this._disposed = false;
        this._dropAction = 'none';
        this._override = null;
        this._currentTarget = null;
        this._currentElement = null;
        this._promise = null;
        this._scrollTarget = null;
        this._resolve = null;
        this.mimeData = options.mimeData;
        this.dragImage = options.dragImage || null;
        this.proposedAction = options.proposedAction || 'copy';
        this.supportedActions = options.supportedActions || 'all';
        this.source = options.source || null;
    }
    /**
     * Dispose of the resources held by the drag object.
     *
     * #### Notes
     * This will cancel the drag operation if it is active.
     */
    Drag.prototype.dispose = function () {
        // Do nothing if the drag object is already disposed.
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        // If there is a current target, dispatch a drag leave event.
        if (this._currentTarget) {
            var event_1 = Private.createMouseEvent('mouseup', -1, -1);
            Private.dispatchDragLeave(this, this._currentTarget, null, event_1);
        }
        // Finalize the drag object with `'none'`.
        this._finalize('none');
    };
    Object.defineProperty(Drag.prototype, "isDisposed", {
        /**
         * Test whether the drag object is disposed.
         */
        get: function () {
            return this._disposed;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Start the drag operation at the specified client position.
     *
     * @param clientX - The client X position for the drag start.
     *
     * @param clientY - The client Y position for the drag start.
     *
     * @returns A promise which resolves to the result of the drag.
     *
     * #### Notes
     * If the drag has already been started, the promise created by the
     * first call to `start` is returned.
     *
     * If the drag operation has ended, or if the drag object has been
     * disposed, the returned promise will resolve to `'none'`.
     *
     * The drag object will be automatically disposed when drag operation
     * completes. This means `Drag` objects are for single-use only.
     *
     * This method assumes the left mouse button is already held down.
     */
    Drag.prototype.start = function (clientX, clientY) {
        var _this = this;
        // If the drag object is already disposed, resolve to `None`.
        if (this._disposed) {
            return Promise.resolve('none');
        }
        // If the drag has already been started, return the promise.
        if (this._promise) {
            return this._promise;
        }
        // Install the document listeners for the drag object.
        this._addListeners();
        // Attach the drag image at the specified client position.
        this._attachDragImage(clientX, clientY);
        // Create the promise which will be resolved on completion.
        this._promise = new Promise(function (resolve, reject) {
            _this._resolve = resolve;
        });
        // Trigger a fake move event to kick off the drag operation.
        var event = Private.createMouseEvent('mousemove', clientX, clientY);
        document.dispatchEvent(event);
        // Return the pending promise for the drag operation.
        return this._promise;
    };
    /**
     * Handle the DOM events for the drag operation.
     *
     * @param event - The DOM event sent to the drag object.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the document. It should not be
     * called directly by user code.
     */
    Drag.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'mousemove':
                this._evtMouseMove(event);
                break;
            case 'mouseup':
                this._evtMouseUp(event);
                break;
            case 'keydown':
                this._evtKeyDown(event);
                break;
            default:
                // Stop all other events during drag-drop.
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    };
    /**
     * Handle the `'mousemove'` event for the drag object.
     */
    Drag.prototype._evtMouseMove = function (event) {
        // Stop all input events during drag-drop.
        event.preventDefault();
        event.stopPropagation();
        // Update the current target node and dispatch enter/leave events.
        this._updateCurrentTarget(event);
        // Update the drag scroll element.
        this._updateDragScroll(event);
        // Move the drag image to the specified client position. This is
        // performed *after* dispatching to prevent unnecessary reflows.
        this._moveDragImage(event.clientX, event.clientY);
    };
    /**
     * Handle the `'mouseup'` event for the drag object.
     */
    Drag.prototype._evtMouseUp = function (event) {
        // Stop all input events during drag-drop.
        event.preventDefault();
        event.stopPropagation();
        // Do nothing if the left button is not released.
        if (event.button !== 0) {
            return;
        }
        // Update the current target node and dispatch enter/leave events.
        // This prevents a subtle issue where the DOM mutates under the
        // cursor after the last move event but before the drop event.
        this._updateCurrentTarget(event);
        // If there is no current target, finalize with `'none'`.
        if (!this._currentTarget) {
            this._finalize('none');
            return;
        }
        // If the last drop action was `'none'`, dispatch a leave event
        // to the current target and finalize the drag with `'none'`.
        if (this._dropAction === 'none') {
            Private.dispatchDragLeave(this, this._currentTarget, null, event);
            this._finalize('none');
            return;
        }
        // Dispatch the drop event at the current target and finalize
        // with the resulting drop action.
        var action = Private.dispatchDrop(this, this._currentTarget, event);
        this._finalize(action);
    };
    /**
     * Handle the `'keydown'` event for the drag object.
     */
    Drag.prototype._evtKeyDown = function (event) {
        // Stop all input events during drag-drop.
        event.preventDefault();
        event.stopPropagation();
        // Cancel the drag if `Escape` is pressed.
        if (event.keyCode === 27) {
            this.dispose();
        }
    };
    /**
     * Add the document event listeners for the drag object.
     */
    Drag.prototype._addListeners = function () {
        document.addEventListener('mousedown', this, true);
        document.addEventListener('mousemove', this, true);
        document.addEventListener('mouseup', this, true);
        document.addEventListener('mouseenter', this, true);
        document.addEventListener('mouseleave', this, true);
        document.addEventListener('mouseover', this, true);
        document.addEventListener('mouseout', this, true);
        document.addEventListener('keydown', this, true);
        document.addEventListener('keyup', this, true);
        document.addEventListener('keypress', this, true);
        document.addEventListener('contextmenu', this, true);
    };
    /**
     * Remove the document event listeners for the drag object.
     */
    Drag.prototype._removeListeners = function () {
        document.removeEventListener('mousedown', this, true);
        document.removeEventListener('mousemove', this, true);
        document.removeEventListener('mouseup', this, true);
        document.removeEventListener('mouseenter', this, true);
        document.removeEventListener('mouseleave', this, true);
        document.removeEventListener('mouseover', this, true);
        document.removeEventListener('mouseout', this, true);
        document.removeEventListener('keydown', this, true);
        document.removeEventListener('keyup', this, true);
        document.removeEventListener('keypress', this, true);
        document.removeEventListener('contextmenu', this, true);
    };
    /**
     * Update the drag scroll element under the mouse.
     */
    Drag.prototype._updateDragScroll = function (event) {
        // Find the scroll target under the mouse.
        var target = Private.findScrollTarget(event);
        // Bail if there is nothing to scroll.
        if (!this._scrollTarget && !target) {
            return;
        }
        // Start the scroll loop if needed.
        if (!this._scrollTarget) {
            setTimeout(this._onScrollFrame, 500);
        }
        // Update the scroll target.
        this._scrollTarget = target;
    };
    /**
     * Update the current target node using the given mouse event.
     */
    Drag.prototype._updateCurrentTarget = function (event) {
        // Fetch common local state.
        var prevTarget = this._currentTarget;
        var currTarget = this._currentTarget;
        var prevElem = this._currentElement;
        // Find the current indicated element at the given position.
        var currElem = document.elementFromPoint(event.clientX, event.clientY);
        // Update the current element reference.
        this._currentElement = currElem;
        // If the indicated element changes from the previous iteration,
        // and is different from the current target, dispatch the exit
        // event to the target.
        if (currElem !== prevElem && currElem !== currTarget) {
            Private.dispatchDragExit(this, currTarget, currElem, event);
        }
        // If the indicated element changes from the previous iteration,
        // and is different from the current target, dispatch the enter
        // event and compute the new target element.
        if (currElem !== prevElem && currElem !== currTarget) {
            currTarget = Private.dispatchDragEnter(this, currElem, currTarget, event);
        }
        // If the current target element has changed, update the current
        // target reference and dispatch the leave event to the old target.
        if (currTarget !== prevTarget) {
            this._currentTarget = currTarget;
            Private.dispatchDragLeave(this, prevTarget, currTarget, event);
        }
        // Dispatch the drag over event and update the drop action.
        var action = Private.dispatchDragOver(this, currTarget, event);
        this._setDropAction(action);
    };
    /**
     * Attach the drag image element at the specified location.
     *
     * This is a no-op if there is no drag image element.
     */
    Drag.prototype._attachDragImage = function (clientX, clientY) {
        if (!this.dragImage) {
            return;
        }
        this.dragImage.classList.add('lm-mod-drag-image');
        /* <DEPRECATED> */
        this.dragImage.classList.add('p-mod-drag-image');
        /* </DEPRECATED> */
        var style = this.dragImage.style;
        style.pointerEvents = 'none';
        style.position = 'fixed';
        style.top = clientY + "px";
        style.left = clientX + "px";
        document.body.appendChild(this.dragImage);
    };
    /**
     * Move the drag image element to the specified location.
     *
     * This is a no-op if there is no drag image element.
     */
    Drag.prototype._moveDragImage = function (clientX, clientY) {
        if (!this.dragImage) {
            return;
        }
        var style = this.dragImage.style;
        style.top = clientY + "px";
        style.left = clientX + "px";
    };
    /**
     * Detach the drag image element from the DOM.
     *
     * This is a no-op if there is no drag image element.
     */
    Drag.prototype._detachDragImage = function () {
        if (!this.dragImage) {
            return;
        }
        var parent = this.dragImage.parentNode;
        if (!parent) {
            return;
        }
        parent.removeChild(this.dragImage);
    };
    /**
     * Set the internal drop action state and update the drag cursor.
     */
    Drag.prototype._setDropAction = function (action) {
        action = Private.validateAction(action, this.supportedActions);
        if (this._override && this._dropAction === action) {
            return;
        }
        switch (action) {
            case 'none':
                this._dropAction = action;
                this._override = Drag.overrideCursor('no-drop');
                break;
            case 'copy':
                this._dropAction = action;
                this._override = Drag.overrideCursor('copy');
                break;
            case 'link':
                this._dropAction = action;
                this._override = Drag.overrideCursor('alias');
                break;
            case 'move':
                this._dropAction = action;
                this._override = Drag.overrideCursor('move');
                break;
        }
    };
    /**
     * Finalize the drag operation and resolve the drag promise.
     */
    Drag.prototype._finalize = function (action) {
        // Store the resolve function as a temp variable.
        var resolve = this._resolve;
        // Remove the document event listeners.
        this._removeListeners();
        // Detach the drag image.
        this._detachDragImage();
        // Dispose of the cursor override.
        if (this._override) {
            this._override.dispose();
            this._override = null;
        }
        // Clear the mime data.
        this.mimeData.clear();
        // Clear the rest of the internal drag state.
        this._disposed = true;
        this._dropAction = 'none';
        this._currentTarget = null;
        this._currentElement = null;
        this._scrollTarget = null;
        this._promise = null;
        this._resolve = null;
        // Finally, resolve the promise to the given drop action.
        if (resolve) {
            resolve(action);
        }
    };
    return Drag;
}());
exports.Drag = Drag;
/**
 * The namespace for the `Drag` class statics.
 */
(function (Drag) {
    /**
     * Override the cursor icon for the entire document.
     *
     * @param cursor - The string representing the cursor style.
     *
     * @returns A disposable which will clear the override when disposed.
     *
     * #### Notes
     * The most recent call to `overrideCursor` takes precedence.
     * Disposing an old override has no effect on the current override.
     *
     * This utility function is used by the `Drag` class to override the
     * mouse cursor during a drag-drop operation, but it can also be used
     * by other classes to fix the cursor icon during normal mouse drags.
     *
     * #### Example
     * ```typescript
     * import { Drag } from '@lumino/dragdrop';
     *
     * // Force the cursor to be 'wait' for the entire document.
     * let override = Drag.overrideCursor('wait');
     *
     * // Clear the override by disposing the return value.
     * override.dispose();
     * ```
     */
    function overrideCursor(cursor) {
        var id = ++overrideCursorID;
        document.body.style.cursor = cursor;
        document.body.classList.add('lm-mod-override-cursor');
        /* <DEPRECATED> */
        document.body.classList.add('p-mod-override-cursor');
        /* </DEPRECATED> */
        return new disposable_1.DisposableDelegate(function () {
            if (id === overrideCursorID) {
                document.body.style.cursor = '';
                document.body.classList.remove('lm-mod-override-cursor');
                /* <DEPRECATED> */
                document.body.classList.remove('p-mod-override-cursor');
                /* </DEPRECATED> */
            }
        });
    }
    Drag.overrideCursor = overrideCursor;
    /**
     * The internal id for the active cursor override.
     */
    var overrideCursorID = 0;
})(Drag = exports.Drag || (exports.Drag = {}));
exports.Drag = Drag;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * The size of a drag scroll edge, in pixels.
     */
    Private.SCROLL_EDGE_SIZE = 20;
    /**
     * Validate the given action is one of the supported actions.
     *
     * Returns the given action or `'none'` if the action is unsupported.
     */
    function validateAction(action, supported) {
        return (actionTable[action] & supportedTable[supported]) ? action : 'none';
    }
    Private.validateAction = validateAction;
    /**
     * Create a left mouse event at the given position.
     *
     * @param type - The event type for the mouse event.
     *
     * @param clientX - The client X position.
     *
     * @param clientY - The client Y position.
     *
     * @returns A newly created and initialized mouse event.
     */
    function createMouseEvent(type, clientX, clientY) {
        var event = document.createEvent('MouseEvent');
        event.initMouseEvent(type, true, true, window, 0, 0, 0, clientX, clientY, false, false, false, false, 0, null);
        return event;
    }
    Private.createMouseEvent = createMouseEvent;
    /**
     * Find the drag scroll target under the mouse, if any.
     */
    function findScrollTarget(event) {
        // Look up the client mouse position.
        var x = event.clientX;
        var y = event.clientY;
        // Get the element under the mouse.
        var element = document.elementFromPoint(x, y);
        // Search for a scrollable target based on the mouse position.
        // The null assert in third clause of for-loop is required due to:
        // https://github.com/Microsoft/TypeScript/issues/14143
        for (; element; element = element.parentElement) {
            // Ignore elements which are not marked as scrollable.
            var scrollable = element.hasAttribute('data-lm-dragscroll');
            /* <DEPRECATED> */
            scrollable = scrollable || element.hasAttribute('data-p-dragscroll');
            /* </DEPRECATED> */
            if (!scrollable) {
                continue;
            }
            // Set up the coordinate offsets for the element.
            var offsetX = 0;
            var offsetY = 0;
            if (element === document.body) {
                offsetX = window.pageXOffset;
                offsetY = window.pageYOffset;
            }
            // Get the element bounds in viewport coordinates.
            var r = element.getBoundingClientRect();
            var top_1 = r.top + offsetY;
            var left = r.left + offsetX;
            var right = left + r.width;
            var bottom = top_1 + r.height;
            // Skip the element if it's not under the mouse.
            if (x < left || x >= right || y < top_1 || y >= bottom) {
                continue;
            }
            // Compute the distance to each edge.
            var dl = x - left + 1;
            var dt = y - top_1 + 1;
            var dr = right - x;
            var db = bottom - y;
            // Find the smallest of the edge distances.
            var distance = Math.min(dl, dt, dr, db);
            // Skip the element if the mouse is not within a scroll edge.
            if (distance > Private.SCROLL_EDGE_SIZE) {
                continue;
            }
            // Set up the edge result variable.
            var edge = void 0;
            // Find the edge for the computed distance.
            switch (distance) {
                case db:
                    edge = 'bottom';
                    break;
                case dt:
                    edge = 'top';
                    break;
                case dr:
                    edge = 'right';
                    break;
                case dl:
                    edge = 'left';
                    break;
                default:
                    throw 'unreachable';
            }
            // Compute how much the element can scroll in width and height.
            var dsw = element.scrollWidth - element.clientWidth;
            var dsh = element.scrollHeight - element.clientHeight;
            // Determine if the element should be scrolled for the edge.
            var shouldScroll = void 0;
            switch (edge) {
                case 'top':
                    shouldScroll = dsh > 0 && element.scrollTop > 0;
                    break;
                case 'left':
                    shouldScroll = dsw > 0 && element.scrollLeft > 0;
                    break;
                case 'right':
                    shouldScroll = dsw > 0 && element.scrollLeft < dsw;
                    break;
                case 'bottom':
                    shouldScroll = dsh > 0 && element.scrollTop < dsh;
                    break;
                default:
                    throw 'unreachable';
            }
            // Skip the element if it should not be scrolled.
            if (!shouldScroll) {
                continue;
            }
            // Return the drag scroll target.
            return { element: element, edge: edge, distance: distance };
        }
        // No drag scroll target was found.
        return null;
    }
    Private.findScrollTarget = findScrollTarget;
    /**
     * Dispatch a drag enter event to the indicated element.
     *
     * @param drag - The drag object associated with the action.
     *
     * @param currElem - The currently indicated element, or `null`. This
     *   is the "immediate user selection" from the whatwg spec.
     *
     * @param currTarget - The current drag target element, or `null`. This
     *   is the "current target element" from the whatwg spec.
     *
     * @param event - The mouse event related to the action.
     *
     * @returns The element to use as the current drag target. This is the
     *   "current target element" from the whatwg spec, and may be `null`.
     *
     * #### Notes
     * This largely implements the drag enter portion of the whatwg spec:
     * https://html.spec.whatwg.org/multipage/interaction.html#drag-and-drop-processing-model
     */
    function dispatchDragEnter(drag, currElem, currTarget, event) {
        // If the current element is null, return null as the new target.
        if (!currElem) {
            return null;
        }
        // Dispatch a drag enter event to the current element.
        var dragEvent = createDragEvent('lm-dragenter', drag, event, currTarget);
        var canceled = !currElem.dispatchEvent(dragEvent);
        // If the event was canceled, use the current element as the new target.
        if (canceled) {
            return currElem;
        }
        /* <DEPRECATED> */
        dragEvent = createDragEvent('p-dragenter', drag, event, currTarget);
        canceled = !currElem.dispatchEvent(dragEvent);
        if (canceled) {
            return currElem;
        }
        /* </DEPRECATED> */
        // If the current element is the document body, keep the original target.
        if (currElem === document.body) {
            return currTarget;
        }
        // Dispatch a drag enter event on the document body.
        dragEvent = createDragEvent('lm-dragenter', drag, event, currTarget);
        document.body.dispatchEvent(dragEvent);
        /* <DEPRECATED> */
        dragEvent = createDragEvent('p-dragenter', drag, event, currTarget);
        document.body.dispatchEvent(dragEvent);
        /* </DEPRECATED> */
        // Ignore the event cancellation, and use the body as the new target.
        return document.body;
    }
    Private.dispatchDragEnter = dispatchDragEnter;
    /**
     * Dispatch a drag exit event to the indicated element.
     *
     * @param drag - The drag object associated with the action.
     *
     * @param prevTarget - The previous target element, or `null`. This
     *   is the previous "current target element" from the whatwg spec.
     *
     * @param currTarget - The current drag target element, or `null`. This
     *   is the "current target element" from the whatwg spec.
     *
     * @param event - The mouse event related to the action.
     *
     * #### Notes
     * This largely implements the drag exit portion of the whatwg spec:
     * https://html.spec.whatwg.org/multipage/interaction.html#drag-and-drop-processing-model
     */
    function dispatchDragExit(drag, prevTarget, currTarget, event) {
        // If the previous target is null, do nothing.
        if (!prevTarget) {
            return;
        }
        // Dispatch the drag exit event to the previous target.
        var dragEvent = createDragEvent('lm-dragexit', drag, event, currTarget);
        prevTarget.dispatchEvent(dragEvent);
        /* <DEPRECATED> */
        dragEvent = createDragEvent('p-dragexit', drag, event, currTarget);
        prevTarget.dispatchEvent(dragEvent);
        /* </DEPRECATED> */
    }
    Private.dispatchDragExit = dispatchDragExit;
    /**
     * Dispatch a drag leave event to the indicated element.
     *
     * @param drag - The drag object associated with the action.
     *
     * @param prevTarget - The previous target element, or `null`. This
     *   is the previous "current target element" from the whatwg spec.
     *
     * @param currTarget - The current drag target element, or `null`. This
     *   is the "current target element" from the whatwg spec.
     *
     * @param event - The mouse event related to the action.
     *
     * #### Notes
     * This largely implements the drag leave portion of the whatwg spec:
     * https://html.spec.whatwg.org/multipage/interaction.html#drag-and-drop-processing-model
     */
    function dispatchDragLeave(drag, prevTarget, currTarget, event) {
        // If the previous target is null, do nothing.
        if (!prevTarget) {
            return;
        }
        // Dispatch the drag leave event to the previous target.
        var dragEvent = createDragEvent('lm-dragleave', drag, event, currTarget);
        prevTarget.dispatchEvent(dragEvent);
        /* <DEPRECATED> */
        dragEvent = createDragEvent('p-dragleave', drag, event, currTarget);
        prevTarget.dispatchEvent(dragEvent);
        /* </DEPRECATED> */
    }
    Private.dispatchDragLeave = dispatchDragLeave;
    /**
     * Dispatch a drag over event to the indicated element.
     *
     * @param drag - The drag object associated with the action.
     *
     * @param currTarget - The current drag target element, or `null`. This
     *   is the "current target element" from the whatwg spec.
     *
     * @param event - The mouse event related to the action.
     *
     * @returns The `DropAction` result of the drag over event.
     *
     * #### Notes
     * This largely implements the drag over portion of the whatwg spec:
     * https://html.spec.whatwg.org/multipage/interaction.html#drag-and-drop-processing-model
     */
    function dispatchDragOver(drag, currTarget, event) {
        // If there is no current target, the drop action is none.
        if (!currTarget) {
            return 'none';
        }
        // Dispatch the drag over event to the current target.
        var dragEvent = createDragEvent('lm-dragover', drag, event, null);
        var canceled = !currTarget.dispatchEvent(dragEvent);
        // If the event was canceled, return the drop action result.
        if (canceled) {
            return dragEvent.dropAction;
        }
        /* <DEPRECATED> */
        dragEvent = createDragEvent('p-dragover', drag, event, null);
        canceled = !currTarget.dispatchEvent(dragEvent);
        if (canceled) {
            return dragEvent.dropAction;
        }
        /* </DEPRECATED> */
        // Otherwise, the effective drop action is none.
        return 'none';
    }
    Private.dispatchDragOver = dispatchDragOver;
    /**
     * Dispatch a drop event to the indicated element.
     *
     * @param drag - The drag object associated with the action.
     *
     * @param currTarget - The current drag target element, or `null`. This
     *   is the "current target element" from the whatwg spec.
     *
     * @param event - The mouse event related to the action.
     *
     * @returns The `DropAction` result of the drop event.
     *
     * #### Notes
     * This largely implements the drag over portion of the whatwg spec:
     * https://html.spec.whatwg.org/multipage/interaction.html#drag-and-drop-processing-model
     */
    function dispatchDrop(drag, currTarget, event) {
        // If there is no current target, the drop action is none.
        if (!currTarget) {
            return 'none';
        }
        // Dispatch the drop event to the current target.
        var dragEvent = createDragEvent('lm-drop', drag, event, null);
        var canceled = !currTarget.dispatchEvent(dragEvent);
        // If the event was canceled, return the drop action result.
        if (canceled) {
            return dragEvent.dropAction;
        }
        /* <DEPRECATED> */
        dragEvent = createDragEvent('p-drop', drag, event, null);
        canceled = !currTarget.dispatchEvent(dragEvent);
        if (canceled) {
            return dragEvent.dropAction;
        }
        /* </DEPRECATED> */
        // Otherwise, the effective drop action is none.
        return 'none';
    }
    Private.dispatchDrop = dispatchDrop;
    /**
     * A lookup table from drop action to bit value.
     */
    var actionTable = {
        'none': 0x0,
        'copy': 0x1,
        'link': 0x2,
        'move': 0x4
    };
    /**
     * A lookup table from supported action to drop action bit mask.
     */
    var supportedTable = {
        'none': actionTable['none'],
        'copy': actionTable['copy'],
        'link': actionTable['link'],
        'move': actionTable['move'],
        'copy-link': actionTable['copy'] | actionTable['link'],
        'copy-move': actionTable['copy'] | actionTable['move'],
        'link-move': actionTable['link'] | actionTable['move'],
        'all': actionTable['copy'] | actionTable['link'] | actionTable['move']
    };
    /**
     * Create a new initialized `IDragEvent` from the given data.
     *
     * @param type - The event type for the drag event.
     *
     * @param drag - The drag object to use for seeding the drag data.
     *
     * @param event - The mouse event to use for seeding the mouse data.
     *
     * @param related - The related target for the event, or `null`.
     *
     * @returns A new object which implements `IDragEvent`.
     */
    function createDragEvent(type, drag, event, related) {
        // Create a new mouse event to use as the drag event. Currently,
        // JS engines do now allow user-defined Event subclasses.
        var dragEvent = document.createEvent('MouseEvent');
        // Initialize the mouse event data.
        dragEvent.initMouseEvent(type, true, true, window, 0, event.screenX, event.screenY, event.clientX, event.clientY, event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, event.button, related);
        // Forcefully add the custom drag event properties.
        dragEvent.dropAction = 'none';
        dragEvent.mimeData = drag.mimeData;
        dragEvent.proposedAction = drag.proposedAction;
        dragEvent.supportedActions = drag.supportedActions;
        dragEvent.source = drag.source;
        // Return the fully initialized drag event.
        return dragEvent;
    }
})(Private || (Private = {}));

})
		]
	]
}, {
	name: "@lumino/keyboard",
	version: "1.1.6",
	root: "node_modules/@lumino/keyboard",
	main: "lib/index.js",
	files: [
		[
			/* @lumino/keyboard: 37 */
			"lib/index.js", ["cjs","js"], {}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get the global application keyboard layout instance.
 *
 * @returns The keyboard layout for use by the application.
 *
 * #### Notes
 * The default keyboard layout is US-English.
 */
function getKeyboardLayout() {
    return Private.keyboardLayout;
}
exports.getKeyboardLayout = getKeyboardLayout;
/**
 * Set the global application keyboard layout instance.
 *
 * @param - The keyboard layout for use by the application.
 *
 * #### Notes
 * The keyboard layout should typically be set on application startup
 * to a layout which is appropriate for the user's system.
 */
function setKeyboardLayout(layout) {
    Private.keyboardLayout = layout;
}
exports.setKeyboardLayout = setKeyboardLayout;
/**
 * A concrete implementation of [[IKeyboardLayout]] based on keycodes.
 *
 * The `keyCode` property of a `'keydown'` event is a browser and OS
 * specific representation of the physical key (not character) which
 * was pressed on a keyboard. While not the most convenient API, it
 * is currently the only one which works reliably on all browsers.
 *
 * This class accepts a user-defined mapping of keycode to key, which
 * allows for reliable shortcuts tailored to the user's system.
 */
var KeycodeLayout = /** @class */ (function () {
    /**
     * Construct a new keycode layout.
     *
     * @param name - The human readable name for the layout.
     *
     * @param codes - A mapping of keycode to key value.
     */
    function KeycodeLayout(name, codes) {
        this.name = name;
        this._codes = codes;
        this._keys = KeycodeLayout.extractKeys(codes);
    }
    /**
     * Get an array of the key values supported by the layout.
     *
     * @returns A new array of the supported key values.
     */
    KeycodeLayout.prototype.keys = function () {
        return Object.keys(this._keys);
    };
    /**
     * Test whether the given key is a valid value for the layout.
     *
     * @param key - The user provided key to test for validity.
     *
     * @returns `true` if the key is valid, `false` otherwise.
     */
    KeycodeLayout.prototype.isValidKey = function (key) {
        return key in this._keys;
    };
    /**
     * Get the key for a `'keydown'` event.
     *
     * @param event - The event object for a `'keydown'` event.
     *
     * @returns The associated key value, or an empty string if
     *   the event does not represent a valid primary key.
     */
    KeycodeLayout.prototype.keyForKeydownEvent = function (event) {
        return this._codes[event.keyCode] || '';
    };
    return KeycodeLayout;
}());
exports.KeycodeLayout = KeycodeLayout;
/**
 * The namespace for the `KeycodeLayout` class statics.
 */
(function (KeycodeLayout) {
    /**
     * Extract the set of keys from a code map.
     *
     * @param code - The code map of interest.
     *
     * @returns A set of the keys in the code map.
     */
    function extractKeys(codes) {
        var keys = Object.create(null);
        for (var c in codes) {
            keys[codes[c]] = true;
        }
        return keys;
    }
    KeycodeLayout.extractKeys = extractKeys;
})(KeycodeLayout = exports.KeycodeLayout || (exports.KeycodeLayout = {}));
exports.KeycodeLayout = KeycodeLayout;
/**
 * A keycode-based keyboard layout for US English keyboards.
 *
 * This layout is valid for the following OS/Browser combinations.
 *
 * - Windows
 *   - Chrome
 *   - Firefox
 *   - IE
 *
 * - OSX
 *   - Chrome
 *   - Firefox
 *   - Safari
 *
 * - Linux
 *   - Chrome
 *   - Firefox
 *
 * Other combinations may also work, but are untested.
 */
exports.EN_US = new KeycodeLayout('en-us', {
    8: 'Backspace',
    9: 'Tab',
    13: 'Enter',
    19: 'Pause',
    27: 'Escape',
    32: 'Space',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    45: 'Insert',
    46: 'Delete',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    59: ';',
    61: '=',
    65: 'A',
    66: 'B',
    67: 'C',
    68: 'D',
    69: 'E',
    70: 'F',
    71: 'G',
    72: 'H',
    73: 'I',
    74: 'J',
    75: 'K',
    76: 'L',
    77: 'M',
    78: 'N',
    79: 'O',
    80: 'P',
    81: 'Q',
    82: 'R',
    83: 'S',
    84: 'T',
    85: 'U',
    86: 'V',
    87: 'W',
    88: 'X',
    89: 'Y',
    90: 'Z',
    93: 'ContextMenu',
    96: '0',
    97: '1',
    98: '2',
    99: '3',
    100: '4',
    101: '5',
    102: '6',
    103: '7',
    104: '8',
    105: '9',
    106: '*',
    107: '+',
    109: '-',
    110: '.',
    111: '/',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    173: '-',
    186: ';',
    187: '=',
    188: ',',
    189: '-',
    190: '.',
    191: '/',
    192: '`',
    219: '[',
    220: '\\',
    221: ']',
    222: '\''
});
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * The global keyboard layout instance.
     */
    Private.keyboardLayout = exports.EN_US;
})(Private || (Private = {}));

})
		]
	]
}, {
	name: "@lumino/messaging",
	version: "1.3.3",
	root: "node_modules/@lumino/messaging",
	main: "lib/index.js",
	files: [
		[
			/* @lumino/messaging: 38 */
			"lib/index.js", ["cjs","js"], {"@lumino/algorithm": 11, "@lumino/collections": 19}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
var collections_1 = require("@lumino/collections");
/**
 * A message which can be delivered to a message handler.
 *
 * #### Notes
 * This class may be subclassed to create complex message types.
 */
var Message = /** @class */ (function () {
    /**
     * Construct a new message.
     *
     * @param type - The type of the message.
     */
    function Message(type) {
        this.type = type;
    }
    Object.defineProperty(Message.prototype, "isConflatable", {
        /**
         * Test whether the message is conflatable.
         *
         * #### Notes
         * Message conflation is an advanced topic. Most message types will
         * not make use of this feature.
         *
         * If a conflatable message is posted to a handler while another
         * conflatable message of the same `type` has already been posted
         * to the handler, the `conflate()` method of the existing message
         * will be invoked. If that method returns `true`, the new message
         * will not be enqueued. This allows messages to be compressed, so
         * that only a single instance of the message type is processed per
         * cycle, no matter how many times messages of that type are posted.
         *
         * Custom message types may reimplement this property.
         *
         * The default implementation is always `false`.
         */
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Conflate this message with another message of the same `type`.
     *
     * @param other - A conflatable message of the same `type`.
     *
     * @returns `true` if the message was successfully conflated, or
     *   `false` otherwise.
     *
     * #### Notes
     * Message conflation is an advanced topic. Most message types will
     * not make use of this feature.
     *
     * This method is called automatically by the message loop when the
     * given message is posted to the handler paired with this message.
     * This message will already be enqueued and conflatable, and the
     * given message will have the same `type` and also be conflatable.
     *
     * This method should merge the state of the other message into this
     * message as needed so that when this message is finally delivered
     * to the handler, it receives the most up-to-date information.
     *
     * If this method returns `true`, it signals that the other message
     * was successfully conflated and that message will not be enqueued.
     *
     * If this method returns `false`, the other message will be enqueued
     * for normal delivery.
     *
     * Custom message types may reimplement this method.
     *
     * The default implementation always returns `false`.
     */
    Message.prototype.conflate = function (other) {
        return false;
    };
    return Message;
}());
exports.Message = Message;
/**
 * A convenience message class which conflates automatically.
 *
 * #### Notes
 * Message conflation is an advanced topic. Most user code will not
 * make use of this class.
 *
 * This message class is useful for creating message instances which
 * should be conflated, but which have no state other than `type`.
 *
 * If conflation of stateful messages is required, a custom `Message`
 * subclass should be created.
 */
var ConflatableMessage = /** @class */ (function (_super) {
    __extends(ConflatableMessage, _super);
    function ConflatableMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ConflatableMessage.prototype, "isConflatable", {
        /**
         * Test whether the message is conflatable.
         *
         * #### Notes
         * This property is always `true`.
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Conflate this message with another message of the same `type`.
     *
     * #### Notes
     * This method always returns `true`.
     */
    ConflatableMessage.prototype.conflate = function (other) {
        return true;
    };
    return ConflatableMessage;
}(Message));
exports.ConflatableMessage = ConflatableMessage;
/**
 * The namespace for the global singleton message loop.
 */
var MessageLoop;
(function (MessageLoop) {
    /**
     * Send a message to a message handler to process immediately.
     *
     * @param handler - The handler which should process the message.
     *
     * @param msg - The message to deliver to the handler.
     *
     * #### Notes
     * The message will first be sent through any installed message hooks
     * for the handler. If the message passes all hooks, it will then be
     * delivered to the `processMessage` method of the handler.
     *
     * The message will not be conflated with pending posted messages.
     *
     * Exceptions in hooks and handlers will be caught and logged.
     */
    function sendMessage(handler, msg) {
        // Lookup the message hooks for the handler.
        var hooks = messageHooks.get(handler);
        // Handle the common case of no installed hooks.
        if (!hooks || hooks.length === 0) {
            invokeHandler(handler, msg);
            return;
        }
        // Invoke the message hooks starting with the newest first.
        var passed = algorithm_1.every(algorithm_1.retro(hooks), function (hook) {
            return hook ? invokeHook(hook, handler, msg) : true;
        });
        // Invoke the handler if the message passes all hooks.
        if (passed) {
            invokeHandler(handler, msg);
        }
    }
    MessageLoop.sendMessage = sendMessage;
    /**
     * Post a message to a message handler to process in the future.
     *
     * @param handler - The handler which should process the message.
     *
     * @param msg - The message to post to the handler.
     *
     * #### Notes
     * The message will be conflated with the pending posted messages for
     * the handler, if possible. If the message is not conflated, it will
     * be queued for normal delivery on the next cycle of the event loop.
     *
     * Exceptions in hooks and handlers will be caught and logged.
     */
    function postMessage(handler, msg) {
        // Handle the common case of a non-conflatable message.
        if (!msg.isConflatable) {
            enqueueMessage(handler, msg);
            return;
        }
        // Conflate the message with an existing message if possible.
        var conflated = algorithm_1.some(messageQueue, function (posted) {
            if (posted.handler !== handler) {
                return false;
            }
            if (!posted.msg) {
                return false;
            }
            if (posted.msg.type !== msg.type) {
                return false;
            }
            if (!posted.msg.isConflatable) {
                return false;
            }
            return posted.msg.conflate(msg);
        });
        // Enqueue the message if it was not conflated.
        if (!conflated) {
            enqueueMessage(handler, msg);
        }
    }
    MessageLoop.postMessage = postMessage;
    /**
     * Install a message hook for a message handler.
     *
     * @param handler - The message handler of interest.
     *
     * @param hook - The message hook to install.
     *
     * #### Notes
     * A message hook is invoked before a message is delivered to the
     * handler. If the hook returns `false`, no other hooks will be
     * invoked and the message will not be delivered to the handler.
     *
     * The most recently installed message hook is executed first.
     *
     * If the hook is already installed, this is a no-op.
     */
    function installMessageHook(handler, hook) {
        // Lookup the hooks for the handler.
        var hooks = messageHooks.get(handler);
        // Bail early if the hook is already installed.
        if (hooks && hooks.indexOf(hook) !== -1) {
            return;
        }
        // Add the hook to the end, so it will be the first to execute.
        if (!hooks) {
            messageHooks.set(handler, [hook]);
        }
        else {
            hooks.push(hook);
        }
    }
    MessageLoop.installMessageHook = installMessageHook;
    /**
     * Remove an installed message hook for a message handler.
     *
     * @param handler - The message handler of interest.
     *
     * @param hook - The message hook to remove.
     *
     * #### Notes
     * It is safe to call this function while the hook is executing.
     *
     * If the hook is not installed, this is a no-op.
     */
    function removeMessageHook(handler, hook) {
        // Lookup the hooks for the handler.
        var hooks = messageHooks.get(handler);
        // Bail early if the hooks do not exist.
        if (!hooks) {
            return;
        }
        // Lookup the index of the hook and bail if not found.
        var i = hooks.indexOf(hook);
        if (i === -1) {
            return;
        }
        // Clear the hook and schedule a cleanup of the array.
        hooks[i] = null;
        scheduleCleanup(hooks);
    }
    MessageLoop.removeMessageHook = removeMessageHook;
    /**
     * Clear all message data associated with a message handler.
     *
     * @param handler - The message handler of interest.
     *
     * #### Notes
     * This will clear all posted messages and hooks for the handler.
     */
    function clearData(handler) {
        // Lookup the hooks for the handler.
        var hooks = messageHooks.get(handler);
        // Clear all messsage hooks for the handler.
        if (hooks && hooks.length > 0) {
            algorithm_1.ArrayExt.fill(hooks, null);
            scheduleCleanup(hooks);
        }
        // Clear all posted messages for the handler.
        algorithm_1.each(messageQueue, function (posted) {
            if (posted.handler === handler) {
                posted.handler = null;
                posted.msg = null;
            }
        });
    }
    MessageLoop.clearData = clearData;
    /**
     * Process the pending posted messages in the queue immediately.
     *
     * #### Notes
     * This function is useful when posted messages must be processed
     * immediately, instead of on the next animation frame.
     *
     * This function should normally not be needed, but it may be
     * required to work around certain browser idiosyncrasies.
     *
     * Recursing into this function is a no-op.
     */
    function flush() {
        // Bail if recursion is detected or if there is no pending task.
        if (flushGuard || loopTaskID === 0) {
            return;
        }
        // Unschedule the pending loop task.
        unschedule(loopTaskID);
        // Run the message loop within the recursion guard.
        flushGuard = true;
        runMessageLoop();
        flushGuard = false;
    }
    MessageLoop.flush = flush;
    /**
     * Get the message loop exception handler.
     *
     * @returns The current exception handler.
     *
     * #### Notes
     * The default exception handler is `console.error`.
     */
    function getExceptionHandler() {
        return exceptionHandler;
    }
    MessageLoop.getExceptionHandler = getExceptionHandler;
    /**
     * Set the message loop exception handler.
     *
     * @param handler - The function to use as the exception handler.
     *
     * @returns The old exception handler.
     *
     * #### Notes
     * The exception handler is invoked when a message handler or a
     * message hook throws an exception.
     */
    function setExceptionHandler(handler) {
        var old = exceptionHandler;
        exceptionHandler = handler;
        return old;
    }
    MessageLoop.setExceptionHandler = setExceptionHandler;
    /**
     * The queue of posted message pairs.
     */
    var messageQueue = new collections_1.LinkedList();
    /**
     * A mapping of handler to array of installed message hooks.
     */
    var messageHooks = new WeakMap();
    /**
     * A set of message hook arrays which are pending cleanup.
     */
    var dirtySet = new Set();
    /**
     * The message loop exception handler.
     */
    var exceptionHandler = function (err) {
        console.error(err);
    };
    /**
     * The id of the pending loop task animation frame.
     */
    var loopTaskID = 0;
    /**
     * A guard flag to prevent flush recursion.
     */
    var flushGuard = false;
    /**
     * A function to schedule an event loop callback.
     */
    var schedule = (function () {
        var ok = typeof requestAnimationFrame === 'function';
        return ok ? requestAnimationFrame : setImmediate;
    })();
    /**
     * A function to unschedule an event loop callback.
     */
    var unschedule = (function () {
        var ok = typeof cancelAnimationFrame === 'function';
        return ok ? cancelAnimationFrame : clearImmediate;
    })();
    /**
     * Invoke a message hook with the specified handler and message.
     *
     * Returns the result of the hook, or `true` if the hook throws.
     *
     * Exceptions in the hook will be caught and logged.
     */
    function invokeHook(hook, handler, msg) {
        var result = true;
        try {
            if (typeof hook === 'function') {
                result = hook(handler, msg);
            }
            else {
                result = hook.messageHook(handler, msg);
            }
        }
        catch (err) {
            exceptionHandler(err);
        }
        return result;
    }
    /**
     * Invoke a message handler with the specified message.
     *
     * Exceptions in the handler will be caught and logged.
     */
    function invokeHandler(handler, msg) {
        try {
            handler.processMessage(msg);
        }
        catch (err) {
            exceptionHandler(err);
        }
    }
    /**
     * Add a message to the end of the message queue.
     *
     * This will automatically schedule a run of the message loop.
     */
    function enqueueMessage(handler, msg) {
        // Add the posted message to the queue.
        messageQueue.addLast({ handler: handler, msg: msg });
        // Bail if a loop task is already pending.
        if (loopTaskID !== 0) {
            return;
        }
        // Schedule a run of the message loop.
        loopTaskID = schedule(runMessageLoop);
    }
    /**
     * Run an iteration of the message loop.
     *
     * This will process all pending messages in the queue. If a message
     * is added to the queue while the message loop is running, it will
     * be processed on the next cycle of the loop.
     */
    function runMessageLoop() {
        // Clear the task ID so the next loop can be scheduled.
        loopTaskID = 0;
        // If the message queue is empty, there is nothing else to do.
        if (messageQueue.isEmpty) {
            return;
        }
        // Add a sentinel value to the end of the queue. The queue will
        // only be processed up to the sentinel. Messages posted during
        // this cycle will execute on the next cycle.
        var sentinel = { handler: null, msg: null };
        messageQueue.addLast(sentinel);
        // Enter the message loop.
        while (true) {
            // Remove the first posted message in the queue.
            var posted = messageQueue.removeFirst();
            // If the value is the sentinel, exit the loop.
            if (posted === sentinel) {
                return;
            }
            // Dispatch the message if it has not been cleared.
            if (posted.handler && posted.msg) {
                sendMessage(posted.handler, posted.msg);
            }
        }
    }
    /**
     * Schedule a cleanup of a message hooks array.
     *
     * This will add the array to the dirty set and schedule a deferred
     * cleanup of the array contents. On cleanup, any `null` hook will
     * be removed from the array.
     */
    function scheduleCleanup(hooks) {
        if (dirtySet.size === 0) {
            schedule(cleanupDirtySet);
        }
        dirtySet.add(hooks);
    }
    /**
     * Cleanup the message hook arrays in the dirty set.
     *
     * This function should only be invoked asynchronously, when the
     * stack frame is guaranteed to not be on the path of user code.
     */
    function cleanupDirtySet() {
        dirtySet.forEach(cleanupHooks);
        dirtySet.clear();
    }
    /**
     * Cleanup the dirty hooks in a message hooks array.
     *
     * This will remove any `null` hook from the array.
     *
     * This function should only be invoked asynchronously, when the
     * stack frame is guaranteed to not be on the path of user code.
     */
    function cleanupHooks(hooks) {
        algorithm_1.ArrayExt.removeAllWhere(hooks, isNull);
    }
    /**
     * Test whether a value is `null`.
     */
    function isNull(value) {
        return value === null;
    }
})(MessageLoop = exports.MessageLoop || (exports.MessageLoop = {}));

})
		]
	]
}, {
	name: "@lumino/properties",
	version: "1.1.6",
	root: "node_modules/@lumino/properties",
	main: "lib/index.js",
	files: [
		[
			/* @lumino/properties: 39 */
			"lib/index.js", ["cjs","js"], {}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A class which attaches a value to an external object.
 *
 * #### Notes
 * Attached properties are used to extend the state of an object with
 * semantic data from an unrelated class. They also encapsulate value
 * creation, coercion, and notification.
 *
 * Because attached property values are stored in a hash table, which
 * in turn is stored in a WeakMap keyed on the owner object, there is
 * non-trivial storage overhead involved in their use. The pattern is
 * therefore best used for the storage of rare data.
 */
var AttachedProperty = /** @class */ (function () {
    /**
     * Construct a new attached property.
     *
     * @param options - The options for initializing the property.
     */
    function AttachedProperty(options) {
        this._pid = Private.nextPID();
        this.name = options.name;
        this._create = options.create;
        this._coerce = options.coerce || null;
        this._compare = options.compare || null;
        this._changed = options.changed || null;
    }
    /**
     * Get the current value of the property for a given owner.
     *
     * @param owner - The property owner of interest.
     *
     * @returns The current value of the property.
     *
     * #### Notes
     * If the value has not yet been set, the default value will be
     * computed and assigned as the current value of the property.
     */
    AttachedProperty.prototype.get = function (owner) {
        var value;
        var map = Private.ensureMap(owner);
        if (this._pid in map) {
            value = map[this._pid];
        }
        else {
            value = map[this._pid] = this._createValue(owner);
        }
        return value;
    };
    /**
     * Set the current value of the property for a given owner.
     *
     * @param owner - The property owner of interest.
     *
     * @param value - The value for the property.
     *
     * #### Notes
     * If the value has not yet been set, the default value will be
     * computed and used as the previous value for the comparison.
     */
    AttachedProperty.prototype.set = function (owner, value) {
        var oldValue;
        var map = Private.ensureMap(owner);
        if (this._pid in map) {
            oldValue = map[this._pid];
        }
        else {
            oldValue = map[this._pid] = this._createValue(owner);
        }
        var newValue = this._coerceValue(owner, value);
        this._maybeNotify(owner, oldValue, map[this._pid] = newValue);
    };
    /**
     * Explicitly coerce the current property value for a given owner.
     *
     * @param owner - The property owner of interest.
     *
     * #### Notes
     * If the value has not yet been set, the default value will be
     * computed and used as the previous value for the comparison.
     */
    AttachedProperty.prototype.coerce = function (owner) {
        var oldValue;
        var map = Private.ensureMap(owner);
        if (this._pid in map) {
            oldValue = map[this._pid];
        }
        else {
            oldValue = map[this._pid] = this._createValue(owner);
        }
        var newValue = this._coerceValue(owner, oldValue);
        this._maybeNotify(owner, oldValue, map[this._pid] = newValue);
    };
    /**
     * Get or create the default value for the given owner.
     */
    AttachedProperty.prototype._createValue = function (owner) {
        var create = this._create;
        return create(owner);
    };
    /**
     * Coerce the value for the given owner.
     */
    AttachedProperty.prototype._coerceValue = function (owner, value) {
        var coerce = this._coerce;
        return coerce ? coerce(owner, value) : value;
    };
    /**
     * Compare the old value and new value for equality.
     */
    AttachedProperty.prototype._compareValue = function (oldValue, newValue) {
        var compare = this._compare;
        return compare ? compare(oldValue, newValue) : oldValue === newValue;
    };
    /**
     * Run the change notification if the given values are different.
     */
    AttachedProperty.prototype._maybeNotify = function (owner, oldValue, newValue) {
        var changed = this._changed;
        if (changed && !this._compareValue(oldValue, newValue)) {
            changed(owner, oldValue, newValue);
        }
    };
    return AttachedProperty;
}());
exports.AttachedProperty = AttachedProperty;
/**
 * The namespace for the `AttachedProperty` class statics.
 */
(function (AttachedProperty) {
    /**
     * Clear the stored property data for the given owner.
     *
     * @param owner - The property owner of interest.
     *
     * #### Notes
     * This will clear all property values for the owner, but it will
     * **not** run the change notification for any of the properties.
     */
    function clearData(owner) {
        Private.ownerData.delete(owner);
    }
    AttachedProperty.clearData = clearData;
})(AttachedProperty = exports.AttachedProperty || (exports.AttachedProperty = {}));
exports.AttachedProperty = AttachedProperty;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * A weak mapping of property owner to property map.
     */
    Private.ownerData = new WeakMap();
    /**
     * A function which computes successive unique property ids.
     */
    Private.nextPID = (function () {
        var id = 0;
        return function () {
            var rand = Math.random();
            var stem = ("" + rand).slice(2);
            return "pid-" + stem + "-" + id++;
        };
    })();
    /**
     * Lookup the data map for the property owner.
     *
     * This will create the map if one does not already exist.
     */
    function ensureMap(owner) {
        var map = Private.ownerData.get(owner);
        if (map) {
            return map;
        }
        map = Object.create(null);
        Private.ownerData.set(owner, map);
        return map;
    }
    Private.ensureMap = ensureMap;
})(Private || (Private = {}));

})
		]
	]
}, {
	name: "@lumino/signaling",
	version: "1.3.6",
	root: "node_modules/@lumino/signaling",
	main: "lib/index.js",
	files: [
		[
			/* @lumino/signaling: 40 */
			"lib/index.js", ["cjs","js"], {"@lumino/algorithm": 11}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
/**
 * A concrete implementation of `ISignal`.
 *
 * #### Example
 * ```typescript
 * import { ISignal, Signal } from '@lumino/signaling';
 *
 * class SomeClass {
 *
 *   constructor(name: string) {
 *     this.name = name;
 *   }
 *
 *   readonly name: string;
 *
 *   get valueChanged: ISignal<this, number> {
 *     return this._valueChanged;
 *   }
 *
 *   get value(): number {
 *     return this._value;
 *   }
 *
 *   set value(value: number) {
 *     if (value === this._value) {
 *       return;
 *     }
 *     this._value = value;
 *     this._valueChanged.emit(value);
 *   }
 *
 *   private _value = 0;
 *   private _valueChanged = new Signal<this, number>(this);
 * }
 *
 * function logger(sender: SomeClass, value: number): void {
 *   console.log(sender.name, value);
 * }
 *
 * let m1 = new SomeClass('foo');
 * let m2 = new SomeClass('bar');
 *
 * m1.valueChanged.connect(logger);
 * m2.valueChanged.connect(logger);
 *
 * m1.value = 42;  // logs: foo 42
 * m2.value = 17;  // logs: bar 17
 * ```
 */
var Signal = /** @class */ (function () {
    /**
     * Construct a new signal.
     *
     * @param sender - The sender which owns the signal.
     */
    function Signal(sender) {
        this.sender = sender;
    }
    /**
     * Connect a slot to the signal.
     *
     * @param slot - The slot to invoke when the signal is emitted.
     *
     * @param thisArg - The `this` context for the slot. If provided,
     *   this must be a non-primitive object.
     *
     * @returns `true` if the connection succeeds, `false` otherwise.
     */
    Signal.prototype.connect = function (slot, thisArg) {
        return Private.connect(this, slot, thisArg);
    };
    /**
     * Disconnect a slot from the signal.
     *
     * @param slot - The slot to disconnect from the signal.
     *
     * @param thisArg - The `this` context for the slot. If provided,
     *   this must be a non-primitive object.
     *
     * @returns `true` if the connection is removed, `false` otherwise.
     */
    Signal.prototype.disconnect = function (slot, thisArg) {
        return Private.disconnect(this, slot, thisArg);
    };
    /**
     * Emit the signal and invoke the connected slots.
     *
     * @param args - The args to pass to the connected slots.
     *
     * #### Notes
     * Slots are invoked synchronously in connection order.
     *
     * Exceptions thrown by connected slots will be caught and logged.
     */
    Signal.prototype.emit = function (args) {
        Private.emit(this, args);
    };
    return Signal;
}());
exports.Signal = Signal;
/**
 * The namespace for the `Signal` class statics.
 */
(function (Signal) {
    /**
     * Remove all connections between a sender and receiver.
     *
     * @param sender - The sender object of interest.
     *
     * @param receiver - The receiver object of interest.
     *
     * #### Notes
     * If a `thisArg` is provided when connecting a signal, that object
     * is considered the receiver. Otherwise, the `slot` is considered
     * the receiver.
     */
    function disconnectBetween(sender, receiver) {
        Private.disconnectBetween(sender, receiver);
    }
    Signal.disconnectBetween = disconnectBetween;
    /**
     * Remove all connections where the given object is the sender.
     *
     * @param sender - The sender object of interest.
     */
    function disconnectSender(sender) {
        Private.disconnectSender(sender);
    }
    Signal.disconnectSender = disconnectSender;
    /**
     * Remove all connections where the given object is the receiver.
     *
     * @param receiver - The receiver object of interest.
     *
     * #### Notes
     * If a `thisArg` is provided when connecting a signal, that object
     * is considered the receiver. Otherwise, the `slot` is considered
     * the receiver.
     */
    function disconnectReceiver(receiver) {
        Private.disconnectReceiver(receiver);
    }
    Signal.disconnectReceiver = disconnectReceiver;
    /**
     * Remove all connections where an object is the sender or receiver.
     *
     * @param object - The object of interest.
     *
     * #### Notes
     * If a `thisArg` is provided when connecting a signal, that object
     * is considered the receiver. Otherwise, the `slot` is considered
     * the receiver.
     */
    function disconnectAll(object) {
        Private.disconnectAll(object);
    }
    Signal.disconnectAll = disconnectAll;
    /**
     * Clear all signal data associated with the given object.
     *
     * @param object - The object for which the data should be cleared.
     *
     * #### Notes
     * This removes all signal connections and any other signal data
     * associated with the object.
     */
    function clearData(object) {
        Private.disconnectAll(object);
    }
    Signal.clearData = clearData;
    /**
     * Get the signal exception handler.
     *
     * @returns The current exception handler.
     *
     * #### Notes
     * The default exception handler is `console.error`.
     */
    function getExceptionHandler() {
        return Private.exceptionHandler;
    }
    Signal.getExceptionHandler = getExceptionHandler;
    /**
     * Set the signal exception handler.
     *
     * @param handler - The function to use as the exception handler.
     *
     * @returns The old exception handler.
     *
     * #### Notes
     * The exception handler is invoked when a slot throws an exception.
     */
    function setExceptionHandler(handler) {
        var old = Private.exceptionHandler;
        Private.exceptionHandler = handler;
        return old;
    }
    Signal.setExceptionHandler = setExceptionHandler;
})(Signal = exports.Signal || (exports.Signal = {}));
exports.Signal = Signal;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * The signal exception handler function.
     */
    Private.exceptionHandler = function (err) {
        console.error(err);
    };
    /**
     * Connect a slot to a signal.
     *
     * @param signal - The signal of interest.
     *
     * @param slot - The slot to invoke when the signal is emitted.
     *
     * @param thisArg - The `this` context for the slot. If provided,
     *   this must be a non-primitive object.
     *
     * @returns `true` if the connection succeeds, `false` otherwise.
     */
    function connect(signal, slot, thisArg) {
        // Coerce a `null` `thisArg` to `undefined`.
        thisArg = thisArg || undefined;
        // Ensure the sender's array of receivers is created.
        var receivers = receiversForSender.get(signal.sender);
        if (!receivers) {
            receivers = [];
            receiversForSender.set(signal.sender, receivers);
        }
        // Bail if a matching connection already exists.
        if (findConnection(receivers, signal, slot, thisArg)) {
            return false;
        }
        // Choose the best object for the receiver.
        var receiver = thisArg || slot;
        // Ensure the receiver's array of senders is created.
        var senders = sendersForReceiver.get(receiver);
        if (!senders) {
            senders = [];
            sendersForReceiver.set(receiver, senders);
        }
        // Create a new connection and add it to the end of each array.
        var connection = { signal: signal, slot: slot, thisArg: thisArg };
        receivers.push(connection);
        senders.push(connection);
        // Indicate a successful connection.
        return true;
    }
    Private.connect = connect;
    /**
     * Disconnect a slot from a signal.
     *
     * @param signal - The signal of interest.
     *
     * @param slot - The slot to disconnect from the signal.
     *
     * @param thisArg - The `this` context for the slot. If provided,
     *   this must be a non-primitive object.
     *
     * @returns `true` if the connection is removed, `false` otherwise.
     */
    function disconnect(signal, slot, thisArg) {
        // Coerce a `null` `thisArg` to `undefined`.
        thisArg = thisArg || undefined;
        // Lookup the list of receivers, and bail if none exist.
        var receivers = receiversForSender.get(signal.sender);
        if (!receivers || receivers.length === 0) {
            return false;
        }
        // Bail if no matching connection exits.
        var connection = findConnection(receivers, signal, slot, thisArg);
        if (!connection) {
            return false;
        }
        // Choose the best object for the receiver.
        var receiver = thisArg || slot;
        // Lookup the array of senders, which is now known to exist.
        var senders = sendersForReceiver.get(receiver);
        // Clear the connection and schedule cleanup of the arrays.
        connection.signal = null;
        scheduleCleanup(receivers);
        scheduleCleanup(senders);
        // Indicate a successful disconnection.
        return true;
    }
    Private.disconnect = disconnect;
    /**
     * Remove all connections between a sender and receiver.
     *
     * @param sender - The sender object of interest.
     *
     * @param receiver - The receiver object of interest.
     */
    function disconnectBetween(sender, receiver) {
        // If there are no receivers, there is nothing to do.
        var receivers = receiversForSender.get(sender);
        if (!receivers || receivers.length === 0) {
            return;
        }
        // If there are no senders, there is nothing to do.
        var senders = sendersForReceiver.get(receiver);
        if (!senders || senders.length === 0) {
            return;
        }
        // Clear each connection between the sender and receiver.
        algorithm_1.each(senders, function (connection) {
            // Skip connections which have already been cleared.
            if (!connection.signal) {
                return;
            }
            // Clear the connection if it matches the sender.
            if (connection.signal.sender === sender) {
                connection.signal = null;
            }
        });
        // Schedule a cleanup of the senders and receivers.
        scheduleCleanup(receivers);
        scheduleCleanup(senders);
    }
    Private.disconnectBetween = disconnectBetween;
    /**
     * Remove all connections where the given object is the sender.
     *
     * @param sender - The sender object of interest.
     */
    function disconnectSender(sender) {
        // If there are no receivers, there is nothing to do.
        var receivers = receiversForSender.get(sender);
        if (!receivers || receivers.length === 0) {
            return;
        }
        // Clear each receiver connection.
        algorithm_1.each(receivers, function (connection) {
            // Skip connections which have already been cleared.
            if (!connection.signal) {
                return;
            }
            // Choose the best object for the receiver.
            var receiver = connection.thisArg || connection.slot;
            // Clear the connection.
            connection.signal = null;
            // Cleanup the array of senders, which is now known to exist.
            scheduleCleanup(sendersForReceiver.get(receiver));
        });
        // Schedule a cleanup of the receivers.
        scheduleCleanup(receivers);
    }
    Private.disconnectSender = disconnectSender;
    /**
     * Remove all connections where the given object is the receiver.
     *
     * @param receiver - The receiver object of interest.
     */
    function disconnectReceiver(receiver) {
        // If there are no senders, there is nothing to do.
        var senders = sendersForReceiver.get(receiver);
        if (!senders || senders.length === 0) {
            return;
        }
        // Clear each sender connection.
        algorithm_1.each(senders, function (connection) {
            // Skip connections which have already been cleared.
            if (!connection.signal) {
                return;
            }
            // Lookup the sender for the connection.
            var sender = connection.signal.sender;
            // Clear the connection.
            connection.signal = null;
            // Cleanup the array of receivers, which is now known to exist.
            scheduleCleanup(receiversForSender.get(sender));
        });
        // Schedule a cleanup of the list of senders.
        scheduleCleanup(senders);
    }
    Private.disconnectReceiver = disconnectReceiver;
    /**
     * Remove all connections where an object is the sender or receiver.
     *
     * @param object - The object of interest.
     */
    function disconnectAll(object) {
        // Remove all connections where the given object is the sender.
        disconnectSender(object);
        // Remove all connections where the given object is the receiver.
        disconnectReceiver(object);
    }
    Private.disconnectAll = disconnectAll;
    /**
     * Emit a signal and invoke its connected slots.
     *
     * @param signal - The signal of interest.
     *
     * @param args - The args to pass to the connected slots.
     *
     * #### Notes
     * Slots are invoked synchronously in connection order.
     *
     * Exceptions thrown by connected slots will be caught and logged.
     */
    function emit(signal, args) {
        // If there are no receivers, there is nothing to do.
        var receivers = receiversForSender.get(signal.sender);
        if (!receivers || receivers.length === 0) {
            return;
        }
        // Invoke the slots for connections with a matching signal.
        // Any connections added during emission are not invoked.
        for (var i = 0, n = receivers.length; i < n; ++i) {
            var connection = receivers[i];
            if (connection.signal === signal) {
                invokeSlot(connection, args);
            }
        }
    }
    Private.emit = emit;
    /**
     * A weak mapping of sender to array of receiver connections.
     */
    var receiversForSender = new WeakMap();
    /**
     * A weak mapping of receiver to array of sender connections.
     */
    var sendersForReceiver = new WeakMap();
    /**
     * A set of connection arrays which are pending cleanup.
     */
    var dirtySet = new Set();
    /**
     * A function to schedule an event loop callback.
     */
    var schedule = (function () {
        var ok = typeof requestAnimationFrame === 'function';
        // @ts-ignore
        return ok ? requestAnimationFrame : setImmediate;
    })();
    /**
     * Find a connection which matches the given parameters.
     */
    function findConnection(connections, signal, slot, thisArg) {
        return algorithm_1.find(connections, function (connection) { return (connection.signal === signal &&
            connection.slot === slot &&
            connection.thisArg === thisArg); });
    }
    /**
     * Invoke a slot with the given parameters.
     *
     * The connection is assumed to be valid.
     *
     * Exceptions in the slot will be caught and logged.
     */
    function invokeSlot(connection, args) {
        var signal = connection.signal, slot = connection.slot, thisArg = connection.thisArg;
        try {
            slot.call(thisArg, signal.sender, args);
        }
        catch (err) {
            Private.exceptionHandler(err);
        }
    }
    /**
     * Schedule a cleanup of a connection array.
     *
     * This will add the array to the dirty set and schedule a deferred
     * cleanup of the array contents. On cleanup, any connection with a
     * `null` signal will be removed from the array.
     */
    function scheduleCleanup(array) {
        if (dirtySet.size === 0) {
            schedule(cleanupDirtySet);
        }
        dirtySet.add(array);
    }
    /**
     * Cleanup the connection lists in the dirty set.
     *
     * This function should only be invoked asynchronously, when the
     * stack frame is guaranteed to not be on the path of user code.
     */
    function cleanupDirtySet() {
        dirtySet.forEach(cleanupConnections);
        dirtySet.clear();
    }
    /**
     * Cleanup the dirty connections in a connections array.
     *
     * This will remove any connection with a `null` signal.
     *
     * This function should only be invoked asynchronously, when the
     * stack frame is guaranteed to not be on the path of user code.
     */
    function cleanupConnections(connections) {
        algorithm_1.ArrayExt.removeAllWhere(connections, isDeadConnection);
    }
    /**
     * Test whether a connection is dead.
     *
     * A dead connection has a `null` signal.
     */
    function isDeadConnection(connection) {
        return connection.signal === null;
    }
})(Private || (Private = {}));

})
		]
	]
}, {
	name: "@lumino/virtualdom",
	version: "1.6.1",
	root: "node_modules/@lumino/virtualdom",
	main: "lib/index.js",
	files: [
		[
			/* @lumino/virtualdom: 41 */
			"lib/index.js", ["cjs","js"], {"@lumino/algorithm": 11}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
/**
 * A virtual node which represents plain text content.
 *
 * #### Notes
 * User code will not typically create a `VirtualText` node directly.
 * Instead, the `h()` function will be used to create an element tree.
 */
var VirtualText = /** @class */ (function () {
    /**
     * Construct a new virtual text node.
     *
     * @param content - The text content for the node.
     */
    function VirtualText(content) {
        /**
         * The type of the node.
         *
         * This value can be used as a type guard for discriminating the
         * `VirtualNode` union type.
         */
        this.type = 'text';
        this.content = content;
    }
    return VirtualText;
}());
exports.VirtualText = VirtualText;
/**
 * A virtual node which represents an HTML element.
 *
 * #### Notes
 * User code will not typically create a `VirtualElement` node directly.
 * Instead, the `h()` function will be used to create an element tree.
 */
var VirtualElement = /** @class */ (function () {
    /**
     * Construct a new virtual element node.
     *
     * @param tag - The element tag name.
     *
     * @param attrs - The element attributes.
     *
     * @param children - The element children.
     *
     * @param renderer - An optional custom renderer for the element.
     */
    function VirtualElement(tag, attrs, children, renderer) {
        /**
         * The type of the node.
         *
         * This value can be used as a type guard for discriminating the
         * `VirtualNode` union type.
         */
        this.type = 'element';
        this.tag = tag;
        this.attrs = attrs;
        this.children = children;
        this.renderer = renderer;
    }
    return VirtualElement;
}());
exports.VirtualElement = VirtualElement;
/**
 * DEPRECATED - use VirtualElement with a defined renderer param instead.
 * This class is provided as a backwards compatibility shim
 *
 * A "pass thru" virtual node whose children are managed by a render and an
 * unrender callback. The intent of this flavor of virtual node is to make
 * it easy to blend other kinds of virtualdom (eg React) into Phosphor's
 * virtualdom.
 *
 * #### Notes
 * User code will not typically create a `VirtualElementPass` node directly.
 * Instead, the `hpass()` function will be used to create an element tree.
 */
var VirtualElementPass = /** @class */ (function (_super) {
    __extends(VirtualElementPass, _super);
    /**
     * DEPRECATED - use VirtualElement with a defined renderer param instead
     *
     * Construct a new virtual element pass thru node.
     *
     * @param tag - the tag of the parent element of this node. Once the parent
     * element is rendered, it will be passed as an argument to
     * renderer.render
     *
     * @param attrs - attributes that will assigned to the
     * parent element
     *
     * @param renderer - an object with render and unrender
     * functions, each of which should take a single argument of type
     * HTMLElement and return nothing. If null, the parent element
     * will be rendered barren without any children.
     */
    function VirtualElementPass(tag, attrs, renderer) {
        return _super.call(this, tag, attrs, [], renderer || undefined) || this;
    }
    return VirtualElementPass;
}(VirtualElement));
exports.VirtualElementPass = VirtualElementPass;
function h(tag) {
    var attrs = {};
    var renderer;
    var children = [];
    for (var i = 1, n = arguments.length; i < n; ++i) {
        var arg = arguments[i];
        if (typeof arg === 'string') {
            children.push(new VirtualText(arg));
        }
        else if (arg instanceof VirtualText) {
            children.push(arg);
        }
        else if (arg instanceof VirtualElement) {
            children.push(arg);
        }
        else if (arg instanceof Array) {
            extend(children, arg);
        }
        else if ((i === 1 || i === 2) && arg && typeof arg === 'object') {
            if ("render" in arg) {
                renderer = arg;
            }
            else {
                attrs = arg;
            }
        }
    }
    return new VirtualElement(tag, attrs, children, renderer);
    function extend(array, values) {
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var child = values_1[_i];
            if (typeof child === 'string') {
                array.push(new VirtualText(child));
            }
            else if (child instanceof VirtualText) {
                array.push(child);
            }
            else if (child instanceof VirtualElement) {
                array.push(child);
            }
        }
    }
}
exports.h = h;
/**
 * The namespace for the `h` function statics.
 */
(function (h) {
    h.a = h.bind(undefined, 'a');
    h.abbr = h.bind(undefined, 'abbr');
    h.address = h.bind(undefined, 'address');
    h.area = h.bind(undefined, 'area');
    h.article = h.bind(undefined, 'article');
    h.aside = h.bind(undefined, 'aside');
    h.audio = h.bind(undefined, 'audio');
    h.b = h.bind(undefined, 'b');
    h.bdi = h.bind(undefined, 'bdi');
    h.bdo = h.bind(undefined, 'bdo');
    h.blockquote = h.bind(undefined, 'blockquote');
    h.br = h.bind(undefined, 'br');
    h.button = h.bind(undefined, 'button');
    h.canvas = h.bind(undefined, 'canvas');
    h.caption = h.bind(undefined, 'caption');
    h.cite = h.bind(undefined, 'cite');
    h.code = h.bind(undefined, 'code');
    h.col = h.bind(undefined, 'col');
    h.colgroup = h.bind(undefined, 'colgroup');
    h.data = h.bind(undefined, 'data');
    h.datalist = h.bind(undefined, 'datalist');
    h.dd = h.bind(undefined, 'dd');
    h.del = h.bind(undefined, 'del');
    h.dfn = h.bind(undefined, 'dfn');
    h.div = h.bind(undefined, 'div');
    h.dl = h.bind(undefined, 'dl');
    h.dt = h.bind(undefined, 'dt');
    h.em = h.bind(undefined, 'em');
    h.embed = h.bind(undefined, 'embed');
    h.fieldset = h.bind(undefined, 'fieldset');
    h.figcaption = h.bind(undefined, 'figcaption');
    h.figure = h.bind(undefined, 'figure');
    h.footer = h.bind(undefined, 'footer');
    h.form = h.bind(undefined, 'form');
    h.h1 = h.bind(undefined, 'h1');
    h.h2 = h.bind(undefined, 'h2');
    h.h3 = h.bind(undefined, 'h3');
    h.h4 = h.bind(undefined, 'h4');
    h.h5 = h.bind(undefined, 'h5');
    h.h6 = h.bind(undefined, 'h6');
    h.header = h.bind(undefined, 'header');
    h.hr = h.bind(undefined, 'hr');
    h.i = h.bind(undefined, 'i');
    h.iframe = h.bind(undefined, 'iframe');
    h.img = h.bind(undefined, 'img');
    h.input = h.bind(undefined, 'input');
    h.ins = h.bind(undefined, 'ins');
    h.kbd = h.bind(undefined, 'kbd');
    h.label = h.bind(undefined, 'label');
    h.legend = h.bind(undefined, 'legend');
    h.li = h.bind(undefined, 'li');
    h.main = h.bind(undefined, 'main');
    h.map = h.bind(undefined, 'map');
    h.mark = h.bind(undefined, 'mark');
    h.meter = h.bind(undefined, 'meter');
    h.nav = h.bind(undefined, 'nav');
    h.noscript = h.bind(undefined, 'noscript');
    h.object = h.bind(undefined, 'object');
    h.ol = h.bind(undefined, 'ol');
    h.optgroup = h.bind(undefined, 'optgroup');
    h.option = h.bind(undefined, 'option');
    h.output = h.bind(undefined, 'output');
    h.p = h.bind(undefined, 'p');
    h.param = h.bind(undefined, 'param');
    h.pre = h.bind(undefined, 'pre');
    h.progress = h.bind(undefined, 'progress');
    h.q = h.bind(undefined, 'q');
    h.rp = h.bind(undefined, 'rp');
    h.rt = h.bind(undefined, 'rt');
    h.ruby = h.bind(undefined, 'ruby');
    h.s = h.bind(undefined, 's');
    h.samp = h.bind(undefined, 'samp');
    h.section = h.bind(undefined, 'section');
    h.select = h.bind(undefined, 'select');
    h.small = h.bind(undefined, 'small');
    h.source = h.bind(undefined, 'source');
    h.span = h.bind(undefined, 'span');
    h.strong = h.bind(undefined, 'strong');
    h.sub = h.bind(undefined, 'sub');
    h.summary = h.bind(undefined, 'summary');
    h.sup = h.bind(undefined, 'sup');
    h.table = h.bind(undefined, 'table');
    h.tbody = h.bind(undefined, 'tbody');
    h.td = h.bind(undefined, 'td');
    h.textarea = h.bind(undefined, 'textarea');
    h.tfoot = h.bind(undefined, 'tfoot');
    h.th = h.bind(undefined, 'th');
    h.thead = h.bind(undefined, 'thead');
    h.time = h.bind(undefined, 'time');
    h.title = h.bind(undefined, 'title');
    h.tr = h.bind(undefined, 'tr');
    h.track = h.bind(undefined, 'track');
    h.u = h.bind(undefined, 'u');
    h.ul = h.bind(undefined, 'ul');
    h.var_ = h.bind(undefined, 'var');
    h.video = h.bind(undefined, 'video');
    h.wbr = h.bind(undefined, 'wbr');
})(h = exports.h || (exports.h = {}));
function hpass(tag) {
    var attrs = {};
    var renderer = null;
    if (arguments.length === 2) {
        var arg = arguments[1];
        if ("render" in arg) {
            renderer = arg;
        }
        else {
            attrs = arg;
        }
    }
    else if (arguments.length === 3) {
        attrs = arguments[1];
        renderer = arguments[2];
    }
    else if (arguments.length > 3) {
        throw new Error("hpass() should be called with 1, 2, or 3 arguments");
    }
    return new VirtualElementPass(tag, attrs, renderer);
}
exports.hpass = hpass;
/**
 * The namespace for the virtual DOM rendering functions.
 */
var VirtualDOM;
(function (VirtualDOM) {
    function realize(node) {
        return Private.createDOMNode(node);
    }
    VirtualDOM.realize = realize;
    /**
     * Render virtual DOM content into a host element.
     *
     * @param content - The virtual DOM content to render.
     *
     * @param host - The host element for the rendered content.
     *
     * #### Notes
     * This renders the delta from the previous rendering. It assumes that
     * the content of the host element is not manipulated by external code.
     *
     * Providing `null` content will clear the rendering.
     *
     * Externally modifying the provided content or the host element will
     * result in undefined rendering behavior.
     */
    function render(content, host) {
        var oldContent = Private.hostMap.get(host) || [];
        var newContent = Private.asContentArray(content);
        Private.hostMap.set(host, newContent);
        Private.updateContent(host, oldContent, newContent);
    }
    VirtualDOM.render = render;
})(VirtualDOM = exports.VirtualDOM || (exports.VirtualDOM = {}));
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * A weak mapping of host element to virtual DOM content.
     */
    Private.hostMap = new WeakMap();
    /**
     * Cast a content value to a content array.
     */
    function asContentArray(value) {
        if (!value) {
            return [];
        }
        if (value instanceof Array) {
            return value;
        }
        return [value];
    }
    Private.asContentArray = asContentArray;
    function createDOMNode(node) {
        var host = arguments[1] || null;
        var before = arguments[2] || null;
        if (host) {
            host.insertBefore(createDOMNode(node), before);
        }
        else {
            // Create a text node for a virtual text node.
            if (node.type === 'text') {
                return document.createTextNode(node.content);
            }
            // Create the HTML element with the specified tag.
            host = document.createElement(node.tag);
            // Add the attributes for the new element.
            addAttrs(host, node.attrs);
            if (node.renderer) {
                node.renderer.render(host, { attrs: node.attrs, children: node.children });
                return host;
            }
            // Recursively populate the element with child content.
            for (var i = 0, n = node.children.length; i < n; ++i) {
                createDOMNode(node.children[i], host);
            }
        }
        return host;
    }
    Private.createDOMNode = createDOMNode;
    /**
     * Update a host element with the delta of the virtual content.
     *
     * This is the core "diff" algorithm. There is no explicit "patch"
     * phase. The host is patched at each step as the diff progresses.
     */
    function updateContent(host, oldContent, newContent) {
        // Bail early if the content is identical.
        if (oldContent === newContent) {
            return;
        }
        // Collect the old keyed elems into a mapping.
        var oldKeyed = collectKeys(host, oldContent);
        // Create a copy of the old content which can be modified in-place.
        var oldCopy = oldContent.slice();
        // Update the host with the new content. The diff always proceeds
        // forward and never modifies a previously visited index. The old
        // copy array is modified in-place to reflect the changes made to
        // the host children. This causes the stale nodes to be pushed to
        // the end of the host node and removed at the end of the loop.
        var currElem = host.firstChild;
        var newCount = newContent.length;
        for (var i = 0; i < newCount; ++i) {
            // If the old content is exhausted, create a new node.
            if (i >= oldCopy.length) {
                createDOMNode(newContent[i], host);
                continue;
            }
            // Lookup the old and new virtual nodes.
            var oldVNode = oldCopy[i];
            var newVNode = newContent[i];
            // If both elements are identical, there is nothing to do.
            if (oldVNode === newVNode) {
                currElem = currElem.nextSibling;
                continue;
            }
            // Handle the simplest case of in-place text update first.
            if (oldVNode.type === 'text' && newVNode.type === 'text') {
                currElem.textContent = newVNode.content;
                currElem = currElem.nextSibling;
                continue;
            }
            // If the old or new node is a text node, the other node is now
            // known to be an element node, so create and insert a new node.
            if (oldVNode.type === 'text' || newVNode.type === 'text') {
                algorithm_1.ArrayExt.insert(oldCopy, i, newVNode);
                createDOMNode(newVNode, host, currElem);
                continue;
            }
            // If the old XOR new node has a custom renderer,
            // create and insert a new node.
            if (!(oldVNode.renderer) != !(newVNode.renderer)) {
                algorithm_1.ArrayExt.insert(oldCopy, i, newVNode);
                createDOMNode(newVNode, host, currElem);
                continue;
            }
            // At this point, both nodes are known to be element nodes.
            // If the new elem is keyed, move an old keyed elem to the proper
            // location before proceeding with the diff. The search can start
            // at the current index, since the unmatched old keyed elems are
            // pushed forward in the old copy array.
            var newKey = newVNode.attrs.key;
            if (newKey && newKey in oldKeyed) {
                var pair = oldKeyed[newKey];
                if (pair.vNode !== oldVNode) {
                    algorithm_1.ArrayExt.move(oldCopy, oldCopy.indexOf(pair.vNode, i + 1), i);
                    host.insertBefore(pair.element, currElem);
                    oldVNode = pair.vNode;
                    currElem = pair.element;
                }
            }
            // If both elements are identical, there is nothing to do.
            if (oldVNode === newVNode) {
                currElem = currElem.nextSibling;
                continue;
            }
            // If the old elem is keyed and does not match the new elem key,
            // create a new node. This is necessary since the old keyed elem
            // may be matched at a later point in the diff.
            var oldKey = oldVNode.attrs.key;
            if (oldKey && oldKey !== newKey) {
                algorithm_1.ArrayExt.insert(oldCopy, i, newVNode);
                createDOMNode(newVNode, host, currElem);
                continue;
            }
            // If the tags are different, create a new node.
            if (oldVNode.tag !== newVNode.tag) {
                algorithm_1.ArrayExt.insert(oldCopy, i, newVNode);
                createDOMNode(newVNode, host, currElem);
                continue;
            }
            // At this point, the element can be updated in-place.
            // Update the element attributes.
            updateAttrs(currElem, oldVNode.attrs, newVNode.attrs);
            // Update the element content.
            if (newVNode.renderer) {
                newVNode.renderer.render(currElem, { attrs: newVNode.attrs, children: newVNode.children });
            }
            else {
                updateContent(currElem, oldVNode.children, newVNode.children);
            }
            // Step to the next sibling element.
            currElem = currElem.nextSibling;
        }
        // Cleanup stale DOM
        removeContent(host, oldCopy, newCount, true);
    }
    Private.updateContent = updateContent;
    /**
     * Handle cleanup of stale vdom and its associated DOM. The host node is
     * traversed recursively (in depth-first order), and any explicit cleanup
     * required by a child node is carried out when it is visited (eg if a node
     * has a custom renderer, the renderer.unrender function will be called).
     * Once the subtree beneath each child of host has been completely visited,
     * that child will be removed via a call to host.removeChild.
     */
    function removeContent(host, oldContent, newCount, _sentinel) {
        // Dispose of the old nodes pushed to the end of the host.
        for (var i = oldContent.length - 1; i >= newCount; --i) {
            var oldNode = oldContent[i];
            var child = (_sentinel ? host.lastChild : host.childNodes[i]);
            // recursively clean up host children
            if (oldNode.type === 'text') { }
            else if (oldNode.renderer && oldNode.renderer.unrender) {
                oldNode.renderer.unrender(child, { attrs: oldNode.attrs, children: oldNode.children });
            }
            else {
                removeContent(child, oldNode.children, 0, false);
            }
            if (_sentinel) {
                host.removeChild(child);
            }
        }
    }
    /**
     * A set of special-cased attribute names.
     */
    var specialAttrs = {
        'key': true,
        'className': true,
        'htmlFor': true,
        'dataset': true,
        'style': true,
    };
    /**
     * Add element attributes to a newly created HTML element.
     */
    function addAttrs(element, attrs) {
        // Add the inline event listeners and node attributes.
        for (var name_1 in attrs) {
            if (name_1 in specialAttrs) {
                continue;
            }
            if (name_1.substr(0, 2) === 'on') {
                element[name_1] = attrs[name_1];
            }
            else {
                element.setAttribute(name_1, attrs[name_1]);
            }
        }
        // Add the element `class` attribute.
        if (attrs.className !== undefined) {
            element.setAttribute('class', attrs.className);
        }
        // Add the element `for` attribute.
        if (attrs.htmlFor !== undefined) {
            element.setAttribute('for', attrs.htmlFor);
        }
        // Add the dataset values.
        if (attrs.dataset) {
            addDataset(element, attrs.dataset);
        }
        // Add the inline styles.
        if (attrs.style) {
            addStyle(element, attrs.style);
        }
    }
    /**
     * Update the element attributes of an HTML element.
     */
    function updateAttrs(element, oldAttrs, newAttrs) {
        // Do nothing if the attrs are the same object.
        if (oldAttrs === newAttrs) {
            return;
        }
        // Setup the strongly typed loop variable.
        var name;
        // Remove attributes and listeners which no longer exist.
        for (name in oldAttrs) {
            if (name in specialAttrs || name in newAttrs) {
                continue;
            }
            if (name.substr(0, 2) === 'on') {
                element[name] = null;
            }
            else {
                element.removeAttribute(name);
            }
        }
        // Add and update new and existing attributes and listeners.
        for (name in newAttrs) {
            if (name in specialAttrs || oldAttrs[name] === newAttrs[name]) {
                continue;
            }
            if (name.substr(0, 2) === 'on') {
                element[name] = newAttrs[name];
            }
            else {
                element.setAttribute(name, newAttrs[name]);
            }
        }
        // Update the element `class` attribute.
        if (oldAttrs.className !== newAttrs.className) {
            if (newAttrs.className !== undefined) {
                element.setAttribute('class', newAttrs.className);
            }
            else {
                element.removeAttribute('class');
            }
        }
        // Add the element `for` attribute.
        if (oldAttrs.htmlFor !== newAttrs.htmlFor) {
            if (newAttrs.htmlFor !== undefined) {
                element.setAttribute('for', newAttrs.htmlFor);
            }
            else {
                element.removeAttribute('for');
            }
        }
        // Update the dataset values.
        if (oldAttrs.dataset !== newAttrs.dataset) {
            updateDataset(element, oldAttrs.dataset || {}, newAttrs.dataset || {});
        }
        // Update the inline styles.
        if (oldAttrs.style !== newAttrs.style) {
            updateStyle(element, oldAttrs.style || {}, newAttrs.style || {});
        }
    }
    /**
     * Add dataset values to a newly created HTML element.
     */
    function addDataset(element, dataset) {
        for (var name_2 in dataset) {
            element.setAttribute("data-" + name_2, dataset[name_2]);
        }
    }
    /**
     * Update the dataset values of an HTML element.
     */
    function updateDataset(element, oldDataset, newDataset) {
        for (var name_3 in oldDataset) {
            if (!(name_3 in newDataset)) {
                element.removeAttribute("data-" + name_3);
            }
        }
        for (var name_4 in newDataset) {
            if (oldDataset[name_4] !== newDataset[name_4]) {
                element.setAttribute("data-" + name_4, newDataset[name_4]);
            }
        }
    }
    /**
     * Add inline style values to a newly created HTML element.
     */
    function addStyle(element, style) {
        var elemStyle = element.style;
        var name;
        for (name in style) {
            elemStyle[name] = style[name];
        }
    }
    /**
     * Update the inline style values of an HTML element.
     */
    function updateStyle(element, oldStyle, newStyle) {
        var elemStyle = element.style;
        var name;
        for (name in oldStyle) {
            if (!(name in newStyle)) {
                elemStyle[name] = '';
            }
        }
        for (name in newStyle) {
            if (oldStyle[name] !== newStyle[name]) {
                elemStyle[name] = newStyle[name];
            }
        }
    }
    /**
     * Collect a mapping of keyed elements for the host content.
     */
    function collectKeys(host, content) {
        var node = host.firstChild;
        var keyMap = Object.create(null);
        for (var _i = 0, content_1 = content; _i < content_1.length; _i++) {
            var vNode = content_1[_i];
            if (vNode.type === 'element' && vNode.attrs.key) {
                keyMap[vNode.attrs.key] = { vNode: vNode, element: node };
            }
            node = node.nextSibling;
        }
        return keyMap;
    }
})(Private || (Private = {}));

})
		]
	]
}, {
	name: "@lumino/widgets",
	version: "1.12.2",
	root: "node_modules/@lumino/widgets",
	main: "lib/index.js",
	files: [
		[
			/* @lumino/widgets: 42 */
			"lib/widget.js", ["cjs","js"], {"./title": 43, "@lumino/algorithm": 11, "@lumino/messaging": 38, "@lumino/properties": 39, "@lumino/signaling": 40}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
var messaging_1 = require("@lumino/messaging");
var properties_1 = require("@lumino/properties");
var signaling_1 = require("@lumino/signaling");
var title_1 = require("./title");
/**
 * The base class of the lumino widget hierarchy.
 *
 * #### Notes
 * This class will typically be subclassed in order to create a useful
 * widget. However, it can be used directly to host externally created
 * content.
 */
var Widget = /** @class */ (function () {
    /**
     * Construct a new widget.
     *
     * @param options - The options for initializing the widget.
     */
    function Widget(options) {
        if (options === void 0) { options = {}; }
        this._flags = 0;
        this._layout = null;
        this._parent = null;
        this._disposed = new signaling_1.Signal(this);
        this.node = Private.createNode(options);
        this.addClass('lm-Widget');
        /* <DEPRECATED> */
        this.addClass('p-Widget');
        /* </DEPRECATED> */
    }
    /**
     * Dispose of the widget and its descendant widgets.
     *
     * #### Notes
     * It is unsafe to use the widget after it has been disposed.
     *
     * All calls made to this method after the first are a no-op.
     */
    Widget.prototype.dispose = function () {
        // Do nothing if the widget is already disposed.
        if (this.isDisposed) {
            return;
        }
        // Set the disposed flag and emit the disposed signal.
        this.setFlag(Widget.Flag.IsDisposed);
        this._disposed.emit(undefined);
        // Remove or detach the widget if necessary.
        if (this.parent) {
            this.parent = null;
        }
        else if (this.isAttached) {
            Widget.detach(this);
        }
        // Dispose of the widget layout.
        if (this._layout) {
            this._layout.dispose();
            this._layout = null;
        }
        // Clear the extra data associated with the widget.
        signaling_1.Signal.clearData(this);
        messaging_1.MessageLoop.clearData(this);
        properties_1.AttachedProperty.clearData(this);
    };
    Object.defineProperty(Widget.prototype, "disposed", {
        /**
         * A signal emitted when the widget is disposed.
         */
        get: function () {
            return this._disposed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "isDisposed", {
        /**
         * Test whether the widget has been disposed.
         */
        get: function () {
            return this.testFlag(Widget.Flag.IsDisposed);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "isAttached", {
        /**
         * Test whether the widget's node is attached to the DOM.
         */
        get: function () {
            return this.testFlag(Widget.Flag.IsAttached);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "isHidden", {
        /**
         * Test whether the widget is explicitly hidden.
         */
        get: function () {
            return this.testFlag(Widget.Flag.IsHidden);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "isVisible", {
        /**
         * Test whether the widget is visible.
         *
         * #### Notes
         * A widget is visible when it is attached to the DOM, is not
         * explicitly hidden, and has no explicitly hidden ancestors.
         */
        get: function () {
            return this.testFlag(Widget.Flag.IsVisible);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "title", {
        /**
         * The title object for the widget.
         *
         * #### Notes
         * The title object is used by some container widgets when displaying
         * the widget alongside some title, such as a tab panel or side bar.
         *
         * Since not all widgets will use the title, it is created on demand.
         *
         * The `owner` property of the title is set to this widget.
         */
        get: function () {
            return Private.titleProperty.get(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "id", {
        /**
         * Get the id of the widget's DOM node.
         */
        get: function () {
            return this.node.id;
        },
        /**
         * Set the id of the widget's DOM node.
         */
        set: function (value) {
            this.node.id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "dataset", {
        /**
         * The dataset for the widget's DOM node.
         */
        get: function () {
            return this.node.dataset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "parent", {
        /**
         * Get the parent of the widget.
         */
        get: function () {
            return this._parent;
        },
        /**
         * Set the parent of the widget.
         *
         * #### Notes
         * Children are typically added to a widget by using a layout, which
         * means user code will not normally set the parent widget directly.
         *
         * The widget will be automatically removed from its old parent.
         *
         * This is a no-op if there is no effective parent change.
         */
        set: function (value) {
            if (this._parent === value) {
                return;
            }
            if (value && this.contains(value)) {
                throw new Error('Invalid parent widget.');
            }
            if (this._parent && !this._parent.isDisposed) {
                var msg = new Widget.ChildMessage('child-removed', this);
                messaging_1.MessageLoop.sendMessage(this._parent, msg);
            }
            this._parent = value;
            if (this._parent && !this._parent.isDisposed) {
                var msg = new Widget.ChildMessage('child-added', this);
                messaging_1.MessageLoop.sendMessage(this._parent, msg);
            }
            if (!this.isDisposed) {
                messaging_1.MessageLoop.sendMessage(this, Widget.Msg.ParentChanged);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "layout", {
        /**
         * Get the layout for the widget.
         */
        get: function () {
            return this._layout;
        },
        /**
         * Set the layout for the widget.
         *
         * #### Notes
         * The layout is single-use only. It cannot be changed after the
         * first assignment.
         *
         * The layout is disposed automatically when the widget is disposed.
         */
        set: function (value) {
            if (this._layout === value) {
                return;
            }
            if (this.testFlag(Widget.Flag.DisallowLayout)) {
                throw new Error('Cannot set widget layout.');
            }
            if (this._layout) {
                throw new Error('Cannot change widget layout.');
            }
            if (value.parent) {
                throw new Error('Cannot change layout parent.');
            }
            this._layout = value;
            value.parent = this;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Create an iterator over the widget's children.
     *
     * @returns A new iterator over the children of the widget.
     *
     * #### Notes
     * The widget must have a populated layout in order to have children.
     *
     * If a layout is not installed, the returned iterator will be empty.
     */
    Widget.prototype.children = function () {
        return this._layout ? this._layout.iter() : algorithm_1.empty();
    };
    /**
     * Test whether a widget is a descendant of this widget.
     *
     * @param widget - The descendant widget of interest.
     *
     * @returns `true` if the widget is a descendant, `false` otherwise.
     */
    Widget.prototype.contains = function (widget) {
        for (var value = widget; value; value = value._parent) {
            if (value === this) {
                return true;
            }
        }
        return false;
    };
    /**
     * Test whether the widget's DOM node has the given class name.
     *
     * @param name - The class name of interest.
     *
     * @returns `true` if the node has the class, `false` otherwise.
     */
    Widget.prototype.hasClass = function (name) {
        return this.node.classList.contains(name);
    };
    /**
     * Add a class name to the widget's DOM node.
     *
     * @param name - The class name to add to the node.
     *
     * #### Notes
     * If the class name is already added to the node, this is a no-op.
     *
     * The class name must not contain whitespace.
     */
    Widget.prototype.addClass = function (name) {
        this.node.classList.add(name);
    };
    /**
     * Remove a class name from the widget's DOM node.
     *
     * @param name - The class name to remove from the node.
     *
     * #### Notes
     * If the class name is not yet added to the node, this is a no-op.
     *
     * The class name must not contain whitespace.
     */
    Widget.prototype.removeClass = function (name) {
        this.node.classList.remove(name);
    };
    /**
     * Toggle a class name on the widget's DOM node.
     *
     * @param name - The class name to toggle on the node.
     *
     * @param force - Whether to force add the class (`true`) or force
     *   remove the class (`false`). If not provided, the presence of
     *   the class will be toggled from its current state.
     *
     * @returns `true` if the class is now present, `false` otherwise.
     *
     * #### Notes
     * The class name must not contain whitespace.
     */
    Widget.prototype.toggleClass = function (name, force) {
        if (force === true) {
            this.node.classList.add(name);
            return true;
        }
        if (force === false) {
            this.node.classList.remove(name);
            return false;
        }
        return this.node.classList.toggle(name);
    };
    /**
     * Post an `'update-request'` message to the widget.
     *
     * #### Notes
     * This is a simple convenience method for posting the message.
     */
    Widget.prototype.update = function () {
        messaging_1.MessageLoop.postMessage(this, Widget.Msg.UpdateRequest);
    };
    /**
     * Post a `'fit-request'` message to the widget.
     *
     * #### Notes
     * This is a simple convenience method for posting the message.
     */
    Widget.prototype.fit = function () {
        messaging_1.MessageLoop.postMessage(this, Widget.Msg.FitRequest);
    };
    /**
     * Post an `'activate-request'` message to the widget.
     *
     * #### Notes
     * This is a simple convenience method for posting the message.
     */
    Widget.prototype.activate = function () {
        messaging_1.MessageLoop.postMessage(this, Widget.Msg.ActivateRequest);
    };
    /**
     * Send a `'close-request'` message to the widget.
     *
     * #### Notes
     * This is a simple convenience method for sending the message.
     */
    Widget.prototype.close = function () {
        messaging_1.MessageLoop.sendMessage(this, Widget.Msg.CloseRequest);
    };
    /**
     * Show the widget and make it visible to its parent widget.
     *
     * #### Notes
     * This causes the [[isHidden]] property to be `false`.
     *
     * If the widget is not explicitly hidden, this is a no-op.
     */
    Widget.prototype.show = function () {
        if (!this.testFlag(Widget.Flag.IsHidden)) {
            return;
        }
        if (this.isAttached && (!this.parent || this.parent.isVisible)) {
            messaging_1.MessageLoop.sendMessage(this, Widget.Msg.BeforeShow);
        }
        this.clearFlag(Widget.Flag.IsHidden);
        this.removeClass('lm-mod-hidden');
        /* <DEPRECATED> */
        this.removeClass('p-mod-hidden');
        /* </DEPRECATED> */
        if (this.isAttached && (!this.parent || this.parent.isVisible)) {
            messaging_1.MessageLoop.sendMessage(this, Widget.Msg.AfterShow);
        }
        if (this.parent) {
            var msg = new Widget.ChildMessage('child-shown', this);
            messaging_1.MessageLoop.sendMessage(this.parent, msg);
        }
    };
    /**
     * Hide the widget and make it hidden to its parent widget.
     *
     * #### Notes
     * This causes the [[isHidden]] property to be `true`.
     *
     * If the widget is explicitly hidden, this is a no-op.
     */
    Widget.prototype.hide = function () {
        if (this.testFlag(Widget.Flag.IsHidden)) {
            return;
        }
        if (this.isAttached && (!this.parent || this.parent.isVisible)) {
            messaging_1.MessageLoop.sendMessage(this, Widget.Msg.BeforeHide);
        }
        this.setFlag(Widget.Flag.IsHidden);
        this.addClass('lm-mod-hidden');
        /* <DEPRECATED> */
        this.addClass('p-mod-hidden');
        /* </DEPRECATED> */
        if (this.isAttached && (!this.parent || this.parent.isVisible)) {
            messaging_1.MessageLoop.sendMessage(this, Widget.Msg.AfterHide);
        }
        if (this.parent) {
            var msg = new Widget.ChildMessage('child-hidden', this);
            messaging_1.MessageLoop.sendMessage(this.parent, msg);
        }
    };
    /**
     * Show or hide the widget according to a boolean value.
     *
     * @param hidden - `true` to hide the widget, or `false` to show it.
     *
     * #### Notes
     * This is a convenience method for `hide()` and `show()`.
     */
    Widget.prototype.setHidden = function (hidden) {
        if (hidden) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    /**
     * Test whether the given widget flag is set.
     *
     * #### Notes
     * This will not typically be called directly by user code.
     */
    Widget.prototype.testFlag = function (flag) {
        return (this._flags & flag) !== 0;
    };
    /**
     * Set the given widget flag.
     *
     * #### Notes
     * This will not typically be called directly by user code.
     */
    Widget.prototype.setFlag = function (flag) {
        this._flags |= flag;
    };
    /**
     * Clear the given widget flag.
     *
     * #### Notes
     * This will not typically be called directly by user code.
     */
    Widget.prototype.clearFlag = function (flag) {
        this._flags &= ~flag;
    };
    /**
     * Process a message sent to the widget.
     *
     * @param msg - The message sent to the widget.
     *
     * #### Notes
     * Subclasses may reimplement this method as needed.
     */
    Widget.prototype.processMessage = function (msg) {
        switch (msg.type) {
            case 'resize':
                this.notifyLayout(msg);
                this.onResize(msg);
                break;
            case 'update-request':
                this.notifyLayout(msg);
                this.onUpdateRequest(msg);
                break;
            case 'fit-request':
                this.notifyLayout(msg);
                this.onFitRequest(msg);
                break;
            case 'before-show':
                this.notifyLayout(msg);
                this.onBeforeShow(msg);
                break;
            case 'after-show':
                this.setFlag(Widget.Flag.IsVisible);
                this.notifyLayout(msg);
                this.onAfterShow(msg);
                break;
            case 'before-hide':
                this.notifyLayout(msg);
                this.onBeforeHide(msg);
                break;
            case 'after-hide':
                this.clearFlag(Widget.Flag.IsVisible);
                this.notifyLayout(msg);
                this.onAfterHide(msg);
                break;
            case 'before-attach':
                this.notifyLayout(msg);
                this.onBeforeAttach(msg);
                break;
            case 'after-attach':
                if (!this.isHidden && (!this.parent || this.parent.isVisible)) {
                    this.setFlag(Widget.Flag.IsVisible);
                }
                this.setFlag(Widget.Flag.IsAttached);
                this.notifyLayout(msg);
                this.onAfterAttach(msg);
                break;
            case 'before-detach':
                this.notifyLayout(msg);
                this.onBeforeDetach(msg);
                break;
            case 'after-detach':
                this.clearFlag(Widget.Flag.IsVisible);
                this.clearFlag(Widget.Flag.IsAttached);
                this.notifyLayout(msg);
                this.onAfterDetach(msg);
                break;
            case 'activate-request':
                this.notifyLayout(msg);
                this.onActivateRequest(msg);
                break;
            case 'close-request':
                this.notifyLayout(msg);
                this.onCloseRequest(msg);
                break;
            case 'child-added':
                this.notifyLayout(msg);
                this.onChildAdded(msg);
                break;
            case 'child-removed':
                this.notifyLayout(msg);
                this.onChildRemoved(msg);
                break;
            default:
                this.notifyLayout(msg);
                break;
        }
    };
    /**
     * Invoke the message processing routine of the widget's layout.
     *
     * @param msg - The message to dispatch to the layout.
     *
     * #### Notes
     * This is a no-op if the widget does not have a layout.
     *
     * This will not typically be called directly by user code.
     */
    Widget.prototype.notifyLayout = function (msg) {
        if (this._layout) {
            this._layout.processParentMessage(msg);
        }
    };
    /**
     * A message handler invoked on a `'close-request'` message.
     *
     * #### Notes
     * The default implementation unparents or detaches the widget.
     */
    Widget.prototype.onCloseRequest = function (msg) {
        if (this.parent) {
            this.parent = null;
        }
        else if (this.isAttached) {
            Widget.detach(this);
        }
    };
    /**
     * A message handler invoked on a `'resize'` message.
     *
     * #### Notes
     * The default implementation of this handler is a no-op.
     */
    Widget.prototype.onResize = function (msg) { };
    /**
     * A message handler invoked on an `'update-request'` message.
     *
     * #### Notes
     * The default implementation of this handler is a no-op.
     */
    Widget.prototype.onUpdateRequest = function (msg) { };
    /**
     * A message handler invoked on a `'fit-request'` message.
     *
     * #### Notes
     * The default implementation of this handler is a no-op.
     */
    Widget.prototype.onFitRequest = function (msg) { };
    /**
     * A message handler invoked on an `'activate-request'` message.
     *
     * #### Notes
     * The default implementation of this handler is a no-op.
     */
    Widget.prototype.onActivateRequest = function (msg) { };
    /**
     * A message handler invoked on a `'before-show'` message.
     *
     * #### Notes
     * The default implementation of this handler is a no-op.
     */
    Widget.prototype.onBeforeShow = function (msg) { };
    /**
     * A message handler invoked on an `'after-show'` message.
     *
     * #### Notes
     * The default implementation of this handler is a no-op.
     */
    Widget.prototype.onAfterShow = function (msg) { };
    /**
     * A message handler invoked on a `'before-hide'` message.
     *
     * #### Notes
     * The default implementation of this handler is a no-op.
     */
    Widget.prototype.onBeforeHide = function (msg) { };
    /**
     * A message handler invoked on an `'after-hide'` message.
     *
     * #### Notes
     * The default implementation of this handler is a no-op.
     */
    Widget.prototype.onAfterHide = function (msg) { };
    /**
     * A message handler invoked on a `'before-attach'` message.
     *
     * #### Notes
     * The default implementation of this handler is a no-op.
     */
    Widget.prototype.onBeforeAttach = function (msg) { };
    /**
     * A message handler invoked on an `'after-attach'` message.
     *
     * #### Notes
     * The default implementation of this handler is a no-op.
     */
    Widget.prototype.onAfterAttach = function (msg) { };
    /**
     * A message handler invoked on a `'before-detach'` message.
     *
     * #### Notes
     * The default implementation of this handler is a no-op.
     */
    Widget.prototype.onBeforeDetach = function (msg) { };
    /**
     * A message handler invoked on an `'after-detach'` message.
     *
     * #### Notes
     * The default implementation of this handler is a no-op.
     */
    Widget.prototype.onAfterDetach = function (msg) { };
    /**
     * A message handler invoked on a `'child-added'` message.
     *
     * #### Notes
     * The default implementation of this handler is a no-op.
     */
    Widget.prototype.onChildAdded = function (msg) { };
    /**
     * A message handler invoked on a `'child-removed'` message.
     *
     * #### Notes
     * The default implementation of this handler is a no-op.
     */
    Widget.prototype.onChildRemoved = function (msg) { };
    return Widget;
}());
exports.Widget = Widget;
/**
 * The namespace for the `Widget` class statics.
 */
(function (Widget) {
    /**
     * An enum of widget bit flags.
     */
    var Flag;
    (function (Flag) {
        /**
         * The widget has been disposed.
         */
        Flag[Flag["IsDisposed"] = 1] = "IsDisposed";
        /**
         * The widget is attached to the DOM.
         */
        Flag[Flag["IsAttached"] = 2] = "IsAttached";
        /**
         * The widget is hidden.
         */
        Flag[Flag["IsHidden"] = 4] = "IsHidden";
        /**
         * The widget is visible.
         */
        Flag[Flag["IsVisible"] = 8] = "IsVisible";
        /**
         * A layout cannot be set on the widget.
         */
        Flag[Flag["DisallowLayout"] = 16] = "DisallowLayout";
    })(Flag = Widget.Flag || (Widget.Flag = {}));
    /**
     * A collection of stateless messages related to widgets.
     */
    var Msg;
    (function (Msg) {
        /**
         * A singleton `'before-show'` message.
         *
         * #### Notes
         * This message is sent to a widget before it becomes visible.
         *
         * This message is **not** sent when the widget is being attached.
         */
        Msg.BeforeShow = new messaging_1.Message('before-show');
        /**
         * A singleton `'after-show'` message.
         *
         * #### Notes
         * This message is sent to a widget after it becomes visible.
         *
         * This message is **not** sent when the widget is being attached.
         */
        Msg.AfterShow = new messaging_1.Message('after-show');
        /**
         * A singleton `'before-hide'` message.
         *
         * #### Notes
         * This message is sent to a widget before it becomes not-visible.
         *
         * This message is **not** sent when the widget is being detached.
         */
        Msg.BeforeHide = new messaging_1.Message('before-hide');
        /**
         * A singleton `'after-hide'` message.
         *
         * #### Notes
         * This message is sent to a widget after it becomes not-visible.
         *
         * This message is **not** sent when the widget is being detached.
         */
        Msg.AfterHide = new messaging_1.Message('after-hide');
        /**
         * A singleton `'before-attach'` message.
         *
         * #### Notes
         * This message is sent to a widget before it is attached.
         */
        Msg.BeforeAttach = new messaging_1.Message('before-attach');
        /**
         * A singleton `'after-attach'` message.
         *
         * #### Notes
         * This message is sent to a widget after it is attached.
         */
        Msg.AfterAttach = new messaging_1.Message('after-attach');
        /**
         * A singleton `'before-detach'` message.
         *
         * #### Notes
         * This message is sent to a widget before it is detached.
         */
        Msg.BeforeDetach = new messaging_1.Message('before-detach');
        /**
         * A singleton `'after-detach'` message.
         *
         * #### Notes
         * This message is sent to a widget after it is detached.
         */
        Msg.AfterDetach = new messaging_1.Message('after-detach');
        /**
         * A singleton `'parent-changed'` message.
         *
         * #### Notes
         * This message is sent to a widget when its parent has changed.
         */
        Msg.ParentChanged = new messaging_1.Message('parent-changed');
        /**
         * A singleton conflatable `'update-request'` message.
         *
         * #### Notes
         * This message can be dispatched to supporting widgets in order to
         * update their content based on the current widget state. Not all
         * widgets will respond to messages of this type.
         *
         * For widgets with a layout, this message will inform the layout to
         * update the position and size of its child widgets.
         */
        Msg.UpdateRequest = new messaging_1.ConflatableMessage('update-request');
        /**
         * A singleton conflatable `'fit-request'` message.
         *
         * #### Notes
         * For widgets with a layout, this message will inform the layout to
         * recalculate its size constraints to fit the space requirements of
         * its child widgets, and to update their position and size. Not all
         * layouts will respond to messages of this type.
         */
        Msg.FitRequest = new messaging_1.ConflatableMessage('fit-request');
        /**
         * A singleton conflatable `'activate-request'` message.
         *
         * #### Notes
         * This message should be dispatched to a widget when it should
         * perform the actions necessary to activate the widget, which
         * may include focusing its node or descendant node.
         */
        Msg.ActivateRequest = new messaging_1.ConflatableMessage('activate-request');
        /**
         * A singleton conflatable `'close-request'` message.
         *
         * #### Notes
         * This message should be dispatched to a widget when it should close
         * and remove itself from the widget hierarchy.
         */
        Msg.CloseRequest = new messaging_1.ConflatableMessage('close-request');
    })(Msg = Widget.Msg || (Widget.Msg = {}));
    /**
     * A message class for child related messages.
     */
    var ChildMessage = /** @class */ (function (_super) {
        __extends(ChildMessage, _super);
        /**
         * Construct a new child message.
         *
         * @param type - The message type.
         *
         * @param child - The child widget for the message.
         */
        function ChildMessage(type, child) {
            var _this = _super.call(this, type) || this;
            _this.child = child;
            return _this;
        }
        return ChildMessage;
    }(messaging_1.Message));
    Widget.ChildMessage = ChildMessage;
    /**
     * A message class for `'resize'` messages.
     */
    var ResizeMessage = /** @class */ (function (_super) {
        __extends(ResizeMessage, _super);
        /**
         * Construct a new resize message.
         *
         * @param width - The **offset width** of the widget, or `-1` if
         *   the width is not known.
         *
         * @param height - The **offset height** of the widget, or `-1` if
         *   the height is not known.
         */
        function ResizeMessage(width, height) {
            var _this = _super.call(this, 'resize') || this;
            _this.width = width;
            _this.height = height;
            return _this;
        }
        return ResizeMessage;
    }(messaging_1.Message));
    Widget.ResizeMessage = ResizeMessage;
    /**
     * The namespace for the `ResizeMessage` class statics.
     */
    (function (ResizeMessage) {
        /**
         * A singleton `'resize'` message with an unknown size.
         */
        ResizeMessage.UnknownSize = new ResizeMessage(-1, -1);
    })(ResizeMessage = Widget.ResizeMessage || (Widget.ResizeMessage = {}));
    /**
     * Attach a widget to a host DOM node.
     *
     * @param widget - The widget of interest.
     *
     * @param host - The DOM node to use as the widget's host.
     *
     * @param ref - The child of `host` to use as the reference element.
     *   If this is provided, the widget will be inserted before this
     *   node in the host. The default is `null`, which will cause the
     *   widget to be added as the last child of the host.
     *
     * #### Notes
     * This will throw an error if the widget is not a root widget, if
     * the widget is already attached, or if the host is not attached
     * to the DOM.
     */
    function attach(widget, host, ref) {
        if (ref === void 0) { ref = null; }
        if (widget.parent) {
            throw new Error('Cannot attach a child widget.');
        }
        if (widget.isAttached || document.body.contains(widget.node)) {
            throw new Error('Widget is already attached.');
        }
        if (!document.body.contains(host)) {
            throw new Error('Host is not attached.');
        }
        messaging_1.MessageLoop.sendMessage(widget, Widget.Msg.BeforeAttach);
        host.insertBefore(widget.node, ref);
        messaging_1.MessageLoop.sendMessage(widget, Widget.Msg.AfterAttach);
    }
    Widget.attach = attach;
    /**
     * Detach the widget from its host DOM node.
     *
     * @param widget - The widget of interest.
     *
     * #### Notes
     * This will throw an error if the widget is not a root widget,
     * or if the widget is not attached to the DOM.
     */
    function detach(widget) {
        if (widget.parent) {
            throw new Error('Cannot detach a child widget.');
        }
        if (!widget.isAttached || !document.body.contains(widget.node)) {
            throw new Error('Widget is not attached.');
        }
        messaging_1.MessageLoop.sendMessage(widget, Widget.Msg.BeforeDetach);
        widget.node.parentNode.removeChild(widget.node);
        messaging_1.MessageLoop.sendMessage(widget, Widget.Msg.AfterDetach);
    }
    Widget.detach = detach;
})(Widget = exports.Widget || (exports.Widget = {}));
exports.Widget = Widget;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * An attached property for the widget title object.
     */
    Private.titleProperty = new properties_1.AttachedProperty({
        name: 'title',
        create: function (owner) { return new title_1.Title({ owner: owner }); },
    });
    /**
     * Create a DOM node for the given widget options.
     */
    function createNode(options) {
        return options.node || document.createElement('div');
    }
    Private.createNode = createNode;
})(Private || (Private = {}));

})
		], [
			/* @lumino/widgets: 43 */
			"lib/title.js", ["cjs","js"], {"@lumino/signaling": 40}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var signaling_1 = require("@lumino/signaling");
/**
 * An object which holds data related to an object's title.
 *
 * #### Notes
 * A title object is intended to hold the data necessary to display a
 * header for a particular object. A common example is the `TabPanel`,
 * which uses the widget title to populate the tab for a child widget.
 */
var Title = /** @class */ (function () {
    /**
     * Construct a new title.
     *
     * @param options - The options for initializing the title.
     */
    function Title(options) {
        this._label = '';
        this._caption = '';
        this._mnemonic = -1;
        this._iconClass = '';
        this._iconLabel = '';
        this._className = '';
        this._closable = false;
        this._changed = new signaling_1.Signal(this);
        this.owner = options.owner;
        if (options.label !== undefined) {
            this._label = options.label;
        }
        if (options.mnemonic !== undefined) {
            this._mnemonic = options.mnemonic;
        }
        if (options.icon !== undefined) {
            /* <DEPRECATED> */
            if (typeof options.icon === "string") {
                // when ._icon is null, the .icon getter will alias .iconClass
                this._icon = null;
                this._iconClass = options.icon;
            }
            else {
                /* </DEPRECATED> */
                this._icon = options.icon;
                /* <DEPRECATED> */
            }
            /* </DEPRECATED> */
        }
        /* <DEPRECATED> */
        else {
            // if unset, default to aliasing .iconClass
            this._icon = null;
        }
        /* </DEPRECATED> */
        if (options.iconClass !== undefined) {
            this._iconClass = options.iconClass;
        }
        if (options.iconLabel !== undefined) {
            this._iconLabel = options.iconLabel;
        }
        if (options.iconRenderer !== undefined) {
            this._icon = options.iconRenderer;
        }
        if (options.caption !== undefined) {
            this._caption = options.caption;
        }
        if (options.className !== undefined) {
            this._className = options.className;
        }
        if (options.closable !== undefined) {
            this._closable = options.closable;
        }
        this._dataset = options.dataset || {};
    }
    Object.defineProperty(Title.prototype, "changed", {
        /**
         * A signal emitted when the state of the title changes.
         */
        get: function () {
            return this._changed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "label", {
        /**
         * Get the label for the title.
         *
         * #### Notes
         * The default value is an empty string.
         */
        get: function () {
            return this._label;
        },
        /**
         * Set the label for the title.
         */
        set: function (value) {
            if (this._label === value) {
                return;
            }
            this._label = value;
            this._changed.emit(undefined);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "mnemonic", {
        /**
         * Get the mnemonic index for the title.
         *
         * #### Notes
         * The default value is `-1`.
         */
        get: function () {
            return this._mnemonic;
        },
        /**
         * Set the mnemonic index for the title.
         */
        set: function (value) {
            if (this._mnemonic === value) {
                return;
            }
            this._mnemonic = value;
            this._changed.emit(undefined);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "icon", {
        /**
         * Get the icon renderer for the title.
         *
         * #### Notes
         * The default value is undefined.
         *
         * DEPRECATED: if set to a string value, the .icon field will function as
         * an alias for the .iconClass field, for backwards compatibility
         */
        get: function () {
            /* <DEPRECATED> */
            if (this._icon === null) {
                // only alias .iconClass if ._icon has been explicitly nulled
                return this.iconClass;
            }
            /* </DEPRECATED> */
            return this._icon;
        },
        /**
         * Set the icon renderer for the title.
         *
         * #### Notes
         * A renderer is an object that supplies a render and unrender function.
         *
         * DEPRECATED: if set to a string value, the .icon field will function as
         * an alias for the .iconClass field, for backwards compatibility
         */
        set: function (value /* </DEPRECATED> */) {
            /* <DEPRECATED> */
            if (typeof value === "string") {
                // when ._icon is null, the .icon getter will alias .iconClass
                this._icon = null;
                this.iconClass = value;
            }
            else {
                /* </DEPRECATED> */
                if (this._icon === value) {
                    return;
                }
                this._icon = value;
                this._changed.emit(undefined);
                /* <DEPRECATED> */
            }
            /* </DEPRECATED> */
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "iconClass", {
        /**
         * Get the icon class name for the title.
         *
         * #### Notes
         * The default value is an empty string.
         */
        get: function () {
            return this._iconClass;
        },
        /**
         * Set the icon class name for the title.
         *
         * #### Notes
         * Multiple class names can be separated with whitespace.
         */
        set: function (value) {
            if (this._iconClass === value) {
                return;
            }
            this._iconClass = value;
            this._changed.emit(undefined);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "iconLabel", {
        /**
         * Get the icon label for the title.
         *
         * #### Notes
         * The default value is an empty string.
         */
        get: function () {
            return this._iconLabel;
        },
        /**
         * Set the icon label for the title.
         *
         * #### Notes
         * Multiple class names can be separated with whitespace.
         */
        set: function (value) {
            if (this._iconLabel === value) {
                return;
            }
            this._iconLabel = value;
            this._changed.emit(undefined);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "iconRenderer", {
        /**
         * @deprecated Use `icon` instead.
         */
        get: function () {
            return this._icon || undefined;
        },
        /**
         * @deprecated Use `icon` instead.
         */
        set: function (value) {
            this.icon = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "caption", {
        /**
         * Get the caption for the title.
         *
         * #### Notes
         * The default value is an empty string.
         */
        get: function () {
            return this._caption;
        },
        /**
         * Set the caption for the title.
         */
        set: function (value) {
            if (this._caption === value) {
                return;
            }
            this._caption = value;
            this._changed.emit(undefined);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "className", {
        /**
         * Get the extra class name for the title.
         *
         * #### Notes
         * The default value is an empty string.
         */
        get: function () {
            return this._className;
        },
        /**
         * Set the extra class name for the title.
         *
         * #### Notes
         * Multiple class names can be separated with whitespace.
         */
        set: function (value) {
            if (this._className === value) {
                return;
            }
            this._className = value;
            this._changed.emit(undefined);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "closable", {
        /**
         * Get the closable state for the title.
         *
         * #### Notes
         * The default value is `false`.
         */
        get: function () {
            return this._closable;
        },
        /**
         * Set the closable state for the title.
         *
         * #### Notes
         * This controls the presence of a close icon when applicable.
         */
        set: function (value) {
            if (this._closable === value) {
                return;
            }
            this._closable = value;
            this._changed.emit(undefined);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "dataset", {
        /**
         * Get the dataset for the title.
         *
         * #### Notes
         * The default value is an empty dataset.
         */
        get: function () {
            return this._dataset;
        },
        /**
         * Set the dataset for the title.
         *
         * #### Notes
         * This controls the data attributes when applicable.
         */
        set: function (value) {
            if (this._dataset === value) {
                return;
            }
            this._dataset = value;
            this._changed.emit(undefined);
        },
        enumerable: true,
        configurable: true
    });
    return Title;
}());
exports.Title = Title;

})
		], [
			/* @lumino/widgets: 44 */
			"lib/tabpanel.js", ["cjs","js"], {"./boxlayout": 65, "./stackedpanel": 46, "./tabbar": 45, "./widget": 42, "@lumino/domutils": 33, "@lumino/messaging": 38, "@lumino/signaling": 40}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var domutils_1 = require("@lumino/domutils");
var messaging_1 = require("@lumino/messaging");
var signaling_1 = require("@lumino/signaling");
var boxlayout_1 = require("./boxlayout");
var stackedpanel_1 = require("./stackedpanel");
var tabbar_1 = require("./tabbar");
var widget_1 = require("./widget");
/**
 * A widget which combines a `TabBar` and a `StackedPanel`.
 *
 * #### Notes
 * This is a simple panel which handles the common case of a tab bar
 * placed next to a content area. The selected tab controls the widget
 * which is shown in the content area.
 *
 * For use cases which require more control than is provided by this
 * panel, the `TabBar` widget may be used independently.
 */
var TabPanel = /** @class */ (function (_super) {
    __extends(TabPanel, _super);
    /**
     * Construct a new tab panel.
     *
     * @param options - The options for initializing the tab panel.
     */
    function TabPanel(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this._currentChanged = new signaling_1.Signal(_this);
        _this.addClass('lm-TabPanel');
        /* <DEPRECATED> */
        _this.addClass('p-TabPanel');
        /* </DEPRECATED> */
        // Create the tab bar and stacked panel.
        _this.tabBar = new tabbar_1.TabBar(options);
        _this.tabBar.addClass('lm-TabPanel-tabBar');
        _this.stackedPanel = new stackedpanel_1.StackedPanel();
        _this.stackedPanel.addClass('lm-TabPanel-stackedPanel');
        /* <DEPRECATED> */
        _this.tabBar.addClass('p-TabPanel-tabBar');
        _this.stackedPanel.addClass('p-TabPanel-stackedPanel');
        /* </DEPRECATED> */
        // Connect the tab bar signal handlers.
        _this.tabBar.tabMoved.connect(_this._onTabMoved, _this);
        _this.tabBar.currentChanged.connect(_this._onCurrentChanged, _this);
        _this.tabBar.tabCloseRequested.connect(_this._onTabCloseRequested, _this);
        _this.tabBar.tabActivateRequested.connect(_this._onTabActivateRequested, _this);
        // Connect the stacked panel signal handlers.
        _this.stackedPanel.widgetRemoved.connect(_this._onWidgetRemoved, _this);
        // Get the data related to the placement.
        _this._tabPlacement = options.tabPlacement || 'top';
        var direction = Private.directionFromPlacement(_this._tabPlacement);
        var orientation = Private.orientationFromPlacement(_this._tabPlacement);
        // Configure the tab bar for the placement.
        _this.tabBar.orientation = orientation;
        _this.tabBar.dataset['placement'] = _this._tabPlacement;
        // Create the box layout.
        var layout = new boxlayout_1.BoxLayout({ direction: direction, spacing: 0 });
        // Set the stretch factors for the child widgets.
        boxlayout_1.BoxLayout.setStretch(_this.tabBar, 0);
        boxlayout_1.BoxLayout.setStretch(_this.stackedPanel, 1);
        // Add the child widgets to the layout.
        layout.addWidget(_this.tabBar);
        layout.addWidget(_this.stackedPanel);
        // Install the layout on the tab panel.
        _this.layout = layout;
        return _this;
    }
    Object.defineProperty(TabPanel.prototype, "currentChanged", {
        /**
         * A signal emitted when the current tab is changed.
         *
         * #### Notes
         * This signal is emitted when the currently selected tab is changed
         * either through user or programmatic interaction.
         *
         * Notably, this signal is not emitted when the index of the current
         * tab changes due to tabs being inserted, removed, or moved. It is
         * only emitted when the actual current tab node is changed.
         */
        get: function () {
            return this._currentChanged;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "currentIndex", {
        /**
         * Get the index of the currently selected tab.
         *
         * #### Notes
         * This will be `-1` if no tab is selected.
         */
        get: function () {
            return this.tabBar.currentIndex;
        },
        /**
         * Set the index of the currently selected tab.
         *
         * #### Notes
         * If the index is out of range, it will be set to `-1`.
         */
        set: function (value) {
            this.tabBar.currentIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "currentWidget", {
        /**
         * Get the currently selected widget.
         *
         * #### Notes
         * This will be `null` if there is no selected tab.
         */
        get: function () {
            var title = this.tabBar.currentTitle;
            return title ? title.owner : null;
        },
        /**
         * Set the currently selected widget.
         *
         * #### Notes
         * If the widget is not in the panel, it will be set to `null`.
         */
        set: function (value) {
            this.tabBar.currentTitle = value ? value.title : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "tabsMovable", {
        /**
         * Get the whether the tabs are movable by the user.
         *
         * #### Notes
         * Tabs can always be moved programmatically.
         */
        get: function () {
            return this.tabBar.tabsMovable;
        },
        /**
         * Set the whether the tabs are movable by the user.
         *
         * #### Notes
         * Tabs can always be moved programmatically.
         */
        set: function (value) {
            this.tabBar.tabsMovable = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "tabPlacement", {
        /**
         * Get the tab placement for the tab panel.
         *
         * #### Notes
         * This controls the position of the tab bar relative to the content.
         */
        get: function () {
            return this._tabPlacement;
        },
        /**
         * Set the tab placement for the tab panel.
         *
         * #### Notes
         * This controls the position of the tab bar relative to the content.
         */
        set: function (value) {
            // Bail if the placement does not change.
            if (this._tabPlacement === value) {
                return;
            }
            // Update the internal value.
            this._tabPlacement = value;
            // Get the values related to the placement.
            var direction = Private.directionFromPlacement(value);
            var orientation = Private.orientationFromPlacement(value);
            // Configure the tab bar for the placement.
            this.tabBar.orientation = orientation;
            this.tabBar.dataset['placement'] = value;
            // Update the layout direction.
            this.layout.direction = direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "widgets", {
        /**
         * A read-only array of the widgets in the panel.
         */
        get: function () {
            return this.stackedPanel.widgets;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add a widget to the end of the tab panel.
     *
     * @param widget - The widget to add to the tab panel.
     *
     * #### Notes
     * If the widget is already contained in the panel, it will be moved.
     *
     * The widget's `title` is used to populate the tab.
     */
    TabPanel.prototype.addWidget = function (widget) {
        this.insertWidget(this.widgets.length, widget);
    };
    /**
     * Insert a widget into the tab panel at a specified index.
     *
     * @param index - The index at which to insert the widget.
     *
     * @param widget - The widget to insert into to the tab panel.
     *
     * #### Notes
     * If the widget is already contained in the panel, it will be moved.
     *
     * The widget's `title` is used to populate the tab.
     */
    TabPanel.prototype.insertWidget = function (index, widget) {
        if (widget !== this.currentWidget) {
            widget.hide();
        }
        this.stackedPanel.insertWidget(index, widget);
        this.tabBar.insertTab(index, widget.title);
    };
    /**
     * Handle the `currentChanged` signal from the tab bar.
     */
    TabPanel.prototype._onCurrentChanged = function (sender, args) {
        // Extract the previous and current title from the args.
        var previousIndex = args.previousIndex, previousTitle = args.previousTitle, currentIndex = args.currentIndex, currentTitle = args.currentTitle;
        // Extract the widgets from the titles.
        var previousWidget = previousTitle ? previousTitle.owner : null;
        var currentWidget = currentTitle ? currentTitle.owner : null;
        // Hide the previous widget.
        if (previousWidget) {
            previousWidget.hide();
        }
        // Show the current widget.
        if (currentWidget) {
            currentWidget.show();
        }
        // Emit the `currentChanged` signal for the tab panel.
        this._currentChanged.emit({
            previousIndex: previousIndex, previousWidget: previousWidget, currentIndex: currentIndex, currentWidget: currentWidget
        });
        // Flush the message loop on IE and Edge to prevent flicker.
        if (domutils_1.Platform.IS_EDGE || domutils_1.Platform.IS_IE) {
            messaging_1.MessageLoop.flush();
        }
    };
    /**
     * Handle the `tabActivateRequested` signal from the tab bar.
     */
    TabPanel.prototype._onTabActivateRequested = function (sender, args) {
        args.title.owner.activate();
    };
    /**
     * Handle the `tabCloseRequested` signal from the tab bar.
     */
    TabPanel.prototype._onTabCloseRequested = function (sender, args) {
        args.title.owner.close();
    };
    /**
     * Handle the `tabMoved` signal from the tab bar.
     */
    TabPanel.prototype._onTabMoved = function (sender, args) {
        this.stackedPanel.insertWidget(args.toIndex, args.title.owner);
    };
    /**
     * Handle the `widgetRemoved` signal from the stacked panel.
     */
    TabPanel.prototype._onWidgetRemoved = function (sender, widget) {
        this.tabBar.removeTab(widget.title);
    };
    return TabPanel;
}(widget_1.Widget));
exports.TabPanel = TabPanel;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * Convert a tab placement to tab bar orientation.
     */
    function orientationFromPlacement(plc) {
        return placementToOrientationMap[plc];
    }
    Private.orientationFromPlacement = orientationFromPlacement;
    /**
     * Convert a tab placement to a box layout direction.
     */
    function directionFromPlacement(plc) {
        return placementToDirectionMap[plc];
    }
    Private.directionFromPlacement = directionFromPlacement;
    /**
     * A mapping of tab placement to tab bar orientation.
     */
    var placementToOrientationMap = {
        'top': 'horizontal',
        'left': 'vertical',
        'right': 'vertical',
        'bottom': 'horizontal'
    };
    /**
     * A mapping of tab placement to box layout direction.
     */
    var placementToDirectionMap = {
        'top': 'top-to-bottom',
        'left': 'left-to-right',
        'right': 'right-to-left',
        'bottom': 'bottom-to-top'
    };
})(Private || (Private = {}));

})
		], [
			/* @lumino/widgets: 45 */
			"lib/tabbar.js", ["cjs","js"], {"./title": 43, "./widget": 42, "@lumino/algorithm": 11, "@lumino/domutils": 33, "@lumino/dragdrop": 36, "@lumino/messaging": 38, "@lumino/signaling": 40, "@lumino/virtualdom": 41}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
var domutils_1 = require("@lumino/domutils");
var dragdrop_1 = require("@lumino/dragdrop");
var messaging_1 = require("@lumino/messaging");
var signaling_1 = require("@lumino/signaling");
var virtualdom_1 = require("@lumino/virtualdom");
var title_1 = require("./title");
var widget_1 = require("./widget");
/**
 * A widget which displays titles as a single row or column of tabs.
 *
 * #### Notes
 * If CSS transforms are used to rotate nodes for vertically oriented
 * text, then tab dragging will not work correctly. The `tabsMovable`
 * property should be set to `false` when rotating nodes from CSS.
 */
var TabBar = /** @class */ (function (_super) {
    __extends(TabBar, _super);
    /**
     * Construct a new tab bar.
     *
     * @param options - The options for initializing the tab bar.
     */
    function TabBar(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, { node: Private.createNode() }) || this;
        _this._currentIndex = -1;
        _this._titles = [];
        _this._previousTitle = null;
        _this._dragData = null;
        _this._tabMoved = new signaling_1.Signal(_this);
        _this._currentChanged = new signaling_1.Signal(_this);
        _this._tabCloseRequested = new signaling_1.Signal(_this);
        _this._tabDetachRequested = new signaling_1.Signal(_this);
        _this._tabActivateRequested = new signaling_1.Signal(_this);
        _this.addClass('lm-TabBar');
        /* <DEPRECATED> */
        _this.addClass('p-TabBar');
        /* </DEPRECATED> */
        _this.setFlag(widget_1.Widget.Flag.DisallowLayout);
        _this.tabsMovable = options.tabsMovable || false;
        _this.allowDeselect = options.allowDeselect || false;
        _this.insertBehavior = options.insertBehavior || 'select-tab-if-needed';
        _this.removeBehavior = options.removeBehavior || 'select-tab-after';
        _this.renderer = options.renderer || TabBar.defaultRenderer;
        _this._orientation = options.orientation || 'horizontal';
        _this.dataset['orientation'] = _this._orientation;
        return _this;
    }
    /**
     * Dispose of the resources held by the widget.
     */
    TabBar.prototype.dispose = function () {
        this._releaseMouse();
        this._titles.length = 0;
        this._previousTitle = null;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(TabBar.prototype, "currentChanged", {
        /**
         * A signal emitted when the current tab is changed.
         *
         * #### Notes
         * This signal is emitted when the currently selected tab is changed
         * either through user or programmatic interaction.
         *
         * Notably, this signal is not emitted when the index of the current
         * tab changes due to tabs being inserted, removed, or moved. It is
         * only emitted when the actual current tab node is changed.
         */
        get: function () {
            return this._currentChanged;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "tabMoved", {
        /**
         * A signal emitted when a tab is moved by the user.
         *
         * #### Notes
         * This signal is emitted when a tab is moved by user interaction.
         *
         * This signal is not emitted when a tab is moved programmatically.
         */
        get: function () {
            return this._tabMoved;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "tabActivateRequested", {
        /**
         * A signal emitted when a tab is clicked by the user.
         *
         * #### Notes
         * If the clicked tab is not the current tab, the clicked tab will be
         * made current and the `currentChanged` signal will be emitted first.
         *
         * This signal is emitted even if the clicked tab is the current tab.
         */
        get: function () {
            return this._tabActivateRequested;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "tabCloseRequested", {
        /**
         * A signal emitted when a tab close icon is clicked.
         *
         * #### Notes
         * This signal is not emitted unless the tab title is `closable`.
         */
        get: function () {
            return this._tabCloseRequested;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "tabDetachRequested", {
        /**
         * A signal emitted when a tab is dragged beyond the detach threshold.
         *
         * #### Notes
         * This signal is emitted when the user drags a tab with the mouse,
         * and mouse is dragged beyond the detach threshold.
         *
         * The consumer of the signal should call `releaseMouse` and remove
         * the tab in order to complete the detach.
         *
         * This signal is only emitted once per drag cycle.
         */
        get: function () {
            return this._tabDetachRequested;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "currentTitle", {
        /**
         * Get the currently selected title.
         *
         * #### Notes
         * This will be `null` if no tab is selected.
         */
        get: function () {
            return this._titles[this._currentIndex] || null;
        },
        /**
         * Set the currently selected title.
         *
         * #### Notes
         * If the title does not exist, the title will be set to `null`.
         */
        set: function (value) {
            this.currentIndex = value ? this._titles.indexOf(value) : -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "currentIndex", {
        /**
         * Get the index of the currently selected tab.
         *
         * #### Notes
         * This will be `-1` if no tab is selected.
         */
        get: function () {
            return this._currentIndex;
        },
        /**
         * Set the index of the currently selected tab.
         *
         * #### Notes
         * If the value is out of range, the index will be set to `-1`.
         */
        set: function (value) {
            // Adjust for an out of range index.
            if (value < 0 || value >= this._titles.length) {
                value = -1;
            }
            // Bail early if the index will not change.
            if (this._currentIndex === value) {
                return;
            }
            // Look up the previous index and title.
            var pi = this._currentIndex;
            var pt = this._titles[pi] || null;
            // Look up the current index and title.
            var ci = value;
            var ct = this._titles[ci] || null;
            // Update the current index and previous title.
            this._currentIndex = ci;
            this._previousTitle = pt;
            // Schedule an update of the tabs.
            this.update();
            // Emit the current changed signal.
            this._currentChanged.emit({
                previousIndex: pi, previousTitle: pt,
                currentIndex: ci, currentTitle: ct
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "orientation", {
        /**
         * Get the orientation of the tab bar.
         *
         * #### Notes
         * This controls whether the tabs are arranged in a row or column.
         */
        get: function () {
            return this._orientation;
        },
        /**
         * Set the orientation of the tab bar.
         *
         * #### Notes
         * This controls whether the tabs are arranged in a row or column.
         */
        set: function (value) {
            // Do nothing if the orientation does not change.
            if (this._orientation === value) {
                return;
            }
            // Release the mouse before making any changes.
            this._releaseMouse();
            // Toggle the orientation values.
            this._orientation = value;
            this.dataset['orientation'] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "titles", {
        /**
         * A read-only array of the titles in the tab bar.
         */
        get: function () {
            return this._titles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "contentNode", {
        /**
         * The tab bar content node.
         *
         * #### Notes
         * This is the node which holds the tab nodes.
         *
         * Modifying this node directly can lead to undefined behavior.
         */
        get: function () {
            return this.node.getElementsByClassName('lm-TabBar-content')[0];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add a tab to the end of the tab bar.
     *
     * @param value - The title which holds the data for the tab,
     *   or an options object to convert to a title.
     *
     * @returns The title object added to the tab bar.
     *
     * #### Notes
     * If the title is already added to the tab bar, it will be moved.
     */
    TabBar.prototype.addTab = function (value) {
        return this.insertTab(this._titles.length, value);
    };
    /**
     * Insert a tab into the tab bar at the specified index.
     *
     * @param index - The index at which to insert the tab.
     *
     * @param value - The title which holds the data for the tab,
     *   or an options object to convert to a title.
     *
     * @returns The title object added to the tab bar.
     *
     * #### Notes
     * The index will be clamped to the bounds of the tabs.
     *
     * If the title is already added to the tab bar, it will be moved.
     */
    TabBar.prototype.insertTab = function (index, value) {
        // Release the mouse before making any changes.
        this._releaseMouse();
        // Coerce the value to a title.
        var title = Private.asTitle(value);
        // Look up the index of the title.
        var i = this._titles.indexOf(title);
        // Clamp the insert index to the array bounds.
        var j = Math.max(0, Math.min(index, this._titles.length));
        // If the title is not in the array, insert it.
        if (i === -1) {
            // Insert the title into the array.
            algorithm_1.ArrayExt.insert(this._titles, j, title);
            // Connect to the title changed signal.
            title.changed.connect(this._onTitleChanged, this);
            // Schedule an update of the tabs.
            this.update();
            // Adjust the current index for the insert.
            this._adjustCurrentForInsert(j, title);
            // Return the title added to the tab bar.
            return title;
        }
        // Otherwise, the title exists in the array and should be moved.
        // Adjust the index if the location is at the end of the array.
        if (j === this._titles.length) {
            j--;
        }
        // Bail if there is no effective move.
        if (i === j) {
            return title;
        }
        // Move the title to the new location.
        algorithm_1.ArrayExt.move(this._titles, i, j);
        // Schedule an update of the tabs.
        this.update();
        // Adjust the current index for the move.
        this._adjustCurrentForMove(i, j);
        // Return the title added to the tab bar.
        return title;
    };
    /**
     * Remove a tab from the tab bar.
     *
     * @param title - The title for the tab to remove.
     *
     * #### Notes
     * This is a no-op if the title is not in the tab bar.
     */
    TabBar.prototype.removeTab = function (title) {
        this.removeTabAt(this._titles.indexOf(title));
    };
    /**
     * Remove the tab at a given index from the tab bar.
     *
     * @param index - The index of the tab to remove.
     *
     * #### Notes
     * This is a no-op if the index is out of range.
     */
    TabBar.prototype.removeTabAt = function (index) {
        // Release the mouse before making any changes.
        this._releaseMouse();
        // Remove the title from the array.
        var title = algorithm_1.ArrayExt.removeAt(this._titles, index);
        // Bail if the index is out of range.
        if (!title) {
            return;
        }
        // Disconnect from the title changed signal.
        title.changed.disconnect(this._onTitleChanged, this);
        // Clear the previous title if it's being removed.
        if (title === this._previousTitle) {
            this._previousTitle = null;
        }
        // Schedule an update of the tabs.
        this.update();
        // Adjust the current index for the remove.
        this._adjustCurrentForRemove(index, title);
    };
    /**
     * Remove all tabs from the tab bar.
     */
    TabBar.prototype.clearTabs = function () {
        // Bail if there is nothing to remove.
        if (this._titles.length === 0) {
            return;
        }
        // Release the mouse before making any changes.
        this._releaseMouse();
        // Disconnect from the title changed signals.
        for (var _i = 0, _a = this._titles; _i < _a.length; _i++) {
            var title = _a[_i];
            title.changed.disconnect(this._onTitleChanged, this);
        }
        // Get the current index and title.
        var pi = this.currentIndex;
        var pt = this.currentTitle;
        // Reset the current index and previous title.
        this._currentIndex = -1;
        this._previousTitle = null;
        // Clear the title array.
        this._titles.length = 0;
        // Schedule an update of the tabs.
        this.update();
        // If no tab was selected, there's nothing else to do.
        if (pi === -1) {
            return;
        }
        // Emit the current changed signal.
        this._currentChanged.emit({
            previousIndex: pi, previousTitle: pt,
            currentIndex: -1, currentTitle: null
        });
    };
    /**
     * Release the mouse and restore the non-dragged tab positions.
     *
     * #### Notes
     * This will cause the tab bar to stop handling mouse events and to
     * restore the tabs to their non-dragged positions.
     */
    TabBar.prototype.releaseMouse = function () {
        this._releaseMouse();
    };
    /**
     * Handle the DOM events for the tab bar.
     *
     * @param event - The DOM event sent to the tab bar.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the tab bar's DOM node.
     *
     * This should not be called directly by user code.
     */
    TabBar.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'mousedown':
                this._evtMouseDown(event);
                break;
            case 'mousemove':
                this._evtMouseMove(event);
                break;
            case 'mouseup':
                this._evtMouseUp(event);
                break;
            case 'keydown':
                this._evtKeyDown(event);
                break;
            case 'contextmenu':
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    };
    /**
     * A message handler invoked on a `'before-attach'` message.
     */
    TabBar.prototype.onBeforeAttach = function (msg) {
        this.node.addEventListener('mousedown', this);
    };
    /**
     * A message handler invoked on an `'after-detach'` message.
     */
    TabBar.prototype.onAfterDetach = function (msg) {
        this.node.removeEventListener('mousedown', this);
        this._releaseMouse();
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    TabBar.prototype.onUpdateRequest = function (msg) {
        var titles = this._titles;
        var renderer = this.renderer;
        var currentTitle = this.currentTitle;
        var content = new Array(titles.length);
        for (var i = 0, n = titles.length; i < n; ++i) {
            var title = titles[i];
            var current = title === currentTitle;
            var zIndex = current ? n : n - i - 1;
            content[i] = renderer.renderTab({ title: title, current: current, zIndex: zIndex });
        }
        virtualdom_1.VirtualDOM.render(content, this.contentNode);
    };
    /**
     * Handle the `'keydown'` event for the tab bar.
     */
    TabBar.prototype._evtKeyDown = function (event) {
        // Stop all input events during drag.
        event.preventDefault();
        event.stopPropagation();
        // Release the mouse if `Escape` is pressed.
        if (event.keyCode === 27) {
            this._releaseMouse();
        }
    };
    /**
     * Handle the `'mousedown'` event for the tab bar.
     */
    TabBar.prototype._evtMouseDown = function (event) {
        // Do nothing if it's not a left or middle mouse press.
        if (event.button !== 0 && event.button !== 1) {
            return;
        }
        // Do nothing if a drag is in progress.
        if (this._dragData) {
            return;
        }
        // Lookup the tab nodes.
        var tabs = this.contentNode.children;
        // Find the index of the pressed tab.
        var index = algorithm_1.ArrayExt.findFirstIndex(tabs, function (tab) {
            return domutils_1.ElementExt.hitTest(tab, event.clientX, event.clientY);
        });
        // Do nothing if the press is not on a tab.
        if (index === -1) {
            return;
        }
        // Pressing on a tab stops the event propagation.
        event.preventDefault();
        event.stopPropagation();
        // Initialize the non-measured parts of the drag data.
        this._dragData = {
            tab: tabs[index],
            index: index,
            pressX: event.clientX,
            pressY: event.clientY,
            tabPos: -1,
            tabSize: -1,
            tabPressPos: -1,
            targetIndex: -1,
            tabLayout: null,
            contentRect: null,
            override: null,
            dragActive: false,
            dragAborted: false,
            detachRequested: false
        };
        // Add the document mouse up listener.
        document.addEventListener('mouseup', this, true);
        // Do nothing else if the middle button is clicked.
        if (event.button === 1) {
            return;
        }
        // Do nothing else if the close icon is clicked.
        var icon = tabs[index].querySelector(this.renderer.closeIconSelector);
        if (icon && icon.contains(event.target)) {
            return;
        }
        // Add the extra listeners if the tabs are movable.
        if (this.tabsMovable) {
            document.addEventListener('mousemove', this, true);
            document.addEventListener('keydown', this, true);
            document.addEventListener('contextmenu', this, true);
        }
        // Update the current index as appropriate.
        if (this.allowDeselect && this.currentIndex === index) {
            this.currentIndex = -1;
        }
        else {
            this.currentIndex = index;
        }
        // Do nothing else if there is no current tab.
        if (this.currentIndex === -1) {
            return;
        }
        // Emit the tab activate request signal.
        this._tabActivateRequested.emit({
            index: this.currentIndex, title: this.currentTitle
        });
    };
    /**
     * Handle the `'mousemove'` event for the tab bar.
     */
    TabBar.prototype._evtMouseMove = function (event) {
        // Do nothing if no drag is in progress.
        var data = this._dragData;
        if (!data) {
            return;
        }
        // Suppress the event during a drag.
        event.preventDefault();
        event.stopPropagation();
        // Lookup the tab nodes.
        var tabs = this.contentNode.children;
        // Bail early if the drag threshold has not been met.
        if (!data.dragActive && !Private.dragExceeded(data, event)) {
            return;
        }
        // Activate the drag if necessary.
        if (!data.dragActive) {
            // Fill in the rest of the drag data measurements.
            var tabRect = data.tab.getBoundingClientRect();
            if (this._orientation === 'horizontal') {
                data.tabPos = data.tab.offsetLeft;
                data.tabSize = tabRect.width;
                data.tabPressPos = data.pressX - tabRect.left;
            }
            else {
                data.tabPos = data.tab.offsetTop;
                data.tabSize = tabRect.height;
                data.tabPressPos = data.pressY - tabRect.top;
            }
            data.tabLayout = Private.snapTabLayout(tabs, this._orientation);
            data.contentRect = this.contentNode.getBoundingClientRect();
            data.override = dragdrop_1.Drag.overrideCursor('default');
            // Add the dragging style classes.
            data.tab.classList.add('lm-mod-dragging');
            this.addClass('lm-mod-dragging');
            /* <DEPRECATED> */
            data.tab.classList.add('p-mod-dragging');
            this.addClass('p-mod-dragging');
            /* </DEPRECATED> */
            // Mark the drag as active.
            data.dragActive = true;
        }
        // Emit the detach requested signal if the threshold is exceeded.
        if (!data.detachRequested && Private.detachExceeded(data, event)) {
            // Only emit the signal once per drag cycle.
            data.detachRequested = true;
            // Setup the arguments for the signal.
            var index = data.index;
            var clientX = event.clientX;
            var clientY = event.clientY;
            var tab = tabs[index];
            var title = this._titles[index];
            // Emit the tab detach requested signal.
            this._tabDetachRequested.emit({ index: index, title: title, tab: tab, clientX: clientX, clientY: clientY });
            // Bail if the signal handler aborted the drag.
            if (data.dragAborted) {
                return;
            }
        }
        // Update the positions of the tabs.
        Private.layoutTabs(tabs, data, event, this._orientation);
    };
    /**
     * Handle the `'mouseup'` event for the document.
     */
    TabBar.prototype._evtMouseUp = function (event) {
        var _this = this;
        // Do nothing if it's not a left or middle mouse release.
        if (event.button !== 0 && event.button !== 1) {
            return;
        }
        // Do nothing if no drag is in progress.
        var data = this._dragData;
        if (!data) {
            return;
        }
        // Stop the event propagation.
        event.preventDefault();
        event.stopPropagation();
        // Remove the extra mouse event listeners.
        document.removeEventListener('mousemove', this, true);
        document.removeEventListener('mouseup', this, true);
        document.removeEventListener('keydown', this, true);
        document.removeEventListener('contextmenu', this, true);
        // Handle a release when the drag is not active.
        if (!data.dragActive) {
            // Clear the drag data.
            this._dragData = null;
            // Lookup the tab nodes.
            var tabs = this.contentNode.children;
            // Find the index of the released tab.
            var index = algorithm_1.ArrayExt.findFirstIndex(tabs, function (tab) {
                return domutils_1.ElementExt.hitTest(tab, event.clientX, event.clientY);
            });
            // Do nothing if the release is not on the original pressed tab.
            if (index !== data.index) {
                return;
            }
            // Ignore the release if the title is not closable.
            var title = this._titles[index];
            if (!title.closable) {
                return;
            }
            // Emit the close requested signal if the middle button is released.
            if (event.button === 1) {
                this._tabCloseRequested.emit({ index: index, title: title });
                return;
            }
            // Emit the close requested signal if the close icon was released.
            var icon = tabs[index].querySelector(this.renderer.closeIconSelector);
            if (icon && icon.contains(event.target)) {
                this._tabCloseRequested.emit({ index: index, title: title });
                return;
            }
            // Otherwise, there is nothing left to do.
            return;
        }
        // Do nothing if the left button is not released.
        if (event.button !== 0) {
            return;
        }
        // Position the tab at its final resting position.
        Private.finalizeTabPosition(data, this._orientation);
        // Remove the dragging class from the tab so it can be transitioned.
        data.tab.classList.remove('lm-mod-dragging');
        /* <DEPRECATED> */
        data.tab.classList.remove('p-mod-dragging');
        /* </DEPRECATED> */
        // Parse the transition duration for releasing the tab.
        var duration = Private.parseTransitionDuration(data.tab);
        // Complete the release on a timer to allow the tab to transition.
        setTimeout(function () {
            // Do nothing if the drag has been aborted.
            if (data.dragAborted) {
                return;
            }
            // Clear the drag data reference.
            _this._dragData = null;
            // Reset the positions of the tabs.
            Private.resetTabPositions(_this.contentNode.children, _this._orientation);
            // Clear the cursor grab.
            data.override.dispose();
            // Remove the remaining dragging style.
            _this.removeClass('lm-mod-dragging');
            /* <DEPRECATED> */
            _this.removeClass('p-mod-dragging');
            /* </DEPRECATED> */
            // If the tab was not moved, there is nothing else to do.
            var i = data.index;
            var j = data.targetIndex;
            if (j === -1 || i === j) {
                return;
            }
            // Move the title to the new locations.
            algorithm_1.ArrayExt.move(_this._titles, i, j);
            // Adjust the current index for the move.
            _this._adjustCurrentForMove(i, j);
            // Emit the tab moved signal.
            _this._tabMoved.emit({
                fromIndex: i, toIndex: j, title: _this._titles[j]
            });
            // Update the tabs immediately to prevent flicker.
            messaging_1.MessageLoop.sendMessage(_this, widget_1.Widget.Msg.UpdateRequest);
        }, duration);
    };
    /**
     * Release the mouse and restore the non-dragged tab positions.
     */
    TabBar.prototype._releaseMouse = function () {
        // Do nothing if no drag is in progress.
        var data = this._dragData;
        if (!data) {
            return;
        }
        // Clear the drag data reference.
        this._dragData = null;
        // Remove the extra mouse listeners.
        document.removeEventListener('mousemove', this, true);
        document.removeEventListener('mouseup', this, true);
        document.removeEventListener('keydown', this, true);
        document.removeEventListener('contextmenu', this, true);
        // Indicate the drag has been aborted. This allows the mouse
        // event handlers to return early when the drag is canceled.
        data.dragAborted = true;
        // If the drag is not active, there's nothing more to do.
        if (!data.dragActive) {
            return;
        }
        // Reset the tabs to their non-dragged positions.
        Private.resetTabPositions(this.contentNode.children, this._orientation);
        // Clear the cursor override.
        data.override.dispose();
        // Clear the dragging style classes.
        data.tab.classList.remove('lm-mod-dragging');
        this.removeClass('lm-mod-dragging');
        /* <DEPRECATED> */
        data.tab.classList.remove('p-mod-dragging');
        this.removeClass('p-mod-dragging');
        /* </DEPRECATED> */
    };
    /**
     * Adjust the current index for a tab insert operation.
     *
     * This method accounts for the tab bar's insertion behavior when
     * adjusting the current index and emitting the changed signal.
     */
    TabBar.prototype._adjustCurrentForInsert = function (i, title) {
        // Lookup commonly used variables.
        var ct = this.currentTitle;
        var ci = this._currentIndex;
        var bh = this.insertBehavior;
        // Handle the behavior where the new tab is always selected,
        // or the behavior where the new tab is selected if needed.
        if (bh === 'select-tab' || (bh === 'select-tab-if-needed' && ci === -1)) {
            this._currentIndex = i;
            this._previousTitle = ct;
            this._currentChanged.emit({
                previousIndex: ci, previousTitle: ct,
                currentIndex: i, currentTitle: title
            });
            return;
        }
        // Otherwise, silently adjust the current index if needed.
        if (ci >= i) {
            this._currentIndex++;
        }
    };
    /**
     * Adjust the current index for a tab move operation.
     *
     * This method will not cause the actual current tab to change.
     * It silently adjusts the index to account for the given move.
     */
    TabBar.prototype._adjustCurrentForMove = function (i, j) {
        if (this._currentIndex === i) {
            this._currentIndex = j;
        }
        else if (this._currentIndex < i && this._currentIndex >= j) {
            this._currentIndex++;
        }
        else if (this._currentIndex > i && this._currentIndex <= j) {
            this._currentIndex--;
        }
    };
    /**
     * Adjust the current index for a tab remove operation.
     *
     * This method accounts for the tab bar's remove behavior when
     * adjusting the current index and emitting the changed signal.
     */
    TabBar.prototype._adjustCurrentForRemove = function (i, title) {
        // Lookup commonly used variables.
        var ci = this._currentIndex;
        var bh = this.removeBehavior;
        // Silently adjust the index if the current tab is not removed.
        if (ci !== i) {
            if (ci > i) {
                this._currentIndex--;
            }
            return;
        }
        // No tab gets selected if the tab bar is empty.
        if (this._titles.length === 0) {
            this._currentIndex = -1;
            this._currentChanged.emit({
                previousIndex: i, previousTitle: title,
                currentIndex: -1, currentTitle: null
            });
            return;
        }
        // Handle behavior where the next sibling tab is selected.
        if (bh === 'select-tab-after') {
            this._currentIndex = Math.min(i, this._titles.length - 1);
            this._currentChanged.emit({
                previousIndex: i, previousTitle: title,
                currentIndex: this._currentIndex, currentTitle: this.currentTitle
            });
            return;
        }
        // Handle behavior where the previous sibling tab is selected.
        if (bh === 'select-tab-before') {
            this._currentIndex = Math.max(0, i - 1);
            this._currentChanged.emit({
                previousIndex: i, previousTitle: title,
                currentIndex: this._currentIndex, currentTitle: this.currentTitle
            });
            return;
        }
        // Handle behavior where the previous history tab is selected.
        if (bh === 'select-previous-tab') {
            if (this._previousTitle) {
                this._currentIndex = this._titles.indexOf(this._previousTitle);
                this._previousTitle = null;
            }
            else {
                this._currentIndex = Math.min(i, this._titles.length - 1);
            }
            this._currentChanged.emit({
                previousIndex: i, previousTitle: title,
                currentIndex: this._currentIndex, currentTitle: this.currentTitle
            });
            return;
        }
        // Otherwise, no tab gets selected.
        this._currentIndex = -1;
        this._currentChanged.emit({
            previousIndex: i, previousTitle: title,
            currentIndex: -1, currentTitle: null
        });
    };
    /**
     * Handle the `changed` signal of a title object.
     */
    TabBar.prototype._onTitleChanged = function (sender) {
        this.update();
    };
    return TabBar;
}(widget_1.Widget));
exports.TabBar = TabBar;
/**
 * The namespace for the `TabBar` class statics.
 */
(function (TabBar) {
    /**
     * The default implementation of `IRenderer`.
     *
     * #### Notes
     * Subclasses are free to reimplement rendering methods as needed.
     */
    var Renderer = /** @class */ (function () {
        /**
         * Construct a new renderer.
         */
        function Renderer() {
            /**
             * A selector which matches the close icon node in a tab.
             */
            this.closeIconSelector = '.lm-TabBar-tabCloseIcon';
            this._tabID = 0;
            this._tabKeys = new WeakMap();
        }
        /**
         * Render the virtual element for a tab.
         *
         * @param data - The data to use for rendering the tab.
         *
         * @returns A virtual element representing the tab.
         */
        Renderer.prototype.renderTab = function (data) {
            var title = data.title.caption;
            var key = this.createTabKey(data);
            var style = this.createTabStyle(data);
            var className = this.createTabClass(data);
            var dataset = this.createTabDataset(data);
            return (virtualdom_1.h.li({ key: key, className: className, title: title, style: style, dataset: dataset }, this.renderIcon(data), this.renderLabel(data), this.renderCloseIcon(data)));
        };
        /**
         * Render the icon element for a tab.
         *
         * @param data - The data to use for rendering the tab.
         *
         * @returns A virtual element representing the tab icon.
         */
        Renderer.prototype.renderIcon = function (data) {
            var title = data.title;
            var className = this.createIconClass(data);
            /* <DEPRECATED> */
            if (typeof title.icon === 'string') {
                return virtualdom_1.h.div({ className: className }, title.iconLabel);
            }
            /* </DEPRECATED> */
            // if title.icon is undefined, it will be ignored
            return virtualdom_1.h.div({ className: className }, title.icon, title.iconLabel);
        };
        /**
         * Render the label element for a tab.
         *
         * @param data - The data to use for rendering the tab.
         *
         * @returns A virtual element representing the tab label.
         */
        Renderer.prototype.renderLabel = function (data) {
            return virtualdom_1.h.div({
                className: 'lm-TabBar-tabLabel'
                    /* <DEPRECATED> */
                    + ' p-TabBar-tabLabel'
                /* </DEPRECATED> */
            }, data.title.label);
        };
        /**
         * Render the close icon element for a tab.
         *
         * @param data - The data to use for rendering the tab.
         *
         * @returns A virtual element representing the tab close icon.
         */
        Renderer.prototype.renderCloseIcon = function (data) {
            return virtualdom_1.h.div({
                className: 'lm-TabBar-tabCloseIcon'
                    /* <DEPRECATED> */
                    + ' p-TabBar-tabCloseIcon'
                /* </DEPRECATED> */
            });
        };
        /**
         * Create a unique render key for the tab.
         *
         * @param data - The data to use for the tab.
         *
         * @returns The unique render key for the tab.
         *
         * #### Notes
         * This method caches the key against the tab title the first time
         * the key is generated. This enables efficient rendering of moved
         * tabs and avoids subtle hover style artifacts.
         */
        Renderer.prototype.createTabKey = function (data) {
            var key = this._tabKeys.get(data.title);
            if (key === undefined) {
                key = "tab-key-" + this._tabID++;
                this._tabKeys.set(data.title, key);
            }
            return key;
        };
        /**
         * Create the inline style object for a tab.
         *
         * @param data - The data to use for the tab.
         *
         * @returns The inline style data for the tab.
         */
        Renderer.prototype.createTabStyle = function (data) {
            return { zIndex: "" + data.zIndex };
        };
        /**
         * Create the class name for the tab.
         *
         * @param data - The data to use for the tab.
         *
         * @returns The full class name for the tab.
         */
        Renderer.prototype.createTabClass = function (data) {
            var name = 'lm-TabBar-tab';
            /* <DEPRECATED> */
            name += ' p-TabBar-tab';
            /* </DEPRECATED> */
            if (data.title.className) {
                name += " " + data.title.className;
            }
            if (data.title.closable) {
                name += ' lm-mod-closable';
                /* <DEPRECATED> */
                name += ' p-mod-closable';
                /* </DEPRECATED> */
            }
            if (data.current) {
                name += ' lm-mod-current';
                /* <DEPRECATED> */
                name += ' p-mod-current';
                /* </DEPRECATED> */
            }
            return name;
        };
        /**
         * Create the dataset for a tab.
         *
         * @param data - The data to use for the tab.
         *
         * @returns The dataset for the tab.
         */
        Renderer.prototype.createTabDataset = function (data) {
            return data.title.dataset;
        };
        /**
         * Create the class name for the tab icon.
         *
         * @param data - The data to use for the tab.
         *
         * @returns The full class name for the tab icon.
         */
        Renderer.prototype.createIconClass = function (data) {
            var name = 'lm-TabBar-tabIcon';
            /* <DEPRECATED> */
            name += ' p-TabBar-tabIcon';
            /* </DEPRECATED> */
            var extra = data.title.iconClass;
            return extra ? name + " " + extra : name;
        };
        return Renderer;
    }());
    TabBar.Renderer = Renderer;
    /**
     * The default `Renderer` instance.
     */
    TabBar.defaultRenderer = new Renderer();
})(TabBar = exports.TabBar || (exports.TabBar = {}));
exports.TabBar = TabBar;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * The start drag distance threshold.
     */
    Private.DRAG_THRESHOLD = 5;
    /**
     * The detach distance threshold.
     */
    Private.DETACH_THRESHOLD = 20;
    /**
     * Create the DOM node for a tab bar.
     */
    function createNode() {
        var node = document.createElement('div');
        var content = document.createElement('ul');
        content.className = 'lm-TabBar-content';
        /* <DEPRECATED> */
        content.classList.add('p-TabBar-content');
        /* </DEPRECATED> */
        node.appendChild(content);
        return node;
    }
    Private.createNode = createNode;
    /**
     * Coerce a title or options into a real title.
     */
    function asTitle(value) {
        return value instanceof title_1.Title ? value : new title_1.Title(value);
    }
    Private.asTitle = asTitle;
    /**
     * Parse the transition duration for a tab node.
     */
    function parseTransitionDuration(tab) {
        var style = window.getComputedStyle(tab);
        return 1000 * (parseFloat(style.transitionDuration) || 0);
    }
    Private.parseTransitionDuration = parseTransitionDuration;
    /**
     * Get a snapshot of the current tab layout values.
     */
    function snapTabLayout(tabs, orientation) {
        var layout = new Array(tabs.length);
        for (var i = 0, n = tabs.length; i < n; ++i) {
            var node = tabs[i];
            var style = window.getComputedStyle(node);
            if (orientation === 'horizontal') {
                layout[i] = {
                    pos: node.offsetLeft,
                    size: node.offsetWidth,
                    margin: parseFloat(style.marginLeft) || 0
                };
            }
            else {
                layout[i] = {
                    pos: node.offsetTop,
                    size: node.offsetHeight,
                    margin: parseFloat(style.marginTop) || 0
                };
            }
        }
        return layout;
    }
    Private.snapTabLayout = snapTabLayout;
    /**
     * Test if the event exceeds the drag threshold.
     */
    function dragExceeded(data, event) {
        var dx = Math.abs(event.clientX - data.pressX);
        var dy = Math.abs(event.clientY - data.pressY);
        return dx >= Private.DRAG_THRESHOLD || dy >= Private.DRAG_THRESHOLD;
    }
    Private.dragExceeded = dragExceeded;
    /**
     * Test if the event exceeds the drag detach threshold.
     */
    function detachExceeded(data, event) {
        var rect = data.contentRect;
        return ((event.clientX < rect.left - Private.DETACH_THRESHOLD) ||
            (event.clientX >= rect.right + Private.DETACH_THRESHOLD) ||
            (event.clientY < rect.top - Private.DETACH_THRESHOLD) ||
            (event.clientY >= rect.bottom + Private.DETACH_THRESHOLD));
    }
    Private.detachExceeded = detachExceeded;
    /**
     * Update the relative tab positions and computed target index.
     */
    function layoutTabs(tabs, data, event, orientation) {
        // Compute the orientation-sensitive values.
        var pressPos;
        var localPos;
        var clientPos;
        var clientSize;
        if (orientation === 'horizontal') {
            pressPos = data.pressX;
            localPos = event.clientX - data.contentRect.left;
            clientPos = event.clientX;
            clientSize = data.contentRect.width;
        }
        else {
            pressPos = data.pressY;
            localPos = event.clientY - data.contentRect.top;
            clientPos = event.clientY;
            clientSize = data.contentRect.height;
        }
        // Compute the target data.
        var targetIndex = data.index;
        var targetPos = localPos - data.tabPressPos;
        var targetEnd = targetPos + data.tabSize;
        // Update the relative tab positions.
        for (var i = 0, n = tabs.length; i < n; ++i) {
            var pxPos = void 0;
            var layout = data.tabLayout[i];
            var threshold = layout.pos + (layout.size >> 1);
            if (i < data.index && targetPos < threshold) {
                pxPos = data.tabSize + data.tabLayout[i + 1].margin + "px";
                targetIndex = Math.min(targetIndex, i);
            }
            else if (i > data.index && targetEnd > threshold) {
                pxPos = -data.tabSize - layout.margin + "px";
                targetIndex = Math.max(targetIndex, i);
            }
            else if (i === data.index) {
                var ideal = clientPos - pressPos;
                var limit = clientSize - (data.tabPos + data.tabSize);
                pxPos = Math.max(-data.tabPos, Math.min(ideal, limit)) + "px";
            }
            else {
                pxPos = '';
            }
            if (orientation === 'horizontal') {
                tabs[i].style.left = pxPos;
            }
            else {
                tabs[i].style.top = pxPos;
            }
        }
        // Update the computed target index.
        data.targetIndex = targetIndex;
    }
    Private.layoutTabs = layoutTabs;
    /**
     * Position the drag tab at its final resting relative position.
     */
    function finalizeTabPosition(data, orientation) {
        // Compute the orientation-sensitive client size.
        var clientSize;
        if (orientation === 'horizontal') {
            clientSize = data.contentRect.width;
        }
        else {
            clientSize = data.contentRect.height;
        }
        // Compute the ideal final tab position.
        var ideal;
        if (data.targetIndex === data.index) {
            ideal = 0;
        }
        else if (data.targetIndex > data.index) {
            var tgt = data.tabLayout[data.targetIndex];
            ideal = tgt.pos + tgt.size - data.tabSize - data.tabPos;
        }
        else {
            var tgt = data.tabLayout[data.targetIndex];
            ideal = tgt.pos - data.tabPos;
        }
        // Compute the tab position limit.
        var limit = clientSize - (data.tabPos + data.tabSize);
        var final = Math.max(-data.tabPos, Math.min(ideal, limit));
        // Set the final orientation-sensitive position.
        if (orientation === 'horizontal') {
            data.tab.style.left = final + "px";
        }
        else {
            data.tab.style.top = final + "px";
        }
    }
    Private.finalizeTabPosition = finalizeTabPosition;
    /**
     * Reset the relative positions of the given tabs.
     */
    function resetTabPositions(tabs, orientation) {
        algorithm_1.each(tabs, function (tab) {
            if (orientation === 'horizontal') {
                tab.style.left = '';
            }
            else {
                tab.style.top = '';
            }
        });
    }
    Private.resetTabPositions = resetTabPositions;
})(Private || (Private = {}));

})
		], [
			/* @lumino/widgets: 46 */
			"lib/stackedpanel.js", ["cjs","js"], {"./panel": 53, "./stackedlayout": 47, "@lumino/signaling": 40}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var signaling_1 = require("@lumino/signaling");
var panel_1 = require("./panel");
var stackedlayout_1 = require("./stackedlayout");
/**
 * A panel where visible widgets are stacked atop one another.
 *
 * #### Notes
 * This class provides a convenience wrapper around a [[StackedLayout]].
 */
var StackedPanel = /** @class */ (function (_super) {
    __extends(StackedPanel, _super);
    /**
     * Construct a new stacked panel.
     *
     * @param options - The options for initializing the panel.
     */
    function StackedPanel(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, { layout: Private.createLayout(options) }) || this;
        _this._widgetRemoved = new signaling_1.Signal(_this);
        _this.addClass('lm-StackedPanel');
        /* <DEPRECATED> */
        _this.addClass('p-StackedPanel');
        return _this;
        /* </DEPRECATED> */
    }
    Object.defineProperty(StackedPanel.prototype, "widgetRemoved", {
        /**
         * A signal emitted when a widget is removed from a stacked panel.
         */
        get: function () {
            return this._widgetRemoved;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * A message handler invoked on a `'child-added'` message.
     */
    StackedPanel.prototype.onChildAdded = function (msg) {
        msg.child.addClass('lm-StackedPanel-child');
        /* <DEPRECATED> */
        msg.child.addClass('p-StackedPanel-child');
        /* </DEPRECATED> */
    };
    /**
     * A message handler invoked on a `'child-removed'` message.
     */
    StackedPanel.prototype.onChildRemoved = function (msg) {
        msg.child.removeClass('lm-StackedPanel-child');
        /* <DEPRECATED> */
        msg.child.removeClass('p-StackedPanel-child');
        /* </DEPRECATED> */
        this._widgetRemoved.emit(msg.child);
    };
    return StackedPanel;
}(panel_1.Panel));
exports.StackedPanel = StackedPanel;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * Create a stacked layout for the given panel options.
     */
    function createLayout(options) {
        return options.layout || new stackedlayout_1.StackedLayout();
    }
    Private.createLayout = createLayout;
})(Private || (Private = {}));

})
		], [
			/* @lumino/widgets: 47 */
			"lib/stackedlayout.js", ["cjs","js"], {"./layout": 56, "./panellayout": 52, "./widget": 42, "@lumino/algorithm": 11, "@lumino/domutils": 33, "@lumino/messaging": 38}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
var domutils_1 = require("@lumino/domutils");
var messaging_1 = require("@lumino/messaging");
var layout_1 = require("./layout");
var panellayout_1 = require("./panellayout");
var widget_1 = require("./widget");
/**
 * A layout where visible widgets are stacked atop one another.
 *
 * #### Notes
 * The Z-order of the visible widgets follows their layout order.
 */
var StackedLayout = /** @class */ (function (_super) {
    __extends(StackedLayout, _super);
    function StackedLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._dirty = false;
        _this._items = [];
        _this._box = null;
        return _this;
    }
    /**
     * Dispose of the resources held by the layout.
     */
    StackedLayout.prototype.dispose = function () {
        // Dispose of the layout items.
        algorithm_1.each(this._items, function (item) { item.dispose(); });
        // Clear the layout state.
        this._box = null;
        this._items.length = 0;
        // Dispose of the rest of the layout.
        _super.prototype.dispose.call(this);
    };
    /**
     * Attach a widget to the parent's DOM node.
     *
     * @param index - The current index of the widget in the layout.
     *
     * @param widget - The widget to attach to the parent.
     *
     * #### Notes
     * This is a reimplementation of the superclass method.
     */
    StackedLayout.prototype.attachWidget = function (index, widget) {
        // Create and add a new layout item for the widget.
        algorithm_1.ArrayExt.insert(this._items, index, new layout_1.LayoutItem(widget));
        // Send a `'before-attach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.BeforeAttach);
        }
        // Add the widget's node to the parent.
        this.parent.node.appendChild(widget.node);
        // Send an `'after-attach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.AfterAttach);
        }
        // Post a fit request for the parent widget.
        this.parent.fit();
    };
    /**
     * Move a widget in the parent's DOM node.
     *
     * @param fromIndex - The previous index of the widget in the layout.
     *
     * @param toIndex - The current index of the widget in the layout.
     *
     * @param widget - The widget to move in the parent.
     *
     * #### Notes
     * This is a reimplementation of the superclass method.
     */
    StackedLayout.prototype.moveWidget = function (fromIndex, toIndex, widget) {
        // Move the layout item for the widget.
        algorithm_1.ArrayExt.move(this._items, fromIndex, toIndex);
        // Post an update request for the parent widget.
        this.parent.update();
    };
    /**
     * Detach a widget from the parent's DOM node.
     *
     * @param index - The previous index of the widget in the layout.
     *
     * @param widget - The widget to detach from the parent.
     *
     * #### Notes
     * This is a reimplementation of the superclass method.
     */
    StackedLayout.prototype.detachWidget = function (index, widget) {
        // Remove the layout item for the widget.
        var item = algorithm_1.ArrayExt.removeAt(this._items, index);
        // Send a `'before-detach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.BeforeDetach);
        }
        // Remove the widget's node from the parent.
        this.parent.node.removeChild(widget.node);
        // Send an `'after-detach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.AfterDetach);
        }
        // Reset the z-index for the widget.
        item.widget.node.style.zIndex = '';
        // Dispose of the layout item.
        item.dispose();
        // Post a fit request for the parent widget.
        this.parent.fit();
    };
    /**
     * A message handler invoked on a `'before-show'` message.
     */
    StackedLayout.prototype.onBeforeShow = function (msg) {
        _super.prototype.onBeforeShow.call(this, msg);
        this.parent.update();
    };
    /**
     * A message handler invoked on a `'before-attach'` message.
     */
    StackedLayout.prototype.onBeforeAttach = function (msg) {
        _super.prototype.onBeforeAttach.call(this, msg);
        this.parent.fit();
    };
    /**
     * A message handler invoked on a `'child-shown'` message.
     */
    StackedLayout.prototype.onChildShown = function (msg) {
        this.parent.fit();
    };
    /**
     * A message handler invoked on a `'child-hidden'` message.
     */
    StackedLayout.prototype.onChildHidden = function (msg) {
        this.parent.fit();
    };
    /**
     * A message handler invoked on a `'resize'` message.
     */
    StackedLayout.prototype.onResize = function (msg) {
        if (this.parent.isVisible) {
            this._update(msg.width, msg.height);
        }
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    StackedLayout.prototype.onUpdateRequest = function (msg) {
        if (this.parent.isVisible) {
            this._update(-1, -1);
        }
    };
    /**
     * A message handler invoked on a `'fit-request'` message.
     */
    StackedLayout.prototype.onFitRequest = function (msg) {
        if (this.parent.isAttached) {
            this._fit();
        }
    };
    /**
     * Fit the layout to the total size required by the widgets.
     */
    StackedLayout.prototype._fit = function () {
        // Set up the computed minimum size.
        var minW = 0;
        var minH = 0;
        // Update the computed minimum size.
        for (var i = 0, n = this._items.length; i < n; ++i) {
            // Fetch the item.
            var item = this._items[i];
            // Ignore hidden items.
            if (item.isHidden) {
                continue;
            }
            // Update the size limits for the item.
            item.fit();
            // Update the computed minimum size.
            minW = Math.max(minW, item.minWidth);
            minH = Math.max(minH, item.minHeight);
        }
        // Update the box sizing and add it to the computed min size.
        var box = this._box = domutils_1.ElementExt.boxSizing(this.parent.node);
        minW += box.horizontalSum;
        minH += box.verticalSum;
        // Update the parent's min size constraints.
        var style = this.parent.node.style;
        style.minWidth = minW + "px";
        style.minHeight = minH + "px";
        // Set the dirty flag to ensure only a single update occurs.
        this._dirty = true;
        // Notify the ancestor that it should fit immediately. This may
        // cause a resize of the parent, fulfilling the required update.
        if (this.parent.parent) {
            messaging_1.MessageLoop.sendMessage(this.parent.parent, widget_1.Widget.Msg.FitRequest);
        }
        // If the dirty flag is still set, the parent was not resized.
        // Trigger the required update on the parent widget immediately.
        if (this._dirty) {
            messaging_1.MessageLoop.sendMessage(this.parent, widget_1.Widget.Msg.UpdateRequest);
        }
    };
    /**
     * Update the layout position and size of the widgets.
     *
     * The parent offset dimensions should be `-1` if unknown.
     */
    StackedLayout.prototype._update = function (offsetWidth, offsetHeight) {
        // Clear the dirty flag to indicate the update occurred.
        this._dirty = false;
        // Compute the visible item count.
        var nVisible = 0;
        for (var i = 0, n = this._items.length; i < n; ++i) {
            nVisible += +!this._items[i].isHidden;
        }
        // Bail early if there are no visible items to layout.
        if (nVisible === 0) {
            return;
        }
        // Measure the parent if the offset dimensions are unknown.
        if (offsetWidth < 0) {
            offsetWidth = this.parent.node.offsetWidth;
        }
        if (offsetHeight < 0) {
            offsetHeight = this.parent.node.offsetHeight;
        }
        // Ensure the parent box sizing data is computed.
        if (!this._box) {
            this._box = domutils_1.ElementExt.boxSizing(this.parent.node);
        }
        // Compute the actual layout bounds adjusted for border and padding.
        var top = this._box.paddingTop;
        var left = this._box.paddingLeft;
        var width = offsetWidth - this._box.horizontalSum;
        var height = offsetHeight - this._box.verticalSum;
        // Update the widget stacking order and layout geometry.
        for (var i = 0, n = this._items.length; i < n; ++i) {
            // Fetch the item.
            var item = this._items[i];
            // Ignore hidden items.
            if (item.isHidden) {
                continue;
            }
            // Set the z-index for the widget.
            item.widget.node.style.zIndex = "" + i;
            // Update the item geometry.
            item.update(left, top, width, height);
        }
    };
    return StackedLayout;
}(panellayout_1.PanelLayout));
exports.StackedLayout = StackedLayout;

})
		], [
			/* @lumino/widgets: 48 */
			"lib/splitpanel.js", ["cjs","js"], {"./panel": 53, "./splitlayout": 49, "@lumino/algorithm": 11, "@lumino/dragdrop": 36}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
var dragdrop_1 = require("@lumino/dragdrop");
var panel_1 = require("./panel");
var splitlayout_1 = require("./splitlayout");
/**
 * A panel which arranges its widgets into resizable sections.
 *
 * #### Notes
 * This class provides a convenience wrapper around a [[SplitLayout]].
 */
var SplitPanel = /** @class */ (function (_super) {
    __extends(SplitPanel, _super);
    /**
     * Construct a new split panel.
     *
     * @param options - The options for initializing the split panel.
     */
    function SplitPanel(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, { layout: Private.createLayout(options) }) || this;
        _this._pressData = null;
        _this.addClass('lm-SplitPanel');
        /* <DEPRECATED> */
        _this.addClass('p-SplitPanel');
        return _this;
        /* </DEPRECATED> */
    }
    /**
     * Dispose of the resources held by the panel.
     */
    SplitPanel.prototype.dispose = function () {
        this._releaseMouse();
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(SplitPanel.prototype, "orientation", {
        /**
         * Get the layout orientation for the split panel.
         */
        get: function () {
            return this.layout.orientation;
        },
        /**
         * Set the layout orientation for the split panel.
         */
        set: function (value) {
            this.layout.orientation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitPanel.prototype, "alignment", {
        /**
         * Get the content alignment for the split panel.
         *
         * #### Notes
         * This is the alignment of the widgets in the layout direction.
         *
         * The alignment has no effect if the widgets can expand to fill the
         * entire split panel.
         */
        get: function () {
            return this.layout.alignment;
        },
        /**
         * Set the content alignment for the split panel.
         *
         * #### Notes
         * This is the alignment of the widgets in the layout direction.
         *
         * The alignment has no effect if the widgets can expand to fill the
         * entire split panel.
         */
        set: function (value) {
            this.layout.alignment = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitPanel.prototype, "spacing", {
        /**
         * Get the inter-element spacing for the split panel.
         */
        get: function () {
            return this.layout.spacing;
        },
        /**
         * Set the inter-element spacing for the split panel.
         */
        set: function (value) {
            this.layout.spacing = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitPanel.prototype, "renderer", {
        /**
         * The renderer used by the split panel.
         */
        get: function () {
            return this.layout.renderer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitPanel.prototype, "handles", {
        /**
         * A read-only array of the split handles in the panel.
         */
        get: function () {
            return this.layout.handles;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the relative sizes of the widgets in the panel.
     *
     * @returns A new array of the relative sizes of the widgets.
     *
     * #### Notes
     * The returned sizes reflect the sizes of the widgets normalized
     * relative to their siblings.
     *
     * This method **does not** measure the DOM nodes.
     */
    SplitPanel.prototype.relativeSizes = function () {
        return this.layout.relativeSizes();
    };
    /**
     * Set the relative sizes for the widgets in the panel.
     *
     * @param sizes - The relative sizes for the widgets in the panel.
     *
     * #### Notes
     * Extra values are ignored, too few will yield an undefined layout.
     *
     * The actual geometry of the DOM nodes is updated asynchronously.
     */
    SplitPanel.prototype.setRelativeSizes = function (sizes) {
        this.layout.setRelativeSizes(sizes);
    };
    /**
     * Handle the DOM events for the split panel.
     *
     * @param event - The DOM event sent to the panel.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the panel's DOM node. It should
     * not be called directly by user code.
     */
    SplitPanel.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'mousedown':
                this._evtMouseDown(event);
                break;
            case 'mousemove':
                this._evtMouseMove(event);
                break;
            case 'mouseup':
                this._evtMouseUp(event);
                break;
            case 'keydown':
                this._evtKeyDown(event);
                break;
            case 'contextmenu':
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    };
    /**
     * A message handler invoked on a `'before-attach'` message.
     */
    SplitPanel.prototype.onBeforeAttach = function (msg) {
        this.node.addEventListener('mousedown', this);
    };
    /**
     * A message handler invoked on an `'after-detach'` message.
     */
    SplitPanel.prototype.onAfterDetach = function (msg) {
        this.node.removeEventListener('mousedown', this);
        this._releaseMouse();
    };
    /**
     * A message handler invoked on a `'child-added'` message.
     */
    SplitPanel.prototype.onChildAdded = function (msg) {
        msg.child.addClass('lm-SplitPanel-child');
        /* <DEPRECATED> */
        msg.child.addClass('p-SplitPanel-child');
        /* </DEPRECATED> */
        this._releaseMouse();
    };
    /**
     * A message handler invoked on a `'child-removed'` message.
     */
    SplitPanel.prototype.onChildRemoved = function (msg) {
        msg.child.removeClass('lm-SplitPanel-child');
        /* <DEPRECATED> */
        msg.child.removeClass('p-SplitPanel-child');
        /* </DEPRECATED> */
        this._releaseMouse();
    };
    /**
     * Handle the `'keydown'` event for the split panel.
     */
    SplitPanel.prototype._evtKeyDown = function (event) {
        // Stop input events during drag.
        event.preventDefault();
        event.stopPropagation();
        // Release the mouse if `Escape` is pressed.
        if (event.keyCode === 27) {
            this._releaseMouse();
        }
    };
    /**
     * Handle the `'mousedown'` event for the split panel.
     */
    SplitPanel.prototype._evtMouseDown = function (event) {
        // Do nothing if the left mouse button is not pressed.
        if (event.button !== 0) {
            return;
        }
        // Find the handle which contains the mouse target, if any.
        var layout = this.layout;
        var index = algorithm_1.ArrayExt.findFirstIndex(layout.handles, function (handle) {
            return handle.contains(event.target);
        });
        // Bail early if the mouse press was not on a handle.
        if (index === -1) {
            return;
        }
        // Stop the event when a split handle is pressed.
        event.preventDefault();
        event.stopPropagation();
        // Add the extra document listeners.
        document.addEventListener('mouseup', this, true);
        document.addEventListener('mousemove', this, true);
        document.addEventListener('keydown', this, true);
        document.addEventListener('contextmenu', this, true);
        // Compute the offset delta for the handle press.
        var delta;
        var handle = layout.handles[index];
        var rect = handle.getBoundingClientRect();
        if (layout.orientation === 'horizontal') {
            delta = event.clientX - rect.left;
        }
        else {
            delta = event.clientY - rect.top;
        }
        // Override the cursor and store the press data.
        var style = window.getComputedStyle(handle);
        var override = dragdrop_1.Drag.overrideCursor(style.cursor);
        this._pressData = { index: index, delta: delta, override: override };
    };
    /**
     * Handle the `'mousemove'` event for the split panel.
     */
    SplitPanel.prototype._evtMouseMove = function (event) {
        // Stop the event when dragging a split handle.
        event.preventDefault();
        event.stopPropagation();
        // Compute the desired offset position for the handle.
        var pos;
        var layout = this.layout;
        var rect = this.node.getBoundingClientRect();
        if (layout.orientation === 'horizontal') {
            pos = event.clientX - rect.left - this._pressData.delta;
        }
        else {
            pos = event.clientY - rect.top - this._pressData.delta;
        }
        // Move the handle as close to the desired position as possible.
        layout.moveHandle(this._pressData.index, pos);
    };
    /**
     * Handle the `'mouseup'` event for the split panel.
     */
    SplitPanel.prototype._evtMouseUp = function (event) {
        // Do nothing if the left mouse button is not released.
        if (event.button !== 0) {
            return;
        }
        // Stop the event when releasing a handle.
        event.preventDefault();
        event.stopPropagation();
        // Finalize the mouse release.
        this._releaseMouse();
    };
    /**
     * Release the mouse grab for the split panel.
     */
    SplitPanel.prototype._releaseMouse = function () {
        // Bail early if no drag is in progress.
        if (!this._pressData) {
            return;
        }
        // Clear the override cursor.
        this._pressData.override.dispose();
        this._pressData = null;
        // Remove the extra document listeners.
        document.removeEventListener('mouseup', this, true);
        document.removeEventListener('mousemove', this, true);
        document.removeEventListener('keydown', this, true);
        document.removeEventListener('contextmenu', this, true);
    };
    return SplitPanel;
}(panel_1.Panel));
exports.SplitPanel = SplitPanel;
/**
 * The namespace for the `SplitPanel` class statics.
 */
(function (SplitPanel) {
    /**
     * The default implementation of `IRenderer`.
     */
    var Renderer = /** @class */ (function () {
        function Renderer() {
        }
        /**
         * Create a new handle for use with a split panel.
         *
         * @returns A new handle element for a split panel.
         */
        Renderer.prototype.createHandle = function () {
            var handle = document.createElement('div');
            handle.className = 'lm-SplitPanel-handle';
            /* <DEPRECATED> */
            handle.classList.add('p-SplitPanel-handle');
            /* </DEPRECATED> */
            return handle;
        };
        return Renderer;
    }());
    SplitPanel.Renderer = Renderer;
    /**
     * The default `Renderer` instance.
     */
    SplitPanel.defaultRenderer = new Renderer();
    /**
     * Get the split panel stretch factor for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The split panel stretch factor for the widget.
     */
    function getStretch(widget) {
        return splitlayout_1.SplitLayout.getStretch(widget);
    }
    SplitPanel.getStretch = getStretch;
    /**
     * Set the split panel stretch factor for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @param value - The value for the stretch factor.
     */
    function setStretch(widget, value) {
        splitlayout_1.SplitLayout.setStretch(widget, value);
    }
    SplitPanel.setStretch = setStretch;
})(SplitPanel = exports.SplitPanel || (exports.SplitPanel = {}));
exports.SplitPanel = SplitPanel;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * Create a split layout for the given panel options.
     */
    function createLayout(options) {
        return options.layout || new splitlayout_1.SplitLayout({
            renderer: options.renderer || SplitPanel.defaultRenderer,
            orientation: options.orientation,
            alignment: options.alignment,
            spacing: options.spacing
        });
    }
    Private.createLayout = createLayout;
})(Private || (Private = {}));

})
		], [
			/* @lumino/widgets: 49 */
			"lib/splitlayout.js", ["cjs","js"], {"./boxengine": 66, "./layout": 56, "./panellayout": 52, "./widget": 42, "@lumino/algorithm": 11, "@lumino/domutils": 33, "@lumino/messaging": 38, "@lumino/properties": 39}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
var domutils_1 = require("@lumino/domutils");
var messaging_1 = require("@lumino/messaging");
var properties_1 = require("@lumino/properties");
var boxengine_1 = require("./boxengine");
var layout_1 = require("./layout");
var panellayout_1 = require("./panellayout");
var widget_1 = require("./widget");
/**
 * A layout which arranges its widgets into resizable sections.
 */
var SplitLayout = /** @class */ (function (_super) {
    __extends(SplitLayout, _super);
    /**
     * Construct a new split layout.
     *
     * @param options - The options for initializing the layout.
     */
    function SplitLayout(options) {
        var _this = _super.call(this) || this;
        _this._fixed = 0;
        _this._spacing = 4;
        _this._dirty = false;
        _this._hasNormedSizes = false;
        _this._sizers = [];
        _this._items = [];
        _this._handles = [];
        _this._box = null;
        _this._alignment = 'start';
        _this._orientation = 'horizontal';
        _this.renderer = options.renderer;
        if (options.orientation !== undefined) {
            _this._orientation = options.orientation;
        }
        if (options.alignment !== undefined) {
            _this._alignment = options.alignment;
        }
        if (options.spacing !== undefined) {
            _this._spacing = Private.clampSpacing(options.spacing);
        }
        return _this;
    }
    /**
     * Dispose of the resources held by the layout.
     */
    SplitLayout.prototype.dispose = function () {
        // Dispose of the layout items.
        algorithm_1.each(this._items, function (item) { item.dispose(); });
        // Clear the layout state.
        this._box = null;
        this._items.length = 0;
        this._sizers.length = 0;
        this._handles.length = 0;
        // Dispose of the rest of the layout.
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(SplitLayout.prototype, "orientation", {
        /**
         * Get the layout orientation for the split layout.
         */
        get: function () {
            return this._orientation;
        },
        /**
         * Set the layout orientation for the split layout.
         */
        set: function (value) {
            if (this._orientation === value) {
                return;
            }
            this._orientation = value;
            if (!this.parent) {
                return;
            }
            this.parent.dataset['orientation'] = value;
            this.parent.fit();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitLayout.prototype, "alignment", {
        /**
         * Get the content alignment for the split layout.
         *
         * #### Notes
         * This is the alignment of the widgets in the layout direction.
         *
         * The alignment has no effect if the widgets can expand  to fill the
         * entire split layout.
         */
        get: function () {
            return this._alignment;
        },
        /**
         * Set the content alignment for the split layout.
         *
         * #### Notes
         * This is the alignment of the widgets in the layout direction.
         *
         * The alignment has no effect if the widgets can expand  to fill the
         * entire split layout.
         */
        set: function (value) {
            if (this._alignment === value) {
                return;
            }
            this._alignment = value;
            if (!this.parent) {
                return;
            }
            this.parent.dataset['alignment'] = value;
            this.parent.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitLayout.prototype, "spacing", {
        /**
         * Get the inter-element spacing for the split layout.
         */
        get: function () {
            return this._spacing;
        },
        /**
         * Set the inter-element spacing for the split layout.
         */
        set: function (value) {
            value = Private.clampSpacing(value);
            if (this._spacing === value) {
                return;
            }
            this._spacing = value;
            if (!this.parent) {
                return;
            }
            this.parent.fit();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitLayout.prototype, "handles", {
        /**
         * A read-only array of the split handles in the layout.
         */
        get: function () {
            return this._handles;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the relative sizes of the widgets in the layout.
     *
     * @returns A new array of the relative sizes of the widgets.
     *
     * #### Notes
     * The returned sizes reflect the sizes of the widgets normalized
     * relative to their siblings.
     *
     * This method **does not** measure the DOM nodes.
     */
    SplitLayout.prototype.relativeSizes = function () {
        return Private.normalize(this._sizers.map(function (sizer) { return sizer.size; }));
    };
    /**
     * Set the relative sizes for the widgets in the layout.
     *
     * @param sizes - The relative sizes for the widgets in the panel.
     *
     * #### Notes
     * Extra values are ignored, too few will yield an undefined layout.
     *
     * The actual geometry of the DOM nodes is updated asynchronously.
     */
    SplitLayout.prototype.setRelativeSizes = function (sizes) {
        // Copy the sizes and pad with zeros as needed.
        var n = this._sizers.length;
        var temp = sizes.slice(0, n);
        while (temp.length < n) {
            temp.push(0);
        }
        // Normalize the padded sizes.
        var normed = Private.normalize(temp);
        // Apply the normalized sizes to the sizers.
        for (var i = 0; i < n; ++i) {
            var sizer = this._sizers[i];
            sizer.sizeHint = normed[i];
            sizer.size = normed[i];
        }
        // Set the flag indicating the sizes are normalized.
        this._hasNormedSizes = true;
        // Trigger an update of the parent widget.
        if (this.parent) {
            this.parent.update();
        }
    };
    /**
     * Move the offset position of a split handle.
     *
     * @param index - The index of the handle of the interest.
     *
     * @param position - The desired offset position of the handle.
     *
     * #### Notes
     * The position is relative to the offset parent.
     *
     * This will move the handle as close as possible to the desired
     * position. The sibling widgets will be adjusted as necessary.
     */
    SplitLayout.prototype.moveHandle = function (index, position) {
        // Bail if the index is invalid or the handle is hidden.
        var handle = this._handles[index];
        if (!handle || handle.classList.contains('lm-mod-hidden')) {
            return;
        }
        // Compute the desired delta movement for the handle.
        var delta;
        if (this._orientation === 'horizontal') {
            delta = position - handle.offsetLeft;
        }
        else {
            delta = position - handle.offsetTop;
        }
        // Bail if there is no handle movement.
        if (delta === 0) {
            return;
        }
        // Prevent widget resizing unless needed.
        for (var _i = 0, _a = this._sizers; _i < _a.length; _i++) {
            var sizer = _a[_i];
            if (sizer.size > 0) {
                sizer.sizeHint = sizer.size;
            }
        }
        // Adjust the sizers to reflect the handle movement.
        boxengine_1.BoxEngine.adjust(this._sizers, index, delta);
        // Update the layout of the widgets.
        if (this.parent) {
            this.parent.update();
        }
    };
    /**
     * Perform layout initialization which requires the parent widget.
     */
    SplitLayout.prototype.init = function () {
        this.parent.dataset['orientation'] = this.orientation;
        this.parent.dataset['alignment'] = this.alignment;
        _super.prototype.init.call(this);
    };
    /**
     * Attach a widget to the parent's DOM node.
     *
     * @param index - The current index of the widget in the layout.
     *
     * @param widget - The widget to attach to the parent.
     *
     * #### Notes
     * This is a reimplementation of the superclass method.
     */
    SplitLayout.prototype.attachWidget = function (index, widget) {
        // Create the item, handle, and sizer for the new widget.
        var item = new layout_1.LayoutItem(widget);
        var handle = Private.createHandle(this.renderer);
        var average = Private.averageSize(this._sizers);
        var sizer = Private.createSizer(average);
        // Insert the item, handle, and sizer into the internal arrays.
        algorithm_1.ArrayExt.insert(this._items, index, item);
        algorithm_1.ArrayExt.insert(this._sizers, index, sizer);
        algorithm_1.ArrayExt.insert(this._handles, index, handle);
        // Send a `'before-attach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.BeforeAttach);
        }
        // Add the widget and handle nodes to the parent.
        this.parent.node.appendChild(widget.node);
        this.parent.node.appendChild(handle);
        // Send an `'after-attach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.AfterAttach);
        }
        // Post a fit request for the parent widget.
        this.parent.fit();
    };
    /**
     * Move a widget in the parent's DOM node.
     *
     * @param fromIndex - The previous index of the widget in the layout.
     *
     * @param toIndex - The current index of the widget in the layout.
     *
     * @param widget - The widget to move in the parent.
     *
     * #### Notes
     * This is a reimplementation of the superclass method.
     */
    SplitLayout.prototype.moveWidget = function (fromIndex, toIndex, widget) {
        // Move the item, sizer, and handle for the widget.
        algorithm_1.ArrayExt.move(this._items, fromIndex, toIndex);
        algorithm_1.ArrayExt.move(this._sizers, fromIndex, toIndex);
        algorithm_1.ArrayExt.move(this._handles, fromIndex, toIndex);
        // Post a fit request to the parent to show/hide last handle.
        this.parent.fit();
    };
    /**
     * Detach a widget from the parent's DOM node.
     *
     * @param index - The previous index of the widget in the layout.
     *
     * @param widget - The widget to detach from the parent.
     *
     * #### Notes
     * This is a reimplementation of the superclass method.
     */
    SplitLayout.prototype.detachWidget = function (index, widget) {
        // Remove the item, handle, and sizer for the widget.
        var item = algorithm_1.ArrayExt.removeAt(this._items, index);
        var handle = algorithm_1.ArrayExt.removeAt(this._handles, index);
        algorithm_1.ArrayExt.removeAt(this._sizers, index);
        // Send a `'before-detach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.BeforeDetach);
        }
        // Remove the widget and handle nodes from the parent.
        this.parent.node.removeChild(widget.node);
        this.parent.node.removeChild(handle);
        // Send an `'after-detach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.AfterDetach);
        }
        // Dispose of the layout item.
        item.dispose();
        // Post a fit request for the parent widget.
        this.parent.fit();
    };
    /**
     * A message handler invoked on a `'before-show'` message.
     */
    SplitLayout.prototype.onBeforeShow = function (msg) {
        _super.prototype.onBeforeShow.call(this, msg);
        this.parent.update();
    };
    /**
     * A message handler invoked on a `'before-attach'` message.
     */
    SplitLayout.prototype.onBeforeAttach = function (msg) {
        _super.prototype.onBeforeAttach.call(this, msg);
        this.parent.fit();
    };
    /**
     * A message handler invoked on a `'child-shown'` message.
     */
    SplitLayout.prototype.onChildShown = function (msg) {
        this.parent.fit();
    };
    /**
     * A message handler invoked on a `'child-hidden'` message.
     */
    SplitLayout.prototype.onChildHidden = function (msg) {
        this.parent.fit();
    };
    /**
     * A message handler invoked on a `'resize'` message.
     */
    SplitLayout.prototype.onResize = function (msg) {
        if (this.parent.isVisible) {
            this._update(msg.width, msg.height);
        }
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    SplitLayout.prototype.onUpdateRequest = function (msg) {
        if (this.parent.isVisible) {
            this._update(-1, -1);
        }
    };
    /**
     * A message handler invoked on a `'fit-request'` message.
     */
    SplitLayout.prototype.onFitRequest = function (msg) {
        if (this.parent.isAttached) {
            this._fit();
        }
    };
    /**
     * Fit the layout to the total size required by the widgets.
     */
    SplitLayout.prototype._fit = function () {
        // Update the handles and track the visible widget count.
        var nVisible = 0;
        var lastHandleIndex = -1;
        for (var i = 0, n = this._items.length; i < n; ++i) {
            if (this._items[i].isHidden) {
                this._handles[i].classList.add('lm-mod-hidden');
                /* <DEPRECATED> */
                this._handles[i].classList.add('p-mod-hidden');
                /* </DEPRECATED> */
            }
            else {
                this._handles[i].classList.remove('lm-mod-hidden');
                /* <DEPRECATED> */
                this._handles[i].classList.remove('p-mod-hidden');
                /* </DEPRECATED> */
                lastHandleIndex = i;
                nVisible++;
            }
        }
        // Hide the handle for the last visible widget.
        if (lastHandleIndex !== -1) {
            this._handles[lastHandleIndex].classList.add('lm-mod-hidden');
            /* <DEPRECATED> */
            this._handles[lastHandleIndex].classList.add('p-mod-hidden');
            /* </DEPRECATED> */
        }
        // Update the fixed space for the visible items.
        this._fixed = this._spacing * Math.max(0, nVisible - 1);
        // Setup the computed minimum size.
        var horz = this._orientation === 'horizontal';
        var minW = horz ? this._fixed : 0;
        var minH = horz ? 0 : this._fixed;
        // Update the sizers and computed size limits.
        for (var i = 0, n = this._items.length; i < n; ++i) {
            // Fetch the item and corresponding box sizer.
            var item = this._items[i];
            var sizer = this._sizers[i];
            // Prevent resizing unless necessary.
            if (sizer.size > 0) {
                sizer.sizeHint = sizer.size;
            }
            // If the item is hidden, it should consume zero size.
            if (item.isHidden) {
                sizer.minSize = 0;
                sizer.maxSize = 0;
                continue;
            }
            // Update the size limits for the item.
            item.fit();
            // Update the stretch factor.
            sizer.stretch = SplitLayout.getStretch(item.widget);
            // Update the sizer limits and computed min size.
            if (horz) {
                sizer.minSize = item.minWidth;
                sizer.maxSize = item.maxWidth;
                minW += item.minWidth;
                minH = Math.max(minH, item.minHeight);
            }
            else {
                sizer.minSize = item.minHeight;
                sizer.maxSize = item.maxHeight;
                minH += item.minHeight;
                minW = Math.max(minW, item.minWidth);
            }
        }
        // Update the box sizing and add it to the computed min size.
        var box = this._box = domutils_1.ElementExt.boxSizing(this.parent.node);
        minW += box.horizontalSum;
        minH += box.verticalSum;
        // Update the parent's min size constraints.
        var style = this.parent.node.style;
        style.minWidth = minW + "px";
        style.minHeight = minH + "px";
        // Set the dirty flag to ensure only a single update occurs.
        this._dirty = true;
        // Notify the ancestor that it should fit immediately. This may
        // cause a resize of the parent, fulfilling the required update.
        if (this.parent.parent) {
            messaging_1.MessageLoop.sendMessage(this.parent.parent, widget_1.Widget.Msg.FitRequest);
        }
        // If the dirty flag is still set, the parent was not resized.
        // Trigger the required update on the parent widget immediately.
        if (this._dirty) {
            messaging_1.MessageLoop.sendMessage(this.parent, widget_1.Widget.Msg.UpdateRequest);
        }
    };
    /**
     * Update the layout position and size of the widgets.
     *
     * The parent offset dimensions should be `-1` if unknown.
     */
    SplitLayout.prototype._update = function (offsetWidth, offsetHeight) {
        // Clear the dirty flag to indicate the update occurred.
        this._dirty = false;
        // Compute the visible item count.
        var nVisible = 0;
        for (var i = 0, n = this._items.length; i < n; ++i) {
            nVisible += +!this._items[i].isHidden;
        }
        // Bail early if there are no visible items to layout.
        if (nVisible === 0) {
            return;
        }
        // Measure the parent if the offset dimensions are unknown.
        if (offsetWidth < 0) {
            offsetWidth = this.parent.node.offsetWidth;
        }
        if (offsetHeight < 0) {
            offsetHeight = this.parent.node.offsetHeight;
        }
        // Ensure the parent box sizing data is computed.
        if (!this._box) {
            this._box = domutils_1.ElementExt.boxSizing(this.parent.node);
        }
        // Compute the actual layout bounds adjusted for border and padding.
        var top = this._box.paddingTop;
        var left = this._box.paddingLeft;
        var width = offsetWidth - this._box.horizontalSum;
        var height = offsetHeight - this._box.verticalSum;
        // Compute the adjusted layout space.
        var space;
        var horz = this._orientation === 'horizontal';
        if (horz) {
            space = Math.max(0, width - this._fixed);
        }
        else {
            space = Math.max(0, height - this._fixed);
        }
        // Scale the size hints if they are normalized.
        if (this._hasNormedSizes) {
            for (var _i = 0, _a = this._sizers; _i < _a.length; _i++) {
                var sizer = _a[_i];
                sizer.sizeHint *= space;
            }
            this._hasNormedSizes = false;
        }
        // Distribute the layout space to the box sizers.
        var delta = boxengine_1.BoxEngine.calc(this._sizers, space);
        // Set up the variables for justification and alignment offset.
        var extra = 0;
        var offset = 0;
        // Account for alignment if there is extra layout space.
        if (delta > 0) {
            switch (this._alignment) {
                case 'start':
                    break;
                case 'center':
                    extra = 0;
                    offset = delta / 2;
                    break;
                case 'end':
                    extra = 0;
                    offset = delta;
                    break;
                case 'justify':
                    extra = delta / nVisible;
                    offset = 0;
                    break;
                default:
                    throw 'unreachable';
            }
        }
        // Layout the items using the computed box sizes.
        for (var i = 0, n = this._items.length; i < n; ++i) {
            // Fetch the item.
            var item = this._items[i];
            // Ignore hidden items.
            if (item.isHidden) {
                continue;
            }
            // Fetch the computed size for the widget.
            var size = this._sizers[i].size;
            // Fetch the style for the handle.
            var handleStyle = this._handles[i].style;
            // Update the widget and handle, and advance the relevant edge.
            if (horz) {
                item.update(left + offset, top, size + extra, height);
                left += size + extra;
                handleStyle.top = top + "px";
                handleStyle.left = left + offset + "px";
                handleStyle.width = this._spacing + "px";
                handleStyle.height = height + "px";
                left += this._spacing;
            }
            else {
                item.update(left, top + offset, width, size + extra);
                top += size + extra;
                handleStyle.top = top + offset + "px";
                handleStyle.left = left + "px";
                handleStyle.width = width + "px";
                handleStyle.height = this._spacing + "px";
                top += this._spacing;
            }
        }
    };
    return SplitLayout;
}(panellayout_1.PanelLayout));
exports.SplitLayout = SplitLayout;
/**
 * The namespace for the `SplitLayout` class statics.
 */
(function (SplitLayout) {
    /**
     * Get the split layout stretch factor for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The split layout stretch factor for the widget.
     */
    function getStretch(widget) {
        return Private.stretchProperty.get(widget);
    }
    SplitLayout.getStretch = getStretch;
    /**
     * Set the split layout stretch factor for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @param value - The value for the stretch factor.
     */
    function setStretch(widget, value) {
        Private.stretchProperty.set(widget, value);
    }
    SplitLayout.setStretch = setStretch;
})(SplitLayout = exports.SplitLayout || (exports.SplitLayout = {}));
exports.SplitLayout = SplitLayout;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * The property descriptor for a widget stretch factor.
     */
    Private.stretchProperty = new properties_1.AttachedProperty({
        name: 'stretch',
        create: function () { return 0; },
        coerce: function (owner, value) { return Math.max(0, Math.floor(value)); },
        changed: onChildSizingChanged
    });
    /**
     * Create a new box sizer with the given size hint.
     */
    function createSizer(size) {
        var sizer = new boxengine_1.BoxSizer();
        sizer.sizeHint = Math.floor(size);
        return sizer;
    }
    Private.createSizer = createSizer;
    /**
     * Create a new split handle node using the given renderer.
     */
    function createHandle(renderer) {
        var handle = renderer.createHandle();
        handle.style.position = 'absolute';
        return handle;
    }
    Private.createHandle = createHandle;
    /**
     * Clamp a spacing value to an integer >= 0.
     */
    function clampSpacing(value) {
        return Math.max(0, Math.floor(value));
    }
    Private.clampSpacing = clampSpacing;
    /**
     * Compute the average size of an array of box sizers.
     */
    function averageSize(sizers) {
        return sizers.reduce(function (v, s) { return v + s.size; }, 0) / sizers.length || 0;
    }
    Private.averageSize = averageSize;
    /**
     * Normalize an array of values.
     */
    function normalize(values) {
        var n = values.length;
        if (n === 0) {
            return [];
        }
        var sum = values.reduce(function (a, b) { return a + Math.abs(b); }, 0);
        return sum === 0 ? values.map(function (v) { return 1 / n; }) : values.map(function (v) { return v / sum; });
    }
    Private.normalize = normalize;
    /**
     * The change handler for the attached sizing properties.
     */
    function onChildSizingChanged(child) {
        if (child.parent && child.parent.layout instanceof SplitLayout) {
            child.parent.fit();
        }
    }
})(Private || (Private = {}));

})
		], [
			/* @lumino/widgets: 50 */
			"lib/singletonlayout.js", ["cjs","js"], {"./layout": 56, "./widget": 42, "@lumino/algorithm": 11, "@lumino/messaging": 38}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
var messaging_1 = require("@lumino/messaging");
var layout_1 = require("./layout");
var widget_1 = require("./widget");
/**
 * A concrete layout implementation which holds a single widget.
 *
 * #### Notes
 * This class is useful for creating simple container widgets which
 * hold a single child. The child should be positioned with CSS.
 */
var SingletonLayout = /** @class */ (function (_super) {
    __extends(SingletonLayout, _super);
    function SingletonLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._widget = null;
        return _this;
    }
    /**
     * Dispose of the resources held by the layout.
     */
    SingletonLayout.prototype.dispose = function () {
        if (this._widget) {
            var widget = this._widget;
            this._widget = null;
            widget.dispose();
        }
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(SingletonLayout.prototype, "widget", {
        /**
         * Get the child widget for the layout.
         */
        get: function () {
            return this._widget;
        },
        /**
         * Set the child widget for the layout.
         *
         * #### Notes
         * Setting the child widget will cause the old child widget to be
         * automatically disposed. If that is not desired, set the parent
         * of the old child to `null` before assigning a new child.
         */
        set: function (widget) {
            // Remove the widget from its current parent. This is a no-op
            // if the widget's parent is already the layout parent widget.
            if (widget) {
                widget.parent = this.parent;
            }
            // Bail early if the widget does not change.
            if (this._widget === widget) {
                return;
            }
            // Dispose of the old child widget.
            if (this._widget) {
                this._widget.dispose();
            }
            // Update the internal widget.
            this._widget = widget;
            // Attach the new child widget if needed.
            if (this.parent && widget) {
                this.attachWidget(widget);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Create an iterator over the widgets in the layout.
     *
     * @returns A new iterator over the widgets in the layout.
     */
    SingletonLayout.prototype.iter = function () {
        return this._widget ? algorithm_1.once(this._widget) : algorithm_1.empty();
    };
    /**
     * Remove a widget from the layout.
     *
     * @param widget - The widget to remove from the layout.
     *
     * #### Notes
     * A widget is automatically removed from the layout when its `parent`
     * is set to `null`. This method should only be invoked directly when
     * removing a widget from a layout which has yet to be installed on a
     * parent widget.
     *
     * This method does *not* modify the widget's `parent`.
     */
    SingletonLayout.prototype.removeWidget = function (widget) {
        // Bail early if the widget does not exist in the layout.
        if (this._widget !== widget) {
            return;
        }
        // Clear the internal widget.
        this._widget = null;
        // If the layout is parented, detach the widget from the DOM.
        if (this.parent) {
            this.detachWidget(widget);
        }
    };
    /**
     * Perform layout initialization which requires the parent widget.
     */
    SingletonLayout.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        algorithm_1.each(this, function (widget) { _this.attachWidget(widget); });
    };
    /**
     * Attach a widget to the parent's DOM node.
     *
     * @param index - The current index of the widget in the layout.
     *
     * @param widget - The widget to attach to the parent.
     *
     * #### Notes
     * This method is called automatically by the single layout at the
     * appropriate time. It should not be called directly by user code.
     *
     * The default implementation adds the widgets's node to the parent's
     * node at the proper location, and sends the appropriate attach
     * messages to the widget if the parent is attached to the DOM.
     *
     * Subclasses may reimplement this method to control how the widget's
     * node is added to the parent's node.
     */
    SingletonLayout.prototype.attachWidget = function (widget) {
        // Send a `'before-attach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.BeforeAttach);
        }
        // Add the widget's node to the parent.
        this.parent.node.appendChild(widget.node);
        // Send an `'after-attach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.AfterAttach);
        }
    };
    /**
     * Detach a widget from the parent's DOM node.
     *
     * @param widget - The widget to detach from the parent.
     *
     * #### Notes
     * This method is called automatically by the single layout at the
     * appropriate time. It should not be called directly by user code.
     *
     * The default implementation removes the widget's node from the
     * parent's node, and sends the appropriate detach messages to the
     * widget if the parent is attached to the DOM.
     *
     * Subclasses may reimplement this method to control how the widget's
     * node is removed from the parent's node.
     */
    SingletonLayout.prototype.detachWidget = function (widget) {
        // Send a `'before-detach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.BeforeDetach);
        }
        // Remove the widget's node from the parent.
        this.parent.node.removeChild(widget.node);
        // Send an `'after-detach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.AfterDetach);
        }
    };
    return SingletonLayout;
}(layout_1.Layout));
exports.SingletonLayout = SingletonLayout;

})
		], [
			/* @lumino/widgets: 51 */
			"lib/scrollbar.js", ["cjs","js"], {"./widget": 42, "@lumino/domutils": 33, "@lumino/dragdrop": 36, "@lumino/signaling": 40}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var domutils_1 = require("@lumino/domutils");
var dragdrop_1 = require("@lumino/dragdrop");
var signaling_1 = require("@lumino/signaling");
var widget_1 = require("./widget");
/**
 * A widget which implements a canonical scroll bar.
 */
var ScrollBar = /** @class */ (function (_super) {
    __extends(ScrollBar, _super);
    /**
     * Construct a new scroll bar.
     *
     * @param options - The options for initializing the scroll bar.
     */
    function ScrollBar(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, { node: Private.createNode() }) || this;
        /**
         * A timeout callback for repeating the mouse press.
         */
        _this._onRepeat = function () {
            // Clear the repeat timer id.
            _this._repeatTimer = -1;
            // Bail if the mouse has been released.
            if (!_this._pressData) {
                return;
            }
            // Look up the part that was pressed.
            var part = _this._pressData.part;
            // Bail if the thumb was pressed.
            if (part === 'thumb') {
                return;
            }
            // Schedule the timer for another repeat.
            _this._repeatTimer = window.setTimeout(_this._onRepeat, 20);
            // Get the current mouse position.
            var mouseX = _this._pressData.mouseX;
            var mouseY = _this._pressData.mouseY;
            // Handle a decrement button repeat.
            if (part === 'decrement') {
                // Bail if the mouse is not over the button.
                if (!domutils_1.ElementExt.hitTest(_this.decrementNode, mouseX, mouseY)) {
                    return;
                }
                // Emit the step requested signal.
                _this._stepRequested.emit('decrement');
                // Finished.
                return;
            }
            // Handle an increment button repeat.
            if (part === 'increment') {
                // Bail if the mouse is not over the button.
                if (!domutils_1.ElementExt.hitTest(_this.incrementNode, mouseX, mouseY)) {
                    return;
                }
                // Emit the step requested signal.
                _this._stepRequested.emit('increment');
                // Finished.
                return;
            }
            // Handle a track repeat.
            if (part === 'track') {
                // Bail if the mouse is not over the track.
                if (!domutils_1.ElementExt.hitTest(_this.trackNode, mouseX, mouseY)) {
                    return;
                }
                // Fetch the thumb node.
                var thumbNode = _this.thumbNode;
                // Bail if the mouse is over the thumb.
                if (domutils_1.ElementExt.hitTest(thumbNode, mouseX, mouseY)) {
                    return;
                }
                // Fetch the client rect for the thumb.
                var thumbRect = thumbNode.getBoundingClientRect();
                // Determine the direction for the page request.
                var dir = void 0;
                if (_this._orientation === 'horizontal') {
                    dir = mouseX < thumbRect.left ? 'decrement' : 'increment';
                }
                else {
                    dir = mouseY < thumbRect.top ? 'decrement' : 'increment';
                }
                // Emit the page requested signal.
                _this._pageRequested.emit(dir);
                // Finished.
                return;
            }
        };
        _this._value = 0;
        _this._page = 10;
        _this._maximum = 100;
        _this._repeatTimer = -1;
        _this._pressData = null;
        _this._thumbMoved = new signaling_1.Signal(_this);
        _this._stepRequested = new signaling_1.Signal(_this);
        _this._pageRequested = new signaling_1.Signal(_this);
        _this.addClass('lm-ScrollBar');
        /* <DEPRECATED> */
        _this.addClass('p-ScrollBar');
        /* </DEPRECATED> */
        _this.setFlag(widget_1.Widget.Flag.DisallowLayout);
        // Set the orientation.
        _this._orientation = options.orientation || 'vertical';
        _this.dataset['orientation'] = _this._orientation;
        // Parse the rest of the options.
        if (options.maximum !== undefined) {
            _this._maximum = Math.max(0, options.maximum);
        }
        if (options.page !== undefined) {
            _this._page = Math.max(0, options.page);
        }
        if (options.value !== undefined) {
            _this._value = Math.max(0, Math.min(options.value, _this._maximum));
        }
        return _this;
    }
    Object.defineProperty(ScrollBar.prototype, "thumbMoved", {
        /**
         * A signal emitted when the user moves the scroll thumb.
         *
         * #### Notes
         * The payload is the current value of the scroll bar.
         */
        get: function () {
            return this._thumbMoved;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollBar.prototype, "stepRequested", {
        /**
         * A signal emitted when the user clicks a step button.
         *
         * #### Notes
         * The payload is whether a decrease or increase is requested.
         */
        get: function () {
            return this._stepRequested;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollBar.prototype, "pageRequested", {
        /**
         * A signal emitted when the user clicks the scroll track.
         *
         * #### Notes
         * The payload is whether a decrease or increase is requested.
         */
        get: function () {
            return this._pageRequested;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollBar.prototype, "orientation", {
        /**
         * Get the orientation of the scroll bar.
         */
        get: function () {
            return this._orientation;
        },
        /**
         * Set the orientation of the scroll bar.
         */
        set: function (value) {
            // Do nothing if the orientation does not change.
            if (this._orientation === value) {
                return;
            }
            // Release the mouse before making changes.
            this._releaseMouse();
            // Update the internal orientation.
            this._orientation = value;
            this.dataset['orientation'] = value;
            // Schedule an update the scroll bar.
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollBar.prototype, "value", {
        /**
         * Get the current value of the scroll bar.
         */
        get: function () {
            return this._value;
        },
        /**
         * Set the current value of the scroll bar.
         *
         * #### Notes
         * The value will be clamped to the range `[0, maximum]`.
         */
        set: function (value) {
            // Clamp the value to the allowable range.
            value = Math.max(0, Math.min(value, this._maximum));
            // Do nothing if the value does not change.
            if (this._value === value) {
                return;
            }
            // Update the internal value.
            this._value = value;
            // Schedule an update the scroll bar.
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollBar.prototype, "page", {
        /**
         * Get the page size of the scroll bar.
         *
         * #### Notes
         * The page size is the amount of visible content in the scrolled
         * region, expressed in data units. It determines the size of the
         * scroll bar thumb.
         */
        get: function () {
            return this._page;
        },
        /**
         * Set the page size of the scroll bar.
         *
         * #### Notes
         * The page size will be clamped to the range `[0, Infinity]`.
         */
        set: function (value) {
            // Clamp the page size to the allowable range.
            value = Math.max(0, value);
            // Do nothing if the value does not change.
            if (this._page === value) {
                return;
            }
            // Update the internal page size.
            this._page = value;
            // Schedule an update the scroll bar.
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollBar.prototype, "maximum", {
        /**
         * Get the maximum value of the scroll bar.
         */
        get: function () {
            return this._maximum;
        },
        /**
         * Set the maximum value of the scroll bar.
         *
         * #### Notes
         * The max size will be clamped to the range `[0, Infinity]`.
         */
        set: function (value) {
            // Clamp the value to the allowable range.
            value = Math.max(0, value);
            // Do nothing if the value does not change.
            if (this._maximum === value) {
                return;
            }
            // Update the internal values.
            this._maximum = value;
            // Clamp the current value to the new range.
            this._value = Math.min(this._value, value);
            // Schedule an update the scroll bar.
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollBar.prototype, "decrementNode", {
        /**
         * The scroll bar decrement button node.
         *
         * #### Notes
         * Modifying this node directly can lead to undefined behavior.
         */
        get: function () {
            return this.node.getElementsByClassName('lm-ScrollBar-button')[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollBar.prototype, "incrementNode", {
        /**
         * The scroll bar increment button node.
         *
         * #### Notes
         * Modifying this node directly can lead to undefined behavior.
         */
        get: function () {
            return this.node.getElementsByClassName('lm-ScrollBar-button')[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollBar.prototype, "trackNode", {
        /**
         * The scroll bar track node.
         *
         * #### Notes
         * Modifying this node directly can lead to undefined behavior.
         */
        get: function () {
            return this.node.getElementsByClassName('lm-ScrollBar-track')[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollBar.prototype, "thumbNode", {
        /**
         * The scroll bar thumb node.
         *
         * #### Notes
         * Modifying this node directly can lead to undefined behavior.
         */
        get: function () {
            return this.node.getElementsByClassName('lm-ScrollBar-thumb')[0];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Handle the DOM events for the scroll bar.
     *
     * @param event - The DOM event sent to the scroll bar.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the scroll bar's DOM node.
     *
     * This should not be called directly by user code.
     */
    ScrollBar.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'mousedown':
                this._evtMouseDown(event);
                break;
            case 'mousemove':
                this._evtMouseMove(event);
                break;
            case 'mouseup':
                this._evtMouseUp(event);
                break;
            case 'keydown':
                this._evtKeyDown(event);
                break;
            case 'contextmenu':
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    };
    /**
     * A method invoked on a 'before-attach' message.
     */
    ScrollBar.prototype.onBeforeAttach = function (msg) {
        this.node.addEventListener('mousedown', this);
        this.update();
    };
    /**
     * A method invoked on an 'after-detach' message.
     */
    ScrollBar.prototype.onAfterDetach = function (msg) {
        this.node.removeEventListener('mousedown', this);
        this._releaseMouse();
    };
    /**
     * A method invoked on an 'update-request' message.
     */
    ScrollBar.prototype.onUpdateRequest = function (msg) {
        // Convert the value and page into percentages.
        var value = this._value * 100 / this._maximum;
        var page = this._page * 100 / (this._page + this._maximum);
        // Clamp the value and page to the relevant range.
        value = Math.max(0, Math.min(value, 100));
        page = Math.max(0, Math.min(page, 100));
        // Fetch the thumb style.
        var thumbStyle = this.thumbNode.style;
        // Update the thumb style for the current orientation.
        if (this._orientation === 'horizontal') {
            thumbStyle.top = '';
            thumbStyle.height = '';
            thumbStyle.left = value + "%";
            thumbStyle.width = page + "%";
            thumbStyle.transform = "translate(" + -value + "%, 0%)";
        }
        else {
            thumbStyle.left = '';
            thumbStyle.width = '';
            thumbStyle.top = value + "%";
            thumbStyle.height = page + "%";
            thumbStyle.transform = "translate(0%, " + -value + "%)";
        }
    };
    /**
     * Handle the `'keydown'` event for the scroll bar.
     */
    ScrollBar.prototype._evtKeyDown = function (event) {
        // Stop all input events during drag.
        event.preventDefault();
        event.stopPropagation();
        // Ignore anything except the `Escape` key.
        if (event.keyCode !== 27) {
            return;
        }
        // Fetch the previous scroll value.
        var value = this._pressData ? this._pressData.value : -1;
        // Release the mouse.
        this._releaseMouse();
        // Restore the old scroll value if possible.
        if (value !== -1) {
            this._moveThumb(value);
        }
    };
    /**
     * Handle the `'mousedown'` event for the scroll bar.
     */
    ScrollBar.prototype._evtMouseDown = function (event) {
        // Do nothing if it's not a left mouse press.
        if (event.button !== 0) {
            return;
        }
        // Send an activate request to the scroll bar. This can be
        // used by message hooks to activate something relevant.
        this.activate();
        // Do nothing if the mouse is already captured.
        if (this._pressData) {
            return;
        }
        // Find the pressed scroll bar part.
        var part = Private.findPart(this, event.target);
        // Do nothing if the part is not of interest.
        if (!part) {
            return;
        }
        // Stop the event propagation.
        event.preventDefault();
        event.stopPropagation();
        // Override the mouse cursor.
        var override = dragdrop_1.Drag.overrideCursor('default');
        // Set up the press data.
        this._pressData = {
            part: part, override: override,
            delta: -1, value: -1,
            mouseX: event.clientX,
            mouseY: event.clientY
        };
        // Add the extra event listeners.
        document.addEventListener('mousemove', this, true);
        document.addEventListener('mouseup', this, true);
        document.addEventListener('keydown', this, true);
        document.addEventListener('contextmenu', this, true);
        // Handle a thumb press.
        if (part === 'thumb') {
            // Fetch the thumb node.
            var thumbNode = this.thumbNode;
            // Fetch the client rect for the thumb.
            var thumbRect = thumbNode.getBoundingClientRect();
            // Update the press data delta for the current orientation.
            if (this._orientation === 'horizontal') {
                this._pressData.delta = event.clientX - thumbRect.left;
            }
            else {
                this._pressData.delta = event.clientY - thumbRect.top;
            }
            // Add the active class to the thumb node.
            thumbNode.classList.add('lm-mod-active');
            /* <DEPRECATED> */
            thumbNode.classList.add('p-mod-active');
            /* </DEPRECATED> */
            // Store the current value in the press data.
            this._pressData.value = this._value;
            // Finished.
            return;
        }
        // Handle a track press.
        if (part === 'track') {
            // Fetch the client rect for the thumb.
            var thumbRect = this.thumbNode.getBoundingClientRect();
            // Determine the direction for the page request.
            var dir = void 0;
            if (this._orientation === 'horizontal') {
                dir = event.clientX < thumbRect.left ? 'decrement' : 'increment';
            }
            else {
                dir = event.clientY < thumbRect.top ? 'decrement' : 'increment';
            }
            // Start the repeat timer.
            this._repeatTimer = window.setTimeout(this._onRepeat, 350);
            // Emit the page requested signal.
            this._pageRequested.emit(dir);
            // Finished.
            return;
        }
        // Handle a decrement button press.
        if (part === 'decrement') {
            // Add the active class to the decrement node.
            this.decrementNode.classList.add('lm-mod-active');
            /* <DEPRECATED> */
            this.decrementNode.classList.add('p-mod-active');
            /* </DEPRECATED> */
            // Start the repeat timer.
            this._repeatTimer = window.setTimeout(this._onRepeat, 350);
            // Emit the step requested signal.
            this._stepRequested.emit('decrement');
            // Finished.
            return;
        }
        // Handle an increment button press.
        if (part === 'increment') {
            // Add the active class to the increment node.
            this.incrementNode.classList.add('lm-mod-active');
            /* <DEPRECATED> */
            this.incrementNode.classList.add('p-mod-active');
            /* </DEPRECATED> */
            // Start the repeat timer.
            this._repeatTimer = window.setTimeout(this._onRepeat, 350);
            // Emit the step requested signal.
            this._stepRequested.emit('increment');
            // Finished.
            return;
        }
    };
    /**
     * Handle the `'mousemove'` event for the scroll bar.
     */
    ScrollBar.prototype._evtMouseMove = function (event) {
        // Do nothing if no drag is in progress.
        if (!this._pressData) {
            return;
        }
        // Stop the event propagation.
        event.preventDefault();
        event.stopPropagation();
        // Update the mouse position.
        this._pressData.mouseX = event.clientX;
        this._pressData.mouseY = event.clientY;
        // Bail if the thumb is not being dragged.
        if (this._pressData.part !== 'thumb') {
            return;
        }
        // Get the client rect for the thumb and track.
        var thumbRect = this.thumbNode.getBoundingClientRect();
        var trackRect = this.trackNode.getBoundingClientRect();
        // Fetch the scroll geometry based on the orientation.
        var trackPos;
        var trackSpan;
        if (this._orientation === 'horizontal') {
            trackPos = event.clientX - trackRect.left - this._pressData.delta;
            trackSpan = trackRect.width - thumbRect.width;
        }
        else {
            trackPos = event.clientY - trackRect.top - this._pressData.delta;
            trackSpan = trackRect.height - thumbRect.height;
        }
        // Compute the desired value from the scroll geometry.
        var value = trackSpan === 0 ? 0 : trackPos * this._maximum / trackSpan;
        // Move the thumb to the computed value.
        this._moveThumb(value);
    };
    /**
     * Handle the `'mouseup'` event for the scroll bar.
     */
    ScrollBar.prototype._evtMouseUp = function (event) {
        // Do nothing if it's not a left mouse release.
        if (event.button !== 0) {
            return;
        }
        // Stop the event propagation.
        event.preventDefault();
        event.stopPropagation();
        // Release the mouse.
        this._releaseMouse();
    };
    /**
     * Release the mouse and restore the node states.
     */
    ScrollBar.prototype._releaseMouse = function () {
        // Bail if there is no press data.
        if (!this._pressData) {
            return;
        }
        // Clear the repeat timer.
        clearTimeout(this._repeatTimer);
        this._repeatTimer = -1;
        // Clear the press data.
        this._pressData.override.dispose();
        this._pressData = null;
        // Remove the extra event listeners.
        document.removeEventListener('mousemove', this, true);
        document.removeEventListener('mouseup', this, true);
        document.removeEventListener('keydown', this, true);
        document.removeEventListener('contextmenu', this, true);
        // Remove the active classes from the nodes.
        this.thumbNode.classList.remove('lm-mod-active');
        this.decrementNode.classList.remove('lm-mod-active');
        this.incrementNode.classList.remove('lm-mod-active');
        /* <DEPRECATED> */
        this.thumbNode.classList.remove('p-mod-active');
        this.decrementNode.classList.remove('p-mod-active');
        this.incrementNode.classList.remove('p-mod-active');
        /* </DEPRECATED> */
    };
    /**
     * Move the thumb to the specified position.
     */
    ScrollBar.prototype._moveThumb = function (value) {
        // Clamp the value to the allowed range.
        value = Math.max(0, Math.min(value, this._maximum));
        // Bail if the value does not change.
        if (this._value === value) {
            return;
        }
        // Update the internal value.
        this._value = value;
        // Schedule an update of the scroll bar.
        this.update();
        // Emit the thumb moved signal.
        this._thumbMoved.emit(value);
    };
    return ScrollBar;
}(widget_1.Widget));
exports.ScrollBar = ScrollBar;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * Create the DOM node for a scroll bar.
     */
    function createNode() {
        var node = document.createElement('div');
        var decrement = document.createElement('div');
        var increment = document.createElement('div');
        var track = document.createElement('div');
        var thumb = document.createElement('div');
        decrement.className = 'lm-ScrollBar-button';
        increment.className = 'lm-ScrollBar-button';
        decrement.dataset['action'] = 'decrement';
        increment.dataset['action'] = 'increment';
        track.className = 'lm-ScrollBar-track';
        thumb.className = 'lm-ScrollBar-thumb';
        /* <DEPRECATED> */
        decrement.classList.add('p-ScrollBar-button');
        increment.classList.add('p-ScrollBar-button');
        track.classList.add('p-ScrollBar-track');
        thumb.classList.add('p-ScrollBar-thumb');
        /* </DEPRECATED> */
        track.appendChild(thumb);
        node.appendChild(decrement);
        node.appendChild(track);
        node.appendChild(increment);
        return node;
    }
    Private.createNode = createNode;
    /**
     * Find the scroll bar part which contains the given target.
     */
    function findPart(scrollBar, target) {
        // Test the thumb.
        if (scrollBar.thumbNode.contains(target)) {
            return 'thumb';
        }
        // Test the track.
        if (scrollBar.trackNode.contains(target)) {
            return 'track';
        }
        // Test the decrement button.
        if (scrollBar.decrementNode.contains(target)) {
            return 'decrement';
        }
        // Test the increment button.
        if (scrollBar.incrementNode.contains(target)) {
            return 'increment';
        }
        // Indicate no match.
        return null;
    }
    Private.findPart = findPart;
})(Private || (Private = {}));

})
		], [
			/* @lumino/widgets: 52 */
			"lib/panellayout.js", ["cjs","js"], {"./layout": 56, "./widget": 42, "@lumino/algorithm": 11, "@lumino/messaging": 38}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
var messaging_1 = require("@lumino/messaging");
var layout_1 = require("./layout");
var widget_1 = require("./widget");
/**
 * A concrete layout implementation suitable for many use cases.
 *
 * #### Notes
 * This class is suitable as a base class for implementing a variety of
 * layouts, but can also be used directly with standard CSS to layout a
 * collection of widgets.
 */
var PanelLayout = /** @class */ (function (_super) {
    __extends(PanelLayout, _super);
    function PanelLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._widgets = [];
        return _this;
    }
    /**
     * Dispose of the resources held by the layout.
     *
     * #### Notes
     * This will clear and dispose all widgets in the layout.
     *
     * All reimplementations should call the superclass method.
     *
     * This method is called automatically when the parent is disposed.
     */
    PanelLayout.prototype.dispose = function () {
        while (this._widgets.length > 0) {
            this._widgets.pop().dispose();
        }
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(PanelLayout.prototype, "widgets", {
        /**
         * A read-only array of the widgets in the layout.
         */
        get: function () {
            return this._widgets;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Create an iterator over the widgets in the layout.
     *
     * @returns A new iterator over the widgets in the layout.
     */
    PanelLayout.prototype.iter = function () {
        return algorithm_1.iter(this._widgets);
    };
    /**
     * Add a widget to the end of the layout.
     *
     * @param widget - The widget to add to the layout.
     *
     * #### Notes
     * If the widget is already contained in the layout, it will be moved.
     */
    PanelLayout.prototype.addWidget = function (widget) {
        this.insertWidget(this._widgets.length, widget);
    };
    /**
     * Insert a widget into the layout at the specified index.
     *
     * @param index - The index at which to insert the widget.
     *
     * @param widget - The widget to insert into the layout.
     *
     * #### Notes
     * The index will be clamped to the bounds of the widgets.
     *
     * If the widget is already added to the layout, it will be moved.
     *
     * #### Undefined Behavior
     * An `index` which is non-integral.
     */
    PanelLayout.prototype.insertWidget = function (index, widget) {
        // Remove the widget from its current parent. This is a no-op
        // if the widget's parent is already the layout parent widget.
        widget.parent = this.parent;
        // Look up the current index of the widget.
        var i = this._widgets.indexOf(widget);
        // Clamp the insert index to the array bounds.
        var j = Math.max(0, Math.min(index, this._widgets.length));
        // If the widget is not in the array, insert it.
        if (i === -1) {
            // Insert the widget into the array.
            algorithm_1.ArrayExt.insert(this._widgets, j, widget);
            // If the layout is parented, attach the widget to the DOM.
            if (this.parent) {
                this.attachWidget(j, widget);
            }
            // There is nothing more to do.
            return;
        }
        // Otherwise, the widget exists in the array and should be moved.
        // Adjust the index if the location is at the end of the array.
        if (j === this._widgets.length) {
            j--;
        }
        // Bail if there is no effective move.
        if (i === j) {
            return;
        }
        // Move the widget to the new location.
        algorithm_1.ArrayExt.move(this._widgets, i, j);
        // If the layout is parented, move the widget in the DOM.
        if (this.parent) {
            this.moveWidget(i, j, widget);
        }
    };
    /**
     * Remove a widget from the layout.
     *
     * @param widget - The widget to remove from the layout.
     *
     * #### Notes
     * A widget is automatically removed from the layout when its `parent`
     * is set to `null`. This method should only be invoked directly when
     * removing a widget from a layout which has yet to be installed on a
     * parent widget.
     *
     * This method does *not* modify the widget's `parent`.
     */
    PanelLayout.prototype.removeWidget = function (widget) {
        this.removeWidgetAt(this._widgets.indexOf(widget));
    };
    /**
     * Remove the widget at a given index from the layout.
     *
     * @param index - The index of the widget to remove.
     *
     * #### Notes
     * A widget is automatically removed from the layout when its `parent`
     * is set to `null`. This method should only be invoked directly when
     * removing a widget from a layout which has yet to be installed on a
     * parent widget.
     *
     * This method does *not* modify the widget's `parent`.
     *
     * #### Undefined Behavior
     * An `index` which is non-integral.
     */
    PanelLayout.prototype.removeWidgetAt = function (index) {
        // Remove the widget from the array.
        var widget = algorithm_1.ArrayExt.removeAt(this._widgets, index);
        // If the layout is parented, detach the widget from the DOM.
        if (widget && this.parent) {
            this.detachWidget(index, widget);
        }
    };
    /**
     * Perform layout initialization which requires the parent widget.
     */
    PanelLayout.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        algorithm_1.each(this, function (widget, index) {
            _this.attachWidget(index, widget);
        });
    };
    /**
     * Attach a widget to the parent's DOM node.
     *
     * @param index - The current index of the widget in the layout.
     *
     * @param widget - The widget to attach to the parent.
     *
     * #### Notes
     * This method is called automatically by the panel layout at the
     * appropriate time. It should not be called directly by user code.
     *
     * The default implementation adds the widgets's node to the parent's
     * node at the proper location, and sends the appropriate attach
     * messages to the widget if the parent is attached to the DOM.
     *
     * Subclasses may reimplement this method to control how the widget's
     * node is added to the parent's node.
     */
    PanelLayout.prototype.attachWidget = function (index, widget) {
        // Look up the next sibling reference node.
        var ref = this.parent.node.children[index];
        // Send a `'before-attach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.BeforeAttach);
        }
        // Insert the widget's node before the sibling.
        this.parent.node.insertBefore(widget.node, ref);
        // Send an `'after-attach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.AfterAttach);
        }
    };
    /**
     * Move a widget in the parent's DOM node.
     *
     * @param fromIndex - The previous index of the widget in the layout.
     *
     * @param toIndex - The current index of the widget in the layout.
     *
     * @param widget - The widget to move in the parent.
     *
     * #### Notes
     * This method is called automatically by the panel layout at the
     * appropriate time. It should not be called directly by user code.
     *
     * The default implementation moves the widget's node to the proper
     * location in the parent's node and sends the appropriate attach and
     * detach messages to the widget if the parent is attached to the DOM.
     *
     * Subclasses may reimplement this method to control how the widget's
     * node is moved in the parent's node.
     */
    PanelLayout.prototype.moveWidget = function (fromIndex, toIndex, widget) {
        // Send a `'before-detach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.BeforeDetach);
        }
        // Remove the widget's node from the parent.
        this.parent.node.removeChild(widget.node);
        // Send an `'after-detach'` and  message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.AfterDetach);
        }
        // Look up the next sibling reference node.
        var ref = this.parent.node.children[toIndex];
        // Send a `'before-attach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.BeforeAttach);
        }
        // Insert the widget's node before the sibling.
        this.parent.node.insertBefore(widget.node, ref);
        // Send an `'after-attach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.AfterAttach);
        }
    };
    /**
     * Detach a widget from the parent's DOM node.
     *
     * @param index - The previous index of the widget in the layout.
     *
     * @param widget - The widget to detach from the parent.
     *
     * #### Notes
     * This method is called automatically by the panel layout at the
     * appropriate time. It should not be called directly by user code.
     *
     * The default implementation removes the widget's node from the
     * parent's node, and sends the appropriate detach messages to the
     * widget if the parent is attached to the DOM.
     *
     * Subclasses may reimplement this method to control how the widget's
     * node is removed from the parent's node.
     */
    PanelLayout.prototype.detachWidget = function (index, widget) {
        // Send a `'before-detach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.BeforeDetach);
        }
        // Remove the widget's node from the parent.
        this.parent.node.removeChild(widget.node);
        // Send an `'after-detach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.AfterDetach);
        }
    };
    return PanelLayout;
}(layout_1.Layout));
exports.PanelLayout = PanelLayout;

})
		], [
			/* @lumino/widgets: 53 */
			"lib/panel.js", ["cjs","js"], {"./panellayout": 52, "./widget": 42}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var panellayout_1 = require("./panellayout");
var widget_1 = require("./widget");
/**
 * A simple and convenient panel widget class.
 *
 * #### Notes
 * This class is suitable as a base class for implementing a variety of
 * convenience panel widgets, but can also be used directly with CSS to
 * arrange a collection of widgets.
 *
 * This class provides a convenience wrapper around a [[PanelLayout]].
 */
var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    /**
     * Construct a new panel.
     *
     * @param options - The options for initializing the panel.
     */
    function Panel(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.addClass('lm-Panel');
        /* <DEPRECATED> */
        _this.addClass('p-Panel');
        /* </DEPRECATED> */
        _this.layout = Private.createLayout(options);
        return _this;
    }
    Object.defineProperty(Panel.prototype, "widgets", {
        /**
         * A read-only array of the widgets in the panel.
         */
        get: function () {
            return this.layout.widgets;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add a widget to the end of the panel.
     *
     * @param widget - The widget to add to the panel.
     *
     * #### Notes
     * If the widget is already contained in the panel, it will be moved.
     */
    Panel.prototype.addWidget = function (widget) {
        this.layout.addWidget(widget);
    };
    /**
     * Insert a widget at the specified index.
     *
     * @param index - The index at which to insert the widget.
     *
     * @param widget - The widget to insert into to the panel.
     *
     * #### Notes
     * If the widget is already contained in the panel, it will be moved.
     */
    Panel.prototype.insertWidget = function (index, widget) {
        this.layout.insertWidget(index, widget);
    };
    return Panel;
}(widget_1.Widget));
exports.Panel = Panel;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * Create a panel layout for the given panel options.
     */
    function createLayout(options) {
        return options.layout || new panellayout_1.PanelLayout();
    }
    Private.createLayout = createLayout;
})(Private || (Private = {}));

})
		], [
			/* @lumino/widgets: 54 */
			"lib/menubar.js", ["cjs","js"], {"./widget": 42, "@lumino/algorithm": 11, "@lumino/domutils": 33, "@lumino/keyboard": 37, "@lumino/messaging": 38, "@lumino/virtualdom": 41}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
var domutils_1 = require("@lumino/domutils");
var keyboard_1 = require("@lumino/keyboard");
var messaging_1 = require("@lumino/messaging");
var virtualdom_1 = require("@lumino/virtualdom");
var widget_1 = require("./widget");
/**
 * A widget which displays menus as a canonical menu bar.
 */
var MenuBar = /** @class */ (function (_super) {
    __extends(MenuBar, _super);
    /**
     * Construct a new menu bar.
     *
     * @param options - The options for initializing the menu bar.
     */
    function MenuBar(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, { node: Private.createNode() }) || this;
        _this._activeIndex = -1;
        _this._menus = [];
        _this._childMenu = null;
        _this.addClass('lm-MenuBar');
        /* <DEPRECATED> */
        _this.addClass('p-MenuBar');
        /* </DEPRECATED> */
        _this.setFlag(widget_1.Widget.Flag.DisallowLayout);
        _this.renderer = options.renderer || MenuBar.defaultRenderer;
        return _this;
    }
    /**
     * Dispose of the resources held by the widget.
     */
    MenuBar.prototype.dispose = function () {
        this._closeChildMenu();
        this._menus.length = 0;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(MenuBar.prototype, "childMenu", {
        /**
         * The child menu of the menu bar.
         *
         * #### Notes
         * This will be `null` if the menu bar does not have an open menu.
         */
        get: function () {
            return this._childMenu;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuBar.prototype, "contentNode", {
        /**
         * Get the menu bar content node.
         *
         * #### Notes
         * This is the node which holds the menu title nodes.
         *
         * Modifying this node directly can lead to undefined behavior.
         */
        get: function () {
            return this.node.getElementsByClassName('lm-MenuBar-content')[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuBar.prototype, "activeMenu", {
        /**
         * Get the currently active menu.
         */
        get: function () {
            return this._menus[this._activeIndex] || null;
        },
        /**
         * Set the currently active menu.
         *
         * #### Notes
         * If the menu does not exist, the menu will be set to `null`.
         */
        set: function (value) {
            this.activeIndex = value ? this._menus.indexOf(value) : -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuBar.prototype, "activeIndex", {
        /**
         * Get the index of the currently active menu.
         *
         * #### Notes
         * This will be `-1` if no menu is active.
         */
        get: function () {
            return this._activeIndex;
        },
        /**
         * Set the index of the currently active menu.
         *
         * #### Notes
         * If the menu cannot be activated, the index will be set to `-1`.
         */
        set: function (value) {
            // Adjust the value for an out of range index.
            if (value < 0 || value >= this._menus.length) {
                value = -1;
            }
            // Bail early if the index will not change.
            if (this._activeIndex === value) {
                return;
            }
            // Update the active index.
            this._activeIndex = value;
            // Schedule an update of the items.
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuBar.prototype, "menus", {
        /**
         * A read-only array of the menus in the menu bar.
         */
        get: function () {
            return this._menus;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Open the active menu and activate its first menu item.
     *
     * #### Notes
     * If there is no active menu, this is a no-op.
     */
    MenuBar.prototype.openActiveMenu = function () {
        // Bail early if there is no active item.
        if (this._activeIndex === -1) {
            return;
        }
        // Open the child menu.
        this._openChildMenu();
        // Activate the first item in the child menu.
        if (this._childMenu) {
            this._childMenu.activeIndex = -1;
            this._childMenu.activateNextItem();
        }
    };
    /**
     * Add a menu to the end of the menu bar.
     *
     * @param menu - The menu to add to the menu bar.
     *
     * #### Notes
     * If the menu is already added to the menu bar, it will be moved.
     */
    MenuBar.prototype.addMenu = function (menu) {
        this.insertMenu(this._menus.length, menu);
    };
    /**
     * Insert a menu into the menu bar at the specified index.
     *
     * @param index - The index at which to insert the menu.
     *
     * @param menu - The menu to insert into the menu bar.
     *
     * #### Notes
     * The index will be clamped to the bounds of the menus.
     *
     * If the menu is already added to the menu bar, it will be moved.
     */
    MenuBar.prototype.insertMenu = function (index, menu) {
        // Close the child menu before making changes.
        this._closeChildMenu();
        // Look up the index of the menu.
        var i = this._menus.indexOf(menu);
        // Clamp the insert index to the array bounds.
        var j = Math.max(0, Math.min(index, this._menus.length));
        // If the menu is not in the array, insert it.
        if (i === -1) {
            // Insert the menu into the array.
            algorithm_1.ArrayExt.insert(this._menus, j, menu);
            // Add the styling class to the menu.
            menu.addClass('lm-MenuBar-menu');
            /* <DEPRECATED> */
            menu.addClass('p-MenuBar-menu');
            /* </DEPRECATED> */
            // Connect to the menu signals.
            menu.aboutToClose.connect(this._onMenuAboutToClose, this);
            menu.menuRequested.connect(this._onMenuMenuRequested, this);
            menu.title.changed.connect(this._onTitleChanged, this);
            // Schedule an update of the items.
            this.update();
            // There is nothing more to do.
            return;
        }
        // Otherwise, the menu exists in the array and should be moved.
        // Adjust the index if the location is at the end of the array.
        if (j === this._menus.length) {
            j--;
        }
        // Bail if there is no effective move.
        if (i === j) {
            return;
        }
        // Move the menu to the new locations.
        algorithm_1.ArrayExt.move(this._menus, i, j);
        // Schedule an update of the items.
        this.update();
    };
    /**
     * Remove a menu from the menu bar.
     *
     * @param menu - The menu to remove from the menu bar.
     *
     * #### Notes
     * This is a no-op if the menu is not in the menu bar.
     */
    MenuBar.prototype.removeMenu = function (menu) {
        this.removeMenuAt(this._menus.indexOf(menu));
    };
    /**
     * Remove the menu at a given index from the menu bar.
     *
     * @param index - The index of the menu to remove.
     *
     * #### Notes
     * This is a no-op if the index is out of range.
     */
    MenuBar.prototype.removeMenuAt = function (index) {
        // Close the child menu before making changes.
        this._closeChildMenu();
        // Remove the menu from the array.
        var menu = algorithm_1.ArrayExt.removeAt(this._menus, index);
        // Bail if the index is out of range.
        if (!menu) {
            return;
        }
        // Disconnect from the menu signals.
        menu.aboutToClose.disconnect(this._onMenuAboutToClose, this);
        menu.menuRequested.disconnect(this._onMenuMenuRequested, this);
        menu.title.changed.disconnect(this._onTitleChanged, this);
        // Remove the styling class from the menu.
        menu.removeClass('lm-MenuBar-menu');
        /* <DEPRECATED> */
        menu.removeClass('p-MenuBar-menu');
        /* </DEPRECATED> */
        // Schedule an update of the items.
        this.update();
    };
    /**
     * Remove all menus from the menu bar.
     */
    MenuBar.prototype.clearMenus = function () {
        // Bail if there is nothing to remove.
        if (this._menus.length === 0) {
            return;
        }
        // Close the child menu before making changes.
        this._closeChildMenu();
        // Disconnect from the menu signals and remove the styling class.
        for (var _i = 0, _a = this._menus; _i < _a.length; _i++) {
            var menu = _a[_i];
            menu.aboutToClose.disconnect(this._onMenuAboutToClose, this);
            menu.menuRequested.disconnect(this._onMenuMenuRequested, this);
            menu.title.changed.disconnect(this._onTitleChanged, this);
            menu.removeClass('lm-MenuBar-menu');
            /* <DEPRECATED> */
            menu.removeClass('p-MenuBar-menu');
            /* </DEPRECATED> */
        }
        // Clear the menus array.
        this._menus.length = 0;
        // Schedule an update of the items.
        this.update();
    };
    /**
     * Handle the DOM events for the menu bar.
     *
     * @param event - The DOM event sent to the menu bar.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the menu bar's DOM nodes. It
     * should not be called directly by user code.
     */
    MenuBar.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'keydown':
                this._evtKeyDown(event);
                break;
            case 'mousedown':
                this._evtMouseDown(event);
                break;
            case 'mousemove':
                this._evtMouseMove(event);
                break;
            case 'mouseleave':
                this._evtMouseLeave(event);
                break;
            case 'contextmenu':
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    };
    /**
     * A message handler invoked on a `'before-attach'` message.
     */
    MenuBar.prototype.onBeforeAttach = function (msg) {
        this.node.addEventListener('keydown', this);
        this.node.addEventListener('mousedown', this);
        this.node.addEventListener('mousemove', this);
        this.node.addEventListener('mouseleave', this);
        this.node.addEventListener('contextmenu', this);
    };
    /**
     * A message handler invoked on an `'after-detach'` message.
     */
    MenuBar.prototype.onAfterDetach = function (msg) {
        this.node.removeEventListener('keydown', this);
        this.node.removeEventListener('mousedown', this);
        this.node.removeEventListener('mousemove', this);
        this.node.removeEventListener('mouseleave', this);
        this.node.removeEventListener('contextmenu', this);
        this._closeChildMenu();
    };
    /**
     * A message handler invoked on an `'activate-request'` message.
     */
    MenuBar.prototype.onActivateRequest = function (msg) {
        if (this.isAttached) {
            this.node.focus();
        }
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    MenuBar.prototype.onUpdateRequest = function (msg) {
        var menus = this._menus;
        var renderer = this.renderer;
        var activeIndex = this._activeIndex;
        var content = new Array(menus.length);
        for (var i = 0, n = menus.length; i < n; ++i) {
            var title = menus[i].title;
            var active = i === activeIndex;
            content[i] = renderer.renderItem({ title: title, active: active });
        }
        virtualdom_1.VirtualDOM.render(content, this.contentNode);
    };
    /**
     * Handle the `'keydown'` event for the menu bar.
     */
    MenuBar.prototype._evtKeyDown = function (event) {
        // A menu bar handles all keydown events.
        event.preventDefault();
        event.stopPropagation();
        // Fetch the key code for the event.
        var kc = event.keyCode;
        // Enter, Up Arrow, Down Arrow
        if (kc === 13 || kc === 38 || kc === 40) {
            this.openActiveMenu();
            return;
        }
        // Escape
        if (kc === 27) {
            this._closeChildMenu();
            this.activeIndex = -1;
            this.node.blur();
            return;
        }
        // Left Arrow
        if (kc === 37) {
            var i = this._activeIndex;
            var n = this._menus.length;
            this.activeIndex = i === 0 ? n - 1 : i - 1;
            return;
        }
        // Right Arrow
        if (kc === 39) {
            var i = this._activeIndex;
            var n = this._menus.length;
            this.activeIndex = i === n - 1 ? 0 : i + 1;
            return;
        }
        // Get the pressed key character.
        var key = keyboard_1.getKeyboardLayout().keyForKeydownEvent(event);
        // Bail if the key is not valid.
        if (!key) {
            return;
        }
        // Search for the next best matching mnemonic item.
        var start = this._activeIndex + 1;
        var result = Private.findMnemonic(this._menus, key, start);
        // Handle the requested mnemonic based on the search results.
        // If exactly one mnemonic is matched, that menu is opened.
        // Otherwise, the next mnemonic is activated if available,
        // followed by the auto mnemonic if available.
        if (result.index !== -1 && !result.multiple) {
            this.activeIndex = result.index;
            this.openActiveMenu();
        }
        else if (result.index !== -1) {
            this.activeIndex = result.index;
        }
        else if (result.auto !== -1) {
            this.activeIndex = result.auto;
        }
    };
    /**
     * Handle the `'mousedown'` event for the menu bar.
     */
    MenuBar.prototype._evtMouseDown = function (event) {
        // Bail if the mouse press was not on the menu bar. This can occur
        // when the document listener is installed for an active menu bar.
        if (!domutils_1.ElementExt.hitTest(this.node, event.clientX, event.clientY)) {
            return;
        }
        // Stop the propagation of the event. Immediate propagation is
        // also stopped so that an open menu does not handle the event.
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        // Check if the mouse is over one of the menu items.
        var index = algorithm_1.ArrayExt.findFirstIndex(this.contentNode.children, function (node) {
            return domutils_1.ElementExt.hitTest(node, event.clientX, event.clientY);
        });
        // If the press was not on an item, close the child menu.
        if (index === -1) {
            this._closeChildMenu();
            return;
        }
        // If the press was not the left mouse button, do nothing further.
        if (event.button !== 0) {
            return;
        }
        // Otherwise, toggle the open state of the child menu.
        if (this._childMenu) {
            this._closeChildMenu();
            this.activeIndex = index;
        }
        else {
            this.activeIndex = index;
            this._openChildMenu();
        }
    };
    /**
     * Handle the `'mousemove'` event for the menu bar.
     */
    MenuBar.prototype._evtMouseMove = function (event) {
        // Check if the mouse is over one of the menu items.
        var index = algorithm_1.ArrayExt.findFirstIndex(this.contentNode.children, function (node) {
            return domutils_1.ElementExt.hitTest(node, event.clientX, event.clientY);
        });
        // Bail early if the active index will not change.
        if (index === this._activeIndex) {
            return;
        }
        // Bail early if a child menu is open and the mouse is not over
        // an item. This allows the child menu to be kept open when the
        // mouse is over the empty part of the menu bar.
        if (index === -1 && this._childMenu) {
            return;
        }
        // Update the active index to the hovered item.
        this.activeIndex = index;
        // Open the new menu if a menu is already open.
        if (this._childMenu) {
            this._openChildMenu();
        }
    };
    /**
     * Handle the `'mouseleave'` event for the menu bar.
     */
    MenuBar.prototype._evtMouseLeave = function (event) {
        // Reset the active index if there is no open menu.
        if (!this._childMenu) {
            this.activeIndex = -1;
        }
    };
    /**
     * Open the child menu at the active index immediately.
     *
     * If a different child menu is already open, it will be closed,
     * even if there is no active menu.
     */
    MenuBar.prototype._openChildMenu = function () {
        // If there is no active menu, close the current menu.
        var newMenu = this.activeMenu;
        if (!newMenu) {
            this._closeChildMenu();
            return;
        }
        // Bail if there is no effective menu change.
        var oldMenu = this._childMenu;
        if (oldMenu === newMenu) {
            return;
        }
        // Swap the internal menu reference.
        this._childMenu = newMenu;
        // Close the current menu, or setup for the new menu.
        if (oldMenu) {
            oldMenu.close();
        }
        else {
            this.addClass('lm-mod-active');
            /* <DEPRECATED> */
            this.addClass('p-mod-active');
            /* </DEPRECATED> */
            document.addEventListener('mousedown', this, true);
        }
        // Ensure the menu bar is updated and look up the item node.
        messaging_1.MessageLoop.sendMessage(this, widget_1.Widget.Msg.UpdateRequest);
        var itemNode = this.contentNode.children[this._activeIndex];
        // Get the positioning data for the new menu.
        var _a = itemNode.getBoundingClientRect(), left = _a.left, bottom = _a.bottom;
        // Open the new menu at the computed location.
        newMenu.open(left, bottom, { forceX: true, forceY: true });
    };
    /**
     * Close the child menu immediately.
     *
     * This is a no-op if a child menu is not open.
     */
    MenuBar.prototype._closeChildMenu = function () {
        // Bail if no child menu is open.
        if (!this._childMenu) {
            return;
        }
        // Remove the active class from the menu bar.
        this.removeClass('lm-mod-active');
        /* <DEPRECATED> */
        this.removeClass('p-mod-active');
        /* </DEPRECATED> */
        // Remove the document listeners.
        document.removeEventListener('mousedown', this, true);
        // Clear the internal menu reference.
        var menu = this._childMenu;
        this._childMenu = null;
        // Close the menu.
        menu.close();
        // Reset the active index.
        this.activeIndex = -1;
    };
    /**
     * Handle the `aboutToClose` signal of a menu.
     */
    MenuBar.prototype._onMenuAboutToClose = function (sender) {
        // Bail if the sender is not the child menu.
        if (sender !== this._childMenu) {
            return;
        }
        // Remove the active class from the menu bar.
        this.removeClass('lm-mod-active');
        /* <DEPRECATED> */
        this.removeClass('p-mod-active');
        /* </DEPRECATED> */
        // Remove the document listeners.
        document.removeEventListener('mousedown', this, true);
        // Clear the internal menu reference.
        this._childMenu = null;
        // Reset the active index.
        this.activeIndex = -1;
    };
    /**
     * Handle the `menuRequested` signal of a child menu.
     */
    MenuBar.prototype._onMenuMenuRequested = function (sender, args) {
        // Bail if the sender is not the child menu.
        if (sender !== this._childMenu) {
            return;
        }
        // Look up the active index and menu count.
        var i = this._activeIndex;
        var n = this._menus.length;
        // Active the next requested index.
        switch (args) {
            case 'next':
                this.activeIndex = i === n - 1 ? 0 : i + 1;
                break;
            case 'previous':
                this.activeIndex = i === 0 ? n - 1 : i - 1;
                break;
        }
        // Open the active menu.
        this.openActiveMenu();
    };
    /**
     * Handle the `changed` signal of a title object.
     */
    MenuBar.prototype._onTitleChanged = function () {
        this.update();
    };
    return MenuBar;
}(widget_1.Widget));
exports.MenuBar = MenuBar;
/**
 * The namespace for the `MenuBar` class statics.
 */
(function (MenuBar) {
    /**
     * The default implementation of `IRenderer`.
     *
     * #### Notes
     * Subclasses are free to reimplement rendering methods as needed.
     */
    var Renderer = /** @class */ (function () {
        /**
         * Construct a new renderer.
         */
        function Renderer() {
        }
        /**
         * Render the virtual element for a menu bar item.
         *
         * @param data - The data to use for rendering the item.
         *
         * @returns A virtual element representing the item.
         */
        Renderer.prototype.renderItem = function (data) {
            var className = this.createItemClass(data);
            var dataset = this.createItemDataset(data);
            return (virtualdom_1.h.li({ className: className, dataset: dataset }, this.renderIcon(data), this.renderLabel(data)));
        };
        /**
         * Render the icon element for a menu bar item.
         *
         * @param data - The data to use for rendering the icon.
         *
         * @returns A virtual element representing the item icon.
         */
        Renderer.prototype.renderIcon = function (data) {
            var className = this.createIconClass(data);
            /* <DEPRECATED> */
            if (typeof data.title.icon === 'string') {
                return virtualdom_1.h.div({ className: className }, data.title.iconLabel);
            }
            /* </DEPRECATED> */
            // if data.title.icon is undefined, it will be ignored
            return virtualdom_1.h.div({ className: className }, data.title.icon, data.title.iconLabel);
        };
        /**
         * Render the label element for a menu item.
         *
         * @param data - The data to use for rendering the label.
         *
         * @returns A virtual element representing the item label.
         */
        Renderer.prototype.renderLabel = function (data) {
            var content = this.formatLabel(data);
            return virtualdom_1.h.div({ className: 'lm-MenuBar-itemLabel'
                    /* <DEPRECATED> */
                    + ' p-MenuBar-itemLabel'
                /* </DEPRECATED> */
            }, content);
        };
        /**
         * Create the class name for the menu bar item.
         *
         * @param data - The data to use for the class name.
         *
         * @returns The full class name for the menu item.
         */
        Renderer.prototype.createItemClass = function (data) {
            var name = 'lm-MenuBar-item';
            /* <DEPRECATED> */
            name += ' p-MenuBar-item';
            /* </DEPRECATED> */
            if (data.title.className) {
                name += " " + data.title.className;
            }
            if (data.active) {
                name += ' lm-mod-active';
                /* <DEPRECATED> */
                name += ' p-mod-active';
                /* </DEPRECATED> */
            }
            return name;
        };
        /**
         * Create the dataset for a menu bar item.
         *
         * @param data - The data to use for the item.
         *
         * @returns The dataset for the menu bar item.
         */
        Renderer.prototype.createItemDataset = function (data) {
            return data.title.dataset;
        };
        /**
         * Create the class name for the menu bar item icon.
         *
         * @param data - The data to use for the class name.
         *
         * @returns The full class name for the item icon.
         */
        Renderer.prototype.createIconClass = function (data) {
            var name = 'lm-MenuBar-itemIcon';
            /* <DEPRECATED> */
            name += ' p-MenuBar-itemIcon';
            /* </DEPRECATED> */
            var extra = data.title.iconClass;
            return extra ? name + " " + extra : name;
        };
        /**
         * Create the render content for the label node.
         *
         * @param data - The data to use for the label content.
         *
         * @returns The content to add to the label node.
         */
        Renderer.prototype.formatLabel = function (data) {
            // Fetch the label text and mnemonic index.
            var _a = data.title, label = _a.label, mnemonic = _a.mnemonic;
            // If the index is out of range, do not modify the label.
            if (mnemonic < 0 || mnemonic >= label.length) {
                return label;
            }
            // Split the label into parts.
            var prefix = label.slice(0, mnemonic);
            var suffix = label.slice(mnemonic + 1);
            var char = label[mnemonic];
            // Wrap the mnemonic character in a span.
            var span = virtualdom_1.h.span({
                className: 'lm-MenuBar-itemMnemonic'
                    /* <DEPRECATED> */
                    + ' p-MenuBar-itemMnemonic'
                /* </DEPRECATED> */
            }, char);
            // Return the content parts.
            return [prefix, span, suffix];
        };
        return Renderer;
    }());
    MenuBar.Renderer = Renderer;
    /**
     * The default `Renderer` instance.
     */
    MenuBar.defaultRenderer = new Renderer();
})(MenuBar = exports.MenuBar || (exports.MenuBar = {}));
exports.MenuBar = MenuBar;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * Create the DOM node for a menu bar.
     */
    function createNode() {
        var node = document.createElement('div');
        var content = document.createElement('ul');
        content.className = 'lm-MenuBar-content';
        /* <DEPRECATED> */
        content.classList.add('p-MenuBar-content');
        /* </DEPRECATED> */
        node.appendChild(content);
        node.tabIndex = -1;
        return node;
    }
    Private.createNode = createNode;
    /**
     * Find the best matching mnemonic item.
     *
     * The search starts at the given index and wraps around.
     */
    function findMnemonic(menus, key, start) {
        // Setup the result variables.
        var index = -1;
        var auto = -1;
        var multiple = false;
        // Normalize the key to upper case.
        var upperKey = key.toUpperCase();
        // Search the items from the given start index.
        for (var i = 0, n = menus.length; i < n; ++i) {
            // Compute the wrapped index.
            var k = (i + start) % n;
            // Look up the menu title.
            var title = menus[k].title;
            // Ignore titles with an empty label.
            if (title.label.length === 0) {
                continue;
            }
            // Look up the mnemonic index for the label.
            var mn = title.mnemonic;
            // Handle a valid mnemonic index.
            if (mn >= 0 && mn < title.label.length) {
                if (title.label[mn].toUpperCase() === upperKey) {
                    if (index === -1) {
                        index = k;
                    }
                    else {
                        multiple = true;
                    }
                }
                continue;
            }
            // Finally, handle the auto index if possible.
            if (auto === -1 && title.label[0].toUpperCase() === upperKey) {
                auto = k;
            }
        }
        // Return the search results.
        return { index: index, multiple: multiple, auto: auto };
    }
    Private.findMnemonic = findMnemonic;
})(Private || (Private = {}));

})
		], [
			/* @lumino/widgets: 55 */
			"lib/menu.js", ["cjs","js"], {"./widget": 42, "@lumino/algorithm": 11, "@lumino/commands": 21, "@lumino/coreutils": 28, "@lumino/domutils": 33, "@lumino/keyboard": 37, "@lumino/messaging": 38, "@lumino/signaling": 40, "@lumino/virtualdom": 41}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
var commands_1 = require("@lumino/commands");
var coreutils_1 = require("@lumino/coreutils");
var domutils_1 = require("@lumino/domutils");
var keyboard_1 = require("@lumino/keyboard");
var messaging_1 = require("@lumino/messaging");
var signaling_1 = require("@lumino/signaling");
var virtualdom_1 = require("@lumino/virtualdom");
var widget_1 = require("./widget");
/**
 * A widget which displays items as a canonical menu.
 */
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    /**
     * Construct a new menu.
     *
     * @param options - The options for initializing the menu.
     */
    function Menu(options) {
        var _this = _super.call(this, { node: Private.createNode() }) || this;
        _this._childIndex = -1;
        _this._activeIndex = -1;
        _this._openTimerID = 0;
        _this._closeTimerID = 0;
        _this._items = [];
        _this._childMenu = null;
        _this._parentMenu = null;
        _this._aboutToClose = new signaling_1.Signal(_this);
        _this._menuRequested = new signaling_1.Signal(_this);
        _this.addClass('lm-Menu');
        /* <DEPRECATED> */
        _this.addClass('p-Menu');
        /* </DEPRECATED> */
        _this.setFlag(widget_1.Widget.Flag.DisallowLayout);
        _this.commands = options.commands;
        _this.renderer = options.renderer || Menu.defaultRenderer;
        return _this;
    }
    /**
     * Dispose of the resources held by the menu.
     */
    Menu.prototype.dispose = function () {
        this.close();
        this._items.length = 0;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(Menu.prototype, "aboutToClose", {
        /**
         * A signal emitted just before the menu is closed.
         *
         * #### Notes
         * This signal is emitted when the menu receives a `'close-request'`
         * message, just before it removes itself from the DOM.
         *
         * This signal is not emitted if the menu is already detached from
         * the DOM when it receives the `'close-request'` message.
         */
        get: function () {
            return this._aboutToClose;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "menuRequested", {
        /**
         * A signal emitted when a new menu is requested by the user.
         *
         * #### Notes
         * This signal is emitted whenever the user presses the right or left
         * arrow keys, and a submenu cannot be opened or closed in response.
         *
         * This signal is useful when implementing menu bars in order to open
         * the next or previous menu in response to a user key press.
         *
         * This signal is only emitted for the root menu in a hierarchy.
         */
        get: function () {
            return this._menuRequested;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "parentMenu", {
        /**
         * The parent menu of the menu.
         *
         * #### Notes
         * This is `null` unless the menu is an open submenu.
         */
        get: function () {
            return this._parentMenu;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "childMenu", {
        /**
         * The child menu of the menu.
         *
         * #### Notes
         * This is `null` unless the menu has an open submenu.
         */
        get: function () {
            return this._childMenu;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "rootMenu", {
        /**
         * The root menu of the menu hierarchy.
         */
        get: function () {
            var menu = this;
            while (menu._parentMenu) {
                menu = menu._parentMenu;
            }
            return menu;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "leafMenu", {
        /**
         * The leaf menu of the menu hierarchy.
         */
        get: function () {
            var menu = this;
            while (menu._childMenu) {
                menu = menu._childMenu;
            }
            return menu;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "contentNode", {
        /**
         * The menu content node.
         *
         * #### Notes
         * This is the node which holds the menu item nodes.
         *
         * Modifying this node directly can lead to undefined behavior.
         */
        get: function () {
            return this.node.getElementsByClassName('lm-Menu-content')[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "activeItem", {
        /**
         * Get the currently active menu item.
         */
        get: function () {
            return this._items[this._activeIndex] || null;
        },
        /**
         * Set the currently active menu item.
         *
         * #### Notes
         * If the item cannot be activated, the item will be set to `null`.
         */
        set: function (value) {
            this.activeIndex = value ? this._items.indexOf(value) : -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "activeIndex", {
        /**
         * Get the index of the currently active menu item.
         *
         * #### Notes
         * This will be `-1` if no menu item is active.
         */
        get: function () {
            return this._activeIndex;
        },
        /**
         * Set the index of the currently active menu item.
         *
         * #### Notes
         * If the item cannot be activated, the index will be set to `-1`.
         */
        set: function (value) {
            // Adjust the value for an out of range index.
            if (value < 0 || value >= this._items.length) {
                value = -1;
            }
            // Ensure the item can be activated.
            if (value !== -1 && !Private.canActivate(this._items[value])) {
                value = -1;
            }
            // Bail if the index will not change.
            if (this._activeIndex === value) {
                return;
            }
            // Update the active index.
            this._activeIndex = value;
            // schedule an update of the items.
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "items", {
        /**
         * A read-only array of the menu items in the menu.
         */
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Activate the next selectable item in the menu.
     *
     * #### Notes
     * If no item is selectable, the index will be set to `-1`.
     */
    Menu.prototype.activateNextItem = function () {
        var n = this._items.length;
        var ai = this._activeIndex;
        var start = ai < n - 1 ? ai + 1 : 0;
        var stop = start === 0 ? n - 1 : start - 1;
        this.activeIndex = algorithm_1.ArrayExt.findFirstIndex(this._items, Private.canActivate, start, stop);
    };
    /**
     * Activate the previous selectable item in the menu.
     *
     * #### Notes
     * If no item is selectable, the index will be set to `-1`.
     */
    Menu.prototype.activatePreviousItem = function () {
        var n = this._items.length;
        var ai = this._activeIndex;
        var start = ai <= 0 ? n - 1 : ai - 1;
        var stop = start === n - 1 ? 0 : start + 1;
        this.activeIndex = algorithm_1.ArrayExt.findLastIndex(this._items, Private.canActivate, start, stop);
    };
    /**
     * Trigger the active menu item.
     *
     * #### Notes
     * If the active item is a submenu, it will be opened and the first
     * item will be activated.
     *
     * If the active item is a command, the command will be executed.
     *
     * If the menu is not attached, this is a no-op.
     *
     * If there is no active item, this is a no-op.
     */
    Menu.prototype.triggerActiveItem = function () {
        // Bail if the menu is not attached.
        if (!this.isAttached) {
            return;
        }
        // Bail if there is no active item.
        var item = this.activeItem;
        if (!item) {
            return;
        }
        // Cancel the pending timers.
        this._cancelOpenTimer();
        this._cancelCloseTimer();
        // If the item is a submenu, open it.
        if (item.type === 'submenu') {
            this._openChildMenu(true);
            return;
        }
        // Close the root menu before executing the command.
        this.rootMenu.close();
        // Execute the command for the item.
        var command = item.command, args = item.args;
        if (this.commands.isEnabled(command, args)) {
            this.commands.execute(command, args);
        }
        else {
            console.log("Command '" + command + "' is disabled.");
        }
    };
    /**
     * Add a menu item to the end of the menu.
     *
     * @param options - The options for creating the menu item.
     *
     * @returns The menu item added to the menu.
     */
    Menu.prototype.addItem = function (options) {
        return this.insertItem(this._items.length, options);
    };
    /**
     * Insert a menu item into the menu at the specified index.
     *
     * @param index - The index at which to insert the item.
     *
     * @param options - The options for creating the menu item.
     *
     * @returns The menu item added to the menu.
     *
     * #### Notes
     * The index will be clamped to the bounds of the items.
     */
    Menu.prototype.insertItem = function (index, options) {
        // Close the menu if it's attached.
        if (this.isAttached) {
            this.close();
        }
        // Reset the active index.
        this.activeIndex = -1;
        // Clamp the insert index to the array bounds.
        var i = Math.max(0, Math.min(index, this._items.length));
        // Create the item for the options.
        var item = Private.createItem(this, options);
        // Insert the item into the array.
        algorithm_1.ArrayExt.insert(this._items, i, item);
        // Schedule an update of the items.
        this.update();
        // Return the item added to the menu.
        return item;
    };
    /**
     * Remove an item from the menu.
     *
     * @param item - The item to remove from the menu.
     *
     * #### Notes
     * This is a no-op if the item is not in the menu.
     */
    Menu.prototype.removeItem = function (item) {
        this.removeItemAt(this._items.indexOf(item));
    };
    /**
     * Remove the item at a given index from the menu.
     *
     * @param index - The index of the item to remove.
     *
     * #### Notes
     * This is a no-op if the index is out of range.
     */
    Menu.prototype.removeItemAt = function (index) {
        // Close the menu if it's attached.
        if (this.isAttached) {
            this.close();
        }
        // Reset the active index.
        this.activeIndex = -1;
        // Remove the item from the array.
        var item = algorithm_1.ArrayExt.removeAt(this._items, index);
        // Bail if the index is out of range.
        if (!item) {
            return;
        }
        // Schedule an update of the items.
        this.update();
    };
    /**
     * Remove all menu items from the menu.
     */
    Menu.prototype.clearItems = function () {
        // Close the menu if it's attached.
        if (this.isAttached) {
            this.close();
        }
        // Reset the active index.
        this.activeIndex = -1;
        // Bail if there is nothing to remove.
        if (this._items.length === 0) {
            return;
        }
        // Clear the items.
        this._items.length = 0;
        // Schedule an update of the items.
        this.update();
    };
    /**
     * Open the menu at the specified location.
     *
     * @param x - The client X coordinate of the menu location.
     *
     * @param y - The client Y coordinate of the menu location.
     *
     * @param options - The additional options for opening the menu.
     *
     * #### Notes
     * The menu will be opened at the given location unless it will not
     * fully fit on the screen. If it will not fit, it will be adjusted
     * to fit naturally on the screen.
     *
     * This is a no-op if the menu is already attached to the DOM.
     */
    Menu.prototype.open = function (x, y, options) {
        if (options === void 0) { options = {}; }
        // Bail early if the menu is already attached.
        if (this.isAttached) {
            return;
        }
        // Extract the position options.
        var forceX = options.forceX || false;
        var forceY = options.forceY || false;
        // Open the menu as a root menu.
        Private.openRootMenu(this, x, y, forceX, forceY);
        // Activate the menu to accept keyboard input.
        this.activate();
    };
    /**
     * Handle the DOM events for the menu.
     *
     * @param event - The DOM event sent to the menu.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the menu's DOM nodes. It should
     * not be called directly by user code.
     */
    Menu.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'keydown':
                this._evtKeyDown(event);
                break;
            case 'mouseup':
                this._evtMouseUp(event);
                break;
            case 'mousemove':
                this._evtMouseMove(event);
                break;
            case 'mouseenter':
                this._evtMouseEnter(event);
                break;
            case 'mouseleave':
                this._evtMouseLeave(event);
                break;
            case 'mousedown':
                this._evtMouseDown(event);
                break;
            case 'contextmenu':
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    };
    /**
     * A message handler invoked on a `'before-attach'` message.
     */
    Menu.prototype.onBeforeAttach = function (msg) {
        this.node.addEventListener('keydown', this);
        this.node.addEventListener('mouseup', this);
        this.node.addEventListener('mousemove', this);
        this.node.addEventListener('mouseenter', this);
        this.node.addEventListener('mouseleave', this);
        this.node.addEventListener('contextmenu', this);
        document.addEventListener('mousedown', this, true);
    };
    /**
     * A message handler invoked on an `'after-detach'` message.
     */
    Menu.prototype.onAfterDetach = function (msg) {
        this.node.removeEventListener('keydown', this);
        this.node.removeEventListener('mouseup', this);
        this.node.removeEventListener('mousemove', this);
        this.node.removeEventListener('mouseenter', this);
        this.node.removeEventListener('mouseleave', this);
        this.node.removeEventListener('contextmenu', this);
        document.removeEventListener('mousedown', this, true);
    };
    /**
     * A message handler invoked on an `'activate-request'` message.
     */
    Menu.prototype.onActivateRequest = function (msg) {
        if (this.isAttached) {
            this.node.focus();
        }
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    Menu.prototype.onUpdateRequest = function (msg) {
        var items = this._items;
        var renderer = this.renderer;
        var activeIndex = this._activeIndex;
        var collapsedFlags = Private.computeCollapsed(items);
        var content = new Array(items.length);
        for (var i = 0, n = items.length; i < n; ++i) {
            var item = items[i];
            var active = i === activeIndex;
            var collapsed = collapsedFlags[i];
            content[i] = renderer.renderItem({ item: item, active: active, collapsed: collapsed });
        }
        virtualdom_1.VirtualDOM.render(content, this.contentNode);
    };
    /**
     * A message handler invoked on a `'close-request'` message.
     */
    Menu.prototype.onCloseRequest = function (msg) {
        // Cancel the pending timers.
        this._cancelOpenTimer();
        this._cancelCloseTimer();
        // Reset the active index.
        this.activeIndex = -1;
        // Close any open child menu.
        var childMenu = this._childMenu;
        if (childMenu) {
            this._childIndex = -1;
            this._childMenu = null;
            childMenu._parentMenu = null;
            childMenu.close();
        }
        // Remove this menu from its parent and activate the parent.
        var parentMenu = this._parentMenu;
        if (parentMenu) {
            this._parentMenu = null;
            parentMenu._childIndex = -1;
            parentMenu._childMenu = null;
            parentMenu.activate();
        }
        // Emit the `aboutToClose` signal if the menu is attached.
        if (this.isAttached) {
            this._aboutToClose.emit(undefined);
        }
        // Finish closing the menu.
        _super.prototype.onCloseRequest.call(this, msg);
    };
    /**
     * Handle the `'keydown'` event for the menu.
     *
     * #### Notes
     * This listener is attached to the menu node.
     */
    Menu.prototype._evtKeyDown = function (event) {
        // A menu handles all keydown events.
        event.preventDefault();
        event.stopPropagation();
        // Fetch the key code for the event.
        var kc = event.keyCode;
        // Enter
        if (kc === 13) {
            this.triggerActiveItem();
            return;
        }
        // Escape
        if (kc === 27) {
            this.close();
            return;
        }
        // Left Arrow
        if (kc === 37) {
            if (this._parentMenu) {
                this.close();
            }
            else {
                this._menuRequested.emit('previous');
            }
            return;
        }
        // Up Arrow
        if (kc === 38) {
            this.activatePreviousItem();
            return;
        }
        // Right Arrow
        if (kc === 39) {
            var item = this.activeItem;
            if (item && item.type === 'submenu') {
                this.triggerActiveItem();
            }
            else {
                this.rootMenu._menuRequested.emit('next');
            }
            return;
        }
        // Down Arrow
        if (kc === 40) {
            this.activateNextItem();
            return;
        }
        // Get the pressed key character.
        var key = keyboard_1.getKeyboardLayout().keyForKeydownEvent(event);
        // Bail if the key is not valid.
        if (!key) {
            return;
        }
        // Search for the next best matching mnemonic item.
        var start = this._activeIndex + 1;
        var result = Private.findMnemonic(this._items, key, start);
        // Handle the requested mnemonic based on the search results.
        // If exactly one mnemonic is matched, that item is triggered.
        // Otherwise, the next mnemonic is activated if available,
        // followed by the auto mnemonic if available.
        if (result.index !== -1 && !result.multiple) {
            this.activeIndex = result.index;
            this.triggerActiveItem();
        }
        else if (result.index !== -1) {
            this.activeIndex = result.index;
        }
        else if (result.auto !== -1) {
            this.activeIndex = result.auto;
        }
    };
    /**
     * Handle the `'mouseup'` event for the menu.
     *
     * #### Notes
     * This listener is attached to the menu node.
     */
    Menu.prototype._evtMouseUp = function (event) {
        if (event.button !== 0) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        this.triggerActiveItem();
    };
    /**
     * Handle the `'mousemove'` event for the menu.
     *
     * #### Notes
     * This listener is attached to the menu node.
     */
    Menu.prototype._evtMouseMove = function (event) {
        // Hit test the item nodes for the item under the mouse.
        var index = algorithm_1.ArrayExt.findFirstIndex(this.contentNode.children, function (node) {
            return domutils_1.ElementExt.hitTest(node, event.clientX, event.clientY);
        });
        // Bail early if the mouse is already over the active index.
        if (index === this._activeIndex) {
            return;
        }
        // Update and coerce the active index.
        this.activeIndex = index;
        index = this.activeIndex;
        // If the index is the current child index, cancel the timers.
        if (index === this._childIndex) {
            this._cancelOpenTimer();
            this._cancelCloseTimer();
            return;
        }
        // If a child menu is currently open, start the close timer.
        if (this._childIndex !== -1) {
            this._startCloseTimer();
        }
        // Cancel the open timer to give a full delay for opening.
        this._cancelOpenTimer();
        // Bail if the active item is not a valid submenu item.
        var item = this.activeItem;
        if (!item || item.type !== 'submenu' || !item.submenu) {
            return;
        }
        // Start the open timer to open the active item submenu.
        this._startOpenTimer();
    };
    /**
     * Handle the `'mouseenter'` event for the menu.
     *
     * #### Notes
     * This listener is attached to the menu node.
     */
    Menu.prototype._evtMouseEnter = function (event) {
        // Synchronize the active ancestor items.
        for (var menu = this._parentMenu; menu; menu = menu._parentMenu) {
            menu._cancelOpenTimer();
            menu._cancelCloseTimer();
            menu.activeIndex = menu._childIndex;
        }
    };
    /**
     * Handle the `'mouseleave'` event for the menu.
     *
     * #### Notes
     * This listener is attached to the menu node.
     */
    Menu.prototype._evtMouseLeave = function (event) {
        // Cancel any pending submenu opening.
        this._cancelOpenTimer();
        // If there is no open child menu, just reset the active index.
        if (!this._childMenu) {
            this.activeIndex = -1;
            return;
        }
        // If the mouse is over the child menu, cancel the close timer.
        var clientX = event.clientX, clientY = event.clientY;
        if (domutils_1.ElementExt.hitTest(this._childMenu.node, clientX, clientY)) {
            this._cancelCloseTimer();
            return;
        }
        // Otherwise, reset the active index and start the close timer.
        this.activeIndex = -1;
        this._startCloseTimer();
    };
    /**
     * Handle the `'mousedown'` event for the menu.
     *
     * #### Notes
     * This listener is attached to the document node.
     */
    Menu.prototype._evtMouseDown = function (event) {
        // Bail if the menu is not a root menu.
        if (this._parentMenu) {
            return;
        }
        // The mouse button which is pressed is irrelevant. If the press
        // is not on a menu, the entire hierarchy is closed and the event
        // is allowed to propagate. This allows other code to act on the
        // event, such as focusing the clicked element.
        if (Private.hitTestMenus(this, event.clientX, event.clientY)) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            this.close();
        }
    };
    /**
     * Open the child menu at the active index immediately.
     *
     * If a different child menu is already open, it will be closed,
     * even if the active item is not a valid submenu.
     */
    Menu.prototype._openChildMenu = function (activateFirst) {
        if (activateFirst === void 0) { activateFirst = false; }
        // If the item is not a valid submenu, close the child menu.
        var item = this.activeItem;
        if (!item || item.type !== 'submenu' || !item.submenu) {
            this._closeChildMenu();
            return;
        }
        // Do nothing if the child menu will not change.
        var submenu = item.submenu;
        if (submenu === this._childMenu) {
            return;
        }
        // Ensure the current child menu is closed.
        this._closeChildMenu();
        // Update the private child state.
        this._childMenu = submenu;
        this._childIndex = this._activeIndex;
        // Set the parent menu reference for the child.
        submenu._parentMenu = this;
        // Ensure the menu is updated and lookup the item node.
        messaging_1.MessageLoop.sendMessage(this, widget_1.Widget.Msg.UpdateRequest);
        var itemNode = this.contentNode.children[this._activeIndex];
        // Open the submenu at the active node.
        Private.openSubmenu(submenu, itemNode);
        // Activate the first item if desired.
        if (activateFirst) {
            submenu.activeIndex = -1;
            submenu.activateNextItem();
        }
        // Activate the child menu.
        submenu.activate();
    };
    /**
     * Close the child menu immediately.
     *
     * This is a no-op if a child menu is not open.
     */
    Menu.prototype._closeChildMenu = function () {
        if (this._childMenu) {
            this._childMenu.close();
        }
    };
    /**
     * Start the open timer, unless it is already pending.
     */
    Menu.prototype._startOpenTimer = function () {
        var _this = this;
        if (this._openTimerID === 0) {
            this._openTimerID = window.setTimeout(function () {
                _this._openTimerID = 0;
                _this._openChildMenu();
            }, Private.TIMER_DELAY);
        }
    };
    /**
     * Start the close timer, unless it is already pending.
     */
    Menu.prototype._startCloseTimer = function () {
        var _this = this;
        if (this._closeTimerID === 0) {
            this._closeTimerID = window.setTimeout(function () {
                _this._closeTimerID = 0;
                _this._closeChildMenu();
            }, Private.TIMER_DELAY);
        }
    };
    /**
     * Cancel the open timer, if the timer is pending.
     */
    Menu.prototype._cancelOpenTimer = function () {
        if (this._openTimerID !== 0) {
            clearTimeout(this._openTimerID);
            this._openTimerID = 0;
        }
    };
    /**
     * Cancel the close timer, if the timer is pending.
     */
    Menu.prototype._cancelCloseTimer = function () {
        if (this._closeTimerID !== 0) {
            clearTimeout(this._closeTimerID);
            this._closeTimerID = 0;
        }
    };
    return Menu;
}(widget_1.Widget));
exports.Menu = Menu;
/**
 * The namespace for the `Menu` class statics.
 */
(function (Menu) {
    /**
     * The default implementation of `IRenderer`.
     *
     * #### Notes
     * Subclasses are free to reimplement rendering methods as needed.
     */
    var Renderer = /** @class */ (function () {
        /**
         * Construct a new renderer.
         */
        function Renderer() {
        }
        /**
         * Render the virtual element for a menu item.
         *
         * @param data - The data to use for rendering the item.
         *
         * @returns A virtual element representing the item.
         */
        Renderer.prototype.renderItem = function (data) {
            var className = this.createItemClass(data);
            var dataset = this.createItemDataset(data);
            return (virtualdom_1.h.li({ className: className, dataset: dataset }, this.renderIcon(data), this.renderLabel(data), this.renderShortcut(data), this.renderSubmenu(data)));
        };
        /**
         * Render the icon element for a menu item.
         *
         * @param data - The data to use for rendering the icon.
         *
         * @returns A virtual element representing the item icon.
         */
        Renderer.prototype.renderIcon = function (data) {
            var className = this.createIconClass(data);
            /* <DEPRECATED> */
            if (typeof data.item.icon === 'string') {
                return virtualdom_1.h.div({ className: className }, data.item.iconLabel);
            }
            /* </DEPRECATED> */
            // if data.item.icon is undefined, it will be ignored
            return virtualdom_1.h.div({ className: className }, data.item.icon, data.item.iconLabel);
        };
        /**
         * Render the label element for a menu item.
         *
         * @param data - The data to use for rendering the label.
         *
         * @returns A virtual element representing the item label.
         */
        Renderer.prototype.renderLabel = function (data) {
            var content = this.formatLabel(data);
            return virtualdom_1.h.div({
                className: 'lm-Menu-itemLabel'
                    /* <DEPRECATED> */
                    + ' p-Menu-itemLabel'
                /* </DEPRECATED> */
            }, content);
        };
        /**
         * Render the shortcut element for a menu item.
         *
         * @param data - The data to use for rendering the shortcut.
         *
         * @returns A virtual element representing the item shortcut.
         */
        Renderer.prototype.renderShortcut = function (data) {
            var content = this.formatShortcut(data);
            return virtualdom_1.h.div({
                className: 'lm-Menu-itemShortcut'
                    /* <DEPRECATED> */
                    + ' p-Menu-itemShortcut'
                /* </DEPRECATED> */
            }, content);
        };
        /**
         * Render the submenu icon element for a menu item.
         *
         * @param data - The data to use for rendering the submenu icon.
         *
         * @returns A virtual element representing the submenu icon.
         */
        Renderer.prototype.renderSubmenu = function (data) {
            return virtualdom_1.h.div({
                className: 'lm-Menu-itemSubmenuIcon'
                    /* <DEPRECATED> */
                    + ' p-Menu-itemSubmenuIcon'
                /* </DEPRECATED> */
            });
        };
        /**
         * Create the class name for the menu item.
         *
         * @param data - The data to use for the class name.
         *
         * @returns The full class name for the menu item.
         */
        Renderer.prototype.createItemClass = function (data) {
            // Setup the initial class name.
            var name = 'lm-Menu-item';
            /* <DEPRECATED> */
            name += ' p-Menu-item';
            /* </DEPRECATED> */
            // Add the boolean state classes.
            if (!data.item.isEnabled) {
                name += ' lm-mod-disabled';
                /* <DEPRECATED> */
                name += ' p-mod-disabled';
                /* </DEPRECATED> */
            }
            if (data.item.isToggled) {
                name += ' lm-mod-toggled';
                /* <DEPRECATED> */
                name += ' p-mod-toggled';
                /* </DEPRECATED> */
            }
            if (!data.item.isVisible) {
                name += ' lm-mod-hidden';
                /* <DEPRECATED> */
                name += ' p-mod-hidden';
                /* </DEPRECATED> */
            }
            if (data.active) {
                name += ' lm-mod-active';
                /* <DEPRECATED> */
                name += ' p-mod-active';
                /* </DEPRECATED> */
            }
            if (data.collapsed) {
                name += ' lm-mod-collapsed';
                /* <DEPRECATED> */
                name += ' p-mod-collapsed';
                /* </DEPRECATED> */
            }
            // Add the extra class.
            var extra = data.item.className;
            if (extra) {
                name += " " + extra;
            }
            // Return the complete class name.
            return name;
        };
        /**
         * Create the dataset for the menu item.
         *
         * @param data - The data to use for creating the dataset.
         *
         * @returns The dataset for the menu item.
         */
        Renderer.prototype.createItemDataset = function (data) {
            var result;
            var _a = data.item, type = _a.type, command = _a.command, dataset = _a.dataset;
            if (type === 'command') {
                result = __assign(__assign({}, dataset), { type: type, command: command });
            }
            else {
                result = __assign(__assign({}, dataset), { type: type });
            }
            return result;
        };
        /**
         * Create the class name for the menu item icon.
         *
         * @param data - The data to use for the class name.
         *
         * @returns The full class name for the item icon.
         */
        Renderer.prototype.createIconClass = function (data) {
            var name = 'lm-Menu-itemIcon';
            /* <DEPRECATED> */
            name += ' p-Menu-itemIcon';
            /* </DEPRECATED> */
            var extra = data.item.iconClass;
            return extra ? name + " " + extra : name;
        };
        /**
         * Create the render content for the label node.
         *
         * @param data - The data to use for the label content.
         *
         * @returns The content to add to the label node.
         */
        Renderer.prototype.formatLabel = function (data) {
            // Fetch the label text and mnemonic index.
            var _a = data.item, label = _a.label, mnemonic = _a.mnemonic;
            // If the index is out of range, do not modify the label.
            if (mnemonic < 0 || mnemonic >= label.length) {
                return label;
            }
            // Split the label into parts.
            var prefix = label.slice(0, mnemonic);
            var suffix = label.slice(mnemonic + 1);
            var char = label[mnemonic];
            // Wrap the mnemonic character in a span.
            var span = virtualdom_1.h.span({
                className: 'lm-Menu-itemMnemonic'
                    /* <DEPRECATED> */
                    + ' p-Menu-itemMnemonic'
                /* </DEPRECATED> */
            }, char);
            // Return the content parts.
            return [prefix, span, suffix];
        };
        /**
         * Create the render content for the shortcut node.
         *
         * @param data - The data to use for the shortcut content.
         *
         * @returns The content to add to the shortcut node.
         */
        Renderer.prototype.formatShortcut = function (data) {
            var kb = data.item.keyBinding;
            return kb ? kb.keys.map(commands_1.CommandRegistry.formatKeystroke).join(', ') : null;
        };
        return Renderer;
    }());
    Menu.Renderer = Renderer;
    /**
     * The default `Renderer` instance.
     */
    Menu.defaultRenderer = new Renderer();
})(Menu = exports.Menu || (exports.Menu = {}));
exports.Menu = Menu;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * The ms delay for opening and closing a submenu.
     */
    Private.TIMER_DELAY = 300;
    /**
     * The horizontal pixel overlap for an open submenu.
     */
    Private.SUBMENU_OVERLAP = 3;
    /**
     * Create the DOM node for a menu.
     */
    function createNode() {
        var node = document.createElement('div');
        var content = document.createElement('ul');
        content.className = 'lm-Menu-content';
        /* <DEPRECATED> */
        content.classList.add('p-Menu-content');
        /* </DEPRECATED> */
        node.appendChild(content);
        node.tabIndex = -1;
        return node;
    }
    Private.createNode = createNode;
    /**
     * Test whether a menu item can be activated.
     */
    function canActivate(item) {
        return item.type !== 'separator' && item.isEnabled && item.isVisible;
    }
    Private.canActivate = canActivate;
    /**
     * Create a new menu item for an owner menu.
     */
    function createItem(owner, options) {
        return new MenuItem(owner.commands, options);
    }
    Private.createItem = createItem;
    /**
     * Hit test a menu hierarchy starting at the given root.
     */
    function hitTestMenus(menu, x, y) {
        for (var temp = menu; temp; temp = temp.childMenu) {
            if (domutils_1.ElementExt.hitTest(temp.node, x, y)) {
                return true;
            }
        }
        return false;
    }
    Private.hitTestMenus = hitTestMenus;
    /**
     * Compute which extra separator items should be collapsed.
     */
    function computeCollapsed(items) {
        // Allocate the return array and fill it with `false`.
        var result = new Array(items.length);
        algorithm_1.ArrayExt.fill(result, false);
        // Collapse the leading separators.
        var k1 = 0;
        var n = items.length;
        for (; k1 < n; ++k1) {
            var item = items[k1];
            if (!item.isVisible) {
                continue;
            }
            if (item.type !== 'separator') {
                break;
            }
            result[k1] = true;
        }
        // Hide the trailing separators.
        var k2 = n - 1;
        for (; k2 >= 0; --k2) {
            var item = items[k2];
            if (!item.isVisible) {
                continue;
            }
            if (item.type !== 'separator') {
                break;
            }
            result[k2] = true;
        }
        // Hide the remaining consecutive separators.
        var hide = false;
        while (++k1 < k2) {
            var item = items[k1];
            if (!item.isVisible) {
                continue;
            }
            if (item.type !== 'separator') {
                hide = false;
            }
            else if (hide) {
                result[k1] = true;
            }
            else {
                hide = true;
            }
        }
        // Return the resulting flags.
        return result;
    }
    Private.computeCollapsed = computeCollapsed;
    /**
     * Open a menu as a root menu at the target location.
     */
    function openRootMenu(menu, x, y, forceX, forceY) {
        // Ensure the menu is updated before attaching and measuring.
        messaging_1.MessageLoop.sendMessage(menu, widget_1.Widget.Msg.UpdateRequest);
        // Get the current position and size of the main viewport.
        var px = window.pageXOffset;
        var py = window.pageYOffset;
        var cw = document.documentElement.clientWidth;
        var ch = document.documentElement.clientHeight;
        // Compute the maximum allowed height for the menu.
        var maxHeight = ch - (forceY ? y : 0);
        // Fetch common variables.
        var node = menu.node;
        var style = node.style;
        // Clear the menu geometry and prepare it for measuring.
        style.top = '';
        style.left = '';
        style.width = '';
        style.height = '';
        style.visibility = 'hidden';
        style.maxHeight = maxHeight + "px";
        // Attach the menu to the document.
        widget_1.Widget.attach(menu, document.body);
        // Measure the size of the menu.
        var _a = node.getBoundingClientRect(), width = _a.width, height = _a.height;
        // Adjust the X position of the menu to fit on-screen.
        if (!forceX && (x + width > px + cw)) {
            x = px + cw - width;
        }
        // Adjust the Y position of the menu to fit on-screen.
        if (!forceY && (y + height > py + ch)) {
            if (y > py + ch) {
                y = py + ch - height;
            }
            else {
                y = y - height;
            }
        }
        // Update the position of the menu to the computed position.
        style.top = Math.max(0, y) + "px";
        style.left = Math.max(0, x) + "px";
        // Finally, make the menu visible on the screen.
        style.visibility = '';
    }
    Private.openRootMenu = openRootMenu;
    /**
     * Open a menu as a submenu using an item node for positioning.
     */
    function openSubmenu(submenu, itemNode) {
        // Ensure the menu is updated before opening.
        messaging_1.MessageLoop.sendMessage(submenu, widget_1.Widget.Msg.UpdateRequest);
        // Get the current position and size of the main viewport.
        var px = window.pageXOffset;
        var py = window.pageYOffset;
        var cw = document.documentElement.clientWidth;
        var ch = document.documentElement.clientHeight;
        // Compute the maximum allowed height for the menu.
        var maxHeight = ch;
        // Fetch common variables.
        var node = submenu.node;
        var style = node.style;
        // Clear the menu geometry and prepare it for measuring.
        style.top = '';
        style.left = '';
        style.width = '';
        style.height = '';
        style.visibility = 'hidden';
        style.maxHeight = maxHeight + "px";
        // Attach the menu to the document.
        widget_1.Widget.attach(submenu, document.body);
        // Measure the size of the menu.
        var _a = node.getBoundingClientRect(), width = _a.width, height = _a.height;
        // Compute the box sizing for the menu.
        var box = domutils_1.ElementExt.boxSizing(submenu.node);
        // Get the bounding rect for the target item node.
        var itemRect = itemNode.getBoundingClientRect();
        // Compute the target X position.
        var x = itemRect.right - Private.SUBMENU_OVERLAP;
        // Adjust the X position to fit on the screen.
        if (x + width > px + cw) {
            x = itemRect.left + Private.SUBMENU_OVERLAP - width;
        }
        // Compute the target Y position.
        var y = itemRect.top - box.borderTop - box.paddingTop;
        // Adjust the Y position to fit on the screen.
        if (y + height > py + ch) {
            y = itemRect.bottom + box.borderBottom + box.paddingBottom - height;
        }
        // Update the position of the menu to the computed position.
        style.top = Math.max(0, y) + "px";
        style.left = Math.max(0, x) + "px";
        // Finally, make the menu visible on the screen.
        style.visibility = '';
    }
    Private.openSubmenu = openSubmenu;
    /**
     * Find the best matching mnemonic item.
     *
     * The search starts at the given index and wraps around.
     */
    function findMnemonic(items, key, start) {
        // Setup the result variables.
        var index = -1;
        var auto = -1;
        var multiple = false;
        // Normalize the key to upper case.
        var upperKey = key.toUpperCase();
        // Search the items from the given start index.
        for (var i = 0, n = items.length; i < n; ++i) {
            // Compute the wrapped index.
            var k = (i + start) % n;
            // Lookup the item
            var item = items[k];
            // Ignore items which cannot be activated.
            if (!canActivate(item)) {
                continue;
            }
            // Ignore items with an empty label.
            var label = item.label;
            if (label.length === 0) {
                continue;
            }
            // Lookup the mnemonic index for the label.
            var mn = item.mnemonic;
            // Handle a valid mnemonic index.
            if (mn >= 0 && mn < label.length) {
                if (label[mn].toUpperCase() === upperKey) {
                    if (index === -1) {
                        index = k;
                    }
                    else {
                        multiple = true;
                    }
                }
                continue;
            }
            // Finally, handle the auto index if possible.
            if (auto === -1 && label[0].toUpperCase() === upperKey) {
                auto = k;
            }
        }
        // Return the search results.
        return { index: index, multiple: multiple, auto: auto };
    }
    Private.findMnemonic = findMnemonic;
    /**
     * A concrete implementation of `Menu.IItem`.
     */
    var MenuItem = /** @class */ (function () {
        /**
         * Construct a new menu item.
         */
        function MenuItem(commands, options) {
            this._commands = commands;
            this.type = options.type || 'command';
            this.command = options.command || '';
            this.args = options.args || coreutils_1.JSONExt.emptyObject;
            this.submenu = options.submenu || null;
        }
        Object.defineProperty(MenuItem.prototype, "label", {
            /**
             * The display label for the menu item.
             */
            get: function () {
                if (this.type === 'command') {
                    return this._commands.label(this.command, this.args);
                }
                if (this.type === 'submenu' && this.submenu) {
                    return this.submenu.title.label;
                }
                return '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MenuItem.prototype, "mnemonic", {
            /**
             * The mnemonic index for the menu item.
             */
            get: function () {
                if (this.type === 'command') {
                    return this._commands.mnemonic(this.command, this.args);
                }
                if (this.type === 'submenu' && this.submenu) {
                    return this.submenu.title.mnemonic;
                }
                return -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MenuItem.prototype, "icon", {
            /**
             * The icon renderer for the menu item.
             */
            get: function () {
                if (this.type === 'command') {
                    return this._commands.icon(this.command, this.args);
                }
                if (this.type === 'submenu' && this.submenu) {
                    return this.submenu.title.icon;
                }
                /* <DEPRECATED> */
                // alias to icon class if not otherwise defined
                return this.iconClass;
                /* </DEPRECATED> */
                /* <FUTURE>
                return undefined;
                </FUTURE> */
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MenuItem.prototype, "iconClass", {
            /**
             * The icon class for the menu item.
             */
            get: function () {
                if (this.type === 'command') {
                    return this._commands.iconClass(this.command, this.args);
                }
                if (this.type === 'submenu' && this.submenu) {
                    return this.submenu.title.iconClass;
                }
                return '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MenuItem.prototype, "iconLabel", {
            /**
             * The icon label for the menu item.
             */
            get: function () {
                if (this.type === 'command') {
                    return this._commands.iconLabel(this.command, this.args);
                }
                if (this.type === 'submenu' && this.submenu) {
                    return this.submenu.title.iconLabel;
                }
                return '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MenuItem.prototype, "caption", {
            /**
             * The display caption for the menu item.
             */
            get: function () {
                if (this.type === 'command') {
                    return this._commands.caption(this.command, this.args);
                }
                if (this.type === 'submenu' && this.submenu) {
                    return this.submenu.title.caption;
                }
                return '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MenuItem.prototype, "className", {
            /**
             * The extra class name for the menu item.
             */
            get: function () {
                if (this.type === 'command') {
                    return this._commands.className(this.command, this.args);
                }
                if (this.type === 'submenu' && this.submenu) {
                    return this.submenu.title.className;
                }
                return '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MenuItem.prototype, "dataset", {
            /**
             * The dataset for the menu item.
             */
            get: function () {
                if (this.type === 'command') {
                    return this._commands.dataset(this.command, this.args);
                }
                if (this.type === 'submenu' && this.submenu) {
                    return this.submenu.title.dataset;
                }
                return {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MenuItem.prototype, "isEnabled", {
            /**
             * Whether the menu item is enabled.
             */
            get: function () {
                if (this.type === 'command') {
                    return this._commands.isEnabled(this.command, this.args);
                }
                if (this.type === 'submenu') {
                    return this.submenu !== null;
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MenuItem.prototype, "isToggled", {
            /**
             * Whether the menu item is toggled.
             */
            get: function () {
                if (this.type === 'command') {
                    return this._commands.isToggled(this.command, this.args);
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MenuItem.prototype, "isVisible", {
            /**
             * Whether the menu item is visible.
             */
            get: function () {
                if (this.type === 'command') {
                    return this._commands.isVisible(this.command, this.args);
                }
                if (this.type === 'submenu') {
                    return this.submenu !== null;
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MenuItem.prototype, "keyBinding", {
            /**
             * The key binding for the menu item.
             */
            get: function () {
                if (this.type === 'command') {
                    var _a = this, command_1 = _a.command, args_1 = _a.args;
                    return algorithm_1.ArrayExt.findLastValue(this._commands.keyBindings, function (kb) {
                        return kb.command === command_1 && coreutils_1.JSONExt.deepEqual(kb.args, args_1);
                    }) || null;
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        return MenuItem;
    }());
})(Private || (Private = {}));

})
		], [
			/* @lumino/widgets: 56 */
			"lib/layout.js", ["cjs","js"], {"./widget": 42, "@lumino/algorithm": 11, "@lumino/domutils": 33, "@lumino/messaging": 38, "@lumino/properties": 39, "@lumino/signaling": 40}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
var domutils_1 = require("@lumino/domutils");
var messaging_1 = require("@lumino/messaging");
var properties_1 = require("@lumino/properties");
var signaling_1 = require("@lumino/signaling");
var widget_1 = require("./widget");
/**
 * An abstract base class for creating lumino layouts.
 *
 * #### Notes
 * A layout is used to add widgets to a parent and to arrange those
 * widgets within the parent's DOM node.
 *
 * This class implements the base functionality which is required of
 * nearly all layouts. It must be subclassed in order to be useful.
 *
 * Notably, this class does not define a uniform interface for adding
 * widgets to the layout. A subclass should define that API in a way
 * which is meaningful for its intended use.
 */
var Layout = /** @class */ (function () {
    /**
     * Construct a new layout.
     *
     * @param options - The options for initializing the layout.
     */
    function Layout(options) {
        if (options === void 0) { options = {}; }
        this._disposed = false;
        this._parent = null;
        this._fitPolicy = options.fitPolicy || 'set-min-size';
    }
    /**
     * Dispose of the resources held by the layout.
     *
     * #### Notes
     * This should be reimplemented to clear and dispose of the widgets.
     *
     * All reimplementations should call the superclass method.
     *
     * This method is called automatically when the parent is disposed.
     */
    Layout.prototype.dispose = function () {
        this._parent = null;
        this._disposed = true;
        signaling_1.Signal.clearData(this);
        properties_1.AttachedProperty.clearData(this);
    };
    Object.defineProperty(Layout.prototype, "isDisposed", {
        /**
         * Test whether the layout is disposed.
         */
        get: function () {
            return this._disposed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layout.prototype, "parent", {
        /**
         * Get the parent widget of the layout.
         */
        get: function () {
            return this._parent;
        },
        /**
         * Set the parent widget of the layout.
         *
         * #### Notes
         * This is set automatically when installing the layout on the parent
         * widget. The parent widget should not be set directly by user code.
         */
        set: function (value) {
            if (this._parent === value) {
                return;
            }
            if (this._parent) {
                throw new Error('Cannot change parent widget.');
            }
            if (value.layout !== this) {
                throw new Error('Invalid parent widget.');
            }
            this._parent = value;
            this.init();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layout.prototype, "fitPolicy", {
        /**
         * Get the fit policy for the layout.
         *
         * #### Notes
         * The fit policy controls the computed size constraints which are
         * applied to the parent widget by the layout.
         *
         * Some layout implementations may ignore the fit policy.
         */
        get: function () {
            return this._fitPolicy;
        },
        /**
         * Set the fit policy for the layout.
         *
         * #### Notes
         * The fit policy controls the computed size constraints which are
         * applied to the parent widget by the layout.
         *
         * Some layout implementations may ignore the fit policy.
         *
         * Changing the fit policy will clear the current size constraint
         * for the parent widget and then re-fit the parent.
         */
        set: function (value) {
            // Bail if the policy does not change
            if (this._fitPolicy === value) {
                return;
            }
            // Update the internal policy.
            this._fitPolicy = value;
            // Clear the size constraints and schedule a fit of the parent.
            if (this._parent) {
                var style = this._parent.node.style;
                style.minWidth = '';
                style.minHeight = '';
                style.maxWidth = '';
                style.maxHeight = '';
                this._parent.fit();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Process a message sent to the parent widget.
     *
     * @param msg - The message sent to the parent widget.
     *
     * #### Notes
     * This method is called by the parent widget to process a message.
     *
     * Subclasses may reimplement this method as needed.
     */
    Layout.prototype.processParentMessage = function (msg) {
        switch (msg.type) {
            case 'resize':
                this.onResize(msg);
                break;
            case 'update-request':
                this.onUpdateRequest(msg);
                break;
            case 'fit-request':
                this.onFitRequest(msg);
                break;
            case 'before-show':
                this.onBeforeShow(msg);
                break;
            case 'after-show':
                this.onAfterShow(msg);
                break;
            case 'before-hide':
                this.onBeforeHide(msg);
                break;
            case 'after-hide':
                this.onAfterHide(msg);
                break;
            case 'before-attach':
                this.onBeforeAttach(msg);
                break;
            case 'after-attach':
                this.onAfterAttach(msg);
                break;
            case 'before-detach':
                this.onBeforeDetach(msg);
                break;
            case 'after-detach':
                this.onAfterDetach(msg);
                break;
            case 'child-removed':
                this.onChildRemoved(msg);
                break;
            case 'child-shown':
                this.onChildShown(msg);
                break;
            case 'child-hidden':
                this.onChildHidden(msg);
                break;
        }
    };
    /**
     * Perform layout initialization which requires the parent widget.
     *
     * #### Notes
     * This method is invoked immediately after the layout is installed
     * on the parent widget.
     *
     * The default implementation reparents all of the widgets to the
     * layout parent widget.
     *
     * Subclasses should reimplement this method and attach the child
     * widget nodes to the parent widget's node.
     */
    Layout.prototype.init = function () {
        var _this = this;
        algorithm_1.each(this, function (widget) {
            widget.parent = _this.parent;
        });
    };
    /**
     * A message handler invoked on a `'resize'` message.
     *
     * #### Notes
     * The layout should ensure that its widgets are resized according
     * to the specified layout space, and that they are sent a `'resize'`
     * message if appropriate.
     *
     * The default implementation of this method sends an `UnknownSize`
     * resize message to all widgets.
     *
     * This may be reimplemented by subclasses as needed.
     */
    Layout.prototype.onResize = function (msg) {
        algorithm_1.each(this, function (widget) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.ResizeMessage.UnknownSize);
        });
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     *
     * #### Notes
     * The layout should ensure that its widgets are resized according
     * to the available layout space, and that they are sent a `'resize'`
     * message if appropriate.
     *
     * The default implementation of this method sends an `UnknownSize`
     * resize message to all widgets.
     *
     * This may be reimplemented by subclasses as needed.
     */
    Layout.prototype.onUpdateRequest = function (msg) {
        algorithm_1.each(this, function (widget) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.ResizeMessage.UnknownSize);
        });
    };
    /**
     * A message handler invoked on a `'before-attach'` message.
     *
     * #### Notes
     * The default implementation of this method forwards the message
     * to all widgets. It assumes all widget nodes are attached to the
     * parent widget node.
     *
     * This may be reimplemented by subclasses as needed.
     */
    Layout.prototype.onBeforeAttach = function (msg) {
        algorithm_1.each(this, function (widget) {
            messaging_1.MessageLoop.sendMessage(widget, msg);
        });
    };
    /**
     * A message handler invoked on an `'after-attach'` message.
     *
     * #### Notes
     * The default implementation of this method forwards the message
     * to all widgets. It assumes all widget nodes are attached to the
     * parent widget node.
     *
     * This may be reimplemented by subclasses as needed.
     */
    Layout.prototype.onAfterAttach = function (msg) {
        algorithm_1.each(this, function (widget) {
            messaging_1.MessageLoop.sendMessage(widget, msg);
        });
    };
    /**
     * A message handler invoked on a `'before-detach'` message.
     *
     * #### Notes
     * The default implementation of this method forwards the message
     * to all widgets. It assumes all widget nodes are attached to the
     * parent widget node.
     *
     * This may be reimplemented by subclasses as needed.
     */
    Layout.prototype.onBeforeDetach = function (msg) {
        algorithm_1.each(this, function (widget) {
            messaging_1.MessageLoop.sendMessage(widget, msg);
        });
    };
    /**
     * A message handler invoked on an `'after-detach'` message.
     *
     * #### Notes
     * The default implementation of this method forwards the message
     * to all widgets. It assumes all widget nodes are attached to the
     * parent widget node.
     *
     * This may be reimplemented by subclasses as needed.
     */
    Layout.prototype.onAfterDetach = function (msg) {
        algorithm_1.each(this, function (widget) {
            messaging_1.MessageLoop.sendMessage(widget, msg);
        });
    };
    /**
     * A message handler invoked on a `'before-show'` message.
     *
     * #### Notes
     * The default implementation of this method forwards the message to
     * all non-hidden widgets. It assumes all widget nodes are attached
     * to the parent widget node.
     *
     * This may be reimplemented by subclasses as needed.
     */
    Layout.prototype.onBeforeShow = function (msg) {
        algorithm_1.each(this, function (widget) {
            if (!widget.isHidden) {
                messaging_1.MessageLoop.sendMessage(widget, msg);
            }
        });
    };
    /**
     * A message handler invoked on an `'after-show'` message.
     *
     * #### Notes
     * The default implementation of this method forwards the message to
     * all non-hidden widgets. It assumes all widget nodes are attached
     * to the parent widget node.
     *
     * This may be reimplemented by subclasses as needed.
     */
    Layout.prototype.onAfterShow = function (msg) {
        algorithm_1.each(this, function (widget) {
            if (!widget.isHidden) {
                messaging_1.MessageLoop.sendMessage(widget, msg);
            }
        });
    };
    /**
     * A message handler invoked on a `'before-hide'` message.
     *
     * #### Notes
     * The default implementation of this method forwards the message to
     * all non-hidden widgets. It assumes all widget nodes are attached
     * to the parent widget node.
     *
     * This may be reimplemented by subclasses as needed.
     */
    Layout.prototype.onBeforeHide = function (msg) {
        algorithm_1.each(this, function (widget) {
            if (!widget.isHidden) {
                messaging_1.MessageLoop.sendMessage(widget, msg);
            }
        });
    };
    /**
     * A message handler invoked on an `'after-hide'` message.
     *
     * #### Notes
     * The default implementation of this method forwards the message to
     * all non-hidden widgets. It assumes all widget nodes are attached
     * to the parent widget node.
     *
     * This may be reimplemented by subclasses as needed.
     */
    Layout.prototype.onAfterHide = function (msg) {
        algorithm_1.each(this, function (widget) {
            if (!widget.isHidden) {
                messaging_1.MessageLoop.sendMessage(widget, msg);
            }
        });
    };
    /**
     * A message handler invoked on a `'child-removed'` message.
     *
     * #### Notes
     * This will remove the child widget from the layout.
     *
     * Subclasses should **not** typically reimplement this method.
     */
    Layout.prototype.onChildRemoved = function (msg) {
        this.removeWidget(msg.child);
    };
    /**
     * A message handler invoked on a `'fit-request'` message.
     *
     * #### Notes
     * The default implementation of this handler is a no-op.
     */
    Layout.prototype.onFitRequest = function (msg) { };
    /**
     * A message handler invoked on a `'child-shown'` message.
     *
     * #### Notes
     * The default implementation of this handler is a no-op.
     */
    Layout.prototype.onChildShown = function (msg) { };
    /**
     * A message handler invoked on a `'child-hidden'` message.
     *
     * #### Notes
     * The default implementation of this handler is a no-op.
     */
    Layout.prototype.onChildHidden = function (msg) { };
    return Layout;
}());
exports.Layout = Layout;
/**
 * The namespace for the `Layout` class statics.
 */
(function (Layout) {
    /**
     * Get the horizontal alignment for a widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The horizontal alignment for the widget.
     *
     * #### Notes
     * If the layout width allocated to a widget is larger than its max
     * width, the horizontal alignment controls how the widget is placed
     * within the extra horizontal space.
     *
     * If the allocated width is less than the widget's max width, the
     * horizontal alignment has no effect.
     *
     * Some layout implementations may ignore horizontal alignment.
     */
    function getHorizontalAlignment(widget) {
        return Private.horizontalAlignmentProperty.get(widget);
    }
    Layout.getHorizontalAlignment = getHorizontalAlignment;
    /**
     * Set the horizontal alignment for a widget.
     *
     * @param widget - The widget of interest.
     *
     * @param value - The value for the horizontal alignment.
     *
     * #### Notes
     * If the layout width allocated to a widget is larger than its max
     * width, the horizontal alignment controls how the widget is placed
     * within the extra horizontal space.
     *
     * If the allocated width is less than the widget's max width, the
     * horizontal alignment has no effect.
     *
     * Some layout implementations may ignore horizontal alignment.
     *
     * Changing the horizontal alignment will post an `update-request`
     * message to widget's parent, provided the parent has a layout
     * installed.
     */
    function setHorizontalAlignment(widget, value) {
        Private.horizontalAlignmentProperty.set(widget, value);
    }
    Layout.setHorizontalAlignment = setHorizontalAlignment;
    /**
     * Get the vertical alignment for a widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The vertical alignment for the widget.
     *
     * #### Notes
     * If the layout height allocated to a widget is larger than its max
     * height, the vertical alignment controls how the widget is placed
     * within the extra vertical space.
     *
     * If the allocated height is less than the widget's max height, the
     * vertical alignment has no effect.
     *
     * Some layout implementations may ignore vertical alignment.
     */
    function getVerticalAlignment(widget) {
        return Private.verticalAlignmentProperty.get(widget);
    }
    Layout.getVerticalAlignment = getVerticalAlignment;
    /**
     * Set the vertical alignment for a widget.
     *
     * @param widget - The widget of interest.
     *
     * @param value - The value for the vertical alignment.
     *
     * #### Notes
     * If the layout height allocated to a widget is larger than its max
     * height, the vertical alignment controls how the widget is placed
     * within the extra vertical space.
     *
     * If the allocated height is less than the widget's max height, the
     * vertical alignment has no effect.
     *
     * Some layout implementations may ignore vertical alignment.
     *
     * Changing the horizontal alignment will post an `update-request`
     * message to widget's parent, provided the parent has a layout
     * installed.
     */
    function setVerticalAlignment(widget, value) {
        Private.verticalAlignmentProperty.set(widget, value);
    }
    Layout.setVerticalAlignment = setVerticalAlignment;
})(Layout = exports.Layout || (exports.Layout = {}));
exports.Layout = Layout;
/**
 * An object which assists in the absolute layout of widgets.
 *
 * #### Notes
 * This class is useful when implementing a layout which arranges its
 * widgets using absolute positioning.
 *
 * This class is used by nearly all of the built-in lumino layouts.
 */
var LayoutItem = /** @class */ (function () {
    /**
     * Construct a new layout item.
     *
     * @param widget - The widget to be managed by the item.
     *
     * #### Notes
     * The widget will be set to absolute positioning.
     */
    function LayoutItem(widget) {
        this._top = NaN;
        this._left = NaN;
        this._width = NaN;
        this._height = NaN;
        this._minWidth = 0;
        this._minHeight = 0;
        this._maxWidth = Infinity;
        this._maxHeight = Infinity;
        this._disposed = false;
        this.widget = widget;
        this.widget.node.style.position = 'absolute';
    }
    /**
     * Dispose of the the layout item.
     *
     * #### Notes
     * This will reset the positioning of the widget.
     */
    LayoutItem.prototype.dispose = function () {
        // Do nothing if the item is already disposed.
        if (this._disposed) {
            return;
        }
        // Mark the item as disposed.
        this._disposed = true;
        // Reset the widget style.
        var style = this.widget.node.style;
        style.position = '';
        style.top = '';
        style.left = '';
        style.width = '';
        style.height = '';
    };
    Object.defineProperty(LayoutItem.prototype, "minWidth", {
        /**
         * The computed minimum width of the widget.
         *
         * #### Notes
         * This value can be updated by calling the `fit` method.
         */
        get: function () {
            return this._minWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutItem.prototype, "minHeight", {
        /**
         * The computed minimum height of the widget.
         *
         * #### Notes
         * This value can be updated by calling the `fit` method.
         */
        get: function () {
            return this._minHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutItem.prototype, "maxWidth", {
        /**
         * The computed maximum width of the widget.
         *
         * #### Notes
         * This value can be updated by calling the `fit` method.
         */
        get: function () {
            return this._maxWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutItem.prototype, "maxHeight", {
        /**
         * The computed maximum height of the widget.
         *
         * #### Notes
         * This value can be updated by calling the `fit` method.
         */
        get: function () {
            return this._maxHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutItem.prototype, "isDisposed", {
        /**
         * Whether the layout item is disposed.
         */
        get: function () {
            return this._disposed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutItem.prototype, "isHidden", {
        /**
         * Whether the managed widget is hidden.
         */
        get: function () {
            return this.widget.isHidden;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutItem.prototype, "isVisible", {
        /**
         * Whether the managed widget is visible.
         */
        get: function () {
            return this.widget.isVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutItem.prototype, "isAttached", {
        /**
         * Whether the managed widget is attached.
         */
        get: function () {
            return this.widget.isAttached;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Update the computed size limits of the managed widget.
     */
    LayoutItem.prototype.fit = function () {
        var limits = domutils_1.ElementExt.sizeLimits(this.widget.node);
        this._minWidth = limits.minWidth;
        this._minHeight = limits.minHeight;
        this._maxWidth = limits.maxWidth;
        this._maxHeight = limits.maxHeight;
    };
    /**
     * Update the position and size of the managed widget.
     *
     * @param left - The left edge position of the layout box.
     *
     * @param top - The top edge position of the layout box.
     *
     * @param width - The width of the layout box.
     *
     * @param height - The height of the layout box.
     */
    LayoutItem.prototype.update = function (left, top, width, height) {
        // Clamp the size to the computed size limits.
        var clampW = Math.max(this._minWidth, Math.min(width, this._maxWidth));
        var clampH = Math.max(this._minHeight, Math.min(height, this._maxHeight));
        // Adjust the left edge for the horizontal alignment, if needed.
        if (clampW < width) {
            switch (Layout.getHorizontalAlignment(this.widget)) {
                case 'left':
                    break;
                case 'center':
                    left += (width - clampW) / 2;
                    break;
                case 'right':
                    left += width - clampW;
                    break;
                default:
                    throw 'unreachable';
            }
        }
        // Adjust the top edge for the vertical alignment, if needed.
        if (clampH < height) {
            switch (Layout.getVerticalAlignment(this.widget)) {
                case 'top':
                    break;
                case 'center':
                    top += (height - clampH) / 2;
                    break;
                case 'bottom':
                    top += height - clampH;
                    break;
                default:
                    throw 'unreachable';
            }
        }
        // Set up the resize variables.
        var resized = false;
        var style = this.widget.node.style;
        // Update the top edge of the widget if needed.
        if (this._top !== top) {
            this._top = top;
            style.top = top + "px";
        }
        // Update the left edge of the widget if needed.
        if (this._left !== left) {
            this._left = left;
            style.left = left + "px";
        }
        // Update the width of the widget if needed.
        if (this._width !== clampW) {
            resized = true;
            this._width = clampW;
            style.width = clampW + "px";
        }
        // Update the height of the widget if needed.
        if (this._height !== clampH) {
            resized = true;
            this._height = clampH;
            style.height = clampH + "px";
        }
        // Send a resize message to the widget if needed.
        if (resized) {
            var msg = new widget_1.Widget.ResizeMessage(clampW, clampH);
            messaging_1.MessageLoop.sendMessage(this.widget, msg);
        }
    };
    return LayoutItem;
}());
exports.LayoutItem = LayoutItem;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * The attached property for a widget horizontal alignment.
     */
    Private.horizontalAlignmentProperty = new properties_1.AttachedProperty({
        name: 'horizontalAlignment',
        create: function () { return 'center'; },
        changed: onAlignmentChanged
    });
    /**
     * The attached property for a widget vertical alignment.
     */
    Private.verticalAlignmentProperty = new properties_1.AttachedProperty({
        name: 'verticalAlignment',
        create: function () { return 'top'; },
        changed: onAlignmentChanged
    });
    /**
     * The change handler for the attached alignment properties.
     */
    function onAlignmentChanged(child) {
        if (child.parent && child.parent.layout) {
            child.parent.update();
        }
    }
})(Private || (Private = {}));

})
		], [
			/* @lumino/widgets: 57 */
			"lib/index.js", ["cjs","js"], {"./boxengine": 66, "./boxlayout": 65, "./boxpanel": 64, "./commandpalette": 63, "./contextmenu": 62, "./docklayout": 61, "./dockpanel": 60, "./focustracker": 59, "./gridlayout": 58, "./layout": 56, "./menu": 55, "./menubar": 54, "./panel": 53, "./panellayout": 52, "./scrollbar": 51, "./singletonlayout": 50, "./splitlayout": 49, "./splitpanel": 48, "./stackedlayout": 47, "./stackedpanel": 46, "./tabbar": 45, "./tabpanel": 44, "./title": 43, "./widget": 42}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
__export(require("./boxengine"));
__export(require("./boxlayout"));
__export(require("./boxpanel"));
__export(require("./commandpalette"));
__export(require("./contextmenu"));
__export(require("./docklayout"));
__export(require("./dockpanel"));
__export(require("./focustracker"));
__export(require("./gridlayout"));
__export(require("./layout"));
__export(require("./menu"));
__export(require("./menubar"));
__export(require("./panel"));
__export(require("./panellayout"));
__export(require("./scrollbar"));
__export(require("./singletonlayout"));
__export(require("./splitlayout"));
__export(require("./splitpanel"));
__export(require("./stackedlayout"));
__export(require("./stackedpanel"));
__export(require("./tabbar"));
__export(require("./tabpanel"));
__export(require("./title"));
__export(require("./widget"));

})
		], [
			/* @lumino/widgets: 58 */
			"lib/gridlayout.js", ["cjs","js"], {"./boxengine": 66, "./layout": 56, "./widget": 42, "@lumino/algorithm": 11, "@lumino/domutils": 33, "@lumino/messaging": 38, "@lumino/properties": 39}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
var domutils_1 = require("@lumino/domutils");
var messaging_1 = require("@lumino/messaging");
var properties_1 = require("@lumino/properties");
var boxengine_1 = require("./boxengine");
var layout_1 = require("./layout");
var widget_1 = require("./widget");
/**
 * A layout which arranges its widgets in a grid.
 */
var GridLayout = /** @class */ (function (_super) {
    __extends(GridLayout, _super);
    /**
     * Construct a new grid layout.
     *
     * @param options - The options for initializing the layout.
     */
    function GridLayout(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this._dirty = false;
        _this._rowSpacing = 4;
        _this._columnSpacing = 4;
        _this._items = [];
        _this._rowStarts = [];
        _this._columnStarts = [];
        _this._rowSizers = [new boxengine_1.BoxSizer()];
        _this._columnSizers = [new boxengine_1.BoxSizer()];
        _this._box = null;
        if (options.rowCount !== undefined) {
            Private.reallocSizers(_this._rowSizers, options.rowCount);
        }
        if (options.columnCount !== undefined) {
            Private.reallocSizers(_this._columnSizers, options.columnCount);
        }
        if (options.rowSpacing !== undefined) {
            _this._rowSpacing = Private.clampValue(options.rowSpacing);
        }
        if (options.columnSpacing !== undefined) {
            _this._columnSpacing = Private.clampValue(options.columnSpacing);
        }
        return _this;
    }
    /**
     * Dispose of the resources held by the layout.
     */
    GridLayout.prototype.dispose = function () {
        // Dispose of the widgets and layout items.
        algorithm_1.each(this._items, function (item) {
            var widget = item.widget;
            item.dispose();
            widget.dispose();
        });
        // Clear the layout state.
        this._box = null;
        this._items.length = 0;
        this._rowStarts.length = 0;
        this._rowSizers.length = 0;
        this._columnStarts.length = 0;
        this._columnSizers.length = 0;
        // Dispose of the rest of the layout.
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(GridLayout.prototype, "rowCount", {
        /**
         * Get the number of rows in the layout.
         */
        get: function () {
            return this._rowSizers.length;
        },
        /**
         * Set the number of rows in the layout.
         *
         * #### Notes
         * The minimum row count is `1`.
         */
        set: function (value) {
            // Do nothing if the row count does not change.
            if (value === this.rowCount) {
                return;
            }
            // Reallocate the row sizers.
            Private.reallocSizers(this._rowSizers, value);
            // Schedule a fit of the parent.
            if (this.parent) {
                this.parent.fit();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridLayout.prototype, "columnCount", {
        /**
         * Get the number of columns in the layout.
         */
        get: function () {
            return this._columnSizers.length;
        },
        /**
         * Set the number of columns in the layout.
         *
         * #### Notes
         * The minimum column count is `1`.
         */
        set: function (value) {
            // Do nothing if the column count does not change.
            if (value === this.columnCount) {
                return;
            }
            // Reallocate the column sizers.
            Private.reallocSizers(this._columnSizers, value);
            // Schedule a fit of the parent.
            if (this.parent) {
                this.parent.fit();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridLayout.prototype, "rowSpacing", {
        /**
         * Get the row spacing for the layout.
         */
        get: function () {
            return this._rowSpacing;
        },
        /**
         * Set the row spacing for the layout.
         */
        set: function (value) {
            // Clamp the spacing to the allowed range.
            value = Private.clampValue(value);
            // Bail if the spacing does not change
            if (this._rowSpacing === value) {
                return;
            }
            // Update the internal spacing.
            this._rowSpacing = value;
            // Schedule a fit of the parent.
            if (this.parent) {
                this.parent.fit();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridLayout.prototype, "columnSpacing", {
        /**
         * Get the column spacing for the layout.
         */
        get: function () {
            return this._columnSpacing;
        },
        /**
         * Set the col spacing for the layout.
         */
        set: function (value) {
            // Clamp the spacing to the allowed range.
            value = Private.clampValue(value);
            // Bail if the spacing does not change
            if (this._columnSpacing === value) {
                return;
            }
            // Update the internal spacing.
            this._columnSpacing = value;
            // Schedule a fit of the parent.
            if (this.parent) {
                this.parent.fit();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the stretch factor for a specific row.
     *
     * @param index - The row index of interest.
     *
     * @returns The stretch factor for the row.
     *
     * #### Notes
     * This returns `-1` if the index is out of range.
     */
    GridLayout.prototype.rowStretch = function (index) {
        var sizer = this._rowSizers[index];
        return sizer ? sizer.stretch : -1;
    };
    /**
     * Set the stretch factor for a specific row.
     *
     * @param index - The row index of interest.
     *
     * @param value - The stretch factor for the row.
     *
     * #### Notes
     * This is a no-op if the index is out of range.
     */
    GridLayout.prototype.setRowStretch = function (index, value) {
        // Look up the row sizer.
        var sizer = this._rowSizers[index];
        // Bail if the index is out of range.
        if (!sizer) {
            return;
        }
        // Clamp the value to the allowed range.
        value = Private.clampValue(value);
        // Bail if the stretch does not change.
        if (sizer.stretch === value) {
            return;
        }
        // Update the sizer stretch.
        sizer.stretch = value;
        // Schedule an update of the parent.
        if (this.parent) {
            this.parent.update();
        }
    };
    /**
     * Get the stretch factor for a specific column.
     *
     * @param index - The column index of interest.
     *
     * @returns The stretch factor for the column.
     *
     * #### Notes
     * This returns `-1` if the index is out of range.
     */
    GridLayout.prototype.columnStretch = function (index) {
        var sizer = this._columnSizers[index];
        return sizer ? sizer.stretch : -1;
    };
    /**
     * Set the stretch factor for a specific column.
     *
     * @param index - The column index of interest.
     *
     * @param value - The stretch factor for the column.
     *
     * #### Notes
     * This is a no-op if the index is out of range.
     */
    GridLayout.prototype.setColumnStretch = function (index, value) {
        // Look up the column sizer.
        var sizer = this._columnSizers[index];
        // Bail if the index is out of range.
        if (!sizer) {
            return;
        }
        // Clamp the value to the allowed range.
        value = Private.clampValue(value);
        // Bail if the stretch does not change.
        if (sizer.stretch === value) {
            return;
        }
        // Update the sizer stretch.
        sizer.stretch = value;
        // Schedule an update of the parent.
        if (this.parent) {
            this.parent.update();
        }
    };
    /**
     * Create an iterator over the widgets in the layout.
     *
     * @returns A new iterator over the widgets in the layout.
     */
    GridLayout.prototype.iter = function () {
        return algorithm_1.map(this._items, function (item) { return item.widget; });
    };
    /**
     * Add a widget to the grid layout.
     *
     * @param widget - The widget to add to the layout.
     *
     * #### Notes
     * If the widget is already contained in the layout, this is no-op.
     */
    GridLayout.prototype.addWidget = function (widget) {
        // Look up the index for the widget.
        var i = algorithm_1.ArrayExt.findFirstIndex(this._items, function (it) { return it.widget === widget; });
        // Bail if the widget is already in the layout.
        if (i !== -1) {
            return;
        }
        // Add the widget to the layout.
        this._items.push(new layout_1.LayoutItem(widget));
        // Attach the widget to the parent.
        if (this.parent) {
            this.attachWidget(widget);
        }
    };
    /**
     * Remove a widget from the grid layout.
     *
     * @param widget - The widget to remove from the layout.
     *
     * #### Notes
     * A widget is automatically removed from the layout when its `parent`
     * is set to `null`. This method should only be invoked directly when
     * removing a widget from a layout which has yet to be installed on a
     * parent widget.
     *
     * This method does *not* modify the widget's `parent`.
     */
    GridLayout.prototype.removeWidget = function (widget) {
        // Look up the index for the widget.
        var i = algorithm_1.ArrayExt.findFirstIndex(this._items, function (it) { return it.widget === widget; });
        // Bail if the widget is not in the layout.
        if (i === -1) {
            return;
        }
        // Remove the widget from the layout.
        var item = algorithm_1.ArrayExt.removeAt(this._items, i);
        // Detach the widget from the parent.
        if (this.parent) {
            this.detachWidget(widget);
        }
        // Dispose the layout item.
        item.dispose();
    };
    /**
     * Perform layout initialization which requires the parent widget.
     */
    GridLayout.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        algorithm_1.each(this, function (widget) { _this.attachWidget(widget); });
    };
    /**
     * Attach a widget to the parent's DOM node.
     *
     * @param widget - The widget to attach to the parent.
     */
    GridLayout.prototype.attachWidget = function (widget) {
        // Send a `'before-attach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.BeforeAttach);
        }
        // Add the widget's node to the parent.
        this.parent.node.appendChild(widget.node);
        // Send an `'after-attach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.AfterAttach);
        }
        // Post a fit request for the parent widget.
        this.parent.fit();
    };
    /**
     * Detach a widget from the parent's DOM node.
     *
     * @param widget - The widget to detach from the parent.
     */
    GridLayout.prototype.detachWidget = function (widget) {
        // Send a `'before-detach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.BeforeDetach);
        }
        // Remove the widget's node from the parent.
        this.parent.node.removeChild(widget.node);
        // Send an `'after-detach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.AfterDetach);
        }
        // Post a fit request for the parent widget.
        this.parent.fit();
    };
    /**
     * A message handler invoked on a `'before-show'` message.
     */
    GridLayout.prototype.onBeforeShow = function (msg) {
        _super.prototype.onBeforeShow.call(this, msg);
        this.parent.update();
    };
    /**
     * A message handler invoked on a `'before-attach'` message.
     */
    GridLayout.prototype.onBeforeAttach = function (msg) {
        _super.prototype.onBeforeAttach.call(this, msg);
        this.parent.fit();
    };
    /**
     * A message handler invoked on a `'child-shown'` message.
     */
    GridLayout.prototype.onChildShown = function (msg) {
        this.parent.fit();
    };
    /**
     * A message handler invoked on a `'child-hidden'` message.
     */
    GridLayout.prototype.onChildHidden = function (msg) {
        this.parent.fit();
    };
    /**
     * A message handler invoked on a `'resize'` message.
     */
    GridLayout.prototype.onResize = function (msg) {
        if (this.parent.isVisible) {
            this._update(msg.width, msg.height);
        }
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    GridLayout.prototype.onUpdateRequest = function (msg) {
        if (this.parent.isVisible) {
            this._update(-1, -1);
        }
    };
    /**
     * A message handler invoked on a `'fit-request'` message.
     */
    GridLayout.prototype.onFitRequest = function (msg) {
        if (this.parent.isAttached) {
            this._fit();
        }
    };
    /**
     * Fit the layout to the total size required by the widgets.
     */
    GridLayout.prototype._fit = function () {
        // Reset the min sizes of the sizers.
        for (var i = 0, n = this.rowCount; i < n; ++i) {
            this._rowSizers[i].minSize = 0;
        }
        for (var i = 0, n = this.columnCount; i < n; ++i) {
            this._columnSizers[i].minSize = 0;
        }
        // Filter for the visible layout items.
        var items = this._items.filter(function (it) { return !it.isHidden; });
        // Fit the layout items.
        for (var i = 0, n = items.length; i < n; ++i) {
            items[i].fit();
        }
        // Get the max row and column index.
        var maxRow = this.rowCount - 1;
        var maxCol = this.columnCount - 1;
        // Sort the items by row span.
        items.sort(Private.rowSpanCmp);
        // Update the min sizes of the row sizers.
        for (var i = 0, n = items.length; i < n; ++i) {
            // Fetch the item.
            var item = items[i];
            // Get the row bounds for the item.
            var config = GridLayout.getCellConfig(item.widget);
            var r1 = Math.min(config.row, maxRow);
            var r2 = Math.min(config.row + config.rowSpan - 1, maxRow);
            // Distribute the minimum height to the sizers as needed.
            Private.distributeMin(this._rowSizers, r1, r2, item.minHeight);
        }
        // Sort the items by column span.
        items.sort(Private.columnSpanCmp);
        // Update the min sizes of the column sizers.
        for (var i = 0, n = items.length; i < n; ++i) {
            // Fetch the item.
            var item = items[i];
            // Get the column bounds for the item.
            var config = GridLayout.getCellConfig(item.widget);
            var c1 = Math.min(config.column, maxCol);
            var c2 = Math.min(config.column + config.columnSpan - 1, maxCol);
            // Distribute the minimum width to the sizers as needed.
            Private.distributeMin(this._columnSizers, c1, c2, item.minWidth);
        }
        // If no size constraint is needed, just update the parent.
        if (this.fitPolicy === 'set-no-constraint') {
            messaging_1.MessageLoop.sendMessage(this.parent, widget_1.Widget.Msg.UpdateRequest);
            return;
        }
        // Set up the computed min size.
        var minH = maxRow * this._rowSpacing;
        var minW = maxCol * this._columnSpacing;
        // Add the sizer minimums to the computed min size.
        for (var i = 0, n = this.rowCount; i < n; ++i) {
            minH += this._rowSizers[i].minSize;
        }
        for (var i = 0, n = this.columnCount; i < n; ++i) {
            minW += this._columnSizers[i].minSize;
        }
        // Update the box sizing and add it to the computed min size.
        var box = this._box = domutils_1.ElementExt.boxSizing(this.parent.node);
        minW += box.horizontalSum;
        minH += box.verticalSum;
        // Update the parent's min size constraints.
        var style = this.parent.node.style;
        style.minWidth = minW + "px";
        style.minHeight = minH + "px";
        // Set the dirty flag to ensure only a single update occurs.
        this._dirty = true;
        // Notify the ancestor that it should fit immediately. This may
        // cause a resize of the parent, fulfilling the required update.
        if (this.parent.parent) {
            messaging_1.MessageLoop.sendMessage(this.parent.parent, widget_1.Widget.Msg.FitRequest);
        }
        // If the dirty flag is still set, the parent was not resized.
        // Trigger the required update on the parent widget immediately.
        if (this._dirty) {
            messaging_1.MessageLoop.sendMessage(this.parent, widget_1.Widget.Msg.UpdateRequest);
        }
    };
    /**
     * Update the layout position and size of the widgets.
     *
     * The parent offset dimensions should be `-1` if unknown.
     */
    GridLayout.prototype._update = function (offsetWidth, offsetHeight) {
        // Clear the dirty flag to indicate the update occurred.
        this._dirty = false;
        // Measure the parent if the offset dimensions are unknown.
        if (offsetWidth < 0) {
            offsetWidth = this.parent.node.offsetWidth;
        }
        if (offsetHeight < 0) {
            offsetHeight = this.parent.node.offsetHeight;
        }
        // Ensure the parent box sizing data is computed.
        if (!this._box) {
            this._box = domutils_1.ElementExt.boxSizing(this.parent.node);
        }
        // Compute the layout area adjusted for border and padding.
        var top = this._box.paddingTop;
        var left = this._box.paddingLeft;
        var width = offsetWidth - this._box.horizontalSum;
        var height = offsetHeight - this._box.verticalSum;
        // Get the max row and column index.
        var maxRow = this.rowCount - 1;
        var maxCol = this.columnCount - 1;
        // Compute the total fixed row and column space.
        var fixedRowSpace = maxRow * this._rowSpacing;
        var fixedColSpace = maxCol * this._columnSpacing;
        // Distribute the available space to the box sizers.
        boxengine_1.BoxEngine.calc(this._rowSizers, Math.max(0, height - fixedRowSpace));
        boxengine_1.BoxEngine.calc(this._columnSizers, Math.max(0, width - fixedColSpace));
        // Update the row start positions.
        for (var i = 0, pos = top, n = this.rowCount; i < n; ++i) {
            this._rowStarts[i] = pos;
            pos += this._rowSizers[i].size + this._rowSpacing;
        }
        // Update the column start positions.
        for (var i = 0, pos = left, n = this.columnCount; i < n; ++i) {
            this._columnStarts[i] = pos;
            pos += this._columnSizers[i].size + this._columnSpacing;
        }
        // Update the geometry of the layout items.
        for (var i = 0, n = this._items.length; i < n; ++i) {
            // Fetch the item.
            var item = this._items[i];
            // Ignore hidden items.
            if (item.isHidden) {
                continue;
            }
            // Fetch the cell bounds for the widget.
            var config = GridLayout.getCellConfig(item.widget);
            var r1 = Math.min(config.row, maxRow);
            var c1 = Math.min(config.column, maxCol);
            var r2 = Math.min(config.row + config.rowSpan - 1, maxRow);
            var c2 = Math.min(config.column + config.columnSpan - 1, maxCol);
            // Compute the cell geometry.
            var x = this._columnStarts[c1];
            var y = this._rowStarts[r1];
            var w = this._columnStarts[c2] + this._columnSizers[c2].size - x;
            var h = this._rowStarts[r2] + this._rowSizers[r2].size - y;
            // Update the geometry of the layout item.
            item.update(x, y, w, h);
        }
    };
    return GridLayout;
}(layout_1.Layout));
exports.GridLayout = GridLayout;
/**
 * The namespace for the `GridLayout` class statics.
 */
(function (GridLayout) {
    /**
     * Get the cell config for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The cell config for the widget.
     */
    function getCellConfig(widget) {
        return Private.cellConfigProperty.get(widget);
    }
    GridLayout.getCellConfig = getCellConfig;
    /**
     * Set the cell config for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @param value - The value for the cell config.
     */
    function setCellConfig(widget, value) {
        Private.cellConfigProperty.set(widget, Private.normalizeConfig(value));
    }
    GridLayout.setCellConfig = setCellConfig;
})(GridLayout = exports.GridLayout || (exports.GridLayout = {}));
exports.GridLayout = GridLayout;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * The property descriptor for the widget cell config.
     */
    Private.cellConfigProperty = new properties_1.AttachedProperty({
        name: 'cellConfig',
        create: function () { return ({ row: 0, column: 0, rowSpan: 1, columnSpan: 1 }); },
        changed: onChildCellConfigChanged
    });
    /**
     * Normalize a partial cell config object.
     */
    function normalizeConfig(config) {
        var row = Math.max(0, Math.floor(config.row || 0));
        var column = Math.max(0, Math.floor(config.column || 0));
        var rowSpan = Math.max(1, Math.floor(config.rowSpan || 0));
        var columnSpan = Math.max(1, Math.floor(config.columnSpan || 0));
        return { row: row, column: column, rowSpan: rowSpan, columnSpan: columnSpan };
    }
    Private.normalizeConfig = normalizeConfig;
    /**
     * Clamp a value to an integer >= 0.
     */
    function clampValue(value) {
        return Math.max(0, Math.floor(value));
    }
    Private.clampValue = clampValue;
    /**
     * A sort comparison function for row spans.
     */
    function rowSpanCmp(a, b) {
        var c1 = Private.cellConfigProperty.get(a.widget);
        var c2 = Private.cellConfigProperty.get(b.widget);
        return c1.rowSpan - c2.rowSpan;
    }
    Private.rowSpanCmp = rowSpanCmp;
    /**
     * A sort comparison function for column spans.
     */
    function columnSpanCmp(a, b) {
        var c1 = Private.cellConfigProperty.get(a.widget);
        var c2 = Private.cellConfigProperty.get(b.widget);
        return c1.columnSpan - c2.columnSpan;
    }
    Private.columnSpanCmp = columnSpanCmp;
    /**
     * Reallocate the box sizers for the given grid dimensions.
     */
    function reallocSizers(sizers, count) {
        // Coerce the count to the valid range.
        count = Math.max(1, Math.floor(count));
        // Add the missing sizers.
        while (sizers.length < count) {
            sizers.push(new boxengine_1.BoxSizer());
        }
        // Remove the extra sizers.
        if (sizers.length > count) {
            sizers.length = count;
        }
    }
    Private.reallocSizers = reallocSizers;
    /**
     * Distribute a min size constraint across a range of sizers.
     */
    function distributeMin(sizers, i1, i2, minSize) {
        // Sanity check the indices.
        if (i2 < i1) {
            return;
        }
        // Handle the simple case of no cell span.
        if (i1 === i2) {
            var sizer = sizers[i1];
            sizer.minSize = Math.max(sizer.minSize, minSize);
            return;
        }
        // Compute the total current min size of the span.
        var totalMin = 0;
        for (var i = i1; i <= i2; ++i) {
            totalMin += sizers[i].minSize;
        }
        // Do nothing if the total is greater than the required.
        if (totalMin >= minSize) {
            return;
        }
        // Compute the portion of the space to allocate to each sizer.
        var portion = (minSize - totalMin) / (i2 - i1 + 1);
        // Add the portion to each sizer.
        for (var i = i1; i <= i2; ++i) {
            sizers[i].minSize += portion;
        }
    }
    Private.distributeMin = distributeMin;
    /**
     * The change handler for the child cell config property.
     */
    function onChildCellConfigChanged(child) {
        if (child.parent && child.parent.layout instanceof GridLayout) {
            child.parent.fit();
        }
    }
})(Private || (Private = {}));

})
		], [
			/* @lumino/widgets: 59 */
			"lib/focustracker.js", ["cjs","js"], {"@lumino/algorithm": 11, "@lumino/signaling": 40}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
var signaling_1 = require("@lumino/signaling");
/**
 * A class which tracks focus among a set of widgets.
 *
 * This class is useful when code needs to keep track of the most
 * recently focused widget(s) among a set of related widgets.
 */
var FocusTracker = /** @class */ (function () {
    /**
     * Construct a new focus tracker.
     */
    function FocusTracker() {
        this._counter = 0;
        this._widgets = [];
        this._activeWidget = null;
        this._currentWidget = null;
        this._numbers = new Map();
        this._nodes = new Map();
        this._activeChanged = new signaling_1.Signal(this);
        this._currentChanged = new signaling_1.Signal(this);
    }
    /**
     * Dispose of the resources held by the tracker.
     */
    FocusTracker.prototype.dispose = function () {
        var _this = this;
        // Do nothing if the tracker is already disposed.
        if (this._counter < 0) {
            return;
        }
        // Mark the tracker as disposed.
        this._counter = -1;
        // Clear the connections for the tracker.
        signaling_1.Signal.clearData(this);
        // Remove all event listeners.
        algorithm_1.each(this._widgets, function (w) {
            w.node.removeEventListener('focus', _this, true);
            w.node.removeEventListener('blur', _this, true);
        });
        // Clear the internal data structures.
        this._activeWidget = null;
        this._currentWidget = null;
        this._nodes.clear();
        this._numbers.clear();
        this._widgets.length = 0;
    };
    Object.defineProperty(FocusTracker.prototype, "currentChanged", {
        /**
         * A signal emitted when the current widget has changed.
         */
        get: function () {
            return this._currentChanged;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusTracker.prototype, "activeChanged", {
        /**
         * A signal emitted when the active widget has changed.
         */
        get: function () {
            return this._activeChanged;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusTracker.prototype, "isDisposed", {
        /**
         * A flag indicating whether the tracker is disposed.
         */
        get: function () {
            return this._counter < 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusTracker.prototype, "currentWidget", {
        /**
         * The current widget in the tracker.
         *
         * #### Notes
         * The current widget is the widget among the tracked widgets which
         * has the *descendant node* which has most recently been focused.
         *
         * The current widget will not be updated if the node loses focus. It
         * will only be updated when a different tracked widget gains focus.
         *
         * If the current widget is removed from the tracker, the previous
         * current widget will be restored.
         *
         * This behavior is intended to follow a user's conceptual model of
         * a semantically "current" widget, where the "last thing of type X"
         * to be interacted with is the "current instance of X", regardless
         * of whether that instance still has focus.
         */
        get: function () {
            return this._currentWidget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusTracker.prototype, "activeWidget", {
        /**
         * The active widget in the tracker.
         *
         * #### Notes
         * The active widget is the widget among the tracked widgets which
         * has the *descendant node* which is currently focused.
         */
        get: function () {
            return this._activeWidget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusTracker.prototype, "widgets", {
        /**
         * A read only array of the widgets being tracked.
         */
        get: function () {
            return this._widgets;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the focus number for a particular widget in the tracker.
     *
     * @param widget - The widget of interest.
     *
     * @returns The focus number for the given widget, or `-1` if the
     *   widget has not had focus since being added to the tracker, or
     *   is not contained by the tracker.
     *
     * #### Notes
     * The focus number indicates the relative order in which the widgets
     * have gained focus. A widget with a larger number has gained focus
     * more recently than a widget with a smaller number.
     *
     * The `currentWidget` will always have the largest focus number.
     *
     * All widgets start with a focus number of `-1`, which indicates that
     * the widget has not been focused since being added to the tracker.
     */
    FocusTracker.prototype.focusNumber = function (widget) {
        var n = this._numbers.get(widget);
        return n === undefined ? -1 : n;
    };
    /**
     * Test whether the focus tracker contains a given widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns `true` if the widget is tracked, `false` otherwise.
     */
    FocusTracker.prototype.has = function (widget) {
        return this._numbers.has(widget);
    };
    /**
     * Add a widget to the focus tracker.
     *
     * @param widget - The widget of interest.
     *
     * #### Notes
     * A widget will be automatically removed from the tracker if it
     * is disposed after being added.
     *
     * If the widget is already tracked, this is a no-op.
     */
    FocusTracker.prototype.add = function (widget) {
        // Do nothing if the widget is already tracked.
        if (this._numbers.has(widget)) {
            return;
        }
        // Test whether the widget has focus.
        var focused = widget.node.contains(document.activeElement);
        // Set up the initial focus number.
        var n = focused ? this._counter++ : -1;
        // Add the widget to the internal data structures.
        this._widgets.push(widget);
        this._numbers.set(widget, n);
        this._nodes.set(widget.node, widget);
        // Set up the event listeners. The capturing phase must be used
        // since the 'focus' and 'blur' events don't bubble and Firefox
        // doesn't support the 'focusin' or 'focusout' events.
        widget.node.addEventListener('focus', this, true);
        widget.node.addEventListener('blur', this, true);
        // Connect the disposed signal handler.
        widget.disposed.connect(this._onWidgetDisposed, this);
        // Set the current and active widgets if needed.
        if (focused) {
            this._setWidgets(widget, widget);
        }
    };
    /**
     * Remove a widget from the focus tracker.
     *
     * #### Notes
     * If the widget is the `currentWidget`, the previous current widget
     * will become the new `currentWidget`.
     *
     * A widget will be automatically removed from the tracker if it
     * is disposed after being added.
     *
     * If the widget is not tracked, this is a no-op.
     */
    FocusTracker.prototype.remove = function (widget) {
        var _this = this;
        // Bail early if the widget is not tracked.
        if (!this._numbers.has(widget)) {
            return;
        }
        // Disconnect the disposed signal handler.
        widget.disposed.disconnect(this._onWidgetDisposed, this);
        // Remove the event listeners.
        widget.node.removeEventListener('focus', this, true);
        widget.node.removeEventListener('blur', this, true);
        // Remove the widget from the internal data structures.
        algorithm_1.ArrayExt.removeFirstOf(this._widgets, widget);
        this._nodes.delete(widget.node);
        this._numbers.delete(widget);
        // Bail early if the widget is not the current widget.
        if (this._currentWidget !== widget) {
            return;
        }
        // Filter the widgets for those which have had focus.
        var valid = algorithm_1.filter(this._widgets, function (w) { return _this._numbers.get(w) !== -1; });
        // Get the valid widget with the max focus number.
        var previous = algorithm_1.max(valid, function (first, second) {
            var a = _this._numbers.get(first);
            var b = _this._numbers.get(second);
            return a - b;
        }) || null;
        // Set the current and active widgets.
        this._setWidgets(previous, null);
    };
    /**
     * Handle the DOM events for the focus tracker.
     *
     * @param event - The DOM event sent to the panel.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the tracked nodes. It should
     * not be called directly by user code.
     */
    FocusTracker.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'focus':
                this._evtFocus(event);
                break;
            case 'blur':
                this._evtBlur(event);
                break;
        }
    };
    /**
     * Set the current and active widgets for the tracker.
     */
    FocusTracker.prototype._setWidgets = function (current, active) {
        // Swap the current widget.
        var oldCurrent = this._currentWidget;
        this._currentWidget = current;
        // Swap the active widget.
        var oldActive = this._activeWidget;
        this._activeWidget = active;
        // Emit the `currentChanged` signal if needed.
        if (oldCurrent !== current) {
            this._currentChanged.emit({ oldValue: oldCurrent, newValue: current });
        }
        // Emit the `activeChanged` signal if needed.
        if (oldActive !== active) {
            this._activeChanged.emit({ oldValue: oldActive, newValue: active });
        }
    };
    /**
     * Handle the `'focus'` event for a tracked widget.
     */
    FocusTracker.prototype._evtFocus = function (event) {
        // Find the widget which gained focus, which is known to exist.
        var widget = this._nodes.get(event.currentTarget);
        // Update the focus number if necessary.
        if (widget !== this._currentWidget) {
            this._numbers.set(widget, this._counter++);
        }
        // Set the current and active widgets.
        this._setWidgets(widget, widget);
    };
    /**
     * Handle the `'blur'` event for a tracked widget.
     */
    FocusTracker.prototype._evtBlur = function (event) {
        // Find the widget which lost focus, which is known to exist.
        var widget = this._nodes.get(event.currentTarget);
        // Get the node which being focused after this blur.
        var focusTarget = event.relatedTarget;
        // If no other node is being focused, clear the active widget.
        if (!focusTarget) {
            this._setWidgets(this._currentWidget, null);
            return;
        }
        // Bail if the focus widget is not changing.
        if (widget.node.contains(focusTarget)) {
            return;
        }
        // If no tracked widget is being focused, clear the active widget.
        if (!algorithm_1.find(this._widgets, function (w) { return w.node.contains(focusTarget); })) {
            this._setWidgets(this._currentWidget, null);
            return;
        }
    };
    /**
     * Handle the `disposed` signal for a tracked widget.
     */
    FocusTracker.prototype._onWidgetDisposed = function (sender) {
        this.remove(sender);
    };
    return FocusTracker;
}());
exports.FocusTracker = FocusTracker;

})
		], [
			/* @lumino/widgets: 60 */
			"lib/dockpanel.js", ["cjs","js"], {"./docklayout": 61, "./tabbar": 45, "./widget": 42, "@lumino/algorithm": 11, "@lumino/coreutils": 28, "@lumino/domutils": 33, "@lumino/dragdrop": 36, "@lumino/messaging": 38, "@lumino/properties": 39, "@lumino/signaling": 40}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
var coreutils_1 = require("@lumino/coreutils");
var domutils_1 = require("@lumino/domutils");
var dragdrop_1 = require("@lumino/dragdrop");
var messaging_1 = require("@lumino/messaging");
var properties_1 = require("@lumino/properties");
var signaling_1 = require("@lumino/signaling");
var docklayout_1 = require("./docklayout");
var tabbar_1 = require("./tabbar");
var widget_1 = require("./widget");
/**
 * A widget which provides a flexible docking area for widgets.
 */
var DockPanel = /** @class */ (function (_super) {
    __extends(DockPanel, _super);
    /**
     * Construct a new dock panel.
     *
     * @param options - The options for initializing the panel.
     */
    function DockPanel(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this._drag = null;
        _this._tabsMovable = true;
        _this._pressData = null;
        _this._layoutModified = new signaling_1.Signal(_this);
        _this.addClass('lm-DockPanel');
        /* <DEPRECATED> */
        _this.addClass('p-DockPanel');
        /* </DEPRECATED> */
        _this._mode = options.mode || 'multiple-document';
        _this._renderer = options.renderer || DockPanel.defaultRenderer;
        _this._edges = options.edges || Private.DEFAULT_EDGES;
        if (options.tabsMovable !== undefined) {
            _this._tabsMovable = options.tabsMovable;
        }
        // Toggle the CSS mode attribute.
        _this.dataset['mode'] = _this._mode;
        // Create the delegate renderer for the layout.
        var renderer = {
            createTabBar: function () { return _this._createTabBar(); },
            createHandle: function () { return _this._createHandle(); }
        };
        // Set up the dock layout for the panel.
        _this.layout = new docklayout_1.DockLayout({ renderer: renderer, spacing: options.spacing });
        // Set up the overlay drop indicator.
        _this.overlay = options.overlay || new DockPanel.Overlay();
        _this.node.appendChild(_this.overlay.node);
        return _this;
    }
    /**
     * Dispose of the resources held by the panel.
     */
    DockPanel.prototype.dispose = function () {
        // Ensure the mouse is released.
        this._releaseMouse();
        // Hide the overlay.
        this.overlay.hide(0);
        // Cancel a drag if one is in progress.
        if (this._drag) {
            this._drag.dispose();
        }
        // Dispose of the base class.
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(DockPanel.prototype, "layoutModified", {
        /**
         * A signal emitted when the layout configuration is modified.
         *
         * #### Notes
         * This signal is emitted whenever the current layout configuration
         * may have changed.
         *
         * This signal is emitted asynchronously in a collapsed fashion, so
         * that multiple synchronous modifications results in only a single
         * emit of the signal.
         */
        get: function () {
            return this._layoutModified;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DockPanel.prototype, "renderer", {
        /**
         * The renderer used by the dock panel.
         */
        get: function () {
            return this.layout.renderer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DockPanel.prototype, "spacing", {
        /**
         * Get the spacing between the widgets.
         */
        get: function () {
            return this.layout.spacing;
        },
        /**
         * Set the spacing between the widgets.
         */
        set: function (value) {
            this.layout.spacing = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DockPanel.prototype, "mode", {
        /**
         * Get the mode for the dock panel.
         */
        get: function () {
            return this._mode;
        },
        /**
         * Set the mode for the dock panel.
         *
         * #### Notes
         * Changing the mode is a destructive operation with respect to the
         * panel's layout configuration. If layout state must be preserved,
         * save the current layout config before changing the mode.
         */
        set: function (value) {
            // Bail early if the mode does not change.
            if (this._mode === value) {
                return;
            }
            // Update the internal mode.
            this._mode = value;
            // Toggle the CSS mode attribute.
            this.dataset['mode'] = value;
            // Get the layout for the panel.
            var layout = this.layout;
            // Configure the layout for the specified mode.
            switch (value) {
                case 'multiple-document':
                    algorithm_1.each(layout.tabBars(), function (tabBar) { tabBar.show(); });
                    break;
                case 'single-document':
                    layout.restoreLayout(Private.createSingleDocumentConfig(this));
                    break;
                default:
                    throw 'unreachable';
            }
            // Schedule an emit of the layout modified signal.
            messaging_1.MessageLoop.postMessage(this, Private.LayoutModified);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DockPanel.prototype, "tabsMovable", {
        /**
         * Whether the tabs can be dragged / moved at runtime.
         */
        get: function () {
            return this._tabsMovable;
        },
        /**
         * Enable / Disable draggable / movable tabs.
         */
        set: function (value) {
            this._tabsMovable = value;
            algorithm_1.each(this.tabBars(), function (tabbar) { return tabbar.tabsMovable = value; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DockPanel.prototype, "isEmpty", {
        /**
         * Whether the dock panel is empty.
         */
        get: function () {
            return this.layout.isEmpty;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Create an iterator over the user widgets in the panel.
     *
     * @returns A new iterator over the user widgets in the panel.
     *
     * #### Notes
     * This iterator does not include the generated tab bars.
     */
    DockPanel.prototype.widgets = function () {
        return this.layout.widgets();
    };
    /**
     * Create an iterator over the selected widgets in the panel.
     *
     * @returns A new iterator over the selected user widgets.
     *
     * #### Notes
     * This iterator yields the widgets corresponding to the current tab
     * of each tab bar in the panel.
     */
    DockPanel.prototype.selectedWidgets = function () {
        return this.layout.selectedWidgets();
    };
    /**
     * Create an iterator over the tab bars in the panel.
     *
     * @returns A new iterator over the tab bars in the panel.
     *
     * #### Notes
     * This iterator does not include the user widgets.
     */
    DockPanel.prototype.tabBars = function () {
        return this.layout.tabBars();
    };
    /**
     * Create an iterator over the handles in the panel.
     *
     * @returns A new iterator over the handles in the panel.
     */
    DockPanel.prototype.handles = function () {
        return this.layout.handles();
    };
    /**
     * Select a specific widget in the dock panel.
     *
     * @param widget - The widget of interest.
     *
     * #### Notes
     * This will make the widget the current widget in its tab area.
     */
    DockPanel.prototype.selectWidget = function (widget) {
        // Find the tab bar which contains the widget.
        var tabBar = algorithm_1.find(this.tabBars(), function (bar) {
            return bar.titles.indexOf(widget.title) !== -1;
        });
        // Throw an error if no tab bar is found.
        if (!tabBar) {
            throw new Error('Widget is not contained in the dock panel.');
        }
        // Ensure the widget is the current widget.
        tabBar.currentTitle = widget.title;
    };
    /**
     * Activate a specified widget in the dock panel.
     *
     * @param widget - The widget of interest.
     *
     * #### Notes
     * This will select and activate the given widget.
     */
    DockPanel.prototype.activateWidget = function (widget) {
        this.selectWidget(widget);
        widget.activate();
    };
    /**
     * Save the current layout configuration of the dock panel.
     *
     * @returns A new config object for the current layout state.
     *
     * #### Notes
     * The return value can be provided to the `restoreLayout` method
     * in order to restore the layout to its current configuration.
     */
    DockPanel.prototype.saveLayout = function () {
        return this.layout.saveLayout();
    };
    /**
     * Restore the layout to a previously saved configuration.
     *
     * @param config - The layout configuration to restore.
     *
     * #### Notes
     * Widgets which currently belong to the layout but which are not
     * contained in the config will be unparented.
     *
     * The dock panel automatically reverts to `'multiple-document'`
     * mode when a layout config is restored.
     */
    DockPanel.prototype.restoreLayout = function (config) {
        // Reset the mode.
        this._mode = 'multiple-document';
        // Restore the layout.
        this.layout.restoreLayout(config);
        // Flush the message loop on IE and Edge to prevent flicker.
        if (domutils_1.Platform.IS_EDGE || domutils_1.Platform.IS_IE) {
            messaging_1.MessageLoop.flush();
        }
        // Schedule an emit of the layout modified signal.
        messaging_1.MessageLoop.postMessage(this, Private.LayoutModified);
    };
    /**
     * Add a widget to the dock panel.
     *
     * @param widget - The widget to add to the dock panel.
     *
     * @param options - The additional options for adding the widget.
     *
     * #### Notes
     * If the panel is in single document mode, the options are ignored
     * and the widget is always added as tab in the hidden tab bar.
     */
    DockPanel.prototype.addWidget = function (widget, options) {
        if (options === void 0) { options = {}; }
        // Add the widget to the layout.
        if (this._mode === 'single-document') {
            this.layout.addWidget(widget);
        }
        else {
            this.layout.addWidget(widget, options);
        }
        // Schedule an emit of the layout modified signal.
        messaging_1.MessageLoop.postMessage(this, Private.LayoutModified);
    };
    /**
     * Process a message sent to the widget.
     *
     * @param msg - The message sent to the widget.
     */
    DockPanel.prototype.processMessage = function (msg) {
        if (msg.type === 'layout-modified') {
            this._layoutModified.emit(undefined);
        }
        else {
            _super.prototype.processMessage.call(this, msg);
        }
    };
    /**
     * Handle the DOM events for the dock panel.
     *
     * @param event - The DOM event sent to the panel.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the panel's DOM node. It should
     * not be called directly by user code.
     */
    DockPanel.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'lm-dragenter':
                this._evtDragEnter(event);
                break;
            case 'lm-dragleave':
                this._evtDragLeave(event);
                break;
            case 'lm-dragover':
                this._evtDragOver(event);
                break;
            case 'lm-drop':
                this._evtDrop(event);
                break;
            case 'mousedown':
                this._evtMouseDown(event);
                break;
            case 'mousemove':
                this._evtMouseMove(event);
                break;
            case 'mouseup':
                this._evtMouseUp(event);
                break;
            case 'keydown':
                this._evtKeyDown(event);
                break;
            case 'contextmenu':
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    };
    /**
     * A message handler invoked on a `'before-attach'` message.
     */
    DockPanel.prototype.onBeforeAttach = function (msg) {
        this.node.addEventListener('lm-dragenter', this);
        this.node.addEventListener('lm-dragleave', this);
        this.node.addEventListener('lm-dragover', this);
        this.node.addEventListener('lm-drop', this);
        this.node.addEventListener('mousedown', this);
    };
    /**
     * A message handler invoked on an `'after-detach'` message.
     */
    DockPanel.prototype.onAfterDetach = function (msg) {
        this.node.removeEventListener('lm-dragenter', this);
        this.node.removeEventListener('lm-dragleave', this);
        this.node.removeEventListener('lm-dragover', this);
        this.node.removeEventListener('lm-drop', this);
        this.node.removeEventListener('mousedown', this);
        this._releaseMouse();
    };
    /**
     * A message handler invoked on a `'child-added'` message.
     */
    DockPanel.prototype.onChildAdded = function (msg) {
        // Ignore the generated tab bars.
        if (Private.isGeneratedTabBarProperty.get(msg.child)) {
            return;
        }
        // Add the widget class to the child.
        msg.child.addClass('lm-DockPanel-widget');
        /* <DEPRECATED> */
        msg.child.addClass('p-DockPanel-widget');
        /* </DEPRECATED> */
    };
    /**
     * A message handler invoked on a `'child-removed'` message.
     */
    DockPanel.prototype.onChildRemoved = function (msg) {
        // Ignore the generated tab bars.
        if (Private.isGeneratedTabBarProperty.get(msg.child)) {
            return;
        }
        // Remove the widget class from the child.
        msg.child.removeClass('lm-DockPanel-widget');
        /* <DEPRECATED> */
        msg.child.removeClass('p-DockPanel-widget');
        /* </DEPRECATED> */
        // Schedule an emit of the layout modified signal.
        messaging_1.MessageLoop.postMessage(this, Private.LayoutModified);
    };
    /**
     * Handle the `'lm-dragenter'` event for the dock panel.
     */
    DockPanel.prototype._evtDragEnter = function (event) {
        // If the factory mime type is present, mark the event as
        // handled in order to get the rest of the drag events.
        if (event.mimeData.hasData('application/vnd.lumino.widget-factory')) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    /**
     * Handle the `'lm-dragleave'` event for the dock panel.
     */
    DockPanel.prototype._evtDragLeave = function (event) {
        // Mark the event as handled.
        event.preventDefault();
        event.stopPropagation();
        // The new target might be a descendant, so we might still handle the drop.
        // Hide asynchronously so that if a lm-dragover event bubbles up to us, the
        // hide is cancelled by the lm-dragover handler's show overlay logic.
        this.overlay.hide(1);
    };
    /**
     * Handle the `'lm-dragover'` event for the dock panel.
     */
    DockPanel.prototype._evtDragOver = function (event) {
        // Mark the event as handled.
        event.preventDefault();
        event.stopPropagation();
        // Show the drop indicator overlay and update the drop
        // action based on the drop target zone under the mouse.
        if (this._showOverlay(event.clientX, event.clientY) === 'invalid') {
            event.dropAction = 'none';
        }
        else {
            event.dropAction = event.proposedAction;
        }
    };
    /**
     * Handle the `'lm-drop'` event for the dock panel.
     */
    DockPanel.prototype._evtDrop = function (event) {
        // Mark the event as handled.
        event.preventDefault();
        event.stopPropagation();
        // Hide the drop indicator overlay.
        this.overlay.hide(0);
        // Bail if the proposed action is to do nothing.
        if (event.proposedAction === 'none') {
            event.dropAction = 'none';
            return;
        }
        // Find the drop target under the mouse.
        var clientX = event.clientX, clientY = event.clientY;
        var _a = Private.findDropTarget(this, clientX, clientY, this._edges), zone = _a.zone, target = _a.target;
        // Bail if the drop zone is invalid.
        if (zone === 'invalid') {
            event.dropAction = 'none';
            return;
        }
        // Bail if the factory mime type has invalid data.
        var mimeData = event.mimeData;
        var factory = mimeData.getData('application/vnd.lumino.widget-factory');
        if (typeof factory !== 'function') {
            event.dropAction = 'none';
            return;
        }
        // Bail if the factory does not produce a widget.
        var widget = factory();
        if (!(widget instanceof widget_1.Widget)) {
            event.dropAction = 'none';
            return;
        }
        // Bail if the widget is an ancestor of the dock panel.
        if (widget.contains(this)) {
            event.dropAction = 'none';
            return;
        }
        // Find the reference widget for the drop target.
        var ref = target ? Private.getDropRef(target.tabBar) : null;
        // Add the widget according to the indicated drop zone.
        switch (zone) {
            case 'root-all':
                this.addWidget(widget);
                break;
            case 'root-top':
                this.addWidget(widget, { mode: 'split-top' });
                break;
            case 'root-left':
                this.addWidget(widget, { mode: 'split-left' });
                break;
            case 'root-right':
                this.addWidget(widget, { mode: 'split-right' });
                break;
            case 'root-bottom':
                this.addWidget(widget, { mode: 'split-bottom' });
                break;
            case 'widget-all':
                this.addWidget(widget, { mode: 'tab-after', ref: ref });
                break;
            case 'widget-top':
                this.addWidget(widget, { mode: 'split-top', ref: ref });
                break;
            case 'widget-left':
                this.addWidget(widget, { mode: 'split-left', ref: ref });
                break;
            case 'widget-right':
                this.addWidget(widget, { mode: 'split-right', ref: ref });
                break;
            case 'widget-bottom':
                this.addWidget(widget, { mode: 'split-bottom', ref: ref });
                break;
            case 'widget-tab':
                this.addWidget(widget, { mode: 'tab-after', ref: ref });
                break;
            default:
                throw 'unreachable';
        }
        // Accept the proposed drop action.
        event.dropAction = event.proposedAction;
        // Activate the dropped widget.
        this.activateWidget(widget);
    };
    /**
     * Handle the `'keydown'` event for the dock panel.
     */
    DockPanel.prototype._evtKeyDown = function (event) {
        // Stop input events during drag.
        event.preventDefault();
        event.stopPropagation();
        // Release the mouse if `Escape` is pressed.
        if (event.keyCode === 27) {
            // Finalize the mouse release.
            this._releaseMouse();
            // Schedule an emit of the layout modified signal.
            messaging_1.MessageLoop.postMessage(this, Private.LayoutModified);
        }
    };
    /**
     * Handle the `'mousedown'` event for the dock panel.
     */
    DockPanel.prototype._evtMouseDown = function (event) {
        // Do nothing if the left mouse button is not pressed.
        if (event.button !== 0) {
            return;
        }
        // Find the handle which contains the mouse target, if any.
        var layout = this.layout;
        var target = event.target;
        var handle = algorithm_1.find(layout.handles(), function (handle) { return handle.contains(target); });
        if (!handle) {
            return;
        }
        // Stop the event when a handle is pressed.
        event.preventDefault();
        event.stopPropagation();
        // Add the extra document listeners.
        document.addEventListener('keydown', this, true);
        document.addEventListener('mouseup', this, true);
        document.addEventListener('mousemove', this, true);
        document.addEventListener('contextmenu', this, true);
        // Compute the offset deltas for the handle press.
        var rect = handle.getBoundingClientRect();
        var deltaX = event.clientX - rect.left;
        var deltaY = event.clientY - rect.top;
        // Override the cursor and store the press data.
        var style = window.getComputedStyle(handle);
        var override = dragdrop_1.Drag.overrideCursor(style.cursor);
        this._pressData = { handle: handle, deltaX: deltaX, deltaY: deltaY, override: override };
    };
    /**
     * Handle the `'mousemove'` event for the dock panel.
     */
    DockPanel.prototype._evtMouseMove = function (event) {
        // Bail early if no drag is in progress.
        if (!this._pressData) {
            return;
        }
        // Stop the event when dragging a handle.
        event.preventDefault();
        event.stopPropagation();
        // Compute the desired offset position for the handle.
        var rect = this.node.getBoundingClientRect();
        var xPos = event.clientX - rect.left - this._pressData.deltaX;
        var yPos = event.clientY - rect.top - this._pressData.deltaY;
        // Set the handle as close to the desired position as possible.
        var layout = this.layout;
        layout.moveHandle(this._pressData.handle, xPos, yPos);
    };
    /**
     * Handle the `'mouseup'` event for the dock panel.
     */
    DockPanel.prototype._evtMouseUp = function (event) {
        // Do nothing if the left mouse button is not released.
        if (event.button !== 0) {
            return;
        }
        // Stop the event when releasing a handle.
        event.preventDefault();
        event.stopPropagation();
        // Finalize the mouse release.
        this._releaseMouse();
        // Schedule an emit of the layout modified signal.
        messaging_1.MessageLoop.postMessage(this, Private.LayoutModified);
    };
    /**
     * Release the mouse grab for the dock panel.
     */
    DockPanel.prototype._releaseMouse = function () {
        // Bail early if no drag is in progress.
        if (!this._pressData) {
            return;
        }
        // Clear the override cursor.
        this._pressData.override.dispose();
        this._pressData = null;
        // Remove the extra document listeners.
        document.removeEventListener('keydown', this, true);
        document.removeEventListener('mouseup', this, true);
        document.removeEventListener('mousemove', this, true);
        document.removeEventListener('contextmenu', this, true);
    };
    /**
     * Show the overlay indicator at the given client position.
     *
     * Returns the drop zone at the specified client position.
     *
     * #### Notes
     * If the position is not over a valid zone, the overlay is hidden.
     */
    DockPanel.prototype._showOverlay = function (clientX, clientY) {
        // Find the dock target for the given client position.
        var _a = Private.findDropTarget(this, clientX, clientY, this._edges), zone = _a.zone, target = _a.target;
        // If the drop zone is invalid, hide the overlay and bail.
        if (zone === 'invalid') {
            this.overlay.hide(100);
            return zone;
        }
        // Setup the variables needed to compute the overlay geometry.
        var top;
        var left;
        var right;
        var bottom;
        var box = domutils_1.ElementExt.boxSizing(this.node); // TODO cache this?
        var rect = this.node.getBoundingClientRect();
        // Compute the overlay geometry based on the dock zone.
        switch (zone) {
            case 'root-all':
                top = box.paddingTop;
                left = box.paddingLeft;
                right = box.paddingRight;
                bottom = box.paddingBottom;
                break;
            case 'root-top':
                top = box.paddingTop;
                left = box.paddingLeft;
                right = box.paddingRight;
                bottom = rect.height * Private.GOLDEN_RATIO;
                break;
            case 'root-left':
                top = box.paddingTop;
                left = box.paddingLeft;
                right = rect.width * Private.GOLDEN_RATIO;
                bottom = box.paddingBottom;
                break;
            case 'root-right':
                top = box.paddingTop;
                left = rect.width * Private.GOLDEN_RATIO;
                right = box.paddingRight;
                bottom = box.paddingBottom;
                break;
            case 'root-bottom':
                top = rect.height * Private.GOLDEN_RATIO;
                left = box.paddingLeft;
                right = box.paddingRight;
                bottom = box.paddingBottom;
                break;
            case 'widget-all':
                top = target.top;
                left = target.left;
                right = target.right;
                bottom = target.bottom;
                break;
            case 'widget-top':
                top = target.top;
                left = target.left;
                right = target.right;
                bottom = target.bottom + target.height / 2;
                break;
            case 'widget-left':
                top = target.top;
                left = target.left;
                right = target.right + target.width / 2;
                bottom = target.bottom;
                break;
            case 'widget-right':
                top = target.top;
                left = target.left + target.width / 2;
                right = target.right;
                bottom = target.bottom;
                break;
            case 'widget-bottom':
                top = target.top + target.height / 2;
                left = target.left;
                right = target.right;
                bottom = target.bottom;
                break;
            case 'widget-tab':
                var tabHeight = target.tabBar.node.getBoundingClientRect().height;
                top = target.top;
                left = target.left;
                right = target.right;
                bottom = target.bottom + target.height - tabHeight;
                break;
            default:
                throw 'unreachable';
        }
        // Show the overlay with the computed geometry.
        this.overlay.show({ top: top, left: left, right: right, bottom: bottom });
        // Finally, return the computed drop zone.
        return zone;
    };
    /**
     * Create a new tab bar for use by the panel.
     */
    DockPanel.prototype._createTabBar = function () {
        // Create the tab bar.
        var tabBar = this._renderer.createTabBar();
        // Set the generated tab bar property for the tab bar.
        Private.isGeneratedTabBarProperty.set(tabBar, true);
        // Hide the tab bar when in single document mode.
        if (this._mode === 'single-document') {
            tabBar.hide();
        }
        // Enforce necessary tab bar behavior.
        // TODO do we really want to enforce *all* of these?
        tabBar.tabsMovable = this._tabsMovable;
        tabBar.allowDeselect = false;
        tabBar.removeBehavior = 'select-previous-tab';
        tabBar.insertBehavior = 'select-tab-if-needed';
        // Connect the signal handlers for the tab bar.
        tabBar.tabMoved.connect(this._onTabMoved, this);
        tabBar.currentChanged.connect(this._onCurrentChanged, this);
        tabBar.tabCloseRequested.connect(this._onTabCloseRequested, this);
        tabBar.tabDetachRequested.connect(this._onTabDetachRequested, this);
        tabBar.tabActivateRequested.connect(this._onTabActivateRequested, this);
        // Return the initialized tab bar.
        return tabBar;
    };
    /**
     * Create a new handle for use by the panel.
     */
    DockPanel.prototype._createHandle = function () {
        return this._renderer.createHandle();
    };
    /**
     * Handle the `tabMoved` signal from a tab bar.
     */
    DockPanel.prototype._onTabMoved = function () {
        messaging_1.MessageLoop.postMessage(this, Private.LayoutModified);
    };
    /**
     * Handle the `currentChanged` signal from a tab bar.
     */
    DockPanel.prototype._onCurrentChanged = function (sender, args) {
        // Extract the previous and current title from the args.
        var previousTitle = args.previousTitle, currentTitle = args.currentTitle;
        // Hide the previous widget.
        if (previousTitle) {
            previousTitle.owner.hide();
        }
        // Show the current widget.
        if (currentTitle) {
            currentTitle.owner.show();
        }
        // Flush the message loop on IE and Edge to prevent flicker.
        if (domutils_1.Platform.IS_EDGE || domutils_1.Platform.IS_IE) {
            messaging_1.MessageLoop.flush();
        }
        // Schedule an emit of the layout modified signal.
        messaging_1.MessageLoop.postMessage(this, Private.LayoutModified);
    };
    /**
     * Handle the `tabActivateRequested` signal from a tab bar.
     */
    DockPanel.prototype._onTabActivateRequested = function (sender, args) {
        args.title.owner.activate();
    };
    /**
     * Handle the `tabCloseRequested` signal from a tab bar.
     */
    DockPanel.prototype._onTabCloseRequested = function (sender, args) {
        args.title.owner.close();
    };
    /**
     * Handle the `tabDetachRequested` signal from a tab bar.
     */
    DockPanel.prototype._onTabDetachRequested = function (sender, args) {
        var _this = this;
        // Do nothing if a drag is already in progress.
        if (this._drag) {
            return;
        }
        // Release the tab bar's hold on the mouse.
        sender.releaseMouse();
        // Extract the data from the args.
        var title = args.title, tab = args.tab, clientX = args.clientX, clientY = args.clientY;
        // Setup the mime data for the drag operation.
        var mimeData = new coreutils_1.MimeData();
        var factory = function () { return title.owner; };
        mimeData.setData('application/vnd.lumino.widget-factory', factory);
        // Create the drag image for the drag operation.
        var dragImage = tab.cloneNode(true);
        // Create the drag object to manage the drag-drop operation.
        this._drag = new dragdrop_1.Drag({
            mimeData: mimeData, dragImage: dragImage,
            proposedAction: 'move',
            supportedActions: 'move',
        });
        // Hide the tab node in the original tab.
        tab.classList.add('lm-mod-hidden');
        /* <DEPRECATED> */
        tab.classList.add('p-mod-hidden');
        /* </DEPRECATED> */ ;
        // Create the cleanup callback.
        var cleanup = (function () {
            _this._drag = null;
            tab.classList.remove('lm-mod-hidden');
            /* <DEPRECATED> */
            tab.classList.remove('p-mod-hidden');
            /* </DEPRECATED> */ ;
        });
        // Start the drag operation and cleanup when done.
        this._drag.start(clientX, clientY).then(cleanup);
    };
    return DockPanel;
}(widget_1.Widget));
exports.DockPanel = DockPanel;
/**
 * The namespace for the `DockPanel` class statics.
 */
(function (DockPanel) {
    ;
    /**
     * A concrete implementation of `IOverlay`.
     *
     * This is the default overlay implementation for a dock panel.
     */
    var Overlay = /** @class */ (function () {
        /**
         * Construct a new overlay.
         */
        function Overlay() {
            this._timer = -1;
            this._hidden = true;
            this.node = document.createElement('div');
            this.node.classList.add('lm-DockPanel-overlay');
            this.node.classList.add('lm-mod-hidden');
            /* <DEPRECATED> */
            this.node.classList.add('p-DockPanel-overlay');
            this.node.classList.add('p-mod-hidden');
            /* </DEPRECATED> */ ;
            this.node.style.position = 'absolute';
        }
        /**
         * Show the overlay using the given overlay geometry.
         *
         * @param geo - The desired geometry for the overlay.
         */
        Overlay.prototype.show = function (geo) {
            // Update the position of the overlay.
            var style = this.node.style;
            style.top = geo.top + "px";
            style.left = geo.left + "px";
            style.right = geo.right + "px";
            style.bottom = geo.bottom + "px";
            // Clear any pending hide timer.
            clearTimeout(this._timer);
            this._timer = -1;
            // If the overlay is already visible, we're done.
            if (!this._hidden) {
                return;
            }
            // Clear the hidden flag.
            this._hidden = false;
            // Finally, show the overlay.
            this.node.classList.remove('lm-mod-hidden');
            /* <DEPRECATED> */
            this.node.classList.remove('p-mod-hidden');
            /* </DEPRECATED> */ ;
        };
        /**
         * Hide the overlay node.
         *
         * @param delay - The delay (in ms) before hiding the overlay.
         *   A delay value <= 0 will hide the overlay immediately.
         */
        Overlay.prototype.hide = function (delay) {
            var _this = this;
            // Do nothing if the overlay is already hidden.
            if (this._hidden) {
                return;
            }
            // Hide immediately if the delay is <= 0.
            if (delay <= 0) {
                clearTimeout(this._timer);
                this._timer = -1;
                this._hidden = true;
                this.node.classList.add('lm-mod-hidden');
                /* <DEPRECATED> */
                this.node.classList.add('p-mod-hidden');
                /* </DEPRECATED> */ ;
                return;
            }
            // Do nothing if a hide is already pending.
            if (this._timer !== -1) {
                return;
            }
            // Otherwise setup the hide timer.
            this._timer = window.setTimeout(function () {
                _this._timer = -1;
                _this._hidden = true;
                _this.node.classList.add('lm-mod-hidden');
                /* <DEPRECATED> */
                _this.node.classList.add('p-mod-hidden');
                /* </DEPRECATED> */ ;
            }, delay);
        };
        return Overlay;
    }());
    DockPanel.Overlay = Overlay;
    /**
     * The default implementation of `IRenderer`.
     */
    var Renderer = /** @class */ (function () {
        function Renderer() {
        }
        /**
         * Create a new tab bar for use with a dock panel.
         *
         * @returns A new tab bar for a dock panel.
         */
        Renderer.prototype.createTabBar = function () {
            var bar = new tabbar_1.TabBar();
            bar.addClass('lm-DockPanel-tabBar');
            /* <DEPRECATED> */
            bar.addClass('p-DockPanel-tabBar');
            /* </DEPRECATED> */
            return bar;
        };
        /**
         * Create a new handle node for use with a dock panel.
         *
         * @returns A new handle node for a dock panel.
         */
        Renderer.prototype.createHandle = function () {
            var handle = document.createElement('div');
            handle.className = 'lm-DockPanel-handle';
            /* <DEPRECATED> */
            handle.classList.add('p-DockPanel-handle');
            /* </DEPRECATED> */ ;
            return handle;
        };
        return Renderer;
    }());
    DockPanel.Renderer = Renderer;
    /**
     * The default `Renderer` instance.
     */
    DockPanel.defaultRenderer = new Renderer();
})(DockPanel = exports.DockPanel || (exports.DockPanel = {}));
exports.DockPanel = DockPanel;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * A fraction used for sizing root panels; ~= `1 / golden_ratio`.
     */
    Private.GOLDEN_RATIO = 0.618;
    /**
     * The default sizes for the edge drop zones, in pixels.
     */
    Private.DEFAULT_EDGES = {
        /**
         * The size of the top edge dock zone for the root panel, in pixels.
         * This is different from the others to distinguish between the top
         * tab bar and the top root zone.
         */
        top: 12,
        /**
         * The size of the edge dock zone for the root panel, in pixels.
         */
        right: 40,
        /**
         * The size of the edge dock zone for the root panel, in pixels.
         */
        bottom: 40,
        /**
         * The size of the edge dock zone for the root panel, in pixels.
         */
        left: 40
    };
    /**
     * A singleton `'layout-modified'` conflatable message.
     */
    Private.LayoutModified = new messaging_1.ConflatableMessage('layout-modified');
    /**
     * An attached property used to track generated tab bars.
     */
    Private.isGeneratedTabBarProperty = new properties_1.AttachedProperty({
        name: 'isGeneratedTabBar',
        create: function () { return false; }
    });
    /**
     * Create a single document config for the widgets in a dock panel.
     */
    function createSingleDocumentConfig(panel) {
        // Return an empty config if the panel is empty.
        if (panel.isEmpty) {
            return { main: null };
        }
        // Get a flat array of the widgets in the panel.
        var widgets = algorithm_1.toArray(panel.widgets());
        // Get the first selected widget in the panel.
        var selected = panel.selectedWidgets().next();
        // Compute the current index for the new config.
        var currentIndex = selected ? widgets.indexOf(selected) : -1;
        // Return the single document config.
        return { main: { type: 'tab-area', widgets: widgets, currentIndex: currentIndex } };
    }
    Private.createSingleDocumentConfig = createSingleDocumentConfig;
    /**
     * Find the drop target at the given client position.
     */
    function findDropTarget(panel, clientX, clientY, edges) {
        // Bail if the mouse is not over the dock panel.
        if (!domutils_1.ElementExt.hitTest(panel.node, clientX, clientY)) {
            return { zone: 'invalid', target: null };
        }
        // Look up the layout for the panel.
        var layout = panel.layout;
        // If the layout is empty, indicate the entire root drop zone.
        if (layout.isEmpty) {
            return { zone: 'root-all', target: null };
        }
        // Test the edge zones when in multiple document mode.
        if (panel.mode === 'multiple-document') {
            // Get the client rect for the dock panel.
            var panelRect = panel.node.getBoundingClientRect();
            // Compute the distance to each edge of the panel.
            var pl = clientX - panelRect.left + 1;
            var pt = clientY - panelRect.top + 1;
            var pr = panelRect.right - clientX;
            var pb = panelRect.bottom - clientY;
            // Find the minimum distance to an edge.
            var pd = Math.min(pt, pr, pb, pl);
            // Return a root zone if the mouse is within an edge.
            switch (pd) {
                case pt:
                    if (pt < edges.top) {
                        return { zone: 'root-top', target: null };
                    }
                    break;
                case pr:
                    if (pr < edges.right) {
                        return { zone: 'root-right', target: null };
                    }
                    break;
                case pb:
                    if (pb < edges.bottom) {
                        return { zone: 'root-bottom', target: null };
                    }
                    break;
                case pl:
                    if (pl < edges.left) {
                        return { zone: 'root-left', target: null };
                    }
                    break;
                default:
                    throw 'unreachable';
            }
        }
        // Hit test the dock layout at the given client position.
        var target = layout.hitTestTabAreas(clientX, clientY);
        // Bail if no target area was found.
        if (!target) {
            return { zone: 'invalid', target: null };
        }
        // Return the whole tab area when in single document mode.
        if (panel.mode === 'single-document') {
            return { zone: 'widget-all', target: target };
        }
        // Compute the distance to each edge of the tab area.
        var al = target.x - target.left + 1;
        var at = target.y - target.top + 1;
        var ar = target.left + target.width - target.x;
        var ab = target.top + target.height - target.y;
        var tabHeight = target.tabBar.node.getBoundingClientRect().height;
        if (at < tabHeight) {
            return { zone: 'widget-tab', target: target };
        }
        // Get the X and Y edge sizes for the area.
        var rx = Math.round(target.width / 3);
        var ry = Math.round(target.height / 3);
        // If the mouse is not within an edge, indicate the entire area.
        if (al > rx && ar > rx && at > ry && ab > ry) {
            return { zone: 'widget-all', target: target };
        }
        // Scale the distances by the slenderness ratio.
        al /= rx;
        at /= ry;
        ar /= rx;
        ab /= ry;
        // Find the minimum distance to the area edge.
        var ad = Math.min(al, at, ar, ab);
        // Find the widget zone for the area edge.
        var zone;
        switch (ad) {
            case al:
                zone = 'widget-left';
                break;
            case at:
                zone = 'widget-top';
                break;
            case ar:
                zone = 'widget-right';
                break;
            case ab:
                zone = 'widget-bottom';
                break;
            default:
                throw 'unreachable';
        }
        // Return the final drop target.
        return { zone: zone, target: target };
    }
    Private.findDropTarget = findDropTarget;
    /**
     * Get the drop reference widget for a tab bar.
     */
    function getDropRef(tabBar) {
        if (tabBar.titles.length === 0) {
            return null;
        }
        if (tabBar.currentTitle) {
            return tabBar.currentTitle.owner;
        }
        return tabBar.titles[tabBar.titles.length - 1].owner;
    }
    Private.getDropRef = getDropRef;
})(Private || (Private = {}));

})
		], [
			/* @lumino/widgets: 61 */
			"lib/docklayout.js", ["cjs","js"], {"./boxengine": 66, "./layout": 56, "./widget": 42, "@lumino/algorithm": 11, "@lumino/domutils": 33, "@lumino/messaging": 38}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
var domutils_1 = require("@lumino/domutils");
var messaging_1 = require("@lumino/messaging");
var boxengine_1 = require("./boxengine");
var layout_1 = require("./layout");
var widget_1 = require("./widget");
/**
 * A layout which provides a flexible docking arrangement.
 *
 * #### Notes
 * The consumer of this layout is responsible for handling all signals
 * from the generated tab bars and managing the visibility of widgets
 * and tab bars as needed.
 */
var DockLayout = /** @class */ (function (_super) {
    __extends(DockLayout, _super);
    /**
     * Construct a new dock layout.
     *
     * @param options - The options for initializing the layout.
     */
    function DockLayout(options) {
        var _this = _super.call(this) || this;
        _this._spacing = 4;
        _this._dirty = false;
        _this._root = null;
        _this._box = null;
        _this._items = new Map();
        _this.renderer = options.renderer;
        if (options.spacing !== undefined) {
            _this._spacing = Private.clampSpacing(options.spacing);
        }
        return _this;
    }
    /**
     * Dispose of the resources held by the layout.
     *
     * #### Notes
     * This will clear and dispose all widgets in the layout.
     */
    DockLayout.prototype.dispose = function () {
        // Get an iterator over the widgets in the layout.
        var widgets = this.iter();
        // Dispose of the layout items.
        this._items.forEach(function (item) { item.dispose(); });
        // Clear the layout state before disposing the widgets.
        this._box = null;
        this._root = null;
        this._items.clear();
        // Dispose of the widgets contained in the old layout root.
        algorithm_1.each(widgets, function (widget) { widget.dispose(); });
        // Dispose of the base class.
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(DockLayout.prototype, "spacing", {
        /**
         * Get the inter-element spacing for the dock layout.
         */
        get: function () {
            return this._spacing;
        },
        /**
         * Set the inter-element spacing for the dock layout.
         */
        set: function (value) {
            value = Private.clampSpacing(value);
            if (this._spacing === value) {
                return;
            }
            this._spacing = value;
            if (!this.parent) {
                return;
            }
            this.parent.fit();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DockLayout.prototype, "isEmpty", {
        /**
         * Whether the dock layout is empty.
         */
        get: function () {
            return this._root === null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Create an iterator over all widgets in the layout.
     *
     * @returns A new iterator over the widgets in the layout.
     *
     * #### Notes
     * This iterator includes the generated tab bars.
     */
    DockLayout.prototype.iter = function () {
        return this._root ? this._root.iterAllWidgets() : algorithm_1.empty();
    };
    /**
     * Create an iterator over the user widgets in the layout.
     *
     * @returns A new iterator over the user widgets in the layout.
     *
     * #### Notes
     * This iterator does not include the generated tab bars.
     */
    DockLayout.prototype.widgets = function () {
        return this._root ? this._root.iterUserWidgets() : algorithm_1.empty();
    };
    /**
     * Create an iterator over the selected widgets in the layout.
     *
     * @returns A new iterator over the selected user widgets.
     *
     * #### Notes
     * This iterator yields the widgets corresponding to the current tab
     * of each tab bar in the layout.
     */
    DockLayout.prototype.selectedWidgets = function () {
        return this._root ? this._root.iterSelectedWidgets() : algorithm_1.empty();
    };
    /**
     * Create an iterator over the tab bars in the layout.
     *
     * @returns A new iterator over the tab bars in the layout.
     *
     * #### Notes
     * This iterator does not include the user widgets.
     */
    DockLayout.prototype.tabBars = function () {
        return this._root ? this._root.iterTabBars() : algorithm_1.empty();
    };
    /**
     * Create an iterator over the handles in the layout.
     *
     * @returns A new iterator over the handles in the layout.
     */
    DockLayout.prototype.handles = function () {
        return this._root ? this._root.iterHandles() : algorithm_1.empty();
    };
    /**
     * Move a handle to the given offset position.
     *
     * @param handle - The handle to move.
     *
     * @param offsetX - The desired offset X position of the handle.
     *
     * @param offsetY - The desired offset Y position of the handle.
     *
     * #### Notes
     * If the given handle is not contained in the layout, this is no-op.
     *
     * The handle will be moved as close as possible to the desired
     * position without violating any of the layout constraints.
     *
     * Only one of the coordinates is used depending on the orientation
     * of the handle. This method accepts both coordinates to make it
     * easy to invoke from a mouse move event without needing to know
     * the handle orientation.
     */
    DockLayout.prototype.moveHandle = function (handle, offsetX, offsetY) {
        // Bail early if there is no root or if the handle is hidden.
        var hidden = handle.classList.contains('lm-mod-hidden');
        /* <DEPRECATED> */
        hidden = hidden || handle.classList.contains('p-mod-hidden');
        /* </DEPRECATED> */
        if (!this._root || hidden) {
            return;
        }
        // Lookup the split node for the handle.
        var data = this._root.findSplitNode(handle);
        if (!data) {
            return;
        }
        // Compute the desired delta movement for the handle.
        var delta;
        if (data.node.orientation === 'horizontal') {
            delta = offsetX - handle.offsetLeft;
        }
        else {
            delta = offsetY - handle.offsetTop;
        }
        // Bail if there is no handle movement.
        if (delta === 0) {
            return;
        }
        // Prevent sibling resizing unless needed.
        data.node.holdSizes();
        // Adjust the sizers to reflect the handle movement.
        boxengine_1.BoxEngine.adjust(data.node.sizers, data.index, delta);
        // Update the layout of the widgets.
        if (this.parent) {
            this.parent.update();
        }
    };
    /**
     * Save the current configuration of the dock layout.
     *
     * @returns A new config object for the current layout state.
     *
     * #### Notes
     * The return value can be provided to the `restoreLayout` method
     * in order to restore the layout to its current configuration.
     */
    DockLayout.prototype.saveLayout = function () {
        // Bail early if there is no root.
        if (!this._root) {
            return { main: null };
        }
        // Hold the current sizes in the layout tree.
        this._root.holdAllSizes();
        // Return the layout config.
        return { main: this._root.createConfig() };
    };
    /**
     * Restore the layout to a previously saved configuration.
     *
     * @param config - The layout configuration to restore.
     *
     * #### Notes
     * Widgets which currently belong to the layout but which are not
     * contained in the config will be unparented.
     */
    DockLayout.prototype.restoreLayout = function (config) {
        var _this = this;
        // Create the widget set for validating the config.
        var widgetSet = new Set();
        // Normalize the main area config and collect the widgets.
        var mainConfig;
        if (config.main) {
            mainConfig = Private.normalizeAreaConfig(config.main, widgetSet);
        }
        else {
            mainConfig = null;
        }
        // Create iterators over the old content.
        var oldWidgets = this.widgets();
        var oldTabBars = this.tabBars();
        var oldHandles = this.handles();
        // Clear the root before removing the old content.
        this._root = null;
        // Unparent the old widgets which are not in the new config.
        algorithm_1.each(oldWidgets, function (widget) {
            if (!widgetSet.has(widget)) {
                widget.parent = null;
            }
        });
        // Dispose of the old tab bars.
        algorithm_1.each(oldTabBars, function (tabBar) {
            tabBar.dispose();
        });
        // Remove the old handles.
        algorithm_1.each(oldHandles, function (handle) {
            if (handle.parentNode) {
                handle.parentNode.removeChild(handle);
            }
        });
        // Reparent the new widgets to the current parent.
        widgetSet.forEach(function (widget) {
            widget.parent = _this.parent;
        });
        // Create the root node for the new config.
        if (mainConfig) {
            this._root = Private.realizeAreaConfig(mainConfig, {
                createTabBar: function () { return _this._createTabBar(); },
                createHandle: function () { return _this._createHandle(); }
            });
        }
        else {
            this._root = null;
        }
        // If there is no parent, there is nothing more to do.
        if (!this.parent) {
            return;
        }
        // Attach the new widgets to the parent.
        widgetSet.forEach(function (widget) {
            _this.attachWidget(widget);
        });
        // Post a fit request to the parent.
        this.parent.fit();
    };
    /**
     * Add a widget to the dock layout.
     *
     * @param widget - The widget to add to the dock layout.
     *
     * @param options - The additional options for adding the widget.
     *
     * #### Notes
     * The widget will be moved if it is already contained in the layout.
     *
     * An error will be thrown if the reference widget is invalid.
     */
    DockLayout.prototype.addWidget = function (widget, options) {
        if (options === void 0) { options = {}; }
        // Parse the options.
        var ref = options.ref || null;
        var mode = options.mode || 'tab-after';
        // Find the tab node which holds the reference widget.
        var refNode = null;
        if (this._root && ref) {
            refNode = this._root.findTabNode(ref);
        }
        // Throw an error if the reference widget is invalid.
        if (ref && !refNode) {
            throw new Error('Reference widget is not in the layout.');
        }
        // Reparent the widget to the current layout parent.
        widget.parent = this.parent;
        // Insert the widget according to the insert mode.
        switch (mode) {
            case 'tab-after':
                this._insertTab(widget, ref, refNode, true);
                break;
            case 'tab-before':
                this._insertTab(widget, ref, refNode, false);
                break;
            case 'split-top':
                this._insertSplit(widget, ref, refNode, 'vertical', false);
                break;
            case 'split-left':
                this._insertSplit(widget, ref, refNode, 'horizontal', false);
                break;
            case 'split-right':
                this._insertSplit(widget, ref, refNode, 'horizontal', true);
                break;
            case 'split-bottom':
                this._insertSplit(widget, ref, refNode, 'vertical', true);
                break;
        }
        // Do nothing else if there is no parent widget.
        if (!this.parent) {
            return;
        }
        // Ensure the widget is attached to the parent widget.
        this.attachWidget(widget);
        // Post a fit request for the parent widget.
        this.parent.fit();
    };
    /**
     * Remove a widget from the layout.
     *
     * @param widget - The widget to remove from the layout.
     *
     * #### Notes
     * A widget is automatically removed from the layout when its `parent`
     * is set to `null`. This method should only be invoked directly when
     * removing a widget from a layout which has yet to be installed on a
     * parent widget.
     *
     * This method does *not* modify the widget's `parent`.
     */
    DockLayout.prototype.removeWidget = function (widget) {
        // Remove the widget from its current layout location.
        this._removeWidget(widget);
        // Do nothing else if there is no parent widget.
        if (!this.parent) {
            return;
        }
        // Detach the widget from the parent widget.
        this.detachWidget(widget);
        // Post a fit request for the parent widget.
        this.parent.fit();
    };
    /**
     * Find the tab area which contains the given client position.
     *
     * @param clientX - The client X position of interest.
     *
     * @param clientY - The client Y position of interest.
     *
     * @returns The geometry of the tab area at the given position, or
     *   `null` if there is no tab area at the given position.
     */
    DockLayout.prototype.hitTestTabAreas = function (clientX, clientY) {
        // Bail early if hit testing cannot produce valid results.
        if (!this._root || !this.parent || !this.parent.isVisible) {
            return null;
        }
        // Ensure the parent box sizing data is computed.
        if (!this._box) {
            this._box = domutils_1.ElementExt.boxSizing(this.parent.node);
        }
        // Convert from client to local coordinates.
        var rect = this.parent.node.getBoundingClientRect();
        var x = clientX - rect.left - this._box.borderLeft;
        var y = clientY - rect.top - this._box.borderTop;
        // Find the tab layout node at the local position.
        var tabNode = this._root.hitTestTabNodes(x, y);
        // Bail if a tab layout node was not found.
        if (!tabNode) {
            return null;
        }
        // Extract the data from the tab node.
        var tabBar = tabNode.tabBar, top = tabNode.top, left = tabNode.left, width = tabNode.width, height = tabNode.height;
        // Compute the right and bottom edges of the tab area.
        var borderWidth = this._box.borderLeft + this._box.borderRight;
        var borderHeight = this._box.borderTop + this._box.borderBottom;
        var right = rect.width - borderWidth - (left + width);
        var bottom = rect.height - borderHeight - (top + height);
        // Return the hit test results.
        return { tabBar: tabBar, x: x, y: y, top: top, left: left, right: right, bottom: bottom, width: width, height: height };
    };
    /**
     * Perform layout initialization which requires the parent widget.
     */
    DockLayout.prototype.init = function () {
        var _this = this;
        // Perform superclass initialization.
        _super.prototype.init.call(this);
        // Attach each widget to the parent.
        algorithm_1.each(this, function (widget) { _this.attachWidget(widget); });
        // Attach each handle to the parent.
        algorithm_1.each(this.handles(), function (handle) { _this.parent.node.appendChild(handle); });
        // Post a fit request for the parent widget.
        this.parent.fit();
    };
    /**
     * Attach the widget to the layout parent widget.
     *
     * @param widget - The widget to attach to the parent.
     *
     * #### Notes
     * This is a no-op if the widget is already attached.
     */
    DockLayout.prototype.attachWidget = function (widget) {
        // Do nothing if the widget is already attached.
        if (this.parent.node === widget.node.parentNode) {
            return;
        }
        // Create the layout item for the widget.
        this._items.set(widget, new layout_1.LayoutItem(widget));
        // Send a `'before-attach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.BeforeAttach);
        }
        // Add the widget's node to the parent.
        this.parent.node.appendChild(widget.node);
        // Send an `'after-attach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.AfterAttach);
        }
    };
    /**
     * Detach the widget from the layout parent widget.
     *
     * @param widget - The widget to detach from the parent.
     *
     * #### Notes
     * This is a no-op if the widget is not attached.
     */
    DockLayout.prototype.detachWidget = function (widget) {
        // Do nothing if the widget is not attached.
        if (this.parent.node !== widget.node.parentNode) {
            return;
        }
        // Send a `'before-detach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.BeforeDetach);
        }
        // Remove the widget's node from the parent.
        this.parent.node.removeChild(widget.node);
        // Send an `'after-detach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.AfterDetach);
        }
        // Delete the layout item for the widget.
        var item = this._items.get(widget);
        if (item) {
            this._items.delete(widget);
            item.dispose();
        }
    };
    /**
     * A message handler invoked on a `'before-show'` message.
     */
    DockLayout.prototype.onBeforeShow = function (msg) {
        _super.prototype.onBeforeShow.call(this, msg);
        this.parent.update();
    };
    /**
     * A message handler invoked on a `'before-attach'` message.
     */
    DockLayout.prototype.onBeforeAttach = function (msg) {
        _super.prototype.onBeforeAttach.call(this, msg);
        this.parent.fit();
    };
    /**
     * A message handler invoked on a `'child-shown'` message.
     */
    DockLayout.prototype.onChildShown = function (msg) {
        this.parent.fit();
    };
    /**
     * A message handler invoked on a `'child-hidden'` message.
     */
    DockLayout.prototype.onChildHidden = function (msg) {
        this.parent.fit();
    };
    /**
     * A message handler invoked on a `'resize'` message.
     */
    DockLayout.prototype.onResize = function (msg) {
        if (this.parent.isVisible) {
            this._update(msg.width, msg.height);
        }
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    DockLayout.prototype.onUpdateRequest = function (msg) {
        if (this.parent.isVisible) {
            this._update(-1, -1);
        }
    };
    /**
     * A message handler invoked on a `'fit-request'` message.
     */
    DockLayout.prototype.onFitRequest = function (msg) {
        if (this.parent.isAttached) {
            this._fit();
        }
    };
    /**
     * Remove the specified widget from the layout structure.
     *
     * #### Notes
     * This is a no-op if the widget is not in the layout tree.
     *
     * This does not detach the widget from the parent node.
     */
    DockLayout.prototype._removeWidget = function (widget) {
        // Bail early if there is no layout root.
        if (!this._root) {
            return;
        }
        // Find the tab node which contains the given widget.
        var tabNode = this._root.findTabNode(widget);
        // Bail early if the tab node is not found.
        if (!tabNode) {
            return;
        }
        // If there are multiple tabs, just remove the widget's tab.
        if (tabNode.tabBar.titles.length > 1) {
            tabNode.tabBar.removeTab(widget.title);
            return;
        }
        // Otherwise, the tab node needs to be removed...
        // Dispose the tab bar.
        tabNode.tabBar.dispose();
        // Handle the case where the tab node is the root.
        if (this._root === tabNode) {
            this._root = null;
            return;
        }
        // Otherwise, remove the tab node from its parent...
        // Prevent widget resizing unless needed.
        this._root.holdAllSizes();
        // Clear the parent reference on the tab node.
        var splitNode = tabNode.parent;
        tabNode.parent = null;
        // Remove the tab node from its parent split node.
        var i = algorithm_1.ArrayExt.removeFirstOf(splitNode.children, tabNode);
        var handle = algorithm_1.ArrayExt.removeAt(splitNode.handles, i);
        algorithm_1.ArrayExt.removeAt(splitNode.sizers, i);
        // Remove the handle from its parent DOM node.
        if (handle.parentNode) {
            handle.parentNode.removeChild(handle);
        }
        // If there are multiple children, just update the handles.
        if (splitNode.children.length > 1) {
            splitNode.syncHandles();
            return;
        }
        // Otherwise, the split node also needs to be removed...
        // Clear the parent reference on the split node.
        var maybeParent = splitNode.parent;
        splitNode.parent = null;
        // Lookup the remaining child node and handle.
        var childNode = splitNode.children[0];
        var childHandle = splitNode.handles[0];
        // Clear the split node data.
        splitNode.children.length = 0;
        splitNode.handles.length = 0;
        splitNode.sizers.length = 0;
        // Remove the child handle from its parent node.
        if (childHandle.parentNode) {
            childHandle.parentNode.removeChild(childHandle);
        }
        // Handle the case where the split node is the root.
        if (this._root === splitNode) {
            childNode.parent = null;
            this._root = childNode;
            return;
        }
        // Otherwise, move the child node to the parent node...
        var parentNode = maybeParent;
        // Lookup the index of the split node.
        var j = parentNode.children.indexOf(splitNode);
        // Handle the case where the child node is a tab node.
        if (childNode instanceof Private.TabLayoutNode) {
            childNode.parent = parentNode;
            parentNode.children[j] = childNode;
            return;
        }
        // Remove the split data from the parent.
        var splitHandle = algorithm_1.ArrayExt.removeAt(parentNode.handles, j);
        algorithm_1.ArrayExt.removeAt(parentNode.children, j);
        algorithm_1.ArrayExt.removeAt(parentNode.sizers, j);
        // Remove the handle from its parent node.
        if (splitHandle.parentNode) {
            splitHandle.parentNode.removeChild(splitHandle);
        }
        // The child node and the split parent node will have the same
        // orientation. Merge the grand-children with the parent node.
        for (var i_1 = 0, n = childNode.children.length; i_1 < n; ++i_1) {
            var gChild = childNode.children[i_1];
            var gHandle = childNode.handles[i_1];
            var gSizer = childNode.sizers[i_1];
            algorithm_1.ArrayExt.insert(parentNode.children, j + i_1, gChild);
            algorithm_1.ArrayExt.insert(parentNode.handles, j + i_1, gHandle);
            algorithm_1.ArrayExt.insert(parentNode.sizers, j + i_1, gSizer);
            gChild.parent = parentNode;
        }
        // Clear the child node.
        childNode.children.length = 0;
        childNode.handles.length = 0;
        childNode.sizers.length = 0;
        childNode.parent = null;
        // Sync the handles on the parent node.
        parentNode.syncHandles();
    };
    /**
     * Insert a widget next to an existing tab.
     *
     * #### Notes
     * This does not attach the widget to the parent widget.
     */
    DockLayout.prototype._insertTab = function (widget, ref, refNode, after) {
        // Do nothing if the tab is inserted next to itself.
        if (widget === ref) {
            return;
        }
        // Create the root if it does not exist.
        if (!this._root) {
            var tabNode = new Private.TabLayoutNode(this._createTabBar());
            tabNode.tabBar.addTab(widget.title);
            this._root = tabNode;
            return;
        }
        // Use the first tab node as the ref node if needed.
        if (!refNode) {
            refNode = this._root.findFirstTabNode();
        }
        // If the widget is not contained in the ref node, ensure it is
        // removed from the layout and hidden before being added again.
        if (refNode.tabBar.titles.indexOf(widget.title) === -1) {
            this._removeWidget(widget);
            widget.hide();
        }
        // Lookup the target index for inserting the tab.
        var index;
        if (ref) {
            index = refNode.tabBar.titles.indexOf(ref.title);
        }
        else {
            index = refNode.tabBar.currentIndex;
        }
        // Insert the widget's tab relative to the target index.
        refNode.tabBar.insertTab(index + (after ? 1 : 0), widget.title);
    };
    /**
     * Insert a widget as a new split area.
     *
     * #### Notes
     * This does not attach the widget to the parent widget.
     */
    DockLayout.prototype._insertSplit = function (widget, ref, refNode, orientation, after) {
        // Do nothing if there is no effective split.
        if (widget === ref && refNode && refNode.tabBar.titles.length === 1) {
            return;
        }
        // Ensure the widget is removed from the current layout.
        this._removeWidget(widget);
        // Create the tab layout node to hold the widget.
        var tabNode = new Private.TabLayoutNode(this._createTabBar());
        tabNode.tabBar.addTab(widget.title);
        // Set the root if it does not exist.
        if (!this._root) {
            this._root = tabNode;
            return;
        }
        // If the ref node parent is null, split the root.
        if (!refNode || !refNode.parent) {
            // Ensure the root is split with the correct orientation.
            var root = this._splitRoot(orientation);
            // Determine the insert index for the new tab node.
            var i_2 = after ? root.children.length : 0;
            // Normalize the split node.
            root.normalizeSizes();
            // Create the sizer for new tab node.
            var sizer = Private.createSizer(refNode ? 1 : Private.GOLDEN_RATIO);
            // Insert the tab node sized to the golden ratio.
            algorithm_1.ArrayExt.insert(root.children, i_2, tabNode);
            algorithm_1.ArrayExt.insert(root.sizers, i_2, sizer);
            algorithm_1.ArrayExt.insert(root.handles, i_2, this._createHandle());
            tabNode.parent = root;
            // Re-normalize the split node to maintain the ratios.
            root.normalizeSizes();
            // Finally, synchronize the visibility of the handles.
            root.syncHandles();
            return;
        }
        // Lookup the split node for the ref widget.
        var splitNode = refNode.parent;
        // If the split node already had the correct orientation,
        // the widget can be inserted into the split node directly.
        if (splitNode.orientation === orientation) {
            // Find the index of the ref node.
            var i_3 = splitNode.children.indexOf(refNode);
            // Normalize the split node.
            splitNode.normalizeSizes();
            // Consume half the space for the insert location.
            var s = splitNode.sizers[i_3].sizeHint /= 2;
            // Insert the tab node sized to the other half.
            var j_1 = i_3 + (after ? 1 : 0);
            algorithm_1.ArrayExt.insert(splitNode.children, j_1, tabNode);
            algorithm_1.ArrayExt.insert(splitNode.sizers, j_1, Private.createSizer(s));
            algorithm_1.ArrayExt.insert(splitNode.handles, j_1, this._createHandle());
            tabNode.parent = splitNode;
            // Finally, synchronize the visibility of the handles.
            splitNode.syncHandles();
            return;
        }
        // Remove the ref node from the split node.
        var i = algorithm_1.ArrayExt.removeFirstOf(splitNode.children, refNode);
        // Create a new normalized split node for the children.
        var childNode = new Private.SplitLayoutNode(orientation);
        childNode.normalized = true;
        // Add the ref node sized to half the space.
        childNode.children.push(refNode);
        childNode.sizers.push(Private.createSizer(0.5));
        childNode.handles.push(this._createHandle());
        refNode.parent = childNode;
        // Add the tab node sized to the other half.
        var j = after ? 1 : 0;
        algorithm_1.ArrayExt.insert(childNode.children, j, tabNode);
        algorithm_1.ArrayExt.insert(childNode.sizers, j, Private.createSizer(0.5));
        algorithm_1.ArrayExt.insert(childNode.handles, j, this._createHandle());
        tabNode.parent = childNode;
        // Synchronize the visibility of the handles.
        childNode.syncHandles();
        // Finally, add the new child node to the original split node.
        algorithm_1.ArrayExt.insert(splitNode.children, i, childNode);
        childNode.parent = splitNode;
    };
    /**
     * Ensure the root is a split node with the given orientation.
     */
    DockLayout.prototype._splitRoot = function (orientation) {
        // Bail early if the root already meets the requirements.
        var oldRoot = this._root;
        if (oldRoot instanceof Private.SplitLayoutNode) {
            if (oldRoot.orientation === orientation) {
                return oldRoot;
            }
        }
        // Create a new root node with the specified orientation.
        var newRoot = this._root = new Private.SplitLayoutNode(orientation);
        // Add the old root to the new root.
        if (oldRoot) {
            newRoot.children.push(oldRoot);
            newRoot.sizers.push(Private.createSizer(0));
            newRoot.handles.push(this._createHandle());
            oldRoot.parent = newRoot;
        }
        // Return the new root as a convenience.
        return newRoot;
    };
    /**
     * Fit the layout to the total size required by the widgets.
     */
    DockLayout.prototype._fit = function () {
        // Set up the computed minimum size.
        var minW = 0;
        var minH = 0;
        // Update the size limits for the layout tree.
        if (this._root) {
            var limits = this._root.fit(this._spacing, this._items);
            minW = limits.minWidth;
            minH = limits.minHeight;
        }
        // Update the box sizing and add it to the computed min size.
        var box = this._box = domutils_1.ElementExt.boxSizing(this.parent.node);
        minW += box.horizontalSum;
        minH += box.verticalSum;
        // Update the parent's min size constraints.
        var style = this.parent.node.style;
        style.minWidth = minW + "px";
        style.minHeight = minH + "px";
        // Set the dirty flag to ensure only a single update occurs.
        this._dirty = true;
        // Notify the ancestor that it should fit immediately. This may
        // cause a resize of the parent, fulfilling the required update.
        if (this.parent.parent) {
            messaging_1.MessageLoop.sendMessage(this.parent.parent, widget_1.Widget.Msg.FitRequest);
        }
        // If the dirty flag is still set, the parent was not resized.
        // Trigger the required update on the parent widget immediately.
        if (this._dirty) {
            messaging_1.MessageLoop.sendMessage(this.parent, widget_1.Widget.Msg.UpdateRequest);
        }
    };
    /**
     * Update the layout position and size of the widgets.
     *
     * The parent offset dimensions should be `-1` if unknown.
     */
    DockLayout.prototype._update = function (offsetWidth, offsetHeight) {
        // Clear the dirty flag to indicate the update occurred.
        this._dirty = false;
        // Bail early if there is no root layout node.
        if (!this._root) {
            return;
        }
        // Measure the parent if the offset dimensions are unknown.
        if (offsetWidth < 0) {
            offsetWidth = this.parent.node.offsetWidth;
        }
        if (offsetHeight < 0) {
            offsetHeight = this.parent.node.offsetHeight;
        }
        // Ensure the parent box sizing data is computed.
        if (!this._box) {
            this._box = domutils_1.ElementExt.boxSizing(this.parent.node);
        }
        // Compute the actual layout bounds adjusted for border and padding.
        var x = this._box.paddingTop;
        var y = this._box.paddingLeft;
        var width = offsetWidth - this._box.horizontalSum;
        var height = offsetHeight - this._box.verticalSum;
        // Update the geometry of the layout tree.
        this._root.update(x, y, width, height, this._spacing, this._items);
    };
    /**
     * Create a new tab bar for use by the dock layout.
     *
     * #### Notes
     * The tab bar will be attached to the parent if it exists.
     */
    DockLayout.prototype._createTabBar = function () {
        // Create the tab bar using the renderer.
        var tabBar = this.renderer.createTabBar();
        // Enforce necessary tab bar behavior.
        tabBar.orientation = 'horizontal';
        // Reparent and attach the tab bar to the parent if possible.
        if (this.parent) {
            tabBar.parent = this.parent;
            this.attachWidget(tabBar);
        }
        // Return the initialized tab bar.
        return tabBar;
    };
    /**
     * Create a new handle for the dock layout.
     *
     * #### Notes
     * The handle will be attached to the parent if it exists.
     */
    DockLayout.prototype._createHandle = function () {
        // Create the handle using the renderer.
        var handle = this.renderer.createHandle();
        // Initialize the handle layout behavior.
        var style = handle.style;
        style.position = 'absolute';
        style.top = '0';
        style.left = '0';
        style.width = '0';
        style.height = '0';
        // Attach the handle to the parent if it exists.
        if (this.parent) {
            this.parent.node.appendChild(handle);
        }
        // Return the initialized handle.
        return handle;
    };
    return DockLayout;
}(layout_1.Layout));
exports.DockLayout = DockLayout;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * A fraction used for sizing root panels; ~= `1 / golden_ratio`.
     */
    Private.GOLDEN_RATIO = 0.618;
    /**
     * Clamp a spacing value to an integer >= 0.
     */
    function clampSpacing(value) {
        return Math.max(0, Math.floor(value));
    }
    Private.clampSpacing = clampSpacing;
    /**
     * Create a box sizer with an initial size hint.
     */
    function createSizer(hint) {
        var sizer = new boxengine_1.BoxSizer();
        sizer.sizeHint = hint;
        sizer.size = hint;
        return sizer;
    }
    Private.createSizer = createSizer;
    /**
     * Normalize an area config object and collect the visited widgets.
     */
    function normalizeAreaConfig(config, widgetSet) {
        var result;
        if (config.type === 'tab-area') {
            result = normalizeTabAreaConfig(config, widgetSet);
        }
        else {
            result = normalizeSplitAreaConfig(config, widgetSet);
        }
        return result;
    }
    Private.normalizeAreaConfig = normalizeAreaConfig;
    /**
     * Convert a normalized area config into a layout tree.
     */
    function realizeAreaConfig(config, renderer) {
        var node;
        if (config.type === 'tab-area') {
            node = realizeTabAreaConfig(config, renderer);
        }
        else {
            node = realizeSplitAreaConfig(config, renderer);
        }
        return node;
    }
    Private.realizeAreaConfig = realizeAreaConfig;
    /**
     * A layout node which holds the data for a tabbed area.
     */
    var TabLayoutNode = /** @class */ (function () {
        /**
         * Construct a new tab layout node.
         *
         * @param tabBar - The tab bar to use for the layout node.
         */
        function TabLayoutNode(tabBar) {
            /**
             * The parent of the layout node.
             */
            this.parent = null;
            this._top = 0;
            this._left = 0;
            this._width = 0;
            this._height = 0;
            var tabSizer = new boxengine_1.BoxSizer();
            var widgetSizer = new boxengine_1.BoxSizer();
            tabSizer.stretch = 0;
            widgetSizer.stretch = 1;
            this.tabBar = tabBar;
            this.sizers = [tabSizer, widgetSizer];
        }
        Object.defineProperty(TabLayoutNode.prototype, "top", {
            /**
             * The most recent value for the `top` edge of the layout box.
             */
            get: function () {
                return this._top;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabLayoutNode.prototype, "left", {
            /**
             * The most recent value for the `left` edge of the layout box.
             */
            get: function () {
                return this._left;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabLayoutNode.prototype, "width", {
            /**
             * The most recent value for the `width` of the layout box.
             */
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabLayoutNode.prototype, "height", {
            /**
             * The most recent value for the `height` of the layout box.
             */
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Create an iterator for all widgets in the layout tree.
         */
        TabLayoutNode.prototype.iterAllWidgets = function () {
            return algorithm_1.chain(algorithm_1.once(this.tabBar), this.iterUserWidgets());
        };
        /**
         * Create an iterator for the user widgets in the layout tree.
         */
        TabLayoutNode.prototype.iterUserWidgets = function () {
            return algorithm_1.map(this.tabBar.titles, function (title) { return title.owner; });
        };
        /**
         * Create an iterator for the selected widgets in the layout tree.
         */
        TabLayoutNode.prototype.iterSelectedWidgets = function () {
            var title = this.tabBar.currentTitle;
            return title ? algorithm_1.once(title.owner) : algorithm_1.empty();
        };
        /**
         * Create an iterator for the tab bars in the layout tree.
         */
        TabLayoutNode.prototype.iterTabBars = function () {
            return algorithm_1.once(this.tabBar);
        };
        /**
         * Create an iterator for the handles in the layout tree.
         */
        TabLayoutNode.prototype.iterHandles = function () {
            return algorithm_1.empty();
        };
        /**
         * Find the tab layout node which contains the given widget.
         */
        TabLayoutNode.prototype.findTabNode = function (widget) {
            return this.tabBar.titles.indexOf(widget.title) !== -1 ? this : null;
        };
        /**
         * Find the split layout node which contains the given handle.
         */
        TabLayoutNode.prototype.findSplitNode = function (handle) {
            return null;
        };
        /**
         * Find the first tab layout node in a layout tree.
         */
        TabLayoutNode.prototype.findFirstTabNode = function () {
            return this;
        };
        /**
         * Find the tab layout node which contains the local point.
         */
        TabLayoutNode.prototype.hitTestTabNodes = function (x, y) {
            if (x < this._left || x >= this._left + this._width) {
                return null;
            }
            if (y < this._top || y >= this._top + this._height) {
                return null;
            }
            return this;
        };
        /**
         * Create a configuration object for the layout tree.
         */
        TabLayoutNode.prototype.createConfig = function () {
            var widgets = this.tabBar.titles.map(function (title) { return title.owner; });
            var currentIndex = this.tabBar.currentIndex;
            return { type: 'tab-area', widgets: widgets, currentIndex: currentIndex };
        };
        /**
         * Recursively hold all of the sizes in the layout tree.
         *
         * This ignores the sizers of tab layout nodes.
         */
        TabLayoutNode.prototype.holdAllSizes = function () {
            return;
        };
        /**
         * Fit the layout tree.
         */
        TabLayoutNode.prototype.fit = function (spacing, items) {
            // Set up the limit variables.
            var minWidth = 0;
            var minHeight = 0;
            var maxWidth = Infinity;
            var maxHeight = Infinity;
            // Lookup the tab bar layout item.
            var tabBarItem = items.get(this.tabBar);
            // Lookup the widget layout item.
            var current = this.tabBar.currentTitle;
            var widgetItem = current ? items.get(current.owner) : undefined;
            // Lookup the tab bar and widget sizers.
            var _a = this.sizers, tabBarSizer = _a[0], widgetSizer = _a[1];
            // Update the tab bar limits.
            if (tabBarItem) {
                tabBarItem.fit();
            }
            // Update the widget limits.
            if (widgetItem) {
                widgetItem.fit();
            }
            // Update the results and sizer for the tab bar.
            if (tabBarItem && !tabBarItem.isHidden) {
                minWidth = Math.max(minWidth, tabBarItem.minWidth);
                minHeight += tabBarItem.minHeight;
                tabBarSizer.minSize = tabBarItem.minHeight;
                tabBarSizer.maxSize = tabBarItem.maxHeight;
            }
            else {
                tabBarSizer.minSize = 0;
                tabBarSizer.maxSize = 0;
            }
            // Update the results and sizer for the current widget.
            if (widgetItem && !widgetItem.isHidden) {
                minWidth = Math.max(minWidth, widgetItem.minWidth);
                minHeight += widgetItem.minHeight;
                widgetSizer.minSize = widgetItem.minHeight;
                widgetSizer.maxSize = Infinity;
            }
            else {
                widgetSizer.minSize = 0;
                widgetSizer.maxSize = Infinity;
            }
            // Return the computed size limits for the layout node.
            return { minWidth: minWidth, minHeight: minHeight, maxWidth: maxWidth, maxHeight: maxHeight };
        };
        /**
         * Update the layout tree.
         */
        TabLayoutNode.prototype.update = function (left, top, width, height, spacing, items) {
            // Update the layout box values.
            this._top = top;
            this._left = left;
            this._width = width;
            this._height = height;
            // Lookup the tab bar layout item.
            var tabBarItem = items.get(this.tabBar);
            // Lookup the widget layout item.
            var current = this.tabBar.currentTitle;
            var widgetItem = current ? items.get(current.owner) : undefined;
            // Distribute the layout space to the sizers.
            boxengine_1.BoxEngine.calc(this.sizers, height);
            // Update the tab bar item using the computed size.
            if (tabBarItem && !tabBarItem.isHidden) {
                var size = this.sizers[0].size;
                tabBarItem.update(left, top, width, size);
                top += size;
            }
            // Layout the widget using the computed size.
            if (widgetItem && !widgetItem.isHidden) {
                var size = this.sizers[1].size;
                widgetItem.update(left, top, width, size);
            }
        };
        return TabLayoutNode;
    }());
    Private.TabLayoutNode = TabLayoutNode;
    /**
     * A layout node which holds the data for a split area.
     */
    var SplitLayoutNode = /** @class */ (function () {
        /**
         * Construct a new split layout node.
         *
         * @param orientation - The orientation of the node.
         */
        function SplitLayoutNode(orientation) {
            /**
             * The parent of the layout node.
             */
            this.parent = null;
            /**
             * Whether the sizers have been normalized.
             */
            this.normalized = false;
            /**
             * The child nodes for the split node.
             */
            this.children = [];
            /**
             * The box sizers for the layout children.
             */
            this.sizers = [];
            /**
             * The handles for the layout children.
             */
            this.handles = [];
            this.orientation = orientation;
        }
        /**
         * Create an iterator for all widgets in the layout tree.
         */
        SplitLayoutNode.prototype.iterAllWidgets = function () {
            var children = algorithm_1.map(this.children, function (child) { return child.iterAllWidgets(); });
            return new algorithm_1.ChainIterator(children);
        };
        /**
         * Create an iterator for the user widgets in the layout tree.
         */
        SplitLayoutNode.prototype.iterUserWidgets = function () {
            var children = algorithm_1.map(this.children, function (child) { return child.iterUserWidgets(); });
            return new algorithm_1.ChainIterator(children);
        };
        /**
         * Create an iterator for the selected widgets in the layout tree.
         */
        SplitLayoutNode.prototype.iterSelectedWidgets = function () {
            var children = algorithm_1.map(this.children, function (child) { return child.iterSelectedWidgets(); });
            return new algorithm_1.ChainIterator(children);
        };
        /**
         * Create an iterator for the tab bars in the layout tree.
         */
        SplitLayoutNode.prototype.iterTabBars = function () {
            var children = algorithm_1.map(this.children, function (child) { return child.iterTabBars(); });
            return new algorithm_1.ChainIterator(children);
        };
        /**
         * Create an iterator for the handles in the layout tree.
         */
        SplitLayoutNode.prototype.iterHandles = function () {
            var children = algorithm_1.map(this.children, function (child) { return child.iterHandles(); });
            return algorithm_1.chain(this.handles, new algorithm_1.ChainIterator(children));
        };
        /**
         * Find the tab layout node which contains the given widget.
         */
        SplitLayoutNode.prototype.findTabNode = function (widget) {
            for (var i = 0, n = this.children.length; i < n; ++i) {
                var result = this.children[i].findTabNode(widget);
                if (result) {
                    return result;
                }
            }
            return null;
        };
        /**
         * Find the split layout node which contains the given handle.
         */
        SplitLayoutNode.prototype.findSplitNode = function (handle) {
            var index = this.handles.indexOf(handle);
            if (index !== -1) {
                return { index: index, node: this };
            }
            for (var i = 0, n = this.children.length; i < n; ++i) {
                var result = this.children[i].findSplitNode(handle);
                if (result) {
                    return result;
                }
            }
            return null;
        };
        /**
         * Find the first tab layout node in a layout tree.
         */
        SplitLayoutNode.prototype.findFirstTabNode = function () {
            if (this.children.length === 0) {
                return null;
            }
            return this.children[0].findFirstTabNode();
        };
        /**
         * Find the tab layout node which contains the local point.
         */
        SplitLayoutNode.prototype.hitTestTabNodes = function (x, y) {
            for (var i = 0, n = this.children.length; i < n; ++i) {
                var result = this.children[i].hitTestTabNodes(x, y);
                if (result) {
                    return result;
                }
            }
            return null;
        };
        /**
         * Create a configuration object for the layout tree.
         */
        SplitLayoutNode.prototype.createConfig = function () {
            var orientation = this.orientation;
            var sizes = this.createNormalizedSizes();
            var children = this.children.map(function (child) { return child.createConfig(); });
            return { type: 'split-area', orientation: orientation, children: children, sizes: sizes };
        };
        /**
         * Sync the visibility and orientation of the handles.
         */
        SplitLayoutNode.prototype.syncHandles = function () {
            var _this = this;
            algorithm_1.each(this.handles, function (handle, i) {
                handle.setAttribute('data-orientation', _this.orientation);
                if (i === _this.handles.length - 1) {
                    handle.classList.add('lm-mod-hidden');
                    /* <DEPRECATED> */
                    handle.classList.add('p-mod-hidden');
                    /* </DEPRECATED> */
                }
                else {
                    handle.classList.remove('lm-mod-hidden');
                    /* <DEPRECATED> */
                    handle.classList.remove('p-mod-hidden');
                    /* </DEPRECATED> */
                }
            });
        };
        /**
         * Hold the current sizes of the box sizers.
         *
         * This sets the size hint of each sizer to its current size.
         */
        SplitLayoutNode.prototype.holdSizes = function () {
            algorithm_1.each(this.sizers, function (sizer) { sizer.sizeHint = sizer.size; });
        };
        /**
         * Recursively hold all of the sizes in the layout tree.
         *
         * This ignores the sizers of tab layout nodes.
         */
        SplitLayoutNode.prototype.holdAllSizes = function () {
            algorithm_1.each(this.children, function (child) { return child.holdAllSizes(); });
            this.holdSizes();
        };
        /**
         * Normalize the sizes of the split layout node.
         */
        SplitLayoutNode.prototype.normalizeSizes = function () {
            // Bail early if the sizers are empty.
            var n = this.sizers.length;
            if (n === 0) {
                return;
            }
            // Hold the current sizes of the sizers.
            this.holdSizes();
            // Compute the sum of the sizes.
            var sum = algorithm_1.reduce(this.sizers, function (v, sizer) { return v + sizer.sizeHint; }, 0);
            // Normalize the sizes based on the sum.
            if (sum === 0) {
                algorithm_1.each(this.sizers, function (sizer) {
                    sizer.size = sizer.sizeHint = 1 / n;
                });
            }
            else {
                algorithm_1.each(this.sizers, function (sizer) {
                    sizer.size = sizer.sizeHint /= sum;
                });
            }
            // Mark the sizes as normalized.
            this.normalized = true;
        };
        /**
         * Snap the normalized sizes of the split layout node.
         */
        SplitLayoutNode.prototype.createNormalizedSizes = function () {
            // Bail early if the sizers are empty.
            var n = this.sizers.length;
            if (n === 0) {
                return [];
            }
            // Grab the current sizes of the sizers.
            var sizes = this.sizers.map(function (sizer) { return sizer.size; });
            // Compute the sum of the sizes.
            var sum = algorithm_1.reduce(sizes, function (v, size) { return v + size; }, 0);
            // Normalize the sizes based on the sum.
            if (sum === 0) {
                algorithm_1.each(sizes, function (size, i) { sizes[i] = 1 / n; });
            }
            else {
                algorithm_1.each(sizes, function (size, i) { sizes[i] = size / sum; });
            }
            // Return the normalized sizes.
            return sizes;
        };
        /**
         * Fit the layout tree.
         */
        SplitLayoutNode.prototype.fit = function (spacing, items) {
            // Compute the required fixed space.
            var horizontal = this.orientation === 'horizontal';
            var fixed = Math.max(0, this.children.length - 1) * spacing;
            // Set up the limit variables.
            var minWidth = horizontal ? fixed : 0;
            var minHeight = horizontal ? 0 : fixed;
            var maxWidth = Infinity;
            var maxHeight = Infinity;
            // Fit the children and update the limits.
            for (var i = 0, n = this.children.length; i < n; ++i) {
                var limits = this.children[i].fit(spacing, items);
                if (horizontal) {
                    minHeight = Math.max(minHeight, limits.minHeight);
                    minWidth += limits.minWidth;
                    this.sizers[i].minSize = limits.minWidth;
                }
                else {
                    minWidth = Math.max(minWidth, limits.minWidth);
                    minHeight += limits.minHeight;
                    this.sizers[i].minSize = limits.minHeight;
                }
            }
            // Return the computed limits for the layout node.
            return { minWidth: minWidth, minHeight: minHeight, maxWidth: maxWidth, maxHeight: maxHeight };
        };
        /**
         * Update the layout tree.
         */
        SplitLayoutNode.prototype.update = function (left, top, width, height, spacing, items) {
            // Compute the available layout space.
            var horizontal = this.orientation === 'horizontal';
            var fixed = Math.max(0, this.children.length - 1) * spacing;
            var space = Math.max(0, (horizontal ? width : height) - fixed);
            // De-normalize the sizes if needed.
            if (this.normalized) {
                algorithm_1.each(this.sizers, function (sizer) { sizer.sizeHint *= space; });
                this.normalized = false;
            }
            // Distribute the layout space to the sizers.
            boxengine_1.BoxEngine.calc(this.sizers, space);
            // Update the geometry of the child nodes and handles.
            for (var i = 0, n = this.children.length; i < n; ++i) {
                var child = this.children[i];
                var size = this.sizers[i].size;
                var handleStyle = this.handles[i].style;
                if (horizontal) {
                    child.update(left, top, size, height, spacing, items);
                    left += size;
                    handleStyle.top = top + "px";
                    handleStyle.left = left + "px";
                    handleStyle.width = spacing + "px";
                    handleStyle.height = height + "px";
                    left += spacing;
                }
                else {
                    child.update(left, top, width, size, spacing, items);
                    top += size;
                    handleStyle.top = top + "px";
                    handleStyle.left = left + "px";
                    handleStyle.width = width + "px";
                    handleStyle.height = spacing + "px";
                    top += spacing;
                }
            }
        };
        return SplitLayoutNode;
    }());
    Private.SplitLayoutNode = SplitLayoutNode;
    /**
     * Normalize a tab area config and collect the visited widgets.
     */
    function normalizeTabAreaConfig(config, widgetSet) {
        // Bail early if there is no content.
        if (config.widgets.length === 0) {
            return null;
        }
        // Setup the filtered widgets array.
        var widgets = [];
        // Filter the config for unique widgets.
        algorithm_1.each(config.widgets, function (widget) {
            if (!widgetSet.has(widget)) {
                widgetSet.add(widget);
                widgets.push(widget);
            }
        });
        // Bail if there are no effective widgets.
        if (widgets.length === 0) {
            return null;
        }
        // Normalize the current index.
        var index = config.currentIndex;
        if (index !== -1 && (index < 0 || index >= widgets.length)) {
            index = 0;
        }
        // Return a normalized config object.
        return { type: 'tab-area', widgets: widgets, currentIndex: index };
    }
    /**
     * Normalize a split area config and collect the visited widgets.
     */
    function normalizeSplitAreaConfig(config, widgetSet) {
        // Set up the result variables.
        var orientation = config.orientation;
        var children = [];
        var sizes = [];
        // Normalize the config children.
        for (var i = 0, n = config.children.length; i < n; ++i) {
            // Normalize the child config.
            var child = normalizeAreaConfig(config.children[i], widgetSet);
            // Ignore an empty child.
            if (!child) {
                continue;
            }
            // Add the child or hoist its content as appropriate.
            if (child.type === 'tab-area' || child.orientation !== orientation) {
                children.push(child);
                sizes.push(Math.abs(config.sizes[i] || 0));
            }
            else {
                children.push.apply(children, child.children);
                sizes.push.apply(sizes, child.sizes);
            }
        }
        // Bail if there are no effective children.
        if (children.length === 0) {
            return null;
        }
        // If there is only one effective child, return that child.
        if (children.length === 1) {
            return children[0];
        }
        // Return a normalized config object.
        return { type: 'split-area', orientation: orientation, children: children, sizes: sizes };
    }
    /**
     * Convert a normalized tab area config into a layout tree.
     */
    function realizeTabAreaConfig(config, renderer) {
        // Create the tab bar for the layout node.
        var tabBar = renderer.createTabBar();
        // Hide each widget and add it to the tab bar.
        algorithm_1.each(config.widgets, function (widget) {
            widget.hide();
            tabBar.addTab(widget.title);
        });
        // Set the current index of the tab bar.
        tabBar.currentIndex = config.currentIndex;
        // Return the new tab layout node.
        return new TabLayoutNode(tabBar);
    }
    /**
     * Convert a normalized split area config into a layout tree.
     */
    function realizeSplitAreaConfig(config, renderer) {
        // Create the split layout node.
        var node = new SplitLayoutNode(config.orientation);
        // Add each child to the layout node.
        algorithm_1.each(config.children, function (child, i) {
            // Create the child data for the layout node.
            var childNode = realizeAreaConfig(child, renderer);
            var sizer = createSizer(config.sizes[i]);
            var handle = renderer.createHandle();
            // Add the child data to the layout node.
            node.children.push(childNode);
            node.handles.push(handle);
            node.sizers.push(sizer);
            // Update the parent for the child node.
            childNode.parent = node;
        });
        // Synchronize the handle state for the layout node.
        node.syncHandles();
        // Normalize the sizes for the layout node.
        node.normalizeSizes();
        // Return the new layout node.
        return node;
    }
})(Private || (Private = {}));

})
		], [
			/* @lumino/widgets: 62 */
			"lib/contextmenu.js", ["cjs","js"], {"./menu": 55, "@lumino/algorithm": 11, "@lumino/disposable": 30, "@lumino/domutils": 33}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
var disposable_1 = require("@lumino/disposable");
var domutils_1 = require("@lumino/domutils");
var menu_1 = require("./menu");
/**
 * An object which implements a universal context menu.
 *
 * #### Notes
 * The items shown in the context menu are determined by CSS selector
 * matching against the DOM hierarchy at the site of the mouse click.
 * This is similar in concept to how keyboard shortcuts are matched
 * in the command registry.
 */
var ContextMenu = /** @class */ (function () {
    /**
     * Construct a new context menu.
     *
     * @param options - The options for initializing the menu.
     */
    function ContextMenu(options) {
        this._idTick = 0;
        this._items = [];
        this.menu = new menu_1.Menu(options);
    }
    /**
     * Add an item to the context menu.
     *
     * @param options - The options for creating the item.
     *
     * @returns A disposable which will remove the item from the menu.
     */
    ContextMenu.prototype.addItem = function (options) {
        var _this = this;
        // Create an item from the given options.
        var item = Private.createItem(options, this._idTick++);
        // Add the item to the internal array.
        this._items.push(item);
        // Return a disposable which will remove the item.
        return new disposable_1.DisposableDelegate(function () {
            algorithm_1.ArrayExt.removeFirstOf(_this._items, item);
        });
    };
    /**
     * Open the context menu in response to a `'contextmenu'` event.
     *
     * @param event - The `'contextmenu'` event of interest.
     *
     * @returns `true` if the menu was opened, or `false` if no items
     *   matched the event and the menu was not opened.
     *
     * #### Notes
     * This method will populate the context menu with items which match
     * the propagation path of the event, then open the menu at the mouse
     * position indicated by the event.
     */
    ContextMenu.prototype.open = function (event) {
        var _this = this;
        // Clear the current contents of the context menu.
        this.menu.clearItems();
        // Bail early if there are no items to match.
        if (this._items.length === 0) {
            return false;
        }
        // Find the matching items for the event.
        var items = Private.matchItems(this._items, event);
        // Bail if there are no matching items.
        if (!items || items.length === 0) {
            return false;
        }
        // Add the filtered items to the menu.
        algorithm_1.each(items, function (item) { _this.menu.addItem(item); });
        // Open the context menu at the current mouse position.
        this.menu.open(event.clientX, event.clientY);
        // Indicate success.
        return true;
    };
    return ContextMenu;
}());
exports.ContextMenu = ContextMenu;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * Create a normalized context menu item from an options object.
     */
    function createItem(options, id) {
        var selector = validateSelector(options.selector);
        var rank = options.rank !== undefined ? options.rank : Infinity;
        return __assign(__assign({}, options), { selector: selector, rank: rank, id: id });
    }
    Private.createItem = createItem;
    /**
     * Find the items which match a context menu event.
     *
     * The results are sorted by DOM level, specificity, and rank.
     */
    function matchItems(items, event) {
        // Look up the target of the event.
        var target = event.target;
        // Bail if there is no target.
        if (!target) {
            return null;
        }
        // Look up the current target of the event.
        var currentTarget = event.currentTarget;
        // Bail if there is no current target.
        if (!currentTarget) {
            return null;
        }
        // There are some third party libraries that cause the `target` to
        // be detached from the DOM before lumino can process the event.
        // If that happens, search for a new target node by point. If that
        // node is still dangling, bail.
        if (!currentTarget.contains(target)) {
            target = document.elementFromPoint(event.clientX, event.clientY);
            if (!target || !currentTarget.contains(target)) {
                return null;
            }
        }
        // Set up the result array.
        var result = [];
        // Copy the items array to allow in-place modification.
        var availableItems = items.slice();
        // Walk up the DOM hierarchy searching for matches.
        while (target !== null) {
            // Set up the match array for this DOM level.
            var matches = [];
            // Search the remaining items for matches.
            for (var i = 0, n = availableItems.length; i < n; ++i) {
                // Fetch the item.
                var item = availableItems[i];
                // Skip items which are already consumed.
                if (!item) {
                    continue;
                }
                // Skip items which do not match the element.
                if (!domutils_1.Selector.matches(target, item.selector)) {
                    continue;
                }
                // Add the matched item to the result for this DOM level.
                matches.push(item);
                // Mark the item as consumed.
                availableItems[i] = null;
            }
            // Sort the matches for this level and add them to the results.
            if (matches.length !== 0) {
                matches.sort(itemCmp);
                result.push.apply(result, matches);
            }
            // Stop searching at the limits of the DOM range.
            if (target === currentTarget) {
                break;
            }
            // Step to the parent DOM level.
            target = target.parentElement;
        }
        // Return the matched and sorted results.
        return result;
    }
    Private.matchItems = matchItems;
    /**
     * Validate the selector for a menu item.
     *
     * This returns the validated selector, or throws if the selector is
     * invalid or contains commas.
     */
    function validateSelector(selector) {
        if (selector.indexOf(',') !== -1) {
            throw new Error("Selector cannot contain commas: " + selector);
        }
        if (!domutils_1.Selector.isValid(selector)) {
            throw new Error("Invalid selector: " + selector);
        }
        return selector;
    }
    /**
     * A sort comparison function for a context menu item.
     */
    function itemCmp(a, b) {
        // Sort first based on selector specificity.
        var s1 = domutils_1.Selector.calculateSpecificity(a.selector);
        var s2 = domutils_1.Selector.calculateSpecificity(b.selector);
        if (s1 !== s2) {
            return s2 - s1;
        }
        // If specificities are equal, sort based on rank.
        var r1 = a.rank;
        var r2 = b.rank;
        if (r1 !== r2) {
            return r1 < r2 ? -1 : 1; // Infinity-safe
        }
        // When all else fails, sort by item id.
        return a.id - b.id;
    }
})(Private || (Private = {}));

})
		], [
			/* @lumino/widgets: 63 */
			"lib/commandpalette.js", ["cjs","js"], {"./widget": 42, "@lumino/algorithm": 11, "@lumino/commands": 21, "@lumino/coreutils": 28, "@lumino/domutils": 33, "@lumino/virtualdom": 41}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
var coreutils_1 = require("@lumino/coreutils");
var commands_1 = require("@lumino/commands");
var domutils_1 = require("@lumino/domutils");
var virtualdom_1 = require("@lumino/virtualdom");
var widget_1 = require("./widget");
/**
 * A widget which displays command items as a searchable palette.
 */
var CommandPalette = /** @class */ (function (_super) {
    __extends(CommandPalette, _super);
    /**
     * Construct a new command palette.
     *
     * @param options - The options for initializing the palette.
     */
    function CommandPalette(options) {
        var _this = _super.call(this, { node: Private.createNode() }) || this;
        _this._activeIndex = -1;
        _this._items = [];
        _this._results = null;
        _this.addClass('lm-CommandPalette');
        /* <DEPRECATED> */
        _this.addClass('p-CommandPalette');
        /* </DEPRECATED> */
        _this.setFlag(widget_1.Widget.Flag.DisallowLayout);
        _this.commands = options.commands;
        _this.renderer = options.renderer || CommandPalette.defaultRenderer;
        _this.commands.commandChanged.connect(_this._onGenericChange, _this);
        _this.commands.keyBindingChanged.connect(_this._onGenericChange, _this);
        return _this;
    }
    /**
     * Dispose of the resources held by the widget.
     */
    CommandPalette.prototype.dispose = function () {
        this._items.length = 0;
        this._results = null;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(CommandPalette.prototype, "searchNode", {
        /**
         * The command palette search node.
         *
         * #### Notes
         * This is the node which contains the search-related elements.
         */
        get: function () {
            return this.node.getElementsByClassName('lm-CommandPalette-search')[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandPalette.prototype, "inputNode", {
        /**
         * The command palette input node.
         *
         * #### Notes
         * This is the actual input node for the search area.
         */
        get: function () {
            return this.node.getElementsByClassName('lm-CommandPalette-input')[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandPalette.prototype, "contentNode", {
        /**
         * The command palette content node.
         *
         * #### Notes
         * This is the node which holds the command item nodes.
         *
         * Modifying this node directly can lead to undefined behavior.
         */
        get: function () {
            return this.node.getElementsByClassName('lm-CommandPalette-content')[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandPalette.prototype, "items", {
        /**
         * A read-only array of the command items in the palette.
         */
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add a command item to the command palette.
     *
     * @param options - The options for creating the command item.
     *
     * @returns The command item added to the palette.
     */
    CommandPalette.prototype.addItem = function (options) {
        // Create a new command item for the options.
        var item = Private.createItem(this.commands, options);
        // Add the item to the array.
        this._items.push(item);
        // Refresh the search results.
        this.refresh();
        // Return the item added to the palette.
        return item;
    };
    /**
     * Remove an item from the command palette.
     *
     * @param item - The item to remove from the palette.
     *
     * #### Notes
     * This is a no-op if the item is not in the palette.
     */
    CommandPalette.prototype.removeItem = function (item) {
        this.removeItemAt(this._items.indexOf(item));
    };
    /**
     * Remove the item at a given index from the command palette.
     *
     * @param index - The index of the item to remove.
     *
     * #### Notes
     * This is a no-op if the index is out of range.
     */
    CommandPalette.prototype.removeItemAt = function (index) {
        // Remove the item from the array.
        var item = algorithm_1.ArrayExt.removeAt(this._items, index);
        // Bail if the index is out of range.
        if (!item) {
            return;
        }
        // Refresh the search results.
        this.refresh();
    };
    /**
     * Remove all items from the command palette.
     */
    CommandPalette.prototype.clearItems = function () {
        // Bail if there is nothing to remove.
        if (this._items.length === 0) {
            return;
        }
        // Clear the array of items.
        this._items.length = 0;
        // Refresh the search results.
        this.refresh();
    };
    /**
     * Clear the search results and schedule an update.
     *
     * #### Notes
     * This should be called whenever the search results of the palette
     * should be updated.
     *
     * This is typically called automatically by the palette as needed,
     * but can be called manually if the input text is programatically
     * changed.
     *
     * The rendered results are updated asynchronously.
     */
    CommandPalette.prototype.refresh = function () {
        this._results = null;
        this.update();
    };
    /**
     * Handle the DOM events for the command palette.
     *
     * @param event - The DOM event sent to the command palette.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the command palette's DOM node.
     * It should not be called directly by user code.
     */
    CommandPalette.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'click':
                this._evtClick(event);
                break;
            case 'keydown':
                this._evtKeyDown(event);
                break;
            case 'input':
                this.refresh();
                break;
            case 'focus':
            case 'blur':
                this._toggleFocused();
                break;
        }
    };
    /**
     * A message handler invoked on a `'before-attach'` message.
     */
    CommandPalette.prototype.onBeforeAttach = function (msg) {
        this.node.addEventListener('click', this);
        this.node.addEventListener('keydown', this);
        this.node.addEventListener('input', this);
        this.node.addEventListener('focus', this, true);
        this.node.addEventListener('blur', this, true);
    };
    /**
     * A message handler invoked on an `'after-detach'` message.
     */
    CommandPalette.prototype.onAfterDetach = function (msg) {
        this.node.removeEventListener('click', this);
        this.node.removeEventListener('keydown', this);
        this.node.removeEventListener('input', this);
        this.node.removeEventListener('focus', this, true);
        this.node.removeEventListener('blur', this, true);
    };
    /**
     * A message handler invoked on an `'activate-request'` message.
     */
    CommandPalette.prototype.onActivateRequest = function (msg) {
        if (this.isAttached) {
            var input = this.inputNode;
            input.focus();
            input.select();
        }
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    CommandPalette.prototype.onUpdateRequest = function (msg) {
        // Fetch the current query text and content node.
        var query = this.inputNode.value;
        var contentNode = this.contentNode;
        // Ensure the search results are generated.
        var results = this._results;
        if (!results) {
            // Generate and store the new search results.
            results = this._results = Private.search(this._items, query);
            // Reset the active index.
            this._activeIndex = (query ? algorithm_1.ArrayExt.findFirstIndex(results, Private.canActivate) : -1);
        }
        // If there is no query and no results, clear the content.
        if (!query && results.length === 0) {
            virtualdom_1.VirtualDOM.render(null, contentNode);
            return;
        }
        // If the is a query but no results, render the empty message.
        if (query && results.length === 0) {
            var content_1 = this.renderer.renderEmptyMessage({ query: query });
            virtualdom_1.VirtualDOM.render(content_1, contentNode);
            return;
        }
        // Create the render content for the search results.
        var renderer = this.renderer;
        var activeIndex = this._activeIndex;
        var content = new Array(results.length);
        for (var i = 0, n = results.length; i < n; ++i) {
            var result = results[i];
            if (result.type === 'header') {
                var indices = result.indices;
                var category = result.category;
                content[i] = renderer.renderHeader({ category: category, indices: indices });
            }
            else {
                var item = result.item;
                var indices = result.indices;
                var active = i === activeIndex;
                content[i] = renderer.renderItem({ item: item, indices: indices, active: active });
            }
        }
        // Render the search result content.
        virtualdom_1.VirtualDOM.render(content, contentNode);
        // Adjust the scroll position as needed.
        if (activeIndex < 0 || activeIndex >= results.length) {
            contentNode.scrollTop = 0;
        }
        else {
            var element = contentNode.children[activeIndex];
            domutils_1.ElementExt.scrollIntoViewIfNeeded(contentNode, element);
        }
    };
    /**
     * Handle the `'click'` event for the command palette.
     */
    CommandPalette.prototype._evtClick = function (event) {
        // Bail if the click is not the left button.
        if (event.button !== 0) {
            return;
        }
        // Find the index of the item which was clicked.
        var index = algorithm_1.ArrayExt.findFirstIndex(this.contentNode.children, function (node) {
            return node.contains(event.target);
        });
        // Bail if the click was not on an item.
        if (index === -1) {
            return;
        }
        // Kill the event when a content item is clicked.
        event.preventDefault();
        event.stopPropagation();
        // Execute the item if possible.
        this._execute(index);
    };
    /**
     * Handle the `'keydown'` event for the command palette.
     */
    CommandPalette.prototype._evtKeyDown = function (event) {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return;
        }
        switch (event.keyCode) {
            case 13: // Enter
                event.preventDefault();
                event.stopPropagation();
                this._execute(this._activeIndex);
                break;
            case 38: // Up Arrow
                event.preventDefault();
                event.stopPropagation();
                this._activatePreviousItem();
                break;
            case 40: // Down Arrow
                event.preventDefault();
                event.stopPropagation();
                this._activateNextItem();
                break;
        }
    };
    /**
     * Activate the next enabled command item.
     */
    CommandPalette.prototype._activateNextItem = function () {
        // Bail if there are no search results.
        if (!this._results || this._results.length === 0) {
            return;
        }
        // Find the next enabled item index.
        var ai = this._activeIndex;
        var n = this._results.length;
        var start = ai < n - 1 ? ai + 1 : 0;
        var stop = start === 0 ? n - 1 : start - 1;
        this._activeIndex = algorithm_1.ArrayExt.findFirstIndex(this._results, Private.canActivate, start, stop);
        // Schedule an update of the items.
        this.update();
    };
    /**
     * Activate the previous enabled command item.
     */
    CommandPalette.prototype._activatePreviousItem = function () {
        // Bail if there are no search results.
        if (!this._results || this._results.length === 0) {
            return;
        }
        // Find the previous enabled item index.
        var ai = this._activeIndex;
        var n = this._results.length;
        var start = ai <= 0 ? n - 1 : ai - 1;
        var stop = start === n - 1 ? 0 : start + 1;
        this._activeIndex = algorithm_1.ArrayExt.findLastIndex(this._results, Private.canActivate, start, stop);
        // Schedule an update of the items.
        this.update();
    };
    /**
     * Execute the command item at the given index, if possible.
     */
    CommandPalette.prototype._execute = function (index) {
        // Bail if there are no search results.
        if (!this._results) {
            return;
        }
        // Bail if the index is out of range.
        var part = this._results[index];
        if (!part) {
            return;
        }
        // Update the search text if the item is a header.
        if (part.type === 'header') {
            var input = this.inputNode;
            input.value = part.category.toLowerCase() + " ";
            input.focus();
            this.refresh();
            return;
        }
        // Bail if item is not enabled.
        if (!part.item.isEnabled) {
            return;
        }
        // Execute the item.
        this.commands.execute(part.item.command, part.item.args);
        // Clear the query text.
        this.inputNode.value = '';
        // Refresh the search results.
        this.refresh();
    };
    /**
     * Toggle the focused modifier based on the input node focus state.
     */
    CommandPalette.prototype._toggleFocused = function () {
        var focused = document.activeElement === this.inputNode;
        this.toggleClass('lm-mod-focused', focused);
        /* <DEPRECATED> */
        this.toggleClass('p-mod-focused', focused);
        /* </DEPRECATED> */
    };
    /**
     * A signal handler for generic command changes.
     */
    CommandPalette.prototype._onGenericChange = function () {
        this.refresh();
    };
    return CommandPalette;
}(widget_1.Widget));
exports.CommandPalette = CommandPalette;
/**
 * The namespace for the `CommandPalette` class statics.
 */
(function (CommandPalette) {
    /**
     * The default implementation of `IRenderer`.
     */
    var Renderer = /** @class */ (function () {
        function Renderer() {
        }
        /**
         * Render the virtual element for a command palette header.
         *
         * @param data - The data to use for rendering the header.
         *
         * @returns A virtual element representing the header.
         */
        Renderer.prototype.renderHeader = function (data) {
            var content = this.formatHeader(data);
            return virtualdom_1.h.li({ className: 'lm-CommandPalette-header'
                    /* <DEPRECATED> */
                    + ' p-CommandPalette-header'
                /* </DEPRECATED> */
            }, content);
        };
        /**
         * Render the virtual element for a command palette item.
         *
         * @param data - The data to use for rendering the item.
         *
         * @returns A virtual element representing the item.
         */
        Renderer.prototype.renderItem = function (data) {
            var className = this.createItemClass(data);
            var dataset = this.createItemDataset(data);
            return (virtualdom_1.h.li({ className: className, dataset: dataset }, this.renderItemIcon(data), this.renderItemContent(data), this.renderItemShortcut(data)));
        };
        /**
         * Render the empty results message for a command palette.
         *
         * @param data - The data to use for rendering the message.
         *
         * @returns A virtual element representing the message.
         */
        Renderer.prototype.renderEmptyMessage = function (data) {
            var content = this.formatEmptyMessage(data);
            return virtualdom_1.h.li({
                className: 'lm-CommandPalette-emptyMessage'
                    /* <DEPRECATED> */
                    + ' p-CommandPalette-emptyMessage'
                /* </DEPRECATED> */
            }, content);
        };
        /**
         * Render the icon for a command palette item.
         *
         * @param data - The data to use for rendering the icon.
         *
         * @returns A virtual element representing the icon.
         */
        Renderer.prototype.renderItemIcon = function (data) {
            var className = this.createIconClass(data);
            /* <DEPRECATED> */
            if (typeof data.item.icon === 'string') {
                return virtualdom_1.h.div({ className: className }, data.item.iconLabel);
            }
            /* </DEPRECATED> */
            // if data.item.icon is undefined, it will be ignored
            return virtualdom_1.h.div({ className: className }, data.item.icon, data.item.iconLabel);
        };
        /**
         * Render the content for a command palette item.
         *
         * @param data - The data to use for rendering the content.
         *
         * @returns A virtual element representing the content.
         */
        Renderer.prototype.renderItemContent = function (data) {
            return (virtualdom_1.h.div({
                className: 'lm-CommandPalette-itemContent'
                    /* <DEPRECATED> */
                    + ' p-CommandPalette-itemContent'
                /* </DEPRECATED> */
            }, this.renderItemLabel(data), this.renderItemCaption(data)));
        };
        /**
         * Render the label for a command palette item.
         *
         * @param data - The data to use for rendering the label.
         *
         * @returns A virtual element representing the label.
         */
        Renderer.prototype.renderItemLabel = function (data) {
            var content = this.formatItemLabel(data);
            return virtualdom_1.h.div({
                className: 'lm-CommandPalette-itemLabel'
                    /* <DEPRECATED> */
                    + ' p-CommandPalette-itemLabel'
                /* </DEPRECATED> */
            }, content);
        };
        /**
         * Render the caption for a command palette item.
         *
         * @param data - The data to use for rendering the caption.
         *
         * @returns A virtual element representing the caption.
         */
        Renderer.prototype.renderItemCaption = function (data) {
            var content = this.formatItemCaption(data);
            return virtualdom_1.h.div({
                className: 'lm-CommandPalette-itemCaption'
                    /* <DEPRECATED> */
                    + ' p-CommandPalette-itemCaption'
                /* </DEPRECATED> */
            }, content);
        };
        /**
         * Render the shortcut for a command palette item.
         *
         * @param data - The data to use for rendering the shortcut.
         *
         * @returns A virtual element representing the shortcut.
         */
        Renderer.prototype.renderItemShortcut = function (data) {
            var content = this.formatItemShortcut(data);
            return virtualdom_1.h.div({
                className: 'lm-CommandPalette-itemShortcut'
                    /* <DEPRECATED> */
                    + ' p-CommandPalette-itemShortcut'
                /* </DEPRECATED> */
            }, content);
        };
        /**
         * Create the class name for the command palette item.
         *
         * @param data - The data to use for the class name.
         *
         * @returns The full class name for the command palette item.
         */
        Renderer.prototype.createItemClass = function (data) {
            // Set up the initial class name.
            var name = 'lm-CommandPalette-item';
            /* <DEPRECATED> */
            name += ' p-CommandPalette-item';
            /* </DEPRECATED> */
            // Add the boolean state classes.
            if (!data.item.isEnabled) {
                name += ' lm-mod-disabled';
                /* <DEPRECATED> */
                name += ' p-mod-disabled';
                /* </DEPRECATED> */
            }
            if (data.item.isToggled) {
                name += ' lm-mod-toggled';
                /* <DEPRECATED> */
                name += ' p-mod-toggled';
                /* </DEPRECATED> */
            }
            if (data.active) {
                name += ' lm-mod-active';
                /* <DEPRECATED> */
                name += ' p-mod-active';
                /* </DEPRECATED> */
            }
            // Add the extra class.
            var extra = data.item.className;
            if (extra) {
                name += " " + extra;
            }
            // Return the complete class name.
            return name;
        };
        /**
         * Create the dataset for the command palette item.
         *
         * @param data - The data to use for creating the dataset.
         *
         * @returns The dataset for the command palette item.
         */
        Renderer.prototype.createItemDataset = function (data) {
            return __assign(__assign({}, data.item.dataset), { command: data.item.command });
        };
        /**
         * Create the class name for the command item icon.
         *
         * @param data - The data to use for the class name.
         *
         * @returns The full class name for the item icon.
         */
        Renderer.prototype.createIconClass = function (data) {
            var name = 'lm-CommandPalette-itemIcon';
            /* <DEPRECATED> */
            name += ' p-CommandPalette-itemIcon';
            /* </DEPRECATED> */
            var extra = data.item.iconClass;
            return extra ? name + " " + extra : name;
        };
        /**
         * Create the render content for the header node.
         *
         * @param data - The data to use for the header content.
         *
         * @returns The content to add to the header node.
         */
        Renderer.prototype.formatHeader = function (data) {
            if (!data.indices || data.indices.length === 0) {
                return data.category;
            }
            return algorithm_1.StringExt.highlight(data.category, data.indices, virtualdom_1.h.mark);
        };
        /**
         * Create the render content for the empty message node.
         *
         * @param data - The data to use for the empty message content.
         *
         * @returns The content to add to the empty message node.
         */
        Renderer.prototype.formatEmptyMessage = function (data) {
            return "No commands found that match '" + data.query + "'";
        };
        /**
         * Create the render content for the item shortcut node.
         *
         * @param data - The data to use for the shortcut content.
         *
         * @returns The content to add to the shortcut node.
         */
        Renderer.prototype.formatItemShortcut = function (data) {
            var kb = data.item.keyBinding;
            return kb ? kb.keys.map(commands_1.CommandRegistry.formatKeystroke).join(', ') : null;
        };
        /**
         * Create the render content for the item label node.
         *
         * @param data - The data to use for the label content.
         *
         * @returns The content to add to the label node.
         */
        Renderer.prototype.formatItemLabel = function (data) {
            if (!data.indices || data.indices.length === 0) {
                return data.item.label;
            }
            return algorithm_1.StringExt.highlight(data.item.label, data.indices, virtualdom_1.h.mark);
        };
        /**
         * Create the render content for the item caption node.
         *
         * @param data - The data to use for the caption content.
         *
         * @returns The content to add to the caption node.
         */
        Renderer.prototype.formatItemCaption = function (data) {
            return data.item.caption;
        };
        return Renderer;
    }());
    CommandPalette.Renderer = Renderer;
    /**
     * The default `Renderer` instance.
     */
    CommandPalette.defaultRenderer = new Renderer();
})(CommandPalette = exports.CommandPalette || (exports.CommandPalette = {}));
exports.CommandPalette = CommandPalette;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * Create the DOM node for a command palette.
     */
    function createNode() {
        var node = document.createElement('div');
        var search = document.createElement('div');
        var wrapper = document.createElement('div');
        var input = document.createElement('input');
        var content = document.createElement('ul');
        search.className = 'lm-CommandPalette-search';
        wrapper.className = 'lm-CommandPalette-wrapper';
        input.className = 'lm-CommandPalette-input';
        content.className = 'lm-CommandPalette-content';
        /* <DEPRECATED> */
        search.classList.add('p-CommandPalette-search');
        wrapper.classList.add('p-CommandPalette-wrapper');
        input.classList.add('p-CommandPalette-input');
        content.classList.add('p-CommandPalette-content');
        /* </DEPRECATED> */
        input.spellcheck = false;
        wrapper.appendChild(input);
        search.appendChild(wrapper);
        node.appendChild(search);
        node.appendChild(content);
        return node;
    }
    Private.createNode = createNode;
    /**
     * Create a new command item from a command registry and options.
     */
    function createItem(commands, options) {
        return new CommandItem(commands, options);
    }
    Private.createItem = createItem;
    /**
     * Search an array of command items for fuzzy matches.
     */
    function search(items, query) {
        // Fuzzy match the items for the query.
        var scores = matchItems(items, query);
        // Sort the items based on their score.
        scores.sort(scoreCmp);
        // Create the results for the search.
        return createResults(scores);
    }
    Private.search = search;
    /**
     * Test whether a result item can be activated.
     */
    function canActivate(result) {
        return result.type === 'item' && result.item.isEnabled;
    }
    Private.canActivate = canActivate;
    /**
     * Normalize a category for a command item.
     */
    function normalizeCategory(category) {
        return category.trim().replace(/\s+/g, ' ');
    }
    /**
     * Normalize the query text for a fuzzy search.
     */
    function normalizeQuery(text) {
        return text.replace(/\s+/g, '').toLowerCase();
    }
    /**
     * Perform a fuzzy match on an array of command items.
     */
    function matchItems(items, query) {
        // Normalize the query text to lower case with no whitespace.
        query = normalizeQuery(query);
        // Create the array to hold the scores.
        var scores = [];
        // Iterate over the items and match against the query.
        for (var i = 0, n = items.length; i < n; ++i) {
            // Ignore items which are not visible.
            var item = items[i];
            if (!item.isVisible) {
                continue;
            }
            // If the query is empty, all items are matched by default.
            if (!query) {
                scores.push({
                    matchType: 3 /* Default */,
                    categoryIndices: null,
                    labelIndices: null,
                    score: 0, item: item
                });
                continue;
            }
            // Run the fuzzy search for the item and query.
            var score = fuzzySearch(item, query);
            // Ignore the item if it is not a match.
            if (!score) {
                continue;
            }
            // Penalize disabled items.
            // TODO - push disabled items all the way down in sort cmp?
            if (!item.isEnabled) {
                score.score += 1000;
            }
            // Add the score to the results.
            scores.push(score);
        }
        // Return the final array of scores.
        return scores;
    }
    /**
     * Perform a fuzzy search on a single command item.
     */
    function fuzzySearch(item, query) {
        // Create the source text to be searched.
        var category = item.category.toLowerCase();
        var label = item.label.toLowerCase();
        var source = category + " " + label;
        // Set up the match score and indices array.
        var score = Infinity;
        var indices = null;
        // The regex for search word boundaries
        var rgx = /\b\w/g;
        // Search the source by word boundary.
        while (true) {
            // Find the next word boundary in the source.
            var rgxMatch = rgx.exec(source);
            // Break if there is no more source context.
            if (!rgxMatch) {
                break;
            }
            // Run the string match on the relevant substring.
            var match = algorithm_1.StringExt.matchSumOfDeltas(source, query, rgxMatch.index);
            // Break if there is no match.
            if (!match) {
                break;
            }
            // Update the match if the score is better.
            if (match && match.score <= score) {
                score = match.score;
                indices = match.indices;
            }
        }
        // Bail if there was no match.
        if (!indices || score === Infinity) {
            return null;
        }
        // Compute the pivot index between category and label text.
        var pivot = category.length + 1;
        // Find the slice index to separate matched indices.
        var j = algorithm_1.ArrayExt.lowerBound(indices, pivot, function (a, b) { return a - b; });
        // Extract the matched category and label indices.
        var categoryIndices = indices.slice(0, j);
        var labelIndices = indices.slice(j);
        // Adjust the label indices for the pivot offset.
        for (var i = 0, n = labelIndices.length; i < n; ++i) {
            labelIndices[i] -= pivot;
        }
        // Handle a pure label match.
        if (categoryIndices.length === 0) {
            return {
                matchType: 0 /* Label */,
                categoryIndices: null,
                labelIndices: labelIndices,
                score: score, item: item
            };
        }
        // Handle a pure category match.
        if (labelIndices.length === 0) {
            return {
                matchType: 1 /* Category */,
                categoryIndices: categoryIndices,
                labelIndices: null,
                score: score, item: item
            };
        }
        // Handle a split match.
        return {
            matchType: 2 /* Split */,
            categoryIndices: categoryIndices,
            labelIndices: labelIndices,
            score: score, item: item
        };
    }
    /**
     * A sort comparison function for a match score.
     */
    function scoreCmp(a, b) {
        // First compare based on the match type
        var m1 = a.matchType - b.matchType;
        if (m1 !== 0) {
            return m1;
        }
        // Otherwise, compare based on the match score.
        var d1 = a.score - b.score;
        if (d1 !== 0) {
            return d1;
        }
        // Find the match index based on the match type.
        var i1 = 0;
        var i2 = 0;
        switch (a.matchType) {
            case 0 /* Label */:
                i1 = a.labelIndices[0];
                i2 = b.labelIndices[0];
                break;
            case 1 /* Category */:
            case 2 /* Split */:
                i1 = a.categoryIndices[0];
                i2 = b.categoryIndices[0];
                break;
        }
        // Compare based on the match index.
        if (i1 !== i2) {
            return i1 - i2;
        }
        // Otherwise, compare by category.
        var d2 = a.item.category.localeCompare(b.item.category);
        if (d2 !== 0) {
            return d2;
        }
        // Otherwise, compare by rank.
        var r1 = a.item.rank;
        var r2 = b.item.rank;
        if (r1 !== r2) {
            return r1 < r2 ? -1 : 1; // Infinity safe
        }
        // Finally, compare by label.
        return a.item.label.localeCompare(b.item.label);
    }
    /**
     * Create the results from an array of sorted scores.
     */
    function createResults(scores) {
        // Set up an array to track which scores have been visited.
        var visited = new Array(scores.length);
        algorithm_1.ArrayExt.fill(visited, false);
        // Set up the search results array.
        var results = [];
        // Iterate over each score in the array.
        for (var i = 0, n = scores.length; i < n; ++i) {
            // Ignore a score which has already been processed.
            if (visited[i]) {
                continue;
            }
            // Extract the current item and indices.
            var _a = scores[i], item = _a.item, categoryIndices = _a.categoryIndices;
            // Extract the category for the current item.
            var category = item.category;
            // Add the header result for the category.
            results.push({ type: 'header', category: category, indices: categoryIndices });
            // Find the rest of the scores with the same category.
            for (var j = i; j < n; ++j) {
                // Ignore a score which has already been processed.
                if (visited[j]) {
                    continue;
                }
                // Extract the data for the current score.
                var _b = scores[j], item_1 = _b.item, labelIndices = _b.labelIndices;
                // Ignore an item with a different category.
                if (item_1.category !== category) {
                    continue;
                }
                // Create the item result for the score.
                results.push({ type: 'item', item: item_1, indices: labelIndices });
                // Mark the score as processed.
                visited[j] = true;
            }
        }
        // Return the final results.
        return results;
    }
    /**
     * A concrete implementation of `CommandPalette.IItem`.
     */
    var CommandItem = /** @class */ (function () {
        /**
         * Construct a new command item.
         */
        function CommandItem(commands, options) {
            this._commands = commands;
            this.category = normalizeCategory(options.category);
            this.command = options.command;
            this.args = options.args || coreutils_1.JSONExt.emptyObject;
            this.rank = options.rank !== undefined ? options.rank : Infinity;
        }
        Object.defineProperty(CommandItem.prototype, "label", {
            /**
             * The display label for the command item.
             */
            get: function () {
                return this._commands.label(this.command, this.args);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommandItem.prototype, "icon", {
            /**
             * The icon renderer for the command item.
             */
            get: function () {
                return this._commands.icon(this.command, this.args);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommandItem.prototype, "iconClass", {
            /**
             * The icon class for the command item.
             */
            get: function () {
                return this._commands.iconClass(this.command, this.args);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommandItem.prototype, "iconLabel", {
            /**
             * The icon label for the command item.
             */
            get: function () {
                return this._commands.iconLabel(this.command, this.args);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommandItem.prototype, "caption", {
            /**
             * The display caption for the command item.
             */
            get: function () {
                return this._commands.caption(this.command, this.args);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommandItem.prototype, "className", {
            /**
             * The extra class name for the command item.
             */
            get: function () {
                return this._commands.className(this.command, this.args);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommandItem.prototype, "dataset", {
            /**
             * The dataset for the command item.
             */
            get: function () {
                return this._commands.dataset(this.command, this.args);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommandItem.prototype, "isEnabled", {
            /**
             * Whether the command item is enabled.
             */
            get: function () {
                return this._commands.isEnabled(this.command, this.args);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommandItem.prototype, "isToggled", {
            /**
             * Whether the command item is toggled.
             */
            get: function () {
                return this._commands.isToggled(this.command, this.args);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommandItem.prototype, "isVisible", {
            /**
             * Whether the command item is visible.
             */
            get: function () {
                return this._commands.isVisible(this.command, this.args);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommandItem.prototype, "keyBinding", {
            /**
             * The key binding for the command item.
             */
            get: function () {
                var _a = this, command = _a.command, args = _a.args;
                return algorithm_1.ArrayExt.findLastValue(this._commands.keyBindings, function (kb) {
                    return kb.command === command && coreutils_1.JSONExt.deepEqual(kb.args, args);
                }) || null;
            },
            enumerable: true,
            configurable: true
        });
        return CommandItem;
    }());
})(Private || (Private = {}));

})
		], [
			/* @lumino/widgets: 64 */
			"lib/boxpanel.js", ["cjs","js"], {"./boxlayout": 65, "./panel": 53}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var boxlayout_1 = require("./boxlayout");
var panel_1 = require("./panel");
/**
 * A panel which arranges its widgets in a single row or column.
 *
 * #### Notes
 * This class provides a convenience wrapper around a [[BoxLayout]].
 */
var BoxPanel = /** @class */ (function (_super) {
    __extends(BoxPanel, _super);
    /**
     * Construct a new box panel.
     *
     * @param options - The options for initializing the box panel.
     */
    function BoxPanel(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, { layout: Private.createLayout(options) }) || this;
        _this.addClass('lm-BoxPanel');
        /* <DEPRECATED> */
        _this.addClass('p-BoxPanel');
        return _this;
        /* </DEPRECATED> */
    }
    Object.defineProperty(BoxPanel.prototype, "direction", {
        /**
         * Get the layout direction for the box panel.
         */
        get: function () {
            return this.layout.direction;
        },
        /**
         * Set the layout direction for the box panel.
         */
        set: function (value) {
            this.layout.direction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoxPanel.prototype, "alignment", {
        /**
         * Get the content alignment for the box panel.
         *
         * #### Notes
         * This is the alignment of the widgets in the layout direction.
         *
         * The alignment has no effect if the widgets can expand to fill the
         * entire box layout.
         */
        get: function () {
            return this.layout.alignment;
        },
        /**
         * Set the content alignment for the box panel.
         *
         * #### Notes
         * This is the alignment of the widgets in the layout direction.
         *
         * The alignment has no effect if the widgets can expand to fill the
         * entire box layout.
         */
        set: function (value) {
            this.layout.alignment = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoxPanel.prototype, "spacing", {
        /**
         * Get the inter-element spacing for the box panel.
         */
        get: function () {
            return this.layout.spacing;
        },
        /**
         * Set the inter-element spacing for the box panel.
         */
        set: function (value) {
            this.layout.spacing = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * A message handler invoked on a `'child-added'` message.
     */
    BoxPanel.prototype.onChildAdded = function (msg) {
        msg.child.addClass('lm-BoxPanel-child');
        /* <DEPRECATED> */
        msg.child.addClass('p-BoxPanel-child');
        /* </DEPRECATED> */
    };
    /**
     * A message handler invoked on a `'child-removed'` message.
     */
    BoxPanel.prototype.onChildRemoved = function (msg) {
        msg.child.removeClass('lm-BoxPanel-child');
        /* <DEPRECATED> */
        msg.child.removeClass('p-BoxPanel-child');
        /* </DEPRECATED> */
    };
    return BoxPanel;
}(panel_1.Panel));
exports.BoxPanel = BoxPanel;
/**
 * The namespace for the `BoxPanel` class statics.
 */
(function (BoxPanel) {
    /**
     * Get the box panel stretch factor for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The box panel stretch factor for the widget.
     */
    function getStretch(widget) {
        return boxlayout_1.BoxLayout.getStretch(widget);
    }
    BoxPanel.getStretch = getStretch;
    /**
     * Set the box panel stretch factor for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @param value - The value for the stretch factor.
     */
    function setStretch(widget, value) {
        boxlayout_1.BoxLayout.setStretch(widget, value);
    }
    BoxPanel.setStretch = setStretch;
    /**
     * Get the box panel size basis for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The box panel size basis for the widget.
     */
    function getSizeBasis(widget) {
        return boxlayout_1.BoxLayout.getSizeBasis(widget);
    }
    BoxPanel.getSizeBasis = getSizeBasis;
    /**
     * Set the box panel size basis for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @param value - The value for the size basis.
     */
    function setSizeBasis(widget, value) {
        boxlayout_1.BoxLayout.setSizeBasis(widget, value);
    }
    BoxPanel.setSizeBasis = setSizeBasis;
})(BoxPanel = exports.BoxPanel || (exports.BoxPanel = {}));
exports.BoxPanel = BoxPanel;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * Create a box layout for the given panel options.
     */
    function createLayout(options) {
        return options.layout || new boxlayout_1.BoxLayout(options);
    }
    Private.createLayout = createLayout;
})(Private || (Private = {}));

})
		], [
			/* @lumino/widgets: 65 */
			"lib/boxlayout.js", ["cjs","js"], {"./boxengine": 66, "./layout": 56, "./panellayout": 52, "./widget": 42, "@lumino/algorithm": 11, "@lumino/domutils": 33, "@lumino/messaging": 38, "@lumino/properties": 39}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var algorithm_1 = require("@lumino/algorithm");
var domutils_1 = require("@lumino/domutils");
var messaging_1 = require("@lumino/messaging");
var properties_1 = require("@lumino/properties");
var boxengine_1 = require("./boxengine");
var layout_1 = require("./layout");
var panellayout_1 = require("./panellayout");
var widget_1 = require("./widget");
/**
 * A layout which arranges its widgets in a single row or column.
 */
var BoxLayout = /** @class */ (function (_super) {
    __extends(BoxLayout, _super);
    /**
     * Construct a new box layout.
     *
     * @param options - The options for initializing the layout.
     */
    function BoxLayout(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this._fixed = 0;
        _this._spacing = 4;
        _this._dirty = false;
        _this._sizers = [];
        _this._items = [];
        _this._box = null;
        _this._alignment = 'start';
        _this._direction = 'top-to-bottom';
        if (options.direction !== undefined) {
            _this._direction = options.direction;
        }
        if (options.alignment !== undefined) {
            _this._alignment = options.alignment;
        }
        if (options.spacing !== undefined) {
            _this._spacing = Private.clampSpacing(options.spacing);
        }
        return _this;
    }
    /**
     * Dispose of the resources held by the layout.
     */
    BoxLayout.prototype.dispose = function () {
        // Dispose of the layout items.
        algorithm_1.each(this._items, function (item) { item.dispose(); });
        // Clear the layout state.
        this._box = null;
        this._items.length = 0;
        this._sizers.length = 0;
        // Dispose of the rest of the layout.
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(BoxLayout.prototype, "direction", {
        /**
         * Get the layout direction for the box layout.
         */
        get: function () {
            return this._direction;
        },
        /**
         * Set the layout direction for the box layout.
         */
        set: function (value) {
            if (this._direction === value) {
                return;
            }
            this._direction = value;
            if (!this.parent) {
                return;
            }
            this.parent.dataset['direction'] = value;
            this.parent.fit();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoxLayout.prototype, "alignment", {
        /**
         * Get the content alignment for the box layout.
         *
         * #### Notes
         * This is the alignment of the widgets in the layout direction.
         *
         * The alignment has no effect if the widgets can expand to fill the
         * entire box layout.
         */
        get: function () {
            return this._alignment;
        },
        /**
         * Set the content alignment for the box layout.
         *
         * #### Notes
         * This is the alignment of the widgets in the layout direction.
         *
         * The alignment has no effect if the widgets can expand to fill the
         * entire box layout.
         */
        set: function (value) {
            if (this._alignment === value) {
                return;
            }
            this._alignment = value;
            if (!this.parent) {
                return;
            }
            this.parent.dataset['alignment'] = value;
            this.parent.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoxLayout.prototype, "spacing", {
        /**
         * Get the inter-element spacing for the box layout.
         */
        get: function () {
            return this._spacing;
        },
        /**
         * Set the inter-element spacing for the box layout.
         */
        set: function (value) {
            value = Private.clampSpacing(value);
            if (this._spacing === value) {
                return;
            }
            this._spacing = value;
            if (!this.parent) {
                return;
            }
            this.parent.fit();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Perform layout initialization which requires the parent widget.
     */
    BoxLayout.prototype.init = function () {
        this.parent.dataset['direction'] = this.direction;
        this.parent.dataset['alignment'] = this.alignment;
        _super.prototype.init.call(this);
    };
    /**
     * Attach a widget to the parent's DOM node.
     *
     * @param index - The current index of the widget in the layout.
     *
     * @param widget - The widget to attach to the parent.
     *
     * #### Notes
     * This is a reimplementation of the superclass method.
     */
    BoxLayout.prototype.attachWidget = function (index, widget) {
        // Create and add a new layout item for the widget.
        algorithm_1.ArrayExt.insert(this._items, index, new layout_1.LayoutItem(widget));
        // Create and add a new sizer for the widget.
        algorithm_1.ArrayExt.insert(this._sizers, index, new boxengine_1.BoxSizer());
        // Send a `'before-attach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.BeforeAttach);
        }
        // Add the widget's node to the parent.
        this.parent.node.appendChild(widget.node);
        // Send an `'after-attach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.AfterAttach);
        }
        // Post a fit request for the parent widget.
        this.parent.fit();
    };
    /**
     * Move a widget in the parent's DOM node.
     *
     * @param fromIndex - The previous index of the widget in the layout.
     *
     * @param toIndex - The current index of the widget in the layout.
     *
     * @param widget - The widget to move in the parent.
     *
     * #### Notes
     * This is a reimplementation of the superclass method.
     */
    BoxLayout.prototype.moveWidget = function (fromIndex, toIndex, widget) {
        // Move the layout item for the widget.
        algorithm_1.ArrayExt.move(this._items, fromIndex, toIndex);
        // Move the sizer for the widget.
        algorithm_1.ArrayExt.move(this._sizers, fromIndex, toIndex);
        // Post an update request for the parent widget.
        this.parent.update();
    };
    /**
     * Detach a widget from the parent's DOM node.
     *
     * @param index - The previous index of the widget in the layout.
     *
     * @param widget - The widget to detach from the parent.
     *
     * #### Notes
     * This is a reimplementation of the superclass method.
     */
    BoxLayout.prototype.detachWidget = function (index, widget) {
        // Remove the layout item for the widget.
        var item = algorithm_1.ArrayExt.removeAt(this._items, index);
        // Remove the sizer for the widget.
        algorithm_1.ArrayExt.removeAt(this._sizers, index);
        // Send a `'before-detach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.BeforeDetach);
        }
        // Remove the widget's node from the parent.
        this.parent.node.removeChild(widget.node);
        // Send an `'after-detach'` message if the parent is attached.
        if (this.parent.isAttached) {
            messaging_1.MessageLoop.sendMessage(widget, widget_1.Widget.Msg.AfterDetach);
        }
        // Dispose of the layout item.
        item.dispose();
        // Post a fit request for the parent widget.
        this.parent.fit();
    };
    /**
     * A message handler invoked on a `'before-show'` message.
     */
    BoxLayout.prototype.onBeforeShow = function (msg) {
        _super.prototype.onBeforeShow.call(this, msg);
        this.parent.update();
    };
    /**
     * A message handler invoked on a `'before-attach'` message.
     */
    BoxLayout.prototype.onBeforeAttach = function (msg) {
        _super.prototype.onBeforeAttach.call(this, msg);
        this.parent.fit();
    };
    /**
     * A message handler invoked on a `'child-shown'` message.
     */
    BoxLayout.prototype.onChildShown = function (msg) {
        this.parent.fit();
    };
    /**
     * A message handler invoked on a `'child-hidden'` message.
     */
    BoxLayout.prototype.onChildHidden = function (msg) {
        this.parent.fit();
    };
    /**
     * A message handler invoked on a `'resize'` message.
     */
    BoxLayout.prototype.onResize = function (msg) {
        if (this.parent.isVisible) {
            this._update(msg.width, msg.height);
        }
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    BoxLayout.prototype.onUpdateRequest = function (msg) {
        if (this.parent.isVisible) {
            this._update(-1, -1);
        }
    };
    /**
     * A message handler invoked on a `'fit-request'` message.
     */
    BoxLayout.prototype.onFitRequest = function (msg) {
        if (this.parent.isAttached) {
            this._fit();
        }
    };
    /**
     * Fit the layout to the total size required by the widgets.
     */
    BoxLayout.prototype._fit = function () {
        // Compute the visible item count.
        var nVisible = 0;
        for (var i = 0, n = this._items.length; i < n; ++i) {
            nVisible += +!this._items[i].isHidden;
        }
        // Update the fixed space for the visible items.
        this._fixed = this._spacing * Math.max(0, nVisible - 1);
        // Setup the computed minimum size.
        var horz = Private.isHorizontal(this._direction);
        var minW = horz ? this._fixed : 0;
        var minH = horz ? 0 : this._fixed;
        // Update the sizers and computed minimum size.
        for (var i = 0, n = this._items.length; i < n; ++i) {
            // Fetch the item and corresponding box sizer.
            var item = this._items[i];
            var sizer = this._sizers[i];
            // If the item is hidden, it should consume zero size.
            if (item.isHidden) {
                sizer.minSize = 0;
                sizer.maxSize = 0;
                continue;
            }
            // Update the size limits for the item.
            item.fit();
            // Update the size basis and stretch factor.
            sizer.sizeHint = BoxLayout.getSizeBasis(item.widget);
            sizer.stretch = BoxLayout.getStretch(item.widget);
            // Update the sizer limits and computed min size.
            if (horz) {
                sizer.minSize = item.minWidth;
                sizer.maxSize = item.maxWidth;
                minW += item.minWidth;
                minH = Math.max(minH, item.minHeight);
            }
            else {
                sizer.minSize = item.minHeight;
                sizer.maxSize = item.maxHeight;
                minH += item.minHeight;
                minW = Math.max(minW, item.minWidth);
            }
        }
        // Update the box sizing and add it to the computed min size.
        var box = this._box = domutils_1.ElementExt.boxSizing(this.parent.node);
        minW += box.horizontalSum;
        minH += box.verticalSum;
        // Update the parent's min size constraints.
        var style = this.parent.node.style;
        style.minWidth = minW + "px";
        style.minHeight = minH + "px";
        // Set the dirty flag to ensure only a single update occurs.
        this._dirty = true;
        // Notify the ancestor that it should fit immediately. This may
        // cause a resize of the parent, fulfilling the required update.
        if (this.parent.parent) {
            messaging_1.MessageLoop.sendMessage(this.parent.parent, widget_1.Widget.Msg.FitRequest);
        }
        // If the dirty flag is still set, the parent was not resized.
        // Trigger the required update on the parent widget immediately.
        if (this._dirty) {
            messaging_1.MessageLoop.sendMessage(this.parent, widget_1.Widget.Msg.UpdateRequest);
        }
    };
    /**
     * Update the layout position and size of the widgets.
     *
     * The parent offset dimensions should be `-1` if unknown.
     */
    BoxLayout.prototype._update = function (offsetWidth, offsetHeight) {
        // Clear the dirty flag to indicate the update occurred.
        this._dirty = false;
        // Compute the visible item count.
        var nVisible = 0;
        for (var i = 0, n = this._items.length; i < n; ++i) {
            nVisible += +!this._items[i].isHidden;
        }
        // Bail early if there are no visible items to layout.
        if (nVisible === 0) {
            return;
        }
        // Measure the parent if the offset dimensions are unknown.
        if (offsetWidth < 0) {
            offsetWidth = this.parent.node.offsetWidth;
        }
        if (offsetHeight < 0) {
            offsetHeight = this.parent.node.offsetHeight;
        }
        // Ensure the parent box sizing data is computed.
        if (!this._box) {
            this._box = domutils_1.ElementExt.boxSizing(this.parent.node);
        }
        // Compute the layout area adjusted for border and padding.
        var top = this._box.paddingTop;
        var left = this._box.paddingLeft;
        var width = offsetWidth - this._box.horizontalSum;
        var height = offsetHeight - this._box.verticalSum;
        // Distribute the layout space and adjust the start position.
        var delta;
        switch (this._direction) {
            case 'left-to-right':
                delta = boxengine_1.BoxEngine.calc(this._sizers, Math.max(0, width - this._fixed));
                break;
            case 'top-to-bottom':
                delta = boxengine_1.BoxEngine.calc(this._sizers, Math.max(0, height - this._fixed));
                break;
            case 'right-to-left':
                delta = boxengine_1.BoxEngine.calc(this._sizers, Math.max(0, width - this._fixed));
                left += width;
                break;
            case 'bottom-to-top':
                delta = boxengine_1.BoxEngine.calc(this._sizers, Math.max(0, height - this._fixed));
                top += height;
                break;
            default:
                throw 'unreachable';
        }
        // Setup the variables for justification and alignment offset.
        var extra = 0;
        var offset = 0;
        // Account for alignment if there is extra layout space.
        if (delta > 0) {
            switch (this._alignment) {
                case 'start':
                    break;
                case 'center':
                    extra = 0;
                    offset = delta / 2;
                    break;
                case 'end':
                    extra = 0;
                    offset = delta;
                    break;
                case 'justify':
                    extra = delta / nVisible;
                    offset = 0;
                    break;
                default:
                    throw 'unreachable';
            }
        }
        // Layout the items using the computed box sizes.
        for (var i = 0, n = this._items.length; i < n; ++i) {
            // Fetch the item.
            var item = this._items[i];
            // Ignore hidden items.
            if (item.isHidden) {
                continue;
            }
            // Fetch the computed size for the widget.
            var size = this._sizers[i].size;
            // Update the widget geometry and advance the relevant edge.
            switch (this._direction) {
                case 'left-to-right':
                    item.update(left + offset, top, size + extra, height);
                    left += size + extra + this._spacing;
                    break;
                case 'top-to-bottom':
                    item.update(left, top + offset, width, size + extra);
                    top += size + extra + this._spacing;
                    break;
                case 'right-to-left':
                    item.update(left - offset - size - extra, top, size + extra, height);
                    left -= size + extra + this._spacing;
                    break;
                case 'bottom-to-top':
                    item.update(left, top - offset - size - extra, width, size + extra);
                    top -= size + extra + this._spacing;
                    break;
                default:
                    throw 'unreachable';
            }
        }
    };
    return BoxLayout;
}(panellayout_1.PanelLayout));
exports.BoxLayout = BoxLayout;
/**
 * The namespace for the `BoxLayout` class statics.
 */
(function (BoxLayout) {
    /**
     * Get the box layout stretch factor for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The box layout stretch factor for the widget.
     */
    function getStretch(widget) {
        return Private.stretchProperty.get(widget);
    }
    BoxLayout.getStretch = getStretch;
    /**
     * Set the box layout stretch factor for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @param value - The value for the stretch factor.
     */
    function setStretch(widget, value) {
        Private.stretchProperty.set(widget, value);
    }
    BoxLayout.setStretch = setStretch;
    /**
     * Get the box layout size basis for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The box layout size basis for the widget.
     */
    function getSizeBasis(widget) {
        return Private.sizeBasisProperty.get(widget);
    }
    BoxLayout.getSizeBasis = getSizeBasis;
    /**
     * Set the box layout size basis for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @param value - The value for the size basis.
     */
    function setSizeBasis(widget, value) {
        Private.sizeBasisProperty.set(widget, value);
    }
    BoxLayout.setSizeBasis = setSizeBasis;
})(BoxLayout = exports.BoxLayout || (exports.BoxLayout = {}));
exports.BoxLayout = BoxLayout;
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * The property descriptor for a widget stretch factor.
     */
    Private.stretchProperty = new properties_1.AttachedProperty({
        name: 'stretch',
        create: function () { return 0; },
        coerce: function (owner, value) { return Math.max(0, Math.floor(value)); },
        changed: onChildSizingChanged
    });
    /**
     * The property descriptor for a widget size basis.
     */
    Private.sizeBasisProperty = new properties_1.AttachedProperty({
        name: 'sizeBasis',
        create: function () { return 0; },
        coerce: function (owner, value) { return Math.max(0, Math.floor(value)); },
        changed: onChildSizingChanged
    });
    /**
     * Test whether a direction has horizontal orientation.
     */
    function isHorizontal(dir) {
        return dir === 'left-to-right' || dir === 'right-to-left';
    }
    Private.isHorizontal = isHorizontal;
    /**
     * Clamp a spacing value to an integer >= 0.
     */
    function clampSpacing(value) {
        return Math.max(0, Math.floor(value));
    }
    Private.clampSpacing = clampSpacing;
    /**
     * The change handler for the attached sizing properties.
     */
    function onChildSizingChanged(child) {
        if (child.parent && child.parent.layout instanceof BoxLayout) {
            child.parent.fit();
        }
    }
})(Private || (Private = {}));

})
		], [
			/* @lumino/widgets: 66 */
			"lib/boxengine.js", ["cjs","js"], {}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A sizer object for use with the box engine layout functions.
 *
 * #### Notes
 * A box sizer holds the geometry information for an object along an
 * arbitrary layout orientation.
 *
 * For best performance, this class should be treated as a raw data
 * struct. It should not typically be subclassed.
 */
var BoxSizer = /** @class */ (function () {
    function BoxSizer() {
        /**
         * The preferred size for the sizer.
         *
         * #### Notes
         * The sizer will be given this initial size subject to its size
         * bounds. The sizer will not deviate from this size unless such
         * deviation is required to fit into the available layout space.
         *
         * There is no limit to this value, but it will be clamped to the
         * bounds defined by [[minSize]] and [[maxSize]].
         *
         * The default value is `0`.
         */
        this.sizeHint = 0;
        /**
         * The minimum size of the sizer.
         *
         * #### Notes
         * The sizer will never be sized less than this value, even if
         * it means the sizer will overflow the available layout space.
         *
         * It is assumed that this value lies in the range `[0, Infinity)`
         * and that it is `<=` to [[maxSize]]. Failure to adhere to this
         * constraint will yield undefined results.
         *
         * The default value is `0`.
         */
        this.minSize = 0;
        /**
         * The maximum size of the sizer.
         *
         * #### Notes
         * The sizer will never be sized greater than this value, even if
         * it means the sizer will underflow the available layout space.
         *
         * It is assumed that this value lies in the range `[0, Infinity]`
         * and that it is `>=` to [[minSize]]. Failure to adhere to this
         * constraint will yield undefined results.
         *
         * The default value is `Infinity`.
         */
        this.maxSize = Infinity;
        /**
         * The stretch factor for the sizer.
         *
         * #### Notes
         * This controls how much the sizer stretches relative to its sibling
         * sizers when layout space is distributed. A stretch factor of zero
         * is special and will cause the sizer to only be resized after all
         * other sizers with a stretch factor greater than zero have been
         * resized to their limits.
         *
         * It is assumed that this value is an integer that lies in the range
         * `[0, Infinity)`. Failure to adhere to this constraint will yield
         * undefined results.
         *
         * The default value is `1`.
         */
        this.stretch = 1;
        /**
         * The computed size of the sizer.
         *
         * #### Notes
         * This value is the output of a call to [[boxCalc]]. It represents
         * the computed size for the object along the layout orientation,
         * and will always lie in the range `[minSize, maxSize]`.
         *
         * This value is output only.
         *
         * Changing this value will have no effect.
         */
        this.size = 0;
        /**
         * An internal storage property for the layout algorithm.
         *
         * #### Notes
         * This value is used as temporary storage by the layout algorithm.
         *
         * Changing this value will have no effect.
         */
        this.done = false;
    }
    return BoxSizer;
}());
exports.BoxSizer = BoxSizer;
/**
 * The namespace for the box engine layout functions.
 */
var BoxEngine;
(function (BoxEngine) {
    /**
     * Calculate the optimal layout sizes for a sequence of box sizers.
     *
     * This distributes the available layout space among the box sizers
     * according to the following algorithm:
     *
     * 1. Initialize the sizers's size to its size hint and compute the
     *    sums for each of size hint, min size, and max size.
     *
     * 2. If the total size hint equals the available space, return.
     *
     * 3. If the available space is less than the total min size, set all
     *    sizers to their min size and return.
     *
     * 4. If the available space is greater than the total max size, set
     *    all sizers to their max size and return.
     *
     * 5. If the layout space is less than the total size hint, distribute
     *    the negative delta as follows:
     *
     *    a. Shrink each sizer with a stretch factor greater than zero by
     *       an amount proportional to the negative space and the sum of
     *       stretch factors. If the sizer reaches its min size, remove
     *       it and its stretch factor from the computation.
     *
     *    b. If after adjusting all stretch sizers there remains negative
     *       space, distribute the space equally among the sizers with a
     *       stretch factor of zero. If a sizer reaches its min size,
     *       remove it from the computation.
     *
     * 6. If the layout space is greater than the total size hint,
     *    distribute the positive delta as follows:
     *
     *    a. Expand each sizer with a stretch factor greater than zero by
     *       an amount proportional to the postive space and the sum of
     *       stretch factors. If the sizer reaches its max size, remove
     *       it and its stretch factor from the computation.
     *
     *    b. If after adjusting all stretch sizers there remains positive
     *       space, distribute the space equally among the sizers with a
     *       stretch factor of zero. If a sizer reaches its max size,
     *       remove it from the computation.
     *
     * 7. return
     *
     * @param sizers - The sizers for a particular layout line.
     *
     * @param space - The available layout space for the sizers.
     *
     * @returns The delta between the provided available space and the
     *   actual consumed space. This value will be zero if the sizers
     *   can be adjusted to fit, negative if the available space is too
     *   small, and positive if the available space is too large.
     *
     * #### Notes
     * The [[size]] of each sizer is updated with the computed size.
     *
     * This function can be called at any time to recompute the layout for
     * an existing sequence of sizers. The previously computed results will
     * have no effect on the new output. It is therefore not necessary to
     * create new sizer objects on each resize event.
     */
    function calc(sizers, space) {
        // Bail early if there is nothing to do.
        var count = sizers.length;
        if (count === 0) {
            return space;
        }
        // Setup the size and stretch counters.
        var totalMin = 0;
        var totalMax = 0;
        var totalSize = 0;
        var totalStretch = 0;
        var stretchCount = 0;
        // Setup the sizers and compute the totals.
        for (var i = 0; i < count; ++i) {
            var sizer = sizers[i];
            var min = sizer.minSize;
            var max = sizer.maxSize;
            var hint = sizer.sizeHint;
            sizer.done = false;
            sizer.size = Math.max(min, Math.min(hint, max));
            totalSize += sizer.size;
            totalMin += min;
            totalMax += max;
            if (sizer.stretch > 0) {
                totalStretch += sizer.stretch;
                stretchCount++;
            }
        }
        // If the space is equal to the total size, return early.
        if (space === totalSize) {
            return 0;
        }
        // If the space is less than the total min, minimize each sizer.
        if (space <= totalMin) {
            for (var i = 0; i < count; ++i) {
                var sizer = sizers[i];
                sizer.size = sizer.minSize;
            }
            return space - totalMin;
        }
        // If the space is greater than the total max, maximize each sizer.
        if (space >= totalMax) {
            for (var i = 0; i < count; ++i) {
                var sizer = sizers[i];
                sizer.size = sizer.maxSize;
            }
            return space - totalMax;
        }
        // The loops below perform sub-pixel precision sizing. A near zero
        // value is used for compares instead of zero to ensure that the
        // loop terminates when the subdivided space is reasonably small.
        var nearZero = 0.01;
        // A counter which is decremented each time a sizer is resized to
        // its limit. This ensures the loops terminate even if there is
        // space remaining to distribute.
        var notDoneCount = count;
        // Distribute negative delta space.
        if (space < totalSize) {
            // Shrink each stretchable sizer by an amount proportional to its
            // stretch factor. If a sizer reaches its min size it's marked as
            // done. The loop progresses in phases where each sizer is given
            // a chance to consume its fair share for the pass, regardless of
            // whether a sizer before it reached its limit. This continues
            // until the stretchable sizers or the free space is exhausted.
            var freeSpace = totalSize - space;
            while (stretchCount > 0 && freeSpace > nearZero) {
                var distSpace = freeSpace;
                var distStretch = totalStretch;
                for (var i = 0; i < count; ++i) {
                    var sizer = sizers[i];
                    if (sizer.done || sizer.stretch === 0) {
                        continue;
                    }
                    var amt = sizer.stretch * distSpace / distStretch;
                    if (sizer.size - amt <= sizer.minSize) {
                        freeSpace -= sizer.size - sizer.minSize;
                        totalStretch -= sizer.stretch;
                        sizer.size = sizer.minSize;
                        sizer.done = true;
                        notDoneCount--;
                        stretchCount--;
                    }
                    else {
                        freeSpace -= amt;
                        sizer.size -= amt;
                    }
                }
            }
            // Distribute any remaining space evenly among the non-stretchable
            // sizers. This progresses in phases in the same manner as above.
            while (notDoneCount > 0 && freeSpace > nearZero) {
                var amt = freeSpace / notDoneCount;
                for (var i = 0; i < count; ++i) {
                    var sizer = sizers[i];
                    if (sizer.done) {
                        continue;
                    }
                    if (sizer.size - amt <= sizer.minSize) {
                        freeSpace -= sizer.size - sizer.minSize;
                        sizer.size = sizer.minSize;
                        sizer.done = true;
                        notDoneCount--;
                    }
                    else {
                        freeSpace -= amt;
                        sizer.size -= amt;
                    }
                }
            }
        }
        // Distribute positive delta space.
        else {
            // Expand each stretchable sizer by an amount proportional to its
            // stretch factor. If a sizer reaches its max size it's marked as
            // done. The loop progresses in phases where each sizer is given
            // a chance to consume its fair share for the pass, regardless of
            // whether a sizer before it reached its limit. This continues
            // until the stretchable sizers or the free space is exhausted.
            var freeSpace = space - totalSize;
            while (stretchCount > 0 && freeSpace > nearZero) {
                var distSpace = freeSpace;
                var distStretch = totalStretch;
                for (var i = 0; i < count; ++i) {
                    var sizer = sizers[i];
                    if (sizer.done || sizer.stretch === 0) {
                        continue;
                    }
                    var amt = sizer.stretch * distSpace / distStretch;
                    if (sizer.size + amt >= sizer.maxSize) {
                        freeSpace -= sizer.maxSize - sizer.size;
                        totalStretch -= sizer.stretch;
                        sizer.size = sizer.maxSize;
                        sizer.done = true;
                        notDoneCount--;
                        stretchCount--;
                    }
                    else {
                        freeSpace -= amt;
                        sizer.size += amt;
                    }
                }
            }
            // Distribute any remaining space evenly among the non-stretchable
            // sizers. This progresses in phases in the same manner as above.
            while (notDoneCount > 0 && freeSpace > nearZero) {
                var amt = freeSpace / notDoneCount;
                for (var i = 0; i < count; ++i) {
                    var sizer = sizers[i];
                    if (sizer.done) {
                        continue;
                    }
                    if (sizer.size + amt >= sizer.maxSize) {
                        freeSpace -= sizer.maxSize - sizer.size;
                        sizer.size = sizer.maxSize;
                        sizer.done = true;
                        notDoneCount--;
                    }
                    else {
                        freeSpace -= amt;
                        sizer.size += amt;
                    }
                }
            }
        }
        // Indicate that the consumed space equals the available space.
        return 0;
    }
    BoxEngine.calc = calc;
    /**
     * Adjust a sizer by a delta and update its neighbors accordingly.
     *
     * @param sizers - The sizers which should be adjusted.
     *
     * @param index - The index of the sizer to grow.
     *
     * @param delta - The amount to adjust the sizer, positive or negative.
     *
     * #### Notes
     * This will adjust the indicated sizer by the specified amount, along
     * with the sizes of the appropriate neighbors, subject to the limits
     * specified by each of the sizers.
     *
     * This is useful when implementing box layouts where the boundaries
     * between the sizers are interactively adjustable by the user.
     */
    function adjust(sizers, index, delta) {
        // Bail early when there is nothing to do.
        if (sizers.length === 0 || delta === 0) {
            return;
        }
        // Dispatch to the proper implementation.
        if (delta > 0) {
            growSizer(sizers, index, delta);
        }
        else {
            shrinkSizer(sizers, index, -delta);
        }
    }
    BoxEngine.adjust = adjust;
    /**
     * Grow a sizer by a positive delta and adjust neighbors.
     */
    function growSizer(sizers, index, delta) {
        // Compute how much the items to the left can expand.
        var growLimit = 0;
        for (var i = 0; i <= index; ++i) {
            var sizer = sizers[i];
            growLimit += sizer.maxSize - sizer.size;
        }
        // Compute how much the items to the right can shrink.
        var shrinkLimit = 0;
        for (var i = index + 1, n = sizers.length; i < n; ++i) {
            var sizer = sizers[i];
            shrinkLimit += sizer.size - sizer.minSize;
        }
        // Clamp the delta adjustment to the limits.
        delta = Math.min(delta, growLimit, shrinkLimit);
        // Grow the sizers to the left by the delta.
        var grow = delta;
        for (var i = index; i >= 0 && grow > 0; --i) {
            var sizer = sizers[i];
            var limit = sizer.maxSize - sizer.size;
            if (limit >= grow) {
                sizer.sizeHint = sizer.size + grow;
                grow = 0;
            }
            else {
                sizer.sizeHint = sizer.size + limit;
                grow -= limit;
            }
        }
        // Shrink the sizers to the right by the delta.
        var shrink = delta;
        for (var i = index + 1, n = sizers.length; i < n && shrink > 0; ++i) {
            var sizer = sizers[i];
            var limit = sizer.size - sizer.minSize;
            if (limit >= shrink) {
                sizer.sizeHint = sizer.size - shrink;
                shrink = 0;
            }
            else {
                sizer.sizeHint = sizer.size - limit;
                shrink -= limit;
            }
        }
    }
    /**
     * Shrink a sizer by a positive delta and adjust neighbors.
     */
    function shrinkSizer(sizers, index, delta) {
        // Compute how much the items to the right can expand.
        var growLimit = 0;
        for (var i = index + 1, n = sizers.length; i < n; ++i) {
            var sizer = sizers[i];
            growLimit += sizer.maxSize - sizer.size;
        }
        // Compute how much the items to the left can shrink.
        var shrinkLimit = 0;
        for (var i = 0; i <= index; ++i) {
            var sizer = sizers[i];
            shrinkLimit += sizer.size - sizer.minSize;
        }
        // Clamp the delta adjustment to the limits.
        delta = Math.min(delta, growLimit, shrinkLimit);
        // Grow the sizers to the right by the delta.
        var grow = delta;
        for (var i = index + 1, n = sizers.length; i < n && grow > 0; ++i) {
            var sizer = sizers[i];
            var limit = sizer.maxSize - sizer.size;
            if (limit >= grow) {
                sizer.sizeHint = sizer.size + grow;
                grow = 0;
            }
            else {
                sizer.sizeHint = sizer.size + limit;
                grow -= limit;
            }
        }
        // Shrink the sizers to the left by the delta.
        var shrink = delta;
        for (var i = index; i >= 0 && shrink > 0; --i) {
            var sizer = sizers[i];
            var limit = sizer.size - sizer.minSize;
            if (limit >= shrink) {
                sizer.sizeHint = sizer.size - shrink;
                shrink = 0;
            }
            else {
                sizer.sizeHint = sizer.size - limit;
                shrink -= limit;
            }
        }
    }
})(BoxEngine = exports.BoxEngine || (exports.BoxEngine = {}));

})
		]
	]
}, {
	name: "_",
	files: [
		[
			/* _: 67 */
			"requirex", ["base"], {}, 
		], [
			/* _: 68 */
			"crypto", [], {}, null
		]
	]
}, {
	name: "lumino-minimal",
	version: "0.0.1",
	root: "../lumino-minimal",
	main: "index.js",
	files: [
		[
			/* lumino-minimal: 69 */
			"src/index.css", ["css"], {}, "body {\n\tdisplay: flex;\n\tflex-direction: column;\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\tmargin: 0;\n\tpadding: 0;\n\toverflow: hidden;\n\tbackground: #f0f0f0;\n}\n\n#main {\n\theight: 100%;\n\tpadding: 4px;\n}\n\n.dockpanel-cell {\n\tpadding: 8px;\n\tborder: 1px solid #c0c0c0;\n\tborder-top: none;\n\tbackground: #ffffff;\n\tbox-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);\n}\n\n.lm-DockPanel > .lm-Panel {\n\tpadding: 8px;\n\tborder: 1px solid #c0c0c0;\n\tborder-top: none;\n\tbackground: #ffffff;\n\tbox-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);\n}\n\n.lm-DockPanel > .lm-Panel > .lm-Widget {\n\tz-index: 0;\n\twidth: 100%;\n\theight: 100%;\n\tborder: 1px solid #808080;\n}\n"
		], [
			/* lumino-minimal: 70 */
			"src/App.tsx", ["cjs","js","ts"], {"./index.css": 69, "@lumino/default-theme/style/index.css": 29, "@lumino/widgets": 57, "lumino-tsx": 75}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
var lumino_tsx_1 = require("lumino-tsx");
var widgets = __importStar(require("@lumino/widgets"));
require("@lumino/default-theme/style/index.css");
require("./index.css");
var DockPanel = lumino_tsx_1.wrapTSX(widgets.DockPanel);
var Panel = lumino_tsx_1.wrapTSX(widgets.Panel);
var Widget = lumino_tsx_1.wrapTSX(widgets.Widget);
var app = lumino_tsx_1.jsx(DockPanel, { id: "main", spacing: 4 },
    lumino_tsx_1.jsx(lumino_tsx_1.Row, null,
        lumino_tsx_1.jsx(lumino_tsx_1.Col, { flex: 2 },
            lumino_tsx_1.jsx(Panel, { flex: 2, title: 'Green' },
                lumino_tsx_1.jsx(Widget, null,
                    lumino_tsx_1.jsx("div", { style: { background: '#27ae60' } }))),
            lumino_tsx_1.jsx(Panel, { title: 'Yellow' },
                lumino_tsx_1.jsx(Widget, null,
                    lumino_tsx_1.jsx("div", { style: { background: '#f1c40f' } })))),
        lumino_tsx_1.jsx(Panel, { flex: 2, title: 'Red' },
            lumino_tsx_1.jsx(Widget, null,
                lumino_tsx_1.jsx("div", { style: { background: '#e74c3c' } }))),
        lumino_tsx_1.jsx(Panel, { title: 'Blue' },
            lumino_tsx_1.jsx(Widget, null,
                lumino_tsx_1.jsx("div", { style: { background: '#3498db' } })))));
Widget.attach(app, document.body);
window.onresize = function () { return app.update(); };
})
		], [
			/* lumino-minimal: 71 */
			"index.html", ["cjs","js","html"], {"./dist/bundle.js": 72, "./src/App.tsx": 70}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
require("./src/App.tsx");
require("./dist/bundle.js");

})
		], [
			/* lumino-minimal: 72 */
			"dist/bundle.js", ["js"], {}, (function(process) {

})
		]
	]
}, {
	name: "lumino-tsx",
	version: "0.1.0",
	root: "node_modules/lumino-tsx",
	main: "dist/cjs/index.js",
	files: [
		[
			/* lumino-tsx: 73 */
			"dist/cjs/layout.js", ["cjs","js"], {"tslib": 76}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Col = exports.Row = exports.RowCol = void 0;
var tslib_1 = require("tslib");
var RowCol = /** @class */ (function () {
    function RowCol(attrs) {
    }
    RowCol.prototype.tsxChildren = function (children) {
        var sizes = [];
        children = (children || []).map(function (child, num) {
            var flex = child.flex;
            if (!flex && flex !== 0)
                flex = 1;
            sizes[num] = flex;
            return child.config || {
                type: 'tab-area',
                widgets: [child],
                currentIndex: 0
            };
        });
        this.config = {
            type: 'split-area',
            orientation: this.dir,
            children: children,
            sizes: sizes
        };
    };
    return RowCol;
}());
exports.RowCol = RowCol;
var Row = /** @class */ (function (_super) {
    tslib_1.__extends(Row, _super);
    function Row() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Row;
}(RowCol));
exports.Row = Row;
Row.prototype.dir = 'horizontal';
var Col = /** @class */ (function (_super) {
    tslib_1.__extends(Col, _super);
    function Col() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Col;
}(RowCol));
exports.Col = Col;
Col.prototype.dir = 'vertical';
})
		], [
			/* lumino-tsx: 74 */
			"dist/cjs/jsx.js", ["cjs","js"], {"@lumino/widgets": 57, "requirex": 67}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsx = exports.wrapTSX = void 0;
var widgets_1 = require("@lumino/widgets");
var requirex_1 = require("requirex");
function wrapTSX(constructor) {
    return constructor;
}
exports.wrapTSX = wrapTSX;
widgets_1.Widget.prototype.tsxChildren = function (children) {
    if (this.addWidget) {
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            if (child instanceof widgets_1.Widget) {
                this.addWidget(child);
            }
        }
    }
};
widgets_1.DockPanel.prototype.tsxChildren = function (children) {
    var config = children[0].config;
    if (config) {
        this.restoreLayout({ main: config });
    }
};
function jsx(kind, attrs) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    if (typeof kind == 'string') {
        // Handle HTML element.
        var doc = document;
        var element = doc.createElement(kind);
        for (var _a = 0, children_2 = children; _a < children_2.length; _a++) {
            var child = children_2[_a];
            if (typeof (child) != 'object') {
                child = doc.createTextNode(child);
            }
            if (child instanceof widgets_1.Widget) {
                widgets_1.Widget.attach(child, element);
            }
            else {
                element.appendChild(child);
            }
        }
        if (attrs) {
            var ref = attrs.ref;
            if (ref)
                delete attrs.ref;
            requirex_1.assign(element, attrs, 1);
            if (ref)
                ref(element);
        }
        return element;
    }
    else {
        // Handle Lumino widget.
        var child = children && children[0];
        if (child && !(child instanceof widgets_1.Widget)) {
            (attrs || (attrs = {})).node = child;
        }
        var widget = new kind(attrs || void 0);
        if (attrs) {
            if (attrs.className) {
                for (var _b = 0, _c = attrs.className.split(/\s+/); _b < _c.length; _b++) {
                    var name_1 = _c[_b];
                    if (name_1)
                        widget.addClass(name_1);
                }
            }
            if (attrs.flex)
                widget.flex = attrs.flex;
            if (attrs.id)
                widget.id = attrs.id;
            if (attrs.title)
                widget.title.label = attrs.title;
        }
        if (child && widget.tsxChildren)
            widget.tsxChildren(children);
        return widget;
    }
}
exports.jsx = jsx;
})
		], [
			/* lumino-tsx: 75 */
			"dist/cjs/index.js", ["cjs","js"], {"./jsx": 74, "./layout": 73}, (function(GLOBAL, __dirname, __filename, exports, global, module, process, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_1 = require("./jsx");
Object.defineProperty(exports, "jsx", { enumerable: true, get: function () { return jsx_1.jsx; } });
Object.defineProperty(exports, "wrapTSX", { enumerable: true, get: function () { return jsx_1.wrapTSX; } });
var layout_1 = require("./layout");
Object.defineProperty(exports, "Row", { enumerable: true, get: function () { return layout_1.Row; } });
Object.defineProperty(exports, "Col", { enumerable: true, get: function () { return layout_1.Col; } });
})
		]
	]
}, {
	name: "tslib",
	version: "2.0.0",
	root: "node_modules/tslib",
	main: "tslib.js",
	files: [
		[
			/* tslib: 76 */
			"tslib.js", ["amd","js"], {}, (function(GLOBAL, define, global, process, require) {
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global global, define, System, Reflect, Promise */
var __extends;
var __assign;
var __rest;
var __decorate;
var __param;
var __metadata;
var __awaiter;
var __generator;
var __exportStar;
var __values;
var __read;
var __spread;
var __spreadArrays;
var __await;
var __asyncGenerator;
var __asyncDelegator;
var __asyncValues;
var __makeTemplateObject;
var __importStar;
var __importDefault;
var __classPrivateFieldGet;
var __classPrivateFieldSet;
var __createBinding;
(function (factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function (exports) { factory(createExporter(root, createExporter(exports))); });
    }
    else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
    }
    else {
        factory(createExporter(root));
    }
    function createExporter(exports, previous) {
        if (exports !== root) {
            if (typeof Object.create === "function") {
                Object.defineProperty(exports, "__esModule", { value: true });
            }
            else {
                exports.__esModule = true;
            }
        }
        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
    }
})
(function (exporter) {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    __extends = function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    __rest = function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };

    __decorate = function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    __param = function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };

    __metadata = function (metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    };

    __awaiter = function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    __generator = function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };

    __exportStar = function(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
    };

    __createBinding = Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    });

    __values = function (o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };

    __read = function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };

    __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };

    __spreadArrays = function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    __await = function (v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };

    __asyncGenerator = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    };

    __asyncDelegator = function (o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    };

    __asyncValues = function (o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    };

    __makeTemplateObject = function (cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    var __setModuleDefault = Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    };

    __importStar = function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };

    __importDefault = function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };

    __classPrivateFieldGet = function (receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    };

    __classPrivateFieldSet = function (receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    };

    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate);
    exporter("__param", __param);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__createBinding", __createBinding);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__spreadArrays", __spreadArrays);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
    exporter("__makeTemplateObject", __makeTemplateObject);
    exporter("__importStar", __importStar);
    exporter("__importDefault", __importDefault);
    exporter("__classPrivateFieldGet", __classPrivateFieldGet);
    exporter("__classPrivateFieldSet", __classPrivateFieldSet);
});

})
		]
	]
}]);