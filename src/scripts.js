//global vars
var points = 0;
var randCard;
var randCard2;
var results;
var results2;
var card1;
var card2;

//Tarot cards
//negitive,neutral,positive
var Fool = "Fool_MSH";
var Magician = "Magician_HSM";
var Priestess = "Priestess_SHM";
var Empress = "Empress_MHS";
var Emperor = "Emperor_HMS";
var Hierophant = "Hierophant_MHS";
var Lovers = "Lovers_SMH";
var Chariot = "Chariot_MHS";
var Strength = "Strength_MHS";
var Hermit = "Hermit_SHM";
var Fortune = "Fortune_SMH";
var Justice = "Justice_MSH";
var Hanged = "Hanged_SHM";
var Death = "Death_HMS";
var Temperance = "Temperance_SMH";
var Devil = "Devil_HSM";
var Tower = "Tower_HMS";
var Star = "Star_SHM";
var Moon = "Moon_HSM";
var Sun = "Sun_MHS";
var Judgement = "Judgement_SHM";
var World = "World_MSH";

var Tarot = [
  Fool,
  Magician,
  Priestess,
  Empress,
  Emperor,
  Hierophant,
  Lovers,
  Chariot,
  Strength,
  Hermit,
  Fortune,
  Justice,
  Hanged,
  Death,
  Temperance,
  Devil,
  Tower,
  Star,
  Moon,
  Sun,
  Judgement,
  World,
];

// Randomizer
function getRandomCard() {
  var num = Math.floor(Math.random() * 23);
  console.log("Tarot:" + Tarot[num]);
  return Tarot[num];
}

// getStats
function getStats(character, card) {
  var position = 0;

  if (character == "Mystic") {
    position = card.slice(-3).indexOf("M");
  } else if (character == "Steel") {
    position = card.slice(-3).indexOf("S");
  } else {
    position = card.slice(-3).indexOf("H");
  }
  console.log("Position: " + position);

  if (position == 0) {
    points = points - 1;
  } else if (position == 1) {
    points = points;
  } else {
    points = points + 1;
  }
  console.log("Points: " + points);
  return points;
}

function toHome() {
  document.getElementById("change").innerHTML =
    "<section id=main><p class=title>Lacuna</p> <img class='menu' onclick='quit()' src='img/cross.svg'><img id='girl' rel='preload' src='img/girl.gif'><div class='mainBG'><p class='mainT'>Play</p><div class='card1' onclick='toAR1(); find();'><img class='' src='img/trophey.svg'><br>Solo Draw</div><div class='card2' onclick='toAR2(); findTwo();'><img class='' src='img/swords.svg'><br>Duo Draw</div><p class='middleT'>Information</p><p class='middleP'>To draw a card for yourself (a daily horoscope) choose the solo option. To play with someone else, pick the duo option.<br><br>Keep in mind that each player needs to have a unique card.</p><img class='waves' src='img/wave.svg'></section>";
}

function toAR1() {
  document.getElementById("change").innerHTML =
    "<section id=main style='margin : 0px; overflow: hidden;'><img class='back' src='img/back.svg' onclick='toHome();'><p class='title'>Lacuna</p><div id='loadingMessage'></div><div class='cardoutline'></div><canvas id='canvas2' hidden></canvas><div id='output' hidden><div id='outputMessage'>No QR code detected.</div><div hidden><b>Data:</b> <span id='outputData'></span></div><div>Character:<span id='character'></span></div></div><div class='changetxt'>Please scan your player card.</div><img class='waves' src='img/wave.svg' style='top:550px';></section>";
}

function toGame(character) {
  //get random card
  randCard = getRandomCard();
  results = getStats(character, randCard);
  document.getElementById("change").innerHTML =
    "<section id=main style='margin : 0px; overflow: hidden;'><img class='back' src='img/back.svg' onclick='toHome(); clear();'><p class='title'>Lacuna</p><div class='results'><img onclick='animatedraw();' id='make-image' src='img/Mystic.svg'><p id='tarotname'></p><br><p id='yourdraw'>Click to draw a tarot card</p></div><img class='waves' src='img/wave.svg' style='top:550px';></section>";
  document.getElementById("make-image").src = "img/" + character + ".svg";
}

//two player
function toAR2() {
  document.getElementById("change").innerHTML =
    "<section id=main style='margin : 0px; overflow: hidden;'><img class='back' src='img/back.svg' onclick='toHome();'><p class='title'>Lacuna</p><div id='loadingMessage'></div><div class='cardoutline'></div><canvas id='canvas2' hidden></canvas><div id='output' hidden><div id='outputMessage'>No QR code detected.</div><div hidden><b>Data:</b> <span id='outputData'></span></div><div>Character:<span id='character'></span></div></div><div id='secondScan' class='changetxt'>Please scan first player's card.</div><img class='waves' src='img/wave.svg' style='top:550px';></section>";
}

function toDuoGame(character, character2) {
  //get random card
  console.log("Character: " + character);
  console.log(character2);
  card1 = character;
  card2 = character2;
  results = 0;
  results2 = 0;
  randCard = getRandomCard();
  randCard2 = getRandomCard();
  results = getStats(character, randCard);
  results2 = getStats(character2, randCard2);

  document.getElementById("change").innerHTML =
    "<section id=main class=second style='margin : 0px; overflow: hidden;'><img class='back' src='img/back.svg' onclick='toHome(); clear();'><p class='title'>Lacuna</p><div onclick='animatedraw2();'class='results'><img id='make-image' src='img/Mystic.svg'><p id='tarotname'></p><br><img id='make-image2' src='img/Mystic.svg'><p id='tarotname2'></p><br></div><p id='yourdraw'>Click to draw your tarot cards.</p><p id='stats'></p><div id='again'></div><img class='waves' src='img/wave.svg' style='top:550px';></section>";
  document.getElementById("make-image").src = "img/" + character + ".svg";
  document.getElementById("make-image2").src = "img/" + character2 + ".svg";
}

function findTwo() {
  //find character
  //structure based off of jsQR template https://github.com/cozmo/jsQR/blob/master/docs/index.html
  var video = document.createElement("video");
  var canvasElement = document.getElementById("canvas2");
  var canvas2 = canvasElement.getContext("2d");
  var loadingMessage = document.getElementById("loadingMessage");
  var outputContainer = document.getElementById("output");
  var outputMessage = document.getElementById("outputMessage");
  var outputData = document.getElementById("outputData");
  var userChoice = document.getElementById("character");

  function drawLine(begin, end, color) {
    canvas2.beginPath();
    canvas2.moveTo(begin.x, begin.y);
    canvas2.lineTo(end.x, end.y);
    canvas2.lineWidth = 4;
    canvas2.strokeStyle = color;
    canvas2.stroke();
  }
  //Basic QR code
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      video.srcObject = stream;
      video.setAttribute("playsinline", true);
      video.play();
      requestAnimationFrame(tick);
    });

  function tick() {
    loadingMessage.innerText = "";
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      loadingMessage.hidden = true;
      canvasElement.hidden = false;
      outputContainer.hidden = false;
      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvas2.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
      var imageData = canvas2.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      if (code) {
        drawLine(code.location.topLeftCorner, code.location.topRightCorner);
        drawLine(code.location.topRightCorner, code.location.bottomRightCorner);
        drawLine(
          code.location.bottomRightCorner,
          code.location.bottomLeftCorner
        );
        drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner);
        outputMessage.hidden = true;
        outputData.parentElement.hidden = false;
        outputData.innerText = code.data;
        userChoice.innerText = code.data;
        if (userChoice.innerText != "") {
          console.log(userChoice.innerText);
          console.log("Got character");
          randCard = userChoice.innerText;
          findSecondPlayer();
          return;
        }
      } else {
        outputMessage.hidden = false;
        outputData.parentElement.hidden = true;
      }
    }
    requestAnimationFrame(tick);
  }
}
//Find second
function findSecondPlayer() {
  console.log("Starting second");
  //find character
  var video = document.createElement("video");
  var canvasElement = document.getElementById("canvas2");
  var canvas2 = canvasElement.getContext("2d");
  var loadingMessage = document.getElementById("loadingMessage");
  var outputContainer = document.getElementById("output");
  var outputMessage = document.getElementById("outputMessage");
  var outputData = document.getElementById("outputData");
  var secondChoice = document.getElementById("character");

  document.getElementById("secondScan").innerHTML =
    "Please scan second player's card.";

  function drawLine(begin, end, color) {
    canvas2.beginPath();
    canvas2.moveTo(begin.x, begin.y);
    canvas2.lineTo(end.x, end.y);
    canvas2.lineWidth = 4;
    canvas2.strokeStyle = color;
    canvas2.stroke();
  }
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      video.srcObject = stream;
      video.setAttribute("playsinline", true);
      video.play();
      requestAnimationFrame(tick);
    });

  function tick() {
    loadingMessage.innerText = "";
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      loadingMessage.hidden = true;
      canvasElement.hidden = false;
      outputContainer.hidden = false;
      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvas2.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
      var imageData = canvas2.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      if (code) {
        drawLine(code.location.topLeftCorner, code.location.topRightCorner);
        drawLine(code.location.topRightCorner, code.location.bottomRightCorner);
        drawLine(
          code.location.bottomRightCorner,
          code.location.bottomLeftCorner
        );
        drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner);
        outputMessage.hidden = true;
        outputData.parentElement.hidden = false;
        outputData.innerText = code.data;
        secondChoice.innerText = code.data;
        randCard2 = secondChoice.innerText;
        if (
          //make sure the card is different 
          secondChoice.innerText != "" &&
          secondChoice.innerText != randCard
        ) {
          console.log(secondChoice.innerText);
          console.log("Got second character " + secondChoice.innerText);
          setTimeout(toDuoGame(randCard, randCard2), 3000);
          return;
        }
      } else {
        outputMessage.hidden = false;
        outputData.parentElement.hidden = true;
      }
    }
    requestAnimationFrame(tick);
  }
}

// see if card is good or bad
function animatedraw() {
  var goodorbadcard;
  if (results == 0) {
    goodorbadcard = "OK";
  } else if (results == 1) {
    goodorbadcard = "GOOD";
  } else {
    goodorbadcard = "BAD";
  }
  document.getElementById("make-image").src = "img/tarot.svg";
  document.getElementById("tarotname").innerHTML = randCard
    .slice(0, -4)
    .toUpperCase();
  document.getElementById("yourdraw").innerHTML =
    "You got the card <span class='emphasis'>" +
    randCard.slice(0, -4).toUpperCase() +
    "</span>. This is a <span class='emphasis'>" +
    goodorbadcard +
    "</span> card for you.";
}

function animatedraw2() {
  document.getElementById("make-image").src = "img/tarot.svg";
  document.getElementById("make-image2").src = "img/tarot.svg";
  document.getElementById("tarotname").innerHTML = randCard
    .slice(0, -4)
    .toUpperCase();
  document.getElementById("tarotname2").innerHTML = randCard2
    .slice(0, -4)
    .toUpperCase();

  if (results > results2) {
    document.getElementById("yourdraw").innerHTML = "Player 1 wins!";
  } else if (results == results2) {
    console.log("results:" + results, results2);
    var value = parallelize(results2, results);
    console.log("Value:" + value);
    if (value == 0) {
      document.getElementById("yourdraw").innerHTML = "It's a draw.";
    }
    if (value == 1) {
      document.getElementById("yourdraw").innerHTML = "Player 1 wins!";
    }
    if (value == 2) {
      document.getElementById("yourdraw").innerHTML = "Player 2 wins!";
    }
  } else {
    document.getElementById("yourdraw").innerHTML = "Player 2 wins!";
    console.log(parallelize(results2, results));
  }
  document.getElementById("again").innerHTML =
    "<div onclick='setTimeout(toDuoGame(card1, card2), 3000);' id='againbutton'>Play Again<div>";
}

function showCam() {
  const webcamjs = require("webcamjs");
  webcamjs.set({ width: 974, height: 628 });
  webcamjs.attach("#my_camera");
  const cameraEl = document.getElementById("my_camera");
  const videoEl = document.querySelector("#my_camera video");
  let isFrozen = false;
}

function quit() {
  window.close();
}

function find() {
  //find character
  var video = document.createElement("video");
  var canvasElement = document.getElementById("canvas2");
  var canvas2 = canvasElement.getContext("2d");
  var loadingMessage = document.getElementById("loadingMessage");
  var outputContainer = document.getElementById("output");
  var outputMessage = document.getElementById("outputMessage");
  var outputData = document.getElementById("outputData");
  var userChoice = document.getElementById("character");

  function drawLine(begin, end, color) {
    canvas2.beginPath();
    canvas2.moveTo(begin.x, begin.y);
    canvas2.lineTo(end.x, end.y);
    canvas2.stroke();
  }

  // Get webcam
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      video.srcObject = stream;
      video.setAttribute("playsinline", true);
      video.play();
      requestAnimationFrame(tick);
    });

  function tick() {
    loadingMessage.innerText = "";
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      loadingMessage.hidden = true;
      canvasElement.hidden = false;
      outputContainer.hidden = false;

      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvas2.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
      var imageData = canvas2.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      if (code) {
        drawLine(code.location.topLeftCorner, code.location.topRightCorner);
        drawLine(code.location.topRightCorner, code.location.bottomRightCorner);
        drawLine(
          code.location.bottomRightCorner,
          code.location.bottomLeftCorner
        );
        drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner);
        outputMessage.hidden = true;
        outputData.parentElement.hidden = false;
        outputData.innerText = code.data;
        userChoice.innerText = code.data;
        if (userChoice.innerText != "") {
          console.log(userChoice.innerText);
          console.log("Got character");
          setTimeout(toGame(userChoice.innerText), 3000);
          return;
        }
      } else {
        outputMessage.hidden = false;
        outputData.parentElement.hidden = true;
      }
    }
    requestAnimationFrame(tick);
  }
}

// clear variables after every game
function clear() {
  points = 0;
  randCard = "";
  results = 0;
  randCard2 = "";
  results2 = 0;
}

//parallel code
function parallelize(value1, value2) {
  var Parallel = require("paralleljs");
  var date = new Date();
  var day = date.getDay();
  var par = new Parallel([value1, value2, day]),
    log = function () {
      console.log(arguments);
    };
  function fib(n) {
    var fibo = n < 2 ? 1 : fib(n - 1) + fib(n - 2);
  }
  par.map(fib).then(log);
  console.log(par);
  changeValues();

  function changeValues() {
    setTimeout(function () {
      var firstPlayer = par["data"][0];
      var secondPlayer = par["data"][1];
      var dateResult = par["data"][2];
      var finalResult = 0;
      if (firstPlayer != secondPlayer) {
        var firstPlayer1 = Math.abs(firstPlayer - dateResult);
        var secondPlayer1 = Math.abs(secondPlayer - dateResult);
        if (firstPlayer1 < secondPlayer1) {
          return 1;
        }
        if (firstPlayer1 > secondPlayer1) {
          return 2;
        }
      } else {
        return 0;
      }
    }, 1000);
  }
}
