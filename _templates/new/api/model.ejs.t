---
to: server/components/<%= ns %>/models/<%= n.plural.camel %>.js
---
const Model = require('../../base/Model');

class <%= n.singular.pascal %> extends Model {
}

module.exports = new <%= n.singular.pascal %>('<%= n.plural.snake %>');
