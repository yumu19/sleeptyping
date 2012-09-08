window.onload = function(){
    window.document.onkeydown = function(evt){
	if (evt){
	    var kc = evt.keyCode;
	}else{
	    var kc = event.keyCode;
	}
	var chr = String.fromCharCode(kc);
	document.getElementById("result").innerHTML += kc+" ("+chr+")<br>";
    }
}