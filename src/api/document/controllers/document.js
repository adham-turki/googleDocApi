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
      populate: ['collaborators','author'],


    });

    if (!documents || documents.length === 0) {
      console.log('No documents found for userId:', userId);
      return ctx.notFound('No documents found for the given user ID.');
    }

    console.log('Documents found:', documents);
    return { data: documents };
  },
  async findByCollaboratorId(ctx) {
    console.log('Request received for collaborator userId:', ctx.params.userId);

    const { userId } = ctx.params;

    const documents = await strapi.db.query('api::document.document').findMany({
      where: {
        collaborators: {
          id: userId,
        },
      },
      populate: ['collaborators','author'],

    });

    if (!documents || documents.length === 0) {
      console.log('No documents found for collaborator userId:', userId);
      return ctx.notFound('No documents found for the given collaborator user ID.');
    }

    console.log('Documents found:', documents);
    return { data: documents };
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    const document = await strapi.db.query('api::document.document').findOne({
      where: { id },
      populate: ['collaborators','author'],
    });

    if (!document) {
      return ctx.notFound('Document not found');
    }

    console.log('Document found:', document);
    return { data: document };
  },


}));
