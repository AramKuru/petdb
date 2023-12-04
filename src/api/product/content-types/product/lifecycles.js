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
    // if they choose all so it will bring all the products
    // async afterFindMany(event) {
    //   const { params } = event;  
    //     const entry = await strapi.entityService.findOne('api::category.category', params?.where?.categories?.id?.$eq, {
    //        fields: ['id','name'],
    //       populate: {
    //         animal: {
    //           fields: ['id' ],
    //           populate: {
    //             categories: {fields: ['id']},
    //           },
    //         },
    //       },
    //     });
    //     // params.where.categories.id.$eq = 2; 
    //     console.log(entry?.animal?.categories);
    //     if(entry?.name?.toLowerCase() == "all") { 
    //     console.log(entry?.animal?.id);
    //     console.log(params?.where?.categories?.id?.$eq);
    //     // entry?.animal?.categories.map((x,v)=>{console.log(x,v);})
    //     delete params?.where?.categories?.id?.$eq
    //     params.where.categories.id.$eq = 2; 
    //     // params.where.categories.id.$eq[0] = 2;
    //     // { '$or': [ { categories: {id:1} }, { categories: {id:2} } ] }
    //     }
    // },
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