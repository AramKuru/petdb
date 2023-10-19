'use strict';

/**
 * wishlist router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;
const isOwner = {
    name: "global::isOwner",
    config: { contentType: "wishlist" },
};
module.exports = createCoreRouter('api::wishlist.wishlist', {
    config: {
        find: {
            policies: [isOwner],
        }, 
    },
});
