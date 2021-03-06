const OFFSET = 100
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    if(rect.top >= -2*OFFSET && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 3*OFFSET)
        return true;
    else 
        return false;
}

function redirectFishSelection() {
    sessionStorage.setItem("animalType", "fish");
    window.location.href = "/fish-category";
}

function redirectInvertebrateSelection() {
    sessionStorage.setItem("animalType", "invertebrate");
    window.location.href = "/fish-category";
}

function redirectPlants() {
    window.location.href = "/plants-category";
}

sessionStorage.setItem("member", "");
sessionStorage.setItem("plants", false);
let opacityVals = new Array(4);
opacityVals[0] = 0.0;
opacityVals[1] = 0.0;
opacityVals[2] = 0.0;
opacityVals[3] = 0.0;

window.setInterval(function () {
    let elements = document.getElementsByClassName("row");
    for(let i=1; i<elements.length; i++) {
        if(isInViewport(elements[i])) {
            opacityVals[i] += 0.01;
            if(opacityVals[i] > 1.0) opacityVals[i] = 1.0;
        } else {
            opacityVals[i] -= 0.01;
            if(opacityVals[i] < 0.1) opacityVals[i] = 0.1;
        }
        elements[i].style.opacity = opacityVals[i];
    }
}, 10);

async function signIn() {
    let email = document.getElementById("email-input").value;
    let pw = document.getElementById("pw-input").value;
    let body = JSON.stringify({
        email: email,
        pw: pw,
    });
    let response = await fetch("http://localhost:3000/signIn", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: body
    });
    let result = await response.json();
    if(result == {}) {
        // Show error pop up
    } else {
        sessionStorage.setItem("member", JSON.stringify(result));
        window.location.href = "/customer-home";
    }
}