# Node.js code recommendations

Here are some of the recommendations we have come up based on [perf-quest](https://github.com/bucharest-gold/perf-quest).

This document is a output of this [issue](https://github.com/bucharest-gold/entente/issues/9)

It is always interesting to read about what we should or should not do related to performance. 
Doing so based on test results is even better.

## Results

- Give preference to the use of ES6 classes.
  We have 4 tests related with ES6 classes, and they always win.
  - [Class and Classless](https://github.com/bucharest-gold/perf-quest/tree/master/class-classless/#readme)
  - [Class and 'UnfrozenClassless'](https://github.com/bucharest-gold/perf-quest/tree/master/class-unfrozenclassless/#readme)
  - [Class and module](https://github.com/bucharest-gold/perf-quest/tree/master/class-module/#readme)
  - [Class and prototype](https://github.com/bucharest-gold/perf-quest/tree/master/class-prototype/#readme)

- Avoid `forEach`
  - [forEach and for](https://github.com/bucharest-gold/perf-quest/tree/master/foreach-for#readme)

- Avoid the creation of extra hidden classes
  - [Hidden classes](https://github.com/bucharest-gold/perf-quest/tree/master/hidden_class-no_extra_hidden_class#readme)

- Filter the array 'by hand' instead `array.filter`
  - [Array filter](https://github.com/bucharest-gold/perf-quest/tree/master/filter-filter_by_hand#readme) 

- Map the array 'by hand' instead `array.map`
  - [Array map](https://github.com/bucharest-gold/perf-quest/tree/master/map-map_by_hand#readme)

- Use `array.reduce` instead do it 'by hand'
  - [Array reduce](https://github.com/bucharest-gold/perf-quest/tree/master/reduce-reduce_by_hand#readme) 

## How to contribute

- Clone [perf-quest](https://github.com/bucharest-gold/perf-quest)
- Create a new issue
- Follow the [readme](https://github.com/bucharest-gold/perf-quest#how-to-push-a-test-case)

## Sources used to make the tests

Our current plan on this issue is to write test cases to get results based on:
1. Our doubts and project needs.
2. Try to cover affirmations like 'Don't do X, don't do Y' found in videos and blogs.
example: "Don't use prototypes because this has a bad performance"

- [http://debuggable.com/posts/understanding-hidden-classes-in-v8:4c7e81e4-1330-4398-8bd2-761bcbdd56cb](http://debuggable.com/posts/understanding-hidden-classes-in-v8:4c7e81e4-1330-4398-8bd2-761bcbdd56cb)
- [https://www.smashingmagazine.com/2012/11/writing-fast-memory-efficient-javascript/](https://www.smashingmagazine.com/2012/11/writing-fast-memory-efficient-javascript/)
- [https://gist.github.com/twokul/9501770](https://gist.github.com/twokul/9501770)
- [https://www.html5rocks.com/en/tutorials/speed/v8/](https://www.html5rocks.com/en/tutorials/speed/v8/)
- [https://coderwall.com/p/kvzbpa/don-t-use-array-foreach-use-for-instead](https://coderwall.com/p/kvzbpa/don-t-use-array-foreach-use-for-instead)
- [https://www.youtube.com/watch?v=UJPdhx5zTaw](https://www.youtube.com/watch?v=UJPdhx5zTaw)