// ===========================
// === Element references
// ===========================

const chatWindow = document.querySelector(".chat-window__messages");
const inputField = document.querySelector(".chat-window__textarea");
const sendButton = document.querySelector(".chat-window__send-btn");
const clearButton = document.querySelector(".chat-window__clear-btn");

// ===========================
// === Methods
// ===========================

/**
 * Create a message element with value inputted from the message
 * @param {*} message
 * @returns
 */

const createMessageElement = (message) => {
  // create message element container
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message");

  // create message content element
  const messageContent = document.createElement("div");
  messageContent.classList.add("chat-message__content");
  messageContent.appendChild(document.createTextNode(message));

  // create avatar element
  const avatarElement = document.createElement("i");
  avatarElement.classList.add("chat-message__avatar");
  avatarElement.classList.add("bi", "bi-person-circle");

  messageElement.appendChild(avatarElement);
  messageElement.appendChild(messageContent);
  return messageElement;
};

/**
 *
 * @param {*} messageElement
 */
const appendMessageElementToChatWindow = (messageElement) => {
  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

const handleSendMessage = () => {
  const message = inputField.value.trim();
  if (message) {
    const messageElement = createMessageElement(message);
    appendMessageElementToChatWindow(messageElement);
    inputField.value = "";
  }
};

// ===========================
// === Event listeners
// ===========================

sendButton.addEventListener("click", handleSendMessage);
clearButton.addEventListener("click", () => {
  chatWindow.innerHTML = "";
});

inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    e.stopPropagation();
    handleSendMessage();
  }
});
