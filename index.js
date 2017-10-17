/**
 * 请谨记：不要无谓追求某条规则的正确性，而要保证项目风格的一致性
 *
 * 所以，此项目的规则肯定无法满足每个人的要求，我们也无需试图「纠正」某个人的习惯
 * 建议你 Fork 此项目并根据自己的偏好做出修改
 */

module.exports = {
  // 标记此节点是否为最终文件，不再向父节点查找配置文件
  // 如果在项目里建议设置为 true，如果是对外输出的配置则设置为 false
  // "root": true,

  // 扩展检测方案
  // 可以是官方提供的如 `eslint:recommended`
  // 可以是成熟的方案 `eslint-config-airbnb-base`
  // 当然，也可以是自己写的一个符合规则的文件，就如当前项目这样
  "extends": [
    "./rules/possible-errors",
    "./rules/best-practices",
    "./rules/strict-mode",
    "./rules/variables",
    "./rules/node-commonjs",
    "./rules/stylistic-issues",
    "./rules/es6",
  ].map(require.resolve),

  // 插件，可为 ESLint 提供额外的能力，如 eslint-plugin-react 等
  // plugins: [],

  // 共享数据配置，主要是提供给自定义规则使用
  // settings: {},

  // 代码可能运行的环境，及全局变量定义
  // 建议根据自己的项目需要，在自己的 eslintrc 文件中添加相应的 env
  // 除了下边列出的三项，还有众多的配置可选，如 `jest`, `mocha`, `jquery` 等，可参考 https://eslint.org/docs/user-guide/configuring#specifying-environments
  // "env": {
  //   "browser": true,
  //   "node": true,
  //   // ES6 特性，这个设置会修改 parserOptions.ecmaVersion 配置项为 6
  //   // 请特别注意，如果你的项目使用了 ES6 以上的语法，请不要设置此 es6 项，而应使用下边的 ecmaVersion 来指定
  //   "es6": true,
  // },

  // 全局变量
  // 只要 key 存在，就表示全局变量存在，对应的 value 表示此变量是否可被覆写
  // globals: {
  //   // 值为 true，表示此变量可被覆写
  //   foo: true,
  //   // 值为 false，表示此变量不可被覆写
  //   bar: false,
  // },

  // 设置源码解析器，及设置解析器的配置项
  // 默认解析器为 Espree, 另有 Esprima, Babel-ESLint 等，可参考 https://eslint.org/docs/user-guide/configuring#specifying-parser
  // parser: 'espree',
  "parserOptions": {
    // 可以使用 ES 版本号或年份表示，如 3/5/6/7/8... 或 2015/2017...，此项受 `env.es6` 配置的影响
    "ecmaVersion": 2017,
    // 源码模式，默认为 `script`，如果使用 ES Module，则设置为 `module`
    "sourceType": "module",
    // 针对一些特性支持情况
    "ecmaFeatures": {
      // 允许在全局作用域下使用 return 语句
      "globalReturn": false,
      // 启用全局 strict mode，仅在 ES2015 以上有效
      "impliedStrict": false,
      // 启用 JSX 支持
      "jsx": false,
      // 启用 Object Rest/Spread 支持，这是一个 ES2016 中的实验性功能，但好用到爆
      "experimentalObjectRestSpread": true,
    },
  },

  // 规则，在使用了上述的 extends 外，如果还有不满意，可以写在这里覆盖默认设置，可参考 https://eslint.org/docs/rules/
  // "rules": {},

  // 针对某些文件的特殊定义，比如单独配置测试文件的运行环境变量
  // "overrides": [
  //   // overrides 是数组，这只是一项，可以加多项配置
  //   {
  //     // 要覆盖匹配的文件
  //     "files": [
  //       "test/**/*.spec.js",
  //       "src/**/*.spec.js"
  //     ],
  //     // 需要覆盖的字段
  //     "env": {
  //       "mocha": true,
  //     },
  //   },
  // ],
}
