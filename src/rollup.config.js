import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/App.js', // Entry point of the library (App.js)
    output: [
        {
            file: 'dist/my-react-app.js', // Output file (UMD format)
            format: 'umd',
            name: 'MyReactApp', // Global variable name
            sourcemap: true,
        },
        {
            file: 'dist/my-react-app.esm.js', // ES Module version
            format: 'esm',
            sourcemap: true,
        },
    ],
    external: ['react', 'react-dom'], // Don't bundle react and react-dom
    plugins: [
        resolve(),  // Resolves node modules
        commonjs(),  // Converts CommonJS to ES6
        babel({
            exclude: 'node_modules/**',
            presets: ['@babel/preset-react'],
        }),
        terser(), // Minifies the output for production
    ],
};