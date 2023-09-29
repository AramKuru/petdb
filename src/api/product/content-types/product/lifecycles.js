module.exports = {
    // beforeCreate(event) {
    //   let { data, where, select, populate } = event.params;
  
    //   const ctx = strapi.requestContext.get();
    //   data.users_permissions_user = ctx.state.user.id;
    // },
  
    async afterCreate(event) {
      const { result, params } = event;
        if(result) { 
          console.log(result.id);
            await strapi.entityService.create("api::productsort.productsort" , {
              data:{
                product: result.id
              }
            })

        }
    },
  };