module.exports = {
    // beforeCreate(event) {
    //   let { data, where, select, populate } = event.params;
  
    //   const ctx = strapi.requestContext.get();
    //   data.users_permissions_user = ctx.state.user.id;
    // },
  
    async afterCreate(event) {
      const { result, params } = event;
        if(result) {
          const timesOrdered = 
            await strapi.entityService.findOne("api::product.product",params.data.product,{
              fields: [ 'times_ordered']
            })

            await strapi.entityService.update("api::product.product",params.data.product, {
              data:{
                times_ordered: timesOrdered.times_ordered + params.data.quantity
              }
            })

        }
    },
  };