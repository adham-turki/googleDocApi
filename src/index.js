module.exports = {
  register(/*{ strapi }*/) {},

  bootstrap({ strapi }) {
    const socketIo = require('socket.io');
    const io = socketIo(strapi.server.httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log('A user connected');

      // Join a room for a specific document
      socket.on('join_room', (documentId) => {
        socket.join(documentId);
        console.log(`User joined room: ${documentId}`);
      });

      // Handle document updates
      socket.on('document_update', async (data) => {
        const { documentId, content } = data;
        try {
          // Find the document
          const document = await strapi.db.query('api::document.document').findOne({ where: { id: documentId } });

          if (document) {
            // Update the document
            await strapi.db.query('api::document.document').update({ where: { id: documentId }, data: { content } });
            // Broadcast update to other clients in the same room
            socket.to(documentId).emit('document_update', data);
          } else {
            console.error('Document not found:', documentId);
          }
        } catch (error) {
          console.error('Error updating document:', error);
        }
      });

      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });

    strapi.io = io;
  },
};
