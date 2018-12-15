class vue {
    constructor(option = {}) {
        this.$el = option.el;
        this.$data = option.data;
        this.methods = option.methods;
        this.createScript();
    }
    createScript() {
        var script = document.createElement('script');
        script.src = 'src/compile.js'
        document.querySelector('body').appendChild(script);
        script.onload = () => {
            this.init();
        }
    }
    init() {
        new Compile(this.$el, this);
    }
    
}