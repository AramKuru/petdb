'use strict';

/**
 * deliveryboy service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::deliveryboy.deliveryboy');
