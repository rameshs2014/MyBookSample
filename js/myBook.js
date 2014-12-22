function Feed(id,type){
	this.id=id;;
	this.type=type;	
}
Feed.prototype.getID = function(){
	return this.id;
};
Feed.prototype.getType = function(){
	return this.type;
};

function TextFeed(id,text){
	this.id = id;
	this.text = text;
	this.time= new Date();
}
TextFeed.prototype = Object.create(Feed.prototype);
TextFeed.prototype.getFeed = function(){
	return this.text;
}
function URLFeed(id,url){
	this.url=url;
	this.time= new Date();
}
URLFeed.prototype = Object.create(Feed.prototype);
URLFeed.prototype.getFeed = function(){
	return this.url;
}
var feedx = [];
function addFeed(id){	
	var ele = document.getElementById(id).value;
	document.getElementById(id).value = "";	
	var feed;
	if(ele.length > 4 && (ele.substring(0,4).toUpperCase() == "HTTP" || ele.substring(0,3).toUpperCase() == "WWW")){
		if(ele.substring(0,3).toUpperCase() == "WWW") {
			ele ="http://"+ele;
		}
		feed = new URLFeed(1,ele);
	} else {
		feed = new TextFeed(1,ele);
	}
	createFeedsService(feed);
}

function deleteFeeds(id){
	deleteFeedsService(id);
}
var createFeedsService = service("CreateFeed");
var deleteFeedsService = service("DeleteFeed");
function User(userName){
	this.feeds = [];
}

function service(type){
	var currentUser=new User("Vinoth");
	var feeds = currentUser.feeds;
	var ret;
	
	if(type === "CreateFeed"){	
		ret =  function(feed){
			feeds.push(feed);			
			loadFeeds(feeds);
		};
	} else if (type === "DeleteFeed"){
			ret =  function(id){
			feeds=feedx;			
			feeds.splice(id,1);			
			loadFeeds(feeds);
		};
	} 
	return ret;
}


function getDateString(date){
	return (date.getMonth()+1) +"/"+ (date.getDate()) + "/"+(date.getFullYear()) + " " + (date.getHours() > 12 ? date.getHours() - 12 : date.getHours() )+":"+(date.getMinutes()) + " " + (date.getHours() > 12 ? "PM" : "AM" );
}

function loadFeeds(feedsArray) 
{
	
		var feeds = feedsArray;	
		feedx=feeds;
		var img,node,inputButton;
		var myTableDiv = document.getElementById("myDynamicTable");	
		myTableDiv.innerHTML = "";	
		
		var table = document.createElement('TABLE');
		table.border='0';
		table.align ="center";
		table.setAttribute("id","one");
	   
		var tableBody = document.createElement('TBODY');
		table.appendChild(tableBody);
		 
		for(var i=0,l=feeds.length;i<l;i++){	
		   var tr = document.createElement('TR');
		   if(i%2 == 0){
			  tr.setAttribute("id", "cellone");
		   }else{
			  tr.setAttribute("id", "celltwo");
		   }
		  
		   tableBody.appendChild(tr);
		  
		   for (var j=0; j<4; j++){
			   var td = document.createElement('TD');
			   td.width='250';
				
				if(j==0)
				{	
					img = document.createElement("img");		
					img.setAttribute("src", "../images/feed-icon.png");
					img.setAttribute("height", "40px");
					img.setAttribute("width", "40px");
					td.appendChild(img);
				}else if(j==1){
					node = document.createElement("a");
					if(feeds[i] instanceof URLFeed){
						node.setAttribute("href", feeds[i].getFeed());		
					}
					node.setAttribute("id", "txt");
					node.innerHTML=feeds[i].getFeed();
					td.appendChild(node);
				}else if(j==2){
					td.appendChild(document.createTextNode(getDateString(feeds[i].time)));					
				}else{
				
					inputButton = document.createElement("img");		
					inputButton.setAttribute("src", "../images/delete.png");
					inputButton.setAttribute("height", "15px");
					inputButton.setAttribute("width", "15px");
					inputButton.setAttribute("onclick", ("deleteFeeds("+i+")"));
				
					inputButton.id="deleteButton";
					inputButton.name="deleteButton";
					//inputButton.addEventListener("click", deleteFeeds(i));
				
					//inputButton.onclick="javascript:deleteFeeds("+i+")";				
					td.appendChild(inputButton)				
				}	   
			  
			   tr.appendChild(td);
		   }
		}
		myTableDiv.appendChild(table);
   
}

	function logInvalidate(){
	    var userName = document.getElementById('email');
		var Password = document.getElementById('pass');
		var inValidMsg = document.getElementById('inValidMsg');
		if(userName.value == ""){
			inValidMsg.innerHTML = 'Please enter the userName.';
			userName.focus();
			return;
		}
		if(Password.value == ""){
			inValidMsg.innerHTML = 'Please enter the Password.';
			Password.focus();
			return;
		}
		if(Password.value.length < 7){
			inValidMsg.innerHTML = 'Your Password length is Too low.';
			Password.focus();
			return;
		}		
		window.location="feed/feed.html";
	}
	function logOut(){
		window.location="../index.html";
	};
	var nameFlag = false,phoneFlag = false,ageFlag = false, emailFlag = false;
	try {	
		var firstName = document.getElementById('name');
		firstName.onkeyup = function() {
			nameFlag = firstName.value.length ? true : false;
			checkValidation();
		}
	}
	catch(err) {}
	var age = document.getElementById('age');
	try {
		age.onkeydown = function(e) {
			var key = e.keyCode ? e.keyCode : e.which;
			if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37 || event.keyCode == 39) {
				return true;
			}
			else if ( key < 48 || key > 57 ) {
				ageFlag = false;
				return false;
			}else {
				console.log('A');
				ageFlag = true;
			}
			if (age.value.length > 2){
				ageFlag = false;
				return false;
			}
		}
		age.onkeyup = function(e) {
			if (age.value > 100){
				alert('Please enter the age between 0 to 100');
				age.value = "";
				age.focus();
				ageFlag = false;
			}
			ageFlag = age.value.length ? true : false;
			checkValidation();
		}
	}
	catch(err) {}
	var phone = document.getElementById('phone');
	try {
		phone.onkeydown = function(e) {
			var key = e.keyCode ? e.keyCode : e.which;
			if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37 || event.keyCode == 39) {
				return true;
			}
			else if ( key < 48 || key > 57 ) {
				phoneFlag = false;
				return false;
			}else{
				phoneFlag = true;
				console.log('P');
			}
		}
		phone.onkeyup = function(e) {
			phoneFlag = phone.value.length ? true : false;
			checkValidation();
		}
	}
	catch(err) {}
	//Email Validation
	var email = document.getElementById('email');
	try {
		email.onkeyup = function(e) {
			var atpos = email.value.indexOf("@");
			var dotpos = email.value.lastIndexOf(".");
			if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.value.length) {
				emailFlag = false;
			}else{
				emailFlag = true;
			}
			checkValidation();
		}
	}
	catch(err){}

	var save = document.getElementById("save");
	function checkValidation(){
		if(nameFlag== true && ageFlag == true && phoneFlag == true && emailFlag == true){
			save.removeAttribute("disabled");
		}else{
			save.setAttribute("disabled","disabled");
		}
	}
	
	var dataURL = '';
	var profileImage = document.getElementById('showImage');
	var openFile = function(event) {
		var input = event.target;
		var reader = new FileReader();
		reader.onload = function(){
		  dataURL = reader.result;
		  profileImage.src = dataURL;
		};
		reader.readAsDataURL(input.files[0]);
	};
	
	function ProfileService(){
		this.name;
		this.age;
		this.phone;
		this.email;
		this.address;
		this.profileImage;
	}
	ProfileService.prototype.save = function(){
		this.name = name.value;;
		this.age = age.value;
		this.phone = phone.value;
		this.email = email.value;
		this.address = document.getElementById('address').value;
		this.profileImage = dataURL;
		clearForm();
	}

	function clearForm(){
		document.getElementById('myform').reset();
		alert('Profile saved successfully');
		save.setAttribute("disabled","disabled");
		profileImage.src = '';
	}

	var saveProfile = document.getElementById('save');
	var saveData = new ProfileService();
	try {
		saveProfile.onclick = function() {
			saveData.save();
			console.log(saveData);
			return false;
		}
	}
	catch(err){}

