'use strict';

/**
 * invitation controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::invitation.invitation', ({ strapi }) => ({

  async findByUserId(ctx) {
    console.log('Request received for userId:', ctx.params.userId);

    const { userId } = ctx.params;

    const invitations = await strapi.db.query('api::invitation.invitation').findMany({
      where: { user: { id: userId } },
      populate: ['document'], // Populate related document
    });

    if (!invitations || invitations.length === 0) {
      console.log('No invitations found for userId:', userId);
      return ctx.notFound('No invitations found for the given user ID.');
    }

    console.log('Invitations found:', invitations);
    return { data: invitations };
  },

}));


