var ghpages = require('gh-pages');
var config = require('../webpack.config');

ghpages.publish(config.output.path, {
  branch: 'master'
}, console.error.bind(console));
