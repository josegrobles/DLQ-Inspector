const System = require('systemic');
const initBus = require('systemic-azure-bus');

module.exports = new System({ name: 'bus' }).add('bus', initBus()).dependsOn('logger', 'config');
