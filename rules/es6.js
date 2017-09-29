module.exports = {
  "env": {
    "es6": true,
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
  },

  "rules": {
    // 箭头函数的语句是否使用大括号包裹
    "arrow-body-style": [2,
      // always: 总使用大括号，这样就失去了隐式 return 的能力
      // as-needed: 大于一句时才需要
      // never: 箭头后可能要跟很复杂的表达式，所以不建议选这个
      "as-needed",
      {
        // 如果返回的是对象，是否允许使用小括号包裹的方式，仅 as-needed 时有效，如 `let foo = () => ({x: 1})`
        "requireReturnForObjectLiteral": false,
      },
    ],

    // 箭头函数参数是否一定要用小括号
    "arrow-parens": [2,
      // 大于一个时才需要
      "as-needed",
      {
        // 为了表现一致，当函数体使用 `{}` 包裹时，参数哪怕只有一个，也要用 `()` 包裹
        "requireForBlockBody": true,
      },
    ],

    // 箭头函数的箭头前后是否要有空格
    "arrow-spacing": [2,
      {
        // 箭头前要有空格
        "before": true,
        // 箭头后要有空格
        "after": true,
      },
    ],

    // 检查在继承的 class 的 constructor 里边是否有 `super()` 调用
    "constructor-super": 2,

    // generator 的 * 号前后是否要有空格
    "generator-star-spacing": [2,
      // 此参数可以使用字符串关键字：before, after, both, neigher，分别表示前后有或没有空格
      // 或者使用对象来描述更详细的情况
      {
        // * 号前有空格
        "before": false,
        // * 号后无空格
        "after": true,
        // 匿名函数
        // "anonymous": "neigher",
        // 作为方法时
        // "method": "both",
      },
    ],

    // 不允许 class 定义的名称再被重新赋值
    "no-class-assign": 2,

    // 不允许可能产生混淆的箭头函数，如 `let x = a => 1 ? 2 : 3;`
    "no-confusing-arrow": [2,
      {
        // 是否允许通过括号分隔，如 `let x = (a <= 1 ? 2 : 3)`
        "allowParens": true,
      },
    ],

    // 不允许对 const 变量再有赋值操作
    "no-const-assign": 2,

    // 不允许重复的 class 方法/属性
    "no-dupe-class-members": 2,

    // 不允许重复 import 同一个 module
    "no-duplicate-imports": [2,
      {
        // 包括 export 的情况
        "includeExports": true,
      },
    ],

    // 不允许使用 new 调用 Symbol，因为 Symbol 是被当作函数进行调用的
    "no-new-symbol": 2,

    // 不允许 import 受限制的 module
    "no-restricted-imports": [0,
      // 不被允许 import 的 module 都在后边列出
      // "jquery", "fs",
    ],

    // 不允许在 super 前使用 this
    "no-this-before-super": 2,

    // 不允许不必要的动态对象值
    "no-useless-computed-key": 2,

    // 不允许不必要的 constructor，如果 constructor 什么都没干，就不需要写
    "no-useless-constructor": 2,

    // 不允许不必要的重命名
    "no-useless-rename": [2,
      {
        // import 中是否允许，如 `import { foo as foo } from "bar";`
        "ignoreImport": false,
        // export 中是否允许，如 `export { foo as foo }`
        "ignoreExport": false,
        // 变量解构中是否允许，如 `let { foo: foo } = bar`
        "ignoreDestructuring": false,
      },
    ],

    // 只使用 let/const，不使用 var
    "no-var": 2,

    // 更简洁的对象定义方案，如 `let foo = { bar, baz, xx() {} }`
    "object-shorthand": [2,
      // always: 总是要求简写形式
      // properties: 只检查对象的属性，如 `let foo = { bar }`
      // methods: 只检查对象的方法，如 `let foo = { bar() {} }`
      // never: 一律不允许简写形式
      // consistent: 对象中各项统一，或者都简写，或者都不简写
      // consistent-as-needed: 对象中各项如果可以都简写，那必须简写
      "always",
      {
        // 不允许简写需要加引号的 key，如 `let foo = { 'bar-baz'() {} }`
        "avoidQuotes": true,
        // 忽略构造函数，这个没太看懂
        "ignoreConstructors": true,
        // 如果对象方法是箭头函数，则不使用简写形式，如果非箭头函数，则要使用简写形式
        "avoidExplicitReturnArrows": true,
      },
    ],

    // 在回调函数中必要时建议使用箭头函数
    "prefer-arrow-callback": [2,
      {
        // 允许命名函数
        "allowNamedFunctions": false,
        // 允许在函数中使用 this
        "allowUnboundThis": true,
      },
    ],

    // 如果 let 定义的变量未被修改过，提示使用 const
    "prefer-const": [2,
      {
        // 对于解构定义的变量如何对待，值可以为以下值
        // any: 任意一个解构出的值未被改变，则提示
        // all: 如果一个值在后边改变了，则不提示
        "destructuring": "all",
        // 如果先定义再赋值，但赋值后未被更改，是否提示，此项可能会与 no-use-before-define 规则有冲突
        "ignoreReadBeforeAssign": true,
      },
    ],

    // 建议使用 数组/对象... 的解构语法
    "prefer-destructuring": [2,
      // 第一个参数用于分别定义 array 和 object 是否建议，第一个参数有两种定义方式，选其一
      // 1. 直接针对 array/object 进行定义
      {
        // 数组的解构，`var [foo, bar] = array`
        "array": true,
        // 对象的解构，`var {foo, bar} = object`
        "object": true,
      },
      // 2. 针对更细分的情况进行定义
      // {
      //   // 当定义变量时是否要解构，如 `var { foo } = bar`
      //   "VariableDeclarator": {
      //     "array": true,
      //     "object": true,
      //   },
      //   // 当定义表达式时是否要解构，如 `{ foo } = bar`
      //   "AssignmentExpression": {
      //     "array": true,
      //     "object": true,
      //   }
      // },

      // 第二个参数目前只有一个属性，见下
      {
        // 重命名对象属性名时，是否要使用解构语法，如：`var {foo: bar} = object` 或 `var bar = object.foo`
        "enforceForRenamedProperties": false,
      },
    ],

    // ES2015 规定了 2、8、16 进制数字的字面量表示方式，所以如果使用 parseInt 转换 2、8、16 进制数字时，给出直接使用数字字面量的提示，不建议再使用 parseInt 进行转换
    "prefer-numeric-literals": 2,

    // 使用 Reflect 方案，而不是原来 Object 上的方法
    // 目前大家对 Reflect 还没推广起来，所以先关掉此检查项
    "prefer-reflect": [0,
      {
        // 一些仍可以使用的方法
        "exceptions": [
          "apply",
          "call",
          "defineProperty",
          "getOwnPropertyDescriptor",
          "getPrototypeOf",
          "setPrototypeOf",
          "isExtensible",
          "getOwnPropertyNames",
          "preventExtensions",
          "delete",
        ],
      },
    ],

    // 建议使用 `...args` 来替代 arguments
    "prefer-rest-params": 2,

    // 建议在函数调用时使用解构方案，如 `Math.max(...nums)`
    "prefer-spread": 2,

    // 有字符串拼接时，建议使用模板字符串
    "prefer-template": 2,

    // 要求在 generator 里必须有 `yield`
    "require-yield": 2,

    // 对象的 rest 解构与扩展运算符，与后边的表达式间是否要有空格，如 `{... foo} = bar`
    "rest-spread-spacing": [2,
      // 可选 never 或 always
      "never",
    ],

    // import 时的顺序
    "sort-imports": [0,
      {
        // 忽略大小写
        "ignoreCase": true,
        // 忽略解构时每一项的排序
        "ignoreMemberSort": false,
        // 具体的排序规则
        "memberSyntaxSortOrder": [
          // 不需要赋值的 import，如 `import './base'`
          "none",
          // 使用 * 号语法的 import，如 `import * as foo from 'bar'`
          "all",
          // 引用某个或某几个方法的，如 `import { foo } from 'bar'`
          "multiple",
          // 引用 default 的，如 `import foo from 'bar'`
          "single",
        ],
      },
    ],

    // Symbol 需要描述，如 `let foo = Symbol('some description')`
    "symbol-description": 2,

    // 模板字符串表达式与大括号间是否要有空格，`${exp}` 或 `${ exp }`
    "template-curly-spacing": [2,
      // 可选 never 或 always
      "never",
    ],

    // yield 的 * 号前后是否要有空格，参考 generator-star-spacing 规则
    "yield-star-spacing": [2,
      // 分别定义 * 号前后的情况
      {
        "before": false,
        "after": true,
      },
    ],
  },
}
