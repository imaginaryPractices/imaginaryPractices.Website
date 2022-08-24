
let numWindows = 5;

let id = 0;
let logos=0;

let titleWidth = 150;
let textVolume = 140000;
let whovolume =  60000;

let Title = false;
let About = false;
let Who = false;
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

/*
iDiv.onmouseover= function(event){
  //event.target.style.tabIndex = 10;
  
  var id = setInterval(animate, 5, event.target);

  function animate(target) {
    if (fractScl(target)<2) {
      clearInterval(id);
    }
  }

  //jtimer = setTimeout(fractScl, 30, event.target);
}
iDiv.onmouseout = function(event) {

  var id = setInterval(animate, 5, event.target);

  function animate(target) {
    if (reScl(target)<2) {
      clearInterval(id);
    }
  }
}
*/

recursiveDiv( 0, iDiv );
}


let hexString = "abcdef";
let randomColor = () => {
  let hexCode = "#";
  for( i=0; i<6; i++){
      hexCode += hexString[Math.floor(Math.random() * hexString.length)];
  }
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
/*
inneriDiv.style.position= "absolute";
innerjDiv.style.position= "absolute";
*/

if(random(2)>1){
  innerjDiv.className = 'blockRow';
  inneriDiv.className = 'blockRow';
 
}
else{
  innerjDiv.className = 'blockColumn';
  inneriDiv.className = 'blockColumn';
  
}
let colorOne = randomColor();
let colorTwo = randomColor();
let angle = Math.floor(Math.random() * 360);
inneriDiv.style.background = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
innerjDiv.style.background = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
var itimer, jtimer;



// The variable iDiv is still good... Just append to it.
Div.appendChild(inneriDiv);
Div.appendChild(innerjDiv);

iDiv = inneriDiv;
jDiv = innerjDiv;

i++;
var rand = random(1);

if(i<=2){
recursiveDiv( i, iDiv );
recursiveDiv( i, jDiv );
}else {

  if(!AddContent(iDiv)&&random(1)<0.5){
    recursiveDiv( i, iDiv );
  }
  if(!AddContent(jDiv)&&random(1)<0.5){
    recursiveDiv( i, jDiv );
  }
}

}

function AddContent(div){

  let added = false;
  if(FindVolume(div)>textVolume && !About){ 
    var title = document.createElement('h2');
    title.textContent='About';
    div.append(title);
    var txt = document.createElement('p');
    txt.textContent='Imaginary Practices is a design studio critically delving into the imaginaries of art and technology. We aim to step away from the evolved and embedded narratives of science and technology by challenging these dynamics with contemporary critical concepts founded on grounded research. A core ethos of Imaginary Practices is learning through sharing, practicing imagining together. We care about accessibility of skills and thought, aiming to decrypt the complex languages and ideas of new technologies through each project. We care about where we fit as designers and how our work can influence a cross section of fields that are still emerging, challenging the shrouded infrastructure of these technologies, aiming to not only make them visible but to imagine them anew.'
    div.append(txt);
    logos++
    About = true;
    console.log("about");
    added = true;
  }else if(FindVolume(div)>whovolume && !Who){ 
    

    var title = document.createElement('h2');
    title.textContent='Who';
    div.append(title);
    var txt = document.createElement('p');
    txt.textContent='George Simms';
    div.append(txt);
    txt = document.createElement('p');
    txt.textContent='Yasmin Morgan';
    div.append(txt);
    txt = document.createElement('p');
    txt.textContent='Megan Benson';
    div.append(txt);
    logos++
    Who = true;
    console.log("who");
    added = true;
  }
  else  if(div.clientWidth>titleWidth && !Title){ 
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


