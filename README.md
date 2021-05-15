# eslint-config-mingelz

[![Version](https://img.shields.io/npm/v/eslint-config-mingelz.svg?style=flat)](https://www.npmjs.com/package/eslint-config-mingelz)

A shared [ESLint](https://eslint.org) configuration with Chinese comments by mingelz.

一份带有完整中文注释的 ESLint 规则。请打开 [rules](./rules) 目录下的文件，阅读每个规则的详细说明。

---

* [Quick start | 快速开始](#quick-start)
  * [Installation | 安装](#installation)
  * [Configure | 配置](#configure)
* [Documentation | 文档](#documentation)
  * [Basic configuration | 基本配置](#basic-configuration)
  * [Vue configuration | Vue 配置](#vue-configuration)
  * [React configuration | React 配置](#react-configuration)
  * [Node.js configuration | Node.js 配置](#nodejs-configuration)
  * [ES Module configuration | ES Module 配置](#es-module-configuration)
  * [JSDoc configuration | JSDoc 配置](#jsdoc-configuration)
  * [*[WIP]* JSX accessibility configuration | *[未完成]* JSX 无障碍配置](#wip-jsx-accessibility-configuration)

## Quick start | 快速开始

### Installation | 安装

```sh
npm install eslint-config-mingelz --save-dev
```

### Configure | 配置

Add a `.eslintrc.js` file with following content to your project root directory: <br>
在项目根目录下新建 `.eslingrc.js` 文件，并写入下列内容：

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

## Documentation | 文档

### Basic configuration | 基本配置

**NOTICE**:
This configuration is dependent on [eslint](https://eslint.org)@^7.24,
please install it manually: `npm install -D eslint`. <br>
**注意**：
此配置依赖 [eslint](https://eslint.org)@^7.24，请先手动安装此依赖： `npm install -D eslint`。

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
    // 你的需要补充的规则
  },
}
```

### Vue configuration | Vue 配置

**NOTICE**:
This configuration is dependent on [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)@^7.7,
please install it manually: `npm install -D eslint-plugin-vue`. <br>
**注意**：
此配置依赖 [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)@^7.7，请先手动安装此依赖： `npm install -D eslint-plugin-vue`。

```js
module.exports = {
  // ...
  extends: [
    'mingelz',
    // The configuration will detect Vue.js version of your project automatic.
    // 此配置会自动检查你使用的 Vue.js 版本，并开启相应规则
    'mingelz/rules/vue',
  ],
  // ...
}
```

### React configuration | React 配置

**NOTICE**:
This configuration is dependent on [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)@^7.22,
please install it manually: `npm install -D eslint-plugin-react` <br>
**注意**：
此配置依赖 [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)@^7.22，请先手动安装此依赖： `npm install -D eslint-plugin-react`。

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

### Node.js configuration | Node.js 配置

[The ESLint built-in Node.js/CommonJS-specific rules are deprecating](https://eslint.org/blog/2020/02/whats-coming-in-eslint-7.0.0#deprecating-node-js-commonjs-specific-rules), use *eslint-plugin-node* instead. <br>
[ESLint 自带的 Node.js/CommonJS 规则已废弃](https://eslint.org/blog/2020/02/whats-coming-in-eslint-7.0.0#deprecating-node-js-commonjs-specific-rules)，请使用 *eslint-plugin-node* 替代。

**NOTICE**:
This configuration is dependent on [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node)@^11.1,
please install it manually: `npm install -D eslint-plugin-node` <br>
**注意**：
此配置依赖 [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node)@^11.1，请先手动安装此依赖： `npm install -D eslint-plugin-node`。

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

### ES Module configuration | ES Module 配置

**NOTICE**:
This configuration is dependent on [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)@^2.23,
please install it manually: `npm install -D eslint-plugin-import` <br>
**注意**：
此配置依赖 [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)@^2.23，请先手动安装此依赖： `npm install -D eslint-plugin-import`。

If you are using Webpack [resolve.alias](https://webpack.js.org/configuration/resolve/#resolvealias),
it is recommended to install [eslint-import-resolver-webpack](https://www.npmjs.com/package/eslint-import-resolver-webpack) via `npm install -D eslint-import-resolver-webpack`,
and configure it according to the webpack configuration file. <br>
如果你正在使用 Webpack 的 [resolve.alias](https://webpack.js.org/configuration/resolve/#resolvealias) 能力，建议通过命令 `npm install -D eslint-import-resolver-webpack` 安装 [eslint-import-resolver-webpack](https://www.npmjs.com/package/eslint-import-resolver-webpack) 插件，并参照下述代码正确配置你的 Webpack 配置文件路径。

```js
module.exports = {
  // ...
  extends: [
    'mingelz',
    'mingelz/rules/es-module',
  ],
  settings: {
    'import/resolver': {
      // webpack config example
      // webpack 配置示例
      webpack: {
        config: './webpack.config.js',
      },
    },
  },
  // ...
}
```

### JSDoc configuration | JSDoc 配置

[The ESLint built-in JSDoc rules was deprecated](https://eslint.org/blog/2018/11/jsdoc-end-of-life), use *eslint-plugin-jsdoc* instead.<br>
[ESLint 自带的 JSDoc 规则已废弃](https://eslint.org/blog/2018/11/jsdoc-end-of-life)，请使用 *eslint-plugin-jsdoc* 替代。

**NOTICE**:
This configuration is dependent on [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc)@32.2,
please install it manually: `npm install -D eslint-plugin-jsdoc`<br>
**注意**：
此配置依赖 [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc)@^32.2，请先手动安装此依赖： `npm install -D eslint-plugin-jsdoc`。

```js
module.exports = {
  // ...
  extends: [
    'mingelz',
    'mingelz/rules/jsdoc',
  ],
  // ...
}
```

### *[WIP]* JSX accessibility configuration | *[未完成]* JSX 无障碍配置

**NOTICE**:
This configuration is dependent on [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y),
please install it manually: `npm install -D eslint-plugin-jsx-a11y`<br>
**注意**：
此配置依赖 [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)，请先手动安装此依赖： `npm install -D eslint-plugin-jsx-a11y`。

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
