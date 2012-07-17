//Project 1    
//Cameron Mozie
//MiU
//MiU1206
window.addEventListener("DOMContentLoaded", function () {


    //getElementByIdFunction
    function ge(x) {
        var theElement = document.getElementById(x);
        return theElement;
    }
   
    //create select field element and populate with options.
    function makeCats() {
        var eventGroups = ["--Choose A Catagory--", "Birthday", "Wedding", "Meeting", "BabyShower", "Concert", "Movies", "KidsEvent", "DinnerParty", "RoadTrip", "SportingEvent", "BookSigning"];
        var formTag = document.getElementsByTagName("form"),
            //form tag is array 
            selectLi = ge("select-choice-1"),
            makeSelect = document.createElement("select");
        makeSelect.setAttribute("id", "groups");
        for (var i = 0, j = eventGroups.length; i < j; i++) {
            var makeOption = document.createElement("option");
            var optText = eventGroups[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);

    }

    function getCheckboxValue() {

        var checkBoxes = [];

        if (ge("Monday").checked) {
            checkBoxes.push(ge("Monday").value);
        }

        if (ge("Tuesday").checked) {
            checkBoxes.push(ge("Tuesday").value);
        }

        if (ge("Wednesday").checked) {
            checkBoxes.push(ge("Wednesday").value);
        }

        if (ge("Thursday").checked) {
            checkBoxes.push(ge("Thursday").value);
        }

        if (ge("Friday").checked) {
            checkBoxes.push(ge("Friday").value);
        }

        if (ge("Saturday").checked) {
            checkBoxes.push(ge("Saturday").value);
        }

        if (ge("Sunday").checked) {
            checkBoxes.push(ge("Sunday").value);
        }

        return checkBoxes;
    }

    function toggleControls(tag) {
        switch (tag) {
        case "on":
            ge("eventForm").style.display = "none";
            ge("clearStoredData").style.display = "inline";
            ge("displayStoredData").style.display = "none";
            ge("addNew").style.display = "inline";
            break;
        case "off":
            ge("eventForm").style.display = "block";
            ge("clearStoredData").style.display = "inline";
            ge("displayStoredData").style.display = "inline";
            ge("addNew").style.display = "none";

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
        item.group = ["Event:", ge("select-choice-1").value];
        item.firstName = ["FirstName:", ge("firstName").value];
        item.lastName = ["LastName:", ge("lastName").value];
        item.address = ["address:", ge("address").value];
        item.city = ["City:", ge("city").value];
        item.state = ["State:", ge("state").value];
        item.phoneNumber = ["PhoneNumber:", ge("phoneNumber").value];
        item.email = ["Email:", ge("email").value];
        item.timeEVent = ["TimeOfEvent:", ge("timeOfEvent").value];
        item.date = ["DateOfEvent:", ge("dateOfEvent").value];
        item.textBox = ["TextBox:", ge("textBox").value];
        item.iq = ["Range:", ge("range").value];
        item.checkBox = ["CheckBox:", getCheckboxValue()];


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
        var saveLink = ge("saveEvent");
        //shows the form
        toggleControls("off");

        //populate the form files with the current localStorage values
        ge("select-choice-1").value = item.group[1];
        ge("firstName").value = item.firstName[1];
        ge("lastName").value = item.lastName[1];
        ge("address").value = item.address[1];
        ge("city").value = item.city[1];
        ge("state").value = item.state[1];
        ge("phoneNumber").value = item.phoneNumber[1];
        ge("email").value = item.email[1];
        ge("timeOfEvent").value = item.timeEVent[1];
        ge("dateOfEvent").value = item.date[1];
        ge("textBox").value = item.textBox[1];
        ge("range").value = item.iq[1];

        if (ge("Monday").value == item.checkBox[1]) {
            ge("Monday").setAttribute("checked", "checked");
        }


        if (ge("Tuesday").value == item.checkBox[1]) {
            ge("Tuesday").setAttribute("checked", "checked");
        }
        if (ge("Wednesday").value == item.checkBox[1]) {
            ge("Wednesday").setAttribute("checked", "checked");
        }
        if (ge("Thursday").value == item.checkBox[1]) {
            ge("Thursday").setAttribute("checked", "checked");
        }
        if (ge("Friday").value == item.checkBox[1]) {
            ge("Friday").setAttribute("checked", "checked");
        }

        if (ge("Saturday").value == item.checkBox[1]) {
            ge("Saturday").setAttribute("checked", "checked");
        }

        if (ge("Sunday").value == item.checkBox[1]) {
            ge("Sunday").setAttribute("checked", "checked");
        }

        //remove the initial listener from the input "save contact"       
        saveLink.removeEventListener("click", storeData);
        //change submit button value to edit button
        ge("saveEvent").value = "Edit Contact";
        var editSubmit = ge("saveEvent");
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
        ge("items").style.display = "block";
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

//    function validate(event) {
//        //define elements we want to check
//        var getGroup = ge("groups");
//        var getFname = ge("firstName");
//        var getLname = ge("lastName");
//        var getPhoneNumber = ge("phoneNumber");
//        var getEmail = ge("email");
//        var getTime = ge("timeOfEvent");
//        var getDate = ge("dateOfEvent");
//        var getText = ge("textBox");
//        var getIq = ge("range");
//
//        //Reset Error Messages
//       // var errorMsg = ge("errors");
//       // errorMsg.innerHTML = "";
//       // getGroup.style.border = "1px solid black";
//       // getFname.style.border = "1px solid black";
//       // getLname.style.border = "1px solid black";
//       // getPhoneNumber.style.border = "1px solid black";
//       // getEmail.style.border = "1px solid black";
//       // getTime.style.border = "1px solid black";
//       // getDate.style.border = "1px solid black";
//
//        //get  Error messages
//        var messageArray = [];
//        //group validate
//        if (getGroup.value === "--Choose A Catagory--") {
//            var groupError = "Please Select A Group.";
//            getGroup.style.border = "1px solid red";
//            messageArray.push(groupError);
//
//        }
//
//        //firstName validation
//        if (getFname.value === "") {
//            var fNameError = "Please Enter A First Name.";
//            getFname.style.border = "1px solid red";
//            messageArray.push(fNameError);
//
//        }
//
//        if (getLname.value === "") {
//            var LnameError = "Please Enter A Last Name.";
//            getLname.style.border = "1px solid red";
//            messageArray.push(LnameError);
//        }
//
//
//        var RegPhone = /^\(?([0-9]{3})\)?[\-. ]?([0-9]{3})[\-. ]?([0-9]{4})$/;
//
//        if (!(RegPhone.exec(getPhoneNumber.value))) {
//            var phoneError = "Please Enter A valid Phone Number.";
//            getPhoneNumber.style.border = "1px solid red";
//            messageArray.push(phoneError);
//        }
//
//        var RegEx = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
//
//        if (!(RegEx.exec(getEmail.value))) {
//            var emailError = "Please Enter A Valid Email Address.";
//            getEmail.style.border = "1px solid red";
//            messageArray.push(emailError);
//        }
//
//        var re2 = /^\d{1,2}:\d{2}([AP]M)?$/;
//
//        if (!(re2.exec(getTime.value))) {
//            var timeError = "Please Enter Valid Time.(ie 12:00PM)";
//            getTime.style.border = "1px solid red";
//            messageArray.push(timeError);
//        }
//
//        if (getDate.value === "") {
//            var dateError = "Please Enter A Date.(ie 12/24/2012)";
//            getDate.style.border = "1px solid red";
//            messageArray.push(dateError);
//        }
//
//        if (messageArray.length >= 1) {
//            for (var i = 0, j = messageArray.length; i < j; i++) {
//                var txt = document.createElement("li");
//                txt.innerHTML = messageArray[i];
//                errorMsg.appendChild(txt);
//
//            }
//            event.preventDefault();
//
//        } else {
//            //If all is OK this will save.
//            storeData(this.key);
//
//        }
//
//    }
    
    function getSearch() {
	
        //var category = $("groups").value;
        var term = ge("search").value;
        var makeDiv2 = document.createElement("div");
        makeDiv2.setAttribute("id", "items");
        var makeList2 = document.createElement("ul");
        makeDiv2.appendChild(makeList2);
        document.body.appendChild(makeDiv2);
         ge("items").style.display = "block";
         
        //By Category Only
       // if (category !== "--Choose A Catagory--" && term === "") {
       //     for (var i = 0, j = localStorage.length; i < j; i++) {
       //         var key = localStorage.key(i);
       //         var vals = localStorage.getItem(key);
       //         var items = JSON.parse(vals);
       //         if (category === items.group[1]) {
       //             for (var n in items) {
	   //             	console.log(items[n][1]);
       //             }
       //         }
       //     }
       // }


        //By term
        if (term !== "" ) {
            for (i = 0, j = localStorage.length; i < j; i++) {
            var makeLi2 = document.createElement("ul");
            var linksLi2 = document.createElement("li");
            makeList2.appendChild(makeLi2);
                var key = localStorage.key(i);
                var vals = localStorage.getItem(key);
                var items = JSON.parse(vals);
                var makeOtherList2 = document.createElement("li");
                makeLi2.appendChild(makeOtherList2);
                getImage(items.groups[1], makeOtherList2);
                for (var p in items) {
                    if (items[p][1] === term) {
                        for (var q in items) {
                        var makeOtherLi2 = document.createElement("li");
                        makeOtherList2.appendChild(makeOtherLi2);
                         var optSubText2 = items[0] + "" + items[1];
                         makeOtherLi2.innerHTML = optSubText2;
                         makeOtherList2.appendChild(linksLi2);
                            //console.log(items[q][1]);
                        }
                    }
                }
            }
        }

}
        //By category and term
//        if (term !== "" && category !== "--Choose A Catagory--") {
//            for (i = 0, j = localStorage.length; i < j; i++) {
//                var key = localStorage.key(i);
//                var vals = localStorage.getItem(key);
//                var itemz = JSON.parse(vals);
//                for (var f in items) {
//                    if (items[f][1].indexOf(term) != -1) {
//                        for (var q in items) {
//                            console.log(items[q][1]);
//                        }
//                    }
//                }
//            }
//        }
//    }



    makeCats();

    
    var displayLink = ge("displayStoredData");
    displayLink.addEventListener("click", getData);
    var clearLink = ge("clearStoredData");
    clearLink.addEventListener("click", clearLocal);
    var saveLink = ge("saveEvent");
    saveLink.addEventListener("click");
    var editSubmit = ge("saveEvent");
    editSubmit.addEventListener("click");
    //var searchB = ge("searchButton");
    //searchB.addEventListener("click", getSearch);


});