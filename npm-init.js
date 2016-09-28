const fs = require('fs');
const execSync = require('child_process').execSync;

const gitUser = execSync('git config user.name').toString().replace('\n','');
const user = gitUser || 'USER';

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

createLicense();

const content = `{ 
  "extends": "semistandard"
}`
fs.writeFileSync('.eslintrc.json', content);
fs.mkdirSync('test');

module.exports = {
  name: prompt('name', basename || package.name),
  version: '0.0.1',
  description: prompt(s => s),
  main: prompt('entry point', 'index.js', ep => fs.writeFileSync(ep, 'module.exports = exports = {};\n\n')),
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
  keywords: prompt('Enter keywords separated by a space', s => s.split(/\s+/)),
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
