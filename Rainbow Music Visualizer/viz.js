/////////////////////////////////////////
//          Made by Aprotonix          //
/////////////////////////////////////////
let canvas = document.getElementById("canvas");
let max_height, startPos, vizWidth, midY;

let backgroundColor = "rgb(0,0,0)";
let maxVal = 3.5;

let interpolate = false;
let whiteInside = true;
let cleanLineEnd = false;
let showHour = true;
let policeHour = "Arial";
let hourSize = 1;
let xHour = 2.0;
let yHour = 8.0;
let hour_format12 = false;;
let showSecond = false;
let shadow = true;
let shadowIntensity = 30;
let shadowWithMusic = true;
let minimalAudio = 0.005;


let ctx = canvas.getContext("2d");
let gradient;
let defaultAudioArray = []



function setSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  max_height = window.innerHeight * 0.4;
  startPos = window.innerWidth * 0.05;
  vizWidth = window.innerWidth * 0.9;
  midY = canvas.height / 2;

  // Creat Rainbow Gradient
  let colorGradientCanvas = ctx.createLinearGradient(0, 0, canvas.width, 0);
  colorGradientCanvas.addColorStop(0.05, "red");
  colorGradientCanvas.addColorStop(0.17, "orange");
  colorGradientCanvas.addColorStop(0.33, "yellow");
  colorGradientCanvas.addColorStop(0.5, "green");
  colorGradientCanvas.addColorStop(0.67, "blue");
  colorGradientCanvas.addColorStop(0.83, "indigo");
  colorGradientCanvas.addColorStop(1, "violet");


  let tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width;
  tempCanvas.height = 1;
  let tempCtx = tempCanvas.getContext("2d");

  tempCtx.fillStyle = colorGradientCanvas;
  tempCtx.fillRect(0, 0, canvas.width, 1);

  colors = []; // Vider le tableau
  for (let x = 0; x < canvas.width; x++) {
    let pixelData = tempCtx.getImageData(x, 0, 1, 1).data;
    colors[x] = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
  }
  
  generateRandomAudio();
  
}

window.onload = () => {
  setSize();
};

window.onresize = () => {
  setSize();
};

function generateRandomAudio() {
  defaultAudioArray = [];
  for (let x = 0; x < 120; x++) {
    defaultAudioArray.push( Math.random());
  }
}

function livelyPropertyListener(name, val) {
  switch(name) {
   
    case "interpolate":
      interpolate = val;
      break;    
    case "maxVal":
      maxVal = (100-val)/10;
      break;  
    case "backgroundColor":
      var color = hexToRgb(val);
      backgroundColor = `rgb(${color.r},${color.g},${color.b})`;   
      break;
    case "showHour":
      showHour = val;
      break;
    case "policeHour":
      policeHour = val;
      break;
    case "xHour":
      xHour = val/10;
      break;
    case "yHour":
      yHour = val/10;
      break;
    case "showSecond":
      showSecond = val;
      break;
    case "format12":
        hour_format12 = val;
        break;
    case "shadow":
      shadow = val;
      break;
    case "shadowIntensity":
      shadowIntensity = val;
      break;
    case "hourSize":
      hourSize = val/10;
      break;
    case "whiteInside":
      whiteInside = val;
      break;
    case "cleanLineEnd":
      cleanLineEnd = val;
      break;

    case "shadowWithMusic":
      shadowWithMusic = val;
      break;
    case "regenerate":
      generateRandomAudio();
      break;
    case "minimalAudioValue":
      minimalAudio = val/1000;
      break;
  }
}


function interpolateAudioArray(audioArray) {
  let interpolatedArray = [];

  for (let i = 0; i < audioArray.length - 1; i++) {
 

    interpolatedArray.push(audioArray[i]);
    const average = (audioArray[i] + audioArray[i + 1]) / 2;
    interpolatedArray.push(average);
  }

  interpolatedArray.push(audioArray[audioArray.length - 1]);

  return interpolatedArray;
}

function clearNoiseArray(audioArray) {


  for (let i = 0; i < audioArray.length - 1; i++) {
      if (audioArray[i]<minimalAudio) {
        audioArray[i] = 0;
      }
  }
  return audioArray;

}

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  let period = ""; // Pour indiquer AM ou PM en format 12 heures

  if (hour_format12) {
    period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convertit 0h à 12h et 13h à 1h
  }

  hours = String(hours).padStart(2, '0'); // Ajout du zéro si nécessaire

  if (showSecond) {
    return hour_format12
      ? `${hours}:${minutes}:${seconds} ${period}`
      : `${hours}:${minutes}:${seconds}`;
  } else {
    return hour_format12
      ? `${hours}:${minutes} ${period}`
      : `${hours}:${minutes}`;
  }
}

function modifyDefault() {
  for (let x = 0; x < 120; x++) {

    defaultAudioArray[x] += (Math.random() * 0.5) - 0.25;
  }
}

function livelyAudioListener(audioArray) {
  var averageAudio = 0.5;
  var count = 0;


  audioArray = clearNoiseArray(audioArray);
  for (let x = 0; x < audioArray.length; x++) {

      count+=audioArray[x]
    
  }
  if (count == 0) {
    audioArray = defaultAudioArray;
    //modifyDefault(); To creat a variation of the spectre when there are no sound
  }
  else {
    averageAudio = (count/audioArray.length);
  }

  if (interpolate) {
  audioArray = interpolateAudioArray(audioArray);
  }
  const offSet = (vizWidth / audioArray.length);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (showHour) {
    ctx.fillStyle = "white";
    ctx.font = `bold ${max_height*0.3*hourSize}px ${policeHour}`;
    ctx.textAlign = "center"; // Centrer le texte
    ctx.fillText(getCurrentTime(), canvas.width / xHour, canvas.width / yHour);
  }
  if (shadow) {
    ctx.shadowBlur = shadowIntensity;
    ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
  }

  for (let x = 0; x < audioArray.length; x++) {
    const barHeight = (audioArray[x] / maxVal) * max_height;
    const posX = startPos + x * offSet;
    const color = colors[Math.floor(posX)];

    if (shadow) {
      ctx.shadowColor = color
      if (shadowWithMusic) {
        ctx.shadowBlur = shadowIntensity*(audioArray[x]+averageAudio)
      }

    };

    lineGradient = ctx.createLinearGradient(0, midY, 0, midY - barHeight);
    if (whiteInside) {lineGradient.addColorStop(0.01, "white");}
    lineGradient.addColorStop(0.05, color);
    if (cleanLineEnd) {lineGradient.addColorStop(0.7, backgroundColor);}
    
    

    ctx.fillStyle = lineGradient;

    ctx.beginPath();
    ctx.moveTo(posX, midY); 
    //ctx.lineTo((posX + offSet / 5)-plusWidth, midY - barHeight*0.01); 
    ctx.lineTo((posX + offSet / 5), midY - barHeight*0.05); 
    ctx.lineTo(posX + offSet / 2, midY - barHeight);
    ctx.lineTo((posX + (offSet / 5)*4), midY - barHeight*0.05); 
    //ctx.lineTo((posX + (offSet / 5)*4)+plusWidth, midY - barHeight*0.01); 

    ctx.lineTo(posX + offSet, midY);
    ctx.closePath();
    ctx.fill();
    //ctx.fillRect(posX, midY - barHeight, offSet*0.7 , barHeight);

    lineGradient = ctx.createLinearGradient(0, midY, 0, midY+barHeight);
    if (whiteInside) {lineGradient.addColorStop(0.02, "white");}
    lineGradient.addColorStop(0.05, color);
    if (cleanLineEnd) {lineGradient.addColorStop(0.7, backgroundColor);}
    
    
   
    ctx.fillStyle = lineGradient;
    //ctx.fillRect(posX, midY, offSet *0.7, barHeight); 
    ctx.beginPath();
    ctx.moveTo(posX, midY);
    //ctx.lineTo((posX + offSet / 5)-plusWidth, midY + barHeight*0.01); 
    ctx.lineTo((posX + offSet / 5), midY + barHeight*0.05); 
    ctx.lineTo(posX + offSet / 2, midY + barHeight); 
    ctx.lineTo((posX + (offSet / 5)*4), midY + barHeight*0.05); 
    //ctx.lineTo((posX + (offSet / 5)*4)+plusWidth, midY + barHeight*0.01); 
    
    ctx.lineTo(posX + offSet, midY); 
    ctx.closePath();
    ctx.fill();
  }
  if (shadow) {
    ctx.shadowBlur = 0;

  }
  
}
