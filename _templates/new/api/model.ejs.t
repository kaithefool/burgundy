---
to: server/components/<%= ns %>/models/<%= file %>.js
---
const Model = require('../../base/Model');

class <%= model %> extends Model {
}

module.exports = new <%= model %>('<%= tbl %>');
