
let numWindows = 8; // how many windows there are

let id = 0; // id num ++ every div thats entered to give them individual ids


let titleWidth = 150;// width needed for the website title
let textVolume = 2000; // the volume needed for the about text
let whovolume =  2000;// the volume needed for the who section

//bools to tell if one type has been displayed
let Title = false;
let About = false;
let Who = false;
 
//called at the begining
function setup() {
  // no p5 canvas
  noCanvas();
//create initial div
// create a div
var iDiv = document.createElement('div');
// id and class it 
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


// add it in the body
document.getElementById('mainBox').appendChild(iDiv);

// call the recursive div function
recursiveDiv( 0, iDiv );

// creat a new div
let infoDiv = document.createElement('div');
// id and class it as the info div
infoDiv.id = 'Info';
infoDiv.className = 'InfoBlock';
// add a random colour
 colorOne = randomColor();
 colorTwo = randomColor();
 angle = Math.floor(Math.random() * 360);
infoDiv.style.background = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
// Append it to the iDiv
iDiv.append(infoDiv);
}

// function to get a random hex colour, edit the hex string to get differnt outcomes
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
  
  // if we have reached max recursions, return
  if(i==numWindows){
    return;}
  // set iDiv/Jdiv from the div
  var iDiv = Div;
  var jDiv = Div;


// create a new div
  var inneriDiv = document.createElement('div');
  // id it 
  inneriDiv.id = id+"";
  id++;
  // set the z-index from the itteration
  inneriDiv.style.zIndex  = i;
  // create another div and do the same
  var innerjDiv = document.createElement('div');
  innerjDiv.id = id+"";
  id++;
  innerjDiv.style.zIndex  = i;

    if(i==1){
      if(random(2)>1){
        innerjDiv.className = 'blockBaseRow';
        inneriDiv.className = 'blockBaseRow';
      }
      else{
        innerjDiv.className = 'blockBaseColumn';
        inneriDiv.className = 'blockBaseColumn';
      }
      
    }else{

      // 50/50 set if block or column with css class
      if(random(2)>1){
        innerjDiv.className = 'blockRow';
        inneriDiv.className = 'blockRow';
      }
      else{
        innerjDiv.className = 'blockColumn';
        inneriDiv.className = 'blockColumn';
      }
    }
  // randomize the colour
  let colorOne = randomColor();
  let colorTwo = randomColor();
  let angle = Math.floor(Math.random() * 360);
  inneriDiv.style.background = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
  innerjDiv.style.background = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;

// append the inner divs to the last div
  Div.appendChild(inneriDiv);
  Div.appendChild(innerjDiv);

  // set i/j divs fro the last ones
  iDiv = inneriDiv;
  jDiv = innerjDiv;

  
// if itteration is greater than
  if(i>1){
    // add one to the itteration i
    i++;
    // create a random 0-1
    var rand = random(1);
    // if you cant add content to iDiv and rand is bellow 0.5
    if(!AddContent(iDiv) && rand>0.5){
      // recurse the iDiv
      recursiveDiv( i, iDiv );
    } else if(!AddContent(jDiv) && rand<0.5){ // if you cant add to jDiv and rand is less than 0.5
     // recurse jdiv
      recursiveDiv( i, jDiv );
    } 
  }
  else {
    // add one to the itteration i
    i++;
    // recurse both divs
    recursiveDiv( i, iDiv );
    recursiveDiv( i, jDiv );
  }

}

// add content function
function AddContent(div){

  // rand between 0-4
  let rand = random(4);
  // bool to see if we have added anything
  let added = false;
  // if volume is big enough for about txt + it hasnt been writen + rand
  if(FindVolume(div)>textVolume && !About && rand<1){ 
    // Add an About title
    var title = document.createElement('h2');
    title.textContent='About';
    div.append(title);
    // add an on hover function adding text to the info div
    div.onmouseover = function(){
      let infoDiv = document.getElementById("Info");

      infoDiv.innerHTML = `<h2>What</h2>
      <p> Imaginary Practices is a design studio critically delving into the imaginaries of art and technology. We aim to step away from the evolved and embedded narratives of science and technology by challenging these dynamics with contemporary critical concepts founded on grounded research. A core ethos of Imaginary Practices is learning through sharing, practicing imagining together. We care about accessibility of skills and thought, aiming to decrypt the complex languages and ideas of new technologies through each project. We care about where we fit as designers and how our work can influence a cross section of fields that are still emerging, challenging the shrouded infrastructure of these technologies, aiming to not only make them visible but to imagine them anew.   </p>
            `;
    }
    
    // set about to true to show its been added
    About = true;
    // set added to true to show something was added
    added = true;
  }else if(FindVolume(div)>whovolume && !Who && rand<2){ // if who volume is big enough
    
// add the title of who 
    var title = document.createElement('h2');
    title.textContent='Who';
    div.append(title);

    // on mouse over add the text to the info div
    div.onmouseover = function(){
      let infoDiv = document.getElementById("Info");

      infoDiv.innerHTML = `<h2>Who</h2>
      <p> George Simms </p>
      <p> Yasmin Morgan </p>
      <p> Megan Benson </p>
      `;
    }
    // set who to true
    Who = true;
    // set added to true
    added = true;
  }
  else  if(div.clientWidth>titleWidth && !Title && rand<3){ // if we can add a title 
    // add the website title as text
    var txt = document.createElement('p');
    txt.textContent='Imaginary Practices'
    div.append(txt);
    // set bools to tru
    Title = true;
    added = true;
  }
  // return if something was added 
  return added;
}

// find div volume w*h
function FindVolume(div){
  return div.clientWidth * div.clientHeight;
}


