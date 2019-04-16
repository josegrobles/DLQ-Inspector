require('dotenv').config();
const System = require('systemic');
const initMetrics = require('systemic-azure-metrics');
const { join } = require('path');

module.exports = () => new System({ name: 'dlq-inspector' }).bootstrap(join(__dirname, 'components'));
