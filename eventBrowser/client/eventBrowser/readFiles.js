export class readFiles
{
    constructor()
    {
        this.AllRuns = 1;
        this.inited = 0
    }



   
    getRUN(runName,runNumber)
    {

    }
    setPicker(runName,runNumber)
    {

            this.AllRuns = 5
            console.log(this.AllRuns);
            addPicker();   
            if(vrTest==0)$("#borderRunInfo").fadeIn(1500);  
            if(vrTest==1){ gui.close(); clearInterval(simulationInterval); simulationInterval = setInterval(function(){fasterWayToDoSameShit()},10); point = -700;$("#vrLine").fadeIn(1000);drawSpeed=3}

    }

    removeLines()
    {
        for(var i=0;i<lines.length;i++) scene.remove(lines[i]);

    }

    setColor(perc) {
        var r, g, b = 0;
        if(perc < 50) {
            r = 255;
            g = Math.round(5.1 * perc);
        }
        else {
            g = 255;
            r = Math.round(510 - 5.10 * perc);
        }
        var h = r * 0x10000 + g * 0x100 + b * 0x1;
        return '#' + ('000000' + h.toString(16)).slice(-6);
    }

    getColorInRange(max, min, value)
        {   
            var step= (max-min)/colorsPalette.length
            return colorsPalette[Math.floor((value-min)/step)]
        }

    getStepColorInRange(max, min)
        {   
            var step=(max-min)/colorsPalette.length
            return step;
        }    


    distanceVector(fromX,fromY,fromZ,toX,toY,toZ)
    {
        x = fromX-toX;
        y = fromY-toY;
        z = fromZ-toZ;
        ret = Math.sqrt(((x^2)+(y^2)+(z^2)));
        if (ret>0) return ret;
        else return 0;
    }
}