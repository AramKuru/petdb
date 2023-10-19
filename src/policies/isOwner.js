"use strict";

const { PolicyError } = require("@strapi/utils").errors;

/**
 * `isOwner` policy.
 * CAUTION: This policy only applies to the REST API, GraphQL is unrestricted!!!
 */

module.exports = async (ctx, config, { strapi }) => {
    console.log(config.contentType);
  strapi.log.info("In isOwner policy.");
  console.log(ctx.state.user.role.name );
  const user = ctx.state.user;
  if (!user.id) {
    throw new PolicyError("You must be logged in to access this resource", {});
  }

  // create
  if (["POST"].includes(ctx.request.method) && !ctx.params.id) {
    ctx.request.body.data.owner = user?.id;
  }
  // find

  else if (["GET"].includes(ctx?.request?.method) && !ctx?.params?.id && ctx.state.user.role.name=="Authenticated") {
    ctx.request.query.filters = {
      ...(ctx?.request?.query?.filters || {}),
      users_permissions_user: user?.id
    //   users_permissions_user: { '$eq': user.id }
    };
  }
  
  // findOne, update, delete
  else if (["PUT", "DELETE", "GET"].includes(ctx.request.method) && ctx.params.id) {
    let entity = await strapi.entityService.findOne(
      `api::${config.contentType}.${config.contentType}`,
      ctx.params.id,
      {
        // fields: ['*'],
        populate: { users_permissions_user: true }, // enable this if owner is a Relation
      }
    );
    console.log(entity);
    if (!entity) {
      throw new PolicyError("This entity does not exist", {});
    } else if (entity.owner !== user.id) {
      throw new PolicyError(
        "You do not have permission to access this entity",
        {}
      );
    }
  } else {
    throw new PolicyError("This request is not supported", {});
  }

  return true;
};