class GameManager {

    raceNo;
    countDown;
    finishers;

    constructor(){
        this.raceNo = 0;
        this.countDown = "";
        this.finishers = [];
    }

    addFinisher(c){
        if (!this.isFinisherIdExistant(c.id)){
            this.finishers.push(c);
        }
    }


    process(){
        if (transitionController.uiState == "RACE"){
            this.checkForFinishers();
        }
    }


    checkForFinishers(){

        if (this.finishers.length > 0){
            this.countDown = "A Winner!"
            
            setTimeout(function(){
                if (transitionController.uiState != "POSTRACE"){
                    transitionController.startPostRace();
                }
            }, 7500);
        }

    }

    isFinisherIdExistant(cid){
        for(let i = 0; i < this.finishers.length; i++){
            if (cid == this.finishers[i].id){
                return true;
            }
        }

        return false;
    }


    calculateShellsWon(){

        let firstPlaceCrab = this.finishers[0];
        let secondPlaceCrab = this.finishers[1];
        let thirdPlaceCrab = this.finishers[2];
        let shellsWon = 0;

        if (firstPlaceCrab){
            shellsWon += firstPlaceCrab.betAmount * 3;
        }
        if (secondPlaceCrab){
            shellsWon += secondPlaceCrab.betAmount * 2;
        }
        if (thirdPlaceCrab){
            shellsWon += thirdPlaceCrab.betAmount;
        }

        return shellsWon;
    }

}