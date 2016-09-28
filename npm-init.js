const fs = require('fs');

const content = `{ 
  "extends": "semistandard"
}`
fs.writeFileSync('.eslintrc.json', content);
fs.mkdirSync('test');

module.exports = {
  name: prompt('name', basename || package.name),
  version: '0.0.1',
  description: prompt(s => s),
  main: prompt('entry point', 'index.js', ep => fs.writeFileSync(ep, '')),
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
    url: 'git://github.com/USER/' + basename + '.git'
  },
  files: [
    'package.json',
    'README.md',
    'LICENSE',
    'index.js'
  ],
  bugs: {url: 'https://github.com/USER/' + basename + '/issues'},
  homepage: 'https://github.com/USER/' + basename,
  keywords: prompt(s => s.split(/\s+/)),
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
  },
  cleanup: function (cb) {
    cb(null, undefined);
  }
};
