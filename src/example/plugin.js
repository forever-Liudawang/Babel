//  要小心循环引用，超过迭代次数还没有出来就会自动停止，而且不会报错
module.exports = function (babel) {
    const { types: t } = babel;
    return {
        pre(state){
            console.log("pre=====>>>>")
        },
        visitor: {
            //  捕捉对象属性
            //  t表示的是type,也就是各种属性，要对节点做操作，需要对path做处理，相关api在@babel/traverse里面，市面上几乎没有文档
            ObjectProperty(path) {
                //  遍历所有的对象属性
                const node = path.node;
                //  定位到key为ppp的对象属性
                if (node.key.value === 'dependencies') {
                    //t.objectProperty表示构造一个对象属性节点
                    //  插入节点
                    // path.insertAfter(t.objectProperty(t.identifier('load'), t.nullLiteral()));
                    //  删除节点
                    // path.remove();
                    path.traverse({
                        ObjectProperty(path){
                            path.remove()
                        }
                    })
                    // path.replaceWith(t.arrayExpression([]))
                }
            }
        },
        post(){
            console.log('after')
        }
    };
};