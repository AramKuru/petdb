'use strict';

/**
 * slideshow service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::slideshow.slideshow');
