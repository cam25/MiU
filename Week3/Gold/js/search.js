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
            var makeLi2 = document.createElement("li");
            var linksLi2 = document.createElement("li");
            makeList2.appendChild(makeLi2);
                var key = localStorage.key(i);
                var vals = localStorage.getItem(key);
                var items = JSON.parse(vals);
                var makeOtherList2 = document.createElement("ul");
                makeLi2.appendChild(makeOtherList2);
                getImage(items.group[1], makeOtherList2);
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
var searchB = $("searchButton");
    search.addEventListener("click", getSearch);