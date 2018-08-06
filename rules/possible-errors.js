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

    // 不允许在 `new Promise` 时传入 async 函数，虽然语法允许，但通常这是不需要的且易导致出错
    "no-async-promise-executor": 2,

    // 不允许在循环中使用 await，因为在每个循环中使用 await 无法充分利用异步并行的特性
    // 建议将所有的 await 给 `Promise.all` 统一 await
    "no-await-in-loop": 2,

    // 不允许针对 `-0` 比较，因为 `+0 === -0` 返回 true
    // 如果想判断 -0，需要用 `Object.is(x, -0)`
    "no-compare-neg-zero": 2,

    // 不允许在条件语句中使用赋值语句，如 `if (x = 1)`
    "no-cond-assign": [2,
      // always: 任何情况都不允许
      // except-parens: 如果赋值语句独立被括号包裹，则允许，如：`if ((x = 1))`
      "always",
    ],

    // 不允许有 console
    "no-console": isProd ? 1 : 0,

    // 不允许在条件语句中使用静态判断，如 `if (true)`
    "no-constant-condition": 2,

    // 不允许在正则中使用控制字符(ASCII 0~31)，如 `new RegExp("\x1f")`
    "no-control-regex": 2,

    // 不允许有 debugger
    "no-debugger": isProd ? 2 : 0,

    // 不允许有重复的函数参数名，如 `function foo (a, b, a)`
    "no-dupe-args": 2,

    // 不允许有重复的对象 key，如 `const obj = { foo: 1, foo: 2 }`
    "no-dupe-keys": 2,

    // 不允许有重复的 switch case 语句值，如 `switch { case foo: bar; case foo: baz }`
    "no-duplicate-case": 2,

    // 不允许使用空的语句块，如 `if (foo) {}`
    "no-empty": [2,
      {
        // 允许空的 catch 语句
        "allowEmptyCatch": true,
      },
    ],

    // 不允许在正则使用空字符类，如 `var foo = /^abc[]/`
    "no-empty-character-class": 2,

    // 不允许覆写 catch 语句的参数，如 `try {} catch (e) { e = 10 }`
    "no-ex-assign": 2,

    // 不允许在条件判断语句中使用不必要的布尔转换，如 `if (!!foo)`
    // 因为在条件判断语句中本身就会隐式转换
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

    // 不允许使用有误导性的字符串
    // 一些 Unicode 表情字符是使用两个字符拼接在一起生成的，但是在正则中这些字符会被分别匹配
    "no-misleading-character-class": 0,

    // 不允许直接调用 `Math(), JSON()`
    "no-obj-calls": 2,

    // 不允许直接调用对象实例内建的原型方法，包括 `hasOwnProperty`, `isPrototypeOf`, `propertyIsEnumerable`，因为使用 `Object.create()` 可以给对象一个特别的 prototype
    // 所以建议使用对象的构造函数上的方法，如使用 `{}.hasOwnProperty.call(foo, 'bar') 代替 `foo.hasOwnProperty('bar')`
    "no-prototype-builtins": 2,

    // 不允许在正则中使用连续多个空格，而要用数量限定，如 `/foo {3}bar/`
    "no-regex-spaces": 2,

    // 不允许在数组中有多个连续逗号，如 `['foo',,'bar']`
    "no-sparse-arrays": 2,

    // 不允许在字符串里使用模板字符串变量格式，如 `const str = 'foo${bar}'`
    // 避免本应该使用模板字符串，结果使用了引号，导致模板字符串逻辑未生效
    "no-template-curly-in-string": 2,

    // 不允许多行歧义，在不使用分号的情况下容易出现
    "no-unexpected-multiline": 2,

    // 不允许在 return, throw, break, continue 后再有语句
    "no-unreachable": 2,

    // 不允许在 finally 中使用 return, throw, break, continue 等语句，因为会先于 try 执行
    "no-unsafe-finally": 2,

    // 在 in/instanceof 操作符前使用否定语句时要使用括号，如 `if (!(foo in bar))`
    "no-unsafe-negation": 2,

    // 在 await/yield 语句中，不允许即读又写同一变量
    // 如 `foo += await getValue(bar)`，此语句会先读取 `foo` 再异步等待 `getValue` 结果，可能等待过程中 `foo` 会被修改
    // 要避免此类问题，只需将读与写分开，如 `value = await getValue(bar); foo += value`
    "require-atomic-updates": 2,

    // 使用 `isNaN(foo)` 来判断 `NaN`，而不是 `foo == NaN`
    "use-isnan": 2,

    // 检查 JSDoc 语法注释，及其正确性，此规则仅在有 JSDoc 注释时检查，如果没有相关注释不会报错
    "valid-jsdoc": [1,
      {
        // 为了注释的一致性，对于有别名的注释给出倾向选项。如 `@param` 有两个别名： `@arg`, `@argument`
        "prefer": {
          // key 为要被替换的别名，value 为倾向的值
          "arg": "param",
          "argument": "param",
          "returns": "return",
          "class": "constructor",
        },
        // 在指定变量类型时，倾向于使用哪种方式来表示，如 `object` 还是 `Object`
        "preferType": {
          // key 为要被替换的别名，value 为倾向的值
          // 建议简单类型使用小写，引用类型使用大写
          "Boolean": "boolean",
          "Number": "number",
          "String": "string",
          "object": "Object",
          "array": "Array",
        },
        // 检测注释描述（一般为块注释的第一行，并不一定要是 `@desc`）是否符合某种格式，此项值为一个可构建正则的字符串
        "matchDescription": ".+",
        // 是否必须要有参数类型
        "requireParamType": false,
        // 是否必有要有参数描述
        "requireParamDescription": false,
        // 是否必须要有返回值说明（`@return` 或 `@returns`）
        "requireReturn": false,
        // 是否必须要有返回值类型
        "requireReturnType": false,
        // 是否必须要有返回值描述
        "requireReturnDescription": false,
      },
    ],

    // 检查 typeof 后的拼写正确性，如 `typeof foo === 'nunber'` 会提示 `nunber` 拼写错误
    "valid-typeof": [2,
      {
        // typeof 后只能跟 string，此时 `typeof foo === bar` 将不被允许
        "requireStringLiterals": false,
      },
    ],
  },
}
