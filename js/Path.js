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

    hasFinished(c){
        let distToFinish = this.getEnd().dist(c.location);

        if (distToFinish < this.radius * 2){
            return true;
        } else {
            return false;
        }
    }

    display(){

        // Draw thick line for radius
        stroke("#EEE8A9");
        strokeWeight(this.radius*3);
        noFill();
        beginShape();
        for (v in this.points) {
            vertex(this.points[v].x, this.points[v].y);
        }
        endShape();

        // Draw thin line for center of path
        // stroke(0);
        // strokeWeight(1);
        // noFill();
        // beginShape();
        // for (v in this.points) {
        //     vertex(this.points[v].x, this.points[v].y);
        // }
        // endShape();

    }



}