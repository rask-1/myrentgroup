const fs = require('fs');
const cssnano = require('cssnano');
const postcss = require('postcss');
const terser = require('terser');

async function minify() {
  // CSS
  const css = fs.readFileSync('client/styles.css', 'utf8');
  const minifiedCss = await postcss([cssnano({ preset: 'default' })]).process(css, { from: undefined });
  fs.writeFileSync('client/styles.min.css', minifiedCss.css);
  console.log('✅ CSS minified');
  
  // JS
  const js = fs.readFileSync('client/app.js', 'utf8');
  const minifiedJs = await terser.minify(js, { compress: true, mangle: true });
  fs.writeFileSync('client/app.min.js', minifiedJs.code);
  console.log('✅ JS minified');
}

minify();