// This is the third iteration of the Macro apps that were developed by Mari Lesteberg
// as a part of a Master's thesis in 2021. The apps use motion in the air to produce 
// sound and music. The motion capture engine is based on examples from the Diff Cam Engine:
// https://github.com/lonekorean/diff-cam-engine
// Diffcam Engine Licence:


/* Copyright (c) 2016 Will Boyd

This software is released under the MIT license: http://opensource.org/licenses/MIT

Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software 
without restriction, including without limitation the rights to use, copy, modify, merge, 
publish, distribute, sublicense, and/or sell copies of the Software, and to permit 
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or 
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/* 

MIT License

Copyright (c) 2021 Mari Lesteberg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/
    
    ///////// TONE.JS VARIABLES ///////////

    // gain and effects:
    const gainNode = new Tone.Gain().toDestination();
    gainNode.gain.value = 0.1;
    const pingPong = new Tone.PingPongDelay().connect(gainNode);

    pingPong.wet.value = 0.2;
    const reverb = new Tone.Reverb().connect(pingPong);
    reverb.dampening = 1000;

    reverb.wet.value = 0.8;
    const autoWah = new Tone.AutoWah({
        frequency: 200,
        baseFrequency: 440,
        wet: 0.3,
        gain: 0.1,
    }).connect(reverb);

   
    // bass
    let synth0 = new Tone.AMSynth({
        volume: -9,
        oscillator: {
          type: "sine9"
        },
    });

    // harmony
    let synth = new Tone.DuoSynth({
        volume: -19,
        voice0: {
            oscillator: {
                type: "fmsawtooth",

              },
            envelope: {
                attack: 0.9,
                decay: 0.3,
                sustain: 1,
                release: 0.9,
            },
            filter: {
                Q: 17,
                frequency: 850,

            },
        },

        voice1: {
            oscillator: {
                type: "pulse",

              },

        },



      });

      // synth 2
    let synth2 = new Tone.Synth({
        volume: -9,
        oscillator: {
          type: "sine3"
        },
        envelope: {
          attack: 0.1,
          decay: 0.3,
          sustain: 0.4,
          release: 0.8,
        }/* ,
        filterEnvelope: {
          attack: 0.01,
          decay: 0.7,
          sustain: 0.1,
          release: 0.8,
          baseFrequency: 300,
          octaves: 4
        } */
      });

  //  synth 3
    const synth3 = new Tone.Synth({
        volume: -9,
        oscillator: {
          type: "sine6"
        },
        envelope: {
          attack: 0.1,
          decay: 0.3,
          sustain: 0.4,
          release: 0.5,
        }/* ,
        filterEnvelope: {
          attack: 0.001,
          decay: 0.7,
          sustain: 0.1,
          release: 0.8,
          baseFrequency: 300,
          octaves: 4
        } */
      });

      // melody synth: 
      let synth4 = new Tone.Synth({
        volume: -9,
        oscillator: {
            type: "sine7"
        },
        envelope: {
          attack: 0.1,
          decay: 0.3,
          sustain: 0.4,
          release: 0.5,
        }/* ,
        filterEnvelope: {
          attack: 0.001,
          decay: 0.7,
          sustain: 0.1,
          release: 0.8,
          baseFrequency: 300,
          octaves: 4
        } */
      });

// Kick and snare drum
    const synth5 = new Tone.Sampler({
        urls: {
            C1: "samples/C1kick.mp3",
            E1: "samples/E1snare.mp3",
        },
    
    }).connect(gainNode);

    // Hi hat:
    const synth6 = new Tone.Sampler({
        urls: {
            C1: "samples/C1hat.mp3",
        },
    
    
    }).connect(gainNode);

// synth 7
    let synth7 = new Tone.DuoSynth({
      volume: -19,
      voice0: {
          oscillator: {
              type: "fmsawtooth",

            },
          envelope: {
              attack: 0.9,
              decay: 0.3,
              sustain: 1,
              release: 0.9,
          },
          filter: {
              Q: 17,
              frequency: 850,

          },
      },

      voice1: {
          oscillator: {
              type: "pulse",

            },
      },

    }).connect(gainNode);





  ////////////////////////////
  // Random tone generator  //
  ////////////////////////////

  // Inspiration to the Random tone generator is taken from this 
  // thread: https://codereview.stackexchange.com/questions/203209/random-tone-generator-using-web-audio-api
 
// algorithm for converting an integer to a note frequency (source: https://codereview.stackexchange.com/questions/203209/random-tone-generator-using-web-audio-api):
const freq = note => 2 ** (note / 12) * 440; 

// diatonic scales 
const notes3 = [6, 8, 10, 11, 13, 15]; 
const notes2 = [-4, -2, -1,  1, 3, 5]; 
const notes = [-18, -16, -14 ,-13, -11, -9, -7, -6];

const notes3_1 = [5, 7, 9, 10, 12, 14]; 
const notes2_1 = [-5, -3, -2,  0, 2, 4]; 
const notes_1 = [-19, -17, -15 ,-14, -12, -10, -8 ,-7]; 

// Pentatonic scales:
const pentaNotes3 = [3, 6, 8, 11, 13, 15]; 
const pentaNotes2 = [-8, -6 , -4, -1,  1, 3, 6]; 
const pentaNotes = [-20, -18, -16, -13 ,-11, -8, -6, -4 ,-1]; 

const pentaNotes6 = [7, 9, 12, 14, 16, 19]; 
const pentaNotes5 = [-0, -2 , 4, 7,  9, 12]; 
const pentaNotes4 = [-17, -15, -12 ,-10, -8, -5, -3 , 0]; 

// Whole note scales:
const wholeNotes3 = [10, 12, 14, 16, 18, 20]; 
const wholeNotes2 = [-2 , 0, 2,  4, 6, 8]; 
const wholeNotes = [-20 ,-18, -16, -14, -12 ,-10]; 

const wholeNotes6 = [11, 13, 15, 17, 19, 21]; 
const wholeNotes5 = [-1 , 1, 3,  5, 7, 9]; 
const wholeNotes4 = [-21 ,-19, -17, -15, -13 ,-11]; 

// harmonic scales
const harmNotes3 = [8, 9, 12, 14, 16, 17, 18];
const harmNotes2 = [-2, -1, 2, 4, 6, 7, 8];
const harmNotes = [-12, -11, -8, -6, -4, -3, -2]



// Empty arrays to be used in the random generator
  let randomArray = [];
  let randomArray2 = [];
  let randomArray3 = [];
  let randomArray6 = [];
  let randomHiHatArray = [];
  let randomDrumArray = [];
  let randomMelodyArray = [];
  let scaleNotes = [];
  let scaleNotes2 = [];
  let scaleNotes3 = [];


     // Fuctions for creating random integers (source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random).
     function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

      function getRandomInt2(max) {
        return Math.floor(Math.random() * max);
      }

      // Generating random integers
      const random0 = getRandomInt(15) + 2;
      const randomScale = getRandomInt(14);
      const randomTimbre = getRandomInt2(8);
      const randomTimbre2 = getRandomInt2(8);
      const randomTimbre3 = getRandomInt2(8);
      const randomTempo = getRandomInt(12);

      // Random selecting between instruments for synth4:
      if ((randomTimbre == 0) || ( randomTimbre == 7 ))
      synth4.oscillator.type = "fmsine";
      else if ((randomTimbre == 1) || ( randomTimbre == 6 ))
      synth4.oscillator.type = "pwm";
      else if ((randomTimbre == 2) || ( randomTimbre == 5 ))
      synth4.oscillator.type = "pulse";
      else if ((randomTimbre == 3) || ( randomTimbre == 4 ))
      synth4 = new Tone.Sampler({
        urls: {
          Ab3: "samples/2Ab3.mp3",
          Ab2: "samples/2Ab2.mp3",
        },
      
      
      });

// Random selecting between instruments for the synth and synth0:
      if ((randomTimbre2 == 0) || ( randomTimbre2 == 7 ))
      synth = new Tone.Sampler({
          urls: {
              A1: "A1.mp3",
              A2: "A2.mp3",
          },
          baseUrl: "https://tonejs.github.io/audio/casio/",
      
      }),
      
      synth0 = new Tone.Sampler({
          urls: {
              A1: "A1.mp3",
              A2: "A2.mp3",
          },
          baseUrl: "https://tonejs.github.io/audio/casio/",
      
      });
      
      else if ((randomTimbre2 == 1) || ( randomTimbre2 == 6 ))
      synth = new Tone.Sampler({
          urls: {
              Ab3: "samples/Ab3.mp3",
              Db3: "samples/Db3.mp3",
          },
      
      
      }),
      
      synth0 = new Tone.Sampler({
          urls: {
              Ab3: "samples/Ab3.mp3",
              Db3: "samples/Db3.mp3",
          },
      
      
      });
      else if ((randomTimbre2 == 2) || ( randomTimbre2 == 5 ))
      synth = new Tone.Sampler({
          urls: {
              Ab3: "samples/2Ab3.mp3",
              Ab2: "samples/2Ab2.mp3",
          },
      
      
      }),
      
      synth0 = new Tone.Sampler({
          urls: {
              Ab3: "samples/2Ab3.mp3",
              Ab2: "samples/2Ab2.mp3",
          },
      
      
      });
      else if ((randomTimbre2 == 3) || ( randomTimbre2 == 4 ))
      synth = new Tone.Sampler({
          urls: {
              G1: "samples/3G1.mp3",
              G2: "samples/3G2.mp3",
          },
      
      
      }),
      
      synth0 = new Tone.Sampler({
          urls: {
              G1: "samples/3G1.mp3",
              G2: "samples/3G2.mp3",
          },
      
      
      });

// Random decision of tempo (Beats Per Minute / BPM):
      
      if ((randomTempo == 0) || ( randomTempo == 5 ))
      Tone.Transport.bpm.value = 40;
        else if ((randomTempo == 1) || ( randomTempo == 6 ))
        Tone.Transport.bpm.value = 60;
        else if ((randomTempo == 2) || ( randomTempo == 7 ))
        Tone.Transport.bpm.value = 90;
        else if ((randomTempo == 3) || ( randomTempo == 8 ))
        Tone.Transport.bpm.value = 120;
        else if ((randomTempo == 4) || ( randomTempo == 9 ))
        Tone.Transport.bpm.value = 50;
        

// HTML monitoring of time signature and BPM:
      document.getElementById("timeSign").innerHTML =
      "Time signature: " + random0 + " / 16";

      document.getElementById("tempo").innerHTML =
      "BPM: " + Tone.Transport.bpm.value;

// Random selection of scales:
      if ((randomScale == 0) || ( randomScale == 13 ))
      scaleNotes = pentaNotes,
      scaleNotes2 = pentaNotes2,
      scaleNotes3 = pentaNotes3,
      document.getElementById("scale").innerHTML =
      "Scale: pentatone";
      else if ((randomScale == 1) || ( randomScale == 12 ))
      scaleNotes = wholeNotes,
      scaleNotes2 = wholeNotes2,
      scaleNotes3 = wholeNotes3,
      document.getElementById("scale").innerHTML =
      "Scale: wholetone";
      else if ((randomScale == 2) || ( randomScale == 11 ))
      scaleNotes = notes_1,
      scaleNotes2 = notes2_1,
      scaleNotes3 = notes3_1,
      document.getElementById("scale").innerHTML =
      "Scale: diatonic2";
      else if ((randomScale == 3) || ( randomScale == 10 ))
      scaleNotes = harmNotes,
      scaleNotes2 = harmNotes2,
      scaleNotes3 = harmNotes3,
      document.getElementById("scale").innerHTML =
      "Scale: double harmonic";
    
      else if ((randomScale == 4) || ( randomScale == 9 ))
      scaleNotes = notes,
      scaleNotes2 = notes2,
      scaleNotes3 = notes3,
      document.getElementById("scale").innerHTML =
      "Scale: diatonic";
    
      else if ((randomScale == 5) || ( randomScale == 8 ))
      scaleNotes = wholeNotes4,
      scaleNotes2 = wholeNotes5,
      scaleNotes3 = wholeNotes6,
      document.getElementById("scale").innerHTML =
      "Scale: wholetone2";    
    
      else if ((randomScale == 6) || ( randomScale == 7 ))
      scaleNotes = pentaNotes4,
      scaleNotes2 = pentaNotes5,
      scaleNotes3 = pentaNotes6,
      document.getElementById("scale").innerHTML =
      "Scale: pentatone2";
 


// Random creation of melody lines
  function createRandomness() {

    
    for (var i = 0; i < random0; i += 1) {

      const randomNote = () => scaleNotes[Math.random() * scaleNotes.length | 0]; 
  
      let random = freq(randomNote());
      randomArray.push(random);
  
  
      const randomNote2 = () => scaleNotes2[Math.random() * scaleNotes2.length | 0]; 
     let random2 = freq(randomNote2());
     randomArray2.push(random2);
  
     const randomNote3 = () => scaleNotes3[Math.random() * scaleNotes3.length | 0]; 
     let random3 = freq(randomNote3());
     randomArray3.push(random3);
     

     const randomNote6 = () => scaleNotes[Math.random() * scaleNotes.length | 0]; 
     let random6 = freq(randomNote6());
     randomArray6.push(random6);

     // getting random numbers
     let random4 = getRandomInt(11);
     let random5 = getRandomInt(14);


     // Generating random rhythm groove and random melody. Selecting notes from the arrays random, random2, random3 and random6

     if (random4 == 1)
     randomHiHatArray.push(("C1 C1").split(" ")),
     randomMelodyArray.push((0 + " " + random).split(" "));
     if (random4 < 4)
     randomHiHatArray.push(("C1 C1").split(" ")),
     randomMelodyArray.push(random);
     if (random4 == 7)
     randomHiHatArray.push(("C2 C2").split(" ")),
     randomMelodyArray.push((random + " " + random6).split(" "));

     if (random4 == 6)
     randomHiHatArray.push("C1"),
     randomMelodyArray.push(random6);

     if (random4 == 5)
     randomHiHatArray.push("C1"),
     randomMelodyArray.push((random + " " + random6).split(" "));

     if (random4 == 4)
     randomHiHatArray.push("C1"),
     randomMelodyArray.push((0 + " " + random).split(" "));

     if (random4 == 8)
     randomHiHatArray.push(("C1 C2").split(" ")),
     randomMelodyArray.push((random + " " + random).split(" "));

     if (random4 == 9)
     randomHiHatArray.push((" " + "C2").split(" ")),
     randomMelodyArray.push((random6 + " " + random2).split(" "));

     if (random4 == 10)
     randomHiHatArray.push("C1"),
     randomMelodyArray.push((random + " " + random2 + " " + random6).split(" "));

     else
     randomHiHatArray.push("C1"),
     randomMelodyArray.push((random + " " + random2).split(" "));

     if (random5 > 10)
     randomDrumArray.push(("C1 C1").split(" "));
     if (random5 == 1)
     randomDrumArray.push(("C1 C1 C1").split(" "));
     if (random5 > 8)
     randomDrumArray.push("F2");
     if (random5 > 4)
     randomDrumArray.push(("C1 F2").split(" "));
     else
     randomDrumArray.push("C1")


  };


  }



/// DiffCam Variables for Motion Capture:

var DiffCamEngine = (function() {

    // GLOBAL variables
	var stream;					// stream obtained from webcam
	var video;					// shows stream
	var captureCanvas;			// internal canvas for capturing full images from video
	var captureContext;			// context for capture canvas
    var initSuccessCallback;	// called when init succeeds
	var initErrorCallback;		// called when init fails
	var startCompleteCallback;	// called when start is complete
    var captureInterval;		// interval for continuous captures
	var captureIntervalTime;	// time between captures, in ms
	var captureWidth;			// full captured image width
	var captureHeight;			// full captured image height  
	var isReadyToDiff;			// has a previous capture been made to diff against?
	var pixelDiffThreshold;		// min for a pixel to be considered significant
	var scoreThreshold;			// min for an image to be considered significant

    // CANVAS 1 VARIABLES:
	var diffCanvas;				// internal canvas for diffing downscaled captures
	var diffContext;			// context for diff 
    var motionCanvas;			// receives processed diff images
    var motionContext;			// context for motion canvas
    var captureCallback;		// called when an image has been captured and diffed
    var diffWidth;				// downscaled width for diff/motion
    var diffHeight;				// downscaled height for diff/motion
    var includeMotionBox;		// flag to calculate and draw motion bounding box
	var includeMotionPixels;	// flag to create object denoting pixels with motion

    // CANVAS 2 VARIABLES:
	var diffCanvas2;			// internal canvas for diffing downscaled captures BEHOLD
	var diffContext2;			// context for diff canvas. BEHOLD
    var motionCanvas2;			// receives processed diff images for the second canvas
    var motionContext2;			// context for motion canvas
	var captureCallback2;		// called when an image has been captured and diffed BEHOLD for å monitore values til HTML
    var diffWidth2;				// downscaled width for diff/motion
    var diffHeight2;			// downscaled height for diff/motion for a second canvas
    var includeMotionBox2;		// flag to calculate and draw motion bounding box
	var includeMotionPixels2;	// flag to create object denoting pixels with motion

	
///////// CANVAS AND WEBCAM OPTIONS /////////////
function init(options) {
        // sanity check
        if (!options) {
            throw 'No options object provided';
        }

        // GLOBAL SETTINGS
        video = options.video || document.createElement('video');
        captureIntervalTime = options.captureIntervalTime || 10;
        captureWidth = options.captureWidth || 900;
        captureHeight = options.captureHeight || 500;
        pixelDiffThreshold = options.pixelDiffThreshold || 32;
        scoreThreshold = options.scoreThreshold || 16;
        initSuccessCallback = options.initSuccessCallback || function() {};
        initErrorCallback = options.initErrorCallback || function() {};
        startCompleteCallback = options.startCompleteCallback || function() {};
        captureCanvas = document.createElement('canvas');
        isReadyToDiff = false;
        video.autoplay = true;
        captureCanvas.width  = captureWidth;
        captureCanvas.height = captureHeight;
        captureContext = captureCanvas.getContext('2d');


        // CANVAS 1 SETTINGS
        motionCanvas = options.motionCanvas || document.createElement('canvas');
        diffWidth = options.diffWidth || 4;
        diffHeight = options.diffHeight || 32;
        includeMotionBox = options.includeMotionBox || false;
        includeMotionPixels = options.includeMotionPixels || false;
        captureCallback = options.captureCallback || function() {};
        diffCanvas = document.createElement('canvas');
        // prep diff canvas
        diffCanvas.width = 1;
        diffCanvas.height = diffHeight;
        diffContext = diffCanvas.getContext('2d');
        // prep motion canvas
        motionCanvas.width = diffWidth;
        motionCanvas.height = diffHeight;
        motionContext = motionCanvas.getContext('2d');


        // CANVAS 2 SETTINGS
        motionCanvas2 = options.motionCanvas2 || document.createElement('canvas2');
        diffWidth2 = options.diffWidth2 || 8;
        diffHeight2 = options.diffHeight2 || 5;
        includeMotionBox2 = options.includeMotionBox2 || false;
        includeMotionPixels2 = options.includeMotionPixels2 || false;
        captureCallback2 = options.captureCallback2 || function() {};
        diffCanvas2 = document.createElement('canvas');
        // prep second diff canvas
        diffCanvas2.width = diffWidth2;
        diffCanvas2.height = diffHeight2;
        diffContext2 = diffCanvas2.getContext('2d');
        // prep second motion canvas
        motionCanvas2.width = diffWidth2;
        motionCanvas2.height = diffHeight2;
        motionContext2 = motionCanvas2.getContext('2d');

        // If making new canvases, remember to update "diffcam.js"

        requestWebcam();

        
    }

function capture() {
    // GLOBAL save a full-sized copy of capture 
    captureContext.drawImage(video, 0, 0, captureWidth, 1);
    isReadyToDiff = true;


    // CANVAS 1:
    // behold  Koden her inne er esssensiell for oppdeling av vinduet
    // diffContext lager nye fraksjoner av canvas. difference og source-over må være likt.
    var captureImageData = captureContext.getImageData(0, 0, captureWidth, 1);
    diffContext.globalCompositeOperation = 'difference';
    diffContext.drawImage(video, 0, 0, diffWidth, diffHeight);
    // denne forskjellen er viktig. diffContext2 er essensiell.
    var diffImageData = diffContext.getImageData(0, 0, 2, diffHeight);
    //*** behold */
    // draw current capture normally over diff, ready for next time
    diffContext.globalCompositeOperation = 'source-over';
    diffContext.drawImage(video, 0, 0, diffWidth, diffHeight);

    // CANVAS 2:
    var captureImageData2 = captureContext.getImageData(0, 4, captureWidth, 1);
    diffContext2.globalCompositeOperation = 'difference'; 
    diffContext2.drawImage(video, 0, 0, diffWidth2, diffHeight2);   
    // denne forskjellen er viktig. diffContext2 er essensiell.
    var diffImageData2 = diffContext2.getImageData(0, 4, diffWidth2, 1); // BEHOLD
    //*** behold */
    diffContext2.globalCompositeOperation = 'source-over';
    diffContext2.drawImage(video, 0, 0, diffWidth2, diffHeight2);

    if (isReadyToDiff) {     
        // Canvas 1 (Filter):
        // this is where you place the grid on the canvas
        // for å forklare hvor griden blir satt: det første tallet er y-aksen
        // og de andre tallet er x-aksen. Husk at bildet er speilvendt, 
        // så du teller fra venstre og bort.
        // Husk også at du starter på 0, så 5 blir nederste på y-aksen. Og 0 er borteste på y-aksen.
        var diff = processDiff(diffImageData);
        motionContext.putImageData(diffImageData, 0, 0);
        if (diff.motionBox) {
            motionContext.strokeStyle = '#fff';
            motionContext.strokeRect(
                diff.motionBox.x.min + 0.5,
                diff.motionBox.y.min + 0.5,
                diff.motionBox.x.max - diff.motionBox.x.min,
                diff.motionBox.y.max - diff.motionBox.y.min
            );
        }
        captureCallback({
            imageData: captureImageData,
            score: diff.score,
            hasMotion: diff.score >= scoreThreshold,
            motionBox: diff.motionBox,
            motionPixels: diff.motionPixels,
            getURL: function() {
                return getCaptureUrl(this.imageData);
            },
            checkMotionPixel: function(x, y) {
                return checkMotionPixel(this.motionPixels, x, y)
            }

            
                        
        });

        // Canvas 2 (Oscillator):
        var diff2 = processDiff2(diffImageData2);
        // this is where you place the grid on the canvas
        
        motionContext2.putImageData(diffImageData2, 0, 4);
        if (diff2.motionBox) {
            motionContext2.strokeStyle = '#fff';
            motionContext2.strokeRect(
                diff2.motionBox.x.min + 0.5,
                diff2.motionBox.y.min + 0.5,
                diff2.motionBox.x.max - diff2.motionBox.x.min,
                diff2.motionBox.y.max - diff2.motionBox.y.min
            );
        }
        captureCallback2({
            imageData2: captureImageData2,
            // score2 her for å gi monitoring i HTMLen (husk også å legge til i diffcam1.js )
            score2: diff2.score,
            hasMotion2: diff2.score >= 2,
            motionBox: diff2.motionBox,
            motionPixels: diff2.motionPixels,
        getURL: function() {
            return getCaptureUrl(this.imageData2);
        },
        checkMotionPixel: function(x, y) {
            return checkMotionPixel(this.motionPixels, x, y)
        }      	            
        });
    }
    }

// CANVAS 1 PROCESSING DIFF
// The first one is the Y axis, currently controling a Filter
	function processDiff(diffImageData) {
		
        var rgba = diffImageData.data;
        
		// pixel adjustments are done by reference directly on diffImageData
		var score = 0;
		var motionPixels = includeMotionPixels ? [] : undefined;
        var motionBox = undefined;
        console.log(diffImageData);
		for (var i = 0; i < rgba.length; i += 4) {
			var pixelDiff = rgba[i] * 0.9 + rgba[i + 1] * 0.3 + rgba[i + 2] * 0.3;
			var normalized = Math.min(255, pixelDiff * (50 / pixelDiffThreshold)); 
            

			rgba[i] = 0;
			rgba[i + 1] = 0;
            rgba[i + 2] = normalized;
            rgba[i + 3] = normalized;
            //console.log(pixelDiff);
			if (pixelDiff >= pixelDiffThreshold) {
				score++;
				coords = calculateCoordinates(i / 4);
				if (includeMotionBox) {
					motionBox = calculateMotionBox(motionBox, coords.x, coords.y);
				}
				if (includeMotionPixels) {
					motionPixels = calculateMotionPixels(motionPixels, coords.x, coords.y, pixelDiff);	
				}
                //console.log(score * 10)
              //  let tempo = ((i * -1) + 240) / 4 + 40;
              // console.log(tempo);

           // Tone.Transport.bpm.rampTo(tempo, 0.5);
           // document.getElementById("tempo").innerHTML =
           // "Tempo: " + tempo + " BPM";
			// A simple volume control:
// xValue er egentlig y-aksen, bestemmer hvilket punkt på linjen

// pixelDiff er mye bevegelse
// i er y-koordinaten



// Score er hvor raskt en beveger seg
//console.log(score);

            var xValue = (i * (-1)) + 249;	
            // Scaling the number with generateScaleFunction
            let filterScale = generateScaleFunction(0, 249, 0, 10);      
            xValue = filterScale(xValue);
            // This is where any value can be controlled by the number "i".
            //var normXvalue = 
            //console.log(((xValue / 10) * -1) + 1);
            //
            autoWah.octaves = xValue / 4;

            autoWah.Q.value = 8;
            pingPong.feedback.value = xValue / 10;
            //synth6.envelope.attack = xValue / 10;
            //synth.envelope.attack = xValue / 10;
            synth2.envelope.attack = xValue / 10;
            synth3.envelope.attack = xValue / 10;
            //synth.envelope.release = xValue / 10;
            synth2.envelope.release = xValue / 10;
            synth3.envelope.release = xValue / 10;
            //autoWah.baseFrequency.rampTo(xValue, 0.2);
			}
        }

		return {
			score: xValue, 
			motionBox: score > scoreThreshold ? motionBox : undefined,
			motionPixels: motionPixels
        };  
	}

// CANVAS 2 PROCESSING DIFF
// The second one is the X axis, currently controlling pitch
	function processDiff2(diffImageData2) {
		
		var rgba = diffImageData2.data;
		// pixel adjustments are done by reference directly on diffImageData
		var score = 0;
		var motionPixels = includeMotionPixels2 ? [] : undefined;
		var motionBox = undefined;

        for (var i = 0; 
            i < rgba.length; i += 4) {
			var pixelDiff = rgba[i] * 0.9 + rgba[i + 1] * 0.3 + rgba[i + 2] * 0.3;
			var normalized2 = Math.min(255, pixelDiff * (50 / pixelDiffThreshold));
			rgba[i] = normalized2; // rød
			rgba[i + 1] = 0; // grønn
            rgba[i + 2] = 0; // blå
            rgba[i + 3] = normalized2; // lysstyrke
        
			if (pixelDiff >= pixelDiffThreshold) {
				score++;
				coords = calculateCoordinates(i / 4);
				if (includeMotionBox2) {
					motionBox = calculateMotionBox(motionBox, coords.x, coords.y);
				}
				if (includeMotionPixels2) {
					motionPixels = calculateMotionPixels(motionPixels, coords.x, coords.y, pixelDiff);			
				}

			// using the x coords to change pitch

            // A function for activation of notes:


// i vaues from left to right: 28, 24, 20, 16, 12, 8, 5
            if (i == 28)
                synth.connect(autoWah),
                synth0.connect(autoWah),

                document.getElementById("synth1on0").innerHTML =
                "",
                document.getElementById("synth1on1").innerHTML =
                "on";
                  
            else if (i == 24)
                synth.disconnect(autoWah),
                synth0.disconnect(autoWah),

                document.getElementById("synth1on0").innerHTML =
                "off",
                document.getElementById("synth1on1").innerHTML =
                "";


            else if (i == 20)
                synth2.connect(autoWah),
                synth3.connect(autoWah),
 
                document.getElementById("synth2on0").innerHTML =
                "",
                document.getElementById("synth2on1").innerHTML =
                "on";

             else if (i == 16)
                synth2.disconnect(autoWah),
                synth3.disconnect(autoWah),

                document.getElementById("synth2on0").innerHTML =
                "off",
                document.getElementById("synth2on1").innerHTML =
                "";

            else if (i == 12)
                synth4.connect(autoWah),

                document.getElementById("synth3on0").innerHTML =
                "",
                document.getElementById("synth3on1").innerHTML =
                "on";

            else if (i == 8)
                synth4.disconnect(autoWah),
                document.getElementById("synth3on0").innerHTML =
                "off",
                document.getElementById("synth3on1").innerHTML =
                "";

			}
        }
		return {
			score: i,
			motionBox: score > scoreThreshold ? motionBox : undefined,
			motionPixels: motionPixels
        };
	}




// Functions we don't need to duplicate:
function calculateMotionPixels(motionPixels, x, y, pixelDiff) {
    motionPixels[x] = motionPixels[x] || [];
    motionPixels[x][y] = true;

    return motionPixels;
}
function getCaptureUrl(captureImageData) {
    // may as well borrow captureCanvas
    captureContext.putImageData(captureImageData, 0, 2);
    return captureCanvas.toDataURL();
}
function checkMotionPixel(motionPixels, x, y) {
    return motionPixels && motionPixels[x] && motionPixels[x][y];
}
function getPixelDiffThreshold() {
    return pixelDiffThreshold;
}
function setPixelDiffThreshold(val) {
    pixelDiffThreshold = val;
}
function getScoreThreshold() {
    return scoreThreshold;
}
function setScoreThreshold(val) {
    scoreThreshold = val;
}
return {
    // public getters/setters
    getPixelDiffThreshold: getPixelDiffThreshold,
    setPixelDiffThreshold: setPixelDiffThreshold,
    getScoreThreshold: getScoreThreshold,
    setScoreThreshold: setScoreThreshold,

    // public functions
    init: init,
    start: start,
    stop: stop
};
function calculateCoordinates(pixelIndex) {
    return {
        x: pixelIndex % diffWidth,
        y: Math.floor(pixelIndex / diffWidth)
    };
}
function calculateMotionBox(currentMotionBox, x, y) {
    // init motion box on demand
    var motionBox = currentMotionBox || {
        x: { min: coords.x, max: x },
        y: { min: coords.y, max: y }
    };   

    motionBox.x.min = Math.min(motionBox.x.min, x);
    motionBox.x.max = Math.max(motionBox.x.max, x);
    motionBox.y.min = Math.min(motionBox.y.min, y);
    motionBox.y.max = Math.max(motionBox.y.max, y);

    return motionBox; 
}
function requestWebcam() {
    var constraints = {
        audio: false,
        video: { width: captureWidth, height: captureHeight }
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(initSuccess)
        .catch(initError);

        
}
function initSuccess(requestedStream) {

    const seq0 = new Tone.Sequence((time, note) => {
        synth0.triggerAttackRelease(note, 2, time);
        // subdivisions are given as subarrays
    }, randomArray).start(0);
    seq0.playbackRate = 0.5;
    
    const seq = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, 2, time);
        // subdivisions are given as subarrays
    }, randomArray).start(0);
    seq.playbackRate = 0.5;

    const seq2 = new Tone.Sequence((time, note) => {
       synth2.triggerAttackRelease(note, 0.8, time);
       // subdivisions are given as subarrays
   }, randomArray2).start(0);

   const seq3 = new Tone.Sequence((time, note) => {
       synth3.triggerAttackRelease(note, 0.8, time);
       // subdivisions are given as subarrays
   }, randomArray3).start(0);

   const seq4 = new Tone.Sequence((time, note) => {
    synth4.triggerAttackRelease(note, 0.3, time);
    // subdivisions are given as subarrays
}, randomMelodyArray).start(0);
    seq4.playbackRate = 0.5;


   const pattern6 = new Tone.Sequence(function(time, note){
    synth6.triggerAttackRelease(note, 0.9);
    }, randomHiHatArray).start();
    pattern6.playbackRate = 0.5;
  
    const pattern5 = new Tone.Sequence(function(time, note){
    synth5.triggerAttackRelease(note, 0.9);
    }, randomDrumArray).start();
    pattern5.playbackRate = 0.5;

    
    
    Tone.start();
    Tone.Transport.start();
    stream = requestedStream;
    initSuccessCallback();
}
function initError(error) {
    console.log(error);
    initErrorCallback();
}
function start() {
    if (!stream) {
        throw 'Cannot start after init fail';
    }

    // streaming takes a moment to start
    video.addEventListener('canplay', startComplete);
    video.srcObject = stream;
}
function startComplete() {
    video.removeEventListener('canplay', startComplete);
    captureInterval = setInterval(capture, captureIntervalTime);
    startCompleteCallback();
}
function stop() {
    clearInterval(captureInterval);
    video.src = '';
    motionContext.clearRect(0, 0, 1, diffHeight);
    isReadyToDiff = false;
}


})();


/// SCALING functions:
// With this function the values won't go below a threshold 
function clamp(min, max, val) {
    return Math.min(Math.max(min, +val), max);
  }
  
//Scaling any incoming number
function generateScaleFunction(prevMin, prevMax, newMin, newMax) {
var offset = newMin - prevMin,
    scale = (newMax - newMin) / (prevMax - prevMin);
return function (x) {
    return offset + scale * x;
    };
};