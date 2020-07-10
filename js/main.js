var CANVAS_HEIGHT = 600;
var CANVAS_WIDTH = 600;
var v;
var vehicles;
var ff;
var p;


function setup(){
    createCanvas( CANVAS_WIDTH, CANVAS_HEIGHT);
    v = new Vehicle(300,300);
    ff = new FlowField(20);
    p = new Path();
    p.addPoint(200,150);
    p.addPoint(400,150);
    p.addPoint(450,200);
    p.addPoint(450,400);
    p.addPoint(400,450);
    p.addPoint(200,450);
    p.addPoint(150,400);
    p.addPoint(150,200);
    p.addPoint(200,150);
    vehicles = [];
    
}

function update(){

}

function draw(){
    background("white");
    var mouse = new p5.Vector(mouseX, mouseY);

    fill(200);
    stroke(0);
    strokeWeight(2);
    ellipse(mouse.x, mouse.y, 48, 48);

    ff.display();
    p.display();

    for(let i = 0; i < vehicles.length; i++){
        //vehicles[i].followPath(p);
        vehicles[i].applyBehaviours(vehicles, p, ff)
        vehicles[i].run();
        //vehicles[i].arrive(mouse);
        //vehicles[i].separate(vehicles);
        //vehicles[i].followFlow(ff);
        
        //vehicles[i].separate(vehicles);
        //vehicles[i].align(vehicles);
    }

}

function mousePressed() {
    vehicles.push(new Vehicle(mouseX, mouseY));
}