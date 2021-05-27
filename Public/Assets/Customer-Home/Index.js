let member = sessionStorage.getItem("member");
if(member == "") {
    window.location.href = "/";
} else {
    sessionStorage.setItem("member", member);
}

member = (JSON.parse(member))[0];

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
sessionStorage.setItem("plants", false);

function logout() {
    sessionStorage.setItem("member", "");
    window.location.href = "/";
}

window.onload = function() {
    document.getElementById("greeting").textContent = "Hi " + member.firstname;
}