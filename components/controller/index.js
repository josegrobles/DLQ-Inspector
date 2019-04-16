const System = require('systemic');
const initController = require('./initController');

module.exports = new System({ name: 'controller' }).add('controller', initController()).dependsOn('logger', 'bus');
