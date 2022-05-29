const url = 'ws://localhost:8080'
const connection = new WebSocket(url);

var video = document.getElementById('video');
 
connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}
 
connection.onmessage = (e) => {
  video.src="";
  setTimeout(() => {
    video.src= `/videos/${e.data}`;
    video.muted = false;
    video.play();
  }, 1000);
}
