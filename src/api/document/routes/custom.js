//custom.js
module.exports =  {
    routes : [ {
      method: 'GET',
      path: '/documents/user/:userId',
      handler: 'document.findByUserId',
      config: {
        // policies: [],
        auth : false,
      },
    }

  ],
};
