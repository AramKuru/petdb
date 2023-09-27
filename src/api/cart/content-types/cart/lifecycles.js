module.exports = {
    beforeCreate(event) {
      let { data, where, select, populate } = event.params;
  
      const ctx = strapi.requestContext.get();
      data.users_permissions_user = ctx.state.user.id;
    },
  
    // afterCreate(event) {
    //   const { result, params } = event;
    //     console.log(result,params);
    //     const ctx = strapi.requestContext.get();

    //     console.log('User info in service: ', ctx.state.user);
    //   // do something to the result
    // },
  };