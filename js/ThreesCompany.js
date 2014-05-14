ThreesCompany = function() {
	var self = this;
	
	var $threesCompany;
	
	var scene, camera, renderer;
	var controls;
    var clock;

	
	var cube, sphere, sphereParent;
	var cubeSize = 80;
	var sphereSize = 40;

	var init = function(){	
		setupEnvironment();
		scaleEnvironment();
		$(window).resize(scaleEnvironment);
		
		setupCube();
		setupSphere();
		
		render();
	}
	
	var setupEnvironment = function(){
		$threesCompany = $("#threesCompany");
		
		renderer = new THREE.CanvasRenderer({canvas: $threesCompany.get(0)});	
		renderer.shadowMapEnabled = true;
		renderer.shadowMapCullFace = THREE.CullFaceBack;
		
		scene = new THREE.Scene();
		
		camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
		camera.position.z = 500;
		
		setupLight();

		//controls = new THREE.OrbitControls( camera );
		//clock = new THREE.Clock();
	}
	
	var setupLight = function(){
		dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
		dirLight.color.setHSL( 0.1, 1, 0.95 );
		dirLight.position.set( -1, 1.75, 1 );
		dirLight.position.multiplyScalar( 50 );
		scene.add( dirLight );

		dirLight.castShadow = true;

		dirLight.shadowMapWidth = 2048;
		dirLight.shadowMapHeight = 2048;

		var d = 50;

		dirLight.shadowCameraLeft = -d;
		dirLight.shadowCameraRight = d;
		dirLight.shadowCameraTop = d;
		dirLight.shadowCameraBottom = -d;

		dirLight.shadowCameraFar = 3500;
		dirLight.shadowBias = -0.0001;
		dirLight.shadowDarkness = 0.35;
	}
	
	var scaleEnvironment = function(){
		var width = $threesCompany.width();
		var height = $threesCompany.height();
		
		renderer.setSize(width, height);
		camera.aspect = width/height;

		camera.updateProjectionMatrix();
	}
	
	var setupCube = function(){
		var segments = 1;
		var geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize, segments, segments, segments);
		var texture = new THREE.ImageUtils.loadTexture('images/threes-company.jpg');
		var material = new THREE.MeshBasicMaterial({ map : texture });
		
		cube = new THREE.Mesh(geometry, material);
		scene.add(cube);
	}
	
	var setupSphere = function(){
		// parent
		sphereParent = new THREE.Object3D();
		scene.add( parent );
		var segments = 16;
		var geometry = new THREE.SphereGeometry(sphereSize, segments, segments);
		var texture = new THREE.ImageUtils.loadTexture('images/threes-company.jpg');
		var material = new THREE.MeshBasicMaterial({ map : texture });
		sphere = new THREE.Mesh( geometry, material );
		
		sphere.overdraw = true;
		sphere.translateX(cubeSize+5);
		sphere.translateY(cubeSize*2);
		sphere.position.y = 20;

		/* Pivots */
		var pivot1 = new THREE.Object3D();
		pivot1.rotation.z = 0;

		pivot1.add(sphere);
		sphereParent.add( pivot1 );
		scene.add(sphereParent);
	}
	
	var render = function () {
		//var delta = clock.getDelta();
		//orbitControls.update(delta);
	
		requestAnimationFrame(render );

		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		sphere.rotation.y += 0.001;
		sphere.rotation.x += 0.002;
		sphereParent.rotation.z += 0.01;
		
		renderer.render(scene, camera);
	};
	
	init();
}













