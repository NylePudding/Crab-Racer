class RaceUI {
    constructor(){

    }


    display(){
        this.drawRaceTitle();
        this.drawCountDown();
    }

    drawRaceTitle(){
        noStroke();
        fill("#D21D2B");
        textAlign(LEFT,CENTER);
        textSize(64);
        text("Race " + gameManager.raceNo + " !", 300 ,64);
    }

    drawCountDown(){
        noStroke();
        fill("#D21D2B");
        textAlign(CENTER,CENTER);
        textSize(128);
        text(gameManager.countDown, 400 , 300);
    }
}