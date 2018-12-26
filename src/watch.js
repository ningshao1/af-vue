class Watcher {
  constructor(vm, key, cb) {
    this.$vm = vm;
    this.$key = key;
    this.$cb = cb;
    Dep.target = this;
    this.oldValue = this.$vm.$data[this.$key];
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
class Dep {
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
