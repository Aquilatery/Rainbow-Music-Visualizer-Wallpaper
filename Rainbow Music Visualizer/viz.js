/////////////////////////////////////////
//          Made by Aprotonix          //
/////////////////////////////////////////
let canvas = document.getElementById("canvas");
let max_height, startPos, vizWidth, midY;

let backgroundColor = "rgb(0,0,0)";
let maxVal = 3.5;

let interpolate = false;
let whiteInside = false;
let cleanLineEnd = false;
let showHour = true;
let policeHour = "Arial";
let policeBold = true;
let hourSize = 1;
let dateSize = 1;
let xHour = 2.0;
let yHour = 8.0;
let showDate = true
let showYear = false
let xDate = 2.0;
let yDate = 8.0;
let hour_format12 = false;;
let showSecond = false;
let shadow = true;
let shadowIntensity = 30;
let shadowWithMusic = true;
let minimalAudio = 0.001; //Change
//1.2
let round_theme = true
let spacing_between_bar = 0.25
let add_audio_value = 6.0
let line_angle = 4.0
let custom_gradient = true

let equalizer = 0;

let color1 = "rgb(0,0,255)"
let color2 = "rgb(127, 0,255)"

let hourColor = "rgb(255,255,255)"
let dateColor = "rgb(255,255,255)"

let hide_no_music = false
let reverse_audio = false

// let background_image = new Image();
// background_image.src = "./backround/wallpaper1.png";
let backround_colored = true;

let ctx = canvas.getContext("2d");
let gradient;
let defaultAudioArray = [];


livelyPropertyListener("", "");

function setSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  max_height = window.innerHeight * 0.4;
  startPos = window.innerWidth * 0.05;
  vizWidth = window.innerWidth * 0.9;
  midY = canvas.height / 2;

  generate_canvas_gradiant();

  generateRandomAudio();

}

window.onload = () => {
  setSize();
};

window.onresize = () => {
  setSize();
};


function generate_canvas_gradiant() {
  let colorGradientCanvas = ctx.createLinearGradient(0, 0, canvas.width, 0);

  if (custom_gradient) {
    colorGradientCanvas.addColorStop(0.0, color1);//BUG With blue
    colorGradientCanvas.addColorStop(1, color2);
  }
  else {
    // Creat Rainbow Gradient
    colorGradientCanvas.addColorStop(0.05, "red");
    colorGradientCanvas.addColorStop(0.17, "orange");
    colorGradientCanvas.addColorStop(0.33, "yellow");
    colorGradientCanvas.addColorStop(0.5, "green");
    colorGradientCanvas.addColorStop(0.67, "blue");
    colorGradientCanvas.addColorStop(0.83, "indigo");
    colorGradientCanvas.addColorStop(1, "violet");
  }

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
}


function generateRandomAudio() {
  defaultAudioArray = [];
  for (let x = 0; x < 120; x++) {
    defaultAudioArray.push(Math.random());
  }
}

function livelyPropertyListener(name, val) {
  switch (name) {

    case "interpolate":
      interpolate = val;
      break;
    case "maxVal":
      maxVal = (100 - val) / 10;
      break;
    case "backgroundColorization":

      backgroundColor = val;

      break;
    
    case "policeHour":
      policeHour = val;
      break;
    case "boldText":
      policeBold = val;
      break;
    case "showHour":
      showHour = val;
      break;
    case "hourColor":
      hourColor = val;
      break;
    case "xHour":
      xHour = ((100-val) / 10);
      break;
    case "yHour":
      yHour = (100-val) / 10;
      break;
    case "hourSize":
      hourSize = val / 10;
      break;
    case "showSecond":
      showSecond = val;
      break;
    case "format12":
      hour_format12 = val;
      break;
    case "showDate":
      showDate = val;
      break;
    case "dateColor":
      dateColor = val;
      break;
    case "xDate":
      xDate = ((100-val) / 10);
      break;
    case "yDate":
      yDate = (100-val) / 10;
      break;
    case "dateSize":
      dateSize = val / 10;
      break;
    case "shadow":
      shadow = val;
      break;
    case "shadowIntensity":
      shadowIntensity = val;
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
      minimalAudio = val / 1000;
      break;
    case "spaceBetweenLine":
      spacing_between_bar = val / 100;
      break;
    case "addAudioValue":
      add_audio_value = val / 10;
      break;
    case "lineAngle":
      line_angle = val / 10;
      break;
    case "customGradient":
      custom_gradient = val;
      generate_canvas_gradiant();
      break;
    case "color1":
      color1 = val;
      generate_canvas_gradiant();
      break;
    case "color2":
      color2 = val;
      generate_canvas_gradiant();
      break;
    case "roundMode":
      round_theme = val;
      break;

    // case "fontSelect":
    //   addFont(val);
    //   policeHour = val;
    //   break;
    case "backroundSelect":
      addimage(val);
      break;
    case "backroundWallpaper":
      backround_colored = !val
      break;

    case "equalizer":
      equalizer = val;
      break;

    case "ReverseAudio":
      reverse_audio = val;
      break;
    case "HideNoMusic":
      hide_no_music = val;
      break;
    default:

      break;

  }
}

function addimage(path) {
  background_image = new Image();
  background_image.src = path;

  background_image.onload = function () {
    // Dessiner l'image sur tout le canvas
    if (!backround_colored) {
      ctx.drawImage(background_image, 0, 0, canvas.width, canvas.height);
    }
  };
}

function equalize(audioArray) {
  let mid = Math.floor((audioArray.length / 4)*3); // Correction de int
  let value = equalizer / mid; // Déclaration correcte de la variable


    
    for (let i = mid; i < audioArray.length ; i++) {
      audioArray[i] = audioArray[i]*(value*(i-mid));

    }

  return audioArray;

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

function getFormattedDate() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const now = new Date();
  const dayName = days[now.getDay()]; // Day name
  const date = now.getDate(); // Day of the month
  const monthName = months[now.getMonth()]; // Month name
  
  if (showYear) {
    const year = now.getFullYear(); // Year
    return `${dayName} ${date} ${monthName} ${year}`;
  }
  else {
    return `${dayName} ${date} ${monthName}`;
  }
  
}

// Example usage
console.log(getFormattedDate());

function modifyDefault() {
  for (let x = 0; x < 120; x++) {

    defaultAudioArray[x] += (Math.random() * 0.5) - 0.25;
  }
}

// function addFont(path) {
//   const fontName = path.split('/').pop().split('.')[0]; // Utilise le nom du fichier sans extension comme nom de la police
//   const font = new FontFace(fontName, `url(${path})`);

//   font.load().then(function (loadedFont) {
//     document.fonts.add(loadedFont);
//     document.body.style.fontFamily = fontName;
//   });
// }
function showTime() {
  if (showHour) {
    ctx.fillStyle = hourColor;
    if (policeBold) {
      ctx.font = `bold ${max_height * 0.3 * hourSize}px ${policeHour}`;
    }
    else {
      ctx.font = `${max_height * 0.3 * hourSize}px ${policeHour}`;
    }
    
    ctx.textAlign = "center"; // Centrer le texte
    ctx.fillText(getCurrentTime(), canvas.width / xHour, canvas.width / yHour);
    //ctx.fillText(backgroundColor, canvas.width / xHour, canvas.width / yHour);
  }
  if (showDate) {
    
    ctx.fillStyle = dateColor;
    if (policeBold) {
      ctx.font = `bold ${max_height * 0.3 * dateSize}px ${policeHour}`;
    }
    else {
      ctx.font = `${max_height * 0.3 * dateSize}px ${policeHour}`;
    }
    ctx.textAlign = "center"; // Centrer le texte
    ctx.fillText(getFormattedDate(), canvas.width / xDate, canvas.width / yDate);
    //ctx.fillText(backgroundColor, canvas.width / xHour, canvas.width / yHour);

  }
}

function clearCanvas() {
  ctx.fillStyle = backgroundColor;
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
  //ctx.drawImage(background_image, 0, 0, canvas.width, canvas.height);
  if (backround_colored) {

    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  else {
    ctx.drawImage(background_image, 0, 0, canvas.width, canvas.height);
  }

}

function livelyAudioListener(audioArray) {
  var averageAudio = 0.5;
  var count = 0;

  if (reverse_audio) {
    audioArray.reverse();
  }
  for (let x = 0; x < audioArray.length; x++) {count += audioArray[x]}
  if (count == 0) {
    if (hide_no_music)
    {clearCanvas();
      showTime();
      
      return;}
    else { audioArray = defaultAudioArray;}
   
  }
  else {
    averageAudio = (count / audioArray.length);
    if (equalizer!=0) {
    audioArray = equalize(audioArray);
    }

  }

  if (interpolate) {
    audioArray = interpolateAudioArray(audioArray);
  }

  const offSet = (vizWidth / audioArray.length);
  clearCanvas();


  if (shadow) {
    ctx.shadowBlur = shadowIntensity;
    ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
  }

  for (let x = 0; x < audioArray.length; x++) {
    let audioValue = audioArray[x];

    if (audioValue < minimalAudio) {
      audioValue = minimalAudio;
    }

    const barHeight = (audioValue / maxVal) * max_height + add_audio_value;
    const posX = startPos + x * offSet;
    const color = colors[Math.floor(posX)];

    if (shadow) {
      ctx.shadowColor = color
      if (shadowWithMusic) {
        ctx.shadowBlur = shadowIntensity * (audioValue + averageAudio)
      }

    };

    let invert_spacing_between_bar = 1 - spacing_between_bar

    lineGradient = ctx.createLinearGradient(0, midY, 0, midY - barHeight);
    if (whiteInside) { lineGradient.addColorStop(0.01, "white"); }
    lineGradient.addColorStop(0.05, color);
    if (cleanLineEnd) { lineGradient.addColorStop(0.7, backgroundColor); }

    ctx.fillStyle = lineGradient;
    if (round_theme) {
      /////////////////////////////////////////HAUT
      ctx.beginPath();
      ctx.moveTo(posX + offSet * spacing_between_bar, midY);

      // Rounded bottom-left corner
      ctx.lineTo(posX + offSet * spacing_between_bar, midY - barHeight * 0.9);
      ctx.arcTo(
        posX + offSet * spacing_between_bar,
        midY - barHeight,
        posX + offSet / 2,
        midY - barHeight,
        line_angle
      );

      // Top of the bar
      ctx.lineTo(posX + offSet / 2, midY - barHeight);

      // Rounded top-right corner
      ctx.arcTo(
        posX + offSet * invert_spacing_between_bar, // Symmetric spacing
        midY - barHeight,
        posX + offSet * invert_spacing_between_bar,
        midY - barHeight * 0.9,
        line_angle
      );

      // Return to base with rounded bottom-right corner
      ctx.lineTo(posX + offSet * invert_spacing_between_bar, midY);
      if (whiteInside) {
      ctx.closePath();
      ctx.fill();
      }


      /////////////////////////////////////////BAS

      lineGradient = ctx.createLinearGradient(0, midY, 0, midY + barHeight);
      if (whiteInside) { lineGradient.addColorStop(0.02, "white"); }
      lineGradient.addColorStop(0.05, color);
      if (cleanLineEnd) { lineGradient.addColorStop(0.7, backgroundColor); }
      ctx.fillStyle = lineGradient;

      if (whiteInside) {ctx.beginPath();}
      // ctx.beginPath();
      ctx.moveTo(posX + offSet * spacing_between_bar, midY);

      // Rounded bottom-left corner
      ctx.lineTo(posX + offSet * spacing_between_bar, midY + barHeight * 0.9);
      ctx.arcTo(
        posX + offSet * spacing_between_bar,
        midY + barHeight,
        posX + offSet / 2,
        midY + barHeight,
        line_angle
      );

      // Top of the bar
      ctx.lineTo(posX + offSet / 2, midY + barHeight);

      // Rounded top-right corner
      ctx.arcTo(
        posX + offSet * invert_spacing_between_bar, // Symmetric spacing
        midY + barHeight,
        posX + offSet * invert_spacing_between_bar,
        midY + barHeight * 0.9,
        line_angle
      );

      // Return to base with rounded bottom-right corner
      ctx.lineTo(posX + offSet * (1 - spacing_between_bar), midY);

      ctx.closePath();
      ctx.fill();


    }
    else {
      ctx.beginPath();
      ctx.moveTo(posX, midY);
      //ctx.lineTo((posX + offSet / 5)-plusWidth, midY - barHeight*0.01); 
      ctx.lineTo((posX + offSet / 5), midY - barHeight * 0.05);
      ctx.lineTo(posX + offSet / 2, midY - barHeight);
      ctx.lineTo((posX + (offSet / 5) * 4), midY - barHeight * 0.05);
      //ctx.lineTo((posX + (offSet / 5)*4)+plusWidth, midY - barHeight*0.01); 

      ctx.lineTo(posX + offSet, midY);
      ctx.closePath();
      ctx.fill();
      //ctx.fillRect(posX, midY - barHeight, offSet*0.7 , barHeight);

      lineGradient = ctx.createLinearGradient(0, midY, 0, midY + barHeight);
      if (whiteInside) { lineGradient.addColorStop(0.02, "white"); }
      lineGradient.addColorStop(0.05, color);
      if (cleanLineEnd) { lineGradient.addColorStop(0.7, backgroundColor); }



      ctx.fillStyle = lineGradient;
      //ctx.fillRect(posX, midY, offSet *0.7, barHeight); 
      ctx.beginPath();
      ctx.moveTo(posX, midY);
      //ctx.lineTo((posX + offSet / 5)-plusWidth, midY + barHeight*0.01); 
      ctx.lineTo((posX + offSet / 5), midY + barHeight * 0.05);
      ctx.lineTo(posX + offSet / 2, midY + barHeight);
      ctx.lineTo((posX + (offSet / 5) * 4), midY + barHeight * 0.05);
      //ctx.lineTo((posX + (offSet / 5)*4)+plusWidth, midY + barHeight*0.01); 

      ctx.lineTo(posX + offSet, midY);
      ctx.closePath();
      ctx.fill();
    }
  }



  if (shadow) {
    ctx.shadowBlur = 0;

  }
  
  showTime();

}
