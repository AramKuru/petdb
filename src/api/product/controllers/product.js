'use strict';

/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product',({ strapi }) =>  ({

  
    // Method 2: Wrapping a core action (leaves core logic in place)
    async find(ctx) {
      // some custom logic here
      ctx.query = { ...ctx.query, local: 'en' }
  console.log(ctx?.query?.filters?.categories?.id?.$eq);
  
  const entry = await strapi.entityService.findOne('api::category.category', ctx?.query?.filters?.categories?.id?.$eq, {
    fields: ['id','name'],
   populate: {
     animal: {
       fields: ['id' ],
       populate: {
         categories: {fields: ['id']},
       },
     },
   },
 });
 ctx.query.filters.categories.id.$eq = entry?.animal?.categories.map((obj) => obj.id)

 console.log(entry?.animal?.categories.map((obj) => obj.id));
      // Calling the default core action
      const { data, meta } = await super.find(ctx);
  
      // some more custom logic
    //   meta.date = Date.now()
  
      return { data, meta };
    },
  

  }));
