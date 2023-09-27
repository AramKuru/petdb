// module.exports = {
//     // beforeCreate(event) {
//     //   let { data, where, select, populate } = event.params;
  
//     //   const ctx = strapi.requestContext.get();
//     //   data.users_permissions_user = ctx.state.user.id;
//     // },
  
//     async afterCreate(event) {
//       const { result, params } = event;
//         console.log("result",result);
//         console.log("params",params);
//         console.log("prod id",params.data.product);
//         console.log("prod quantity",params.data.quantity);
//         if(result) {
//           // const product = await strapi.query('product').findOne({id: 4});
          
//           const updatedStock = await strapi.query('products').update(
//               { id: params.data.product },
//               { quantity: params.data.quantity }
//             );

//           // const updatedStock = await strapi.query('product').update(
//           //   { product: params.data.product },
//           //   { quantity: params.data.quantity }
//           // );
    
//           // Do any additional actions or logging as needed
//           console.log('Stock updated:', updatedStock);

//           // console.log("product",product);
//           // if (product) {
//           //   await strapi.query('product').update(
//           //     {id: article[0].id},
//           //     {views: parseInt(article[0].views) + 1}
//           //   );
//           // }
//         }
//     },
//   };