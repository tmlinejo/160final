
var size = 15
var speed = .2
var rotSpeed = .06
var boxSize = 3
var lightIntensity = 2

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry
var material
var walls = []
var count = 0
var goal
var maze

generateMaze()



/*
var geometry = new THREE.SphereGeometry( 30, 16, 16 );
var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
material.side = THREE.BackSide
var rooms = []
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );



for(var i=0; i<20; i++)
{
    var radTemp = 4*Math.random()
    rooms[i] = new room((Math.random() - .5) * 30,(Math.random() - .5) *2 * radTemp,(Math.random() - .5) * 30, radTemp, 30)
    scene.add(rooms[i].form)

    geometry = new THREE.SphereGeometry(2*Math.random(), 16, 16)
    material = new THREE.MeshLambertMaterial( { color: Math.ceil(16777215*Math.random()) } );
    cube[i] = new THREE.Mesh(geometry, material);
    cube[i].position.x = (Math.random() - .5) * 10
    cube[i].position.y = (Math.random() - .5) * 10
    cube[i].position.z = (Math.random() - .5) * 10
    scene.add(cube[i])
}*/

var pointLight = new THREE.PointLight(0xFFFFFF, lightIntensity, 20);
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;
scene.add(pointLight);

render();


var kBack = false;
var kFore = false;
var kLeft = false;
var kRigh = false;
var keyS = false;
var keyW = false;
var keyA = false;
var keyD = false;
var keyAlt = false;
var key1 = false;
var key2 = false;
var key3 = false;
var key4 = false;
var key6 = false;
var key7 = false;
var key8 = false;
var key9 = false;

window.addEventListener("keydown", function(event)
{
    if(event.keyCode === 38)
        kFore = true
    if(event.keyCode === 40)
        kBack = true
    if(event.keyCode === 37)
        kLeft = true
    if(event.keyCode === 39)
        kRigh = true
    if(event.keyCode === 83)
        keyS = true
    if(event.keyCode === 68)
        keyD = true
    if(event.keyCode === 65)
        keyA = true
    if(event.keyCode === 87)
        keyW = true
    if(event.keyCode === 32)
        kFore = true
    if(event.keyCode === 16)
        kBack = true
    if(event.keyCode === 18)
        keyAlt = true
    if(event.keyCode === 96)
        kBack = true
    if(event.keyCode === 97)
        key1 = true
    if(event.keyCode === 98)
        key2 = true
    if(event.keyCode === 99)
        key3 = true
    if(event.keyCode === 100)
        key4 = true
    if(event.keyCode === 101)
        kFore = true
    if(event.keyCode === 102)
        key6 = true
    if(event.keyCode === 103)
        key7 = true
    if(event.keyCode === 104)
        key8 = true
    if(event.keyCode === 105)
        key9 = true
    if(event.keyCode === 27)
        clearAllKeys()
    if(event.keyCode === 13)
        alert([Math.floor(camera.position.x/boxSize),Math.floor(camera.position.z/boxSize),maze[Math.floor(camera.position.x/boxSize)][Math.floor(camera.position.z/boxSize)]])
    //else alert(event.keyCode)
});
    window.addEventListener("keyup", function(event)
{
    if(event.keyCode === 38)
        kFore = false
    if(event.keyCode === 40)
        kBack = false
    if(event.keyCode === 37)
        kLeft = false
    if(event.keyCode === 39)
        kRigh = false
    if(event.keyCode === 83)
        keyS = false
    if(event.keyCode === 68)
        keyD = false
    if(event.keyCode === 65)
        keyA = false
    if(event.keyCode === 87)
        keyW = false
    if(event.keyCode === 32)
        kFore = false
    if(event.keyCode === 16)
        kBack = false
    if(event.keyCode === 18)
        keyAlt = false
    if(event.keyCode === 96)
        kBack = false
    if(event.keyCode === 97)
        key1 = false
    if(event.keyCode === 98)
        key2 = false
    if(event.keyCode === 99)
        key3 = false
    if(event.keyCode === 100)
        key4 = false
    if(event.keyCode === 101)
        kFore = false
    if(event.keyCode === 102)
        key6 = false
    if(event.keyCode === 103)
        key7 = false
    if(event.keyCode === 104)
        key8 = false
    if(event.keyCode === 105)
        key9 = false
});

function applyKeyInput()
{
    if(kFore)
    {
        moveForward(-speed);
        //camera.position.z -= speed
        //pointLight.position.z -= speed
    }
    if(kBack)
    {
        moveForward(speed);
        //camera.position.z += speed
        //pointLight.position.z += speed
    }
    if(kLeft)
        camera.rotation.y += rotSpeed
    if(kRigh)
        camera.rotation.y -= rotSpeed
    
    if(keyA)
        camera.position.x -= speed;
    if(keyS)
        camera.position.y -= speed;
    if(keyD)
        camera.position.x += speed;
    if(keyW)
        camera.position.y += speed;/*
    if(key1)
    {
        camera.rotation.x -= rotSpeed/Math.sqrt(2);
        camera.rotation.y += rotSpeed/Math.sqrt(2);
    }
    if(key2)
        camera.rotation.x -= rotSpeed;
    if(key3)
    {
        camera.rotation.x -= rotSpeed/Math.sqrt(2);
        camera.rotation.y -= rotSpeed/Math.sqrt(2);
    }
    if(key4)
        camera.rotation.y += rotSpeed;
    if(key6)
        camera.rotation.y -= rotSpeed;
    if(key7)
    {
        camera.rotation.x += rotSpeed/Math.sqrt(2);
        camera.rotation.y += rotSpeed/Math.sqrt(2);
    }
    if(key8)
        camera.rotation.x += rotSpeed;
    if(key9)
    {
        camera.rotation.x += rotSpeed/Math.sqrt(2);
        camera.rotation.y -= rotSpeed/Math.sqrt(2);
    }
    */
    camera.rotation.x = camera.rotation.x % (2*Math.PI);
    camera.rotation.y = camera.rotation.y % (2*Math.PI);
}

function moveForward(dist)
{
    var xR = camera.rotation.x
    var yR = camera.rotation.y
    var z = dist*Math.cos(xR)*Math.cos(yR)
    var y = dist*Math.sin(xR)
    var x = dist*Math.cos(xR)*Math.sin(yR)
    
    if(isSpaceClear(camera.position.x + (3*x), camera.position.y+(3*y), camera.position.z+(3*z)))
    {
        camera.position.x += x
        camera.position.y += y
        camera.position.z += z
        pointLight.position.x += x
        pointLight.position.y += y
        pointLight.position.z += z
    }
    
}

function isSpaceClear(xIn, yIn, zIn)
{
    if (maze[Math.floor(xIn/boxSize)][Math.floor(zIn/boxSize)] == 3)
    {
        clearAllKeys()
        generateMaze()
    }
    if(keyAlt || ((maze[Math.floor(xIn/boxSize)][Math.floor(zIn/boxSize)] != 1) && (maze[Math.floor(xIn/boxSize)][Math.floor(zIn/boxSize)] != 4)))
        return true
    else
        return false
}

function clearAllKeys()
{
    kBack = false;
    kFore = false;
    keyS = false;
    keyW = false;
    keyA = false;
    keyD = false;
    keyAlt = false;
    key1 = false;
    key2 = false;
    key3 = false;
    key4 = false;
    key6 = false;
    key7 = false;
    key8 = false;
    key9 = false;
}

function render()
{
    requestAnimationFrame( render );
    renderer.render( scene, camera );
    applyKeyInput();
    pointLight.position.x = camera.position.x
    pointLight.position.y = camera.position.y
    pointLight.position.z = camera.position.z
    goal.material.color.setRGB(Math.random(),Math.random(),Math.random())
}

function room(xIn, yIn, zIn, rIn, detail)
{
    this.x = xIn;
    this.y = yIn;
    this.z = zIn;
    this.r = rIn;
    this.geometry = new THREE.SphereGeometry(rIn, detail, detail)
    this.material = new THREE.MeshLambertMaterial( { color: Math.ceil(16777215*Math.random()) });
    this.form = new THREE.Mesh(this.geometry, this.material);
    this.form.position.x = xIn
    this.form.position.y = yIn
    this.form.position.z = zIn
}

function generateMaze()
{
    for(var i=0; i<count; i++)
    {
        scene.remove(walls[i])
    }
    scene.remove(goal)
    count = 0
    maze = []
    for(var i=0; i<size; i++)
    {
        maze[i] = []
        for(var j=0; j<size; j++)
            maze[i][j] = 1
        maze[i][0] = 4
        maze[i][size-1] = 4
    }
    for(var i=0; i<size; i++)
    {
        maze[0][i] = 4
        maze[size-1][i] = 4
    }/*
    maze [0] =  [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
    maze [1] =  [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [2] =  [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [3] =  [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [4] =  [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [5] =  [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [6] =  [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [7] =  [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [8] =  [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [9] =  [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [10] = [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [11] = [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [12] = [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [13] = [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [14] = [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [15] = [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [16] = [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [17] = [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [18] = [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [19] = [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [20] = [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [21] = [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [22] = [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [23] = [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [24] = [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4]
    maze [25] = [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]*/
    var tempX = Math.floor(Math.random()*(size-2))+1;
    var tempY = Math.floor(Math.random()*(size-2))+1;
    maze[tempX][tempY] = 2;
    while(maze[tempX][tempY]!=3)
    {
        var moves = []
        if(maze[tempX-1][tempY]==1)
            moves.push([-1,0])
        if(maze[tempX+1][tempY]==1)
            moves.push([1,0])
        if(maze[tempX][tempY-1]==1)
            moves.push([0,-1])
        if(maze[tempX][tempY+1]==1)
            moves.push([0,1]);
        if(moves.length==0) // out of moves
            maze[tempX][tempY] = 3
        else // found a move
        {
            var move = Math.floor(Math.random()*(moves.length))
            if(maze[tempX-1][tempY]==1)
                maze[tempX-1][tempY] = 4
            if(maze[tempX+1][tempY]==1)
                maze[tempX+1][tempY] = 4
            if(maze[tempX][tempY-1]==1)
                maze[tempX][tempY-1] = 4
            if(maze[tempX][tempY+1]==1)
                maze[tempX][tempY+1] = 4
            tempX += moves[move][0]
            tempY += moves[move][1]
            maze[tempX][tempY] = 0
        }
        
    }
    for(var i=1; i<(size-1); i++)
    {
        for(var j=1; j<(size-1); j++)
        {
            if((Math.random()<.5)&&((maze[i][j]==4)||(maze[i][j]==1)))
            {
                maze[i][j] = 0;
            }
        }
    }
    for(var i=0; i<maze.length; i++)
    {
        for(var j=0; j<maze.length; j++)
        {
            if((maze[i][j] == 1) || (maze[i][j] == 4))
            {
                geometry = new THREE.BoxGeometry(boxSize,boxSize,boxSize)
                material = new THREE.MeshLambertMaterial({color: Math.ceil(16777215*Math.random()) } );
                walls[count] = new THREE.Mesh(geometry, material);
                scene.add(walls[count])
                walls[count].position.x = (i+speed)*boxSize
                walls[count].position.y = 0
                walls[count].position.z = (j+speed)*boxSize
                count++
            }
            if(maze[i][j] == 2)
            {
                camera.position.x = (i+.5)*boxSize
                camera.position.z = (j+.5)*boxSize
            }
            if(maze[i][j] == 3)
            {
                geometry = new THREE.SphereGeometry(boxSize/3, 20, 20)
                material = new THREE.MeshLambertMaterial({color: Math.ceil(16777215*Math.random()) } );
                goal = new THREE.Mesh(geometry, material);
                scene.add(goal)
                goal.position.x = (i)*boxSize
                goal.position.y = 0
                goal.position.z = (j)*boxSize
            }
        }
    }
}
