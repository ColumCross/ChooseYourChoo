/*
* @author: Colum Cross <cxc9401@rit.edu | people.rit.edu/cxc9401>
* @name: Choose your choo/Create your car JS code.
* @desc: Built for Prof. Bogaard's Client Side class, Project 1. Will be expanded for the "new car" page of Contain Your Trains <containyourtrains.com | (C) Charles Rothbart 2015>
*
* @version: 1.0.1
*/

//Helper function
function $(id) {
	return document.getElementById(id);
}

/////////////////////////////////////////// AJAX Functions ///////////////////////////////////////////////////////////////////

///////////////////////////BOGAARD'S CODE///////////////////////////////////
function getHTTPObject() {
	var xmlhttp;
	// branch for native XMLHttpRequest object
	if (window.XMLHttpRequest){
  		xmlhttp=new XMLHttpRequest()
		//if(xmlhttp.status==404){console.log("404 WE HAVE AN ERROR at 4");}
  	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject){
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
  	}else{	
 		return false;
  	} 
  	
  	return xmlhttp;
}
var http = getHTTPObject(); // We create the HTTP Object
var isWorking = false; //flag for stopping the next request until this one is done...
///////////////////////////////////////////////////////////////////////////

/*
* @name: init
* @desc: Part of creating nodes. Creates the Ajax call for the node creation.
* @param: file (string) - the name of the file to be called.
* @param: id (string) - the id of the select menu calling this function.
* @return: none
*/
function init(file, id) {
	if(http && file!="none") {
		var url = initial+"/"+file+".xml";
		http.open("get", url, true);
		http.onreadystatechange=function(){makeNode(file, id);}
		http.send();
	} else if(http && file=="none") {
		var par=$(id+"div");
		removeElement(par);
	}
}

///////////////////////////////////////////////////////String manipulation functions////////////////////////////////////////////////////////////

/*
* @name: createID
* @desc: Takes in the name of the element and returns a lower camel case concatenated version for use in file names and ids.
* @param: name (string) - The element to be changed
* @return: A lower camel case concatenated version for use in file names and ids.
*/
function createID(name) {
	var lower = name.toLowerCase();
	var arr = lower.split(" ");
	if(arr.length==1) {
		return lower;
	} else {
		var id = arr[0];
		for(var i = 1, len=arr.length; i<len; i++ ) {
			id+= arr[i].charAt(0).toUpperCase() + arr[i].slice(1); //Stack Overflow
		}
		return id;
	}
}

/*
* @name: reverseID
* @desc: Does the opposite of createID
* @param: id (string) - The element to be changed
* @return: A readable string for front-end use.
*/
function reverseID(id) {
	var arr=id.split(/(?=[A-Z])/); //Stack Overflow
	if(arr.length==1) {
		return arr[0];
	} else {
		var name = arr[0];
		for(var i = 1, len=arr.length; i<len; i++ ) {
			name+=" ";
			name += arr[i].charAt(0).toLowerCase() + arr[i].slice(1);
		}
		return name;
	}
}

////////////////////////////////////////////////////////////// Node Manipulation Functions ////////////////////////////////////////////////////////////////

/*
* @name: removeElement
* @desc: Removes any elements after the parent question
* @param: par (object) - the parent div who's elements are being removed.
* @return: none
*/
function removeElement(par) {
	for(var i=2, len=par.childNodes.length; i<len; i++) {
		var child = par.childNodes[i];
		if(child.firstChild) {
			fadeOut(child);
			setTimeout(function(){par.removeChild(child)}, 999);		
		}
	}
}

/*
* @name: makeNode
* @desc: Makes the question and select menu.
* @param: id (string) - ID of the file being used.
* @param: selectId (string) - the ID of the select menu calling init.
* @return: None - prints directly to page.
*/
function makeNode(id, selectId) {
	if(http.readyState==4 ) {
		if(http.status==200) {
			xmlDocument = http.responseXML;
			var selectId = selectId+"div"; //Changes selectId
			var parLen=$(selectId).childNodes.length;
			if(parLen>2) {
				removeElement($(selectId));
			}
		
			//Div creation
			var div=document.createElement("div");
			var divID=id+"div";
			div.setAttribute("id", divID);
			if(fuckIE8ForFuckingUpOpacityWhatTheFuckMS) {
				div.style.filter="alpha(opacity=0)";
			} else {
				div.style.opacity=0;
			}
		
			//Question creation
			var quest = document.createElement("h3");
			var question = document.createTextNode("What type of "+reverseID(id)+"?");
			quest.appendChild(question);
			div.appendChild(quest); //Appends question to the DIV
		
			//Select creation
			var ele = document.createElement("select");
			ele.setAttribute("id", id);
			if(uselessBrowser) {
				ele.setAttribute("onchange", function(){init(this.value, this.id);});
			} else {
				ele.setAttribute("onchange", "init(this.value, this.id);");
			}
		
			//Option Creation
			var first = document.createElement("option");
			first.setAttribute("value", "none");
			first.appendChild(document.createTextNode("--"+dataSet+"--"));
			ele.appendChild(first); //Appends dummy option to select menu
			for(var i = 0, len=xmlDocument.getElementsByTagName("type").length; i<len; i++) {
				if(xmlDocument && xmlDocument.getElementsByTagName("type").item(i).firstChild) {
					var hold=xmlDocument.getElementsByTagName("type").item(i).firstChild.data;
					var sub=document.createElement("option");
					var value = createID(hold);
					sub.setAttribute("value", value);
					var tex = document.createTextNode(hold);
					sub.appendChild(tex);
					ele.appendChild(sub); //Appends option to select menu
				}
			}
			div.appendChild(ele); //Appends Select menu to the DIV
			document.getElementById(selectId).appendChild(div); //Appends DIV to the page.
			fadeIn(divID);
			
			///////////////////////////////////////////////////////////////
		} else if(http.status==404) {
			var parID = selectId+"div"; //parID becomes selectId
			var parLen=$(parID).childNodes.length;
			if(parLen>2) {
				removeElement($(parID));
			}
			
			//Div creation
			var div=document.createElement("div");
			var divID=id+"div";
			div.setAttribute("id", divID);
			if(fuckIE8ForFuckingUpOpacityWhatTheFuckMS) {
				div.style.filter="alpha(opacity=0)";
			} else {
				div.style.opacity=0;
			}
			
			//Text Creation
			var quest = document.createElement("h3");
			var question = document.createTextNode("You just picked a "+initial+"!");
			quest.appendChild(question);
			div.appendChild(quest); //Appends H3 to the DIV
			
			var choice=document.createElement("p");
			var tex=document.createTextNode("You chose a "+reverseID(id)+" "+reverseID(selectId)+". Those are super cool!");
			choice.appendChild(tex);
			div.appendChild(choice); //Appends text to the DIV
			
			var tempTrain = selectId.charAt(0).toUpperCase() + selectId.slice(1);
			trainToSave = id+tempTrain;
						
			//Image Creation
			var img = document.createElement("img");
			var imgSrc = initial+"Images/"+selectId+"/"+id+".jpg";
			img.setAttribute("src", imgSrc);
			img.setAttribute("alt", reverseID(trainToSave));
			img.setAttribute("width", "600px");
			div.appendChild(img);			
			
			//Button Creation
			var butt = document.createElement("button");
			var tex = document.createTextNode("Save your "+initial);
			butt.appendChild(tex); //Appends button text to the Button
			if(uselessBrowser) {
			butt.setAttribute("onclick", function(){saveSelection(trainToSave);});
			} else {
				butt.setAttribute("onclick", "saveSelection(trainToSave)");
			}
			div.appendChild(butt); //Appends button to the DIV
			
			document.getElementById(parID).appendChild(div); //Appends DIV to the page
			fadeIn(divID);
		}
	} 
}

////////////////////////////////////////////////// Form Validation Function /////////////////////////////////////////////////////////////////////////

/*
* @name: validate
* @desc: function for checking form validation.
* @param: none
* @return: true if form passes validation, false if it fails validation.
*/
function validate() {
	var input = document.forms[0].email.value;
	if(input.search("@")!=-1) {
		if(input.search(".")!=-1) {
			return true;
		}
		$("queryAnswer").style.display="block";
		return false;
	} else {
		$("queryAnswer").style.display="block";
		return false;
	}
}

//////////////////////////////////////////////////////////////// Local Storage and Cookie Functions //////////////////////////////////////////////////////////////

/*
* @name: saveSelection
* @desc: Saves the current train in either cookies or localStorage.
* @param: train (string) - the id of the train to be stored.
* @return: none.
*/
function saveSelection(train) {
	if(uselessBrowser) { //Saves in cookies.
		if(GetCookie(train)!=null) {
			var newNumber = parseInt(GetCookie(train))+1;
			SetCookie(train, newNumber);
		} else {
			SetCookie(train, 1);
			var newSave = GetCookie("saved")+train+"|";
			SetCookie("saved", newSave);
		}
	} else { //Saves in localStorage
		if(localStorage.getItem(train)) {
			var newNumber = parseInt(localStorage.getItem(train))+1;
			localStorage.setItem(train, newNumber);
		} else {
			localStorage.setItem(train, 1);
		}
	}
	viewSaved();
}

/*
* @name: viewSaved
* @desc: Displays the cars saved in cookies or localStorage.
* @param: None
* @return: None
*/
function viewSaved() {
	while($("cookiediv").firstChild) {
		$("cookiediv").removeChild($("cookiediv").firstChild);
	}
	$("cookiediv").style.visibility="visible";
	if(uselessBrowser) { //Saves in cookies.
		if(GetCookie("saved")=="") {
			var tex = document.createTextNode("You have no saved "+initial+"s.");
			var ele = document.createElement("p");
			ele.appendChild(tex);
			$("cookiediv").appendChild(ele);
		} else {
			var saved = GetCookie("saved").split("|");
			for(var i=0; i<saved.length-1; i++) {
				var word = GetCookie(saved[i])+" "+reverseID(saved[i]);
				if(parseInt(GetCookie(saved[i]))>1) {
					word+="s";
				}
				var tex = document.createTextNode(word);
				var ele = document.createElement("p");
				ele.appendChild(tex);
				$("cookiediv").appendChild(ele);
			}
		}
	} else { //Saves in localStorage.
		if(localStorage.length==0) {
			var tex = document.createTextNode("You have no saved "+initial+"s.");
			var ele = document.createElement("p");
			ele.appendChild(tex);
			$("cookiediv").appendChild(ele);
		} else {
			for(var key in localStorage) {
				if(key=="key" || key=="getItem" || key=="setItem" || key=="removeItem" || key=="clear" || key=="length") {break;} //Gets rid of Firefox shit
				var word = localStorage[key]+" "+reverseID(key);
				if(parseInt(localStorage[key])>1) {
					word+="s";
				}
				var tex = document.createTextNode(word);
				var ele = document.createElement("p");
				ele.appendChild(tex);
				$("cookiediv").appendChild(ele);
			}
		}
	}
}

/*
* @name: deleteSaved
* @desc: Deletes all the cars saved in cookies or localStorage
* @param: None
* @return: None
*/
function deleteSaved() {
	$("cookiediv").innerHTML="";
	$("cookiediv").style.visibility="hidden";
	if(uselessBrowser) { //Uses Cookies.
		var saved = GetCookie("saved").split("|");
		for(var i=0; i<saved.length-1; i++) {
			DeleteCookie(saved[i]);
		}
		SetCookie("saved", "");
	} else { //Uses localStorage
		for(var key in localStorage) {
			localStorage.removeItem(key);
		}
	}
	viewSaved();
}

/////////////////////////////////////////////////////////////// Animations ////////////////////////////////////////////////////////

/*
* Animation code: Does what you expect.
*/

function fadeIn(id) {
	var dom=document.getElementById(id);
	if(fuckIE8ForFuckingUpOpacityWhatTheFuckMS) {
		MSfadeIn(dom, 0);
	} else {
		if(parseFloat(dom.style.opacity) < 1) {
			dom.style.opacity=parseFloat(dom.style.opacity)+.01;
			setTimeout( function(){fadeIn(id);}, 10);
		}
	}
}
function fadeOut(dom) {
	if(fuckIE8ForFuckingUpOpacityWhatTheFuckMS) {
		MSfadeOut(dom, 100);
	} else {
		if(parseFloat(dom.style.opacity) > 0) {
			dom.style.opacity=parseFloat(dom.style.opacity)-.01;
			setTimeout( function(){fadeOut(dom);}, 10);
		}
	}
}
function MSfadeIn(dom, opac) {
	if(opac < 100) {
		opac=opac+1;
		dom.style.filter="alpha(opacity="+opac+")";
		setTimeout( function(){MSfadeIn(dom, opac);}, 10);
	}
}
function MSfadeOut(dom, opac) {
	if(opac > 0) {
		opac=opac-1;
		dom.style.filter="alpha(opacity="+opac+")";
		setTimeout( function(){MSfadeOut(dom, opac);}, 10);
	}
}