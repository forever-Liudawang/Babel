/**
 * 调用自定义插件
 */
const {transformFileSync} = require("@babel/core")
const path = require("path")

const insertParamePlugin = require("./plugin")
const {code} = transformFileSync(path.join(__dirname,'./sourceCode.js'),{
    plugins:[insertParamePlugin],
    parserOpts:{
        sourceType:'unambiguous',
        plugins: ['jsx']       
    }
})
console.log('code', code)