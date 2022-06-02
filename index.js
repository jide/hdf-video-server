const express = require('express');
const app = express();
const fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const port = 3001;
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

let _ws;
 
wss.on('connection', ws => {
  _ws = ws;

  ws.on('message', message => {
    console.log(`Received message => ${message}`);
  });
});

app.use(express.static('static'));

app.get('/video/:id', (req, res) => {
  console.log('video', req.params);

  if (req.params.id !== 'pause' && !fs.existsSync(`./static/videos/${req.params.id}`)) {
    res.send('fiel does not exist');
  }

  if (_ws) {
    _ws.send(req.params.id === 'pause' ? 'pauseVideo' : req.params.id);
  }

  res.send('ok');
});

app.get('/audio/:id', (req, res) => {
  console.log('audio', req.params);

  if (req.params.id !== 'pause' && !fs.existsSync(`./static/audios/${req.params.id}`)) {
    res.send('fiel does not exist');
  }

  if (_ws) {
    _ws.send(req.params.id === 'pause' ? 'pauseAudio' : req.params.id);
  }

  res.send('ok');
});

app.get('/button/:a/:b', async (req, res) => {
  console.log('button', req.params);

  try {
    const response = await fetch(`http://192.168.0.2:5000/button/${req.params.a}/${req.params.b}`);
    console.log(response);
  }
  catch(e) {
    console.log(e);
  }

  res.send('ok');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
