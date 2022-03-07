const parse = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const types = require("@babel/types")
const template = require("@babel/template")
/**
 * 在console.log之前插入
 */
const sourceCode = `
console.log(1);

function func() {
    console.info(2);
}

export default class Clazz {
    say() {
        console.debug(3);
    }
    render() {
        return <div>{console.error(4)}</div>
    }
}
`;
const ast = parse.parse(sourceCode, {
    sourceType: "unambiguous",
    plugins: ['jsx']
});
const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);
traverse(ast, {
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
});
const {
    code,
    map
} = generate(ast);
console.log("code", code);