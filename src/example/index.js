const fs = require('fs')
const path = require('path')
const result = JSON.parse(fs.readFileSync(path.reslove(__dirname,"./package.json")))
console.log('result', result)