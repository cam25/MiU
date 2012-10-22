
     
$(document).bind('pageinit', function(){
$("#Home").fadeIn("slow";)
    
    var evform = $("#eventForm");
    evform.validate({
    invalidHandler: function(form, validator){

},
submitHandler: function(){
var data = evform.serializeArray();
parseEventForm(data);
console.log(localStorage);


}
    
});


$(function) gE(x) {
        var theElement = document.getElementById(x);
        return theElement;
    }

$(function) toggleControls(tag) {
        switch (tag) {
        case "on":
            gE("eventForm").style.display = "block";
            gE("clearStoredData").style.display = "block";
            gE("displayStoredData").style.display = "block";
            //gE("addNew").style.display = "inline";
            break;
        case "off":
            gE("eventForm").style.display = "block";
            gE("clearStoredData").style.display = "block";
            gE("displayStoredData").style.display = "block";
            //gE("addNew").style.display = "none";

            break;
        default:
            return false;


        }
    }
    
$(function) storeData(key) {
        //IF there is no key, this means this is a brand new item we need a new key.
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
        item.group = ["Event:", gE("select-choice-1").value];
        item.firstName = ["FirstName:", gE("firstName").value];
        item.lastName = ["LastName:", gE("lastName").value];
        item.address = ["address:", gE("address").value];
        item.city = ["City:", gE("city").value];
        item.state = ["State:", gE("state").value];
        item.phoneNumber = ["PhoneNumber:", gE("phoneNumber").value];
        item.email = ["Email:", gE("email").value];
        //item.timeEVent = ["TimeOfEvent:", gE("timeOfEvent").value];
        item.date = ["mydate:", gE("mydate").value];
        item.textBox = ["TextBox:", gE("textBox").value];
        item.iq = ["Range:", gE("range").value];
        //item.checkBox = ["CheckBox:", gE("checkbox").value];


        //save data to local storage: Use Stringify to convert our object to a string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Contact Saved");


    }


    function autoFillData() {
        //The actual JSON object data required for this to work is coming from our json.js file. which is loaded from our addItem.html file.
        //Store the JSON OBJECT in local storage.
        for (var n in json) {
            var id = Math.floor(Math.random() * 1000000001);
            localStorage.setItem(id, JSON.stringify(json[n]));

        }

    }

    function editItem() {
        //Grab the data from our item from local storage.
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        var saveLink = $("#saveEvent");
        //shows the form

        //populate the form files with the current localStorage values
        $("#select-choice-1").value = item.group[1];
        $("#firstName").value = item.firstName[1];
        $("#lastName").value = item.lastName[1];
        $("#address").value = item.address[1];
        $("#city").value = item.city[1];
        $("#state").value = item.state[1];
        $("#phoneNumber").value = item.phoneNumber[1];
        $("#email").value = item.email[1];
        //gE("timeOfEvent").value = item.timeEVent[1];
        $("#mydate").value = item.date[1];
        $("#textBox").value = item.textBox[1];
        $("#range").value = item.iq[1];

//        if (gE("Monday").value == item.checkBox[1]) {
//            gE("Monday").setAttribute("checked", "checked");
//        }
//
//
//        if (gE("Tuesday").value == item.checkBox[1]) {
//            gE("Tuesday").setAttribute("checked", "checked");
//        }
//        if (gE("Wednesday").value == item.checkBox[1]) {
//            gE("Wednesday").setAttribute("checked", "checked");
//        }
//        if (gE("Thursday").value == item.checkBox[1]) {
//            gE("Thursday").setAttribute("checked", "checked");
//        }
//        if (gE("Friday").value == item.checkBox[1]) {
//            gE("Friday").setAttribute("checked", "checked");
//        }
//
//        if (gE("Saturday").value == item.checkBox[1]) {
//            gE("Saturday").setAttribute("checked", "checked");
//        }
//
//        if (gE("Sunday").value == item.checkBox[1]) {
//            gE("Sunday").setAttribute("checked", "checked");
//        }

        //remove the initial listener from the input "save contact"       
        saveLink.off("click", storeData);
        //change submit button value to edit button
        $("#saveEvent").val() = "Edit Contact";
        var editSubmit = $("#saveEvent");
        //save the key value established in this function as a property of the edit Submit event
        //editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;



    }


    function deleteItem() {
        var ask = confirm("Are you sure you want to delete this event?");
        if (ask) {
            localStorage.removeItem(this.key);
            window.location.reload();
        } else {
            alert("Event was NOT removed");

        }

    }

    function makeItemLinks(key, linksLi) {
        //add edit single item link
        var editLink = $("<a>");
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Event";
        editLink.on("click", editItem);
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

    function getImage(catName, makeOtherList) {
        var imageLi = document.createElement("li");
        makeOtherList.appendChild(imageLi);
        var newImage = document.createElement("img");
        var setSource = newImage.setAttribute("src", "images/" + catName + ".png");
        imageLi.appendChild(newImage);

    }
    function getData() {
        toggleControls("on");
        if (localStorage.length === 0) {
            alert("There is no data inside Local Storage so default data was added.");
            autoFillData();
        }
        //write Data from Local Storage to the browser.
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement("ul");
        makeDiv.appendChild(makeList);
        document.getElementById("displayPage").appendChild(makeDiv);
        gE("items").style.display = "block";
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var makeLi = document.createElement("li");
            var linksLi = document.createElement("li");
            makeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert string from local storage value to an object by using json.Parse
            var obj = JSON.parse(value);
            var makeOtherList = document.createElement("ul");
            makeLi.appendChild(makeOtherList);
            getImage(obj.group[1], makeOtherList);
            for (var tag in obj) {
                var makeOtherLi = document.createElement("li");
                makeOtherList.appendChild(makeOtherLi);
                var optSubText = obj[tag][0] + " " + obj[tag][1];
                makeOtherLi.innerHTML = optSubText;
                makeOtherList.appendChild(linksLi);
                
            }
            makeItemLinks(localStorage.key(i), linksLi); // create our edit and delete buttons/links for each item in local storage
        }
        
    }
    
    //get image for right catagory being displayed.

    function clearLocal() {
        if (localStorage.length === 0) {
            alert("There is no data to clear.");
        } else {
            localStorage.clear();
            alert("All contacts are deleted!");
            window.location.reload();
            return false;
        }
    }
    var parseEventForm = function(data) { 
        //uses data
       storeData();
	console.log(localStorage); 
	
        
     };
    
    


var displayLink = gE("displayStoredData");
    displayLink.addEventListener("click", getData);
    var clearLink = gE("clearStoredData");
    clearLink.addEventListener("click", clearLocal);
//    var saveLink = gE("saveEvent");
//    saveLink.addEventListener(storeData);
  //  var editSubmit = gE("saveEvent");
  // editSubmit.addEventListener("click",getData);

});


//var parseEventForm = function(data){
//    // uses the form data here:
//    console.log(data)
//};
//
//gE(document).bind('pageinit', function(){
//
//    var evForm = gE("#eventForm"),
//        errorslink = gE("#errorlink");
//    evForm.validate({
//        invalidHandler: function(form, validator){
//            errorslink.click();
//            var html = '';
//             console.log(validator.submitted);
//            for(var key in validator.submitted){
//                var label = gE('label[for^="'+ key +'"]').not('[generated]');  // error with a label except those generated.
//                console.log(label.text());
//                var legend = label.closest('fieldset').find('.ui-controlgroup-label');  
//                var fieldName = legend.length ? legend.text() : label.text();
//                console.log(fieldName);
//                html += '<li>'+ fieldName +'</li>';
//            };
//            gE("#errorslink ul").html(html);
//        },
//        submitHandler: function() {
//            var data = evForm.serializeArray();
//            localStorage.setItem("formdata",data);
//            parseEventForm(data);
//        }
//    });
//   console.log(localStorage)
//
//
//
//     
//    
//    
//});


