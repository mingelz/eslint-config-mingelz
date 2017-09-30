# eslint-config-mingelz

[![Version](https://img.shields.io/npm/v/eslint-config-mingelz.svg?style=flat)](https://www.npmjs.com/package/eslint-config-mingelz)

A shared ESLint configuration with Chinese comments by mingelz.

请打开 [rules](./rules) 目录下的文件，阅读每个规则的详细说明。

## Quick start

### Installation

```sh
npm install eslint-config-mingelz --save-dev
```

### Configure

Add a `.eslintrc.js` file with following content to your project root directory:

```js
module.exports = {
  "extends": [
    "mingelz",
  ],
}
```

## Documentation

### Basic configuration

```js
module.exports = {
  "env": {
    "browser": true,
    "node": true,
  },
  "extends": [
    "mingelz",
  ],
  "rules": {
    // your special rules
  },
}
```

### Vue configuration

Please install **eslint-plugin-vue** first: `npm install -D eslint-plugin-vue`

```js
module.exports = {
  // ...
  "extends": [
    "mingelz",
    "mingelz/rules/vue",
  ],
  // ...
}
```

### React configuration

Please install **eslint-plugin-react** first: `npm install -D eslint-plugin-react`

```js
module.exports = {
  // ...
  "extends": [
    "mingelz",
    "mingelz/rules/react",
  ],
  // ...
}
```