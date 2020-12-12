
// Howtocodewell.net challenge for November 2020

import Modal from './Modal.js';


"use strict";

const allowToggle = true; // set to false to hide toggle switch option

let dateObj = new Date();

const currentDayNum = dateObj.getDate();


// Designed to only be uploaded in the month of December, therefore
// no need for functionality to check month and year.

let maxDay = currentDayNum;
let currentDay = dateObj.getDate();
let modalObj = new Modal(maxDay);


setUpAllDays();

let daysData;

let xhttp = new XMLHttpRequest();

// Set up animation variables
let canvasWindow = document.getElementById('canvas1').getContext("2d");
let animateVals = [0, 30, 60, 90];
let switchFramecount = 0;
let animationResponseTime = 900;
let lights = new Image();
lights.src = "images/lights.png";


// Pull data from JSON file
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		let response = JSON.parse(xhttp.responseText);
		let daysData = response.days;
		modalObj.loadAllModalData(daysData);
		animate();
		if(currentDay <= maxDay) modalObj.outputModal(currentDay);
		document.getElementById('inpVal').checked = false;
	}

	document.getElementById('window-boxes').addEventListener('click', processClick);
	document.getElementById('switch').addEventListener('click', toggleContent);
	document.getElementById('window-boxes').addEventListener('click', processClick);
};

xhttp.open("GET", "data/days.json", true);
xhttp.send();


if(allowToggle === true){
	document.getElementById('tog').style.display = 'inline-block';
	document.getElementById('switch').style.display = 'inline-block';
}

// modal setup
let modalSpan = document.getElementsByClassName("close")[0];
const modal = document.getElementById("modal-box");


modalSpan.onclick = function() {
	modal.style.display = "none";
	modalObj.clearIFrame('ytwrap');
}

window.onclick = function(event) {
	if (event.target === modal) {
		modal.style.display = "none";
		modalObj.clearIFrame('ytwrap'); 
	}
}


// Creates a div box for day of the month.  Day number is used to
// choose whether day is active or not. Designed to be called multiple
// times in a loop.
function createBox(num){

	let clName = 'box';
	if(num > maxDay) clName = 'box-closed';

	num = num.toString();
	let elName = document.createElement('div');
	elName.setAttribute('id', 'window' + num );
	elName.setAttribute('class', clName);

	let para = document.createElement("h3");
	para.innerHTML = num;
	elName.appendChild(para);
	return elName;
}


function setUpAllDays(){

	let winBoxes = document.getElementById('window-boxes');
	winBoxes.innerHTML = "";

	for(let count=1; count <= 24; count++){
		winBoxes.appendChild(createBox(count));
	}
}


// For clicking on calendar days.
function processClick(e){
	
	let idNum = parseInt(e.target.id.replace('window',''));

	// Solves issue where only day number is clicked
	if(isNaN(idNum) === false) modalObj.outputModal(idNum);
}


// For toggling lock/unlock switch to show future calendar content.
// Switch must be enabled using allowToggle boolean.
function toggleContent(){

	let switchVal = document.getElementById('inpVal');

	(switchVal.checked === true)? maxDay = 26: maxDay = currentDayNum;
	modalObj.setMaxDay(maxDay);
	setUpAllDays();
}


function animate(){

	canvasWindow.width = 280;
	canvasWindow.height = 30;

	lights.onload = function () {
		canvasWindow.drawImage(lights, 0, 60, 280, 30, 0, 0, 280, 30);
	};
}


setInterval(function() {
	
	switchFramecount++;
	if(switchFramecount > 3) switchFramecount = 0;
	flip();
}, animationResponseTime);


function flip(){

	let horiz = animateVals[switchFramecount]; 
	canvasWindow.drawImage(lights, 0, horiz, 280, 30, 0, 0, 280, 30);
}