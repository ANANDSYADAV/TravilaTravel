import getTravelInfo from "./newChat";

const chatbox = document.getElementById("chatbox") as HTMLElement;
const chatInput = document.getElementById("chatInput") as HTMLInputElement;
const sendMessageButton = document.getElementById(
  "sendMessage"
) as HTMLButtonElement;

// Send message function
async function sendMessage(): Promise<void> {
  const userMessage: string = chatInput.value.trim();
  if (userMessage === "") return;

  // Append user message
  appendMessage("You", userMessage);
  chatInput.value = "";

  try {
    const botReply: string =
      (await getTravelInfo(userMessage)) ||
      "Sorry, I couldn't understand that.";

    // Append AI response
    appendMessage("Travila", botReply);
  } catch (error) {
    appendMessage("Travila", "Error connecting to AI. Please try again!");
    console.error("Error:", error);
  }
}

// Append messages to chatbox (Sanitizing Markdown)
function appendMessage(sender: string, message: string): void {
  let msgStyle: string = "";
  if (sender === "You") msgStyle = "bg-blue-100 rounded-md px-2 py-1";
  else msgStyle = "bg-red-100 rounded-md px-2 py-1";
  const formattedMessage: string = message;
  const messageElement = document.createElement("p");
  messageElement.setAttribute("class", msgStyle);
  messageElement.innerHTML = `<strong>${sender}:</strong> ${formattedMessage}`;
  messageElement.classList.add("text-sm", "text-gray-700", "mt-2");
  chatbox.appendChild(messageElement);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Send message on button click
sendMessageButton.addEventListener("click", () => {
  console.log("key clicked");
  sendMessage();
});

// Send message on Enter key
chatInput.addEventListener("keypress", (event) => {
  console.log("enter pressed");
  if (event.key === "Enter") sendMessage();
});
