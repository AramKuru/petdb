module.exports = {

    myJob: {
      task: async ({ strapi }) => {
        
         await strapi.entityService.update("api::sale.sale",1, {
            data:{
              monthly: 0
            }
          })
          
        await strapi.db.query("api::productsort.productsort").updateMany({
            data: {
              monthly: 0,
            },
          });

      },
      options: {
        rule: "0 3 1 * *",
        tz: "Asia/Baghdad",
      },
    },
  };