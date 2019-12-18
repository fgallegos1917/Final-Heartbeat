let capture
let tracker

let serial
let data

function setup() {

    createCanvas(800, 600)

    capture = createCapture(VIDEO)
    capture.size(800, 600)
    capture.hide()

    //tracker = new clm.tracker()
    //tracker.init()
    //tracker.start(capture.elt)

    // set up communication with the arduino
    serial = new p5.SerialPort()
    serial.list()
    serial.open('COM5')       // change this line
    serial.on('data', gotData)

    pixelDensity(1)
}


function gotData() {

    // put incoming data into the "data" array
    data = trim(serial.readLine())

    print(data)
    
}

function draw() {

   background(25);

    image(capture, 0, 0, capture.width, capture.height)
    // draw a vertex at every data point, mapped to the screen dimensions
    
    if(data > 40) {
    //ellipse(width/2, height/2, data, data)
    //background(255, 0, 0)
    strokeWeight(2)

    push()
    let percent = map(data, 0, 1024, 1, 3)
    translate(-62 * percent, -535 * percent)
    scale(percent)
    translate(62/percent, 535/percent)

    stroke(0)
    strokeWeight(3)
    fill(199, 21, 133)    

    beginShape()
    curveVertex(83, 559)
    curveVertex(83, 559)  
    curveVertex(43, 516)
    curveVertex(45, 497)
    curveVertex(58, 494)
    curveVertex(73, 499)
    curveVertex(83, 512)
    curveVertex(83, 512)
    endShape()

    beginShape()
    curveVertex(83, 512)
    curveVertex(83, 512)
    curveVertex(90, 501)
    curveVertex(99, 496)
    curveVertex(104, 496.5)
    curveVertex(113, 499)
    curveVertex(118, 505)
    curveVertex(116, 521)
    curveVertex(103, 537)
    curveVertex(83, 559)
    curveVertex(83, 559)
    endShape() 

    pop()

    }
    if (data < 40) {
    filter(GRAY)
    //pixelDensity(.2)
  } else {
    filter(OPAQUE)
    //pixelDensity(1)
  }

   

  
  

}