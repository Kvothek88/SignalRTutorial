// Get button elements
let lbl_houseJoined = document.getElementById("lbl_houseJoined");

let btn_un_gryffindor = document.getElementById("btn_un_gryffindor");
let btn_un_slytherin = document.getElementById("btn_un_slytherin");
let btn_un_hufflepuff = document.getElementById("btn_un_hufflepuff");
let btn_un_ravenclaw = document.getElementById("btn_un_ravenclaw");
let btn_gryffindor = document.getElementById("btn_gryffindor");
let btn_slytherin = document.getElementById("btn_slytherin");
let btn_hufflepuff = document.getElementById("btn_hufflepuff");
let btn_ravenclaw = document.getElementById("btn_ravenclaw");

let trigger_gryffindor = document.getElementById("trigger_gryffindor");
let trigger_slytherin = document.getElementById("trigger_slytherin");
let trigger_hufflepuff = document.getElementById("trigger_hufflepuff");
let trigger_ravenclaw = document.getElementById("trigger_ravenclaw");


// create connection
var connectionHouseGroups = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/houseGroup").build();


// Add Subscribe & Unsubscribe events to relevant Buttons
function addSubscribeEvent (button) {
    button.addEventListener("click", function (event) {
        const houseName = event.target.textContent.trim();
        connectionHouseGroups.send("JoinHouse", houseName);
        event.preventDefault();
    })
}
function addUnSubscribeEvent(button) {
    button.addEventListener("click", function (event) {
        const houseName = event.target.textContent.trim();
        connectionHouseGroups.send("LeaveHouse", houseName);
        event.preventDefault();
    })
}
function addTriggerHouseNitificationEvent(button) {
    button.addEventListener("click", function (event) {
        const houseName = event.target.textContent.trim();
        connectionHouseGroups.send("TriggerHouseNotification", houseName);
        event.preventDefault();
    })
}
addSubscribeEvent(btn_gryffindor);
addSubscribeEvent(btn_slytherin);
addSubscribeEvent(btn_hufflepuff);
addSubscribeEvent(btn_ravenclaw);
addUnSubscribeEvent(btn_un_gryffindor);
addUnSubscribeEvent(btn_un_slytherin);
addUnSubscribeEvent(btn_un_hufflepuff);
addUnSubscribeEvent(btn_un_ravenclaw);
addTriggerHouseNitificationEvent(trigger_gryffindor);
addTriggerHouseNitificationEvent(trigger_slytherin);
addTriggerHouseNitificationEvent(trigger_hufflepuff);
addTriggerHouseNitificationEvent(trigger_ravenclaw);



// Change visibility of buttons depending on subscription
function ButtonDisplayChangeAtSubscription(button_s, button_un, hasSubscrined) {
    if (hasSubscrined) {
        button_s.style.display = "none";
        button_un.style.display = "";
    }
    else {
        button_s.style.display = "";
        button_un.style.display = "none";
    }
}
function ButtonSubscriptionMessage(hasSubscribed, houseName) {
    if (hasSubscribed)
        toastr.success(`You have subscribed successfully to ${houseName}`)
    else
        toastr.success(`You have unsubscribed successfully to ${houseName}`) 
}

connectionHouseGroups.on("subscriptionStatus", (strGroupsJoined, houseName, hasSubscribed) => {
    lbl_houseJoined.innerText = strGroupsJoined;

    switch (houseName) {
        case 'gryffindor':
            ButtonDisplayChangeAtSubscription(btn_gryffindor, btn_un_gryffindor, hasSubscribed);
            break;
        case 'slytherin':
            ButtonDisplayChangeAtSubscription(btn_slytherin, btn_un_slytherin, hasSubscribed);
            break;
        case 'hufflepuff':
            ButtonDisplayChangeAtSubscription(btn_hufflepuff, btn_un_hufflepuff, hasSubscribed);
            break;
        case 'ravenclaw':
            ButtonDisplayChangeAtSubscription(btn_ravenclaw, btn_un_ravenclaw, hasSubscribed);
            break;
        default:
            break;
    }

    ButtonSubscriptionMessage(hasSubscribed, houseName);
})

connectionHouseGroups.on("triggerHouseNotification", (houseName) => {
    toastr.success(`A new notification for ${houseName} has been launched.`)
})

connectionHouseGroups.on("newMemberAddedToHouse", (houseName, hasSubscribed) => {
    if (hasSubscribed)
        toastr.success(`Member has subscribed to ${houseName}`);
    else
        toastr.warning(`Member has unsubscribed from ${houseName}`);
})


// start connection
function fullfilled() {
    console.log("Connection to House Groups Hub successful");
}

function rejected() {
    // rejected logs
}

connectionHouseGroups.start().then(fullfilled, rejected)