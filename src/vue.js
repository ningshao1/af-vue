class vue {
    constructor(option = {}) {
        this.$el = option.el;
        this.$data = option.data;
        this.methods = option.methods;
        this.init();
    }
    init() {
        new Compile(this.$el, this);
    }
}