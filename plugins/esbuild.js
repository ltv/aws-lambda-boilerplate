const path = require('path')
const { nodeExternalsPlugin } = require('esbuild-node-externals')

const mainPkgPath = path.resolve(__dirname, '..', 'package.json')
const corePkgPath = path.resolve(__dirname, '..', 'functions/core/nodejs/package.json')

module.exports = (serverless) => {
  const functions = Object.values(serverless.service.functions)

  const packagePath = functions.map(({ handler }) => path.dirname(handler) + '/package.json')
  const externals = nodeExternalsPlugin({
    packagePath: [...packagePath, mainPkgPath, corePkgPath],
    allowList: ['lodash'],
  })
  return [externals]
}
