//Project 1    
//Cameron Mozie
//MiU
//MiU1206
window.addEventListener("DOMContentLoaded", function () {


    //getElementByIdFunction
    function $(x) {
        var theElement = document.getElementById(x);
        return theElement;
    }

    //create select field element and populate with options.
    function makeCats() {
        var eventGroups = ["--Choose A Catagory--", "Birthday", "Wedding", "Meeting", "BabyShower", "Concert", "Movies", "KidsEvent", "DinnerParty", "RoadTrip", "SportingEvent", "BookSigning"];
        var formTag = document.getElementsByTagName("form"),
            //form tag is array 
            selectLi = $("chooseCat"),
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

        if ($("Monday").checked) {
            checkBoxes.push($("Monday").value);
        }

        if ($("Tuesday").checked) {
            checkBoxes.push($("Tuesday").value);
        }

        if ($("Wednesday").checked) {
            checkBoxes.push($("Wednesday").value);
        }

        if ($("Thursday").checked) {
            checkBoxes.push($("Thursday").value);
        }

        if ($("Friday").checked) {
            checkBoxes.push($("Friday").value);
        }

        if ($("Saturday").checked) {
            checkBoxes.push($("Saturday").value);
        }

        if ($("Sunday").checked) {
            checkBoxes.push($("Sunday").value);
        }

        return checkBoxes;
    }

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
        item.group = ["Event:", $("groups").value];
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
        var saveLink = $("saveEvent");
        //shows the form
        toggleControls("off");

        //populate the form files with the current localStorage values
        $("groups").value = item.group[1];
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
        $("items").style.display = "block";
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

    function validate(event) {
        //define elements we want to check
        var getGroup = $("groups");
        var getFname = $("firstName");
        var getLname = $("lastName");
        var getPhoneNumber = $("phoneNumber");
        var getEmail = $("email");
        var getTime = $("timeOfEvent");
        var getDate = $("dateOfEvent");
        var getText = $("textBox");
        var getIq = $("range");

        //Reset Error Messages
        var errorMsg = $("errors");
        errorMsg.innerHTML = "";
        getGroup.style.border = "1px solid black";
        getFname.style.border = "1px solid black";
        getLname.style.border = "1px solid black";
        getPhoneNumber.style.border = "1px solid black";
        getEmail.style.border = "1px solid black";
        getTime.style.border = "1px solid black";
        getDate.style.border = "1px solid black";

        //get  Error messages
        var messageArray = [];
        //group validate
        if (getGroup.value === "--Choose A Catagory--") {
            var groupError = "Please Select A Group.";
            getGroup.style.border = "1px solid red";
            messageArray.push(groupError);

        }

        //firstName validation
        if (getFname.value === "") {
            var fNameError = "Please Enter A First Name.";
            getFname.style.border = "1px solid red";
            messageArray.push(fNameError);

        }

        if (getLname.value === "") {
            var LnameError = "Please Enter A Last Name.";
            getLname.style.border = "1px solid red";
            messageArray.push(LnameError);
        }


        var RegPhone = /^\(?([0-9]{3})\)?[\-. ]?([0-9]{3})[\-. ]?([0-9]{4})$/;

        if (!(RegPhone.exec(getPhoneNumber.value))) {
            var phoneError = "Please Enter A valid Phone Number.";
            getPhoneNumber.style.border = "1px solid red";
            messageArray.push(phoneError);
        }

        var RegEx = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

        if (!(RegEx.exec(getEmail.value))) {
            var emailError = "Please Enter A Valid Email Address.";
            getEmail.style.border = "1px solid red";
            messageArray.push(emailError);
        }

        var re2 = /^\d{1,2}:\d{2}([AP]M)?$/;

        if (!(re2.exec(getTime.value))) {
            var timeError = "Please Enter Valid Time.(ie 12:00PM)";
            getTime.style.border = "1px solid red";
            messageArray.push(timeError);
        }

        if (getDate.value === "") {
            var dateError = "Please Enter A Date.(ie 12/24/2012)";
            getDate.style.border = "1px solid red";
            messageArray.push(dateError);
        }

        if (messageArray.length >= 1) {
            for (var i = 0, j = messageArray.length; i < j; i++) {
                var txt = document.createElement("li");
                txt.innerHTML = messageArray[i];
                errorMsg.appendChild(txt);

            }
            event.preventDefault();

        } else {
            //If all is OK this will save.
            storeData(this.key);

        }

    }

    function getSearch() {
        var category = $("groups").value;
        var term = $("search").value;
        var makeDiv2 = document.createElement("div");
        makeDiv2.setAttribute("id", "searches");
        var makeList2 = document.createElement("ul");
        makeDiv2.appendChild(makeList2);
        document.body.appendChild(makeDiv2);
        //By Category Only
        if (category !== "--Choose A Catagory--" && term === "") {
            for (var i = 0, j = localStorage.length; i < j; i++) {
                var key = localStorage.key(i);
                var vals = localStorage.getItem(key);
                var item = JSON.parse(vals);
                var catLi = document.createElement("li");
                makeList2.appendChild(catLi);
                if (category === item.group[1]) {
                    for (var n in item) {
                        var subCatLi = document.createElement("li");
                        var subText = item[n][0] + "  " + item[n][1];
                        makeList2.innerHTML = subText;



                    }
                }

            }
        }


        //By term
        if (term !== "") {
            for (i = 0, j = localStorage.length; i < j; i++) {
                var key = localStorage.key(i);
                var vals = localStorage.getItem(key);
                var itemz = JSON.parse(vals);
                
                for (n in itemz) {
                    if (itemz[n][1].indexOf(term) != -1) {
                        for (var q in itemz) {
                            console.log(itemz[q][1]);



                        }
                    }
                }
            }

        }

        //By category and term
        if (term !== "" && category !== "--Choose A Catagory--") {
            for (i = 0, j = localStorage.length; i < j; i++) {
                var key = localStorage.key(i);
                var vals = localStorage.getItem(key);
                var itemz = JSON.parse(vals);
                for (n in itemz) {
                    if (itemz[n][1].indexOf(term) != -1) {
                        for (q in itemz) {
                            console.log(itemz[q][1]);
                        }
                    }
                }
            }

        }
    }



    makeCats();
    

    var displayLink = $("displayStoredData");
    displayLink.addEventListener("click", getData);
    var clearLink = $("clearStoredData");
    clearLink.addEventListener("click", clearLocal);
    var saveLink = $("saveEvent");
    saveLink.addEventListener("click", validate);
    var editSubmit = $("saveEvent");
    editSubmit.addEventListener("click", validate);
    var search = $("searchButton");
    search.addEventListener("click", getSearch);


});