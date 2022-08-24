
let numWindows = 5;

let id = 0;
let logos=0;
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
console.log(logos)
if(logos==0){
  var txt = document.createElement('p');
  txt.textContent='Imaginary Practices'
  document.getElementById('iblock').append(txt);
}

if(logos==1){
  var txt = document.createElement('p');
  txt.textContent='About'
  document.getElementById('iblock').append(txt);
}
}
/* old code
function loopDiv(numDiv, Div){

  var iDiv = Div;
  var jDiv = Div;
//document.getElementsByTagName('body')[0].appendChild(jDiv);

for(let i=0; i<numDiv; i++){
// Now create and append to iDiv
var inneriDiv = document.createElement('div');
inneriDiv.className = 'iblock-'+i;
var innerjDiv = document.createElement('div');
innerjDiv.className = 'jblock-'+i;
if(random(2)>1){
  inneriDiv.style.width = '100%';
  innerjDiv.style.width = '100%';
  innerjDiv.style.top = '50%';
}
else{
  inneriDiv.style.height = '100%';
  innerjDiv.style.height = '100%';
  innerjDiv.style.left = '50%';
}

inneriDiv.style.background = "#" + (Math.random() * 0xFFFFFF<<0).toString(16);
innerjDiv.style.background = "#" + (Math.random() * 0xFFFFFF<<0).toString(16);
// The variable iDiv is still good... Just append to it.
iDiv.appendChild(inneriDiv);
jDiv.appendChild(innerjDiv);


iDiv = inneriDiv;
jDiv = innerjDiv;
}


}
*/

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
if(rand<0.33){
recursiveDiv( i, iDiv );
recursiveDiv( i, jDiv );
}else if(rand<0.66){
recursiveDiv( i, jDiv );
if(i==3){ 
  var txt = document.createElement('p');
  txt.textContent='Imaginary Practices2'
  iDiv.append(txt);
  logos++
}
 }
else{
recursiveDiv( i, iDiv );
if(i==2){ 
  var txt = document.createElement('p');
  txt.textContent='Imaginary Practices3'
  jDiv.append(txt);
  logos++
}
}

}

/*
// r
function fractScl(target){
  if(!target.style){return;}
  console.log("frac!");
  console.log(target);
  
 var sib = target.nextSibling;

  var static = 0;
  
  var wdth = parseInt(target.style.width);
  wdth++;  
  if(wdth<99 && wdth>20){
    
      target.style.width = wdth+"%";
      
      //get the left pos
      var left = parseInt(target.style.left);
      // if its greater than 0
      if(left>0){
        // set new pos
        target.style.left = (100-wdth)+"%";
      }
      //else if theres a sibling
      else if (sib){
        // set the sibling width + pos
        sib.style.width = (100-wdth)+"%";
        sib.style.left = wdth;
      }
      
      //var id = "#"+target.id
      //console.log(id);
      //KUTE.to(id,{scale:1.5}).start();
    }else{static++;}
    // get the height
    var hght = parseInt(target.style.height);
    hght++;
    // if in height range
    if(hght<99 && hght>20){
      // set new height
      target.style.height = hght+"%";
      
      // get the top pos
      var top = parseInt(target.style.top);
      // if greater than 0
      if(top>0 ){
        // set to new offset
        target.style.top = (100-hght)+"%";
      }
      else if(sib){
        // if has a sibling set new size + offset
        sib.style.height = (100-top)+"%";
        sib.style.top = target.style.height;
      }
    }else{static++;}
  if(target.offsetParent ){
  fractScl(target.offsetParent);
  }
  
  return static;

}


function reScl(target){
  console.log("re!");
 console.log(target);
  
 var sib = target.nextSibling;
  var centr = 0;
  var wdth = parseInt(target.style.width);
    if(wdth!=50 && wdth!=100){
      if(wdth<50){wdth++;}
      else{wdth--;}
      target.style.width = wdth+"%";
      

      var left = parseInt(target.style.left);
      if(left>0){
        target.style.left = (100-width)+"%";
      }
      else if (sib){
        sib.style.width = (100-wdth)+"%";
        sib.style.left = target.style.width;
      }
    }else{centr++;}

    var hght = parseInt(target.style.height);
    if(hght!=50 && hght!=100){
      if(hght<50){hght++;}
      else{hght--;}
      target.style.height = hght+"%";
      
      
      var top = parseInt(target.style.top);
      if(top>0 ){
        target.style.top = (100-hght)+"%";
      }
      else if(sib){
        sib.style.height = (100-top)+"%";
        sib.style.top = target.style.height;
      }
    }else{centr++;}


  return centr;
  
}
*/