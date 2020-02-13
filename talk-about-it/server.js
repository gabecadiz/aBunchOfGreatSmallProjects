const io = require('socket.io')(3001);

const users = {};

io.on('connection', socket => {
  // listen to when new user inputs name
  socket.on('new-user', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });

  // listen to socket.emit from other script
  socket.on('send-chat-message', message => {
    //broadcast message to all users connected to server except original user
    socket.broadcast.emit('chat-message', {
      message: message,
      name: users[socket.id]
    });
  });
});
