'use strict';

/**
 * order-detail controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order-detail.order-detail'
 , ({ strapi }) =>  ({
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
        const { data,meta } = await super.find(ctx);
        const dataa = 
            await strapi.entityService.findMany('api::order-detail.order-detail', {
              populate: ['users_permissions_user'],
              fields:['id']
            });
            console.log(
              "timesOrderedtimesOrdered",dataa[1]?.id
            );
         console.log("data", data );
        const basketsWithTotalPrice = data?.map((basket) => {
          console.log(basket?.id);
          const totalPrice = basket?.attributes?.order_items?.data?.reduce((total, item) => {
            return total + item?.attributes?.price * item?.attributes?.quantity;
          }, 0);
            const totalItems = basket?.attributes?.order_items?.data?.reduce((total, item) => {
              return total + item?.attributes?.quantity;
            }, 0);
            //to return user data
            const dataaValue = dataa.find((dataaItem) => dataaItem?.id === basket?.id);
            const dataaFlatNumberAndAddressName = {
              flatNumber: dataaValue?.users_permissions_user?.flatNumber,
              addressName: dataaValue?.users_permissions_user?.addressName,
              fullAddress: dataaValue?.users_permissions_user?.fullAddress,
              floorNumber: dataaValue?.users_permissions_user?.floorNumber,
              addressType: dataaValue?.users_permissions_user?.addressType,
              fullName: dataaValue?.users_permissions_user?.fullName,
              longitude: dataaValue?.users_permissions_user?.longitude,
              latitude: dataaValue?.users_permissions_user?.latitude,
              username: dataaValue?.users_permissions_user?.username,
            };
            return {
              ...basket,
              totalPrice,
              totalItems,
              user:dataaFlatNumberAndAddressName,
            };
          });
            console.log(
                "basketsWithTotalPrice",basketsWithTotalPrice
            );

            
        
        // // some more custom logic
        // meta.date = Date.now()
    
        return { basketsWithTotalPrice, meta };
      },
  
  })
  );