var cloakSpan = document.getElementById("cloakCounter");
var stoneSpan = document.getElementById("stoneCounter");
var wandSpan = document.getElementById("wandCounter");

// create connection
var connectionDeathlyHallows = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/deathlyHallows").build();


// connect methods that hub invokes aka receive notifications from hub
connectionDeathlyHallows.on("updateDeathlyHallowsCount", (cloak,stone,wand) => {
    cloakSpan.innerText = cloak.toString();
    stoneSpan.innerText = stone.toString();
    wandSpan.innerText = wand.toString();
})


// invoke hub methods aka send notification to hub



// start connection
function fullfilled() {
    console.log("Connection to Deathly Hallows Hub successful");
    connectionDeathlyHallows.invoke("GetRaceStatus").then((raceCounter) => {
        cloakSpan.innerText = raceCounter.cloak.toString();
        stoneSpan.innerText = raceCounter.stone.toString();
        wandSpan.innerText = raceCounter.wand.toString();
    })
}

function rejected() {
    // rejected logs
}

connectionDeathlyHallows.start().then(fullfilled, rejected)