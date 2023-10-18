"use strict";

/**
 * order-item controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order-item.order-item", () => ({
  async sale(ctx, next) {
    const allSales = await strapi.entityService.findMany(
      "api::order-item.order-item",
      {
        fields: ["quantity", "price"],
        // filters: { title: 'Hello World' },
        // sort: { createdAt: 'DESC' },
        // populate: { category: true },
      }
    );
    // TODAY
    const today = new Date();
    const todayAtNoonAST = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0, // Hour (12 for noon)
      0, // Minutes
      0, // Seconds
      0 // Milliseconds
    );
    const arabiaTimeZoneOffset = 3 * 60; // Arabia Standard Time (AST) offset in minutes
    todayAtNoonAST.setMinutes(
      todayAtNoonAST.getMinutes() + arabiaTimeZoneOffset
    );
    //THIS MONTH
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstDayOfMonthAtNoonAST = new Date(
      firstDayOfMonth.getFullYear(),
      firstDayOfMonth.getMonth(),
      firstDayOfMonth.getDate(),
      0, // Hour (12 for noon)
      0, // Minutes
      0, // Seconds
      0 // Milliseconds
    );
    firstDayOfMonthAtNoonAST.setMinutes(
      firstDayOfMonthAtNoonAST.getMinutes() + arabiaTimeZoneOffset
    );

    console.log(todayAtNoonAST);

    const todaySales = await strapi.entityService.findMany(
      "api::order-item.order-item",
      {
        fields: ["quantity", "price"],
        filters: { createdAt: { $gte: todayAtNoonAST } },
        // sort: { createdAt: 'DESC' },
        // populate: { category: true },
      }
    );
    const monthSales = await strapi.entityService.findMany(
      "api::order-item.order-item",
      {
        fields: ["quantity", "price"],
        filters: { createdAt: { $gte: firstDayOfMonthAtNoonAST } },
        // sort: { createdAt: 'DESC' },
        // populate: { category: true },
      }
    );
    let allSale = 0;
    let monthSale = 0;
    let todaySale = 0;
    let allQuantity = 0;
    let monthQuantity = 0;
    let todayQuantity = 0;
    allSales.map((x) => {allSale += x.price * x.quantity;allQuantity+=x.quantity});
    monthSales.map((x) => {monthSale += x.price * x.quantity;monthQuantity+=x.quantity});
    todaySales.map((x) => {todaySale += x.price * x.quantity;todayQuantity+=x.quantity});
    ctx.send([{name:"Orders", sale:allSale , quantity:allQuantity},{name:"Net Sales(Monthly)",sale:monthSale, quantity:monthQuantity},{name:"Net Sales (Today)" ,sale:todaySale,quantity:todayQuantity}]);
  },
}));
