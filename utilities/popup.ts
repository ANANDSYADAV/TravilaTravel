// JavaScript for form and popup logic
document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll(".subscribeForm") as NodeListOf<HTMLFormElement>;
    const popup = document.querySelector("#popup") as HTMLElement;
    const popupMessage = document.querySelector("#popupMessage") as HTMLElement;

    forms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = form.querySelector(".emailInput") as HTMLInputElement;
            const email: string = emailInput.value.trim();

            if (validateEmail(email)) {
                saveToLocalStorage(email);
                form.reset();
            } else {
                showPopup("Please enter a valid email address.", false);
            }
        });
    });

    function validateEmail(email: string): boolean {
        const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function showPopup(message: string, isSuccess: boolean): void {
        popupMessage.textContent = message;
        popup.classList.remove("hidden");
        popup.classList.toggle("bg-green-500", isSuccess);
        popup.classList.toggle("bg-red-500", !isSuccess);

        setTimeout(() => {
            popup.classList.add("hidden");
        }, 3000); // Hide popup after 3 seconds
    }

    // Save email to localStorage
    function saveToLocalStorage(email: string) {
        const storedEmails = localStorage.getItem("subscribedEmails");
        let emails: string[] = storedEmails ? JSON.parse(storedEmails) : [];
        if (!emails.includes(email)) {
            showPopup("Thank you for subscribing!", true);
            emails.push(email);
            localStorage.setItem("subscribedEmails", JSON.stringify(emails));
        } else {
            showPopup("Email already subscribed.", true);
        }
    }
});