class TransitionController {

    uiState;

    constructor(startingState){
        this.uiState = startingState;
    }

    setState(state){
        console.info("STATE CHANGING TO : " + state);
        this.uiState = state;
    }

    startRace(vs){
        this.setState("RACE");
        gameManager.finishers = [];
        gameManager.countDown = "";
        this.loadRace1();

        for(let i = 0; i < vs.length; i++){

            vs[i].setArrivalTarget(path.points[0]);
            vs[i].setState("ARRIVING");

            setTimeout(function(v){
                v.setState("RACING");
                v.velocity = v.velocity.setMag(v.maxspeed/1.5);
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

    loadRace1(){

        let race1 = new Path();
        race1.addPoint(70,170);
        race1.addPoint(260,170);
        race1.addPoint(260,320);
        race1.addPoint(450,320);
        race1.addPoint(450,170);
        race1.addPoint(730,170);
        race1.addPoint(730,520);
        race1.addPoint(70,520);
        path = race1;

    }

    loadTrainingTrack(){
        let trainingTrack = new Path();
        trainingTrack = new Path();
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

}