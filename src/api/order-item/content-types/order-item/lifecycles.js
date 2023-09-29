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
          await strapi.entityService.findMany('api::productsort.productsort', {
            populate: {
              product: true,
              repeatableComponent: {
                fields: ['id'],
                filters: {
                  id: {
                    $eq: params.data.product,
                  },
                },
              },
            },
          });
            await strapi.entityService.update("api::productsort.productsort",timesOrdered[0].id, {
              data:{
                all: Number(timesOrdered[0].all) + params.data.quantity,
                monthly: Number(timesOrdered[0].monthly) + params.data.quantity,
              }
            })


          const sales = 
            await strapi.entityService.findOne("api::sale.sale",1,{
              fields: [ 'all','monthly']
            })

            await strapi.entityService.update("api::sale.sale",1, {
              data:{
                all: sales.all + params.data.price,
                monthly: sales.monthly + params.data.price
              }
            })

        }
    },
  };