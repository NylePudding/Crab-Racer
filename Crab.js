class Crab {

    position;

    constructor(x,y){
        this.position = new p5.Vector(x,y);
    }


    display(){

        push();

        strokeWeight(0);
        fill("red");

        translate(this.position.x, this.position.y);

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

        pop();


    }

}