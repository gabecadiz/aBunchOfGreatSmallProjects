const socket = io('http://localhost:3001');

const messageForm = document.getElementById('send-container');

const messageInput = document.getElementById('message-input');

const messageContainer = document.getElementById('message-container');

// Functions

const appendMessage = message => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
};

const name = prompt('What is your name?');
appendMessage(`You joined as ${name}`);
socket.emit('new-user', name);

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', name => {
  appendMessage(`${name} has connected`);
});

socket.on('user-disconnected', name => {
  appendMessage(`${name} has disconnected`);
});

// Event Listeners
messageForm.addEventListener('submit', e => {
  e.preventDefault();

  const message = messageInput.value;
  socket.emit('send-chat-message', message);
  appendMessage(`You: ${message}`);

  messageInput.value = '';
});
