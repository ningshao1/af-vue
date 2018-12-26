class observer {
    constructor(data, cb) {
        return this.walk(data, cb);
    }
    walk(data, cb) {
        const dep = new Dep();
        const handler = {
            get(target, prop, receiver) {
                Dep.target && dep.addSub(Dep.target);
                try {
                    return new Proxy(target[prop], handler);
                }
                catch (err) {
                    return Reflect.get(target, prop, handler);
                }
            },
            set(target, prop, val, receiver) {
                Reflect.set(target, prop, val, receiver);
                dep.notify();
            }
        };
        return new Proxy(data, handler);
    }
}