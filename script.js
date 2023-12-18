// 
// Events Handling
// 

window.addEventListener('storage', (event) => {
    console.log(event);

    if (!event.key.startsWith("message-")) return;
    if (!event.newValue) return;
    createMessage("receiver", event.newValue, "Friend");

    window.localStorage.removeItem(event.key)
});


// 
// Messages
// 

const button = document.querySelector('.message-text button');
const text = document.querySelector('.message-text input');
const chats = document.querySelector('.chatbox .chats');

function sendMessage() {
    const message = text.value;
    if (!message) return;

    window.localStorage.setItem("message-" + Date.now(), message);
    createMessage("sender", message);

    text.value = "";
}

function createMessage(type = "sender", message = "", senderName = "") {
    const element = document.createElement("div");
    element.classList.add("message");
    element.classList.add(type);

    const sender = document.createElement("div");
    sender.classList.add("sender");
    sender.innerText = type === "sender" ? "You" : senderName;

    const content = document.createElement("div");
    content.classList.add("content");
    content.innerText = message;

    element.appendChild(sender);
    element.appendChild(content);

    chats.appendChild(element);
}

button.addEventListener('click', sendMessage);
text.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) sendMessage();
});

