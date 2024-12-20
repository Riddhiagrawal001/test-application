import babel from '@rollup/plugin-babel';  // Ensure you're using the latest version
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';  // Handle CSS imports (if needed)
import { terser } from 'rollup-plugin-terser';  // Minify the output for production

export default {
    input: 'src/App.js', // Entry point of the library (App.js)
    output: [
        {
            file: 'dist/my-react-app.js', // Output file (UMD format)
            format: 'umd',
            name: 'MyReactApp', // Global variable name for UMD
            sourcemap: true, // Enable sourcemaps
        },
        {
            file: 'dist/my-react-app.esm.js', // ES Module version
            format: 'esm',
            sourcemap: true, // Enable sourcemaps
        },
    ],
    external: ['react', 'react-dom'],  // Don't bundle react and react-dom
    plugins: [
        resolve(),  // Resolves node modules
        commonjs(),  // Converts CommonJS modules to ES6
        postcss(),   // Processes CSS imports
        babel({
            exclude: 'node_modules/**',  // Exclude node_modules from transpilation
            presets: ['@babel/preset-env', '@babel/preset-react'],  // Transpile JS and JSX
            babelHelpers: 'bundled',  // Include necessary Babel helpers for the bundle
        }),
        terser(),  // Minify the output for production
    ],
};