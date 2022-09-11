
let numWindows = 5;

let id = 0;
let logos=0;

let titleWidth = 150;
let textVolume = 2000;
let whovolume =  2000;

let Title = false;
let About = false;
let Who = false;

//for colours, feel free to add / remove change the palettes
let palettes = [
  ["264653","2A9D8F","E9C464A","F4A261","E76F51"], //https://coolors.co/palette/264653-2a9d8f-e9c46a-f4a261-e76f51
  ["F0EAD2","DDE5B6","ADC178","A98467","6C584C"], // https://coolors.co/palette/f0ead2-dde5b6-adc178-a98467-6c584c
  ["000000","14213D","FCA311","E5E5E5","FFFFFF"], //https://coolors.co/palette/000000-14213d-fca311-e5e5e5-ffffff
  ["C9CBA3","FF£1A8","E26D5C","723D46","472D30"] //https://coolors.co/palette/000000-14213d-fca311-e5e5e5-ffffff
];
let randomPal = Math.floor(Math.random() * palettes.length);
 
function setup() {
  noCanvas();
//create initial div
var iDiv = document.createElement('div');
iDiv.id = 'iblock';
iDiv.className = 'BaseBlock';
// randomize colour
let colorOne = randomColor();
let colorTwo = randomColor();
let angle = Math.floor(Math.random() * 360);
iDiv.style.background = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
// full window
iDiv.style.height =  windowHeight+"px";
iDiv.style.width =  windowWidth+"px";
//iDiv.style.position = "fixed";
iDiv.style.flex = 1;

// add it in the body
//let box = document.getElemenById('mainBox');
document.getElementById('mainBox').appendChild(iDiv);


recursiveDiv( 0, iDiv );

let infoDiv = document.createElement('div');
infoDiv.id = 'Info';
infoDiv.className = 'InfoBlock';

iDiv.append(infoDiv);
}


let hexString = "abcdef";
// meg - I've added some colour palettes (not set on any atm) above, but sometimes white appears
// despite white not being in any ofthe palettes? :/
let randomColor = () => {
  let hexCode = "#";
  // let palette = ["264653","2A9D8F","E9C464A","F4A261","E76F51"];
  
  let randomCol = Math.floor(Math.random() * palettes[randomPal].length);
  console.log(random);
  hexCode += palettes[randomPal][randomCol];
  console.log(randomPal, randomCol, hexCode);
  // for( i=0; i<6; i++){
  //     hexCode += hexString[Math.floor(Math.random() * hexString.length)];
  // }
  return hexCode;
}


// recursive function to make divs in divs
function recursiveDiv( i, Div )
{
  if(i==numWindows){
    return;}
  var iDiv = Div;
  var jDiv = Div;


  var inneriDiv = document.createElement('div');
//inneriDiv.className = 'block';
inneriDiv.id = id+"";
id++;
inneriDiv.style.zIndex  = i;
var innerjDiv = document.createElement('div');

innerjDiv.id = id+"";
id++;
innerjDiv.style.zIndex  = i;

if(i==0){
  if(random(2)>1){
    innerjDiv.className = 'blockBaseRow';
    inneriDiv.className = 'blockBaseRow';
   
  }
  else{
    innerjDiv.className = 'blockBaseColumn';
    inneriDiv.className = 'blockBaseColumn';
    
  }

}
else{

  if(random(2)>1){
    innerjDiv.className = 'blockRow';
    inneriDiv.className = 'blockRow';
   
  }
  else{
    innerjDiv.className = 'blockColumn';
    inneriDiv.className = 'blockColumn';
    
  }

}

let colorOne = randomColor();
let colorTwo = randomColor();
let angle = Math.floor(Math.random() * 360);
// inneriDiv.style.background = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
inneriDiv.style.background = colorOne;
innerjDiv.style.background = colorTwo;

// innerjDiv.style.background = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
var itimer, jtimer;



// The variable iDiv is still good... Just append to it.
Div.appendChild(inneriDiv);
Div.appendChild(innerjDiv);

iDiv = inneriDiv;
jDiv = innerjDiv;

i++;

if(i>2){
  var rand = random(1);
  if(!AddContent(iDiv) && rand>0.5){
    recursiveDiv( i, iDiv );
  } 
  if(!AddContent(jDiv) && rand<0.5){
    recursiveDiv( i, jDiv );
  } 
}
else {
recursiveDiv( i, iDiv );
recursiveDiv( i, jDiv );
}

}

function AddContent(div){

  let rand = random(4);
  let added = false;
  if(FindVolume(div)>textVolume && !About && rand<1){ 
    var title = document.createElement('h2');
    title.textContent='About';
    div.append(title);
    div.onmouseover = function(){
      let infoDiv = document.getElementById("Info");

      infoDiv.innerHTML = `<h2>What</h2>
      <p> Imaginary Practices is a design studio critically delving into the imaginaries of art and technology. We aim to step away from the evolved and embedded narratives of science and technology by challenging these dynamics with contemporary critical concepts founded on grounded research. A core ethos of Imaginary Practices is learning through sharing, practicing imagining together. We care about accessibility of skills and thought, aiming to decrypt the complex languages and ideas of new technologies through each project. We care about where we fit as designers and how our work can influence a cross section of fields that are still emerging, challenging the shrouded infrastructure of these technologies, aiming to not only make them visible but to imagine them anew.   </p>
            `;
    }
    
    
    logos++
    About = true;
    console.log("about");
    added = true;
  }else if(FindVolume(div)>whovolume && !Who && rand<2){ 
    

    var title = document.createElement('h2');
    title.textContent='Who';
    div.append(title);

    div.onmouseover = function(){
      let infoDiv = document.getElementById("Info");

      infoDiv.innerHTML = `<h2>Who</h2>
      <p> George Simms </p>
      <p> Yasmin Morgan </p>
      <p> Megan Benson </p>
      `;
    }

    logos++
    Who = true;
    console.log("who");
    added = true;
  }
  else  if(div.clientWidth>titleWidth && !Title && rand<3){ 
    console.log("Title");

    var txt = document.createElement('p');
    txt.textContent='Imaginary Practices'
    div.append(txt);
    logos++
    Title = true;
    added = true;
  }

  return added;
}

function FindVolume(div){
  return div.clientWidth * div.clientHeight;
}


