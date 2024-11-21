var p
var x = 2
var f
var efiefef
var turret
var boxes
var distance = 1000
var furthestDistance = 1000
var sr = 120
var money = 0
var speed = 0.001
var force = 100
var fr = 50
var green = 0
var shots
var health = 100
var bounces = 1
var dmg = 50
var size = 12
var wall1, wall2, wall3, wall4
var walls
var decimals

function setup() {
    decimals = 2
    walls = new Group()
    wall1 = new walls.Sprite(-50, 375, 100, 2000, "k")
    wall2 = new walls.Sprite(1050, 375, 100, 2000, "k")
    wall3 = new walls.Sprite(500, -50, 2000, 100, "k")
    wall4 = new walls.Sprite(500, 800, 2000, 100, "k")
    green = 0
    boxes = new Group()
    shots = new Group()
    createCanvas(1000,750)
    turret = createSprite(1000, 375, 200, 50, "n")
    turret.rotation=180
}

function draw() {
    speed *= 1.00015
    if (frameCount % 500 == 0) {
        sr -= 1
    }
    health *= 1.0001
    shots.collided(walls, (s) => s.remove())
    frameRate(60)
    if (frameCount % sr == 0) {
        var sizex = 40
        var sizey = 40
        var moneymult = 1
        var healthmult = 1
        if (Math.random() < 0.1) {
            healthmult = 3
            moneymult = 1.5
            sizex = 100
            sizey = 100
        }
        var box = new boxes.Sprite(0+sizex/2, Math.random()*750, sizex, sizey)
        box.moveTowards(turret, speed)
        box.textSize = 20;
        box.health = health * healthmult
        box.text = box.health.toFixed(0)
        box.maxHealth = box.health
        box.moneymult = moneymult
        box.moneygiven = 0
    }
    turret.rotateTowards(mouse, 0.1, 0)
    if (frameCount%fr==0) { 
        boxes.collided(shots, (b, s) => {
            s.bounces -= 1
            b.health -= dmg*s.diameter/12
            b.opacity = b.health / b.maxHealth
            b.text = b.health.toFixed(0)
            if (b.health <= 0 && b.moneygiven == 0) {
                b.moneygiven = 1
                money += b.maxHealth / 100 * b.moneymult
                green = 150
                b.remove()
            }
            if (s.bounces == 0) {
                s.remove()
            }
        })
        for (i=0;i!=1;i++) {
            s = new shots.Sprite(988, 375, 10, 10)
            turret.rotateTowards(mouse, 0.1, 0)
            s.diameter = Math.random()*size/2+size/2
            s.bearing = turret.rotation
            f = force*s.diameter/12
            s.applyForce(f)
            s.bounces = bounces
        }
    }
    background(220)
    textSize(30)
    fill(0, green, 0)
    if (green > 0) {
        green -= 1
    }
    text(`$${money.toFixed(2)}`, 10, 40)
    fill(80, 80, 80)
    textSize(15)
    text(`v0.2.2-alpha`, 7, 742)
    fill(200, 80, 80)
    textSize(20)
    text(`♥ ${health.toFixed(decimals)}`, 10, 70)
    fill(80, 150, 80)
    text(`🥚 ${(60/sr).toFixed(decimals)}/s`, 10, 95)
    fill(80, 80, 200)
    text(`💨 ${(speed*1000).toFixed(decimals)}`, 10, 120)
}

function keyPressed() {
    if (key == "=") {
        decimals += 1
    }
    if (key == "-") {
        decimals -= 1
    }
}