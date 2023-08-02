'use strict';

/**
 * filter service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::filter.filter');
