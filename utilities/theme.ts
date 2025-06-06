const lightIcon = document.querySelectorAll('.lighttheme') as NodeListOf<HTMLElement>;
const darkIcon = document.querySelectorAll('.darktheme') as NodeListOf<HTMLElement>;

let currentTheme: string = 'light';

// Header Section 1
const themeToggle = document.querySelectorAll('.themeToggle') as NodeListOf<HTMLElement>;
const headerSection1 = document.getElementById('headerSection1') as HTMLElement;
const lang = document.querySelectorAll('#lang') as NodeListOf<HTMLSelectElement>;
const curr = document.querySelectorAll('#curr') as NodeListOf<HTMLSelectElement>;
// Header Section 2
const headerSection2 = document.getElementById('headerSection2') as HTMLElement | null;
// Hero Section
const heroSection = document.getElementById('heroSection') as HTMLElement;
const discover = document.getElementById('discover') as HTMLElement;
// forms
const forms = document.querySelectorAll('.forms') as NodeListOf<HTMLFormElement>;
const filterOptions = document.querySelector('.filters') as HTMLButtonElement;

// search results
const searchResult = document.getElementById('search-result') as HTMLElement;
const main = document.getElementById('main') as HTMLElement;

// Partners section
const partners = document.getElementById('partners') as HTMLElement;

// activities section
const activitiesSection = document.getElementById('activitiesSection') as HTMLElement;
const articlesContainer = document.getElementById('articles-container') as HTMLElement;
const loadMoreActivitiesBtn = document.getElementById('loadMoreActivitiesBtn') as HTMLButtonElement;

// blank section
const blankSection = document.getElementById('blankSection') as HTMLElement;

// static section
const staticSection = document.getElementById('staticSection') as HTMLElement;

// testimonial section
const testimonialSection = document.getElementById('testimonialSection') as HTMLElement;

// inspire section
const inspireContainerSection = document.getElementById('inspireContainerSection') as HTMLElement;

// payment section 2
const payment2Section = document.getElementById('payment2Section') as HTMLElement;

// flight offers section
const flightOffersContainer = document.getElementById('flightOffersContainer') as HTMLElement;

// newsletter section
const newsletterSection = document.getElementById('newsletterSection') as HTMLElement;

// bottom banner
const bottomBanner = document.getElementById('bottom-banner') as HTMLElement;

// footer section
const footer = document.getElementById('footer') as HTMLElement;

// signup popup
const signupModalElement = document.getElementById('signupModal') as HTMLElement;
const messageModalElement = document.getElementById('messageModal') as HTMLElement;

// subscripe popup
const popup = document.getElementById('popup') as HTMLElement;

// chatbot window
const chatbotWindow = document.getElementById('chatbotWindow') as HTMLElement;

// mobile dropdown
const dropdownMenu = document.getElementById('dropdownMenu') as HTMLElement;
const mobileMenuHeader = document.getElementById('mobileMenuHeader') as HTMLElement;

document.addEventListener("DOMContentLoaded", function (): void {
    themeToggle.forEach((theme) => {
        theme.addEventListener("click", function () {
            // if (headerSection1.classList.contains("bg-[#FFF0EC]")) 
            if (currentTheme === 'light') {
                currentTheme = 'dark';
                // Switch to dark mode
                headerSection1.classList.remove("bg-[#FFF0EC]");
                headerSection1?.classList.add("bg-[#222222]", 'text-white');
                lang?.forEach((el) => el.classList.remove("bg-[#FFF0EC]"));
                lang?.forEach((el) => el.classList.add("bg-[#222222]"));
                curr?.forEach((el) => el.classList.remove("bg-[#FFF0EC]"));
                curr?.forEach((el) => el.classList.add("bg-[#222222]"));

                headerSection2?.classList.remove('bg-[#FFFFFF]');
                headerSection2?.classList.add('bg-[#222222]', 'text-white');
                headerSection2?.querySelectorAll('select').forEach((el) => (el as HTMLSelectElement).classList.add('bg-[#222222]'));

                heroSection?.classList.remove('from-[#E3F0FF]', 'via-[#E3F0FF]', 'via-[80%]');
                heroSection?.classList.add('bg-black', 'text-white');
                discover?.classList.remove('bg-[#FEFA17]', 'hover:bg-gray-500');
                discover?.classList.add('bg-gray-500', 'hover:bg-gray-400');

                filterOptions?.classList.add('inverted');
                forms?.forEach((el) => (el as HTMLFormElement).classList.add('invertForm'));

                searchResult?.classList.add('invertSearchResult');

                partners?.classList.add('invertPartnersSection');

                activitiesSection?.classList.add('invertActivitiesSection');
                articlesContainer?.classList.add('invertActivitiesSection');
                loadMoreActivitiesBtn?.classList.add('invertActivitiesSection');

                blankSection?.classList.add('invertBlankSection');

                staticSection?.classList.add('invertStaticSection');

                testimonialSection?.classList.add('invertTestimonialSection');

                inspireContainerSection?.classList.add('invertInspireContainerSection');

                payment2Section?.classList.add('invertPayment2Section');

                flightOffersContainer?.classList.add('invertFlightOffersContainer');

                newsletterSection?.classList.add('invertNewsletterSection');

                bottomBanner?.classList.add('invertBottomBanner');

                footer?.classList.add('invertFooter');

                signupModalElement?.classList.add('invertSignupModal');
                messageModalElement?.classList.add('invertMessageModal');

                chatbotWindow.classList.add('invertChatbotWindow');

                dropdownMenu.classList.add('invertDropdownMenu');

                mobileMenuHeader?.classList.add('invertMobileMenuHeader');

                // Change icon visibility
                lightIcon?.forEach((el) => {
                    (el as HTMLElement).classList.remove('hidden');
                })

                darkIcon?.forEach((el) => {
                    (el as HTMLElement).classList.add('hidden');
                });
            } else {
                currentTheme = 'light';
                // Switch to light mode
                headerSection1?.classList.remove("bg-[#222222]", 'text-white');
                headerSection1?.classList.add("bg-[#FFF0EC]");
                lang?.forEach((el) => el.classList.remove("bg-[#222222]"));
                lang?.forEach((el) => el.classList.add("bg-[#FFF0EC]"));
                curr?.forEach((el) => el.classList.remove("bg-[#222222]"));
                curr?.forEach((el) => el.classList.add("bg-[#FFF0EC]"));

                headerSection2?.classList.add('bg-[#FFFFFF]');
                headerSection2?.classList.remove('bg-[#222222]', 'text-white');
                headerSection2?.querySelectorAll('select').forEach((el) => (el as HTMLSelectElement).classList.remove('bg-[#222222]'));

                heroSection?.classList.add('from-[#E3F0FF]', 'via-[#E3F0FF]', 'via-[80%]');
                heroSection?.classList.remove('bg-black', 'text-white');
                discover?.classList.add('bg-[#FEFA17]', 'hover:bg-gray-500');
                discover?.classList.remove('bg-gray-500', 'hover:bg-gray-400');

                filterOptions?.classList.remove('inverted');
                forms?.forEach((el) => (el as HTMLFormElement).classList.remove('invertForm'));

                searchResult?.classList.remove('invertSearchResult');

                partners?.classList.remove('invertPartnersSection');

                activitiesSection?.classList.remove('invertActivitiesSection');
                articlesContainer?.classList.remove('invertActivitiesSection');
                loadMoreActivitiesBtn?.classList.remove('invertActivitiesSection');

                blankSection?.classList.remove('invertBlankSection');

                staticSection?.classList.remove('invertStaticSection');

                inspireContainerSection?.classList.remove('invertInspireContainerSection');

                payment2Section?.classList.remove('invertPayment2Section');

                flightOffersContainer?.classList.remove('invertFlightOffersContainer');

                newsletterSection?.classList.remove('invertNewsletterSection');

                bottomBanner?.classList.remove('invertBottomBanner');

                footer?.classList.remove('invertFooter');

                signupModalElement?.classList.remove('invertSignupModal');
                messageModalElement?.classList.remove('invertMessageModal');

                chatbotWindow?.classList.remove('invertChatbotWindow');

                dropdownMenu?.classList.remove('invertDropdownMenu');

                mobileMenuHeader?.classList.add('invertMobileMenuHeader');

                // Change icon visibility
                lightIcon?.forEach((el) => {
                    (el as HTMLElement).classList.toggle('hidden');
                });

                darkIcon?.forEach((el) => {
                    (el as HTMLElement).classList.toggle('hidden');
                });
            }
        })
    });
});