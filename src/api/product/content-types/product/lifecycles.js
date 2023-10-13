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
    // async beforeFindMany(event) {
    //   const { result, params } = event;
    //   strapi.notification.sendNotification("e4xeH6V9QQKZIu0FJMnC55:APA91bGYQ0XOUCVruW1PoYxertjC2DXP2sKyv1p1dVBV-MW5zjErvL8nz1E1bR4hOc7yg2J5Lc5cHAVU9sTS8QLd1yVDYTsFnn6Eo4eniEhA18UdrXymFG2M9j8ubB9BpFg-1RcchJ1J", {
    //     notification: {
    //         title: `this is title`,
    //         body: `this is body`
    //     }
    // });
    // },
  };