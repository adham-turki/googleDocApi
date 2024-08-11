const http = require('http');
const socketIo = require('socket.io');

// Create an HTTP server
const server = http.createServer();

// Initialize Socket.IO and attach it to the HTTP server
const io = socketIo(server, {
  cors: {
    origin: '*', // Update this based on your requirements
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle custom events here
  socket.on('message', (msg) => {
    console.log('Message received:', msg);
    // Broadcast the message to all clients
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Socket.IO server started on port 3000');
});

module.exports = io;
