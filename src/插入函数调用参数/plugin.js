/**
 * 改成插件
 */
//插件通用形式
// module.exports = function (api, options) {
//     return {
//         visitor: {
//             Identifier(path, state) {},
//         },
//     };
// }
const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);

module.exports = function ({
    types,
    template
}){
    return {
        visitor:{
            CallExpression(path, state) {
                if(path.node.isNew){
                    return
                }
                const callee = path.get('callee').toString()
                if (targetCalleeName.includes(callee)) {
                    const {
                        line,
                        column
                    } = path.node.loc.start;
                    const newNode = template.expression(`console.log(${line},${column})`)();
                    newNode.isNew = true;
                    if (path.findParent(path => path.isJSXElement())) {
                        path.replaceWith(types.arrayExpression([newNode, path.node]))
                        path.skip()
                    } else {
                        path.insertBefore(newNode)
                    }
                }
            },
        }
    }
}