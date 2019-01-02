import observer from './observer.js';
import Compile from './compile.js';

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


// var vm = new vue({
//     el: "#app",
//     data: {
//         a: 2,
//         c: 2,
//         abc: 1,
//         b: 2,
//         e: {
//             c: 1
//         },
//         we: false
//     },
//     methods: {
//         clickHandler() {
//             console.log(this);
//         }
//     }
// });