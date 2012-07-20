var parseEventForm = function(data) { 
        //uses data
        localStorage.setItem("formdata",data);
        localStorage.setItem("firstName",$("#firstName".value));
        localStorage.getItem("formdata",data);
        $.jStorage.storageSize()
        console.log(localStorage);

        console.log(data);
  
        console.log(firstName);
     };
     
$(document).bind('pageinit', function(){
    
    var evform = $("#eventForm");
    evform.validate({
    invalidHandler: function(form, validator){

},
submitHandler: function(){
var data = evform.serializeArray();
parseEventForm(data);


}
    
});

function toggleControls(tag) {
        switch (tag) {
        case "on":
            $("eventForm").style.display = "none";
            $("clearStoredData").style.display = "inline";
            $("displayStoredData").style.display = "none";
            $("addNew").style.display = "inline";
            break;
        case "off":
            $("eventForm").style.display = "block";
            $("clearStoredData").style.display = "inline";
            $("displayStoredData").style.display = "inline";
            $("addNew").style.display = "none";

            break;
        default:
            return false;


        }
    }
    
function storeData(key) {
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
        item.group = ["Event:", $("select-choice-1").value];
        item.firstName = ["FirstName:", $("firstName").value];
        item.lastName = ["LastName:", $("lastName").value];
        item.address = ["address:", $("address").value];
        item.city = ["City:", $("city").value];
        item.state = ["State:", $("state").value];
        item.phoneNumber = ["PhoneNumber:", $("phoneNumber").value];
        item.email = ["Email:", $("email").value];
        item.timeEVent = ["TimeOfEvent:", $("timeOfEvent").value];
        item.date = ["DateOfEvent:", $("dateOfEvent").value];
        item.textBox = ["TextBox:", $("textBox").value];
        item.iq = ["Range:", $("range").value];
        item.checkBox = ["CheckBox:", $("checkbox").value];


        //save data to local storage: Use Stringify to convert our object to a string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Contact Saved");


    }


    function autoFillData() {
        //The actual JSON object data required for this to work is coming from our json.js file. which is loaded from our addItem.html file.
        //Store the JSON OBJECT in local storage.
        for (var n in JSON) {
            var id = Math.floor(Math.random() * 1000000001);
            localStorage.setItem(id, JSON.stringify(JSON[n]));

        }

    }

    function editItem() {
        //Grab the data from our item from local storage.
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        var saveLink = $("saveEvent");
        //shows the form
        toggleControls("off");

        //populate the form files with the current localStorage values
        $("select-choice-1").value = item.group[1];
        $("firstName").value = item.firstName[1];
        $("lastName").value = item.lastName[1];
        $("address").value = item.address[1];
        $("city").value = item.city[1];
        $("state").value = item.state[1];
        $("phoneNumber").value = item.phoneNumber[1];
        $("email").value = item.email[1];
        $("timeOfEvent").value = item.timeEVent[1];
        $("dateOfEvent").value = item.date[1];
        $("textBox").value = item.textBox[1];
        $("range").value = item.iq[1];

        if ($("Monday").value == item.checkBox[1]) {
            $("Monday").setAttribute("checked", "checked");
        }


        if ($("Tuesday").value == item.checkBox[1]) {
            $("Tuesday").setAttribute("checked", "checked");
        }
        if ($("Wednesday").value == item.checkBox[1]) {
            $("Wednesday").setAttribute("checked", "checked");
        }
        if ($("Thursday").value == item.checkBox[1]) {
            $("Thursday").setAttribute("checked", "checked");
        }
        if ($("Friday").value == item.checkBox[1]) {
            $("Friday").setAttribute("checked", "checked");
        }

        if ($("Saturday").value == item.checkBox[1]) {
            $("Saturday").setAttribute("checked", "checked");
        }

        if ($("Sunday").value == item.checkBox[1]) {
            $("Sunday").setAttribute("checked", "checked");
        }

        //remove the initial listener from the input "save contact"       
        saveLink.removeEventListener("click", storeData);
        //change submit button value to edit button
        $("saveEvent").value = "Edit Contact";
        var editSubmit = $("saveEvent");
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
        var editLink = document.createElement("a");
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Event";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);

        //add line break
        var breakTag = document.createElement("br");
        linksLi.appendChild(breakTag);


        //delete link
        var deleteLink = document.createElement("a");
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Event";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);

    }

    function getImage(catName, makeOtherList) {
        var imageLi = document.createElement("li");
        makeOtherList.appendChild(imageLi);
        var newImage = document.createElement("img");
        var setSource = newImage.setAttribute("src", "Images/" + catName + ".png");
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
        document.body.appendChild(makeDiv);
        //$("items").style.display = "block";
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


//var displayLink = $("displayStoredData");
//    displayLink.addEventListener("click", getData);
//    var clearLink = $("clearStoredData");
//    clearLink.addEventListener("click", clearLocal);
//    var saveLink = $("saveEvent");
//    saveLink.addEventListener(storeData);
//    var editSubmit = $("saveEvent");
//    editSubmit.addEventListener("click",getData);
//
});


//var parseEventForm = function(data){
//    // uses the form data here:
//    console.log(data)
//};
//
//$(document).bind('pageinit', function(){
//
//    var evForm = $("#eventForm"),
//        errorslink = $("#errorlink");
//    evForm.validate({
//        invalidHandler: function(form, validator){
//            errorslink.click();
//            var html = '';
//             console.log(validator.submitted);
//            for(var key in validator.submitted){
//                var label = $('label[for^="'+ key +'"]').not('[generated]');  // error with a label except those generated.
//                console.log(label.text());
//                var legend = label.closest('fieldset').find('.ui-controlgroup-label');  
//                var fieldName = legend.length ? legend.text() : label.text();
//                console.log(fieldName);
//                html += '<li>'+ fieldName +'</li>';
//            };
//            $("#errorslink ul").html(html);
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


