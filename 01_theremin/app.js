// Set up our Audio Context
var context = new AudioContext();
window.context = context;

// create gain node
var gainNode = context.createGain();

// create oscillator and initialize type and frequency value
var oscillator = context.createOscillator();    // create the oscillator node
oscillator.type = 'sine';                       // set its type // sine, triangle, sawtooth, square
oscillator.frequency.value = 440;               // set its frequency in Hertz
oscillator.start(0)                             // start oscillator
oscillator.connect(gainNode);                   // connect oscillator to gain node

// grab our button elements so we can attach events to them
var note = document.querySelector('.note');

note.onclick = function() {
  if(note.getAttribute('playing') === 'true') { // if oscillator is playing, stop it
    note.setAttribute('playing', 'false');      // turn playing to false
    note.innerHTML = "Play";                    // change text in button to "Play"

    gainNode.disconnect(context.destination);   // disconnect from output destination

  } else {                                      // if oscillator is not playing, start it
    note.setAttribute('playing', 'true');       // turn playing to true
    note.innerHTML = "Stop";                    // change text in button to "Stop"

    gainNode.connect(context.destination);      // connect to output destination
  };
}

// Update frequency and gain values -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  

// mouse pointer coordinates
var CurX;                                       
var CurY;

var WIDTH = window.innerWidth;                  // get window width
var HEIGHT = window.innerHeight;                // get window height

var maxFreq = 2000;                             // maximum frequency
var maxVol = 0.2;                               // maximum gain value

// get <p> elements to be updated with frequency and gain value
var frequencyLabel = document.getElementById('frequency');
var volumeLabel = document.getElementById('volume');

document.onmousemove = updatePage;              // when mouse moves, set new gain and frequency values

function updatePage(e) {   
  CurX = (window.Event) ? e.pageX : event.clientX 
  + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
  CurY = (window.Event) ? e.pageY : event.clientY 
  + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

  oscillator.frequency.value = (CurX/WIDTH) * maxFreq;
  gainNode.gain.value = (1 - CurY/HEIGHT) * maxVol;

  if(note.getAttribute('playing') === 'true') {
    frequencyLabel.innerHTML = (CurX/WIDTH) * maxFreq + "Hz"
    volumeLabel.innerHTML = (1 - CurY/HEIGHT) * maxVol;
  } else{
    frequencyLabel.innerHTML = "n/a"
    volumeLabel.innerHTML = "n/a"
  }
  
}

// change type of oscillator -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
myradio = document.forms[0];                    // get the first <form> from html
myradio.onclick = changeOscType                 // when it receives a click, run changeOscType()

function changeOscType() {                      //
    var i;
    for (i = 0; i < myradio.length; i++) {      // for each elemnt in myradio
        if (myradio[i].checked) {               // see if it is checked
            oscillator.type = myradio[i].value; // change oscillator type to checked radio button
        }
    }
}