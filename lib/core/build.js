const rollup = require('rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const { terser } = require('rollup-plugin-terser');
const path = require('path');

const inputOptions = {
  input: path.join(__dirname, '..', '..', 'src', 'index.js'),
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    terser(),
  ],
};

const outputOptions = {
  file: path.join(__dirname, '..', '..', 'dist', 'bundle.js'),
  format: 'iife',
};

async function build() {
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
  console.log('Build complete.');
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
