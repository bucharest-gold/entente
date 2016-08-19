# Node.js Coding Guidelines

Here are some of the standards we have come up with over the months.

## Project Structure

We have a basic project structure in the
[automatic-pancake](https://github.com/bucharest-gold/automatic-pancake/)
repository.

## Build Tools

We use `make` in conjunction with `npm script` for all but the
most trivial projects.

## Code Style and Linting

We like semicolons. Embrace them! Projects should include
[`semistandard`](https://www.npmjs.com/package/semistandard) for code styling.

## Security

Use [`nsp`](https://www.npmjs.com/package/nsp) as part of your build.

## Testing

Use [`tape`](https://www.npmjs.com/package/tape). Lots of
[good reasons](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4#.rorhl92hb)
why.

## Continuous integration

Use [Travis CI](https://travis-ci.org).
