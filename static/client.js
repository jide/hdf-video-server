const url = 'ws://localhost:8081'
const connection = new WebSocket(url);

let audio;

function playAudio(id) {
  if (audio) {
    audio.src = '';
    audio.load();
    audio.remove();
    delete audio;
  }
  audio = document.createElement('audio');
  audio.setAttribute('id', 'audio');
  audio.setAttribute('src', `/audios/${id}`);
  audio.onended = function() {
    audio.src = '';
    audio.load();
    audio.remove();
    delete audio;
  }
  document.body.append(audio);
  audio.play();
}

function pauseAudio() {
  if (audio) {
    audio.pause();
  }
}

let video;

function playVideo(id) {
  if (video) {
    video.src = '';
    video.load();
    video.remove();
    delete video;
  }
  video = document.createElement('video');
  video.setAttribute('id', 'video');
  video.setAttribute('preload', 'none');
  video.setAttribute('src', `/videos/${id}`);
  video.onended = function() {
    video.src = '';
    video.load();
    video.remove();
    delete video;
  }
  document.body.append(video);
  video.play();
}

function pauseVideo() {
  if (video) {
    video.pause();
  }
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}

connection.onmessage = (e) => {
  if (e.data === 'pauseVideo') {
    pauseVideo();
  }
  else if (e.data === 'pauseAudio') {
    pauseAudio();
  }
  else {
    const [,type] = e.data.split('.');

    if (type === 'mp4') {
      playVideo(e.data);
    }
    else {
      playAudio(e.data);
    }
  }
}
