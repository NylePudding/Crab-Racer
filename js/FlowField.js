class FlowField{

    field;
    cols;
    rows;
    resolution;


    constructor(r){

        this.resolution = r;
        this.cols = CANVAS_WIDTH / this.resolution;
        this.rows = CANVAS_HEIGHT / this.resolution;
        
        this.field = Array(this.cols);

        for (let i = 0; i < this.rows; i++){
            this.field[i] = new Array(this.rows);
        }

        this.init();
    }


    init(){
        let xoff = 0;

        for (let i = 0; i < this.cols; i++){

            let yoff = 0;

            for (let j = 0; j < this.rows; j++){
                let theta = map( noise(xoff,yoff), 0, 1, 0, 3.14*2 );
                this.field[i][j] = p5.Vector.fromAngle(theta);
                yoff += 0.1;
            }

            xoff += 0.1;
        }
    }

    display(){

        for (let i = 0; i < this.cols; i++){
            for (let j = 0; j < this.rows; j++){
                this.drawVector(this.field[i][j],i*this.resolution,j*this.resolution,this.resolution);
            }
        }

    }

    drawVector(v, x, y, scayl){
        push();
        let arrowsize = 4;
        translate(x,y);
        stroke(0,100);
        rotate(v.heading());
        let len = v.mag()*scayl;
        line(0,0,len,0);
        pop();
    }

    lookup (lu){
        let column = floor(constrain(lu.x/this.resolution,0,this.cols-1));
        let row = floor(constrain(lu.y/this.resolution,0, this.rows-1));
        return new p5.Vector(this.field[column][row].x, this.field[column][row].y);
    }

}