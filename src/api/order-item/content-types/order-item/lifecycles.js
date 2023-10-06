const { errors } = require('@strapi/utils');
const { ApplicationError } = errors;
module.exports = {
  async beforeCreate(event) {
    const { result, params } = event;
    
      const productQuantity = 
      await strapi.entityService.findOne("api::product.product",params.data.product,{
        fields: [ 'stock' ]
      })
      console.log(productQuantity,"------  ------", params.data.quantity);
      if (productQuantity.stock >= params.data.quantity) {
        await strapi.entityService.update("api::product.product",params.data.product, {
          data:{
            stock: productQuantity.stock - params.data.quantity,
          }
        })
      }else throw new ApplicationError('Not enough item in stock', { stock: productQuantity.stock });
     
  },
    async afterCreate(event) {
      const { result, params } = event;
        if(result) {
          
          const timesOrdered = 
          await strapi.entityService.findMany('api::productsort.productsort', {
            populate: ['product'],
            filters: {
              product: {
                id: {
                  $eq: params.data.product
                },
              }
            },
          });
          console.log(timesOrdered);
            await strapi.entityService.update("api::productsort.productsort",timesOrdered[0].id, {
              data:{
                all: Number(timesOrdered[0].all) + params.data.quantity,
                monthly: Number(timesOrdered[0].monthly) + params.data.quantity,
              }
            })
        console.log(params,"paramsss");

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