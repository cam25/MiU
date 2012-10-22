$('#Home').on('pageinit', function(){
	//code needed for home page goes here
	
	
	
});	
		
$('#addItem2').on('pageinit', function(){
		
		var validate = function() {
		var evForm = $('#eventForm');
		    evForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = evForm.serializeArray();
			storeData(this.key);
			console.log(localStorage);
			
		}
	});
	
	
	};
	
	//any other code needed for addItem page goes here



//The functions below can go inside or outside the pageinit function for the page in which it is needed.



var storeData = function(key){
	if (!key) {


            var id = Math.floor(Math.random() * 1000000001);
        } else {
            //Set the id to the existing key we're editting so that it will save the data.
            //The key is the same key that's been passed along from the editSubmit eventhanbdler.
            //to the validate function, then passed here, into the storeData 
             id = key;

        }
        //Gather up all our form field values and store in an object.
        //Object properties contain array with the form label and input values
        var item = {};
        item.group = ["Event:", $("#select-choice-1").val()];
        item.firstName = ["FirstName:", $("#firstName").val()];
        item.lastName = ["LastName:", $("#lastName").val()];
        item.address = ["address:", $("#address").val()];
        item.city = ["City:", $("#city").val()];
        item.state = ["State:", $("#state").val()];
        item.phoneNumber = ["PhoneNumber:", $("#phoneNumber").val()];
        item.email = ["Email:", $("#email").val()];
        //item.timeEVent = ["TimeOfEvent:", $("timeOfEvent").value];
        item.date = ["mydate:", $("#mydate").val()];
        item.textBox = ["TextBox:", $("#textBox").val()];
        item.iq = ["Range:", $("#range").val()];
        //item.checkBox = ["CheckBox:", gE("checkbox").value];


        //save data to local storage: Use Stringify to convert our object to a string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Contact Saved");
	
};

var autoFillData = function (){
        //The actual JSON object data required for this to work is coming from our json.js file. which is loaded from our addItem.html file.
        //Store the JSON OBJECT in local storage.
        for (var n in JSON) {
            var id = Math.floor(Math.random() * 1000000001);
            localStorage.setItem(id, JSON.stringify(JSON[n]));

        }

	 
};

$(function) toggleControls(tag) {
        switch (tag) {
        case "on":
            $("eventForm").css("display", "block");
            $("clearStoredData").css("display", "block");
            $("displayStoredData").css("display", "block");
            //gE("addNew").style.display = "inline";
            break;
        case "off":
            $("eventForm").css("display", "block");
            $("clearStoredData").css("display", "block");
            $("displayStoredData").css("display", "block");
            //gE("addNew").style.display = "none";

            break;
        default:
            return false;


        }
    }

var editItem = function() {
        //Grab the data from our item from local storage.
        var value = localStorage.getItem(this.key);
        var item = jQuery.parseJSON(value);
        var saveLink = $("#saveEvent");
        //shows the form

        //populate the form files with the current localStorage values
        $("#select-choice-1").val() = item.group[1];
        $("#firstName").val() = item.firstName[1];
        $("#lastName").val() = item.lastName[1];
        $("#address").val() = item.address[1];
        $("#city").val() = item.city[1];
        $("#state").val() = item.state[1];
        $("#phoneNumber").val() = item.phoneNumber[1];
        $("#email").val() = item.email[1];
        //gE("timeOfEvent").value = item.timeEVent[1];
        $("#mydate").val() = item.date[1];
        $("#textBox").val() = item.textBox[1];
        $("#range").val() = item.iq[1];

        //remove the initial listener from the input "save contact"       
        saveLink.off("click", storeData);
        //change submit button value to edit button
        $("#saveEvent").val() = "Edit Contact";
        var editSubmit = $("#saveEvent");
        //save the key value established in this function as a property of the edit Submit event
        //editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;



    };
    
    var	deleteItem = function (){

	var ask = confirm("Are you sure you want to delete this event?");
        if (ask) {
            localStorage.removeItem(this.key);
            window.location.reload();
        } else {
            alert("Event was NOT removed");

        }

			
};


function makeItemLinks(key, linksLi) {
        //add edit single item link
        var editLink = $("<a>");
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Event";
        editLink.on("click", function() {
	        editItem(editLink.key);
        });
        editLink.html = editText;
        linksLi.append(editLink);

        //add line break
        var breakTag = $("<br>");
        linksLi.append(breakTag);


        //delete link
        var deleteLink = $("<a>");
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Event";
        deleteLink.on("click", deleteItem);
        deleteLink.html = deleteText;
        linksLi.append(deleteLink);

    }



var getImage = function(catName, makeOtherList) {
        var imageLi = $("<li>");
        makeOtherList.append(imageLi);
        var newImage = $("<img>");
        var setSource = newImage.attr("src", "images/" + catName + ".png");
        imageLi.append(newImage);

    };

var getData = function(){


        toggleControls("on");
        //write Data from Local Storage to the browser.
        var makeDiv = $("#display");
        makeDiv.attr("#items");
        var makeList = $("<ul>");
        makeDiv.append(makeList);
        $("#displayPage").append(makeDiv);
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var makeLi = $("<li></li>");
            var linksLi = $("<li></li>");
            makeList.append(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert string from local storage value to an object by using json.Parse
            var item = JSON.parse(localStorage.getItem(key));
            console.log(item);
            var makeOtherList = $("<li></li>");
            makeLi.append(makeOtherList);
            getImage(item.group[1], makeOtherList);
            console.log(item.group[1]);
            for (var tag in item) {
                var makeOtherLi = $("<li></li>");
                makeOtherList.append(makeOtherLi);
                var optSubText = item[tag][0] + " " + item[tag][1];
                makeOtherLi.html = optSubText;
                makeOtherList.append(linksLi);
                
            }
           
            makeItemLinks(localStorage.key(i), linksLi); // create our edit and delete buttons/links for each item in local storage
        }

};


					
var clearLocal = function(){

	if (localStorage.length === 0) {
            alert("There is no data to clear.");
        } else {
            localStorage.clear();
            alert("All contacts are deleted!");
            window.location.reload();
            return false;
        }
            

};

console.log(localStorage.length);
	
	
var displayLink = $("#displayStoredData");
    displayLink.on("click", getData);
    var clearLink = $("#clearStoredData");
    clearLink.on("click", clearLocal);
    var saveLink = $("#saveEvent");
    saveLink.on("click", validate);
    
});

