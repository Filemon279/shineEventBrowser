import Stats from 'stats-js'

export class Scene {

	constructor(){
		
	    this.scene = new THREE.Scene();
	    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 90000000);
	    this.camera.position.z = 300;

	    this.renderer = new THREE.WebGLRenderer({ antialias: true});
	    this.renderer.setSize(window.innerWidth, window.innerHeight);

	    //document.body.innerHTML = "";// <---VERY temp solution
	    
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

}