const {codeFrameColumns} = require('@babel/code-frame')

const res = codeFrameColumns("./code.js",{
    start:{line:2,column:1},
    end:{line:2,column:5}
},{
    highlightCode:true,
    message: "出错了"
})
console.log('res', res)

console.log('t', "\e[36;1x;4m")
