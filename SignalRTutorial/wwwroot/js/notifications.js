let notificationCounter = document.getElementById("notificationCounter");
let messageList = document.getElementById("messageList");
let sendButton = document.getElementById("sendButton");
let input = document.getElementById("notificationInput");

// create connection
var connectionNotifications = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/notifications").build();

sendButton.addEventListener("click", function (event) {
    const message = input.value.trim();
    connectionNotifications.send("SendMessage", message);
    input.value = "";
    event.preventDefault();
})


// Receive from Hub
connectionNotifications.on("receiveMessages", (value) => {
    console.log(value);
    notificationCounter.textContent = `(${value.length})`;
    messageList.innerHTML = "";
    value.forEach(message => {
        const li = document.createElement("li");
        li.textContent = message;
        messageList.appendChild(li);
    })
})


// Send to Hub
function newWindowLoadedOnClient() {
    connectionNotifications.send("NewWindowLoaded");
}


// start connection
function fullfilled() {
    console.log("Connection to Notifications successful");
    newWindowLoadedOnClient();
}

function rejected() {
}

connectionNotifications.start().then(fullfilled, rejected)