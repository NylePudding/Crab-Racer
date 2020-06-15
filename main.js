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




class Vehicle {

    location;
    velocity;
    acceleration;
    r;
    maxforce;
    maxspeed;

    constructor(x, y){

        this.acceleration = new p5.Vector(0, 0);
        this.velocity = new p5.Vector(random(4) -2, random(4) -2);
        this.location = new p5.Vector(x, y);
        this.r = 6;
        this.maxspeed = random(4) + 2;
        this.maxforce = 0.1;

    }

    run(){
        this.update();
        this.borders();
        this.display();
    }

    update(){
        //update velocty
        this.velocity.add(this.acceleration);
        //limit speed
        this.velocity.limit(this.maxspeed);
        this.location.add(this.velocity);
        //reset acceleration to 0 each cycle
        this.acceleration.mult(0);
    }

    applyBehaviours(vs, path, flow){
        let f = this.followPath(path);
        let s = this.separate(vs);
        let ff = this.followFlow(flow)

        f.mult(1);
        s.mult(1.5);
        ff.mult(0);

        this.applyForce(f);
        this.applyForce(s);
        this.applyForce(ff);
    }

    applyForce(force){
        this.acceleration.add(force);
    }

    seek(target){
        let desired = p5.Vector.sub(target,this.location);

        desired.normalize();
        desired.mult(this.maxspeed);

        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        
        
        return steer;
    }

    arrive(target){
        let desired = p5.Vector.sub(target, this.location);
        let d = desired.mag();

        if (d < 100) {
            let m = map( d, 0, 100, 0, this.maxspeed);
            desired.setMag(m);
        } else {
            desired.setMag(this.maxspeed);
        }

        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        this.applyForce(steer);
    }

    followFlow(flow){
        let desired = flow.lookup(this.location);
        desired.mult(this.maxspeed);

        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        return steer;
    }

    followPath(path){
        let predict = this.velocity.copy();
        predict.normalize();
        predict.mult(25);
        let predictpos = p5.Vector.add(this.location,predict);

        let normal = null;
        let target = null;
        let worldRecord = 1000000;

        for (let i = 0; i < path.points.length -1; i++){
            let a = path.points[i];
            let b = path.points[(i + 1) % path.points.length];
            let normalPoint = this.getNormalPoint(predictpos,a,b);

            let dir = p5.Vector.sub(b, a);

            if (normalPoint.x < min(a.x,b.x) || normalPoint.x > max(a.x,b.x) || normalPoint.y < min(a.y,b.y) || normalPoint.y > max(a.y,b.y)) {

                normalPoint = b.copy();
                a = path.points[(i + 1) % path.points.length];
                b = path.points[(i + 2) % path.points.length];
                dir = p5.Vector.sub(b, a)

            }

            let distance = p5.Vector.dist(predictpos, normalPoint);

            if (distance < worldRecord) {
                worldRecord = distance;
                // If so the target we want to steer towards is the normal
                normal = normalPoint;
        
                // Look at the direction of the line segment so we can seek a little bit ahead of the normal
                dir.normalize();
                // This is an oversimplification
                // Should be based on distance to path & velocity
                dir.mult(10);
                target = normalPoint.copy();
                target.add(dir);
            }
        }
        
        // Only if the distance is greater than the path's radius do we bother to steer
        if (worldRecord > p.radius) {
            return this.seek(target);
        } else {
            return new p5.Vector(0, 0);
        }
        
    }


    align(boids){
        let neighbourDist = 25;
        let sum = new p5.Vector(0,0);
        let count = 0;

        for (let i in boids){
            let d = p5.Vector.dist(this.location, boids[i].location);
            if (d > 0 && d < neighbourDist){
                sum.add(boids[i].velocity);
                count++;
            }
        }

        if(count > 0){
            sum.div(count);
            sum.setMag(this.maxspeed);
            let steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxforce);
            this.applyForce(steer);
        }

    }

    separate(vehs){

        let desiredSeparation = this.r * 4;
        let sum = new p5.Vector(0,0);
        let count = 0;

        for (let i in vehs){
            let d = p5.Vector.dist(this.location, vehs[i].location);
            if((d > 0) && ( d < desiredSeparation)){
                let diff = p5.Vector.sub(this.location, vehs[i].location);
                diff.normalize();
                diff.div(d);
                sum.add(diff);
                count++;
            }
        }

        if (count > 0){
            sum.div(count);
            sum.normalize();
            sum.mult(this.maxspeed);

            let steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxforce);
            return steer;
        } else {
            return new p5.Vector(0, 0);
        }

    }

    display(){

        let theta = this.velocity.heading() + radians(90);
        fill(175);
        stroke(0);
        push();
        translate(this.location.x,this.location.y);
        rotate(theta);
        beginShape(TRIANGLES);
        vertex(0, -this.r*2);
        vertex(-this.r, this.r*2);
        vertex(this.r, this.r*2);
        endShape();
        pop();
    }

    borders(){
        if (this.location.x < -this.r) this.location.x = CANVAS_WIDTH + this.r;
        if (this.location.y < -this.r) this.location.y = CANVAS_HEIGHT + this.r;
        if (this.location.x > CANVAS_WIDTH+this.r) this.location.x = -(this.r);
        if (this.location.y > CANVAS_HEIGHT+this.r) this.location.y = -(this.r);
    }

    getNormalPoint(p, a, b){
        let ap = p5.Vector.sub(p,a);
        let ab = p5.Vector.sub(b,a);
        ab.normalize();
        ab.mult(ap.dot(ab));
        let normalPoint = p5.Vector.add(a,ab);
        return normalPoint;
    }

}

class FlowField{

    field;
    cols;
    rows;
    resolution;


    constructor(r){

        this.resolution = r;
        this.cols = CANVAS_WIDTH / this.resolution;
        this.rows = CANVAS_HEIGHT / this.resolution;
        
        this.field = Array(this.cols);

        for (let i = 0; i < this.rows; i++){
            this.field[i] = new Array(this.rows);
        }

        this.init();
    }


    init(){
        let xoff = 0;

        for (let i = 0; i < this.cols; i++){

            let yoff = 0;

            for (let j = 0; j < this.rows; j++){
                let theta = map( noise(xoff,yoff), 0, 1, 0, 3.14*2 );
                this.field[i][j] = p5.Vector.fromAngle(theta);
                yoff += 0.1;
            }

            xoff += 0.1;
        }
    }

    display(){

        for (let i = 0; i < this.cols; i++){
            for (let j = 0; j < this.rows; j++){
                this.drawVector(this.field[i][j],i*this.resolution,j*this.resolution,this.resolution);
            }
        }

    }

    drawVector(v, x, y, scayl){
        push();
        let arrowsize = 4;
        translate(x,y);
        stroke(0,100);
        rotate(v.heading());
        let len = v.mag()*scayl;
        line(0,0,len,0);
        pop();
    }

    lookup (lu){
        let column = floor(constrain(lu.x/this.resolution,0,this.cols-1));
        let row = floor(constrain(lu.y/this.resolution,0, this.rows-1));
        return new p5.Vector(this.field[column][row].x, this.field[column][row].y);
    }

}

class Path {
 
    points;
    radius;

    constructor(){
        this.radius = 20;
        this.points = [];
    }

    addPoint(x, y){
        let point = new p5.Vector(x, y);
        this.points.push(point);
    }

    getStart(){
        return this.points[0];
    }

    getEnd(){
        return this.points[this.points.length - 1];
    }

    display(){

        // Draw thick line for radius
        stroke(175);
        strokeWeight(this.radius*2);
        noFill();
        beginShape();
        for (v in this.points) {
            vertex(this.points[v].x, this.points[v].y);
        }
        endShape();

        // Draw thin line for center of path
        stroke(0);
        strokeWeight(1);
        noFill();
        beginShape();
        for (v in this.points) {
            vertex(this.points[v].x, this.points[v].y);
        }
        endShape();

    }



}