'use strict';

/**
 * shipping service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::shipping.shipping');
