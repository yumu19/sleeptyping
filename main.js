// window.onload = function(){
// window.document.onkeydown = function(evt){
// if (evt){
// var kc = evt.keyCode;
// }else{
// var kc = event.keyCode;
// }
// var chr = String.fromCharCode(kc);
// document.getElementById("result").innerHTML += kc+" ("+chr+")<br>";
// }
// }

var angle = new TimeSeries();
var position = "center";
var oldPosition = "right";
var turn;
var sumTurn = 0;
var move = 0;
var interval = 5 * 60 * 1000;
var tStart = new Date();
var tEnd = new Date();
var futon = new Image();
var pirrow = new Image();
var man = new Image();
futon.src = "./futon.png";
pirrow.src = "./pirrow.png";
man.src = "./man.png";

var oldAngle = 0;
var futonCanvas;
var context;

function k(evt) {
	if(evt) {
		var kc = evt.keyCode;
	} else {
		var kc = event.keyCode;
	}
	var chr = String.fromCharCode(kc);
	var t = new Date();
	if(headangle[kc]) {
		document.getElementById("debug").innerHTML = tEnd;
		if(t > tEnd) {
			var tStart = new Date(t);
			var tForm = ("0" + t.getHours()).slice(-2) + ":" + ("0" + t.getMinutes()).slice(-2) + ":" + ("0" + t.getSeconds()).slice(-2);
			var table = document.getElementById("resultTable");
			var row = table.insertRow(-1);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			cell1.innerHTML = tForm + "-";
			cell2.innerHTML = (move / 2).toFixed(2);
			cell3.innerHTML = turn;
			move = 0;
			turn = 0;
			tEnd = new Date(tEnd.getTime() + interval);
		}
        var dMove = headangle[kc] - oldAngle;
		move = move + Math.abs(dMove);
		oldAngle = headangle[kc];
		angle.append(t.getTime(), dMove);
	    context.fillStyle = "rgb(240, 240, 240)";
		context.fillRect(0, 0, 400, 600)
		context.drawImage(pirrow, 80, 0);
		if(headangle[kc] < -0.4) {
			position = "right";
			if(oldPosition == "left") {
				turn++;
				sumTurn++;
				var tForm = ("0" + t.getHours()).slice(-2) + ":" + ("0" + t.getMinutes()).slice(-2) + ":" + ("0" + t.getSeconds()).slice(-2);
				document.getElementById("turnTime").innerHTML += tForm + "<br />";
				document.getElementById("turn").innerHTML = sumTurn;
			}
			context.drawImage(man, 40, 0);
			oldPosition = "right";
		} else if(headangle[kc] < 0.4) {
			context.drawImage(man, 80, 0);
			position = "center";
		} else {
			position = "left";
			if(oldPosition == "right") {
				turn++;
				sumTurn++;
				var tForm = ("0" + t.getHours()).slice(-2) + ":" + ("0" + t.getMinutes()).slice(-2) + ":" + ("0" + t.getSeconds()).slice(-2);
				document.getElementById("turnTime").innerHTML += tForm + "<br />";
				document.getElementById("turn").innerHTML = sumTurn;
			}
			context.drawImage(man, 120, 0);
			oldPosition = "left";
		}
		document.getElementById("position").innerHTML = position + "<br />";
		context.drawImage(futon, 0, 180);

	}
	//document.getElementById("turn").innerHTML = turn;
}

function init() {
	var t = new Date();
	var interval = 5000;
	tStart = new Date(t);
	tEnd = new Date(t.getTime() + interval - (t % interval));
	var chart = new SmoothieChart();
	turn = 0;
	futonCanvas = document.getElementById("futonCanvas");
    context = futonCanvas.getContext('2d');
	context.drawImage(pirrow, 80, 0);
	context.drawImage(man, 80, 0);
	context.drawImage(futon, 0, 180);
	document.onkeydown = k;
	chart.addTimeSeries(angle, {
		strokeStyle : 'rgba(0, 0, 255, 1)',
		fillStyle : 'rgba(0, 0, 255, 0.2)',
		lineWidth : 4
	});
	chart.streamTo(document.getElementById("chart"), 250);

}

function tweet() {
	window.open('https://twitter.com/intent/tweet?text=+おはよう！昨晩は' + turn + '回寝返ったわー+ %23sleeptyping %23ABPro');
}