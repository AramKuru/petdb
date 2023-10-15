'use strict';

/**
 * cart router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const isOwner = {
    name: "global::isOwner",
    config: { contentType: "cart" },
};
module.exports = createCoreRouter('api::cart.cart', {
    config: {
        find: {
            policies: [isOwner],
        }, 
    },
});