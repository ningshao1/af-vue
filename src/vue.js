class vue {
    constructor(option = {}) {
        this.$el = option.el;
        this._data = option.data
        this.methods = option.methods;
        this.init(option.data);
    }
    init(data) {
        this.$data = new observer(data)
        new Compile(this.$el, this)
    }
    
}