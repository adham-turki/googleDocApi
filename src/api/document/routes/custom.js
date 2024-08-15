module.exports =  {
  routes : [
    {
      method: 'GET',
      path: '/documents/user/:userId',
      handler: 'document.findByUserId',
      config: {
        // policies: [],
        auth : false,
      },
    },
    {
      method: 'GET',
      path: '/documents/collaborator/:userId',
      handler: 'document.findByCollaboratorId',
      config: {
        // policies: [],
        auth : false,
      },
    },
    {
      method: 'GET',
      path: '/documents/:id',
      handler: 'document.findOne',
      config: {
        // policies: [],
        auth: false,
      },
    },
  ],
};
