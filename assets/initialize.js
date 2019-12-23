var initial = "train"; //Default top level selection. Switch to whatever you want your default selection to be.
var dataSet = "Choose Your Choo"; //The default placeholder for selection menus.
		
/*
* @name: createShit
* @desc: adds text to the shit span
* @param: none
* @return: none
*/
function createShit() {
	if($("title").firstChild) {
		$("title").replaceChild(document.createTextNode(dataSet), $("title").firstChild);
	}
	if(fuckIE8ForFuckingUpOpacityWhatTheFuckMS) {
		var shit=document.querySelectorAll(".shit");
	} else {
		var shit=document.getElementsByClassName("shit");
	}
	for(var i=0; i<shit.length; i++) {
		if(shit[i].firstChild) {
			shit[i].removeChild(shit[i].firstChild);
		}
		var tex = document.createTextNode(initial);
		shit[i].appendChild(tex);
	}
}

/*
* @name: pageChange
* @desc: function for handling events when switching data sets
* @param: this (object) - the selection
* @return: none
*/
function pageChange(dom) {
	initial=dom.value;
	dataSet=dom.options[dom.selectedIndex].firstChild.nodeValue;
	init(initial, "questions");
	createShit();
}