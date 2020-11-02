const postcss = require('postcss');
const fs = require('fs');
const DemoPlugin = require('./postcss-selector-plugin');

fs.readFile('index.css', (err, data) => {
  postcss([DemoPlugin]).process(data, {
    from: './index.css',
    to: './out.css'
  }).then(result => {
    console.log(result);
  })
});
