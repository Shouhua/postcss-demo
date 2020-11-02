const postcss = require('postcss');
const parser = require('postcss-selector-parser');

module.exports = postcss.plugin('plugin-demo', (option) => (root) => {
  root.each(node => {
    const transform = (selectors) => {
      selectors.each((selector) => {
        let shouldInject = false;
        let node = null;
        selector.each(n => {
          // console.log('type: ', n.type);
          if (
            n.type === 'combinator' &&
            (n.value === '>>>' || n.value === '/deep/')
          ) {
            // console.log(n);
            shouldInject = true;
            n.value = ' ';
            n.spaces.before = '';
            n.spaces.after = '';
            return false;
          }
          if(n.type !== 'combinator') {
            node = n;
          }
        });
        if(shouldInject) {
          selector.insertAfter(
            // If node is null it means we need to inject [id] at the start
            // insertAfter can handle `null` here
            node,
            parser.attribute({
              attribute: 'v-123',
              value: 'v-123',
              raws: {},
              quoteMark: `"`
            })
          );
        }
      });
    };
    node.selector = parser(transform).processSync(node.selector);
  });
})