var context = null;
var usingWebAudio = true;
if (typeof AudioContext !== 'undefined') {
  context = new AudioContext();
} else if (typeof webkitAudioContext !== 'undefined') {
  context = new webkitAudioContext();
} else {
  usingWebAudio = false;
}

var playing = false;
var osc = null;
var gainNode = null;
var freq = 40; // Default frequency
var volume = 0.5; // Default Volume
var STEP_CONSTANT = Math.pow(2.0, 1.0/12.0);

function toggle() {
  var button = document.getElementById("toggle");
  if (playing && osc) {
    playing = false;
    osc.stop(0);
    button.value = "Play";
  } else {
    playing = true;
    osc = context.createOscillator();
    gainNode = context.createGain(); // Create a GainNode

    osc.connect(gainNode);
    gainNode.connect(context.destination);

    osc.frequency.value = freq;
    gainNode.gain.value = volume;

    osc.start(0);
    button.value = "Stop";
  }
}

function updateFreq(newFreq) {
  freq = newFreq;
  if (osc) {
    osc.frequency.value = freq;
  }
  document.getElementById("freqText").value = freq;
  document.getElementById("freqRange").value = freq;
}

function updateVolume(newVolume) {
  volume = newVolume;
  if (gainNode) {
    gainNode.gain.value = volume;
  }
  document.getElementById("volumeText").value = volume;
  document.getElementById("volumeRange").value = volume;
}

window.onload = function() {
  if (!usingWebAudio) {
    document.getElementById("audioControls").innerHTML = "<p>Web audio required.</p>";
  } else {
    // Initialize default settings
    document.getElementById("freqText").value = freq;
    document.getElementById("freqRange").value = freq;
    document.getElementById("volumeText").value = volume;
    document.getElementById("volumeRange").value = volume;
  }
}

