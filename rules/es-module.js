/**
 * @file ES Module (import, export) 相关的配置
 * @desc 此配置依赖 ESLint 插件: eslint-plugin-import@2.22
 * @see [eslint-plugin-import]{@link https://github.com/benmosher/eslint-plugin-import}
 */

module.exports = {
  "plugins": [
    "import",
  ],

  // 此插件都是基于 ES6 Module 的，所以额外确认以下配置项
  "env": {
    "es6": true,
  },

  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
  },

  "settings": {
    // 需要传给插件的参数
    "import": {
      // 可以引用哪些后缀的文件，当配置了 resolver 时，会优先取 resolver 的配置
      "extensions": [
        ".js",
        ".jsx",
        ".mjs",
        ".vue",
      ],
      // 忽略哪些类型的文件引用，每项是一个正则字符串
      "ignore": [
        "node_modules",
        "\\.(scss|less|css)$",
      ],
      // 定义核心模块，比如 Node.js 中的 `fs` 模块是不需要写路径就可以引用到的，当然 Node.js 内部模块无需在这里定义
      // 再比如 `electron` ，在 Node.js 之外，可以直接引来用的，就需要写明了
      "core-modules": [],
      // 额外的包引入地址，默认是 node_modules，可以额外添加如 bower_components 或 jspm_modules 等
      "external-module-folders": [
        "node_modules",
      ],
      // 指定由某个 parser 来处理特定的文件格式
      "parsers": {
        // 如使用 @typescript-eslint/parser 来处理 .ts/.tsx 文件
        // "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      // 对于特殊路径的解析支持。比如 Webpack 支持如 `import foo from '@/foo'` 形式的引入，它不是 Node.js 的一部分，需要指定特别的解析工具
      // @see [externals](http://webpack.github.io/docs/library-and-externals.html)
      "resolver": {
        // key 为对应的解析工具（NPM包），value 为此工具的配置项。key 有三种形式
        // 1. 一个字符串，比如 `foo`，会优先匹配 `eslint-import-resolver-foo` 包，如果没有则把 `foo` 当作完整包名查找
        // "foo": {},
        // 2. 路径地址，以 package.json 文件或当前执行路径（没有 package.json 时）为基础
        // [path.resolve("../my-resolver")]: {},

        // eslint-import-resolver-node 是与 Node.js 一致的路径解析
        "node": {
          "extensions": [
            ".js",
            ".jsx",
            ".mjs",
            ".vue",
          ],
        },

        // eslint-import-resolver-webpack 是支持 Webpack 配置文件的路径解析
        "webpack": {
          // 指定 Webpack 配置文件
          "config": "webpack.config.js",
          // 配置文件依赖的 env
          "env": {
            "NODE_ENV": "production",
          },
        },
      },
      // 设置缓存，主要是给 eslint_d 和 eslint-loader 用的
      // "cache": {
      //   // 默认值 30，一般设置为 Infinity 也是 OK 的
      //   "lifetime": 30,
      // },
      // 设置内部路径正则，比如使用 lerna 维护多个模块时，模块间是内部引用，此时可以用此项配置
      // "internal-regex": "",
      // 允许的文档注释格式
      "docstyle": ["jsdoc", "tomdoc"],
    },
  },

  "rules": {
    /**
     * Static analysis
     */

    // 检查所有 import 的文件，都可以被 `require.resolve` 方法或 settings 中的 resolver 检索到
    "import/no-unresolved": [2,
      {
        // 是否支持 CommonJS 的引用形式，即 `require('foo')`
        "commonjs": true,
        // 是否支持 AMD 的引用形式，即 `define(['foo'], function (foo) {})` 或 `require(['foo'], function (foo) {})`
        "amd": false,
        // 要忽略的路径，这类路径不再检查路径有效性
        // "ignore": [],
        // 路径是否大小写敏感
        "caseSensitive": true,
      },
    ],

    // 检查具名引用都能够匹配对应的导出项，如 `import { foo } from './foo'`
    "import/named": 2,

    // 检查默认引用都能够匹配对应的导出项。如 `import foo from './foo'`
    // 注意 `module.exports = xxx` 并不会被认为是 `default` 导出
    "import/default": 0,

    // 检查命名空间引用都能够匹配对应的导出项，如 `import * as foo from './foo'`
    "import/namespace": [0,
      {
        // 是否允许计算属性，如 `import * as foo from './foo'; function (x) { return foo[x] }`
        "allowComputed": false,
      },
    ],

    // 不允许从特定路径引入文件，比如 Web 开发时，客户端的代码中不应该依赖仅用于服务端的模块
    "import/no-restricted-paths": [0,
      {
        // 一个列表，每项是一条限制
        "zones": [
          // 以下配置的含义是，不允许在 `./bar/` 下的文件中，引用 `./foo/` 中的文件，但 `./foo/except` 中的文件不受影响
          // {
          //   "from": "./foo",
          //   "target": "./bar",
          //   "except": "./foo/except",
          //   "message": "不允许 ./bar 依赖 ./foo 下的模块",
          // },
        ],
        // 基础路径，在 zones 中配置的路径以此为基础
        "basePath": ".",
      },
    ],

    // 不允许使用绝对路径引用
    "import/no-absolute-path": [2,
      {
        // 检查通过 ES6 的 `import` 方式引入的路径
        "esmodule": true,
        // 检查通过 CJS 的 `require` 方式引入的路径
        "commonjs": true,
        // 检查通过 AMD 的 `define` 和 `require` 方式引入的路径
        "amd": false,
      },
    ],

    // 不允许 `require` 路径中使用计算值
    "import/no-dynamic-require": 2,

    // 不允许引用内部模块。这里的内部模块，指的是精确到文件名的引用，比如:
    // * `import foo from './app/index.js'` 是引用内部文件
    // * `import foo from './app'` 不是引用内部文件，因为 foo 是通过 `app/index.js` export 出来的
    "import/no-internal-modules": [0,
      {
        // 允许某些文件或路径，支持 glob
        "allow": [],
      },
    ],

    // 不允许 Webpack 特有的引入格式，如 `import myModule from 'my-loader!my-module'`
    "import/no-webpack-loader-syntax": 2,

    // 不允许引用自己，如在 foo.js 中再 `import foo from './foo'`
    "import/no-self-import": 2,

    // 不允许循环引用，如在 a.js 引用了 b.js，又在 b.js 中引用了 a.js
    "import/no-cycle": [2,
      {
        // 最多追溯几层嵌套，具体数字，或者用 "∞" 表示无限
        "maxDepth": "∞",
        // 忽略外部模块，即 node_modules 中的模块
        "ignoreExternal": false,
      },
    ],

    // 不允许不必要的路径片断，比如 `./../foo` 可以直接简化为 `../foo`
    "import/no-useless-path-segments": [2,
      {
        // 对于 `./foo/index.js` 是否要简化为 `./foo`
        "noUselessIndex": false,
        // 是否检查 CommonJS 的导入形式，如 `require('./foo')`
        "commonjs": true,
      },
    ],

    // 不允许子路径模块向外 export 父路径的模块。因为从正常理解来看，子路径模块应该是更细粒度的模块，应该由父路径文件引入并导出
    "import/no-relative-parent-imports": 2,

    /**
     * Helpful warnings
     */

    // 检查基本的 export 错误，比如导出同名模块，或多个 default 模块
    "import/export": 2,

    // 不允许使用 export 的某个具体接口名作为 import 时的 default 名
    "import/no-named-as-default": 2,

    // 对于通过 import 导入的 default 模块，不允许再通过方法名使用，而应该直接 import 那个方法名
    "import/no-named-as-default-member": 2,

    // 不允许导入被标记为 `@deprecated` 的模块，支持的标记可以在 settings.import.docstyle 中配置
    "import/no-deprecated": 1,

    // 不允许从无关的依赖中引入代码，比如产品代码不应该依赖 devDependencies 中的模块
    "import/no-extraneous-dependencies": [2,
      {
        // 从哪个目录下查找 package.json 文件，值可以是字符串或数组（支持多模块场景）
        // "packageDir": "./my-project",
        // 是否允许引用 devDependencies 中的模块。如果值是布尔类型，表示允许或不允许，如果是数组，则明确哪些文件才可以引用 devDependencies 中的模块
        "devDependencies": [
          "test/**",
          "tests/**",
          "spec/**",
          "**/__tests__/**",
          "**/__mocks__/**",
          "test.{js,jsx}",
          "test-*.{js,jsx}",
          "**/*{.,_}{test,spec}.{js,jsx}",
          "**/jest.config.js",
          "**/jest.setup.js",
          "**/vue.config.js",
          "**/webpack.config.js",
          "**/webpack.config.*.js",
          "**/rollup.config.js",
          "**/rollup.config.*.js",
          "**/gulpfile.js",
          "**/gulpfile.*.js",
          "**/karma.conf.js",
        ],
        // 以下几项与 devDependencies 配置要求相同
        "optionalDependencies": false,
        "peerDependencies": false,
        "bundledDependencies": false,
      },
    ],

    // 不允许导出非静态变量
    "import/no-mutable-exports": 2,

    // 不允许含有未被使用的模块
    // 对于未标记 `private: true` 的模块，如果文件在 package.json 的 `main`, `browser`, `bin` 字段中，则不会报错
    "import/no-unused-modules": [1,
      {
        // 是否报告未导出任何内容的模块（文件）
        "missingExports": true,
        // 是否报告未被使用的模块（文件）
        "unusedExports": true,
        // 要检查哪些路径下的文件，默认 `process.cwd()`
        // "src": [],
        // 忽略哪些路径下的文件
        // "ignoreExports": [],
      },
    ],

    /**
     * Module systems
     */

    // 避免有模块歧义的文件，比如某个文件中未导入导出任何数据，可能是用于 script 标签的
    "import/unambiguous": 2,

    // 不允许使用 CommonJS 方式进行静态导入和导出，静态导入使用 import，导出使用 export，动态 require 不受影响
    // 此规则主要用于把 CJS 项目转向 ESM 时使用
    "import/no-commonjs": [0,
      {
        // 是否额外允许静态 require（仍然检查导出）
        "allowRequire": true,
        // 是否额外允许在条件语义中的 require
        "allowConditionalRequire": true,
        // 是否额外允许基本类型的导出
        "allowPrimitiveModules": false,
      },
    ],

    // 不允许使用 AMD 形式的模块引用形式，即 `require([array], ...)` 和 `define([array], ...)`， CommonJS 格式不受影响
    "import/no-amd": 2,

    // 不允许使用 Node.js 集成的模块，如 `import fs from 'fs'`
    "import/no-nodejs-modules": [0,
      {
        // 额外允许使用的模块
        "allow": ["fs", "path"],
      },
    ],

    /**
     * Style guide
     */

    // 检查 import 语句应该在整个 js 文件的最前部
    "import/first": 2,

    // 检查  exports 语句要在整个 js 文件的最底部
    "import/exports-last": 0,

    // 不允许从一个路径下引入多次内容，即每个 import 都要对应不同的路径
    // 比规则相比 ESLint/no-duplicate-imports 规则，检查的更细致，如 `foo` 和 `foo.js` 指向同一个文件
    "import/no-duplicates": [2,
      {
        // 不同的 QueryString 是否表示不同模块，比如 `from 'foo?a'` 和 `from 'foo?b'`
        "considerQueryString": false,
      },
    ],

    // 不允许使用 `import * as foo from 'foo'` 这种方式引入模块，需要明确指定要引入的模块名（行业惯例）
    "import/no-namespace": 2,

    // 对于引用文件的文件扩展名，是否需要明确指出
    "import/extensions": [2,
      // 默认的扩展名要求
      // never: 不要加扩展名
      // always: 总是加扩展名
      // ignorePackages: 除了三方包可以不包含扩展名，其他都要有扩展名
      "ignorePackages",
      // 额外指定对应扩展名是否需要添加
      {
        "js": "never",
        "mjs": "never",
        "jsx": "never",
        "vue": "never",
      },
    ],

    // 规定 import 语句的顺序
    "import/order": [2,
      {
        // 排序分组，可使用的值包括：`builtin`, `external`, `internal`, `unknown`, `parent`, `sibling`, `index`, `object`
        // 数组第一层决定先后顺序，同一层如果是数组，则数组内的优先级相同，未指定的就排在最后，不区分优先级
        "groups": [["builtin", "external", "internal"]],
        // 区分某些无法直接判断的路径对应的分组
        "pathGroups": [
          // 比如下边这一条，指定了路径 `@/xxx` 对应内部模块
          {
            "pattern": "@/**",
            "group": "external",
          },
        ],
        // 未被 pathGroups 覆盖的路径类型（这个配置没太看懂）
        "pathGroupsExcludedImportTypes": ["builtin", "external"],
        // 在不同的 group 下，是否需要加空行
        // ignore: 忽略此项检查
        // always: 总要有空行
        // always-and-inside-groups: 在 always 基础上，同一个 group 下的不同类型也可以有空行
        // never: 不要有空行
        "newlines-between": "ignore",
        // import 通过模块名按字母排序
        "alphabetize": {
          // asc: 正序
          // desc: 倒序
          // ignore: 忽略检测
          "order": "ignore",
          // 大小写是否敏感
          "caseInsensitive": false,
        },
      },
    ],

    // 在所有 import 后，需要有一个空行
    "import/newline-after-import": 2,

    // 如果整个文件只 export 了一个元素，建议使用 default 而不是具名导出项
    "import/prefer-default-export": 2,

    // 限制一个模块（文件）中最多可以依赖多少外部模块
    "import/max-dependencies": [0,
      {
        // 最多可以有多少模块
        "max": 10,
      },
    ],

    // 不允许未赋值的 import，如 `import './foo.js'`
    "import/no-unassigned-import": [0,
      {
        // 允许 `import 'style.css'` 这种形式（Webpack 中常用）
        "allow": ["**/*.css"],
      },
    ],

    // 不允许给默认导出项再命名为 default，如 `import { default as foo } from 'foo'`
    "import/no-named-default": 2,

    // 不要导出 default 项，应该使用具名接口，基本与 import/prefer-default-export 相反
    "import/no-default-export": 0,

    // 不要导出具名接口，而应该导出默认项，与 import/no-default-export 相反
    "import/no-named-export": 0,

    // 不允许使用匿名的默认导出项，导出函数或变量时，应该要命名，如 `export default function foo () {}`
    "import/no-anonymous-default-export": [0,
      {
        // 允许导出匿名数组，如 `export default []`
        "allowArray": false,
        // 允许导出匿名箭头函数，如 `export default () => {}`
        "allowArrowFunction": false,
        // 允许导出匿名类，如 `export default class {}`
        "allowAnonymousClass": false,
        // 允许导出匿名函数，如 `export default function () {}`
        "allowAnonymousFunction": false,
        // 允许导出表达式，如 `export default foo(bar)`
        "allowCallExpression": false,
        // 允许导出字面量，如 `export default 123`
        "allowLiteral": false,
        // 允许导出对象，如 `export default {}`
        "allowObject": false,
      },
    ],

    // 在模块中将导出项集合在一起，即只能有一个 `export` 或 `module.exports`，从而方便一眼看出这个模块都导出了哪些接口
    "import/group-exports": 0,

    // 应用 Webpack 动态导入的地方，需要通过注释标记导入名
    "import/dynamic-import-chunkname": [0,
      {
        "importFunctions": [],
        "webpackChunknameFormat": "[0-9a-zA-Z-_/.]+",
      },
    ],
  },
}
