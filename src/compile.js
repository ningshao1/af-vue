/* 
    解析模板
    支持 v-on,v-text,v-html,v-show v-if
 */

class Compile {
    constructor(el, vm) {
        this.el = typeof el === "string" ? document.querySelector(el) : el;
        this.vm = vm;
        if (this.el) {
            let fragment = this.node2fragment(this.el);
            this.compile(fragment);
            this.el.appendChild(fragment);
        }
    }
    node2fragment(node) {
        let fragmentElement = document.createDocumentFragment();
        //把el所有元素添加到documentFragment
        let childrenNode = node.childNodes;
        Array.from(childrenNode).map(v => {
            fragmentElement.appendChild(v);
        });
        return fragmentElement;
    }
    compile(fragment) {
        let children = fragment.childNodes;
        Array.from(children).map((node, index) => {
            if (this.isElementNode(node)) {
                this.compileElement(node);
            }
            else if (this.isText(node)) {
                this.textCompile(node)
            }
        });
    }
    //解析标签
    compileElement(node) {
        let attributes = node.attributes;
        Array.from(attributes).map(attr => {
            let attrName = attr.name;
            if (this.isDirective(attrName)) {
                const name = attrName.split("-")[1];
                CompileUtil[name] &&
                    CompileUtil[name](node, attr.nodeValue, this.vm);
            }
        });
    }
    textCompile(node) {
        let txt = node.textContent;
        var reg = new RegExp(/{\{.+?\}\}/, "g");
        txt.replace(reg, (...data) => {
            console.log(data)
        })

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
let CompileUtil = {
    text(node, val, vm) {
        node.textContent = this.getValue(vm, val);
    },
    html(node, val, vm) {
        node.innerHTML = this.getVMValue(vm, expr);
    },
    model() {

    },
    getValue(vm, expr) {
        let disposeData = vm.$data;
        expr.split('.').map(v => {
            disposeData = disposeData[v];
        })
        return disposeData;
    }
};