// NPM initialization script.

var fs = require('fs');
var execSync = require('child_process').execSync;

var gitUser = execSync('git config user.name').toString().replace('\n','');
var user = gitConfigUser() || gitUser || 'USER';

function createLicense () {
  var LICENSE =`
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

var baseData = {
  name: basename || package.name,
  version: '0.0.1',
  main: 'index.js',
  author: 'Red Hat, Inc.',
  license: 'Apache-2.0',
  scripts: {
    test: 'tape test/*.js | tap-spec',
    lint: 'eslint test/*.js index.js',
    prepublish: 'nsp check',
    coverage: 'istanbul cover tape test/*.js',
    dependencyCheck: 'szero . --ci',
    release: 'standard-version'
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
    eslint: '~3.8.1',
    'eslint-config-semistandard': '~7.0.0',
    'eslint-config-standard': '~6.2.0',
    'eslint-plugin-promise': '~3.3.0',
    'eslint-plugin-react': '~6.4.1',
    'eslint-plugin-standard': '~2.0.1',
    istanbul: '~0.4.5',
    nsp: '~2.6.2',
    'tap-spec': '~4.1.1',
    tape: '~4.6.2',
    'szero': '^0.5.1',
    'standard-version': '^3.0.0'
  }
};

var customizedData = {};
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

function gitConfigUser () {
  var user = '';
  if (exists('.git/config')) {
    var content = fs.readFileSync('.git/config').toString().split('\n');
    var remoteFound = false;
    for (var i = 0; i < content.length; i++) {
      if (content[i] === '[remote "origin"]') {
        remoteFound = true;
        break;
      }
    }
    if (remoteFound) {
      for (var i = 0; i < content.length; i++) {
        if (content[i] === '[remote "origin"]') {
          user = content[++i].split(':')[1].split('/')[0];
          break;
        }
      }
    }
  }
  return user;
}

var needInstall = true;
for (var i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === '--no-install' || process.argv[i] === '-n') {
    needInstall = false;
    break;
  }
}

if (needInstall) {
  process.on('exit', () => {
    require('child_process').spawnSync('npm', ['install'])
  });
}
