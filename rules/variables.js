/**
 * @file 变量定义
 * @desc 此文件中的配置项，是变量定义有关的检测
 */

module.exports = {
  "rules": {
    // 定义变量的时候需要赋初始值
    "init-declarations": [0,
      // always: 总需要有初始值
      // never: 除了 `const` 之外，定义时不应该有初始值
      "always",
      // 当设置为 never 时，可以增加下边的配置项，因为在 `for` 中定义循环变量的初始值是很经典的用法
      // {
      //   "ignoreForLoopInit": true,
      // },
    ],

    // 在 IE8 中 catch 参数名会扩散到外部作用域，所以禁止 catch 的参数名与外部定义的变量名一样
    "no-catch-shadow": 0,

    // 不允许使用 delete 删除使用 var 定义的变量
    "no-delete-var": 2,

    // 不允许 label 的名字与变量名相同
    "no-label-var": 2,

    // 不允许使用的全局变量名，可参考 https://www.npmjs.com/package/eslint-restricted-globals
    "no-restricted-globals": [2,
      // 后边跟的每一项，都表示一个变量名
      // 即可以是字符串格式，表示变量名
      "error",
      // 也可以是对象格式，用来自定义出错信息
      {
        "name": "event",
        "message": "在 IE 下有全局的 event 事件，最佳实践建议仅调用局部的 event 变量",
      },
    ],

    // 不允许在子作用域中定义与外部作用域同名的变量
    "no-shadow": [2,
      {
        // 是否可定义与内置方法/属性同名变量
        "builtinGlobals": false,
        // 当子作用域在前时，是否可被后边的定义覆盖，可以为 functions, all, never
        // functions: 如果后边是 function 则提示出错
        // all: 后边是 var/let/const 的变量，也提示出错
        // never: 不报错
        "hoist": "functions",
        // 要排除的关键字
        "allow": [],
      },
    ],

    // 不允许定义的方法名与已有方法相同
    "no-shadow-restricted-names": 2,

    // 不允许使用未定义变量
    "no-undef": [2,
      {
        // 是否针对 typeof 后跟的变量做检测
        "typeof": false,
      },
    ],

    // 不允许定义一个变量的初始值为 undefined，因为不指定就是 undefined
    "no-undef-init": 2,

    // 是否可以使用 undefined 字面量
    // 在 ES3 中 undefined 可被覆写，建议使用 `typeof foo === 'undefined'`，而不是 `foo === undefined`
    "no-undefined": 2,

    // 检测是否有未被使用的变量和函数
    // 额外的，如果配置文件中有如下定义，可以使用 `/* exported foo */` 来表示 `foo` 变量要被用于外部，可以被定义而不报错
    //    1. "env" 中指定了 `node` 或 `commonjs`
    //    2. "parserOptions.sourceType" 为 `module`
    //    3. "ecmaFeatures.globalReturn" 为 `true`
    "no-unused-vars": [1,
      {
        // 检测范围
        // all: 检测所有变量的使用情况
        // local: 仅检测局部作用域下的变量
        "vars": "all",
        // 可被忽略的未使用变量匹配正则
        "varsIgnorePattern": "^_",
        // 函数参数检测
        // alter-used: 参数在未使用前也被认为是未使用变量
        // all: 所有参数必须要求都被使用
        // none: 不检测函数参数
        "args": "after-used",
        // 可被忽略的未使用参数匹配正则
        "argsIgnorePattern": "^_",
        // 参数解构时，同级变量是否忽略未定义判断，如 `var {foo, ...bar} = data`，此时 foo 只为解构 bar 的同级变量
        "ignoreRestSiblings": true,
        // catch 参数
        // none: 不检测 catch 参数
        // all: catch 的参数要求一定被使用
        "caughtErrors": "none",
        // 可被忽略的未使用的 catch 参数匹配正则
        "caughtErrorsIgnorePattern": "",
      },
    ],

    // 变量与函数需要先定义再使用
    "no-use-before-define": [2,
      {
        // 分别针对函数、类、变量定义是否检查
        "functions": true,
        "classes": true,
        "variables": true,
      },
    ],
  },
}
