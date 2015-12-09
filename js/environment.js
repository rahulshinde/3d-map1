//general scene variables

console.log((Math.random()*20).toFixed(0));

var scene,
	camera,
	light1,
	light2,
	renderer,
	cube;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

//variables for movable light

var mouseX = 0, mouseY = 0;

var pts = [];
var closedSpline;

var container = document.getElementById( 'container' );

init();
animate();

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 125;

	var cameraControls;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.target.set( 0, 0, 0);
	cameraControls.maxDistance = 400;
	cameraControls.minDistance = 30;
	cameraControls.update();

	//adding lights, sphere is just to check light position.
	var sphere = new THREE.SphereGeometry( 0.4, 16, 8 );

	light1 = new THREE.PointLight( 0xff7869, 1, 4500 );
	light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff7869 } ) ) );
	light1.position.set( 0, 0, 50 );
	scene.add( light1 );

	light2 = new THREE.PointLight( 0xf8ffa8, 1, 4500 );
	light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xf8ffa8 } ) ) );
	light2.position.set( 10, 30, 10 );
	scene.add( light2 );

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
	directionalLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );
	directionalLight.position.set( 0, 1, -10 );
	scene.add( directionalLight )

	scene.add( new THREE.AmbientLight( 0x000000 ) );

	// adding main shapes

	group = new THREE.Group();

	//shape1

	var shape1 = new THREE.Shape();

	shape1.moveTo( 0, 0 );
	shape1.bezierCurveTo( 0, 10, 10, 10, 10, 10 );
	shape1.bezierCurveTo( 10, 10, 20, 10, 20, 0 );
	shape1.bezierCurveTo( 20, 0, 28, 8, 28, 8 );
	shape1.bezierCurveTo( 28, 8, 30, 10, 32, 8 );
	shape1.bezierCurveTo( 32, 8, 40, 0, 40, 0 );

	var extrudeSetting1 = { amount: 5, bevelEnabled: true, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1 };

	var geometry1 = new THREE.ExtrudeGeometry( shape1, extrudeSetting1 );

	var mesh1 = new THREE.Mesh( geometry1, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );

	mesh1.scale.set(2.1,2.1,2.1);

	mesh1.position.x = -10;
	mesh1.position.z = 30;

	group.add( mesh1 );

	//shape2
	var shape2 = new THREE.Shape();

	shape2.moveTo( -6, 0 );
	shape2.bezierCurveTo( -6, 0, 20, 0, 20, 0 );
	shape2.bezierCurveTo( 20, 0, 10, 6, 20, 22 );
	shape2.bezierCurveTo( 30, 33, 40, 35, 52, 22 );
	shape2.bezierCurveTo( 55, 17, 58, 3, 48, 7 );
	shape2.bezierCurveTo( 48, 7, 70, 7, 80, 7 );
	shape2.bezierCurveTo( 60, 7, 55, -35, 55, -45 );
	shape2.bezierCurveTo( 55, -45, 15, -45, 15, -45 );
	shape2.bezierCurveTo( 15, -35, 0, -20, -6, -20 );

	var extrudeSetting2 = { amount: 15 };

	var geometry2 = new THREE.ExtrudeGeometry( shape2, extrudeSetting2 );

	var mesh2 = new THREE.Mesh( geometry2, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );

	mesh2.scale.set(0.4,0.4,0.4);
	// mesh2.position.x = 20;
	// mesh2.position.z = -40;
	// mesh2.rotation.y = -0.9;
	// mesh2.rotation.x = 0.2;

	group.add( mesh2 );

	//shape3
	var shape3 = new THREE.Shape();

	shape3.moveTo( 0, 0 );
	shape3.bezierCurveTo( 0, 0, 3, -5, 15, -5 );
	shape3.bezierCurveTo( 23, -5, 30, 0, 30, 0 );
	shape3.bezierCurveTo( 30, 0, 30, -10, 30, -20 );
	shape3.bezierCurveTo( 30, -30, 26, -27, 26, -27 );
	shape3.bezierCurveTo( 26, -27, 26, -27, 24, -24 );
	shape3.bezierCurveTo( 28, -15, 13, -10, 14, -24 );
	shape3.bezierCurveTo( 15, -30, 22, -26, 21, -25 );
	shape3.bezierCurveTo( 5, -50, 0, -24, 0, -24 );

	var extrudeSetting3 = { amount: 5, bevelEnabled: true, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1 };

	var geometry3 = new THREE.ExtrudeGeometry( shape3, extrudeSetting3 );

	var mesh3 = new THREE.Mesh( geometry3, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );

	mesh3.scale.set(1.5,1.5,1.5);
	// mesh3.position.x = -10;
	// mesh3.position.z = -10;
	// mesh3.rotation.x = 0.5;
	// mesh3.rotation.z = 1.8;

	group.add( mesh3 );

	//shape4
	var shape4 = new THREE.Shape();

	shape4.moveTo( 0, 0 );
	shape4.bezierCurveTo( 0, 0, 20, 0, 22, 20 );
	shape4.bezierCurveTo( 22, 20, 24, 7, 27, 11 );
	shape4.bezierCurveTo( 31, 15, 32, 23, 37, 27 );
	shape4.bezierCurveTo( 37, 27, 36, 9, 47, 0 );

	var extrudeSetting4 = { amount: 5, bevelEnabled: true, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1 };

	var geometry4 = new THREE.ExtrudeGeometry( shape4, extrudeSetting4 );

	var mesh4 = new THREE.Mesh( geometry4, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );

	// mesh4.scale.set(1,1.5,1.5);
	// mesh3.position.x = -10;
	// mesh3.position.z = -10;
	// mesh3.rotation.x = 0.5;
	// mesh3.rotation.z = 1.8;

	group.add( mesh4 );

	scene.add( group );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

	mouseX = ( event.clientX - windowHalfX );
	mouseY = ( event.clientY - windowHalfY );

}

function animate() {

	requestAnimationFrame( animate );
	render();

}	

function render() {

	renderer.render(scene, camera);
};
