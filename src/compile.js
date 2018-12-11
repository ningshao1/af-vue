/* 
    解析模板
    支持 v-on,v-text,v-html,v-show v-if
 */

class compile {
    constructor(el, vm) {
        this.el = typeof el === "string" ? document.querySelector(el) : el;
        this.vm = vm;
        if (this.el) {
            this.node2fragment(this.el);
        }
    }
    node2fragment(node) {
        let fragmentElement = document.createDocumentFragment();
        //把el所有元素添加到documentFragment
        let childrenNode = node.childNodes;
        Array.from(childrenNode).map(v => {
            fragmentElement.appendChild(v);
        });
        this.compile(fragmentElement);
    }
    compile(fragment) {
        let children = fragment.childNodes;
        Array.from(children).map((node, index) => {
            if (this.isElementNode(node)) {
                this.compileElement(node);
            } else if (this.isText(node)) {
            }
        });
    }
    //解析标签
    compileElement(node) {
        let attributes = node.attributes;
        Array.from(attributes).map(attr => {
            let attrName = attr.name;
            if (this.isDirective(attrName)) {
                
            }
        });
    }
    //工具方法
    isElementNode(node) {
        return node.nodeType === 1;
    }
    isText(node) {
        return node.nodeType === 3;
    }
    isDirective(attrName) {
        return attrName.startsWith("v-");
    }
}
