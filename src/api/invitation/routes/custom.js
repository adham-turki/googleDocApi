module.exports = {
  routes : [
    {
      method: 'GET',
      path: '/invitations/user/:userId',
      handler: 'invitation.findByUserId',
      config: {
        auth : false,
      },
    },
  ],
};
