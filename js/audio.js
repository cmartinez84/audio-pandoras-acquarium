/////________________________________________________________
//Audio Context


// document.body.appendChild(audio);
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();
var analyser = audioCtx.createAnalyser();
analyser.smoothingTimeConstant = .05;
var filter = audioCtx.createBiquadFilter();
var frequencyData;
// var voiceNode;
var musicNode;

/////______________________soundsources__________________________________
/// must load in this order

window.addEventListener('load', function(e) {
  // loadEasterEgg();
  loadVoiceNode();
}, false);


function loadVoiceNode(){
  if (navigator.mediaDevices) {
      console.log('getUserMedia supported.');
      navigator.mediaDevices.getUserMedia ({audio: true, video: true})
      .then(function(stream) {
          voiceNode = audioCtx.createMediaStreamSource(stream);
          loadEasterEgg();
        });
  }
}

function loadEasterEgg(){
  var audio = document.getElementById('audio');
  audio.src = 'audio/pandora.mp3';
  audio.controls = false;
  audio.autoplay = false;
  // audio.play();
  musicNode = audioCtx.createMediaElementSource(audio);
  connectNodes();
}

function connectNodes(){
  voiceNode.connect(analyser);
  musicNode.connect(analyser);
  analyser.connect(audioCtx.destination);
  frequencyData = new Uint8Array(1024);
}




  /////________________________________________________________
  ///random drop imported from ripple.js

function renderFrame() {
     requestAnimationFrame(renderFrame);
     analyser.getByteFrequencyData(frequencyData);
     var ref = (frequencyData[150]);
     if(ref >225){
       randomDrop(512);
       randomDrop(512);
       randomDrop(512);
     }
     else if(ref > 120 ){

       randomDrop(400);
       randomDrop(400);
       randomDrop(400);
     }
     else if(ref > 100){

       randomDrop(300);
       randomDrop(300);
       randomDrop(300);
     }
     else if(ref >50){
       randomDrop(35);
       randomDrop(35);
       randomDrop(35);
     }
}

function start(){
  renderFrame();
}

start();
