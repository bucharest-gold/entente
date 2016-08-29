# Node.js Coding Guidelines

Here are some of the standards we have come up with over the months.

## Project Structure

We have a basic project structure in the
[automatic-pancake](https://github.com/bucharest-gold/automatic-pancake/)
repository. This repository represents our expectations for a very simple
Node.js project within JBoss. It includes a basic `package.json` illustrating
a standard set of build and test scripts, development dependencies, and a
minimum expected set of properties. Continue reading to find out more.

## Package properties

Even if you don't intend to publish your package in the global NPM repository,
it's always a good idea to include quality metadata in your `package.json` using
package properties. When you're starting a new project, you can use `npm init`
to get a good start on this.

## Build Tools

We use `make` in conjunction with `npm script` for all but the
most trivial projects. The `scripts` tag in `package.json` is very convenient
for running Node based jobs. Unit tests, for example are easily specified as

    "scripts": {
      "test": "tape test/unit/*.js"
    }

In this example, we are using `tape` for unit testing. If `tape` has been installed
in the local `node_modules` folder, then NPM will find it and run the executable.
This is exactly the kind of thing `npm run` is suited for.

But sometimes a build might need to perform multiple steps, which may be dependent
on one another. `Make` is very good at this kind of thing. For example, you might
want your CI job to execute an `npm install`, then run a code linter, execute a
code security check, run unit tests, start an integration test server, execute
integration tests, shut down the server, and finally issue a build report. Can
you imagine doing all of that with just `npm run`? Yikes! Use `make`. For most of
our projects, the `.travis.yml` (see below for CI recommendations) script specifies
the build script as simply `make ci` - nice and simple - a combination of `make`
dependencies, shell scripts and `npm run` commands do all of the heavy lifting.

## Project dependencies

When adding new dependencies to your project, it's always easiest to just use
the `--save` or `--save-dev` flags with the `npm install` command. This will automagically
add the module to your `package.json` file. For runtime dependencies, use `--save`, but
for test/build dependencies be sure to use `--save-dev`. This will ensure that your
package is as small as possible when others install it. You don't need your development
dependencies coming along for the ride.

    $ npm install --save-dev tape

## Testing

Use [`tape`](https://www.npmjs.com/package/tape). Lots of
[good reasons](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4#.rorhl92hb)
why. For us, the number one reason is the fact that `tape` eschews the usage of
global variables. You won't find functions like `describe` and `it` polluting
the global namespace.

`tape` is easy to use. Just add it to your `package.json` like so.

    "scripts": {
      "tests": "tape test/*.js"
    }

If you run `npm init` on a new project, as recommended, you might just get into the habit
of typing `tape test/*.js` when prompted.

You'll usually want to wire this up in your `Makefile` as well.

    test: lint
        npm test

## Code Style and Linting

We like semicolons. Embrace them! We use the
[`semistandard`](https://www.npmjs.com/package/semistandard) standard for code
styling. The best way we have found to accomplish this is to use the `semistandard`
plugins for `eslint` in our builds.

Install `eslint` and the `semistandard` and dependent plugins.

    $ npm install --save-dev eslint eslint-config-semistandard \
      eslint-config-standard eslint-plugin-promise eslint-plugin-react \
      eslint-plugin-standard

Add a lint script to your `package.json`

    "scripts": {
      "lint": "eslint index.js lib/*.js test/*.js",
      "test": "tape test/*.js"
    }

Add a `make` target

    test: lint
            npm test

    lint: node_modules
            npm run lint

    node_modules: package.json
            npm install

## Security

Use [`nsp`](https://www.npmjs.com/package/nsp) as part of your build. This package
is provided by http://nodesecurity.io and does a great job of scanning your code for
known security vulnerabilities. Add it to your `package.json` as a `prepublish` script
at a minimum. This will ensure that it runs before you publish a version of your module
to the global NPM repository.

    $ npm install --save-dev nsp

In your `package.json`

    "scripts": {
      "prepublish": "nsp check"
    }

## .gitignore

Be sure to add `node_modules` to your `.gitignore` file and check the file into
your git repository so you don't end up with stray files in your repository.

## Continuous integration

Use [Travis CI](https://travis-ci.org). Don't be afraid to test on multiple Node versions.
A typical `.travis.yml` file might look something like this.

    language: node_js
    node_js:
      - "4"
      - "5"
      - "6"
    script:
      - make ci
    notifications:
      irc: "chat.freenode.net#brass-monkey"
