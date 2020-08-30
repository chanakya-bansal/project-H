// declaring engines 
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
// making bodies,sprites,images,box,cloud,gameState
var helicopter,package,ground
var heliSprite,packSprite,g1
var heliImage,packImage
var r1,r2,r3,r4,r5,r6
var cloud ,c2,c3,c4
var gameState,PLAY,END


function preload(){
	heliImage=loadImage("helicopter.png")
	packImage=loadImage("package.png")
}


function setup(){
	createCanvas(800,700)
    // clouds
    cloud=createSprite(200,250,60,25)
	cloud.shapeColor="white"
	c2=createSprite(700,100,80,40)
	c2.shapeColor="white"
	c3=createSprite(500,300,50,30)
	c3.shapeColor="white"
	c4=createSprite(50,200,70,40)
	c4.shapeColor="white"
    // package sprite
	packSprite=createSprite(width/2,200,20,20)
	packSprite.addImage(packImage)
	packSprite.scale=0.2
	// helicopter sprite
	heliSprite=createSprite(width/2,200,10,10)
	heliSprite.addImage(heliImage)
	heliSprite.scale=0.6
	// ground sprite
	g1=createSprite(width/2,690,width,30)
	g1.visible=false
    // gameState
	PLAY=1
	END=0
	// box sprites
    r4=createSprite(width/2,660,200,20)
    r5=createSprite(300,620,20,100)
    r6=createSprite(500,620,20,100)
	r4.visible=false
	r5.visible=false
	r6.visible=false
	// engine,world
	engine = Engine.create();
	world = engine.world;
	
	rectMode(CENTER)
	
    ground=new Ground(width/2, 690, width,30)

	package=Bodies.rectangle(width/2,200,10,10,{isStatic:true,restitution:1})
	World.add(world,package)
	// box bodies
    r1=new Box(width/2,660,200,20)
    r2=new Box(300,620,20,100)
    r3=new Box(500,620,20,100)

    Engine.run(engine)
}


function draw(){
	background(0,213,255)
	//synchronising package sprite and body
	packSprite.x=package.position.x
	packSprite.y=package.position.y
	// collide helicopter with box
	heliSprite.collide(g1)
	heliSprite.collide(r4)
	heliSprite.collide(r5)
	heliSprite.collide(r6)

	drawSprites()
	//starting gameState
    if(heliSprite.x===width/2 && heliSprite.y===200){
     if(keyDown("space")){
		  gameState=PLAY
     }
	}
	// text for instructions and end 
    textSize(20)
	textFont("roman")
	text("press space to start",20,20)
	text("press enter to deploy package",20,40)
 	if(packSprite.collide(r4)){
	 text("YOU WIN",width/2,height/2)
 	}
 	if(packSprite.collide(g1)){
	 text("YOU LOSE",width/2,height/2)
	}
	// colliding package from ground and box base
	packSprite.collide(r4)
	packSprite.collide(g1)

	// functions of gameState 
	if(gameState===PLAY){
		// shrinking package so that it is not visible	
		packSprite.scale=0.001
		// for arrow movements
		heliSprite.x=package.position.x
		heliSprite.y=package.position.y
		// for gravity
		Matter.Body.setStatic(package,false)
		// arrow movements
		if(keyDown("DOWN_ARROW")){
			Body.setVelocity(package,{x:0,y:5})
		}
		if(keyDown("UP_ARROW")){
			Body.setVelocity(package,{x:0,y:-5})
		}
		if(keyDown("LEFT_ARROW")){
			Body.setVelocity(package,{x:-5,y:0})
		}
		if(keyDown("RIGHT_ARROW")){
			Body.setVelocity(package,{x:5,y:0})
		}
		
		// deploying package 
		if (keyDown("enter")) {
			//increasing size of package
			packSprite.scale=0.2
			gameState=END
		}
	}
    // ending game
    if(gameState===END){
	
	 Matter.Body.setStatic(package,false)
	}
	//displaying ground and boxes
	ground.display()
	r1.display()
	r2.display()
	r3.display()

}