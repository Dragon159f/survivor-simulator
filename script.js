var grid = [
	['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
	['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
	['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
	['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
	['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
	['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
	['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
	['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
	['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
	['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
	['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
];


var object = {

}
let speedInterval = 1000;

//DRAWING GRID
drawGrid();

function drawGrid() {
	for (var i = 0; i < grid.length; i++) {
		var row = $("<div>")

		console.log(grid[i]);
		$("#theGreatDiv").append(row.attr("class", "row row" + i));
		console.log("row" + i);

		for (var j = 0; j < grid[i].length; j++) {
			var divInRow = $("<div>").attr("class", "box box" + i + j);
			console.log(grid[i][j]);
			$(".row" + i).append(divInRow);
		}
	}
}

$(".box").click(function () {
	//code below returns the class of the grid boxes
	var building = $("#buildingVal").val();
	var building_object = new window[building];
	building_object.box = this;
	if (startValues.money >= building_object.cost) {
		object[this.className] = building_object;
		startValues.money = startValues.money - building_object.cost;
		$(this).html("<img src=" + building_object.img + ">");
	}
})

$("#speed").click(function () {
	//sets the speed of the game
	var speed = $("#speedVal").val();
  console.log(speed)
	if (speed == "Fast"){
    speedInterval = 500
  }else if(speed == "Medium"){
    speedInterval = 1000
  }else if(speed == "Fast"){
    speedInterval = 1500
  }
  window.clearInterval(updater);
  startGame();
  console.log(speedInterval)
})

// END OF GRID


// START of MODELS
let startValues = {
	energy: 500,
	pollution: 20,
	money: 30000,
  efficiency: 1.0
}

//Updates Values
function factoryUpdate() {
	startValues.money += 50 * startValues.efficiency;
	startValues.pollution += 12;
	startValues.energy -= 10;
}

function solarUpdate() {
	startValues.money -= 5;
	startValues.pollution -= 10;
	startValues.energy += 15;
}

function windUpdate() {
	startValues.money -= 3;
	startValues.pollution -= 10;
	startValues.energy += 10;
}

function coalUpdate() {
	startValues.money -= 2;
	startValues.pollution += 15;
	startValues.energy += 25;
}

function nuclearUpdate() {
	startValues.money -= 10;
	startValues.pollution += 1;
	startValues.energy += 40;
}

// Factory, Coal Plant, Nuclear Plant, Wind Turbine, Solar Plant Values
function Factory() {
	this.health = 1.0
	this.img = "https://cdn.glitch.com/2a9e7d63-ebf0-43b1-8092-7b8285f9b7c9%2Ffactory.png?1550955934255"
	this.cost = 5000
	this.update = factoryUpdate
}

function CoalPlant() {
	// this.health = 1.0
	// this.min_energy = 0.0
	// this.max_energy = 80.0
	// this.min_pollution = .05
	// this.max_pollution = .1
	this.img = "https://cdn.glitch.com/2a9e7d63-ebf0-43b1-8092-7b8285f9b7c9%2Fcoal.png?1550956191368"
	this.cost = 2000
	this.update = coalUpdate
}

function SolarPanel() {
	this.health = 1.0
	// this.min_energy = 0.0
	// this.max_energy = 20.0
	// this.min_pollution = 0.0
	// this.max_pollution = 0.01
	this.img = "https://cdn.glitch.com/2a9e7d63-ebf0-43b1-8092-7b8285f9b7c9%2Fsun.png?1550956103182"
	this.cost = 8000;
	this.update = solarUpdate;
}

function WindMill() {
	this.health = 1.0
	// this.min_energy = 0.0
	// this.max_energy = 1.0
	// this.min_pollution = 0.0
	// this.max_pollution = 0.05
	this.img = "https://cdn.glitch.com/2a9e7d63-ebf0-43b1-8092-7b8285f9b7c9%2Fwindmill.png?1550952445553"
	this.cost = 5000;
	this.update = windUpdate;
}

function Nuclear() {
	this.health = 1.0
	// this.min_energy = 0.0
	// this.max_energy = 130.0
	// this.min_pollution = 0.02
	// this.max_pollution = 0.3
	this.img = "https://cdn.glitch.com/2a9e7d63-ebf0-43b1-8092-7b8285f9b7c9%2Fnuclear.png?1550956095135"
	this.cost = 12000;
	this.update = nuclearUpdate
}

//Displays the status
function display_startStatus() {
	$("#pollutionDiv").html('Pollution: ' + startValues.pollution);
	$("#moneyDiv").html('Money: ' + '$' + Math.floor(startValues.money));
	$("#energyDiv").html('Energy: ' + startValues.energy);
};
//Timer, Counting Up  
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);
function setTime() {
	++totalSeconds;
	secondsLabel.innerHTML = pad(totalSeconds % 60);
	minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}
function pad(val) {
	var valString = val + "";
	if (valString.length < 2) {
		return "0" + valString;
	} else {
		return valString;
	}
}
// Possible values to display if user reaches a goal
function processGame(object) {
  if (startValues.energy < -10000) {
    outOfEnergy()
  } else if (startValues.energy < 0) {
    startValues.efficiency = (10000 + startValues.energy)/10000
  }
  
  if(startValues.pollution > 1000 /*|| startValues.energy == 0*/){
    tooMuchPollution()
  }
  
  if (totalSeconds == 300) {
    gameFinished()
  }
  
	for (var property in object) {
		if (object.hasOwnProperty(property)) {
			// do stuff
			var building = object[property]
			building.update();
			console.log("Updating " + building);
		}
	}
}

//Calls function every second
var updater
//Calls start game again to make status appear
startGame()
//Updates the function
function startGame(){
    updater = window.setInterval(function update(){
    //calls function
    display_startStatus();
    processGame(object);
  }, speedInterval);
}
//Alerts the user that energy ran out
function outOfEnergy(){
  window.clearInterval(updater);
  alert("You Failed. You ran out of Energy.");
}

//Alerts the user that pollution has died
function tooMuchPollution(){
  window.clearInterval(updater);
  alert("The Population has died due to excess pollution.");
}
//Alerts that the user ran out of time
function gameFinished(){
alert("You ran out of time! Your Score is "+ score());
}

function score(){
  return (startValues.energy * startValues.energy)/startValues.pollution;
}