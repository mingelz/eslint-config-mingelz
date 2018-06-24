/**
 * @file strict 模式命令
 * @desc 此文件中的配置项，是与 strict 模板有关的检测（目前仅一项）
 */

module.exports = {
  "rules": {
    // 是否要标记 use strict，以及标记的位置
    "strict": [2,
      // 此配置有 4 个选项：
      // * global: 标记在全局作用域，且不允许在函数中标记
      // * function: 在每个顶级的函数中标记
      // * safe: 如果是 CommonJS 则为 global，否则为 function
      // * never: 不标记
      //
      // 另外，如果在 `parserOptions` 中有以下任一配置时，此项会被强制定义为 never，无论当前规则如何配置
      // * sourceType: 'module'
      // * impliedStrict: true
      "safe",
    ],
  },
}
