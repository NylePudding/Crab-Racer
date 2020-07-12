var CANVAS_HEIGHT = 600;
var CANVAS_WIDTH = 800;
var v;
var vehicles;
var ff;
var path;
var crabSelection;
var defaultFont;
var preRaceUI;
var postRaceUI;
var playerData;
var raceUI;
var titleUI;
var gameManager;
var transitionController;


function setup(){
    createCanvas( CANVAS_WIDTH, CANVAS_HEIGHT);

    //ff = new FlowField(1);
    
    vehicles = [];

    vehicles.push(new Vehicle(400,300,"Barry","#D21D2B", 1));
    vehicles.push(new Vehicle(400,300,"Clive","#A3336B", 2));
    vehicles.push(new Vehicle(400,300,"Gertrude","#A39344", 3));
    vehicles.push(new Vehicle(400,300,"Margret","#57A355", 4));
    vehicles.push(new Vehicle(400,300,"Goliath","#91A5EB", 5));
    vehicles.push(new Vehicle(400,300,"Muffin","#F5B235", 6));
    vehicles.push(new Vehicle(400,300,"Pete","#C14CEB", 7));
    vehicles.push(new Vehicle(400,300,"Goose","#A1A1A1", 8));



    gameManager = new GameManager();
    transitionController = new TransitionController("PRERACE");
    transitionController.loadTitleTrack();
    playerData = new PlayerData();
    crabSelection = new CrabSelection(518, 128);
    preRaceUI = new PreRaceUI(playerData);
    postRaceUI = new PostRaceUI(playerData);
    raceUI = new RaceUI(playerData);
    titleUI = new TitleUI();
    
}

function update(){

}

function draw(){
    background("#C4D8EA");
    var mouse = new p5.Vector(mouseX, mouseY);

    fill(200);
    stroke(0);
    strokeWeight(2);

    gameManager.process();
    
    titleUI.display();

    if (transitionController.uiState == "TITLE"){
        
    } else if (transitionController.uiState == "PRERACE") {
        path.display();
        crabSelection.display();
        preRaceUI.display();
    } else if (transitionController.uiState == "RACE"){
        path.display();
        raceUI.display();
    } else if (transitionController.uiState == "POSTRACE"){
        postRaceUI.display();
    }

    for(let i = 0; i < vehicles.length; i++){
        vehicles[i].applyBehaviours(vehicles, path, ff)
        vehicles[i].run();
    }




}

function mousePressed() {

    if (transitionController.uiState == "TITLE"){
        titleUI.exit();
        transitionController.startPreRace();
    } else if (transitionController.uiState == "PRERACE") {


        if (crabSelection.isBetButtonHover(mouseX, mouseY)){
            if (playerData.shells > 0 && crabSelection.selectedCrab){
                crabSelection.addBet();
                playerData.shells -= 1;
            }
        } else if (preRaceUI.isRaceButtonHover(mouseX, mouseY)){
            transitionController.startRace(vehicles, path);
        } else {
            let c = Utils.getClosestCrab(mouseX, mouseY, vehicles);
            crabSelection.setSelectedCrab(c);
        }

    } else if (transitionController.uiState == "RACE"){

    } else if (transitionController.uiState == "POSTRACE"){

        if (postRaceUI.isNextRaceButtonHover(mouseX,mouseY)){
            transitionController.startPreRace();
        }

    }
}


function preload(){

    try {
        defaultFont = loadFont("https://srv-file16.gofile.io/download/3x41ni/FranxurterTotallyMedium-gxwjp.ttf");
    } catch(error) {
        console.info("Loading backup font")
        defaultFont = "Helvetica";
    }
}


function getLegAngleOffset(offset, speed){

    offset /= 10;

    return sin(offset / 5) * 15;

}