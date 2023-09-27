module.exports = {
    beforeCreate(event) {
      let { data, where, select, populate } = event.params;
  
      const ctx = strapi.requestContext.get();
      data.users_permissions_user = ctx.state.user.id;
    },
  
    // async afterCreate(event) {
    //   const { result, params } = event;
    //     console.log(result,params);
    //     // if(result) {
    //     //   const article = await strapi.query('article').find({id: result.id});
  
    //     //   if (article) {
    //     //     await strapi.query('article').update(
    //     //       {id: article[0].id},
    //     //       {views: parseInt(article[0].views) + 1}
    //     //     );
    //     //   }
    //     // }
    // },
  };