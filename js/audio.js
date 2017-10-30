/////________________________________________________________
//Audio Context
var audio = document.getElementById('audio');

// document.body.appendChild(audio);
var audioCtx = new AudioContext();
var analyser = audioCtx.createAnalyser();
analyser.smoothingTimeConstant = .05;
var filter = audioCtx.createBiquadFilter();
var frequencyData;
var voiceNode;


/////______________________soundsources__________________________________
/// must load in this order

window.addEventListener('load', function(e) {
  loadVoiceNode();
}, false);


function loadVoiceNode(){
  if (navigator.mediaDevices) {
      console.log('getUserMedia supported.');
      navigator.mediaDevices.getUserMedia ({audio: true, video: true})
      .then(function(stream) {
          voiceNode = audioCtx.createMediaStreamSource(stream);
          connectNodes();
        });
  }
}
function connectNodes(){
  voiceNode.connect(analyser);
  analyser.connect(audioCtx.destination);
  frequencyData = new Uint8Array(1000);
  // console.log(frequencyData);
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
