# Node.js Project Guidelines

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

We recommend the following properties for all packages.

* All of the standard properties that are created when you run `npm init`.
  * `name` : The name of your package. Typically we recommend against using
    package names that include the words 'node', 'nodejs' or 'javascript',
    since it's pretty obvious what we're dealing with, given that
    it's an NPM pacakge.
  * `version` : Use sematic versioning. `Major.minor.patch`
  * `description` : A brief description of the package
  * `main` : The entry point for the application.
  * `scripts` : Here you specify the various build scripts that can be run. We
    typically use `test`, `lint`, `coverage`, `docs`, and `prepublish`.
    See below for recommendations on each of these tools.
  * `author` : In the form `"V. Van Gogh <vvangogh@redhat.com> (https://oh.myear.com)"`
  * `license` : We typically use Apache-2.0
* Sometimes `author` doesn't make sense, because, well, it's all collaborative, right?
  In that case, be sure to use the `contributors` property, which is just an array of
  strings formatted just like those for the `author` property.
* The `files` property is useful for keeping your distribution clean and free of detritus
* The `keywords` property is really important for searches on npmjs.com - so use it!
* Always be sure to include a `repository` property to encourage community involvement.
  this property is linked from the package page on npmjs.com.
* Finally, be sure to keep your runtime and development dependencies separated. This
  will keep your package distribution down to a reasonable size. Use `dependencies`
  for everything that is needed at runtime, and `devDependencies` for those packages
  you depend on only during builds or for CI.

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

First, add an `.eslintrc.json` file to your project and put this in there.

    {
      "extends": "semistandard",

      "rules": {
        "prefer-const": "error",
        "block-scoped-var": "error",
        "no-use-before-define": ["error", "nofunc"],
      }
    }

Then install `eslint` and the `semistandard` and dependent plugins.

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

### Some things linting will catch

Unused variables, proper casing of function and variable names, undeclared global variables,
modification of global variables, missing semi-colons. Catching unused variables is great
because this might alert you to a typo in your code. Modifying global variables could have
adverse affects on other code within your system, including dependencies, if the other code
is not aware of the modifications. For these and many other reasons, we think linting is a
'good thing'.

### Some things linting _won't_ catch, but that you should consider

At this point, we eschew any Node.js version below 4.x. This means, that usage of ES6
features is possible. And there are some good features to take advatage of. Here are
some of our recommendations.

* Use promises for asynchronous code execution, where appropriate. (Consider using
  bucharest-gold/fidelity).
* Use the new ES6 `class` keyword to create classes, and avoid direct manipulation
  of prototypes.
* Use `Symbol`s to keep private data private. There are a few ways to achieve data privacy
  in Javascript. We've found that using a `Symbol` as a key is the most performant.
  See: http://www.2ality.com/2016/01/private-data-classes.html
* Eliminate or minimize the use of `this`. A given function may execute with a `this`
  context that is different than what is expected, E.g. `myFunc.apply(undefined);`.

Here is an example usage the above techniques to implement a class in ES6.

```javascript
const LENGTH = Symbol('length');
const WIDTH  = Symbol('width');

// A simple ES6 class
class Rectangle {
  // Use the Symbols for property keys. They are private to the module, so users
  // don't have access to the property via `myRectangle[LENGTH]`. Instead, a
  // getter is used (see below)
  constructor (length, width) {
    this[LENGTH] = length;
    this[WIDTH] = width;
  }

  // The `this` object cannot be modified with a getter
  // so using `this[LENGTH]` here is safe.
  get length () {
    return this[LENGTH];
  }

  // Same as above. Use a getter for object properties.
  get width () {
    return this[WIDTH];
  }
}

// Our preference is to use standalone functions rather than object methods.
// This avoids the (possibly dangerous) use of the `this` keyword.
function area (rectangle) {
  return rectangle.length * rectangle.width;
}

```

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

## Release process

Publishing packages to NPM usually just means running `$ npm publish` on the
command line. But we like to have a little process around that. Some notes on
our process follow.

* Always add `nsp` to your project as a `prepublish` property in `scripts`. This will ensure
   that you can't publish your project if there are known security vulnerabilities.
* Ensure that `master` (or whatever release branch you use) passes a build on CI.

We've recently switched to
[conventional-changelog](https://github.com/conventional-changelog/standard-version)
for our release process and it's pretty darn nice. If you created your project
using our npm-init.js template, then what you need is already installed with your
project. Otherwise, install `standard-version`.

    $ npm install --save-dev standard-version

Add a line to the `scripts` section of your `package.json` like this.

    "release": "standard-version"

For this to really be useful, you'll want to ensure all of the commit messages on
your master branch follow the
[conventional-changelog standard-conventions](https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md).
These conventions are pretty straightforward. The main thing to remember is to always
prefix your commit messages with one of `fix:`, `feat:` or `perf:`. Other, optional
prefixes are fine as well, e.g. `docs`.

When merging commits from a pull request, be sure to use the "Squash and Merge" option
in the GitHub user interface so you can ensure that the merged commit messages are
formatted appropriately.

Assuming your local master branch is up to date, the next steps are.

1. Run standard-version: `npm run standard-version`
2. Push to GitHub: `git push --follow-tags origin master`
3. Publish to npmjs.com: `npm publish`
4. Assuming all goes well, head over to your project on github and update the
   release with any relevant notes. Using the generated CHANGELOG.md file
   to document release changes is nice. Here is a simple example:
   [Opossum v0.1.0](https://github.com/bucharest-gold/opossum/releases/tag/v0.1.0)
5. Tweet, blog and otherwise promote your awesome success!
