class Vehicle {

    location;
    velocity;
    acceleration;
    r;
    maxforce;
    maxspeed;
    name;
    colour;
    betAmount;
    state;
    id;
    bronzeMedals;
    silverMedals;
    goldMedals;

    constructor(x, y, name, colour, id){

        this.acceleration = new p5.Vector(0, 0);
        this.velocity = new p5.Vector(random(4) -2, random(4) -2);
        this.location = new p5.Vector(x, y);
        this.r = 6;
        this.maxspeed = random(4) + 2;
        this.maxforce = 0.1;
        this.name = name;
        this.colour = colour;
        this.betAmount = 0;
        this.state = "RACING";
        this.arrivalTarget = new p5.Vector(100, 100);
        this.id = id;
        this.bronzeMedals = 0;
        this.silverMedals = 0;
        this.goldMedals = 0;
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

        if (this.state == "RACING"){

            let f = this.followPath(path);
            f.mult(1);
            this.applyForce(f);

            if (path.hasFinished(this)){
                gameManager.addFinisher(this);
            }

        } else if (this.state == "ARRIVING"){

            let a = this.arrive(this.arrivalTarget)
            a.mult(1);
            this.applyForce(a);

        }

        let s = this.separate(vs);
        s.mult(1.5);
        this.applyForce(s);
    }

    setState(state){
        this.state = state;
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
        return(steer);
    }

    setArrivalTarget(pos){
        this.arrivalTarget = pos;
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
        if (worldRecord > path.radius) {
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

        let theta = this.velocity.heading() + radians(0);
        fill(175);
        stroke(0);

        push();
        translate(this.location.x, this.location.y);
        scale(0.35, 0.35);
        rotate(theta);

        let leftMils = millis();
        let rightMils = millis() * -1;
        
        this.drawLeftLeg(new p5.Vector(-60,-20), radians(-90 + getLegAngleOffset(leftMils)));
        this.drawLeftLeg(new p5.Vector(-60, -5), radians(-95 + getLegAngleOffset(leftMils + 40 )));
        this.drawLeftLeg(new p5.Vector(-60, 10), radians(-100 + getLegAngleOffset(leftMils + 80 )));

        this.drawRightLeg(new p5.Vector(60, 10),radians(95 + getLegAngleOffset(rightMils)));
        this.drawRightLeg(new p5.Vector(60, -5),radians(90 + getLegAngleOffset(rightMils + 40 )));
        this.drawRightLeg(new p5.Vector(60, -20),radians(85 + getLegAngleOffset(rightMils + 80 )));
        this.drawBody();
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

    drawBody(){

        strokeWeight(0);
        fill(this.colour);

        push();
        scale(1,0.6);
        circle(0,0, 100);
        pop();

        push();
        translate(-14, 10);
        strokeWeight(4);
        stroke("white");
        fill("black");
        circle(0,0,10);
        pop();

        push();
        translate(14, 10);
        strokeWeight(4);
        stroke("white");
        fill("black");
        circle(0,0,10);
        pop();

        // push();
        // translate(0,20);
        // strokeWeight(0);
        // stroke("white");
        // fill("black");
        // circle(0,0,7);
        // pop();


    }

    drawRightLeg(pos, ang){
        push();
        scale(0.6,0.7);
        translate(pos.x,pos.y);
        rotate(ang);
        
        strokeWeight(0);
        fill(this.colour);
        beginShape();
        vertex(0,0);
        vertex(-2,-30);
        vertex(16,-80);
        vertex(10,-30);
        vertex(14,0);
        endShape(CLOSE);


        pop();
    }

    drawLeftLeg(pos, ang){
        push();
        scale(0.6,0.7);
        translate(pos.x,pos.y);
        rotate(ang);
        
        strokeWeight(0);
        fill(this.colour);
        beginShape();
        vertex(0,0);
        vertex(2,-30);
        vertex(-16,-80);
        vertex(-10,-30);
        vertex(-14,0);
        endShape(CLOSE);

        pop();
    }

}