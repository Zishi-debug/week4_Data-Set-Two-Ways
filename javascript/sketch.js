//this chart shows  how my sanity changes in this week. Coding makes me insane.
// I am deadge >_<


let Sanity;
let amplitude;
let num;//how many vertex on the line
let canvas;

function setup() {
  canvas= createCanvas(windowWidth,windowHeight);
  canvas.parent("sketch-container");
  
  num= 10;

  //no animation / interaction chart
  noLoop();

  fetch("./json/Youcy sanity.json").then(function(response) {
    return response.json();
  }).then(function(data) {
    
    Sanity = data.sanity;

    //using no Loop? you can just call your function once the data is loaded
    drawChart();
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

}

function draw() {
  background(0);
  drawChart();
}

function drawChart(){

  // Compute maximum amount (for normalization)
  let maxval = 0; 
  for (let i=0; i<Sanity.length; i++) {
    if ( Sanity[i].Hp > maxval) {
      maxval = Sanity[i].Hp;
    }
  }

  let spacing = 15;//spacing between the bars
  // Display chart
  for (let i=0; i<Sanity.length; i++) {

    let item = Sanity[i];
    
    let rWidth = width/(Sanity.length+2); //add 2 so there is space either side of the chart
    let rX = map(i, 0, Sanity.length, rWidth, width-rWidth); //map range includes the space on either side
    let rY = height-rWidth; 
    let rHeight = 0-map(item.Hp, 0, maxval, 0, height-(rWidth*2)); // map height so spacing on top + bottom match side spacing 

    //draw line here
  
    push();
    strokeWeight(2);
    noFill();
    stroke(map(item.sanity,0,100,50,255),0,0);
     beginShape();
      
       circle(rX+spacing/2,rY,5);
       translate(rX+spacing/2,rY+rHeight)
        
         circle(0,-rHeight,5);
         

         vertex(0,-rHeight);
         vertex(0,-rHeight);
           // draw the wave
           for(let j=0;j<num;j++){
             let f= j*2+i*2;
             console.log("f="+f);
             let vX= j*(rWidth/num);
                 amplitude= map(item.sanity,0,100,0,200);
                 eyePosition= map(item.Hp,0,100,0,200);
                 eyeSize= map(item.sanity,0,100,0,50);
                 ellipse(10,amplitude,8,eyeSize);//the eye_L
                 ellipse(rWidth-spacing-windowWidth/30,amplitude,5,eyeSize);//the eye_R
             let vY= amplitude * noise(f);
              curveVertex(vX,vY);
              console.log("vY="+vY);
            }

         
          vertex(rWidth-spacing,-rHeight);
          vertex(rWidth-spacing,-rHeight);

          circle(rWidth-spacing,-rHeight,5);
     endShape();
    pop();
  
    //the date
    fill(255); 
    textAlign(CENTER, TOP); 
    text(item.date, rX+rWidth/2-1, rY+20);
  }  

}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}