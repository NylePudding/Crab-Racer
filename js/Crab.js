class Crab {

    position;

    constructor(x,y){
        this.position = new p5.Vector(x,y);
    }


    display(){



        push();
        translate(this.position.x, this.position.y);
        
        this.drawLeftLeg(new p5.Vector(-60,-20), radians(-90 + getLegAngleOffset(millis() ) ) );
        this.drawLeftLeg(new p5.Vector(-60, -5), radians(-95 + getLegAngleOffset(millis()  + random(5) )));
        this.drawLeftLeg(new p5.Vector(-60, 10), radians(-100 + getLegAngleOffset(millis()  + random(5) )));

        this.drawRightLeg(new p5.Vector(60, 10),radians(95 + getLegAngleOffset(millis()) ) );
        this.drawRightLeg(new p5.Vector(60, -5),radians(90 + getLegAngleOffset(millis() + random(5) )));
        this.drawRightLeg(new p5.Vector(60, -20),radians(85 + getLegAngleOffset(millis() + random(5) )));
        this.drawBody();

        pop();


    }


    drawBody(){

        strokeWeight(0);
        fill("red");

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

        push();
        translate(0,20);
        strokeWeight(0);
        stroke("white");
        fill("black");
        circle(0,0,5);
        pop();


    }

    drawRightLeg(pos, ang){
        push();
        scale(0.6,0.7);
        translate(pos.x,pos.y);
        rotate(ang);
        
        strokeWeight(0);
        fill("red");
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
        fill("red");
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