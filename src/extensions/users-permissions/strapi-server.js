const crypto = require('crypto');
// const _ = require('lodash');
// const grant = require('grant-koa');
// module.exports = (plugin) => {
// plugin.controllers.auth.forgotPassword = async (ctx) => {
//     const { identifier } = await ctx.request.body;

//     const pluginStore = await strapi.store({ type: 'plugin', name: 'users-permissions' });
//     const emailSettings = await pluginStore.get({ key: 'email' });
//     const advancedSettings = await pluginStore.get({ key: 'advanced' });
//     // Find the user by email.
//     const user = {
//         email: "aramjihangir@gmail.com",
//         identifier: "07504444444",
//         blocked: false,
//     }
//     // await strapi
//     //   .query('plugin::users-permissions.user')
//     //   .findOne({ where: { identifier: identifier.toLowerCase() } });

//     if (!user || user.blocked) {
//       return ctx.send({ ok: true });
//     }

//     // Generate random token.

//     const resetPasswordToken = crypto.randomBytes(64).toString('hex');

//     // NOTE: Update the user before sending the email so an Admin can generate the link if the email fails
//     await strapi.plugins['users-permissions'].services.user.edit(user.id, { resetPasswordToken });

//     ctx.send({ ok: true });
//   }
// }


  module.exports = (plugin) => {
  plugin.controllers.user.updateMe = async (ctx) => {
      if (!ctx.state.user || !ctx.state.user.id) {
          return ctx.response.status = 401;
      }
      await strapi.query('plugin::users-permissions.user').update({
          where: { id: ctx.state.user.id },
          data: ctx.request.body,
      }).then((res) => {
          ctx.response.status = 200;
      })
  }

  plugin.routes['content-api'].routes.push(
      {
          method: "PUT",
          path: "/user/me",
          handler: "user.updateMe",
          config: {
              prefix: "",
              policies: []
          }
      }
  )
  plugin.controllers.user.forgotThePassword = async (ctx) => {
    if (!ctx.request.body.identifier) {
        return ctx.response.status = 401;
    }
    const { identifier } = await ctx.request.body;
    const resetPasswordToken = crypto.randomBytes(64).toString('hex');
    console.log(identifier,"-----",resetPasswordToken);
    const user = await strapi.db.query('plugin::users-permissions.user')
    .findOne({ where: { username: identifier} });
    // await strapi.db.query('plugin::users-permissions.user').update({
    //     where: { id: user.id },
    //     data: ctx.request.body,
    // }).then((res) => {
    //     ctx.response.status = 200;
    // })
        await strapi.plugins['users-permissions'].services.user.edit(user.id, { resetPasswordToken }).then((res) => {
                ctx.response.status = 200;
            });
            return ctx.send({
                resetPasswordToken,
              });
}

plugin.routes['content-api'].routes.push(
    {
        method: "POST",
        path: "/user/forgotThePassword",
        handler: "user.forgotThePassword",
        config: {
            prefix: "",
            policies: []
        }
    }
)
  return plugin;
}