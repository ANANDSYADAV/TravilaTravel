import { fetchCardData } from './searchResult'
import type { formDataInterface } from '../allInterfaces'

const buttons = document.querySelectorAll('.filter-btn') as NodeListOf<HTMLButtonElement>;
const generalform = document.getElementById('generalForm') as HTMLFormElement;
const flightForm = document.getElementById('flightForm') as HTMLFormElement;
const activitiesForm = document.getElementById('activitiesForm') as HTMLFormElement;

let currentFilter: string = 'tours';

// Add event listeners to each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active state from all buttons
        buttons.forEach(btn => {
            btn.classList.remove('bg-black', 'text-white');
            btn.classList.add('text-black');
        });

        // Add active state to the clicked button
        button.classList.add('bg-black', 'text-white');
        button.classList.remove('text-black');

        const cardContainer = document.getElementById('search-result') as HTMLElement;
        cardContainer.innerHTML = '';

        currentFilter = button.id;

        const enum FormType {
            Tours = 'tours',
            Hotel = 'hotel',
            Rental = 'rental',
            Ticket = 'ticket',
        }

        switch (button.id as FormType) {
            case FormType.Tours:
            case FormType.Hotel:
            case FormType.Rental:
                generalform.classList.remove('hidden');
                flightForm.classList.add('hidden');
                activitiesForm.classList.add('hidden');
                break;

            case FormType.Ticket:
                generalform.classList.add('hidden');
                flightForm.classList.remove('hidden');
                activitiesForm.classList.add('hidden');
                break;

            default:
                console.log('Making form visible');
                generalform.classList.add('hidden');
                flightForm.classList.add('hidden');
                activitiesForm.classList.remove('hidden');
                break;
        }

        // Perform filtering logic here using button.id
        console.log(`Filter applied for: ${button.id}`);
    });
});

// Select date >= today
document.addEventListener("DOMContentLoaded", () => {
    const dateInput = document.querySelectorAll('input[type="date"]') as NodeListOf<HTMLInputElement>;

    // Get today's date in the format YYYY-MM-DD
    const today: Date = new Date();

    // Format the date as YYYY-MM-DD for the `min` attribute
    const yyyy: number = today.getFullYear();
    const mm: string = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const dd: string = String(today.getDate()).padStart(2, "0"); // Ensure two digits
    const minDate: string = `${yyyy}-${mm}-${dd}`;

    dateInput.forEach((input) => {
        input.setAttribute('min', minDate);
    })
});

const searchButtons = document.querySelectorAll('.searchButton') as NodeListOf<HTMLButtonElement>;

const submitForm = (e: Event): void => {
    e.preventDefault();
    // Get the parent form of the clicked button
    const form = (e.target as HTMLElement)?.closest('form') as HTMLFormElement;

    // Create an object to store the input values
    let formData = {} as formDataInterface;
    let isValid: boolean = true;

    formData['category'] = currentFilter;

    // Get all input/select fields inside the form
    const inputs = form.querySelectorAll('input, select') as NodeListOf<HTMLInputElement>;

    // Iterate over inputs to collect their names and values
    inputs.forEach((input) => {
        let key = input.name as keyof formDataInterface;

        if (input.name === 'location' || input.name === 'from' || input.name === 'to') {
            (formData as formDataInterface)[key] = input.value.trim();
        }

        if (!input.value.trim()) {
            isValid = false;
            input.classList.add("border-red-500"); // Highlight empty fields
        } else {
            input.classList.remove("border-red-500");
        }
    });

    // If any required field is empty, show an alert and stop submission
    if (!isValid) {
        alert("Please fill in all required fields.");
        return;
    }

    // If any required field is empty, show an alert and stop submission
    if (!isValid) {
        alert("Please fill in all required fields.");
        return;
    }

    console.log('Form Data:', formData);

    // Proceed with data fetch
    fetchCardData(formData);
}

searchButtons.forEach((button) => {
    button.addEventListener('click', submitForm);
});
