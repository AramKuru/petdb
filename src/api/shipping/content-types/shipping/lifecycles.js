const { ForbiddenError } = require("@strapi/utils/dist").errors;
module.exports = {
    async beforeCreate(event) {
      let { data, where, select, populate } = event.params;
      console.log(data.order_detail);
      
      const orderdetailId = 
          await strapi.entityService.findMany('api::shipping.shipping', {
            populate: ['order_detail'],
            filters: {
              order_detail: {
                id: {
                  $eq: data.order_detail
                },
              }
            },
          });
          console.log(
            "timesOrderedtimesOrdered",orderdetailId.length > 0  , data.order_detail
          );
            if (orderdetailId.length > 0) {
              throw new Error("has been ocupied")
            }

      const ctx = strapi.requestContext.get();
      console.log("ctx.state.user",ctx.state.user.role.name);
      if(ctx.state.user.role.name == "Authenticated"){
        data.users_permissions_user = ctx.state.user.id;
      }else {
        throw new ForbiddenError("Not a Driver");
      }
    },
  };
