const express = require('express');
const app = express();
const port = 3000;
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let _ws;
 
wss.on('connection', ws => {
  _ws = ws;

  ws.on('message', message => {
    console.log(`Received message => ${message}`);
  });
});

app.use(express.static('static'));

app.get('/video/:id', (req, res) => {
  if (_ws) {
    _ws.send(req.params.id);
  }

  res.send('');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
