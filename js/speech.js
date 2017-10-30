
console.log("what");
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true;

let p = document.createElement('p');
// const words  = document.querySelector('.words');
// words.appendChild(p);

recognition.addEventListener('result', e=>{
  const transcript = Array.from(e.results)
  .map(result => result[0])
  .map(result => result.transcript)
  .join('');

  // p.textContent = transcript;

  if(e.results[0].isFinal){
    var lower = transcript.toLowerCase();
    if(lower.includes('tori' || lower.includes("pandora's acquarium"))){
      audio.play();
    }
    // console.log(e.results);

    // console.log(transcript);
    // p = document.createElement('p');
    // console.log(transcript);
    // words.appendChild(p);
  }
});
recognition.addEventListener('end', recognition.start)
recognition.start();
