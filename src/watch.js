export class Watcher {
    constructor(vm, key, cb) {
        this.$vm = vm;
        this.$key = key;
        this.$cb = cb;
        Dep.target = this;
        this.oldValue = this.getValue(this.$vm, this.$key);
        Dep.target = null;
    }
    update() {
        let newValue = this.getValue(this.$vm, this.$key);
        this.$cb(newValue);
    }
    getValue(vm, expr) {
        let disposeData = vm.$data;
        expr.split(".").map(v => {
            disposeData = disposeData[v];
        });
        return disposeData;
    }
}
export class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(watcher) {
        this.subs.push(watcher);
    }
    notify() {
        this.subs;
        this.subs.map(watch => {
            watch.update();
        });
    }
}
// export default {
//     Watcher,
//     "Dep": Dep
// }