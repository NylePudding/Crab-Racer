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