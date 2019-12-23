Choose Your Choo 
v1.0.1

Author:	Colum Cross <cxc9401@rit.edu | people.rit.edu/cxc9401>
Description:	Built for Prof. Bogaard's Client Side class, Project 1. Will be expanded for the "new car" page of Contain Your Trains <containyourtrains.com | (C) Charles Rothbart 2015>

////// DATA SET SWITCHING ///////////

Choose Your Choo was built with reusability in mind. To switch data sets follow these instructions:

	Writing Data:
		1. Store all choices in XML files in <type> tags using their NAME.
		2. Name the file the name of the ID of the previous choice.
		3. Store all XML files flat in a folder with the same ID as your INITIAL choice.
		
	ID vs NAME and INITIAL
		The NAME refers to the what the user sees. It can be writen however you want. Ex: "This is an incredible-example choice"
		The ID refers to the back end name. It is used for ids and file names. It HAS to be written in the following way:
			1. Lower camel case.
			2. Hyphens and numbers are allowed.
			3. Capitalize ONLY after spaces.
			Ex: "thisIsAnIncredible-exampleChoice"
		INITIAL refers to the first choice, or top most selection. Try and keep it to one word, lower case. Ex: "choices"
			
	Images:
		1. Store all images as ".jpg".
		2. Name them the ID of the choice they refer to.
		3. Store them in a folder with the ID of their direct parent choice.
		4. Store that folder in a folder called INITIALImages. Ex: "choicesImages"
		
	Using the Dataset:
		1. Store all the INITIAL folders and INITIALImages folders flat with the other files.
		2. Change the "initial" variable located in assets/initialize.js to whatever data set your want to start with.
		3. Change the "dataSet" variable located in assets/initialize.js to whatever you want the data set you start with to be called. Ex: "Choose Your Choices"
		4. Add all data sets you want to include in the select menu in the header div located in index.html with the value being INITIAL
		
		
////// VERSION LOG ///////////

Version:	1.0.1
Supported browsers:
	All IE
	Firefox
	Chrome
	Opera
	Edge
	Netscape Navigator
	
Change Log from v0.05.f:
	* Added support for Netscape Navigator.
	* Changed outdated browser notification.
	* Added "assets" folder changing file structor slightly.
	* Added "initialize.js" which contains the global variables and functions from trains.html.
	* Fixed styling for output.html.
	* Changed "main2.js" to "main.js".
	* Changed "trains.html" to "index.html".
	* Added support for IE 8.
	* Added support for IE 7.