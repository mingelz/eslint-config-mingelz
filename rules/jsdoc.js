/**
 * @file JSDoc 相关的配置
 * @desc 此配置依赖 ESLint 插件: eslint-plugin-jsdoc@15.9
 * @see [eslint-plugin-jsdoc]{@link https://github.com/gajus/eslint-plugin-jsdoc}
 */

module.exports = {
  "plugins": [
    "jsdoc",
  ],

  "settings": {
    // 需要传给 eslint-plugin-jsdoc 插件的一些参数
    "jsdoc": {
      // 对于标注了 `@private` 的方法，是否不再检查 jsdoc 项目
      "ignorePrivate": false,

      // 为了注释的一致性，对于有别名的注释给出倾向选项。如 `@param` 有两个别名： `@arg`, `@argument`
      "tagNamePreference": {
        // key 为要被替换的别名，value 为倾向的值
        "arg": "param",
        "argument": "param",
        "returns": "return",
      },

      // `@override` 是否要替换注释文档
      "overrideReplacesDocs": true,
      // `@augments`/`@extends` 是否要替换注释文档
      "augmentsExtendsReplacesDocs": false,
      // `@implements` 是否要替换注释文档
      "implementsReplacesDocs": false,

      // 针对 `check-types` 和 `no-undefined-types` 的配置项
      // "preferredTypes": {
      // },
    },
  },

  "rules": {
    // 检查注释星号对齐是否正确
    "check-alignment": 2,

    // 使用 ESLint 检查 `@example` 中的代码格式
    "jsdoc/check-examples": [2,
      {
        // 是否要求在 @examples 中必须有 `<caption>`
        "captionRequired": false,
        // 用于界定 `@example` 代码范围的正则，如果正则有返回 Group，以第 1 个 Group 为准，其余的记得 `(?:)` 掉
        // "exampleCodeRegex" : "",
        // "rejectExampleCodeRegex": "",
        // 在 `@example` 中的代码缩进的空格数
        "paddedIndent": 0,
        // 是否报告未使用的 ESLint 批示器，具体可参考 ESLint --report-unused-disable-directives 参数
        "reportUnusedDisableDirectives": true,
        // 是否允许 @example 中行内的配置项
        // "allowInlineConfig": true,
        // "noDefaultExampleRules": false,
        // `@example` 中的内容匹配的文件名，可以被 ESLint 感知到，从而应用特定的文件类型检查
        // "matchingFileName": null,
        // 使用哪个文件检测文件，与 eslint -c 参数相同
        "configFile": ".eslintrc.*",
        // 是否应用上一配置中传入的 configFile
        "eslintrcForExamples": true,
        // 与 eslintrc 文件格式相同的配置项，可以覆盖默认的配置
        // "baseConfig": {},
      },
    ],

    // 检查注释中的内容缩进是否正确
    "jsdoc/check-indentation": [2,
      {
        // 排除的标签
        "excludeTags": ["example"],
      },
    ],

    // 检查 `@param` 后跟的参数名，是否与函数中的参数名一致
    "jsdoc/check-param-names": 2,

    // 检查注释符合 Google Closure Compiler 风格
    "jsdoc/check-syntax": 2,

    // 检查 JSDoc 的标签是否正确，支持的标签可在 http://usejsdoc.org/#block-tags 中查阅
    // 在 settings.jsdoc.tagNamePreference 中定义的 alias 会自动合并到标签白名单中
    "jsdoc/check-tag-names": [2,
      {
        // 添加自定义标签
        // "definedTags": ["foo"],
      },
    ],

    // 检查 `@param` 后的类型是否正确
    // 目前原生支持的类型包括： `undefined`, `null`, `boolean`, `number`, `bigint`, `string`, `symbol`, `object`, `Array`, `Function`, `Date`, `RegExp`
    // 其中 `boolean`, `number`, `bigint`, `string`, `symble` 为小写，是因为他们是简单类型，详情可参阅 https://github.com/gajus/eslint-plugin-jsdoc#why-not-capital-case-everything
    // 其中 `object` 从 6.0.0 开始也要求是小写了，原因是 Typescript 推荐用小写
    // 另外此规则受 settings.jsdoc.preferredTypes 配置影响
    "jsdoc/check-types": [2,
      {
        // 是否不使用默认支持的类型规则
        // "noDefaults": false,
        // 统一父子类型
        "unifyParentAndChildTypeChecks": true,
      },
    ],

    // 检查 `@implements` 只在构造函数中使用
    "jsdoc/implements-on-classes": 2,

    // 检查标签说明的格式，注意这里不仅包含 `@description`，也包括如 `@return {string} xxx` 中的 `xxx`
    "jsdoc/match-description": [0,
      {
        // 在哪些 AST 中应用此检测
        // "contexts": [],
        // 用于检查标签说明的正则，匹配所有标签
        "matchDescription": "",
        // 或者使用 tags 为每种标签指定不同的正则规则
        "tags": {
          // 值为正则，类似 matchDescription
          "param": "",
          // 值也可以为布尔，表示要不要检查，以及使用默认的检查规则
          "return": true,
        },
        // 是否要检查函数的主说明，即 `@description` 部分
        // "mainDescription": true,
      },
    ],

    // 在 `@description` 定义后是不要有一个空行，其中 `@description` 一般在注释首行，此时 `@description` 可省略
    "jsdoc/newline-after-description": [2,
      // always: 总要有一个空行
      // never: 不要有空行
      "always",
    ],

    // 在 `@param` 和 `@return` 中不需指定数据类型，主要用于 TypeScript（它在定义文件中已经指定格式了）
    "jsdoc/no-types": 0,

    // 检查 `@param` 后的类型是否未在代码中定义，且对应的变量/方法名未被添加 `no-unused-vars` 注释
    // `null` 不是有效类型，可以用 `{?}` 表示，如 `@return {?number}` 表示返回值为 `number` 或 `null`，详见 http://usejsdoc.org/tags-type.html
    // 如需要使用如 `MyClass` 等非原生支持类型，或者在代码中有 `MyClass` 的定义，或者通过 `@typedef` 来指定相关外部类型，详见 http://usejsdoc.org/tags-typedef.html
    "jsdoc/no-undefined-types": [1,
      {
        // 额外的类型
        // "definedTypes": [],
      },
    ],

    // 检查函数是否有 `@description` 来说明其用途
    "jsdoc/require-description": [2,
      {
        // 在哪些 AST 中应用此检测
        // "contexts": [],
        // 当有哪些标签（tags）存在时，就可以不要求 `@description` 了
        // "exemptedBy": [],
        // 说明文本以何用类型出现，`tag` 表示使用 `@description` 显示声明， `body` 表示无标签声明， `any` 表示都可以
        "descriptionStyle": "any",
      },
    ],

    // 检查 `@description` 是否为完整的句子（以大写字母开头，每个句子有结束标点符号，如可以为.!?等，不能是,）
    "jsdoc/require-description-complete-sentence": [0,
      {
        // 其他的需要做此检测的标签
        // "tags": ["see"],
      },
    ],

    // 检查函数有 `@example` 段
    "jsdoc/require-example": [1,
      {
        // 在哪些 AST 中应用此检测
        // "contexts": [],
        // 当有哪些标签（tags）存在时可以跳过检查
        // "exemptedBy": [],
        // 在构造函数中是否避免出现 `@example` 段
        "avoidExampleOnConstructors": false,
      },
    ],

    // 检查 `@param` 对应的名称与其后的描述之间是否有减号分隔，如 `@param {string} foo - the description`
    "jsdoc/require-hyphen-before-param-description": [0,
      // always: 总是要有减号
      // never: 不要有减号
      "never",
    ],

    // 检查对应的地方是否有 jsdoc
    "jsdoc/require-jsdoc": [1,
      {
        // 在哪些 AST 中应用此检测
        // "contexts": [],
        // 检查范围，是否只检查从模块中导出的，公开的方法
        "publicOnly": true,
        // publicOnly 可以细分成以下项
        // "publicOnly": {
        //   // 原型
        //   "ancestorsOnly": true,
        //   // ES Module
        //   "esm": true,
        //   // Common JS
        //   "cjs": true,
        //   // Window global
        //   "window": true,
        // },
        // 在哪些地方检查 jsdoc
        "require": {
          "ArrowFunctionExpression": true,
          "ClassDeclaration": true,
          "ClassExpression": true,
          "FunctionDeclaration": true,
          "FunctionExpression": true,
          "MethodDefinition": true,
        },
        // 对于无入参或无返回值的函数/方法，是否忽略检测
        "exemptEmptyFunctions": false,
      },
    ],

    // 检查函数的参数都有对应的 `@param` 来说明
    "jsdoc/require-param": [2,
      {
        // 当有哪些标签（tags）存在时可以跳过检查
        // "exemptedBy": []
      },
    ],

    // 检查 `@param` 对应的描述都存在
    "jsdoc/require-param-description": 2,

    // 检查 `@param` 对应的名称都存在
    "jsdoc/require-param-name": 2,

    // 检查 `@param` 对应的类型都存在
    "jsdoc/require-param-type": 2,

    // 检查函数的 `@return` 段是否正确
    "jsdoc/require-returns": [2,
      {
        // 当有哪些标签（tags）存在时可以跳过检查
        // "exemptedBy": [],
        // 无返回值的函数是否也强制要有 `@return`。因为此类函数会隐式返回 undefined
        "forceRequireReturn": false,
        // async 函数是否也要有 `@return`
        "forceReturnsWithAsync": true,
      },
    ],

    // 检查有 return 的函数是否带有 `@return` 段
    "jsdoc/require-returns-check": 2,

    // 检查 `@return` 对应的描述是否存在
    "jsdoc/require-returns-description": 2,

    // 检查 `@return` 对应的类型是否存在
    "jsdoc/require-returns-type": 2,

    // 检查 `@param` 的类型是否合法，可以为 `@param {Array<string>}` 这种 Google Closure Compiler 支持的形式
    "jsdoc/valid-types": [2,
      {
        // 是否允许空路径
        "allowEmptyNamepaths": true,
        // 检查 `@see` 中的路径
        "checkSeesForNamepaths": true,
      },
    ],
  },
}
