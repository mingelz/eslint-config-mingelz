const fs = require('fs')
const path = require('path')
const semverMinVersion = require('semver/ranges/min-version')

module.exports = {
  // 判断当前开发环境，方便规则中根据环境做出判断
  // 包括不带引号及带引号的字符串：`production`, `prod`, `"production"`, `"prod"`, `'production'`, `'prod'`
  isProd: (/^(["']?)prod(?:uction)?\1$/i).test(process.env.NODE_ENV),

  // 获取项目依赖的版本
  getDepVersion (name, checkDevDeps) {
    let filePath = __dirname
    const { root } = path.parse(filePath)

    // 一级级查找对应目录的 package.json
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // 向上追一级
      filePath = path.join(filePath, '..')

      // 尝试查找并解析对应目录的 package.json
      try {
        const file = path.join(filePath, 'package.json')
        const pkg = JSON.parse(fs.readFileSync(file, 'utf-8'))

        let version = (pkg.dependencies || {})[name]
        if (!version && checkDevDeps) {
          version = (pkg.devDependencies || {})[name]
        }

        // 有 version 则解析并返回，否则进下一循环
        if (version) {
          return semverMinVersion(version)
        }
      }
      catch (e) {}

      // 如果已经追到了根目录还没有，则退出
      if (filePath === root) {
        return semverMinVersion('0')
      }
    }
  },
}
