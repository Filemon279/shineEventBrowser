import { CsvData } from '/mongo/collections.js'

Meteor.publish('getEvent', function() {
    CsvData.remove({})
	loadCSV("La_Xe_150_3.csv")
    console.log("event")
    return CsvData.find();
});

function loadCSV(filename)
{
    var lines = []
	 var csv = Assets.getText(filename);
	 var ColorMAX=3
	 var inited = 0
        var ColorMIN=1
        if(inited==0)
        {
            inited++;
        }
        Papa.parse(csv, {
            download: true,
            complete: function(results) 
            {
                CsvData.insert({fileName: filename,data:results})
             
            }
        });
}


 function removeLines()
    {
        for(var i=0;i<lines.length;i++) scene.remove(lines[i]);

    }

function setColor(perc) {
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

function getColorInRange(max, min, value)
        {   
            var step= (max-min)/colorsPalette.length
            return colorsPalette[Math.floor((value-min)/step)]
        }

function getStepColorInRange(max, min)
        {   
            var step=(max-min)/colorsPalette.length
            return step;
        }    


function distanceVector(fromX,fromY,fromZ,toX,toY,toZ)
    {
        x = fromX-toX;
        y = fromY-toY;
        z = fromZ-toZ;
        ret = Math.sqrt(((x^2)+(y^2)+(z^2)));
        if (ret>0) return ret;
        else return 0;
    }