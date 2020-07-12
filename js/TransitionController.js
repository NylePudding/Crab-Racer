class TransitionController {

    uiState;

    constructor(startingState){
        this.uiState = startingState;
    }

    setState(state){
        console.info("STATE CHANGING TO : " + state);
        //Cheap way to fix bug....
        if (this.uiState == "PRERACE" && state == "POSTRACE") return;
        this.uiState = state;
    }

    startRace(vs){
        this.setState("RACE");
        gameManager.finishers = [];
        gameManager.countDown = "";
        // this.loadRace1();
        this.selectRace();

        for(let i = 0; i < vs.length; i++){

            vs[i].setArrivalTarget(path.points[0]);
            vs[i].setState("ARRIVING");

            setTimeout(function(v){
                v.setState("RACING");
            },8000,vs[i]);
        }


        setTimeout(function(){
            gameManager.countDown = "3";
        },5000);

        setTimeout(function(){
            gameManager.countDown = "2";
        },6000);

        setTimeout(function(){
            gameManager.countDown = "1";
        },7000);

        setTimeout(function(){
            gameManager.countDown = "Go!";
        },8000);

        setTimeout(function(){
            gameManager.countDown = "";
        },9000);


    }

    startPostRace(){
        this.setState("POSTRACE");
        
        let firstPlaceCrab = gameManager.finishers[0];
        let secondPlaceCrab = gameManager.finishers[1];
        let thirdPlaceCrab = gameManager.finishers[2];

        if (firstPlaceCrab){
            firstPlaceCrab.setArrivalTarget(new p5.Vector(400, 300));
            firstPlaceCrab.state = "ARRIVING";
        }

        if (secondPlaceCrab){
            secondPlaceCrab.setArrivalTarget(new p5.Vector(350, 320));
            secondPlaceCrab.state = "ARRIVING";
        }

        if (thirdPlaceCrab){
            thirdPlaceCrab.setArrivalTarget(new p5.Vector(450, 350));
            thirdPlaceCrab.state = "ARRIVING";
        }
    }

    startPreRace(){
        let firstPlaceCrab = gameManager.finishers[0];
        if (firstPlaceCrab) firstPlaceCrab.goldMedals++;

        let secondPlaceCrab = gameManager.finishers[1];
        if (secondPlaceCrab) secondPlaceCrab.silverMedals++;

        let thirdPlaceCrab = gameManager.finishers[2];
        if (thirdPlaceCrab) thirdPlaceCrab.bronzeMedals++;

        gameManager.raceNo++;
        crabSelection.selectedCrab = null;
        playerData.shells += gameManager.calculateShellsWon();
        this.loadTrainingTrack();

        for(let i = 0; i < vehicles.length; i++){
            vehicles[i].betAmount = 0;
            vehicles[i].state = "RACING";
        }

        this.setState("PRERACE");

    }


    selectRace(){
        switch(gameManager.raceNo){
            case 1:
                this.loadRace1();
                break;
            case 2:
                this.loadRace2();
                break;
            case 3:
                this.loadRace3();
                break;
            case 4:
                this.loadRace4();
                break;
            case 5: 
                this.loadRace5()
                break;
            case 6:
                this.loadRace6();
                break;
            default: 
                this.loadRace1();
        }
    }



    loadRace1(){

        let race1 = new Path();
        race1.addPoint(115,170);
        race1.addPoint(260,170);
        race1.addPoint(260,320);
        race1.addPoint(450,320);
        race1.addPoint(450,170);
        race1.addPoint(730,170);
        race1.addPoint(730,520);
        race1.addPoint(70,520);
        path = race1;
    }

    loadRace2(){
        let race2 = new Path();
        race2.addPoint(115,170);
        race2.addPoint(675,170);
        race2.addPoint(675,520);
        race2.addPoint(70,520);
        race2.addPoint(70,275);
        race2.addPoint(560,275);
        race2.addPoint(560,425);
        race2.addPoint(275,425);
        path = race2;
    }

    loadRace3(){
        let race3 = new Path();
        race3.addPoint(115,170);
        race3.addPoint(675,170);
        race3.addPoint(675,350);
        race3.addPoint(70,390);
        race3.addPoint(70,520);
        race3.addPoint(675,520);
        path = race3;
    }

    loadRace4(){
        let race4 = new Path();
        race4.addPoint(115,170);
        race4.addPoint(70,520);
        race4.addPoint(675,520);
        race4.addPoint(675,170);
        path = race4;
    }

    loadRace5(){
        let race5 = new Path();
        race5.addPoint(115,170);
        race5.addPoint(400,300);
        race5.addPoint(400,170);
        race5.addPoint(685,170);
        race5.addPoint(685,485);
        race5.addPoint(115,485);
        path = race5;
    }

    loadRace6(){
        let race6 = new Path();
        race6.addPoint(115,170);
        race6.addPoint(400,300);
        race6.addPoint(675,170);
        race6.addPoint(675,350);
        race6.addPoint(70,520);
        path = race6;
    }

    loadTrainingTrack(){
        let trainingTrack = new Path();
        trainingTrack.addPoint(150,200);
        trainingTrack.addPoint(350,200);
        trainingTrack.addPoint(400,250);
        trainingTrack.addPoint(400,450);
        trainingTrack.addPoint(350,500);
        trainingTrack.addPoint(150,500);
        trainingTrack.addPoint(100,450);
        trainingTrack.addPoint(100,250);
        trainingTrack.addPoint(150,200);
        path = trainingTrack;
    }


    loadTitleTrack(){
        let titleTrack = new Path();
        titleTrack.addPoint(48, 48);
        titleTrack.addPoint(752, 48);
        titleTrack.addPoint(752, 552);
        titleTrack.addPoint(48, 552);
        titleTrack.addPoint(48, 48);
        path = titleTrack;
    }

}