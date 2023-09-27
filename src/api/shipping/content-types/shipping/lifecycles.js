const { ForbiddenError } = require("@strapi/utils/dist").errors;
module.exports = {
    beforeCreate(event) {
      let { data, where, select, populate } = event.params;
  
      const ctx = strapi.requestContext.get();
      console.log("ctx.state.user",ctx.state.user.role.name);
      if(ctx.state.user.role.name == "Driver"){
        data.users_permissions_user = ctx.state.user.id;
      }else {
        throw new ForbiddenError("Not a Driver");
      }
    },
  };