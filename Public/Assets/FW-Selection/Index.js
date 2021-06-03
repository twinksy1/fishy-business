var inventory = [];
function redirectFishSelection() {
    sessionStorage.setItem("animalType", "fish");
    sessionStorage.setItem("plants", false);
    window.location.href = "/fish-category/";
}

function redirectInvertebrateSelection() {
    sessionStorage.setItem("animalType", "invertebrate");
    sessionStorage.setItem("plants", false);
    window.location.href = "/fish-category";
}

function redirectPlants() {
    sessionStorage.setItem("plants", true);
    window.location.href = "/plants-category";
}
let member = sessionStorage.getItem("member");
if(member == undefined) {
    window.location.href = "/";
} else {
    sessionStorage.setItem("member", member);
}
function redirectHome() {
    if(member == "") {
        window.location.href = "/";
    } else {
        window.location.href = "/customer-home";
    }
}

let animalType = sessionStorage.getItem("animalType");
let isPlants = sessionStorage.getItem("plants");

if(animalType == "fish" && isPlants != "true") {
    document.getElementById("fish-btn").textContent = "Invertebrates";
    document.getElementById("fish-btn").setAttribute("onclick", "redirectInvertebrateSelection();")
} else if(isPlants == "true") {
    document.getElementById("plants-btn").textContent = "Invertebrates";
    document.getElementById("plants-btn").setAttribute("onclick", "redirectInvertebrateSelection();")
}

async function getFreshwaterFish() {
    let response = await fetch("http://localhost:3000/freshwaterFish", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({})
    });
    return response.json();
}

async function getFreshwaterInvertebrates() {
    let response = await fetch("http://localhost:3000/freshwaterInvertebrates", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({})
    });
    return response.json();
}

async function getFreshwaterPlants() {
    let response = await fetch("http://localhost:3000/freshwaterPlants", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({})
    });
    return response.json();
}

async function fetchInfo() {
    let checkboxes = document.getElementsByClassName("checkbox");
    let labels = document.getElementsByClassName("label");
    if(isPlants == "true") {
        for(let i=0; i<checkboxes.length; i++) {
            switch(i) {
                case 0:
                    labels[i].textContent = "Java Ferns";
                    checkboxes[i].value = "java Fern";
                    break;
                case 1:
                    labels[i].textContent = "Moss Balls";
                    checkboxes[i].value = "moss Ball";
                    break;
                case 2:
                    labels[i].textContent = "Other";
                    checkboxes[i].value = "other";
                    break;
            }
        }
        return await getFreshwaterPlants();
    } else if(animalType == "fish") {
        for(let i=0; i<checkboxes.length; i++) {
            switch(i) {
                case 0:
                    labels[i].textContent = "Mollies";
                    checkboxes[i].value = "molly";
                    break;
                case 1:
                    labels[i].textContent = "Platys";
                    checkboxes[i].value = "platy";
                    break;
                case 2:
                    labels[i].textContent = "Guppies";
                    checkboxes[i].value = "guppy";
                    break;
            }
        }
        return await getFreshwaterFish();
    } else {
        for(let i=0; i<checkboxes.length; i++) {
            switch(i) {
                case 0:
                    labels[i].textContent = "Shrimps";
                    checkboxes[i].value = "shrimp";
                    break;
                case 1:
                    labels[i].textContent = "Snails";
                    checkboxes[i].value = "snail";
                    break;
                case 2:
                    labels[i].textContent = "Crabs";
                    checkboxes[i].value = "crab";
                    break;
            }
        }
        return await getFreshwaterInvertebrates();
    }
}

function getPictureLocation(name) {
    return "/Images/fish/" + name.replace(/\s+/g, '-').toLowerCase() + ".jpg";
}

// sessionStorage.setItem("cart", "");

function buildDisplay(merchandise) {
    let i = 0;
    let j = 0;
    let results = document.getElementById("results");
    let storedCart = sessionStorage.getItem("cart");
    if(storedCart != null && storedCart != "") {
        storedCart = JSON.parse(storedCart);
        for(let k=0; k<storedCart.length; k++) {
            let checkoutBtn = document.getElementById("checkout-btn");
            checkoutBtn.disabled = false;
            let fish = storedCart[k].name;
            let fishID = storedCart[k].id;
            let fishAmount = storedCart[k].amount;

            let cartItem = document.getElementById(fish + "-cart-amount");
            if(cartItem === null) {
                let cartEntry = document.createElement("div");
                cartEntry.id = fish + "-cart-item";
                cartEntry.className = "cart-entry-container";

                let remBtn = document.createElement("button");
                remBtn.type = "button";
                remBtn.id = fish + "-rem-btn";
                remBtn.className = "rem-btn";
                remBtn.innerText = "Remove -";
                remBtn.onclick = function() {
                    let itemAmount = document.getElementById(fish + "-cart-amount");
                    itemAmount.innerText = parseInt(itemAmount.innerText) - 1;
                    if(itemAmount.innerText === "0") {
                        let cartEntry = document.getElementById(fish + "-cart-item");
                        cartEntry.remove();
                        this.remove();
                        let l = 0;
                        for(l; l<storedCart.length; l++) {
                            if(storedCart[l].id == fishID) {
                                break;
                            }
                        }
                        storedCart.splice(l, 1);
                        sessionStorage.setItem("cart", JSON.stringify(storedCart));
                    }

                    if(storedCart.length == 0) {
                        document.getElementById("checkout-btn").disabled = true;
                    }

                    let fishAmount = document.getElementById(fish + "-amount");
                    if(fishAmount != null) {
                        fishAmount.innerText = parseInt(fishAmount.innerText) + 1;
                        if(fishAmount.innerText === "1") {
                            let addBtn = document.getElementById(this.id.slice(0, this.id.length - 8) + "-btn");
                            addBtn.style.backgroundColor = "greenyellow";
                            addBtn.disabled = false;
                        }    
                    }
                    
                    inventory[parseInt(fish.slice(fish.length-1))].amount++;
                }

                let itemAmount = document.createElement("label");
                itemAmount.id = fish + "-cart-amount";
                itemAmount.className = "cart-entry-amount";
                itemAmount.innerText = 1;

                let itemName = document.createElement("p");
                itemName.className = "cart-entry-name";
                itemName.innerText = fish.split("-").join(" ").slice(0, fish.length-1);

                let container = document.createElement("div");
                container.appendChild(remBtn);
                container.appendChild(itemAmount);
                container.appendChild(itemName);

                cartEntry.appendChild(container);
                cartEntry.appendChild(document.createElement("hr"));

                let cart = document.getElementById("cart");
                cart.appendChild(cartEntry);
            }
        }
    }
    results.innerHTML = '';
    let amountPerRow = 3;
    let rowObj;
    while(i < merchandise.length) {
        j = 0;
        while(inventory[j] != merchandise[i]) {
            j++;
        }
        let name = merchandise[i].commonname;
        if(i % amountPerRow == 0) {
            results.appendChild(document.createElement("br"));
            rowObj = document.createElement("div");
            rowObj.className = "row";
            results.appendChild(rowObj);
        }
        let col = document.createElement("div");
        col.className = "col-4";
        let result = document.createElement("div");
        result.className = "card";
        result.id = merchandise[i].commonname.replace(/\s+/g, '-') + j;
        let title = document.createElement("h5");
        title.className = "result-title";
        title.textContent = name;
        let img = document.createElement("img");
        img.id = merchandise[i].merchid;
        img.className = "card-img-top";
        img.src = getPictureLocation(name);
        result.appendChild(img);
        result.appendChild(title);

        let newRow = document.createElement("div");
        let col1 = document.createElement("div");
        let col2 = document.createElement("div");
        newRow.className = "row";
        newRow.id = "details-row";
        col1.className = "col-6";
        col1.id = "details-row";
        col2.className = "col-6";
        col2.id = "details-row";
        let label = document.createElement("p");
        label.className = "label";
        label.innerText = "Species:";
        let text = document.createElement("p");
        text.className = "words";
        text.innerText = merchandise[i].species;
        col1.appendChild(label);
        col1.appendChild(text);
        newRow.appendChild(col1);

        label = document.createElement("p");
        label.className = "label";
        label.innerText = "Genus:";
        text = document.createElement("p");
        text.className = "words";
        text.innerText = merchandise[i].genus;
        col2.appendChild(label);
        col2.appendChild(text);
        newRow.appendChild(col1);
        newRow.appendChild(col2);
        result.appendChild(newRow);

        newRow = document.createElement("div");
        col1 = document.createElement("div");
        col2 = document.createElement("div");
        newRow.className = "row";
        newRow.id = "details-row";
        col1.className = "col-6";
        col1.id = "details-row";
        col2.className = "col-6";
        col2.id = "details-row";
        label = document.createElement("p");
        label.className = "label";
        label.innerText = "PH Range:";
        text = document.createElement("p");
        text.className = "words";
        text.innerText = merchandise[i].phrange;
        col1.appendChild(label);
        col1.appendChild(text);

        label = document.createElement("p");
        label.className = "label";
        label.innerText = "Price:";
        text = document.createElement("p");
        text.className = "words";
        text.innerText = "$" + merchandise[i].price;
        col2.appendChild(label);
        col2.appendChild(text);
        newRow.appendChild(col1);
        newRow.appendChild(col2);
        result.appendChild(newRow);

        newRow = document.createElement("div");
        col1 = document.createElement("div");
        col2 = document.createElement("div");
        newRow.className = "row";
        newRow.id = "details-row";
        col1.className = "col-6";
        col1.id = "details-row";
        col2.className = "col-6";
        col2.id = "details-row";
        label = document.createElement("p");
        label.className = "label";
        label.innerText = "In-Stock:";
        text = document.createElement("p");
        text.className = "words";
        text.id = merchandise[i].commonname.replace(/\s+/g, '-') + j + "-amount";
        let amountAfterCart = merchandise[i].amount;
        if(storedCart != null && storedCart != "") {
            for(let k=0; k<storedCart.length; k++) {
                if(storedCart[k].id == merchandise[i].merchid) {
                    amountAfterCart = parseInt(amountAfterCart) - parseInt(storedCart[k].id);
                    if(amountAfterCart < 0) {
                        amountAfterCart = 0;
                    }
                    break;
                }
            }
            text.innerText = amountAfterCart;
        } else {
            text.innerText = amountAfterCart;
        }
        col1.appendChild(label);
        col1.appendChild(text);

        let addBtn = document.createElement("button");
        addBtn.type = "button";
        addBtn.id = merchandise[i].commonname.replace(/\s+/g, '-') + j + "-btn";
        addBtn.className = "add-btn";
        addBtn.textContent = "Add to Cart +";
        if(amountAfterCart === 0) {
            addBtn.style.backgroundColor = "whitesmoke";
            addBtn.disabled = "disabled";
        }
        addBtn.addEventListener("click", function() {
            let checkoutBtn = document.getElementById("checkout-btn");
            checkoutBtn.disabled = false;
            let fish = this.parentElement.parentElement.parentElement.id;
            let fishID = this.parentElement.parentElement.parentElement.firstChild.id;
            let fishAmount = document.getElementById(fish + "-amount");
            fishAmount.innerText = parseInt(fishAmount.innerText) - 1;
            inventory[parseInt(fish.slice(fish.length-1))].amount--;
            if(parseInt(fishAmount.innerText) === 0) {
                addBtn.style.backgroundColor = "whitesmoke";
                this.disabled = "disabled";
            }

            let cartItem = document.getElementById(fish + "-cart-amount");
            if(cartItem === null) {
                let cartEntry = document.createElement("div");
                cartEntry.id = fish + "-cart-item";
                cartEntry.className = "cart-entry-container";

                let remBtn = document.createElement("button");
                remBtn.type = "button";
                remBtn.id = fish + "-rem-btn";
                remBtn.className = "rem-btn";
                remBtn.innerText = "Remove -";
                remBtn.onclick = function() {
                    let itemAmount = document.getElementById(fish + "-cart-amount");
                    itemAmount.innerText = parseInt(itemAmount.innerText) - 1;
                    if(itemAmount.innerText === "0") {
                        let cartEntry = document.getElementById(fish + "-cart-item");
                        cartEntry.remove();
                        this.remove();
                        let k = 0;
                        for(k; k<storedCart.length; k++) {
                            if(storedCart[k].id == fishID) {
                                break;
                            }
                        }
                        storedCart.splice(k, 1);
                        sessionStorage.setItem("cart", JSON.stringify(storedCart));
                    }

                    if(storedCart.length == 0) {
                        document.getElementById("checkout-btn").disabled = true;
                    }

                    let fishAmount = document.getElementById(fish + "-amount");
                    if(fishAmount != null) {
                        fishAmount.innerText = parseInt(fishAmount.innerText) + 1;
                        if(fishAmount.innerText === "1") {
                            let addBtn = document.getElementById(this.id.slice(0, this.id.length - 8) + "-btn");
                            addBtn.style.backgroundColor = "greenyellow";
                            addBtn.disabled = false;
                        }    
                    }
                    
                    inventory[parseInt(fish.slice(fish.length-1))].amount++;
                }

                let itemAmount = document.createElement("label");
                itemAmount.id = fish + "-cart-amount";
                itemAmount.className = "cart-entry-amount";
                itemAmount.innerText = 1;

                let itemName = document.createElement("p");
                itemName.className = "cart-entry-name";
                itemName.innerText = fish.split("-").join(" ").slice(0, fish.length-1);

                let container = document.createElement("div");
                container.appendChild(remBtn);
                container.appendChild(itemAmount);
                container.appendChild(itemName);

                cartEntry.appendChild(container);
                cartEntry.appendChild(document.createElement("hr"));

                let cart = document.getElementById("cart");
                cart.appendChild(cartEntry);

                
                let storedCart = sessionStorage.getItem("cart");
                if(storedCart == null || storedCart == "") {
                    let cart = [];
                    let item = {
                        name: fish,
                        id: fishID,
                        amount: 1
                    }
                    cart.push(item);
                    sessionStorage.setItem("cart", JSON.stringify(cart));
                } else {
                    storedCart = JSON.parse(storedCart);
                    let found = false;
                    for(let i=0; i<storedCart.length; i++) {
                        if(storedCart[i].id == fishID) {
                            storedCart[i].amount++;
                            found = true;
                        }
                    }
                    if(!found) {
                        let item = {
                            name: fish,
                            id: fishID,
                            amount: 1
                        }
                        storedCart.push(item);
                    }
                    sessionStorage.setItem("cart", JSON.stringify(storedCart));
                    console.log(storedCart);
                }
                
            } else {
                cartItem.innerText = parseInt(cartItem.innerText) + 1;
                let storedCart = sessionStorage.getItem("cart");
                if(storedCart != null) {
                    storedCart = JSON.parse(storedCart);
                    for(let i=0; i<storedCart.length; i++) {
                        if(storedCart[i].id == fishID) {
                            storedCart[i].amount++;
                            break;
                        }
                    }
                }
                sessionStorage.setItem("cart", JSON.stringify(storedCart));
            }
        });
        col2.appendChild(addBtn);

        newRow.appendChild(col1);
        newRow.appendChild(col2);
        result.appendChild(newRow);

        result.appendChild(document.createElement("hr"));

        newRow = document.createElement("div");
        newRow.className = "row";
        newRow.id = "details-row";
        text = document.createElement("p");
        text.className = "description";
        text.innerText = merchandise[i].description;
        newRow.appendChild(text);
        result.appendChild(newRow);
        
        col.appendChild(result);
        rowObj.appendChild(col);

        i++;
    }
}

async function search() {
    let searchTerm = document.getElementById("searchbar").value.toLowerCase();
    let search = [];
    let checkboxes = document.getElementsByClassName("checkbox");
    let checked = [];
    for(let i=0; i<checkboxes.length; i++) {
        if(checkboxes[i].checked) {
            checked.push(checkboxes[i]);
        }
    }

    if(checked.length < 1) {
        for(let i=0; i<inventory.length; i++) {
            let name = inventory[i].commonname.toLowerCase();
            if(name.includes(searchTerm)) {
                search.push(inventory[i]);
            }
        }
    } else {
        for(let i=0; i<checked.length; i++) {
            let value = checked[i].value;
            for(let j=0; j<inventory.length; j++) {
                let name = inventory[j].commonname.toLowerCase();
                if(name.includes(value) && name.includes(searchTerm)) {
                    console.log("Pushing " + name);
                    search.push(inventory[j]);
                }
            }
        }
    }
    await buildDisplay(search);
}

async function setup() {
    inventory = await fetchInfo();
    await buildDisplay(inventory);
}

document.addEventListener("keydown", function(event) {
    search();
}, false);

document.addEventListener("keyup", function(event) {
    search();
}, false);

setup();