import Stats from 'stats-js'

export class Scene {

	constructor(){
		
			self = this;
	    this.scene = new THREE.Scene();
	    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 90000000);
	    this.camera.position.z = 300;

	    this.renderer = new THREE.WebGLRenderer({ antialias: true});
	    this.renderer.setSize(window.innerWidth, window.innerHeight);

	    document.body.innerHTML = "";// <---VERY temp solution
	    
	    document.body.appendChild(this.renderer.domElement);

	    this.controls = new THREE.TrackballControls( this.camera,this.renderer.domElement );       //Moznai ngerowac z DOM na scenie
	    this.controls.enableRotate = true;                   //Mozliwosc obracania
	    this.controls.rotateSpeed = 1.5;                     //Szybkosc obracania
	    this.controls.noZoom = false;                        //Mozliwosc zoomowania
	    this.controls.zoomSpeed = .8;                       //predkosc zoomowania
	    this.controls.noPan = true;                          //Mozliwosc poruszania targetu      
	    this.controls.minDistance =0.5;                      //Minimalna odleglosc kamery
	    this.controls.maxDistance = 9000000000;              //Maksymalna odleglosc
	    this.controls.staticMoving = false;              
	    this.controls.dynamicDampingFactor = 0.18;

			this.geometry = new THREE.BufferGeometry();
			this.points = new THREE.BufferGeometry();

	    this.zeroVectorPosition = new THREE.Vector3(0,0,0);
	    this.zoom = new Float32Array( 120000 * 1 );
		this.stats = new Stats();
		this.stats.setMode(0); // 0: fps, 1: ms 
		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.left = '0px';
		this.stats.domElement.style.top = '0px';
		 

		document.body.appendChild( this.stats.domElement );
		window.addEventListener( 'resize', this.onWindowResize, false );
		this.animate();

	};

	animate() 
	{
	    var requestId = requestAnimationFrame(this.animate.bind(this));
	    this.render();
	}

	render()
	{
		var position = new THREE.Vector3(0,0,0);                //Pomocniczy wektor do okreslania odleglosci
var point1 = new THREE.Vector3(this.camera.position.x,this.camera.position.y,this.camera.position.z);                       //  \/

var distance = point1.distanceTo(position);     
//Informacja developerskie
$("#xinfo").html("X: "+this.camera.position.x);  
$("#yinfo").html("Y: "+this.camera.position.y);
$("#zinfo").html("Z: "+this.camera.position.z);
$("#dinfo").html(distance);
if(this.uniforms)
	{
		this.uniforms.time.value = (this.uniforms.time.value+0.002)%180
	}
		this.stats.update();
		this.controls.update();
		this.renderer.render(this.scene, this.camera);	
	}

	addCube()
	{
	    var geometry = new THREE.CubeGeometry(5, 5, 5);
	    var material = new THREE.MeshLambertMaterial({
	        color: 0x00fff0
	    });
	    var cube = new THREE.Mesh(geometry, material);
	    cube.rotation.x += 50;
	    cube.rotation.y += 40;
	    cube.rotation.z -= 20;
	    this.scene.add(cube);
	}

	addPointLight(color,x=0,y=0,z=0)
	{
		var pointLight = new THREE.PointLight(color);
		pointLight.position.x = x;
		pointLight.position.y = y;
		pointLight.position.z = z;
		this.scene.add(pointLight)
	}

			//Funckja aktualizujaca scene w momencie zmiany rozmiaru okna
	onWindowResize() 
	{
	    self.camera.aspect = window.innerWidth / window.innerHeight;
	    self.camera.updateProjectionMatrix();
	    self.renderer.setSize( window.innerWidth, window.innerHeight );
	}

	addLines(results)
	{
		var maxCount=0;
    var temp=0;
    var size=0;
    var tempPos=[]
    var allColorsValue=[]
    var sredniaKoloru=0
    var helpVariable=0
    var lines = []
    //console.log(results.data.data[2][6])
    //console.log(results.data[results.data.length-3])
    //ColorMAX = results.data[results.data.length-3][2]
    //ColorMIN = results.data[results.data.length-3][1]
    for(var i = 0;i<results.data.length;i++)
    {
        
        if(results.data[i][0]==-2) 
        {
           // $("#runInfo").append("<p id='title'>RUN INFORMATIONS</p>");
           // $("#runInfo").append("<p id='Desc'>ID: </p><p id='Info'>"+results.data[i][4]+"</p><br>");
           // $("#runInfo").append("<p id='Desc'>RUN NUMBER: </p><p id='Info'>"+results.data[i][5]+"</p><br>");
           // $("#runInfo").append("<p id='Desc'>TIME: </p><p id='Info'>"+results.data[i][6]+"</p><br>");
          //  $("#runInfo").append("<p id='Desc'>TAPE NUMBER:</p><p id='Info'>"+results.data[i][7]+"</p><br>");
        }

        else
        {
            if(results.data[i][1]!=temp)
            {
                if(size!=0)//Pustych nie chcemy
                {

                    lineMaterial = new THREE.LineDashedMaterial({vertexColors: THREE.VertexColors,dashSize: 10000, gapSize: 1e10,side: THREE.DoubleSide});
                    GeoTemp = new THREE.BufferGeometry();
                    positions = new Float32Array( size * 3 ); 
                    var lineDistances = new Float32Array( size * 1 );
                    var colors = new Float32Array( size * 3 ); // 3 channels per point
                    GeoTemp.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
                    GeoTemp.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
                    GeoTemp.addAttribute( 'lineDistance', new THREE.BufferAttribute( lineDistances, 1 ) );
                    lines.push(new THREE.Line(GeoTemp,lineMaterial)); 
                    var k=0;
                    var p=0;
                        var color = new THREE.Color();
                        for(var j=0,p = 0;j<tempPos.length;p+=1,j+=3)
                            {
                                lines[lines.length-1].geometry.attributes.position.array[j]=tempPos[j]    
                                lines[lines.length-1].geometry.attributes.position.array[j+1]=tempPos[j+1]    
                                lines[lines.length-1].geometry.attributes.position.array[j+2]=tempPos[j+2]    

                                color.setHSL( p / 100, 1.0, 0.5 );

                                colors[ j ] = color.r;
                                colors[ j + 1 ] = color.g;
                                colors[ j + 2 ] = color.b;

                                if ( p > 0 ) {
                                lineDistances[ p ] = lineDistances[ p - 1 ] + (tempPos[j]-tempPos[j-3])
                                }
                            }
                    

                        if (helpVariable<lineDistances[tempPos.length-1]) helpVariable=lineDistances[tempPos.length/3-1];
                        console.log(lineDistances)
                    self.scene.add(lines[lines.length-1])
                    size=-1;
                    temp++;
                    tempPos=[];    
                    allColorsValue=[];     
                }
            }
            tempPos.push(results.data[i][6])
            tempPos.push(results.data[i][4])
            tempPos.push(results.data[i][5])
            allColorsValue.push(results.data[i][7])

            size++;
        }
    }    

    console.log(lines);
    //console.log(helpVariable)
    //console.log(lineDistances);
	}

}