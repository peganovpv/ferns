import serve from '@rollup/plugin-serve';
import livereload from '@rollup/plugin-livereload';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    isProduction && terser(),
    !isProduction && serve({ contentBase: 'dist', port: 3000 }),
    !isProduction && livereload({ watch: 'dist' }),
  ],
};
