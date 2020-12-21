

        var stats = initStats();

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        var scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        var bendraKamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        var dollyKamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        var seklysKamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);

			bendraKamera.rotation.set(Math.PI/2 , 0, 0);
        // create a render and set the size
        var webGLRenderer = new THREE.WebGLRenderer();
        webGLRenderer.setClearColor(0xFF55F5, 1.0);
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
        webGLRenderer.shadowMapEnabled = true;

        // position and point the camera to the center of the scene
        bendraKamera.position.x = -500;
        bendraKamera.position.y = 0;
        bendraKamera.position.z = 0;
        //bendraKamera.lookAt(new THREE.Vector3(-10, 0, 0));
		bendraKamera.rotation.set(-Math.PI/2, -Math.PI/2, Math.PI); 
		
		
		dollyKamera.position.x = -500;
        dollyKamera.position.y = 40;
        dollyKamera.position.z = 100;
        dollyKamera.lookAt(new THREE.Vector3(0, 0, 0));
		dollyKamera.rotation.set(-Math.PI/2, -Math.PI/2, Math.PI); 
		
		

		

        // add the output of the renderer to the html element
        $("#WebGL-output").append(webGLRenderer.domElement);  
	   	camControl = new THREE.TrackballControls( dollyKamera, webGLRenderer.domElement );    


		const dollyC = 150 ;
        // call the render function
        function setupBendraKamera(fov, v, e, objectLocation)
		{
			
			bendraKamera.fov = fov;
			

			
			bendraKamera.updateProjectionMatrix ();
			
			var lenght = Math.sqrt(v.x *  v.x + v.y * v.y + v.z *v.z);
			var distance = Math.abs(dollyC/ (2*Math.tan(fov/360 * Math.PI)));
			
			
			bendraKamera.position.x = v.x/lenght  *  distance;
 
		}
		function setupCasualKamera(fov)
		{
			dollyKamera.fov = fov;
			dollyKamera.updateProjectionMatrix ();
			dollyKamera.rotation.set(-Math.PI/2, -Math.PI/2, Math.PI); 
		}
		


		var step = 0;

        var rook;
        var king;
        var queen;
        var bishop;


		generateBishop(12, 0, 0, 0);
		generateBishop(12, 0, 500, 0);
		
		
		
		addFloor();
		    function addFloor() {
    var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 20, 20);

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = '';
    loader.load(
        'https://i.imgur.com/KOgaj60.png',
        (texture) => {
            const textureMaterial = new THREE.MeshBasicMaterial({ map: texture});
            texture.minFilter = THREE.NearestFilter;
            const floorMesh = THREE.SceneUtils.createMultiMaterialObject(floorGeometry, [textureMaterial]);
            floorMesh.position.z = -80;
            scene.add(floorMesh);
        });
}



var figurPosition  =  new THREE.Vector3(0, 0, 0);

        var controls = new function () {


            this.segments = 12;
			this.fov = 45;
			this.fov2 = 45;
			this.came = 1;

            this.redraw = function () {
			

                scene.remove(rook);
                scene.remove(king);
                scene.remove(queen);
                scene.remove(bishop);


				generateBishop(controls.segments, figurPosition.x, figurPosition.y, figurPosition.y);
				
				var v = bendraKamera.position;
				var e = bendraKamera.rotation;
				scene.remove(bendraKamera);
				

				 setupBendraKamera(controls.fov, v, e, figurPosition);
				  setupCasualKamera(controls.fov2);
            };
        }

        var gui = new dat.GUI();
        gui.add(controls, 'segments', 0, 50).step(1).onChange(controls.redraw);
        gui.add(controls, 'fov', 1, 90).step(1).onChange(controls.redraw);
        gui.add(controls, 'fov2', 10, 170).step(1).onChange(controls.redraw);
        gui.add(controls, 'came', 1, 3).step(1).onChange(controls.redraw);

var cam1, cam2, cam1xd, cam2xd;
addCam();
        render();

        function generateRook(segments, x, y, z) {
            var pointsX = [
                250, 220, 208, 
		201, 196, 194, 194, 197, 
		203, 213, 225, 208, 203, 
		208, 228, 226, 224, 221, 
		217, 212, 204, 188, 185, 
		174, 169, 168, 175, 172, 
		172, 173, 250 ];
	    var pointsY = [
		34, 46, 58, 
		70, 82, 94, 106, 118, 
		130, 142, 154, 166, 178, 
		190, 202, 214, 226, 238, 
		250, 262, 274, 286, 298, 
		310, 322, 334, 346, 358, 
		370, 382, 382];
	    // add 10 random spheres
            var points = [];
            var height = 5;
            var count = 31;
            for (var i = 0; i < count; i++) {
                points.push(new THREE.Vector3((250-pointsX[i])/4, 0, (pointsY[30]-pointsY[i]-230)/4));
            }



            var latheGeometry = new THREE.LatheGeometry(points, Math.ceil(segments), 0, 2 * Math.PI);
            rook = createMesh(latheGeometry);
			rook.position.set(x, y,z);
            scene.add(rook);
        }
		
		function generateKing(segments, x, y, z) {
            var pointsX = [
			0, 50, 50, //virsune
			50, 50, 100, // keburele
			100, 75, 50, 
            50, 50, 100,
            110, 120, 140,
            160, 190, 210,
            205, 200, 190,
            180, 170, 160,
            150, 140, 130,
            120, 115, 110,
            105, 100, 100,
            100, 105, 110,
			115, 120, 130,
            140, 150, 160,
            170, 180, 190,
            200, 205, 210,
			240, 250, 250,
            250, 240, 210,
            210, 180, 150,
            180, 200, 210,
			210, 220, 230,
            240, 250, 280,
            300, 300, 0,
		 ];

	    // add 10 random spheres
            var points = [];
            var height = 5;
            var count = 72;
            for (var i = 0; i < count; i++) {
                points.push(new THREE.Vector3(pointsX[i]/10, 0, (750-i*20)/10));
            }

            var latheGeometry = new THREE.LatheGeometry(points, Math.ceil(segments), 0, 2 * Math.PI);
            king = createMesh(latheGeometry);
			king.position.set(x, y,z);
            scene.add(king);
        }
		
			function generateQueen(segments, x, y, z) {
            var pointsX = [
			0, 60, 80,
            91, 97, 100, 
            97, 91, 80,
            60, 200, 220, 
			250,250, 250,
			230, 230, 230,
            220, 210, 190,
            180, 160, 150,
            140, 130, 120,
			115, 110, 105,
            100, 100, 100,
            105, 110,
			115, 120, 130,
            140, 150, 160,
            170, 180, 190,
            200, 205, 210,
			240, 250, 250,
            250, 240, 210,
            210, 180, 150,
            180, 200, 210,
			210, 220, 230,
            240, 250, 280,
            300, 300, 0,
		 ];

	    // add 10 random spheres
            var points = [];
            var height = 5;
            var count = 69;
            for (var i = 0; i < count; i++) {
					points.push(new THREE.Vector3(pointsX[i]/12 , 0 , (600-i*20)/12 ));
            }

            var latheGeometry = new THREE.LatheGeometry(points, Math.ceil(segments), 0, 2 * Math.PI);
            queen = createMesh(latheGeometry);
			queen.position.set(x, y,z);
            scene.add(queen);
        }
		
		function generateBishop(segments, x, y, z) {
            var pointsX = [
			0, 60, 80,
            91, 97, 100, 
            97, 91, 80,
            60, 100,
            120, 140, 155, 
            160, 165, 170,
			174,178, 182,
			185,183, 180,
            178, 173, 167,
            164, 160, 155,
            150, 140, 120,
			230, 240, 230, 230,
            240, 230, 220,
            205, 195, 190,
			180, 170, 155,
            140, 130, 120,
            115, 110, 105,
            105, 110, 120,
            130, 140, 155,
            170, 180, 190,
            195, 205, 220,
			210, 220, 230,
            240, 250, 250,
            250, 240, 210,
            210, 180, 150,
            180, 200, 210,
			210, 220, 230,
            240, 250, 280,
            300, 300, 0,
		 ];

	    // add 10 random spheres
            var points = [];
            var height = 5;
            var count = 94;
            for (var i = 0; i < count; i++) {
					points.push(new THREE.Vector3(pointsX[i]/12 , 0 , (600-i*20)/14 ));
            }

            var latheGeometry = new THREE.LatheGeometry(points, Math.ceil(segments), 0, 3 * Math.PI);
            bishop = createMesh(latheGeometry);
			bishop.position.set(x, y,z);
            scene.add(bishop);
        }
		
		

        function createMesh(geom) {

            // assign two materials
            //  var meshMaterial = new THREE.MeshBasicMaterial({color:0x00ff00, transparent:true, opacity:0.6});
            var meshMaterial = new THREE.MeshNormalMaterial();
            meshMaterial.side = THREE.DoubleSide;
            var wireFrameMat = new THREE.MeshBasicMaterial();
            wireFrameMat.wireframe = true;

            // create a multimaterial
            var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);

            return mesh;
        }
		
		
var line;
 //createLine();
function createLine()
{
	var material = new THREE.LineBasicMaterial({ color: 0x000000 });

	var geometry = new THREE.Geometry();

	var r = bendraKamera.rotation ;
	//r.y =Math.PI/2;
	var v = bendraKamera.position;
	var lenght = Math.sqrt(v.x *  v.x + v.y * v.y + v.z *v.z);
	console.log(r.y);
	
	geometry.vertices.push(bendraKamera.position);
	geometry.vertices.push(new THREE.Vector3( -Math.sin(r.y -  controls.fov/360*Math.PI   ) * 0, Math.cos(r.y -  controls.fov/360*Math.PI   ) * lenght, 100));
	geometry.vertices.push(bendraKamera.position);
	geometry.vertices.push(new THREE.Vector3( -Math.sin( r.y +  controls.fov/360*Math.PI  ) * 0, Math.cos( r.y +  controls.fov/360*Math.PI  ) * lenght, 100));
	

	geometry.vertices.push(bendraKamera.position);
	geometry.vertices.push(new THREE.Vector3( -Math.sin(r.y -  controls.fov/360*Math.PI   ) * 0, Math.cos(r.y -  controls.fov/360*Math.PI   ) * lenght, -100));
	geometry.vertices.push(bendraKamera.position);
	geometry.vertices.push(new THREE.Vector3( -Math.sin( r.y +  controls.fov/360*Math.PI  ) * 0, Math.cos( r.y +  controls.fov/360*Math.PI  ) * lenght, -100));
	
	
	geometry.vertices.push(new THREE.Vector3( -Math.sin(r.y -  controls.fov/360*Math.PI   ) * 0, Math.cos(r.y -  controls.fov/360*Math.PI   ) * lenght, -100));
	geometry.vertices.push(new THREE.Vector3( -Math.sin(r.y -  controls.fov/360*Math.PI   ) * 0, Math.cos(r.y -  controls.fov/360*Math.PI   ) * lenght, 100));
	geometry.vertices.push(new THREE.Vector3( -Math.sin( r.y +  controls.fov/360*Math.PI  ) * 0, Math.cos( r.y +  controls.fov/360*Math.PI  ) * lenght, 100));
		
		geometry.vertices.push(new THREE.Vector3( -Math.sin( r.y +  controls.fov/360*Math.PI  ) * 0, Math.cos( r.y +  controls.fov/360*Math.PI  ) * lenght, -100));
		
		
	 line = new THREE.Line(geometry, material);

	scene.add(line);
	
}



function addCam() {

    const camGeometry = new   THREE.BoxGeometry( 50, 150, 50 );
    const cam2Geometry = new   THREE.BoxGeometry( 100, 150, 50 );
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = '';
    loader.load(
        'https://i.imgur.com/8ThjD1W.png',
        (texture) => {
            const textureMaterial = new THREE.MeshBasicMaterial({ map: texture});
            texture.minFilter = THREE.NearestFilter;
            cam1 = THREE.SceneUtils.createMultiMaterialObject(camGeometry, [textureMaterial]);
            cam1.position.x = bendraKamera.position.x;
            cam1.position.y = bendraKamera.position.y;
            cam1.position.z = bendraKamera.position.z;
			cam1.rotation.set(0 ,0, Math.PI/2); 
            scene.add(cam1);
			
			cam1xd = THREE.SceneUtils.createMultiMaterialObject(cam2Geometry, [textureMaterial]);
            cam1xd.position.x = bendraKamera.position.x;
            cam1xd.position.y = bendraKamera.position.y;
            cam1xd.position.z = bendraKamera.position.z;
			cam1xd.rotation.set(0 ,0, Math.PI/2); 
            scene.add(cam1xd);
			
		
			cam2 = THREE.SceneUtils.createMultiMaterialObject(camGeometry, [textureMaterial]);
            cam2.position.x = seklysKamera.position.x;
            cam2.position.y = seklysKamera.position.y;
            cam2.position.z = seklysKamera.position.z;
			
			//console.log(seklysKamera.rotation);
			cam2.rotation.set(Math.PI/2 + seklysKamera.rotation.x, seklysKamera.rotation.z, 0); 
            scene.add(cam2);
			
			cam2xd = THREE.SceneUtils.createMultiMaterialObject(cam2Geometry, [textureMaterial]);
            cam2xd.position.x = seklysKamera.position.x;
            cam2xd.position.y = seklysKamera.position.y;
            cam2xd.position.z = seklysKamera.position.z;
			
			//console.log(seklysKamera.rotation);
			cam2xd.rotation.set(Math.PI/2 + seklysKamera.rotation.x, seklysKamera.rotation.z, 0); 
            scene.add(cam2xd);
			
			
        });
}






		var step =0;
		
		
		seklysKamera.position.x = 0;
        seklysKamera.position.y = 0;
        seklysKamera.position.z = 500;
        seklysKamera.lookAt(new THREE.Vector3(0, 0, 0));

		var rot = 0;


        function render() {
            stats.update();
		
		scene.remove(line);
		if ( controls.came != 2)
		{
			
			createLine();
		}

		
	
		
		if (cam1)
		{
		cam1.position.x = bendraKamera.position.x;
            cam1.position.y = bendraKamera.position.y;
            cam1.position.z = bendraKamera.position.z;
			cam1.rotation.set(0 ,0, Math.PI/2);
			
			cam1xd.position.x = bendraKamera.position.x-150;
            cam1xd.position.y = bendraKamera.position.y;
            cam1xd.position.z = bendraKamera.position.z;
			cam1xd.rotation.set(0 ,0, Math.PI/2);
			
			cam2.position.x = seklysKamera.position.x;
            cam2.position.y = seklysKamera.position.y;
            cam2.position.z = seklysKamera.position.z;
			cam2.rotation.set(Math.PI/2 + seklysKamera.rotation.x, seklysKamera.rotation.z, 0); 
			
			cam2xd.position.x = seklysKamera.position.x;
            cam2xd.position.y = seklysKamera.position.y + Math.cos(cam2.rotation.x)*150;
            cam2xd.position.z = seklysKamera.position.z+Math.sin(cam2.rotation.x) *150;
			cam2xd.rotation.set(Math.PI/2 + seklysKamera.rotation.x, seklysKamera.rotation.z, 0); 
			
		}
          //  
		
		
		
        step += 0.01;
	//	bendraKamera.lookAt = Math.sin(step);
		figurPosition =  new THREE.Vector3( 0,  300 * Math.cos(step), 1.5 + 120 * Math.abs(Math.sin(step)));
		scene.remove(bishop);
		generateBishop(controls.segments, figurPosition.x, figurPosition.y, figurPosition.z);





            requestAnimationFrame(render);
            camControl.update(); 
			
			
			seklysKamera.lookAt(figurPosition);
				var crot = seklysKamera.rotation;
				if (crot.x < 0 && rot < Math.PI) rot += 0.05;
				else if (rot > 0 && crot.x >0) rot -=0.05;
				
				
				
				
				seklysKamera.rotation.set(seklysKamera.rotation.x, 0, rot); 
				seklysKamera.updateProjectionMatrix ();
			
			
            //webGLRenderer.render(scene, bendraKamera);
			if (controls.came == 1)
				webGLRenderer.render(scene, dollyKamera);
			else if ( controls.came == 2)
				webGLRenderer.render(scene, bendraKamera);
			else
			{
				webGLRenderer.render(scene, seklysKamera);
							}
        }

        function initStats() {

            var stats = new Stats();
            stats.setMode(0); // 0: fps, 1: ms

            // Align top-left
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';

            $("#Stats-output").append(stats.domElement);

            return stats;
        }
