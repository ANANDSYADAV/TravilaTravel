import fetchApi from "../fetchAPI";
import { cardDataCachedInterface } from '../allInterfaces'
import type { formDataInterface } from '../allInterfaces'

let cardDataCached: cardDataCachedInterface[] = [];
export async function fetchCardData(filterData: formDataInterface): Promise<void> {
    try {
        // Example API URL (Replace this with your actual API endpoint)
        if (cardDataCached.length === 0) cardDataCached = await fetchApi('search.json');
        console.log(cardDataCached);
        const cardData = cardDataCached.filter((data) => {
            if (filterData.category === data.category) {
                if ('location' in filterData) {
                    if (filterData?.location === data.location) {
                        return data;
                    }
                } else if ('from' in filterData) {
                    {
                        if (filterData?.from === data.location) {
                            return data;
                        }
                    }
                }
            }
        });

        // Select the container where cards will be appended
        const cardContainer = document.getElementById('search-result') as HTMLElement;
        cardContainer.innerHTML = '';

        // Dynamically create cards based on the data
        cardData.forEach((card) => {
            const article = document.createElement('article');
            article.className = "relative flex h-[500px] flex-shrink-0 transform flex-col overflow-hidden rounded-[32px] border-[1px] border-[#E4E6E8] bg-white transition-transform duration-500 hover:scale-105";

            article.innerHTML = `
                <div class="relative z-10 h-[55%]">
                    <figure class="h-full">
                        <img src="${card.image}" alt="${card.altText}" class="h-full w-full object-cover" />
                    </figure>
                    <div class="absolute top-[22px] flex w-full justify-between px-7">
                        <div class="rounded-[50px] bg-white px-3 py-1 font-bold text-red-700">${card.badge}</div>
                        <div class="flex items-center justify-center rounded-full bg-[#FFFFFFD1] px-2">
                            <i class="fa fa-heart-o" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>

                <div class="absolute bottom-[1rem] z-20 flex h-[50%] w-full flex-col justify-center rounded-[32px] bg-white px-8">
                    <div class="text-[24px]/[32px] font-extrabold">${card.title}</div>
                    <div class="my-2 flex gap-4 text-[16px]/[26px] text-gray-700">
                        <div>
                            <i class="fa fa-clock-o" aria-hidden="true"></i>
                            ${card.duration}
                        </div>
                        <div>
                            <i class="fa fa-user" aria-hidden="true"></i>
                            ${card.guests}
                        </div>
                    </div>
                    <div class="mt-4 flex w-full items-center justify-between">
                        <div class="text-[24px]/[32px] font-extrabold">${card.price} <span class="text-[16px]/[26px] font-medium text-gray-700">${card.pricePerPerson}</span></div>
                        <div class="cursor-pointer rounded-[50px] bg-[#E4E6E8] px-2 py-2 text-[14px]/[22px] font-bold hover:bg-gray-500 sm:px-3 sm:py-2">${card.buttonText}</div>
                    </div>
                </div>
                <div class="absolute right-[10%] top-[43%] z-50 rounded-[50px] border-[1px] border-[#E4E6E8] bg-white px-3 py-2 font-extrabold"><i class="fa fa-star text-[#FFC700]" aria-hidden="true"></i> ${card.rating} <span class="text-gray-700">(${card.reviews} reviews)</span></div>
            `;

            cardContainer.appendChild(article);
        });
    } catch (error) {
        console.error('Error fetching card data:', error);
    }
}