/**
 * @file JSDoc 相关的配置
 * @desc 此配置依赖 ESLint 插件: eslint-plugin-jsdoc@26.0
 * @see [eslint-plugin-jsdoc]{@link https://github.com/gajus/eslint-plugin-jsdoc}
 */

module.exports = {
  "plugins": [
    "jsdoc",
  ],

  "settings": {
    // 需要传给插件的参数
    "jsdoc": {
      // 代码注释模式，可选 `jsdoc`, `typescript`, `closure`
      "mode": "jsdoc",

      // 对于标注了 `@private` 的方法，是否不再检查 jsdoc 项目
      "ignorePrivate": false,

      // 为了注释的一致性，对于有别名的注释给出倾向选项。如 `@param` 有两个别名： `@arg`, `@argument`
      // 此插件已经做了一致性配置，目前来看直接遵守它的就可以了 https://github.com/gajus/eslint-plugin-jsdoc#default-preferred-aliases
      "tagNamePreference": {
        // key 为要被替换的别名，value 为倾向的值，如果 value 为 `false` 则表示不希望使用此标记
        // "arg": "param",
        // "todo": false,
      },

      // `@override` 对应的方法，是否直接应用上级实现的文档
      "overrideReplacesDocs": true,
      // `@augments`/`@extends` 对应的方法，是否直接应用对应父类的文档
      "augmentsExtendsReplacesDocs": false,
      // `@implements` 对应的方法，是否直接应用对应接口的文档
      "implementsReplacesDocs": false,

      // 针对 `check-types` 和 `no-undefined-types` 的配置项，很啰嗦，后边用到了再详细写吧
      // "preferredTypes": {
      // },
    },
  },

  "rules": {
    // 检查 `@access` 的正确性
    // 或者在 `@access` 后跟 `package`, `private`, 'protected`, 'public`，或者直接使用 `@package`, `@private`, '@protected`, '@public`
    "jsdoc/check-access": 2,

    // 检查注释星号对齐是否正确
    "jsdoc/check-alignment": 2,

    // 使用 ESLint 检查 `@example` 中的代码格式
    "jsdoc/check-examples": [2,
      {
        // 是否要求在 `@examples` 中必须有 `<caption>`
        "captionRequired": false,
        // 用于界定 `@example` 代码范围的正则，如果正则有返回 Group，以第 1 个 Group 为准，其余的记得 `(?:)` 掉
        // "exampleCodeRegex" : "",
        // "rejectExampleCodeRegex": "",
        // 在 `@example` 中的代码起始缩进空格数，即与 `@example` 齐平后，额外缩进的量，这部分空格在检测时不会算做缩进
        "paddedIndent": 0,
        // 是否报告未使用的 ESLint 指示器，具体可参考 ESLint --report-unused-disable-directives 参数
        "reportUnusedDisableDirectives": true,
        // 是否允许 `@example` 中行内的配置项
        "allowInlineConfig": true,
        // 是否开启一些 ESLint 规则，具体规则可参考 https://github.com/gajus/eslint-plugin-jsdoc#rules-disabled-by-default-unless-nodefaultexamplerules-is-set-to-true
        "noDefaultExampleRules": false,
        // 使用哪个检测文件，与 eslint -c 参数相同，但目前不支持 glob 字符，所以写死了文件名
        "configFile": ".eslintrc.js",
        // `@example` 中的内容匹配的文件名，可以被 ESLint 感知到，从而应用特定的文件类型检查
        // "matchingFileName": null,
        // 是否导入上边 configFile 指定的配置文件
        "checkEslintrc": false,
        // 与 eslintrc 文件格式相同的配置项，作为默认配置
        // "baseConfig": {},
      },
    ],

    // 检查注释中的内容缩进是否正确，因为 JSDoc 最终生成的文档，是忽略句子中前后空格的，此检测可以保证注释内容与最终结果一致
    "jsdoc/check-indentation": [2,
      {
        // 排除的标签
        "excludeTags": ["example"],
      },
    ],

    // 检查 `@param` 后跟的参数名，是否与函数中的参数名一致
    "jsdoc/check-param-names": [2,
      {
        // 是否允许举例不存在的参数（如函数中有 2 个形参，但注释中除了这 2 个形参外，还定义了第三个参数）
        "allowExtraTrailingParamDocs": false,
        // 是否检查解构出的属性，如 `function ({foo, bar}) {}`
        "checkRestProperty": true,
        // 校验参数类型要符合指定的值
        // "checkTypesPattern": "^(?:[oO]bject|[aA]rray|PlainObject|Generic(?:Object|Array))$",
        // 是否自动补充缺失的参数名
        "enableFixer": true,
      },
    ],

    // 检查 `@property` 后跟的属性名，是否已被正确定义
    "jsdoc/check-property-names": 2,

    // 检查注释符合 Google Closure Compiler 风格
    "jsdoc/check-syntax": 2,

    // 检查 JSDoc 的标签是否正确，支持的标签可在 http://usejsdoc.org/#block-tags 中查阅
    // 在 settings.jsdoc.tagNamePreference 中定义的 alias 会自动合并到标签白名单中
    "jsdoc/check-tag-names": [2,
      {
        // 额外添加自定义标签
        "definedTags": [],
      },
    ],

    // 检查 `@param` 后的类型是否正确
    // 目前原生支持的类型包括： `undefined`, `null`, `boolean`, `number`, `bigint`, `string`, `symbol`, `object`, `Array`, `Function`, `Date`, `RegExp`
    // 其中 `boolean`, `number`, `bigint`, `string`, `symble` 为小写，是因为他们是简单类型，详情可参阅 https://github.com/gajus/eslint-plugin-jsdoc#why-not-capital-case-everything
    // 其中 `object` 从 6.0.0 开始也要求是小写了，原因是 Typescript 推荐用小写，更深层原因是 `Object.create(null) instanceof Object` 为 false，即 `object` 与 `Object` 并不完全相同
    // 另外此规则受 settings.jsdoc.preferredTypes 配置影响
    "jsdoc/check-types": [2,
      {
        // 是否不使用默认支持的类型规则
        // "noDefaults": false,
        // 统一父子类型
        "unifyParentAndChildTypeChecks": true,
        // 免除类型检查的标签
        // "exemptTagContexts": [
        //   // tag 为要特殊定义的标签，types 为标签对应的类型，如果为 `true` 即支持任意类型，否则就要求实际定义的与 types 一致
        //   {
        //     "tag": "typedef",
        //     "types": true,
        //   },
        // ],
      },
    ],

    // 检查以下标记是否合法：
    // `@version`: 要求是一个合法的 semver 版本
    // `@since`: 与 `@version` 相同，要求是一个合法的 semver 版本
    // `@license`: 要求是一个合法的授权协议，参考 https://spdx.org/licenses/
    // `@author`: 要求是一个合法的作者
    "jsdoc/check-values": [2,
      {
        // 允许的作者列表，如果为空，则仅要求作者不能为空
        "allowedAuthors": [],
        // 允许的授权协议列表，如果值为 `true`，即表示所有协议都支持； 如果值为字符串数组，则只允许数组中的协议，不再匹配 SPDX 协议
        "allowedLicenses": true,
        // 允许的协议匹配正则
        // "licensePattern": "([^\n]*)",
      },
    ],

    // 检查一些标签后不再跟其他内容，如 `@abstract`, `@ignore` 等，详细列表可参考 https://github.com/gajus/eslint-plugin-jsdoc#empty-tags
    "jsdoc/empty-tags": [2,
      {
        // 其他要求不能跟内容的标签
        "tags": [],
      },
    ],

    // 检查 `@implements` 只在构造函数中使用
    "jsdoc/implements-on-classes": [2,
      {
        // 在哪些 AST 中应用此检测，也可以把数组换为 `any`，即检查所有
        // "contexts": [],
      },
    ],

    // 检查标签说明的格式，注意这里不仅包含 `@description`，也包括如 `@return {string} xxx` 中的 `xxx`
    "jsdoc/match-description": [0,
      {
        // 在哪些 AST 中应用此检测，也可以把数组换为 `any`，即检查所有
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

    // 检查块注释格式是否符合 jsdoc 规范
    "jsdoc/no-bad-blocks": 2,

    // 检查通过 `@param` 和 `@default` 指定的参数中，不允许写明默认值（因为在 ES6 的实现代码中可以写默认值，JSDoc 会读取，不需要维护两份）
    "jsdoc/no-defaults": [0,
      {
        // 不允许在 `@param` 中列出可选参数（不止是默认值，连参数都要省掉）
        "noOptionalParamNames": false,
        // 在哪些 AST 中应用此检测，也可以把数组换为 `any`，即检查所有
        // "contexts": [],
      },
    ],

    // 在 `@param` 和 `@return` 中不需指定数据类型，主要用于 TypeScript（它在定义文件中已经指定格式了）
    "jsdoc/no-types": [0,
      {
        // 在哪些 AST 中应用此检测，也可以把数组换为 `any`，即检查所有
        // "contexts": [],
      },
    ],

    // 检查 `@param` 后的类型是否未在代码中定义，且对应的变量/方法名未被添加 `no-unused-vars` 注释
    // `null` 不是有效类型，可以用 `{?}` 表示，如 `@return {?number}` 表示返回值为 `number` 或 `null`，详见 http://usejsdoc.org/tags-type.html
    // 如需要使用如 `MyClass` 等非原生支持类型，或者在代码中有 `MyClass` 的定义，或者通过 `@typedef` 来指定相关外部类型，详见 http://usejsdoc.org/tags-typedef.html
    "jsdoc/no-undefined-types": [1,
      {
        // 额外的类型
        "definedTypes": [],
      },
    ],

    // 检查函数是否有 `@description` 来说明其用途
    "jsdoc/require-description": [2,
      {
        // 在哪些 AST 中应用此检测，也可以把数组换为 `any`，即检查所有
        // "contexts": [],
        // 当有哪些标签（tags）存在时，就可以不要求 `@description` 了
        // "exemptedBy": ["inheritdoc"]
        // 说明文本以何用类型出现，`tag` 表示使用 `@description` 显示声明， `body` 表示无标签声明， `any` 表示都可以
        "descriptionStyle": "any",
        // 是否检查构造函数
        "checkConstructors": true,
        // 是否检查 getter
        "checkGetters": true,
        // 是否检查 setter
        "checkSetters": true,
      },
    ],

    // 检查 `@description` 是否为完整的句子（以大写字母开头，每个句子有结束标点符号，如可以为.!?等，不能是,）
    "jsdoc/require-description-complete-sentence": [0,
      {
        // 其他的需要做此检测的标签
        "tags": ["see"],
        // 允许的缩写。因为这些缩写后通常带有一个英文 `.` ，比如 `e.g.` ，会导致程序以为遇到了句号，要求接下来的字母要大写
        "abbreviations": ["e.g", "i.e", "etc"],
        // 如果前一行句子没结束，第二行起始用了大写字母，是否报错
        "newlineBeforeCapsAssumesBadSentenceEnd": false,
      },
    ],

    // 检查函数有 `@example` 段
    "jsdoc/require-example": [1,
      {
        // 在哪些 AST 中应用此检测，也可以把数组换为 `any`，即检查所有
        // "contexts": [],
        // 当有哪些标签（tags）存在时可以跳过检查
        // "exemptedBy": ["inheritdoc"]
        // 是否检查构造函数
        "checkConstructors": true,
        // 是否检查 getter
        "checkGetters": false,
        // 是否检查 setter
        "checkSetters": false,
      },
    ],

    // 检查文件是否有 `@file` 或 `@fileoverview` 或 `@overview` 标签来说明文件作用
    "jsdoc/require-file-overview": [0,
      {
        // 额外要检查的标签
        "tags": {
          // 以下 file 字段是此配置项的默认值
          // key 为标签名，值定义此标签要求的具体行为
          "file": {
            // 只能出现在文件初始的注释中
            "initialCommentsOnly": true,
            // 是否要必须存在
            "mustExist": true,
            // 是否不允许重复
            "preventDuplicates": true,
          },
          // 比如这里又定义了针对 `@copyright` 的检查
          "copyright": {
            "initialCommentsOnly": false,
            "mustExist": false,
            "preventDuplicates": true,
          },
        },
      },
    ],

    // 检查 `@param` 对应的名称与其后的描述之间是否有减号分隔，如 `@param {string} foo - the description`
    "jsdoc/require-hyphen-before-param-description": [2,
      // always: 总是要有减号
      // never: 不要有减号
      "never",
      {
        // 此规则是否同时检查 `@property`
        "checkProperties": true,
      },
    ],

    // 检查对应的地方是否有 jsdoc
    "jsdoc/require-jsdoc": [1,
      {
        // 在哪些 AST 中应用此检测，也可以把数组换为 `any`，即检查所有
        // "contexts": [],
        // 检查范围，是否只检查从模块中导出的，公开的方法，可以设置为布尔值，或者一个对象来列举详细规则
        "publicOnly": {
          // 原型
          "ancestorsOnly": true,
          // ES Module
          "esm": true,
          // Common JS
          "cjs": true,
          // Window global
          "window": true,
        },
        // 在哪些地方检查 jsdoc
        "require": {
          "ArrowFunctionExpression": false,
          "ClassDeclaration": true,
          "ClassExpression": false,
          "FunctionDeclaration": true,
          "FunctionExpression": false,
          "MethodDefinition": false,
        },
        // 对于无入参或无返回值的函数/方法，是否忽略检测
        "exemptEmptyFunctions": false,
      },
    ],

    // 检查函数的参数都有对应的 `@param` 来说明
    "jsdoc/require-param": [2,
      {
        // 在哪些 AST 中应用此检测，也可以把数组换为 `any`，即检查所有
        // "contexts": [],
        // 当有哪些标签（tags）存在时可以跳过检查
        // "exemptedBy": ["inheritdoc"]
        // 是否检查构造函数
        "checkConstructors": true,
        // 是否检查 getter
        "checkGetters": false,
        // 是否检查 setter
        "checkSetters": false,
        // 是否检查解构剩余元素对应的注释信息
        "checkRestProperty": false,
        // 在参数解构情况下，根参数自增从几开始
        "autoIncrementBase": 0,
        // 在参数解构情况下，根参数如何命名
        "unnamedRootBase": ["root"],
        // 是否自动补充缺失的参数
        "enableFixer": true,
        // 是否自动处理根参数注释
        "enableRootFixer": true,
        // 是否自动处理解构剩余元素注释
        "enableRestElementFixer": true,
        // 校验参数类型要符合指定的值
        // "checkTypesPattern": "^(?:[oO]bject|[aA]rray|PlainObject|Generic(?:Object|Array))$",
      },
    ],

    // 检查 `@param` 后要有对应描述信息
    "jsdoc/require-param-description": [2,
      {
        // 在哪些 AST 中应用此检测，也可以把数组换为 `any`，即检查所有
        // "contexts": [],
      },
    ],

    // 检查 `@param` 后要有对应的名称信息
    "jsdoc/require-param-name": [2,
      {
        // 在哪些 AST 中应用此检测，也可以把数组换为 `any`，即检查所有
        // "contexts": [],
      },
    ],

    // 检查 `@param` 后要有对应的类型信息
    "jsdoc/require-param-type": [2,
      {
        // 在哪些 AST 中应用此检测，也可以把数组换为 `any`，即检查所有
        // "contexts": [],
      },
    ],

    // 当通过 `@typedef` 或 `@namespace` 标记了一个对象时，需要继续用 `@property` 指明对象的每个属性
    "jsdoc/require-property": 2,

    // 检查 `@property` 后要有对应描述信息
    "jsdoc/require-property-description": 2,

    // 检查 `@ppropertyaram` 后要有对应的名称信息
    "jsdoc/require-property-name": 2,

    // 检查 `@property` 后要有对应的类型信息
    "jsdoc/require-property-type": 2,

    // 检查函数的 `@return` 段是否正确
    "jsdoc/require-returns": [2,
      {
        // 在哪些 AST 中应用此检测，也可以把数组换为 `any`，即检查所有
        // "contexts": [],
        // 当有哪些标签（tags）存在时可以跳过检查
        // "exemptedBy": ["inheritdoc"]
        // 是否检查构造函数
        "checkConstructors": false,
        // 是否检查 getter
        "checkGetters": true,
        // 无返回值的函数是否也强制要有 `@return`。因为此类函数会隐式返回 undefined
        "forceRequireReturn": false,
        // async 函数是否也要有 `@return`
        "forceReturnsWithAsync": true,
      },
    ],

    // 检查有 return 的函数是否带有 `@return` 段
    "jsdoc/require-returns-check": [2,
      {
        // 在哪些 AST 中应用此检测，也可以把数组换为 `any`，即检查所有
        // "contexts": [],
      },
    ],

    // 检查 `@return` 对应的描述是否存在
    "jsdoc/require-returns-description": [2,
      {
        // 在哪些 AST 中应用此检测，也可以把数组换为 `any`，即检查所有
        "contexts": ["ArrowFunctionExpression", "FunctionDeclaration", "FunctionExpression"],
      },
    ],

    // 检查 `@return` 对应的类型是否存在
    "jsdoc/require-returns-type": [2,
      {
        // 在哪些 AST 中应用此检测，也可以把数组换为 `any`，即检查所有
        // "contexts": [],
      },
    ],

    // 检查标签内容合法性，包括类型、路径等，支持 JSDoc 和 Google Closure Compiler 语法
    "jsdoc/valid-types": [2,
      {
        // 是否允许空路径
        "allowEmptyNamepaths": true,
        // 检查 `@see` 中的路径
        // 如果是链接，正确的格式是 `@see {@link http://example.com}` ，但 JSDoc 也支持 `@see http://example.com` 的形式
        "checkSeesForNamepaths": false,
      },
    ],
  },
}
