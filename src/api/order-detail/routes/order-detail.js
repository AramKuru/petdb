'use strict';

/**
 * order-detail router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;
const isOwner = {
    name: "global::isOwner",
    config: { contentType: "cart" },
};
module.exports = createCoreRouter('api::order-detail.order-detail', {
    config: {
        find: {
            policies: [isOwner],
        }, 
    },
});