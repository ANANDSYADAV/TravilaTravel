const becomeExpertBtn = document.querySelectorAll(
  ".becomeExpert"
) as NodeListOf<HTMLButtonElement>;
const signupModal = document.getElementById("signupModal") as HTMLElement;
const signupModalContent = signupModal.querySelector("div") as HTMLElement;
const closeSignup = document.getElementById("closeSignup") as HTMLButtonElement;
const signupBtn = document.getElementById("signupBtn") as HTMLButtonElement;

const messageModal = document.getElementById("messageModal") as HTMLElement;
const messageTitle = document.getElementById("messageTitle") as HTMLElement;
const messageText = document.getElementById("messageText") as HTMLElement;
const closeMessage = document.getElementById("closeMessage") as HTMLElement;
const messageModalContent = messageModal.querySelector("div") as HTMLElement;

// Function to show modal with smooth animation
function showModal(modal: HTMLElement, content: HTMLElement): void {
  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden"); // Prevent background scrolling
  setTimeout(() => {
    content.classList.replace("scale-95", "scale-100");
    content.classList.replace("opacity-0", "opacity-100");
  }, 10);
}

// Function to hide modal with smooth animation
function hideModal(modal: HTMLElement, content: HTMLElement): void {
  content.classList.replace("scale-100", "scale-95");
  content.classList.replace("opacity-100", "opacity-0");
  setTimeout(() => {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden"); // Allow scrolling again
  }, 300);
}

// Show Signup Modal
becomeExpertBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    showModal(signupModal, signupModalContent);
  });
});

// Close Signup Modal
closeSignup.addEventListener("click", (e: Event) => {
  e.preventDefault();
  hideModal(signupModal, signupModalContent);
});

// Validate Email Function
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Handle Signup Button Click
signupBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();

  const emailInput = document.getElementById("email") as HTMLInputElement;
  const email: string = emailInput.value;
  if (email.includes("@")) {
    showMessage(
      "Success!",
      "You have signed up successfully!",
      "text-green-600"
    );
  } else {
    showMessage("Error!", "Please enter a valid email!", "text-red-600");
  }
});

// Show Message Modal
function showMessage(title: string, text: string, colorClass: string): void {
  hideModal(signupModal, signupModalContent);
  setTimeout(() => {
    messageTitle.innerText = title;
    messageTitle.className = `text-xl font-bold mb-2 text-center ${colorClass}`;
    messageText.innerText = text;
    showModal(messageModal, messageModalContent);
  }, 300);
}

// Close Message Modal
closeMessage.addEventListener("click", () => {
  hideModal(messageModal, messageModalContent);
});
