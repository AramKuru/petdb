const axios = require('axios');
module.exports = {
    // do this on production 
    beforeCreate(event) {
      let { data, where, select, populate } = event.params;
  
      const ctx = strapi.requestContext.get();
      data.users_permissions_user = ctx.state.user.id;
    },
    async afterUpdate(event) {
      let { data, where, select, populate } = event.params;
  // Import the `axios` package.
      

    //const { dataa } = await axios.Axios.call('https://hub.docker.com/v2/repositories/strapi/strapi/'); console.log(data); 
    },
  
    
  };