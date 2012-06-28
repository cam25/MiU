

function getSearch() {
        var category = $("groups").value;
        var term = $("search").value;
        var makeDiv2 = document.createElement("div");
        makeDiv2.setAttribute("id", "searches");
        var makeList2 = document.createElement("ul");
        makeDiv2.appendChild(makeList2);
        document.body.appendChild(makeDiv2);
        //By Category Only
 


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
    
     
var search = $("searchButton");
 search.addEventListener("click", getSearch);