module.exports = {
  "env": {
    "node": true,
  },

  "rules": {
    // Node.js 编程中，建议回调函数调用后都通过 return 返回
    "callback-return": [0,
      // 要求的回调函数名称在下边数组中列出
      [
        "callback",
        "cb",
        "next",
        "success",
        "failure",
      ],
    ],

    // require 都在代码最前边完成
    "global-require": 2,

    // 参数标记有 err 时，回调中要有相应的错误处理逻辑
    "handle-callback-err": [2,
      // 参数需要符合以下正则匹配逻辑：err, error, Err, Error
      "^(e|E)rr(or)?$",
    ],

    // Buffer 的构造方法已经不推荐使用，比较复杂且有安全隐患
    // 建议使用 Buffer 的方法：`Buffer.form`, `Buffer.alloc`, `Buffer.allocUnsafe`
    "no-buffer-constructor": 2,

    // 禁止 require 和 其他变量声明混合使用
    // 建议书写时尽量把 require 当 import 用
    "no-mixed-requires": [2,
      {
        // require 是否要按不同引用类型分组。
        // require 分 4 种引用类型：核心模块如 fs、node_modules 如 jquery、文件如 `./utils`、计算值如 `require(getName())`
        "grouping": false,
        // 是否允许在引用时直接调用，如 `var foo = require(bar)(xxx)`
        "allowCall": false,
      },
    ],

    // 不允许在调用 require 时使用 new 构建它，建议分两行写
    "no-new-require": 2,

    // 不允许使用 __dirname 和 __filename 做字符串拼接，建议使用 path 模块
    "no-path-concat": 2,

    // 不在 Node 下使用 `process.env` 获取环境变量
    // 因为 `process.env` 会随环境变化，建议通过配置文件来保证所依赖数据的稳定性
    // 实际项目中，使用 `process.env` 本身就是为了获取环境信息，所以不太用管这一条
    "no-process-env": 0,

    // 不允许使用 `process.exit()`
    // 因为它太危险会退出 Node 环境，建议使用抛异常的方式处理错误逻辑，除非真的在项目的最后需要返回给 Shell 结果
    "no-process-exit": 0,

    // 禁用某些 Node.js 模块
    "no-restricted-modules": [0,
      // 不允许使用的 Node 模块名称
      // "fs", "assert",
    ],

    // 禁用同步的方法，因为 Node.js 是以异步见长的，高并发下同步方法会带来问题
    "no-sync": [0,
      {
        // 在最外层是否允许
        "allowAtRootLevel": true,
      },
    ],
  },
}
