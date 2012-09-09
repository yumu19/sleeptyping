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
var oldPosition;
var turn = 0;
var turnTime = new Date();

function k(evt) {
	if(evt) {
		var kc = evt.keyCode;
	} else {
		var kc = event.keyCode;
	}
	var chr = String.fromCharCode(kc);
	if(headangle[kc]) {
        if ((new Date().getMinutes) == 0) {
        	　
        }
		angle.append(new Date().getTime(), headangle[kc]);
		if(headangle[kc] < -0.5) {
			position = "right"
			if(oldPosition == "left") {
				turn++;
				turnTime = new Date();
				document.getElementById("turnTime").innerHTML += turnTime.getHours() + ":" + turnTime.getMinutes() + ":" + turnTime.getSeconds() + "<br />"
			}
			oldPosition = "right";
		} else if(headangle[kc] < 0.5) {
			position = "center"
		} else {
			position = "left"
			if(oldPosition == "right") {
				turn++;
				turnTime = new Date();
				document.getElementById("turnTime").innerHTML += turnTime.getHours() + ":" + turnTime.getMinutes() + ":" + turnTime.getSeconds() + "<br />"
			}
			oldPosition = "left";
		}
		document.getElementById("position").innerHTML = position + "<br />"
	}
//	document.getElementById("result").innerHTML += chr + " ";
	document.getElementById("turn").innerHTML = "寝返り回数：" + turn;
}

function createTimeline() {

	var chart = new SmoothieChart();
	document.onkeydown = k;
	chart.addTimeSeries(angle, {
		strokeStyle : 'rgba(0, 0, 255, 1)',
		fillStyle : 'rgba(0, 0, 255, 0.2)',
		lineWidth : 4
	});
	chart.streamTo(document.getElementById("chart"), 500);
}

function tweet() {
	window.open('https://twitter.com/intent/tweet?text=+おはよう！昨晩は' + turn + '回寝返ったわー+ %23sleeptyping');
}



