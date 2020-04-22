var Matter = require('matter-js');
const fs = require('fs') 

var engine = Matter.Engine.create();

var ball = Matter.Bodies.circle(0, 0, 80);

Matter.World.add(engine.world, [ball]);

const no_of_iteration = 100;
const no_of_obsevations = 1000;

console.log("initiating")
for(let j=0 ;j< no_of_iteration;j++){

    const x = getRandomInt(10)
    const y = getRandomInt(10)

    Matter.Body.setVelocity(ball,{x:x,y:y})
    Matter.Body.setPosition(ball,{x:0,y:0})
    write("velocity:"+x+","+y+"\n")

    for (var i = 0; i < no_of_obsevations; i++) {
        Matter.Events.trigger(engine, 'tick', { timestamp: engine.timing.timestamp });
        Matter.Engine.update(engine, engine.timing.delta);
        Matter.Events.trigger(engine, 'afterTick', { timestamp: engine.timing.timestamp });
        write(ball.position.x+","+ball.position.y+"\n")
    }

}
console.log("done")

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function write(data){
fs.appendFile('output.txt',data,(err)=>{
    if(err)
    throw err;
})
}


