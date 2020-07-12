class CrabSelection {

    location;
    selectedCrab;

    constructor(x, y){
        this.location = new p5.Vector(x, y);
        this.selectedCrab = null;
    }

    display(){

        push();
        translate(this.location.x, this.location.y);
        noStroke();
        fill("#DEE3EA");
        rect(0, 0, 250, 350, 20);



        textAlign(CENTER, CENTER);
        fill("#3868AD");
        noStroke();
        textFont(defaultFont);
        textSize(32);


        if (this.selectedCrab){
            text(this.selectedCrab.name, 125, 32);
        } else {
            text("Select a Crab", 125, 32);
        }

        this.drawBetButton();
        

        if (this.selectedCrab){
            this.displayCrab();
            this.drawBetAmount();
            this.displayMedals();
        }

        pop();

    }

    displayCrab(){

        fill(175);
        stroke(0);

        push();
        translate(125, 125);
        //scale(0.35, 0.35);
        //rotate(theta);

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

    displayMedals(){
        push();
        translate(0, 225);
        
        textAlign(CENTER, CENTER);

        fill("#C45D3B");
        circle(60, 5, 50);
        fill("#E66D45");
        circle(60, 0, 50);
        
        fill("#5B6C78");
        circle(125, 5, 50);
        fill("#708594");
        circle(125, 0, 50);

        fill("#C9A220");
        circle(190, 5, 50);
        fill("#F0C026");
        circle(190, 0, 50);

        fill("white");
        text(this.selectedCrab.bronzeMedals, 60,-2);
        text(this.selectedCrab.silverMedals, 125,-2);
        text(this.selectedCrab.goldMedals, 190,-2);

        pop();



    }

    isBetButtonHover(x, y){
        if (x >= this.location.x + 20 && x < this.location.x + 20 + 70 &&
            y >= this.location.y + 290 && y < this.location.y + 290 + 40){
                return true;
        } else {
            return false;
        }
    }

    addBet(){
        if (this.selectedCrab){
            this.selectedCrab.betAmount++;
        }
    }

    setSelectedCrab(c){
        this.selectedCrab = c;
    }

    drawBetButton(){
        noStroke();
        fill("#D21D2B");
        rect(20, 290, 70, 40, 10);

        if (this.isBetButtonHover(mouseX, mouseY)){
            fill("#FF3D36");
        } else {
            fill("white");
        }

        
        textAlign(CENTER,CENTER);
        text("Bet",55,308)
    }

    drawBetAmount(){
        noStroke();
        fill("#D21D2B");
        textAlign(LEFT,CENTER);
        text(this.selectedCrab.betAmount + " Shells", 120, 308)
    }

    drawBody(){

        strokeWeight(0);
        fill(this.selectedCrab.colour);

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
        circle(0,0,7);
        pop();


    }

    drawRightLeg(pos, ang){
        push();
        scale(0.6,0.7);
        translate(pos.x,pos.y);
        rotate(ang);
        
        strokeWeight(0);
        fill(this.selectedCrab.colour);
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
        fill(this.selectedCrab.colour);
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