module.exports = {
  "rules": {
    // 定义变量的时候需要赋初始值
    "init-declarations": [0,
      "always",
    ],

    // 在 IE8 中 catch 参数名会扩散到外部作用域，所以禁止 catch 的参数名与外部定义的变量名一样
    "no-catch-shadow": 0,

    // 不允许使用 delete 删除使用 var 定义的变量
    "no-delete-var": 2,

    // 不允许 label 的名字与变量名相同
    "no-label-var": 2,

    // 不允许调用全局变量名，可参考 eslint-restricted-globals
    "no-restricted-globals": [2,
      // 后边跟的数组的每一项，都表示一个变量名
      "error",
      // 也可以自定义出错信息
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
    // undefined 可被覆写，建议使用 `typeof foo === 'undefined'`，不要使用 `foo === undefined`
    "no-undefined": 2,

    // 检测是否有未被使用的变量和函数
    "no-unused-vars": [1,
      {
        // 检测所有的变量的使用情况，还是仅检测局部作用域下的变量
        "vars": "all",
        // 可被忽略的未使用变量匹配正则
        "varsIgnorePattern": "^_",
        // 函数参数在未使用前也被认为是未使用变量
        "args": "after-used",
        // 可被忽略的未使用参数匹配正则
        "argsIgnorePattern": "^_",
        // catch 参数
        "caughtErrors": "none",
        // 可被忽略的未使用的 catch 参数匹配正则
        "caughtErrorsIgnorePattern": "",
        // 参数解构时，同级变量是否判断为未定义，如 `var {foo, ...bar} = data`，此时 foo 只为解构 bar 的同级变量
        "ignoreRestSiblings": true,
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
