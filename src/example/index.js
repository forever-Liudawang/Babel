const babel = require('@babel/core');
const fs = require('fs');
const path = require('path');
const insertParamePlugin = require("./plugin")
const oldContent = fs.readFileSync(path.resolve(__dirname, "./package.json"));
//  强行转换成js文件
const addContent = 'let b=' + oldContent + ';exports.b = b;';
//  通过babel处理替换，替换内容
const newContent = babel.transformSync(addContent, {
    plugins: [insertParamePlugin]
}).code;
//  生成中介文件
fs.writeFileSync(path.join(__dirname,'./tempFile.js'), newContent, 'utf8');
function writeFinalFile() {
    const json = require('./tempFile.js').b;
    //  生成最终的结果
    fs.writeFileSync(path.join(__dirname,'./package.json'), JSON.stringify(json), 'utf8');
    fs.unlinkSync(path.join(__dirname,'./tempFile.js'))
}
writeFinalFile();
