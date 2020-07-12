class TitleUI {

    letters;
    displayPrompt;

    constructor(){

        let titleColour = "#D21D2B";
        let authorColour = "#8997C1";

        this.displayPrompt = false;

        this.letters = [];
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "C", titleColour, new p5.Vector(145,100), 128));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "r", titleColour, new p5.Vector(195,100), 128));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "a", titleColour, new p5.Vector(235,100), 128));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "b", "#D21D2B", new p5.Vector(295,100), 128));

        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "R", titleColour, new p5.Vector(395,100), 128));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "a", titleColour, new p5.Vector(455,100), 128));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "c", titleColour, new p5.Vector(510,100), 128));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "i", titleColour, new p5.Vector(545,100), 128));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "n", titleColour, new p5.Vector(595,100), 128));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "g", titleColour, new p5.Vector(645,100), 128));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "!", titleColour, new p5.Vector(695,100), 128));

        
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "B", authorColour, new p5.Vector(190,500), 64, 12));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "y", authorColour, new p5.Vector(220,500), 64, 12));

        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "@", authorColour, new p5.Vector(280,500), 64, 12));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "N", authorColour, new p5.Vector(320,500), 64, 12));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "y", authorColour, new p5.Vector(350,500), 64, 12));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "l", authorColour, new p5.Vector(375,500), 64, 12));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "e", authorColour, new p5.Vector(400,500), 64, 12));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "P", authorColour, new p5.Vector(430,500), 64, 12));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "u", authorColour, new p5.Vector(460,500), 64, 12));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "d", authorColour, new p5.Vector(490,500), 64, 12));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "d", authorColour, new p5.Vector(520,500), 64, 12));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "i", authorColour, new p5.Vector(550,500), 64, 12));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "n", authorColour, new p5.Vector(580,500), 64, 12));
        this.letters.push(new VehicleLetter(this.getRandomPosOffScreen(), "g", authorColour, new p5.Vector(610,500), 64, 12));

    }


    display(){

        for(let i = 0; i < this.letters.length; i++){

            this.letters[i].applyBehaviours(this.letters, path, ff)
            this.letters[i].run();

        }


    }

    getRandomPosOffScreen(){

        let xPos = random(-200,200);
        let yPos = random(-200,200);

        if (xPos > 0){
            xPos += 800;
        }

        if (yPos > 0){
            yPos += 600;
        }


        return new p5.Vector(xPos, yPos);
    }

    drawPrompt(){

        if (this.displayPrompt == true){

            fill("#5DA1DE");


        }

    }

}