// const WebSocket = require('ws')
const url = 'ws://localhost:8080'
const connection = new WebSocket(url);
 
connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}
 
connection.onmessage = (e) => {
  document.getElementById('video').src= `/videos/${e.data}`;
  document.getElementById('video').requestFullscreen();
}
