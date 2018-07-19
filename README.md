# eslint-config-mingelz

[![Version](https://img.shields.io/npm/v/eslint-config-mingelz.svg?style=flat)](https://www.npmjs.com/package/eslint-config-mingelz)

A shared [ESLint](https://eslint.org) configuration with Chinese comments by mingelz.

一份带有完整中文注释的 ESLint 规则。请打开 [rules](./rules) 目录下的文件，阅读每个规则的详细说明。

## Quick start

### Installation

```sh
npm install eslint-config-mingelz --save-dev
```

### Configure

Add a `.eslintrc.js` file with following content to your project root directory:

```js
module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'mingelz',
  ],
}
```

## Documentation

### Basic configuration

```js
module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'mingelz',
  ],
  rules: {
    // your special rules
  },
}
```

### Vue configuration

**NOTICE**:
This configuration is dependent on [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)@^4.7,
and it is not added to `peerDependencies`,
please install it manully first: `npm install -D eslint-plugin-vue`

```js
module.exports = {
  // ...
  extends: [
    'mingelz',
    'mingelz/rules/vue',
  ],
  // ...
}
```

### React configuration

**NOTICE**:
This configuration is dependent on [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)@^7.10,
and it is not added to `peerDependencies`,
please install it manully first: `npm install -D eslint-plugin-react`

```js
module.exports = {
  // ...
  extends: [
    'mingelz',
    'mingelz/rules/react',
  ],
  // ...
}
```

### Node.js configuration

**NOTICE**:
This configuration is dependent on [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node)@^7.0,
and it is not added to `peerDependencies`,
please install it manully first: `npm install -D eslint-plugin-node`

```js
module.exports = {
  // ...
  extends: [
    'mingelz',
    'mingelz/rules/node',
  ],
  // ...
}
```

### *[WIP]* ES Module configuration

**NOTICE**:
This configuration is dependent on [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import),
and it is not added to `peerDependencies`,
please install it manully first: `npm install -D eslint-plugin-import`

```js
module.exports = {
  // ...
  extends: [
    'mingelz',
    'mingelz/rules/esmodule',
  ],
  // ...
}
```

### *[WIP]* JSX accessibility configuration

**NOTICE**:
This configuration is dependent on [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y),
and it is not added to `peerDependencies`,
please install it manully first: `npm install -D eslint-plugin-jsx-a11y`

```js
module.exports = {
  // ...
  extends: [
    'mingelz',
    'mingelz/rules/jsx-a11y',
  ],
  // ...
}
```
