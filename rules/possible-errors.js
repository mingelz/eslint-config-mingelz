/**
 * @file 常见的语法或逻辑错误
 * @desc 此文件中的配置项，均为在编码中经常遇到的语法或逻辑出错，如把 == 写成了 = 之类的
 */

const { isProd } = require("../lib/helper")

module.exports = {
  "rules": {
    // 检查 `for` 中语句是否会进入死循环，比如 `for (let i = 10; i > 0; i++)`
    "for-direction": 2,

    // 在 getter 中一定要有 return
    "getter-return": [2,
      {
        // 是否允许直接写 `return;` 来表示返回一个 undefined
        "allowImplicit": false,
      },
    ],

    // 不允许在循环中使用 await，建议将所有的 await 给 `Promise.all` 统一 await
    "no-await-in-loop": 2,

    // 不要针对 `-0` 比较，因为 `+0 === -0` 返回 true
    // 如果确定某个值是否为 -0，需要用 `Object.is(x, -0)`
    "no-compare-neg-zero": 2,

    // 不允许在条件语句中使用赋值语句 `if (x = 1)`
    "no-cond-assign": [2,
      // always: 任何情况都不允许
      // except-parens: 如果赋值语句独立被括号包裹，则允许，如：`if ((x = 1))`
      "always",
    ],

    // 不允许有 console
    "no-console": isProd ? 1 : 0,

    // 不允许在条件语句中使用静态判断 `if (true)`
    "no-constant-condition": 2,

    // 不允许在正则中使用控制字符(ASCII 0~31) `new RegExp("\x1f")`
    "no-control-regex": 2,

    // 不允许有 debugger
    "no-debugger": isProd ? 2 : 0,

    // 函数参数名不允许重复 `function foo (a, b, a)`
    "no-dupe-args": 2,

    // 对象的 key 不允许重复
    "no-dupe-keys": 2,

    // switch case 语句语句的条件不允许重复
    "no-duplicate-case": 2,

    // 不允许使用空的语句块 `if (foo) {}`
    "no-empty": [2,
      {
        // 允许空的 catch 语句
        "allowEmptyCatch": true,
      },
    ],

    // 正则中不允许使用空字符类 `var foo = /^abc[]/`
    "no-empty-character-class": 2,

    // 不允许覆写 catch 语句的参数 `try {} catch (e) { e = 10 }`
    "no-ex-assign": 2,

    // 在条件判断语句中本身就会隐式转换，所以不需要不必要的布尔转换，如：`if (!!foo)`
    "no-extra-boolean-cast": 2,

    // 不允许多余的括号 `var foo = (1 + 2)`
    "no-extra-parens": [2,
      // functions: 仅检测函数表达式的多余括号
      // all: 全部都检查，此时可以用第二个参数调整细节配置
      "functions",
      // 以下配置仅为 all 时有效
      // {
      //   // 条件表达式中：`if ((foo = bar))`
      //   "conditionalAssign": false,
      //   // return 后的表达式：`return (foo = bar)`
      //   "returnAssign": false,
      //   // 是否忽略 JSX，可选值为：none, all, multi-line, single-line
      //   ignoreJSX: 'all',
      //   // 多个二元表达式连写的情况：`foo = a || (b && c)`
      //   "nestedBinaryExpressions": false,
      //   // 箭头函数的条件表达式：`const foo = bar => (baz ? 1 : 2)`
      //   enforceForArrowConditionals: false,
      // },
    ],

    // 不允许多余的分号 `function foo {};`
    "no-extra-semi": 2,

    // 不允许对函数名重新赋值
    "no-func-assign": 2,

    // 不允许在无独立作用域的块语句内声明函数和变量
    "no-inner-declarations": [2,
      // functions: 仅不允许声明函数
      // both: 即不允许声明函数，也不允许声明变量
      "both",
    ],

    // 不允许无效的正则表达式
    "no-invalid-regexp": 2,

    // 不允许普通空格和制表符外的其他非常规空格，如零宽空格、换行符
    "no-irregular-whitespace": 2,

    // 不允许直接调用 `Math(), JSON()`
    "no-obj-calls": 2,

    // 使用 `Object.create()` 可以给对象一个特别的 prototype，所以建议使用 `{}.hasOwnProperty.call(foo, 'bar')，而不是 `foo.hasOwnProperty('bar')`
    "no-prototype-builtins": 2,

    // 在正则中不允许使用连续多个空格，而要用数量限定 `/foo {3}bar/`
    "no-regex-spaces": 2,

    // 数组中需要指定每一项，不允许多个逗号连续出现 `['foo',,'bar']`
    "no-sparse-arrays": 2,

    // 不允许在字符串里使用模板字符串变量格式，避免本应该使用模板字符串，结果使用了引号
    "no-template-curly-in-string": 2,

    // 不允许多行歧义，在不使用分号的情况下容易出现
    "no-unexpected-multiline": 2,

    // 在 return, throw, break, continue 后不允许再有语句
    "no-unreachable": 2,

    // 在 finally 中不允许使用 return, throw, break, continue 等语句，因为会先于 try 执行
    "no-unsafe-finally": 2,

    // in/instanceof 操作符前使用否定语句时要使用括号
    "no-unsafe-negation": 2,

    // 使用 `isNaN(foo)` 来判断 `NaN`，而不是 `foo == NaN`
    "use-isnan": 2,

    // 检查 JSDoc 语法注释，及其正确性
    "valid-jsdoc": [0,
      // 有很多细节配置，因为目前 JSdoc 并非首选的文档工具，所以暂时不做配置
      // {
      // },
    ],

    // 检查 typeof 后的拼写正确性，如：`typeof foo === 'nunber'` 会提示 `nunber` 拼写错误
    "valid-typeof": [2,
      {
        // typeof 后只能跟 string，此时 `typeof foo === bar` 将不被允许
        "requireStringLiterals": false,
      },
    ],
  },
}
