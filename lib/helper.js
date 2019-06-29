module.exports = {
  // 判断当前开发环境，方便规则中根据环境做出判断
  // 包括不带引号及带引号的字符串：`production`, `prod`, `"production"`, `"prod"`, `'production'`, `'prod'`
  isProd: (/^["']?prod(?:uction)?["']?$/i).test(process.env.NODE_ENV),
}
