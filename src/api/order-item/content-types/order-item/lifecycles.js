const { errors } = require("@strapi/utils");
const { ApplicationError } = errors;
module.exports = {
  async beforeCreate(event) {
    const { result, params } = event;
    let { data } = params;
    const product = await strapi.entityService.findOne(
      "api::product.product",
      params?.data?.product,
      {
        populate: ["discount"],
        fields: ["stock", "price"],
      }
    );

    if (product?.stock >= params?.data?.quantity) {
      await strapi.entityService.update(
        "api::product.product",
        params?.data?.product,
        {
          data: {
            stock: product?.stock - params?.data?.quantity,
          },
        }
      );
      // console.log("date", new Date().toISOString());
      new Date()?.toISOString() > product?.discount?.valid_from &&
      new Date()?.toISOString() < product?.discount?.valid_until
        ? (data.price =
            Number(product?.price) * (1 - product?.discount?.percent / 100)) ?? Number(product?.price)
        : (data.price = product?.price);

      // increment order-detail
      // const getorderdetail =
      // await strapi.entityService.findOne("api::order-detail.order-detail",params.data.order_detail,{
      //   fields: [ 'totalPrice','totalProducts']
      // })
      //   console.log(getorderdetail);
      // await strapi.entityService.update("api::order-detail.order-detail",params.data.order_detail, {
      //   data:{
      //     totalPrice: Number(getorderdetail.totalPrice) + (params.data.quantity * data.price),
      //     totalProducts: Number(getorderdetail.totalProducts) + params.data.quantity
      //   }
      // })
    } else
      throw new ApplicationError("Not enough item in stock", {
        stock: product?.stock,
      });
  },
  
  async afterCreate(event) {
    const { result, params } = event;
    if (result) {
      // increment product in productsort
      // console.log("params.data.product----------------------",params?.data?.product);

      const timesOrdered = await strapi.entityService.findMany(
        "api::productsort.productsort",
        {
          populate: ["product"],
          filters: {
            product: {
              id: {
                $eq: params?.data?.product,
              },
            },
          },
        }
      );
      await strapi.entityService.update(
        "api::productsort.productsort",
        timesOrdered[0]?.id,
        {
          data: {
            all: Number(timesOrdered[0]?.all) + params?.data?.quantity,
            monthly: Number(timesOrdered[0]?.monthly) + params?.data?.quantity,
          },
        }
      );
      // console.log(params, "paramsss");
      // add sales
      // const sales = await strapi.entityService.findOne("api::sale.sale", 1, {
      //   fields: ["all", "monthly"],
      // });
      // console.log("sales----------------------",sales);

      // await strapi.entityService.update("api::sale.sale", 1, {
      //   data: {
      //     all: sales?.all + params?.data?.price,
      //     monthly: sales?.monthly + params?.data?.price,
      //   },
      // });
    }
  },
};
// 