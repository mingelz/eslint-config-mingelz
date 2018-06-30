/**
 * @file Node 配置
 * @desc 此配置依赖 ESLint 插件: eslint-plugin-node@6.0
 * @see [eslint-plugin-node]{@link https://github.com/mysticatea/eslint-plugin-node}
 */

module.exports = {
  "plugins": [
    "node",
  ],

  "env": {
    "node": true,
  },

  "rules": {
    /**
     * Node: Possible Errors
     */

    // 不允许通过 `import` 引用尚未在 package.json 中添加依赖的模块，在其他人重装时可能会因为缺少依赖而报错
    "node/no-extraneous-import": [2,
      {
        // 跳过检查的模块名
        // 有些模块与环境有关，如 Electron 中有 `electron` 模块
        "allowModules": [],
      },
    ],

    // 不允许通过 `require` 引用尚未在 package.json 中添加依赖的模块，在其他人重装时可能会因为缺少依赖而报错
    // 请参考 no-extraneous-import 规则
    "node/no-extraneous-require": [2,
      {
        "allowModules": [],
      },
    ],

    // 不允许通过 `import` 引用路径不存在的模块（相对路径引用或 node_modules 模块）
    "node/no-missing-import": [2,
      {
        // 跳过检查的模块名
        "allowModules": [],
        // 查找模块的路径，如果是相对路径，会通过 `process.cwd()` 取绝对路径
        "resolvePaths": [],
        // 尝试查找到文件后缀
        "tryExtensions": [".js", ".json", ".node"],
      },
    ],

    // 不允许通过 `require` 引用路径不存在的模块（相对路径引用或 node_modules 模块）
    // 请参考 no-missing-import 规则
    "node/no-missing-require": [2,
      {
        "allowModules": [],
        "resolvePaths": [],
        "tryExtensions": [".js", ".json", ".node"],
      },
    ],

    // 不允许 package.json 文件中 `bin` 字段指定的文件存在被 `npm publish` 忽略的情况
    // `npm publish` 忽略有三种情况：package.json 中有 `file` 字段但不包含此文件、`.npmignore` 中包含此文件
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
    // 忽略规则参考 no-unpublished-bin 规则
    "node/no-unpublished-import": [2,
      {
        // 跳过检查的模块名
        "allowModules": [],
        // convertPath 的解释参考 no-unpublished-bin 规则
        "convertPath": null,
        // 尝试查找到文件后缀
        "tryExtensions": [".js", ".json", ".node"],
      },
    ],

    // 不允许通过 `require` 引用会被 `npm publish` 忽略的模块，在其他人重装时可能会因为缺少依赖而报错
    // 请参考 no-unpublished-import 规则
    "node/no-unpublished-require": [2,
      {
        "allowModules": [],
        "convertPath": null,
        "tryExtensions": [".js", ".json", ".node"],
      },
    ],

    // 不允许在代码中使用未被依赖环境支持的特性，如在 Node.js v4 下使用 `async/await` 语法
    // 环境是否支持通过以下三点确认：ESLint 规则中的 `env.es6` 字段和 `parserOptions.ecmaVersion` 字段，以及 package.json 中的 `engines` 字段
    "node/no-unsupported-features": [2,
      {
        // 如果在 package.json 中没有 `engines` 字段，那么默认要取的版本
        "version": 4,
        // 如果项目会使用 Babel 等工具转换，可能一些新的方法也可以使用，那可以在这里列出要忽略的项
        // 支持分组忽略（如 `String.*` 忽略所有 `String` 下的方法），或特性忽略（如 `forOf` 忽略 `for .. of` 语法）
        // 具体的分组及特性关键字，可查阅此规则文档：https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features.md
        "ignores": [],
      },
    ],

    // 将 process.exit() 等同于 throw，这样可以让 ESLint 中的 consistent-return 命令不再报错
    // 如 `if (foo) { return bar } else { process.exit(1) }` 在 consistent-return 中是要报错的，因为 else 中没有 `return`
    "node/process-exit-as-throw": 2,

    // 检查 shebang 的正确性（是否需要 shebang、以及 shebang 前的 Unicode BOM、换行符 等等）
    // 插件会检查 package.json 中的 `bin` 字段，每个对应文件都应该有正常的 shebang
    "node/shebang": [2,
      {
        // convertPath 的解释参考 no-unpublished-bin 规则
        "convertPath": null,
      },
    ],

    /**
     * Node: Best Practices
     */

    // 不允许使用已经废弃的 API，如 fs.exists
    // 目前在 Node.js 中有很多的废弃项，就不一一列举了，可查阅此规则文档：https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md
    "node/no-deprecated-api": [2,
      {
        // 忽略检测的模块项，如 buffer.Buffer()
        "ignoreModuleItems": [],
        // 忽略检测的全局项，如 Buffer()
        "ignoreGlobalItems": [],
      },
    ],

    /**
     * Node: Stylistic Issues
     */

    // 使用哪种导出方式，`module.exports` 或 `exports`
    "node/exports-style": [0,
      // 直接使用字符串形式指定 `module.exports` 或 `exports`
      "module.exports",
      {
        // 是否允许批量指定，如 `module.exports = exports = { ... }`
        "allowBatchAssign": false,
      },
    ],
  },
}
