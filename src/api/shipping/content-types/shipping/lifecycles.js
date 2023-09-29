const { ForbiddenError } = require("@strapi/utils/dist").errors;
module.exports = {
    async beforeCreate(event) {
      let { data, where, select, populate } = event.params;
      console.log(data.order_detail);
      
      const timesOrdered = 
          await strapi.entityService.findMany('api::shipping.shipping', {
            populate: {
              order_detail: true,
              repeatableComponent: {
                fields: ['id'],
                filters: {
                  id: {
                    $eq: data.order_detail,
                  },
                },
              },
            },
          });
          console.log(
            "timesOrderedtimesOrdered",timesOrdered
          );
      // google solution

          // async beforeSave(context) {
          //   // Get the order ID
          //   const orderId = context.request.body.shipping.order;
          //   console.log(orderId);
      
          //   // Check if the order is already linked to another shipping entry
          //   const shippingEntries = await strapi.services.models.find('shipping', {
          //     where: { order: orderId },
          //   });
      
          //   // Prevent the entry creation if the order is already linked to another shipping entry
          //   if (shippingEntries.length > 0) {
          //     context.error('The order is already linked to a shipping entry.');
          //   }
          // }

      const ctx = strapi.requestContext.get();
      console.log("ctx.state.user",ctx.state.user.role.name);
      if(ctx.state.user.role.name == "Authenticated"){
        data.users_permissions_user = ctx.state.user.id;
      }else {
        throw new ForbiddenError("Not a Driver");
      }
    },
  };
