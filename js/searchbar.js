function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

const phrases = ["1964 nuclear weapons test", "China nuclear weapons test", "Project 596", "1973 oil crisis", "1992 Consensus", "2000 presidential election", "2004 presidential election", "2008 presidential election", "2016 general election", "2-28 Hand-in-hand Rally", "Hand-in-hand Rally", "2-28 Incident", "February 28 Massacre", "Aborigines under Japanese rule", "Administrative divisions of the Republic of China", "Amendments for the Period of Mobilisation", "Annette Lu", "Lu Hsiulian", "Anti-Secession Law", "Assimilation measures under Japanese rule", "Cairo Conference", "Central Reform Committee", "Chen Shui-bian", "A-bian", "Chen Yi", "Chiang Ching-kuo", "Chung-li Incident", "Clinton's Three Nos", "Contract Manufacturing", "Democratic Progressive Party", "DPP", "Democratic reforms under Japanese rule", "Self-government reforms under Japanese rule", "Diaoyutai-Senkaku dispute", "Economic Stabilisation Board", "Economy of Taiwan 1945-49", "Empire of Japan", "Japan", "First Taiwan Strait Crisis", "Formosa Resolution", "Formosa magazine", "Founding of the DPP", "Free China Fortnightly", "Geography_of_Taiwan", "Government structure of the ROC", "Hometown literature", "Hsinchu Science-Based Industrial Park", "Hsinchu Industrial Park", "Hsinchu Science Park", "Hui", "Ilha Formosa", "Formosa", "Industrial Technology Research Institute", "James Soong", "Soong Chu-yu", "Jimmy Carter", "James Earl Carter", "K. Y. Yin", "Yin Zhong-rong", "K. T. Li", "Li Guo-ding", "Kaohsiung Export Processing Zone", "Kaohsiung Incident", "Kinmen Islands", "Jinmen Islands", "Quemoy", "Korean War", "Kuomintang", "KMT", "Guomindang", "GMD", "Chinese Nationalist Party", "Nationalist Party of China", "Land to the Tiller", "Land reform", "Language policy of the KMT", "Lee Teng-hui", "Lifting of martial law", "Ma Ying-jeou", "Ma's Three Nos", "March 19 shooting", "Assassination attempt against Chen Shui-bian", "Nationalist retreat", "New Taiwan dollar", "NTD", "New Taiwanese", "New Tide", "Nineteen Point Program for Economic and Financial Reform", "Pan-Blue coalition", "Blues", "Pan-Green", "Greens", "Penghu Islands", "Pescadores", "People's Republic of China", "PRC", "Republic of China", "ROC", "Republic of Formosa", "Retrocession", "Second Taiwan Strait Crisis", "Shanghai Communiqué", "Sino-US Joint Communiqué", "Six Assurances", "Stanford Research Institute", "Statute for the Encouragement of Investment", "Sunflower Movement", "Taiwan Culture Society", "Taiwanese Cultural Association", "Taiwan During World War II", "Taiwan Garrison Command", "Taiwan Production Board", "Taiwan Relations Act", "Taiwan Solidarity Union", "Tangwai", "Non-party", "Ten Major Construction Projects", "The Eighties", "Third Taiwan Strait Crisis", "Thirty-two Demands", "Three Principles of the People", "Sun Yat-sen's Three Principles of the People", "Treaty of Shimonoseki", "UN General Assembly Resolution 2758", "26th General Assembly of the United Nations", "US-Taiwan Mutual Defence Treaty", "Sino-American Mutual Defence Treaty", "White Terror"];
autocomplete(document.getElementById("SearchInput"), phrases);