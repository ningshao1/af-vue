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
                this.textCompile(node);
            }
            if (node && node.childNodes.length) {
                this.compile(node);
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
            const isEvent = this.isEventDirective(attrName);
            if (isEvent) {
                CompileUtil.eventHandler(this.vm, node, isEvent[1], attr.nodeValue)
            }
        });
    }
    textCompile(node) {
        let txt = this.newMethod(node);
        var reg = /\{\{((.|\n)+?)\}\}/g;

        node.textContent = txt.replace(reg, (...data) => {
            if (data[1] !== undefined) {
                return CompileUtil.getValue(this.vm, data[1].trim())
            }
            else {
                return '';
            }
        });
        new Watcher(this.vm, RegExp.$1.trim(), () => {
            node.textContent = txt.replace(reg, (...data) => {
                if (data[1] !== undefined) {
                    return CompileUtil.getValue(this.vm, data[1].trim())
                }
                else {
                    return '';
                }
            });
        })
    }
    newMethod(node) {
        return node.textContent;
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
    isEventDirective(attrName) {
        return /^(?:(?:v-on:)|@)([a-zA-Z_]\w*)/.exec(attrName)
    }
}
let CompileUtil = {
    text(node, val, vm) {
        node.textContent = this.getValue(vm, val);
        new Watcher(vm, val, () => {
            node.textContent = this.getValue(vm, val);
        })
    },
    html(node, val, vm) {
        node.innerHTML = this.getValue(vm, val);
        new Watcher(vm, val, () => {
            node.innerHTML = this.getValue(vm, val);
        })
    },
    model(node, val, vm) {
        if (node.localName === 'input') {
            node.value = this.getValue(vm, val);
            new Watcher(vm, val, () => {
                node.value = this.getValue(vm, val);
            })
            window.addEventListener('input', ({ target }) => {
                this.setValue(vm, val, target.value)
            })
        }
    },
    eventHandler(vm, node, eventName, handler) {
        const fn = vm.methods[handler];
        if (fn === undefined) {
            new Error("异常信息");
        }
        node.addEventListener(eventName, fn.bind(vm))
    },
    show(node, val, vm) {
        const data = this.getValue(vm, val);
        if (!data) node.style.display = 'none';
    },
    getValue(vm, expr) {
        let disposeData = vm.$data;
        expr.split(".").map(v => {
            disposeData = disposeData[v];
        });
        return disposeData;
    },
    setValue(vm, expr, data) {
        let disposeData = vm.$data;
        const arr = expr.split(".");
        arr.map((v, index) => {
            if (index < arr.length - 1) disposeData = disposeData[v];
            else disposeData[v] = data;

        });
    }
};
