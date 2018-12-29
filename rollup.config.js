import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
export default {
    input: './src/vue.js',
    output: {
        file: './dist/vue.js',
        format: 'cjs'
    },
    plugins: [babel(), terser()]
}