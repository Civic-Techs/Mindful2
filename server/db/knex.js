const makeKnex = require('knex');
const knexConfigs = require('../knexfile.js');

const env = process.env.NODE_ENV || 'development';

const knex = makeKnex(knexConfigs[env]);

module.exports = knex;
