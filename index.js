
// Mouseover and out functions for Classes that changes the way they look
let resultCards = document.getElementsByClassName("result-card");
$(".result-card").mouseover(function(){
    this.className = "result-card-emp";
})
$(".result-card").mouseout(function(){
    this.className = "result-card";
})


//Function that will generate card list when you click Class
$(".result-card").click(function(){
    // When changing classes, will delete previous elements
    let checkNewPage = document.getElementById("result");
    if(checkNewPage){
        checkNewPage.remove();
    }
    //Formats the data to be inserted into the ajax function so it pulls data correctly
    let text = this.id;
    text = text.replace(' ', "%20")
    let formerEmp = document.getElementsByName("emp");
    if(formerEmp.length !== 0){
        formerEmp[0].style.fontSize = "small";
        formerEmp[0].setAttribute("name", "");
    }

    // Primarly object to handle ajax call
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/" + text,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "1eea8dba53msh9ff9f77910e33d2p13e8d5jsne6b3d40e697e",
            "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com"
        }
    };

    // Ajax call
    $.ajax(settings).done(function (response) {
        // Creates new div for results the be populated into
        let div = document.createElement("div");
        div.id = "result";
        let main = document.getElementById("main");
        main.appendChild(div);
        let i = 0;
        let cardSets = [];
        // Generates element if criteria is met and puts it into the div with ID=result
        while(i < response.length){
            //don't include results from other game types
            if(response[i].cardSet === "Hero Skins" || response[i].cardSet === "Battlegrounds" || response[i].cardSet === "Tavern Brawl" || response[i].type === "Hero" || response[i].type === "Hero Power" || response[i].cardSet === "Mercenaries"){
                i++;
                continue;
            }

           // Don't include results without imgs (not actually a card)
            if(response[i].img === undefined){
                i++;
                continue;
            }
            // Creates array that has all cardSets for that class
            if(!cardSets.includes(response[i].cardSet)){
                cardSets.push(response[i].cardSet);
            }
            // If that card name already exists, don't include it. Avoids duplicates
            let check = document.getElementsByName(response[i].name);
            if(check[0] !== undefined){
                i++;
                continue;
            }
            let h2 = document.createElement("h2");
            div.appendChild(h2);
            h2.setAttribute("name", response[i].name);
            h2.className = "cardResults " + response[i].cost;
            let h3 = document.createElement("h3");
            h3.innerHTML = response[i].name;
            h2.appendChild(h3);
            let img = document.createElement("img");
            img.src = response[i].img;
            h2.appendChild(img);
            i++
        }
        // If there are no filter buttons insert the first set of filter buttons
        let checkFilters = document.getElementById("filterButtons");
        if(checkFilters === null){
            let div1 = document.createElement("div");
            div1.id = "filterButtons";
            let button = document.createElement("button");
            button.className = "filter";
            button.innerHTML = "Card Set";

            // blocked out code are for additional filter buttons that I'll add later
         /*   let button1 = document.createElement("button");
            button1.className = "filter";
            button1.innerHTML = "Card Type";
            let button2 = document.createElement("button");
            button2.className = "filter";
            button2.innerHTML = "Cost";
            */
            let results = document.getElementById("results");
            div1.appendChild(button);
            /*
            div1.appendChild(button1);
            div1.appendChild(button2);
            */

           //Mouseover and out functions for styling on the filter buttons
            results.after(div1);
// Mana code, still working on functionality
/*
            let mana = document.createElement("div");
            mana.id = "manaCrystals";
            for (let i = 0; i < 10; i++) {
                let img = document.createElement("img")
                img.className = "mana";
                img.id = i + 1;
                img.src = "https://static.wikia.nocookie.net/hearthstone/images/f/f7/ManaCrystalIcon.png/revision/latest?cb=20130421182850";
                mana.appendChild(img);
            }
            results.after(mana);
            $(".mana").click(function(){
                console.log(this);
                let theCards = document.getElementsByClassName("cardResults");
                console.log(theCards[0]);
                for(let i = 0; i < theCards.length; i++){
                    if("cardResults " + this.id !== theCards[i].className){
                        theCards[i].style.dispplay = 'none';
                    }
                }
            })
*/
            $(".filter").mouseover(function(){
                this.className = "filter-emp";
            })
            $(".filter").mouseout(function(){
                this.className = "filter";
            })
        }
        else{
            // If filter buttons do exist, stop hiding them so they can be interacted with
            let resetFilter = document.getElementsByClassName("moreFilter");
            if(resetFilter.length > 0){
                for(let i = resetFilter.length - 1; i >= 0; i--){
                    resetFilter[i].remove();
                }
                let filters = document.getElementsByClassName("filter");
                filters[0].removeAttribute("hidden");
                /*
                filters[1].removeAttribute("hidden");
                filters[2].removeAttribute("hidden");
                */
            }
        }

        // Main click function for filter buttons
        $(".filter").click(function(){
            // when you click the button, hide it so the other new filter buttons can be highlighted
            let filterButtons = document.getElementById("filterButtons");
            let filters = document.getElementsByClassName("filter");
            let filtersemp = document.getElementsByClassName("filter-emp");
            filtersemp[0].setAttribute("hidden", "hidden");
            /*
            filters[0].setAttribute("hidden", "hidden");
            filters[1].setAttribute("hidden", "hidden");
            */

            //alphabetize the cardSet array
            cardSets.sort();

            //create new filter buttons
            for(let i = 0; i < cardSets.length;i++){
                let button = document.createElement("button");
                button.className = "moreFilter";
                button.innerHTML = cardSets[i];
                filterButtons.appendChild(button);
            }
            //styling mouseover functions
            $(".moreFilter").mouseover(function(){
                this.className = "moreFilter-emp";
            })
            $(".moreFilter").mouseout(function(){
                this.className = "moreFilter";
            })
            //reset cardSet array to be empty
            cardSets = [];
            //click function for new filter arrays. filters card by set for that class
            //this function is almost identical to the one for just clicking the class, except it additionally filters for card set based on the button you clicked
            $(".moreFilter").click(function(){
                let checkNewPage = document.getElementById("result");
                if(checkNewPage){
                    checkNewPage.remove();
                }
                let div = document.createElement("div");
                div.id = "result";
                let main = document.getElementById("main");
                main.appendChild(div);
                let i = 0;
                while(i < response.length){
                    if(response[i].cardSet === this.innerHTML){
                        if(response[i].cardSet === "Hero Skins" || response[i].cardSet === "Battlegrounds" || response[i].cardSet === "Tavern Brawl" || response[i].type === "Hero" || response[i].type === "Hero Power"){
                            i++;
                            continue;
                        }
                       
                        if(response[i].img === undefined){
                            i++;
                            continue;
                        }
                        let check = document.getElementsByName(response[i].name);
                        if(check[0] !== undefined){
                            i++;
                            continue;
                        }
                        let h2 = document.createElement("h2");
                        div.appendChild(h2);
                        h2.setAttribute("name", response[i].name);
                        h2.className = "cardResults"
                        let h3 = document.createElement("h3");
                        h3.innerHTML = response[i].name;
                        h2.appendChild(h3);
                        let img = document.createElement("img");
                        img.src = response[i].img;
                        h2.appendChild(img);
                        i++
                    }
                    else{
                        i++
                    }
                }
                
            })
        })
    });
})

