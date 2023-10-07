'use strict';

/**
 * order-detail controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order-detail.order-detail' , ({ strapi }) =>  ({
    // Method 1: Creating an entirely custom action
    // async exampleAction(ctx) {
    //   try {
    //     ctx.body = 'ok';
    //   } catch (err) {
    //     ctx.body = err;
    //   }
    // },
  
    // Method 2: Wrapping a core action (leaves core logic in place)
    async find(ctx) {
        const { data, meta } = await super.find(ctx);

        const basketsWithTotalPrice = data.map((basket) => {
            const totalPrice = basket.attributes.order_items.data.reduce((total, item) => {
              return total + item.attributes.price * item.attributes.quantity;
            }, 0);
            const totalItems = basket.attributes.order_items.data.reduce((total, item) => {
              return total + item.attributes.quantity;
            }, 0);
      
            return {
              ...basket,
              totalPrice,
              totalItems,
            };
          });
            console.log(
                "basketsWithTotalPrice",basketsWithTotalPrice
            );
        data.map(x=>console.log(x.attributes.order_items))
        
        // some more custom logic
        meta.date = Date.now()
    
        return { basketsWithTotalPrice, meta };
      },
  
  }));