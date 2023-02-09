//no animation / interaction chart
//if you want to use animation or create a loading state look at the cat fact example from last week 
// use a boolean to control when your data is loaded


let breakfast;

function setup() {
  createCanvas(500, 500);

  //no animation / interaction chart
  noLoop();

  fetch("./json/breakfast.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    
    breakfast = data.breakfast;

    //using no Loop? you can just call your function once the data is loaded
    drawChart();
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

}

function draw() {
  background(200);

}

function drawChart(){

  // Compute maximum amount (for normalization)
  let maxval = 0; 
  for (let i=0; i<breakfast.length; i++) {
    if ( breakfast[i].amount > maxval) {
      maxval = breakfast[i].amount;
    }
  }

  let spacing = 5;//spacing between the bars
  // Display chart
  for (let i=0; i<breakfast.length; i++) {

    let item = breakfast[i];
    
    let rWidth = width/(breakfast.length+2); //add 2 so there is space either side of the chart
    let rX = map(i, 0, breakfast.length, rWidth, width-rWidth); //map range includes the space on either side
    let rY = height-rWidth; 
    let rHeight = 0-map(item.amount, 0, maxval, 0, height-(rWidth*2)); // map height so spacing on top + bottom match side spacing 
    
    console.log(rHeight);
    
    noStroke(); 
    fill(item.color);
    rect(rX+spacing/2, rY, rWidth-spacing, rHeight); 

    fill(0); 
    textAlign(CENTER, TOP); 
    text(item.ingredient, rX+rWidth/2-1, rY+10);
  }  

}