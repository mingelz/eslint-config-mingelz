// 此配置文件是为了校验当前项目而写，具体的配置方式，请参考 ./index.js
module.exports = {
  "root": true,

  "extends": [
    "./index",
  ].map(require.resolve),

  "env": {
    "node": true,
  },

  // 针对规则文件单独处理
  "overrides": [
    {
      "files": [
        "index.js",
        "rules/*.js",
      ],
      "rules": {
        // 为了尽可能兼容 JSON 格式，统一使用双引号，且配置文件中的 key 一律加引号
        "quote-props": [2, "always"],
        "quotes": [2, "double"],

        // 项目中都是配置文件，对于 max-lines 并无强诉求
        "max-lines": 0,

        // 在配置规则时，数组的第一项为规则提示级别，为了与后边的配置区分，此项与规则名同行，所以关闭相关检测
        "array-bracket-newline": 0,
        "array-element-newline": 0,
      },
    },
  ],
}
