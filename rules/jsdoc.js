/**
 * @file JSDoc 相关的配置
 * @desc 此配置依赖 ESLint 插件: eslint-plugin-jsdoc@3.9
 * @see [eslint-plugin-jsdoc]{@link https://github.com/gajus/eslint-plugin-jsdoc}
 */

module.exports = {
  "plugins": [
    "jsdoc",
  ],

  "settings": {
    // 需要传给 eslint-plugin-jsdoc 插件的一些参数
    "jsdoc": {
      // 为了注释的一致性，对于有别名的注释给出倾向选项。如 `@param` 有两个别名： `@arg`, `@argument`
      "tagNamePreference": {
        // key 为要被替换的别名，value 为倾向的值
        "arg": "param",
        "argument": "param",
        "returns": "return",
      },
      // 添加其他自定义的标签
      "additionalTagNames": {
        // 数组中以字符串形式，每个标签一项
        "customTags": [],
      },
      // 在 @override 时是否要校验 @param
      "allowOverrideWithoutParam": false,
    },
  },

  "rules": {
    // 检查 `@param` 后跟的参数名，是不与函数中的参数名一致
    "jsdoc/check-param-names": 2,

    // 检查 JSDoc 的标签是否正确，支持的标签可在 http://usejsdoc.org/#block-tags 中查阅
    // NOTE: 其中并不包括 alias，如果你希望使用 alias 标签名，记得在 settings.jsdoc.tagNamePreference 添加配置
    // 另外可以通过 settings.jsdoc.additionalTagNames 来添加自定义的标签
    "jsdoc/check-tag-names": 2,

    // 检查 `@param` 后的类型是否正确
    // 目前原生支持的类型包括： `boolean`, `number`, `string`, `Object`, `Array`, `Date`, `RegExp`
    // 其中 `boolean`, `number`, `string` 为小写，是因为他们是简单类型，详情可参阅 https://github.com/gajus/eslint-plugin-jsdoc#why-not-capital-case-everything
    "jsdoc/check-types": 2,

    // 在 `@description` 定义后是不要有一个空行，其中 `@description` 一般在注释首行，此时 `@description` 可省略
    "jsdoc/newline-after-description": [2,
      // always: 总要有一个空行
      // never: 不要有空行
      "always",
    ],

    // 检查 `@param` 后的类型是否未在代码中定义，且对应的变量/方法名未被添加 `no-unused-vars` 注释
    // `null` 不是有效类型，可以用 `{?}` 表示，如 `@return {?number}` 表示返回值为 `number` 或 `null`，详见 http://usejsdoc.org/tags-type.html
    // 如需要使用如 `MyClass` 等非原生支持类型，或者在代码中有 `MyClass` 的定义，或者通过 `@typedef` 来指定相关外部类型，详见 http://usejsdoc.org/tags-typedef.html
    "jsdoc/no-undefined-types": 1,

    // 检查函数是否有 `@description` 来说明其用途
    // 一般函数最开始的一行就是 @description ，但此规则要求必须显式写明 `description`
    "jsdoc/require-description": 0,

    // 检查 `@description` 是否为完整的句子（以大写字母开头，每个句子有结束标点符号，如可以为.!?等，不能是,）
    "jsdoc/require-description-complete-sentence": 0,

    // 检查函数有 `@example` 段
    "jsdoc/require-example": 1,

    // 检查 `@param` 对应的名称与其后的描述之间是否有减号分隔，如 `@param {string} foo - the description`
    "jsdoc/require-hyphen-before-param-description": 0,

    // 检查函数的参数都有对应的 `@param` 来说明
    "jsdoc/require-param": 2,

    // 检查 `@param` 对应的描述都存在
    "jsdoc/require-param-description": 2,

    // 检查 `@param` 对应的名称都存在
    "jsdoc/require-param-name": 2,

    // 检查 `@param` 对应的类型都存在
    "jsdoc/require-param-type": 2,

    // 检查 `@return` 对应的描述是否存在
    "jsdoc/require-returns-description": 2,

    // 检查 `@return` 对应的类型是否存在
    "jsdoc/require-returns-type": 2,

    // 检查 `@param` 的类型是否合法，可以为 `@param {Array<string>}` 这种 Google Closure Compiler 支持的形式
    "jsdoc/valid-types": 2,
  },
}
