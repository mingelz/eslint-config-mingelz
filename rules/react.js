/**
 * React & JSX 相关的配置
 *
 * 请先安装依赖：`npm install eslint-plugin-react --save-dev`
 * 文档：https://github.com/yannickcr/eslint-plugin-react
 */

module.exports = {
  "plugins": ["react"],

  // TODO：待完善
  "rules": {
    // 根据数组生成组件时，如果没有添加 key 给出提示
    "react/no-array-index-key": 2,

    // 检测 React 是否被正常引用，因为只有 JSX 语法的文件中，才需要引用 React
    "react/jsx-uses-react": 2,

    // 检测 JSX 定义的模块是否未被使用
    "react/jsx-uses-vars": 2,
  },
}
