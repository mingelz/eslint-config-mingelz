/**
 * @file Node 配置
 * @desc 此配置依赖 ESLint 插件: eslint-plugin-node@11.1
 * @see [eslint-plugin-node]{@link https://github.com/mysticatea/eslint-plugin-node}
 */

module.exports = {
  "plugins": [
    "node",
  ],

  "env": {
    "node": true,
  },

  "settings": {
    "node": {
      // 在多个规则中，都涉及规则具体在哪些文件类型中做判决，这里定义对应的文件后缀
      "tryExtensions": [".js", ".json", ".node"],
    },
  },

  "rules": {
    /**
     * Node: Possible Errors
     */

    // 参数标记有 err 时，回调中要有相应的错误处理逻辑
    "node/handle-callback-err": [2,
      // 参数需要符合以下正则匹配逻辑：err, error, Err, Error
      "^(e|E)rr(or)?$",
    ],

    // 如果一个方法叫 `cb` 或 `callback`，则要求此方法遵循 Node.js 「error-first」规则，即第一个参数表示是否出错，只能是 `undefined`, `null`, `Error` 或继承自 `Error`
    "node/no-callback-literal": 1,

    // 不允许单独覆写 `exports`，因为 `exports = {}` 并不会把相关变量或方法导出，需要用 `module.exports = {}` 或 `exports.foo = bar`
    // 为了不和 node/exports-style 中的 allowBatchAssign 规则冲突，此规则仍允许 `module.exports = exports = {}`
    "node/no-exports-assign": 2,

    // 不允许通过 `import` 引用尚未在 package.json 中添加依赖的模块，在其他人重装时可能会因为缺少依赖而报错
    "node/no-extraneous-import": [2,
      // {
      //   // 跳过检查的模块名，比如有些模块与环境有关，如 Electron 中有 `electron` 模块
      //   "allowModules": [],
      // },
    ],

    // 不允许通过 `require` 引用尚未在 package.json 中添加依赖的模块，在其他人重装时可能会因为缺少依赖而报错
    // 请参考 node/no-extraneous-import 规则
    "node/no-extraneous-require": [2,
      // {
      //   "allowModules": [],
      // },
    ],

    // 不允许通过 `import` 引用路径不存在的模块（相对路径引用或 node_modules 模块）
    "node/no-missing-import": [2,
      // {
      //   // 跳过检查的模块名，比如有些模块与环境有关，如 Electron 中有 `electron` 模块
      //   "allowModules": [],
      //   // 查找模块的路径，如果是相对路径，会通过 `process.cwd()` 取绝对路径
      //   "resolvePaths": [],
      //   // 尝试查找的文件后缀，此配置可以统一在 settings.node 中维护
      //   "tryExtensions": [".js", ".json", ".node"],
      // },
    ],

    // 不允许通过 `require` 引用路径不存在的模块（相对路径引用或 node_modules 模块）
    // 请参考 node/no-missing-import 规则
    "node/no-missing-require": [2,
      // {
      //   "allowModules": [],
      //   "resolvePaths": [],
      //   "tryExtensions": [".js", ".json", ".node"],
      // },
    ],

    // 不允许在调用 require 时使用 new 构建它，建议分两行写
    "node/no-new-require": 2,

    // 不允许使用 __dirname 和 __filename 做字符串拼接路径，因为不同平台分隔符不同（`/` 或 `\`），建议使用 path 模块
    "node/no-path-concat": 2,

    // 不允许使用 `process.exit()`，因为它太危险会退出 Node 环境，建议使用抛异常的方式处理错误逻辑，除非真的在项目的最后需要返回给 Shell 结果
    // 但实际项目中，特别是 CLI 工具，在某些错误判断中确实需要退出 Node 环境，所以关闭此检测
    "node/no-process-exit": 0,

    // 不允许 package.json 文件中 `bin` 字段指定的文件存在被 `npm publish` 忽略的情况
    // `npm publish` 忽略有两种情况：package.json 中有 `file` 字段但不包含此文件、`.npmignore` 中包含此文件
    "node/no-unpublished-bin": [2,
      // {
      //   // 有时候，bin 文件是通过 Babel 等工具编译后生成的，那么可以指定源文件地址，此配置支持对象形式或数组形式
      //   // 对象形式
      //   "convertPath": {
      //     // 格式：<targetFiles>: [<fromRegExp>, <toString>]
      //     // 解释：匹配所有的 bin/**/*.js 文件，并通过数组第一项的正则，取到 `**/*` 的部分，替换数组第二项的部分
      //     // 举例：`bin/foo/bar.js` 这个路径会通过正则取到 `foo/bar` 替换为 `src/foo/bar.js`
      //     "bin/**/*.js": ["^bin/(.+)\\.js$", "src/$1.js"],
      //   },
      //   // 数组形式
      //   "convertPath": [
      //     // 格式：包含 include, exclude, replace 三个字段
      //     // include 对应对象形式的 key，replace 对应对象形式的 value，exclude 是要排除的文件
      //     {
      //       "include": ["bin/**/*.js"],
      //       "exclude": ["**/*.spec.js"],
      //       "replace": ["^bin/(.+)\\.js$", "lib/$1.js"],
      //     },
      //   ],
      // },
    ],

    // 不允许通过 `import` 引用会被 `npm publish` 忽略的模块，在其他人重装时可能会因为缺少依赖而报错
    "node/no-unpublished-import": [2,
      // {
      //   // 跳过检查的模块名，比如有些模块与环境有关，如 Electron 中有 `electron` 模块
      //   "allowModules": [],
      //   // convertPath 的解释参考 node/no-unpublished-bin 规则
      //   "convertPath": {},
      //   // 尝试查找的文件后缀，此配置可以统一在 settings.node 中维护
      //   "tryExtensions": [".js", ".json", ".node"],
      // },
    ],

    // 不允许通过 `require` 引用会被 `npm publish` 忽略的模块，在其他人重装时可能会因为缺少依赖而报错
    // 请参考 node/no-unpublished-import 规则
    "node/no-unpublished-require": [2,
      // {
      //   "allowModules": [],
      //   "convertPath": {},
      //   "tryExtensions": [".js", ".json", ".node"],
      // },
    ],

    // 不允许在代码中使用未被依赖环境支持的 ES 内置方法，如 `Array.from` 等
    "node/no-unsupported-features/es-builtins": [2,
      // {
      //   // 依赖环境通过 package.json 中的 `engines` 字段确认，也可以在这里强制指定要判断的版本
      //   "version": ">=6.0.0",
      //   // 如果项目会使用 Babel 等工具转换，可能一些新的方法也可以使用，那可以在这里列出要忽略的项
      //   // 具体接受的值可查阅此规则文档：https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features/es-builtins.md
      //   "ignores": [],
      // },
    ],

    // 不允许在代码中使用未被依赖环境支持的 ES 语法，如 `async/await` 等
    // 请参考 node/no-unsupported-features/es-builtins 规则
    "node/no-unsupported-features/es-syntax": [2,
      // {
      //   "version": ">=6.0.0",
      //   // 具体接受的值可查阅此规则文档：https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features/es-syntax.md
      //   "ignores": [],
      // },
    ],

    // 不允许在代码中使用未被依赖环境支持的 Node.js 内置方法，如 `os.homedir` 等
    // 请参考 node/no-unsupported-features/es-builtins 规则
    "node/no-unsupported-features/node-builtins": [2,
      // {
      //   "version": ">=6.0.0",
      //   // 具体接受的值可查阅此规则文档：https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features/node-builtins.md
      //   "ignores": [],
      // },
    ],

    // 将 process.exit() 等同于 throw，这样可以让 ESLint 中的 consistent-return 命令不再报错
    // 如 `if (foo) { return bar } else { process.exit(1) }` 在 consistent-return 中是要报错的，因为 else 中没有 `return`
    "node/process-exit-as-throw": 2,

    // 检查 shebang 的正确性（是否需要 shebang、以及 shebang 前的 Unicode BOM、换行符 等等）
    // 插件会检查 package.json 中的 `bin` 字段，每个对应文件都应该有正常的 shebang
    "node/shebang": [2,
      // {
      //   // convertPath 的解释参考 node/no-unpublished-bin 规则
      //   "convertPath": {},
      // },
    ],

    /**
     * Node: Best Practices
     */

    // 不允许使用已经废弃的 API，如 fs.exists
    // 目前在 Node.js 中有很多的废弃项，就不一一列举了，可查阅此规则文档：https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md
    "node/no-deprecated-api": [2,
      // {
      //   // 此规则优先取 package.json 中的 `engines` 字段，或者在这里配置覆盖此值，如果此版本 Node.js 尚不支持替代 API，将不会提示
      //   // "version": ">=8.0.0",
      //   // 忽略检测的模块项，如 buffer.Buffer()
      //   "ignoreModuleItems": [],
      //   // 忽略检测的全局项，如 Buffer()
      //   "ignoreGlobalItems": [],
      // },
    ],

    /**
     * Node: Stylistic Issues
     */

    // Node.js 编程中，建议回调函数调用后都通过 return 返回
    "node/callback-return": [0,
      // 要求的回调函数名称在下边数组中列出
      [
        "callback",
        "cb",
        "next",
        "success",
        "failure",
      ],
    ],

    // 使用哪种导出方式，`module.exports` 或 `exports`
    "node/exports-style": [0,
      // 直接使用字符串形式指定 `module.exports` 或 `exports`
      "module.exports",
      {
        // 是否允许批量指定，如 `module.exports = exports = { ... }`
        "allowBatchAssign": false,
      },
    ],

    // 检查在引入文件时的文件后缀
    "node/file-extension-in-import": [2,
      // always: 在 import/export 时要明确文件后缀
      // never: 在 import/export 时不允许写文件后缀
      "always",
      {
        // 尝试查找的文件后缀，此配置可以统一在 settings.node 中维护
        // "tryExtensions": [".js", ".json", ".node"],
        // 针对特殊的文件类型重新指定方案
        ".js": "never",
      },
    ],

    // require 仅出现在模块最前边
    "node/global-require": 2,

    // 禁止 require 和其他变量声明混合使用，建议书写时尽量把 require 当 import 用
    "node/no-mixed-requires": [2,
      {
        // require 是否要按不同引用类型分组：
        // 1. 核心模块，如： `require('fs')`, `require('os')`
        // 2. 三方模块，即安装在 node_modules 中的模块，如： `require('jquery')`
        // 3. 本地文件，如 `require('./utils')`
        // 4. 计算值，如 `require(getModuleName())`
        "grouping": false,
        // 是否允许在引用时直接调用，如 `var foo = require(bar)(baz)`
        "allowCall": false,
      },
    ],

    // 不使用 `process.env` 获取环境变量，因为 `process.env` 会随环境变化，建议通过配置文件来保证所依赖数据的稳定性
    // 但实际项目中，使用 `process.env` 本身就是为了获取环境信息，所以关闭此检测
    "node/no-process-env": 0,

    // 禁止通过 import 引入某些模块
    "node/no-restricted-import": [0,
      [
        // 可以是字符串，表示某个模块
        "fs",
        // 也可以提供自定义的提示：
        {
          // name 支持字符串、glob匹配、绝对地址
          "name": "foo",
          "message": "Please use bar-module instead.",
        },
      ],
    ],

    // 禁止通过 require 引入某些模块
    "node/no-restricted-require": [0,
      [
        // 可以是字符串，表示某个模块
        "fs",
        // 也可以提供自定义的提示：
        {
          // name 支持字符串、glob匹配、绝对地址
          "name": "foo",
          "message": "Please use bar-module instead.",
        },
      ],
    ],

    // 禁用同步的方法，因为 Node.js 以异步见长，高并发下同步方法会带来问题
    "node/no-sync": [0,
      {
        // 在最外层是否允许
        "allowAtRootLevel": true,
      },
    ],

    // 在 Node.js 0.1.103 中，`Buffer` 被放在了全局作用域中，所以 `Buffer === require('buffer').Buffer`，编码时应该保证引用 `Buffer` 的方案统一
    "node/prefer-global/buffer": [2,
      // always: 总是使用全局作用域下的 `Buffer`
      // never: 总是使用 `require('buffer').Buffer`
      "always",
    ],

    // 在 Node.js 0.1.100 中，`console` 被放在了全局作用域中，所以 `console === require('console')`，编码时应该保证引用 `console` 的方案统一
    // 请参考 node/prefer-global/buffer 规则
    "node/prefer-global/console": [2,
      "always",
    ],

    // 在 Node.js 0.1.7 中，`process` 被放在了全局作用域中，所以 `process === require('process')`，编码时应该保证引用 `process` 的方案统一
    // 请参考 node/prefer-global/buffer 规则
    "node/prefer-global/process": [2,
      "always",
    ],

    // 在 Node.js 11.0.0 中，`TextDecoder` 被放在了全局作用域中，所以 `TextDecoder === require('util').TextDecoder`，编码时应该保证引用 `TextDecoder` 的方案统一
    // 请参考 node/prefer-global/buffer 规则，由于 v11 才支持，所以暂关闭此项检测
    "node/prefer-global/text-decoder": [0,
      "always",
    ],

    // 在 Node.js 11.0.0 中，`TextEncoder` 被放在了全局作用域中，所以 `TextEncoder === require('util').TextEncoder`，编码时应该保证引用 `TextEncoder` 的方案统一
    // 请参考 node/prefer-global/buffer 规则，由于 v11 才支持，所以暂关闭此项检测
    "node/prefer-global/text-encoder": [0,
      "always",
    ],

    // 在 Node.js 10 中，`URLSearchParams` 被放在了全局作用域中，所以 `URLSearchParams === require('url').URLSearchParams`，编码时应该保证引用 `URLSearchParams` 的方案统一
    // 请参考 node/prefer-global/buffer 规则，由于 v10 才支持，所以暂关闭此项检测
    "node/prefer-global/url-search-params": [0,
      "always",
    ],

    // 在 Node.js 10 中，`URL` 被放在了全局作用域中，所以 `URL === require('url').URL`，编码时应该保证引用 `URL` 的方案统一
    // 请参考 node/prefer-global/buffer 规则，由于 v10 才支持，所以暂关闭此项检测
    "node/prefer-global/url": [0,
      "always",
    ],

    // 在 Node.js 11.14 中， `require("dns").promises` 已可用，此规则强制要求使用 async/await 方式使用该 API，因为可读性显著高于 callback 方式
    // 由于 v11 才支持，所以暂关闭此项检测
    "node/prefer-promises/dns": 0,

    // 在 Node.js 11.14 中， `require("fs").promises` 已可用，此规则强制要求使用 async/await 方式使用该 API，因为可读性显著高于 callback 方式
    // 由于 v11 才支持，所以暂关闭此项检测
    "node/prefer-promises/fs": 0,
  },
}
