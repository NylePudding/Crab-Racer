class Utils {

    static getLegAngleOffset(offset, speed){

        offset /= 10;
    
        return sin(offset / 5) * 15;
    
    }


    static getClosestCrab(x, y, crabs){

        let from = new p5.Vector(x, y);
        let shortest = 99999;
        let closestCrab = null;


        for(let i = 0; i < crabs.length; i++){
            let distance = from.dist(new p5.Vector(crabs[i].location.x, crabs[i].location.y));

            if (distance < shortest){
                shortest = distance;
                closestCrab = crabs[i];
            }
        }

        return closestCrab;

    }


}