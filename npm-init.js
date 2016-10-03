/**
 * NPM initialization script
 */

const fs = require('fs');
const execSync = require('child_process').execSync;

const gitUser = execSync('git config user.name').toString().replace('\n','');
let user = gitUser || 'USER';

function createLicense () {
  const LICENSE =`
Copyright 2016 Red Hat, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
`
  fs.writeFileSync('LICENSE', LICENSE);
}

if (!exists('LICENSE')) {
  createLicense();
}

if (!exists('.eslintrc.json')) {
  fs.writeFileSync('.eslintrc.json', `{
  "extends": "semistandard"
}`);
}

if (!exists('test')) {
  fs.mkdirSync('test');
}

const baseData = {
  name: basename || package.name,
  version: '0.0.1',
  main: 'index.js',
  author: 'Red Hat, Inc.',
  license: 'Apache-2.0',
  scripts: {
    test: 'tape test/*.js | tap-spec',
    lint: 'eslint test/*.js index.js',
    prepublish: 'nsp check',
    coverage: 'istanbul cover tape test/*.js'
  },
  repository: {
    type: 'git',
    url: `git://github.com/${user}/${basename}.git`
  },
  files: [
    'package.json',
    'README.md',
    'LICENSE',
    'index.js'
  ],
  bugs: {url: `https://github.com/${user}/${basename}/issues`},
  homepage: `https://github.com/${user}/${basename}`,
  devDependencies: {
    eslint: '*',
    'eslint-config-semistandard': '*',
    'eslint-config-standard': '*',
    'eslint-plugin-promise': '*',
    'eslint-plugin-react': '*',
    'eslint-plugin-standard': '*',
    istanbul: '*',
    nsp: '*',
    'tap-spec': '*',
    tape: '*'
  }
};

let customizedData = {};
Object.assign(customizedData, baseData);

customizedData.gitHubUser = prompt('GitHub user name', user, n => user = n);
customizedData.name = prompt('name', basename || package.name);
customizedData.description = prompt(s => s);
customizedData.main = prompt('entry point', 'index.js',
  ep => !exists(ep) && fs.writeFileSync(ep, 'module.exports = exports = {};\n\n' ));
customizedData.keywords = prompt('Enter keywords separated by a space', s => s.split(/\s+/));

Object.defineProperties(customizedData, {
  repository: {
    get: () => {
      return {
        type: 'git',
        url: `git://github.com/${user}/${basename}.git`
      };
    }
  },
  bugs: {
    get: () => {
      return {url: `https://github.com/${user}/${basename}/issues`};
    }
  },
  homepage: {
    get: () => `https://github.com/${user}/${basename}`
  }
});

if (yes) {
  console.log('Assuming all defaults.');
  module.exports = baseData;
} else {
  module.exports = customizedData;
}

function exists (name) {
  try {
    fs.statSync(name);
    return true;
  } catch (e) {
    return false;
  }
}
