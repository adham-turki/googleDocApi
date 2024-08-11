'use strict';

/**
 * document controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::document.document', ({ strapi }) => ({
  

  async findByUserId(ctx) {
    console.log('Request received for userId:', ctx.params.userId);

    const { userId } = ctx.params;

    const documents = await strapi.db.query('api::document.document').findMany({
      where: { author: { id: userId } },
    });

    if (!documents || documents.length === 0) {
      console.log('No documents found for userId:', userId);
      return ctx.notFound('No documents found for the given user ID.');
    }

    console.log('Documents found:', documents);
    return { data: documents };
  },

}));
