class PostRaceUI {

    playerData;

    constructor(playerData){
        this.playerData = playerData;
    }

    display(){
        textFont(defaultFont);
        this.drawPodium();
        this.drawShellsWon();
        this.drawWinner();
        this.drawNextRaceButton();
    }

    drawPodium(){

        push();

        translate(325,375);


        fill("#D68C72");
        noStroke();
        beginShape();
        vertex(0,0);
        vertex(0,-50);
        vertex(50,-50);
        vertex(50,-75);
        vertex(100,-75);
        vertex(100,-35);
        vertex(150,-35);
        vertex(150,0);
        vertex()
        endShape(CLOSE);

        translate(0,15);

        fill("#F09D7F");
        noStroke();
        beginShape();
        vertex(0,0);
        vertex(0,-50);
        vertex(50,-50);
        vertex(50,-75);
        vertex(100,-75);
        vertex(100,-35);
        vertex(150,-35);
        vertex(150,0);
        vertex()
        endShape(CLOSE);

        noStroke();
        fill("#708594");
        textSize(32);
        textAlign(CENTER, CENTER);
        text("2", 25, -35);

        noStroke();
        fill("#F0C026");
        textSize(32);
        textAlign(CENTER, CENTER);
        text("1", 75, -60);

        noStroke();
        fill("#E66D45");
        textSize(32);
        textAlign(CENTER, CENTER);
        text("3", 125, -20);


        pop();

    }

    drawShellsWon(){
        noStroke();
        fill("#D21D2B");
        textSize(48);
        textAlign(CENTER, CENTER);
        text("Payout: " + gameManager.calculateShellsWon() + " Shells", 200, 545);
    }

    drawWinner(){
        noStroke();
        fill("#D21D2B");
        textSize(72);
        textAlign(CENTER, CENTER);
        text(gameManager.finishers[0].name + " is the winner!",400,100)
    }

    drawNextRaceButton(){
        noStroke();
        fill("#D21D2B");
        rect(518, 518, 250, 64, 10);
        textSize(48);

        if (this.isNextRaceButtonHover(mouseX, mouseY)){
            fill("#FF3D36");
        } else {
            fill("white");
        }

        textAlign(CENTER,CENTER);
        text("Next Race!",640,545)
    }

    isNextRaceButtonHover(x, y){
        if (x >= 518 && x < 768 &&
            y >= 518 && y < 582){
                return true;
        } else {
            return false;
        }
    }

}