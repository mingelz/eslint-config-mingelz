/**
 * Vue 相关的配置
 *
 * 请先安装依赖：`npm install eslint-plugin-vue --save-dev`
 * 文档：https://github.com/vuejs/eslint-plugin-vue
 */

module.exports = {
  "plugins": ["vue"],

  // TODO：待完善
  "rules": {
    // 因为 Vue / Vuex 是双向数据绑定，经常会对数据或参数做更新，所以关闭此检测
    "no-param-reassign": 0,
  },
}
