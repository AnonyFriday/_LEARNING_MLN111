// ===========================
// === Element references
// ===========================

const chatWindow = document.querySelector(".chat-window__messages");
const inputField = document.querySelector(".chat-window__textarea");
const sendButton = document.querySelector(".chat-window__send-btn");
const clearButton = document.querySelector(".chat-window__clear-btn");
const responseWindow = document.querySelector(".response-window__content");

import { generateAnswerFromAI } from "./chatService.js";

// ===========================
// === Methods
// ===========================

/**
 * Create a message element with value inputted from the message
 * @param {*} message
 * @returns
 */
const createMessageElement = (message, isFromChat) => {
  // create message element container
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message");

  // create message content element
  const messageContent = document.createElement("div");
  messageContent.classList.add("chat-message__content");
  messageContent.innerHTML = message;

  // create avatar element
  const avatarElement = document.createElement("i");
  avatarElement.classList.add("chat-message__avatar");

  // Differencet chat avatar from user and AI
  if (isFromChat) {
    avatarElement.classList.add("bi", "bi-robot");
    avatarElement.classList.add("chat-message__avatar--right");
  } else {
    avatarElement.classList.add("bi", "bi-person-circle");
  }

  messageElement.appendChild(avatarElement);
  messageElement.appendChild(messageContent);
  return messageElement;
};

/**
 * Append message element to chat window
 * @param {*} messageElement
 */
const appendMessageElementToChatWindow = (messageElement) => {
  chatWindow.insertBefore(messageElement, chatWindow.firstChild);
  chatWindow.scrollTop = 0;
};

/**
 * Append response message element to response window
 * @param {*} messageElement
 */
const appendMessageElementToResponseWindow = (messageElement) => {
  responseWindow.insertBefore(messageElement, responseWindow.firstChild);
  responseWindow.scrollTop = 0;
};

/**
 * Highlight newest message
 * @param {*} messageElement
 */
const highlightNewestMessage = (messageElement) => {
  const previousHighlighteds = document.querySelectorAll(".chat-message--highlighted");
  previousHighlighteds.forEach((prevMessageEl) => {
    prevMessageEl.classList.remove("chat-message--highlighted");
  });

  messageElement.classList.add("chat-message--highlighted");
};
/**
 * Handle send message
 */

const handleSendMessage = async () => {
  const message = inputField.value.trim();

  // If having message
  if (message) {
    // Create message element and append to chat window
    const messageElement = createMessageElement(message, false);
    highlightNewestMessage(messageElement);
    appendMessageElementToChatWindow(messageElement);
    inputField.value = "";

    // create response message element and append to response window
    const aiMessage = await generateAnswerFromAI(message);
    const aiMessageElement = createMessageElement(aiMessage, true);
    highlightNewestMessage(aiMessageElement);
    appendMessageElementToResponseWindow(aiMessageElement);
  }
};

/**
 * Debounce function
 * @param {*} func
 * @param {*} wait
 * @returns
 */
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===========================
// === Event listeners
// ===========================

// Event for window load
window.addEventListener("load", () => {
  const initialMessage = createMessageElement("Hãy hỏi tôi về Triết học Mác-Lênin", true);
  appendMessageElementToResponseWindow(initialMessage);
});

// Event for send button and debounced handle send message
const debouncedHandleSendMessage = debounce(handleSendMessage, 300);
sendButton.addEventListener("click", debouncedHandleSendMessage);

// Event for clear button
clearButton.addEventListener("click", () => {
  chatWindow.innerHTML = "";
});

// Event for input field
inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    e.stopPropagation();
    debouncedHandleSendMessage();
  }
});
