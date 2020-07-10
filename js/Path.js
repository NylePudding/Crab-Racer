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