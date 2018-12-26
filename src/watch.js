class Watcher {
    constructor(vm, key, cb) {
        this.$vm = vm;
        this.$key = key;
        this.$cb = cb;
        Dep.target = this;
        debugger
        this.oldValue = this.$vm.$data[this.$key];
        Dep.target = null
    }
    update() {
        let newValue = this.$vm[this.$key];
        this.$cb(newValue)
    }
}
class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(watcher) {
        this.subs.push(watcher)
    }
    notify() {
        this.subs.map(watch => {
            watch.update();
        })
    }
}