# af-vue

<br />
模拟 vue 实现的方式 数据监听使用 proxy 实现<br />
实例

```javascript
var vm = new vue({
    el: "#app",
    data: {
        a: 2,
        c: 2,
        abc: 1,
        b: 2,
        e: {
            c: 1
        },
        we: false
    },
    methods: {
        clickHandler() {
            console.log(this);
        }
    }
});
```
