/**
 * @file 最佳实践
 * @desc 此文件中的配置项，均为社区及个人最佳实践总结
 */

const { isProd } = require("../lib/helper")

module.exports = {
  "rules": {
    // 需要同时提供 getter/setter 方法
    "accessor-pairs": 0,

    // 在数组的递归回调函数中需要有 return，避免写 map/reduce 等方法时最后忘记加 return
    "array-callback-return": [2,
      {
        // 是否允许隐式的 `return`，即 `return` 后没有值
        "allowImplicit": false,
      },
    ],

    // 避免变量影响到语句块外（类C）`if (foo) { var bar = 1 }`
    // 因为 var 无块作用域，所以建议使用 let/const
    "block-scoped-var": 2,

    // 检查 Class 中的方法是否用到了 `this`，如果没用到建议转为 static 方法
    "class-methods-use-this": [2,
      // {
      //   // 以下方法名可以不调用 `this`
      //   "exceptMethods": [],
      // },
    ],

    // 最多有多少个 `if else`，嵌套太多的话建议拆分
    "complexity": [2,
      // 默认 20
      20,
    ],

    // return 后一定要有值，不能直接写 `return;`
    "consistent-return": [2,
      {
        // 是否允许明确的 `undefined` 值返回
        // 当为 true 时，不允许 `return;`，但允许 `return void 0`
        // 当为 false 时以上两种情况都不允许
        "treatUndefinedAsUnspecified": false,
      },
    ],

    // if, else, while, do, for 后是否需要使用大括号
    // 有些选项是互斥的，请根据情况选择
    "curly": [2,
      // all: 所有情况都要有大括号
      // multi: 当语句多于一句时才需要大括号，如果只有一句则去掉大括号
      // multi-line: 如果只有一句且与 if 等写在同一行，则不需要大括号
      // multi-or-nest: 如果只有一句，则必须与 if 等写在同一行，且不写大括号
      // consistent: 要求 `if/else`, `while/do` 对应的语句块行为一致，要么都加大括号，要么都不加
      //             只有声明了上边任意 `multi*` 项，此项才有意义
      "multi-line",
      "consistent",
    ],

    // switch 中是否必须要有 default
    "default-case": [2,
      {
        // 可使用 `// no default` 来明确表示无 default
        "commentPattern": "^no default$",
      },
    ],

    // 有换行时 `.` 操作符的位置
    "dot-location": [2,
      // object: 跟在 object 后
      // property: 在 property 前
      "property",
    ],

    // 对象属性使用 `.` 获取，而不是 [] 获取
    "dot-notation": [2,
      {
        // 是否允许关键字做 key，如：`foo['class']`
        "allowKeywords": true,
        // 匹配以下规则时，可使用 [] 获取
        // "allowPattern": "",
      },
    ],

    // 使用 `===`
    "eqeqeq": [2,
      // always: 总是使用 `===`
      // smart: 两边无类型转换时，可以使用 `==`，包括：字面量比较、typeof 比较、针对 null 的比较
      "smart",
      // 当前一个设置项为 always 时，可以加此设置项，用来表示是否要忽略针对 null 的判断
      // {
      //   // 可以设置为 always, never, ignore
      //   "null": "ignore",
      // },
    ],

    // 在 `for in` 中过滤原型链继承属性
    "guard-for-in": 2,

    // 每个文件中最多定义几个 Class，最佳实践建议每个文件仅包含一个 Class，多了会降低可维护性
    "max-classes-per-file": [2,
      // 每个文件可包含几个 Class
      1,
    ],

    // 不允许使用 alert, confirm, prompt
    "no-alert": isProd ? 2 : 0,

    // 不允许使用 `arguments.caller` 或 `arguments.callee`，在 strict 模式下已经不支持了
    "no-caller": 2,

    // 不允许在 case 中定义变量和函数，如定义需要用大括号 `case: { let foo = 1 }`
    "no-case-declarations": 2,

    // 不允许看起来像除法的正则字面量： `/=foo/` 中的 `/=` 像是除法运算符，要写成 `/\=foo/`
    "no-div-regex": 0,

    // 如果每个 if 及 if else 中都有 return，则在 else 中不再需要 return，转为在函数最后 return
    "no-else-return": [2,
      {
        // 在 return 后是否可出现 `else if`
        // 因为 `else if` 与前边的 if 并不直接互斥，可能导致 `else if` 中想执行的代码，被前边的 return 阻断了
        "allowElseIf": false,
      },
    ],

    // 不允许空函数，但如果函数中有注释，并不算空函数
    "no-empty-function": [2,
      {
        // 允许空函数出现的地方，内容是个数组，每项都是内置定义好的字符串，具体可参考 https://eslint.org/docs/rules/no-empty-function
        "allow": [
          "arrowFunctions",
          "constructors",
        ],
      },
    ],

    // 不允许空解构模式
    // 出现这种情况多是因为打算写默认值，把 `=` 不小心写成了 `:`，如 `var {foo: {}} = bar` 为空解构，而 `var {foo = {}} = bar` 是设置默认值
    "no-empty-pattern": 2,

    // 不允许使用 `==` 判断 null，而要用 `===`
    "no-eq-null": 2,

    // 不允许使用 `eval()`
    "no-eval": 2,

    // 不允许修改原生对象原型
    "no-extend-native": [2,
      {
        // 例外
        "exceptions": [
          "Object",
        ],
      },
    ],

    // 不允许不必要的 bind。比如函数中并没有使用到 `this`，或者箭头函数中
    "no-extra-bind": 2,

    // 不允许不必要的 label
    "no-extra-label": 2,

    // 每个 case 都要 break，可使用 `// falls through` 强制 fallthrough
    "no-fallthrough": 2,

    // 小数点前后需要用 0 补齐，不允许留空
    "no-floating-decimal": 2,

    // 不允许重定义内建对象（包括 ES5/ES6/Browser/Node 等环境, https://github.com/sindresorhus/globals/）
    "no-global-assign": [2,
      {
        // 例外
        "exceptions": [],
      },
    ],

    // 不允许隐含的类型转换 `!!foo`, `foo * 1`, `foo += ''`，而使用 `Number(foo)`
    "no-implicit-coercion": [0,
      {
        // 是否可以转为指定的类型
        "boolean": true,
        "number": true,
        "string": true,
        "allow": ["!!", "~", "*", "+"],
      },
    ],

    // 不允许有全局的 var 和 function 定义
    "no-implicit-globals": 2,

    // 不允许有隐含 eval，如 `setTimeout("alert(1)", 100)`
    "no-implied-eval": 2,

    // 不允许有不清楚上下文的 this
    "no-invalid-this": 1,

    // 不允许使用 `__iterator__` 属性
    "no-iterator": 2,

    // 不允许使用 label
    "no-labels": 1,

    // 不允许无意义的 `{}` 对
    "no-lone-blocks": 2,

    // 不允许在循环中定义函数
    "no-loop-func": 2,

    // 不允许直接使用常量数字，要先定义再使用
    "no-magic-numbers": 0,

    // 不允许在代码中有连续空格
    "no-multi-spaces": [2,
      {
        // 例外
        "exceptions": {
          // 表达式中 `var foo = 1  +  2`
          "BinaryExpression": false,
          // 对象属性后
          "Property": false,
          // 多行变量定义时的值对齐
          "VariableDeclarator": false,
          // es6 import 的对齐
          "ImportDeclaration": false,
        },
      },
    ],

    // 不允许使用 `\` 转义多行字符串每行结尾，可以使用 ES6 模板字符串代替
    "no-multi-str": 2,

    // new 出的实例一定要赋值给变量
    "no-new": 2,

    // 不允许使用 Function 构造函数
    "no-new-func": 2,

    // 不允许使用原始对象构造实例，因为构造出的对象类型为 object
    // 如：`var str = new String('Hello world'); typeof str === 'object'`
    "no-new-wrappers": 2,

    // 不使用以 0 开头的八进制字面量
    "no-octal": 2,

    // 不对八进制数字做转义，而是使用 Unicode 方式
    "no-octal-escape": 2,

    // 不允许修改函数参数
    "no-param-reassign": [2,
      {
        // 参数的属性是否可被修改
        "props": true,
        // 例外，以下修改不报错，这里参考自 airbnb-base
        "ignorePropertyModificationsFor": [
          // 在 reduce 中，建议将迭代变量命名为 acc
          "acc",
          // 事件或报错
          "e",
          // Koa
          "ctx",
          // Express
          "req",
          "request",
          "res",
          "response",
        ],
      },
    ],

    // 不允许使用 __proto__ 属性
    "no-proto": 2,

    // 不允许对变量重复定义
    "no-redeclare": 2,

    // 不允许使用某些属性名或方法名
    "no-restricted-properties": [2,
      // 每种限制一个对象
      {
        // 使用 `**` 替代 Math.pow
        "object": "Math",
        "property": "pow",
        // 出错时给出的提示文本
        "message": "Use the exponentiation operator (**) instead.",
      },
    ],

    // 不允许 return 后跟表达式
    "no-return-assign": [2,
      // always: 一律不允许
      // except-parens: 除非表达式用括号括起来
      "except-parens",
    ],

    // 不允许无用的 `return await`
    "no-return-await": 2,

    // 不允许使用 `javascript://` 式的URL
    "no-script-url": 2,

    // 不允许自赋值 `foo = foo`
    "no-self-assign": [2,
      {
        // 是否同时检测对象属性的自赋值
        "props": true,
      },
    ],

    // 不允许对比自身，`if (x === x)`
    "no-self-compare": 2,

    // 不允许使用逗号连接多个表达式
    "no-sequences": 2,

    // 不允许 throw 后跟字面量，需要 new Error
    "no-throw-literal": 2,

    // 不允许在循环中不更改循环判断值（避免死循环）
    "no-unmodified-loop-condition": 2,

    // 不允许定义未使用的表达式，比如 `i + 1` 虽然并无语法错误，但是很可能原本是想写 `i += 1`
    "no-unused-expressions": [2,
      {
        // 可以使用 `a && b()` 形式的短表达式
        "allowShortCircuit": false,
        // 允许三元表达式
        "allowTernary": false,
        // 允许标签模板，如：tag`hello`
        "allowTaggedTemplates": false,
      },
    ],

    // 不允许不必要的 label
    "no-unused-labels": 2,

    // 不允许不必要的 .call() 和 .apply()
    "no-useless-call": 2,

    // 不允许不必要的 .catch 从句，比如在里边只是 `catch (e) { throw e }`
    "no-useless-catch": 2,

    // 不允许多个常量字符串拼接，但换行拼接不受影响
    "no-useless-concat": 2,

    // 不允许不必要的转义，`'\"'` 中的转义就是非必要的
    "no-useless-escape": 2,

    // 不允许无用的 return，如在函数最后 `return;` 等
    // 其实绝大多数无用 return 的情况，都与 consistent-return 规则重叠
    "no-useless-return": 2,

    // 不允许使用 void
    "no-void": 2,

    // 不允许注释中出现某些特殊标记关键字，如 TODO, FIXME 等（保证最终产出代码无未尽项）
    // 可约定的关键字很多，最常见的是 TODO, FIXME, XXX，而 Atom 编辑器包含的更全: https://github.com/atom/language-todo
    // 另外推荐参考: https://github.com/JohnPostlethwait/fixme ，其列出的关键字可覆盖常用场景，且有明确的用例说明
    "no-warning-comments": [isProd ? 2 : 1,
      {
        // 不允许出现的关键字列表
        "terms": ["todo", "fixme", "xxx", "bug", "mock"],
        // 关键字出现的位置
        "location": "start",
      },
    ],

    // 不允许使用 with
    "no-with": 2,

    // 建议调用 Promise.reject 时，返回的是 Error 对象，如 `Promise.reject(new Error('Foo'))`
    "prefer-promise-reject-errors": [0,
      {
        // 是否允许空的 `Promise.reject()`
        "allowEmptyReject": false,
      },
    ],

    // 必须传入 parseInt 的第2个参数，否则 parseInt 会根据参数的项判断进制，可能与预期不符
    "radix": 2,

    // 对于 async 一定要有 await 语句
    "require-await": 0,

    // 建议所有正则表达式都添加 `u` 标记，`u` 标记有两个作用：
    // 1. 支持 Unicode 字符，如 `/^[👍]$/u.test('👍')`
    // 2. 取消针对 Annex B extensions 的支持，如 `/\w{1, 2/` 应该报错，但在 Annex B extensions 中会尝试匹配 `a{1, 2` 这个字符串
    "require-unicode-regexp": 0,

    // 所有变量必须放在作用域顶部
    "vars-on-top": 0,

    // 自执行函数括号放在哪里，`(function(){}())` 或 `(function(){})()`
    "wrap-iife": [2,
      // outside: `(function(){})()`
      // inside: `(function(){}())`
      // any: 任意一种都可以，但一定要把函数括起来，不能 `var foo = function(){}()`
      "any",
      {
        // 使用 `call/apply` 调用时是否要包裹函数
        "functionPrototypeMethods": false,
      },
    ],

    // 比较表达式是否需要符合自然语义
    // Yoda 是《星球大战》中的角色，他喜欢反着语序说话（倒装），可参考 https://www.guokr.com/article/441084/
    "yoda": [2,
      // always: 像 Yoda 那样，如 `if ('red' === color)`
      //         Yoda 方案可以避免不小心将判断写成了赋值（只一个等号），因为 `if ('red' = color)` 会报错
      // never: 按照自然语义，如 `if (color === 'red')`
      "never",
      // 仅在前一个设置项为 never 时有意识，如果为 always 就不需要配置了
      {
        // 大小于对比要符合区间性，如：`if (1 < foo && foo < 5)`
        "exceptRange": true,
        // 等于对比变量在左
        "onlyEquality": true,
      },
    ],
  },
}
