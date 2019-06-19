/**
 * 请谨记：不要无谓追求某条规则的「正确性」，而应该保证项目风格的一致性
 *
 * 所以，此项目的规则肯定无法满足每个人的要求，我们也无需试图「纠正」他人的习惯
 * 建议你 Fork 此项目并根据自己的偏好做出修改
 */

module.exports = {
  // 标记此节点是否为最终文件，不再向父节点查找配置文件
  // 如果在项目里建议设置为 true，如果是对外输出的配置则设置为 false
  // "root": true,

  // 扩展检测方案
  // 可以是官方提供的如 `eslint:recommended`
  // 可以是成熟的方案 `eslint-config-airbnb-base`，使用时可以把 `eslint-config-` 前缀去掉
  // 也可以是自己写的一个符合规则的文件，就如下边这样
  "extends": [
    "./rules/possible-errors",
    "./rules/best-practices",
    "./rules/strict-mode",
    "./rules/variables",
    "./rules/node-commonjs",
    "./rules/stylistic-issues",
    "./rules/es6",
  ].map(require.resolve),

  // 插件，可为 ESLint 提供额外的能力，如 eslint-plugin-react 等，使用时可以把 `eslint-plugin-` 前缀去掉
  // "plugins": [],

  // 共享数据配置，主要是提供给自定义规则使用
  // "settings": {},

  // 代码可能运行的环境，会根据设置添加相关的全局变量（如 `browser: true` 后就不会报 `window` 未定义了）
  // 请根据自己的项目需要，在项目 `.eslintrc.js` 文件中添加相应的 env
  // 除了下边列出的三项，还有众多的配置可选，如 `jest`, `mocha`, `jquery` 等，可参考 https://eslint.org/docs/user-guide/configuring#specifying-environments
  // "env": {
  //   "browser": true,
  //   "node": true,
  //   // ES6 中相关的全局变量，如 `Set`
  //   // 请注意：此选项会默认支持 ES6 的语法，但如果仅想使用 ES6 及以上的语法而不想使用新全局变量，则应该在 parserOptions 中配置
  //   "es6": true,
  // },

  // 全局变量
  // key 对应全局变量的变量名，值对应此全量变量的检测状态，建议不使用布尔值，因为可读性差
  // "globals": {
  //   // true/"writeable"/"writable": 表示此变量可被覆盖
  //   "foo": "writable",
  //   // false/"readable"/"readonly": 表示此变量只读，不可被覆写
  //   "bar": false,
  //   // "off": 表示此变量不可用于全量变量，一般用于关闭某默认存在的全局变量
  //   "Promise": "off",
  // },

  // 设置源码解析器，及设置解析器的配置项
  // 默认解析器为 Espree, 另有 Esprima, Babel-ESLint 等，可参考 https://eslint.org/docs/user-guide/configuring#specifying-parser
  // "parser": 'espree',
  "parserOptions": {
    // 可以使用 ES 版本号或年份表示，如 3/5/6/7/8/9... 或 2015(6)/2016(7)/2017(8)/2018(9)...，此项受 `env.es6` 配置的影响
    "ecmaVersion": 2018,
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
    },
  },

  // 规则，在使用了上述的 extends 外，如果还有不满意，可以写在这里覆盖默认设置，可参考 https://eslint.org/docs/rules/
  // "rules": {},

  // 针对某些文件的特殊定义，比如单独配置测试文件的运行环境变量
  // 可以参考本项目的 `.eslintrc.js` 文件，用到了 overrides 配置
  // "overrides": [
  //   // overrides 是数组，这只是一项，可以加多项配置
  //   {
  //     // 要覆盖匹配的文件
  //     "files": [
  //       "test/**/*.spec.js",
  //       "src/**/*.spec.js",
  //     ],
  //     // 需要覆盖的字段
  //     "env": {
  //       "mocha": true,
  //     },
  //   },
  // ],
}
