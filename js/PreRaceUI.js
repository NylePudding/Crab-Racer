class PreRaceUI {

    raceNo;
    playerData;

    constructor(playerData){
        this.raceNo = 1;
        this.playerData = playerData;

    }


    display(){
        textFont(defaultFont);
        this.drawRaceTitle();
        this.drawShellsRemaining();
        this.drawStartRaceButton();
    }

    isRaceButtonHover(x, y){
        if (x >= 518 && x < 768 &&
            y >= 518 && y < 582){
                return true;
        } else {
            return false;
        }
    }



    getRaceMonth(raceNo){
        switch(raceNo){
            case 1:
                return "May";
            case 2:
                return "June";
            case 3:
                return "July";
            case 4:
                return "August";
            case 5:
                return "September";
            case 6:
                return "October";

        }
    }


    drawRaceTitle(){
        noStroke();
        fill("#D21D2B");
        textAlign(LEFT,CENTER);
        textSize(64);
        text("Race " + gameManager.raceNo + " warm up!", 64 ,64);
    }

    drawShellsRemaining(){
        noStroke();
        fill("#D21D2B");
        textAlign(CENTER,CENTER);
        textSize(48);
        text("Shells " + playerData.shells, 640 ,64);
    }

    drawStartRaceButton(){
        noStroke();
        fill("#D21D2B");
        rect(518, 518, 250, 64, 10);

        if (this.isRaceButtonHover(mouseX, mouseY)){
            fill("#FF3D36");
        } else {
            fill("white");
        }
        textSize(48);
        textAlign(CENTER,CENTER);
        text("Start Race!",640,545)
    }
}