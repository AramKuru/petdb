'use strict';

/**
 * shipping router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;
const isOwner = {
    name: "global::isOwner",
    config: { contentType: "shipping" },
};
module.exports = createCoreRouter('api::shipping.shipping',{
    config: {
        find: {
            policies: [isOwner],
        }, 
    },
});
