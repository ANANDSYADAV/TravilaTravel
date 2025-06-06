import dotenv from "dotenv";
dotenv.config();

import {
  AddArticleDataInterface,
  testimonialsInterface,
  InspirationInterface,
  ActivitiesInterface,
  BubbleImagesInterface,
  BubbleInterface,
  PaymentImagesInterface,
  PaymentInterface,
  BottomBannerImageInterface,
  BottomBannerInterface,
} from "./allInterfaces";

import fetchApi from "./fetchAPI";

const hamburger = document.getElementById("hamburger") as HTMLElement;

hamburger.addEventListener("click", function () {
  const dropdownMenu = document.getElementById("dropdownMenu") as HTMLElement;
  dropdownMenu.classList.toggle("hidden");
});

function handleScrollToTop(): void {
  const scrollButton = document.getElementById("scrollButton") as HTMLElement;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollButton.classList.remove("hidden");
    } else {
      scrollButton.classList.add("hidden");
    }
  });

  scrollButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function handleChatBotToggle(): void {
  const chatbotWindow = document.getElementById("chatbotWindow") as HTMLElement;
  const chatInput = document.getElementById("chatInput") as HTMLElement;
  const chatbotButton = document.getElementById("chatbotButton") as HTMLElement;

  chatbotButton.addEventListener("click", function () {
    if (chatbotWindow.classList.contains("hidden")) {
      chatbotWindow.classList.remove("hidden");
      setTimeout(() => {
        chatbotWindow.classList.remove("opacity-0", "scale-90");
        chatbotWindow.classList.add("opacity-100", "scale-100");
      }, 10);
      chatInput.focus();
    }
  });

  const closeChatbot = document.getElementById("closeChatbot") as HTMLElement;
  closeChatbot.addEventListener("click", function () {
    chatbotWindow.classList.add("opacity-0", "scale-90");
    chatbotWindow.classList.remove("opacity-100", "scale-100");

    setTimeout(() => {
      chatbotWindow.classList.add("hidden");
    }, 300); // Matches transition duration
  });
}

handleScrollToTop();
handleChatBotToggle();

const addArticleData: AddArticleDataInterface = {
  images: {
    curve: "/images/activities/view-more/bottom.png",
    luggage: "/images/activities/view-more/luggage.png",
  },
  texts: {
    small: "Save your time!",
    large: "Explore, Book, Soar: Your Journey Awaits!",
  },
  button: {
    text: "View more",
    iconClass: "fa fa-arrow-right",
  },
};

const testimonialsContainer = document.getElementById(
  "testimonials-section"
) as HTMLElement;
const leftBtn = document.getElementById(
  "left-testimonial-btn"
) as HTMLButtonElement;
const rightBtn = document.getElementById(
  "right-testimonial-btn"
) as HTMLButtonElement;

let testimonials: testimonialsInterface[] = []; // To store fetched testimonials
let currentIndex: number = 0; // Keeps track of the visible testimonials' start index
const testimonialsPerPage: number = 2; // Number of testimonials to display at a time

// Fetch testimonials from API
async function fetchTestimonials(): Promise<void> {
  try {
    testimonials = await fetchApi("userTestimonial.json");
    renderTestimonials();
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
  }
}

// Render testimonials
function renderTestimonials() {
  // Clear the container
  testimonialsContainer.innerHTML = "";

  // Get the testimonials for the current page
  const visibleTestimonials: testimonialsInterface[] = testimonials.slice(
    currentIndex,
    currentIndex + testimonialsPerPage
  );

  // Generate the HTML for each testimonial
  visibleTestimonials.forEach((testimonial) => {
    const testimonialEl = document.createElement("article") as HTMLElement;
    testimonialEl.className =
      "ml-2 flex min-h-[25vh] w-[80%] transform flex-col gap-[2vh] rounded-[32px] border-[1px] border-[#E4E6E8] bg-white p-[5%] transition-transform duration-500 hover:scale-105 md:h-[80%] md:p-[2%]";

    let rating: string = "";
    let maxRating: number = 5;
    for (let i = 0; i < testimonial.rating; i++) rating += "⭐";
    for (let i = 0; i < maxRating - testimonial.rating; i++) rating += "☆";

    testimonialEl.innerHTML = `
    <div class="flex items-end justify-between">
                        <figure class="flex items-center gap-2">
        <img src="${testimonial.authorImage}" alt="${testimonial.alt}" class="h-16 w-16 rounded-full">
        <figcaption>
        <h3>${testimonial.userName}</h3>
        <p class="text-sm text-gray-600">${testimonial.location}</p>
        </figcaption>
        </figure>
        <div class="flex gap-1 text-[#FFC700]">
        <p> ${rating} </p>
        </div>
        </div>
        <div class="border-[1px] border-[#E4E6E8]"></div>
        <div class="text-gray-700">${testimonial.message}</div>
      `;

    testimonialsContainer.appendChild(testimonialEl);
  });

  // Update button states
  leftBtn.disabled = currentIndex === 0;
  rightBtn.disabled = currentIndex + testimonialsPerPage >= testimonials.length;
}

// Event listeners for navigation buttons
leftBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= testimonialsPerPage;
    renderTestimonials();
  }
});

rightBtn.addEventListener("click", () => {
  if (currentIndex + testimonialsPerPage < testimonials.length) {
    currentIndex += testimonialsPerPage;
    renderTestimonials();
  }
});

// Fetch and render testimonials on page load
fetchTestimonials();

// Get inspiration section
function renderInspirationArticles(
  sectionId: string,
  articleData: InspirationInterface[],
  startIndex: number = 0,
  count: number = 3
): void {
  const section = document.getElementById(sectionId) as HTMLElement;

  if (!section) {
    console.error(`No section found with id: ${sectionId}`);
    return;
  }

  // Slice the articles to render only the desired range
  const articles: InspirationInterface[] = articleData.slice(
    startIndex,
    startIndex + count
  );

  articles.forEach((article) => {
    // Create article element
    const articleEl = document.createElement("article") as HTMLElement;
    articleEl.className =
      "relative flex h-[500px] flex-shrink-0 transform flex-col items-center overflow-hidden rounded-[32px] border-[1px] border-[#E4E6E8] bg-white transition-transform duration-500 hover:scale-105 border-2 border-black";

    // Add inner HTML
    articleEl.innerHTML = `
          <!-- First div (figure container) -->
          <div class="relative z-10 h-[55%] w-full">
              <figure class="h-full">
                  <img src="${article.image}" alt="card-image${article.id}" class="h-full w-full object-cover" />
              </figure>
              <div class="absolute top-[22px] flex w-full justify-between px-7">
                  <div class="rounded-[50px] bg-white px-3 py-1 font-bold">${article.category}</div>
                  <div class="flex items-center justify-center rounded-full bg-[#FFFFFFD1] px-2 hover:bg-black hover:text-white cursor-pointer">
                      <i class="fa fa-heart-o" aria-hidden="true"></i>
                  </div>
              </div>
          </div>

          <!-- Second div (content container with rounded top corners) -->
          <div class="absolute bottom-[1rem] z-20 flex h-[50%] w-full flex-col justify-center rounded-[32px] bg-white px-8">
              <div class="my-2 flex gap-4 text-[16px]/[26px] text-gray-700">
                  <div>
                      <i class="fa fa-calendar" aria-hidden="true"></i>
                      <span class="text-black">${article.date}</span>
                  </div>
                  <div>
                      <i class="fa fa-clock-o" aria-hidden="true"></i>
                      <span class="text-black">${article.timeToRead}</span>
                  </div>
                  <div>
                      <i class="fa fa-commenting-o" aria-hidden="true"></i>
                      <span class="text-black">${article.comments}</span>
                  </div>
              </div>
              <div class="text-[24px]/[32px] font-extrabold">${article.title}</div>
              <div class="mt-4 flex items-center items-center justify-between">
                  <div class="flex gap-2 text-[24px]/[32px] font-extrabold">
                      <figure>
                          <img src="${article.author.image}" alt="author-image${article.id}" />
                      </figure>
                      <span class="text-[16px]/[26px] font-semibold">${article.author.name}</span>
                  </div>
                  <div class="cursor-pointer rounded-[50px] bg-[#E4E6E8] px-3 py-2 text-[14px]/[22px] font-bold hover:bg-gray-500">Keep Reading</div>
              </div>
          </div>
      `;

    // Append article to section
    section.appendChild(articleEl);
  });
}

const fetchInspiration: () => Promise<void> = async () => {
  try {
    const res: InspirationInterface[] = await fetchApi("inspiration.json");
    let renderedCount: number = 0;
    const articlesPerBatch: number = 3;

    // Initial render of first 3 articles
    renderInspirationArticles(
      "inspire-section",
      res,
      renderedCount,
      articlesPerBatch
    );

    // Add "Load More" button
    const loadMoreBtn = document.getElementById(
      "inspire-more-btn"
    ) as HTMLButtonElement;
    const section = document.getElementById("inspire-section") as HTMLElement;

    // Add click event listener for "Load More" button
    loadMoreBtn.addEventListener("click", () => {
      if (loadMoreBtn.textContent !== "Load Less") {
        loadMoreBtn.textContent = "Load Less";
        renderedCount += 3;
        renderInspirationArticles("inspire-section", res, 3, 6);
      } else if (section.childElementCount > 3) {
        loadMoreBtn.innerHTML = `Load More <i class="fa fa-arrow-right" aria-hidden="true"></i>`;
        for (let i = 0; i < 3; i++) {
          if (section.lastChild) {
            section.removeChild(section.lastChild);
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

fetchInspiration();

// Load Travel by activities

let currIndex: number = 0; // Keeps track of how many articles are displayed at a given time
const articlesPerLoad: number = 2; // Number of articles to load initially or on each click

const populateActivitiesSection: (
  arg: ActivitiesInterface[]
) => Promise<void> = async (data: ActivitiesInterface[]) => {
  const container = document.getElementById(
    "articles-container"
  ) as HTMLElement;
  container.innerHTML = "";

  // Render only the articles up to `currIndex`
  const articlesToShow = data.slice(0, currIndex);

  articlesToShow.forEach((item) => {
    // Create article
    const article = document.createElement("article");
    article.className =
      "relative flex h-[500px] w-full transform flex-col items-center overflow-hidden rounded-[32px] border-[1px] border-[#E4E6E8] bg-white transition-transform duration-500 hover:scale-105 border-2 border-black";

    // Create image container
    const imageDiv = document.createElement("div");
    imageDiv.className = "relative z-10 h-[55%] w-full";

    const figure = document.createElement("figure");
    figure.className = "aspect-[16/9] h-full w-full";

    const img = document.createElement("img");
    img.src = item.image.src;
    img.alt = item.image.alt;
    img.className = "h-full w-full object-cover";

    figure.appendChild(img);
    imageDiv.appendChild(figure);

    // Badge and heart icon
    const badgeContainer = document.createElement("div");
    badgeContainer.className =
      "absolute top-[22px] flex w-full justify-between px-7";

    const badge = document.createElement("div");
    badge.className = `rounded-[50px] bg-white px-3 py-1 font-bold ${item.badge.style}`;
    badge.textContent = item.badge.text;

    const iconContainer = document.createElement("div");
    iconContainer.className =
      "flex items-center justify-center rounded-full bg-[#FFFFFFD1] px-2 hover:bg-black hover:text-white cursor-pointer";

    const icon = document.createElement("i");
    icon.className = item.icon.class;

    iconContainer.appendChild(icon);
    badgeContainer.appendChild(badge);
    badgeContainer.appendChild(iconContainer);
    imageDiv.appendChild(badgeContainer);

    // Content section
    const contentDiv = document.createElement("div");
    contentDiv.className =
      "absolute bottom-[1rem] z-20 flex h-[50%] w-full flex-col justify-around rounded-[32px] bg-white px-5 py-2 sm:px-8";

    const title = document.createElement("div");
    title.className = "text-[24px]/[32px] font-extrabold";
    title.textContent = item.title;

    const activitiesGrid = document.createElement("div");
    activitiesGrid.className =
      "grid grid-cols-2 gap-3 text-[16px]/[26px] font-medium text-gray-700 sm:gap-7";

    item.activities.forEach((activity) => {
      const activityDiv = document.createElement("div");
      activityDiv.textContent = activity;
      activitiesGrid.appendChild(activityDiv);
    });

    contentDiv.appendChild(title);
    contentDiv.appendChild(activitiesGrid);

    // Extra info badge
    const extraInfoDiv = document.createElement("div");
    extraInfoDiv.className =
      "absolute right-[10%] top-[43%] z-50 rounded-[50px] border-[1px] border-[#E4E6E8] bg-white px-3 py-2 text-[14px]/[22px] font-bold text-gray-700";

    const extraIcon = document.createElement("i");
    extraIcon.className = item.extraInfo.iconClass;
    extraIcon.setAttribute("aria-hidden", "true");

    extraInfoDiv.appendChild(extraIcon);
    extraInfoDiv.append(` ${item.extraInfo.text}`);

    // Append all to article
    article.appendChild(imageDiv);
    article.appendChild(contentDiv);
    article.appendChild(extraInfoDiv);

    // Append article to container
    container.appendChild(article);
  });

  // Show/hide "Load More" button based on remaining data
  const loadMoreButton = document.getElementById(
    "load-more"
  ) as HTMLButtonElement;
  if (currIndex >= data.length) {
    loadMoreButton.classList.add("hidden");
  } else {
    loadMoreButton.classList.remove("hidden");
  }

  // Create Add Article
  const article = document.createElement("article");
  article.className =
    "relative flex h-[500px] flex-shrink-0 transform flex-col items-center overflow-hidden rounded-[32px] border-[1px] border-[#E4E6E8] bg-[#8CD8E9] transition-transform duration-500 hover:scale-105 border-2 border-black";

  // First div (figure container)
  const imageDiv = document.createElement("div");
  imageDiv.className = "z-0 h-full";

  const curveFigure = document.createElement("figure");
  curveFigure.className = "absolute bottom-0";

  const curveImg = document.createElement("img");
  curveImg.src = addArticleData.images.curve;
  curveImg.alt = "curve";
  curveImg.className = "object-cover";

  curveFigure.appendChild(curveImg);
  imageDiv.appendChild(curveFigure);

  const luggageFigure = document.createElement("figure");
  luggageFigure.className = "absolute bottom-[5%] left-[15%]";

  const luggageImg = document.createElement("img");
  luggageImg.src = addArticleData.images.luggage;
  luggageImg.alt = "luggage";
  luggageImg.className = "object-cover";

  luggageFigure.appendChild(luggageImg);
  imageDiv.appendChild(luggageFigure);

  // Second div (text and button container)
  const textDiv = document.createElement("div");
  textDiv.className = "absolute left-9 top-9 flex flex-col justify-start gap-4";

  const textContainer = document.createElement("div");

  const smallText = document.createElement("div");
  smallText.className = "text-[16px]/[26px] font-bold";
  smallText.textContent = addArticleData.texts.small;

  const largeText = document.createElement("div");
  largeText.className = "text-[24px]/[32px] font-extrabold";
  largeText.textContent = addArticleData.texts.large;

  textContainer.appendChild(smallText);
  textContainer.appendChild(largeText);
  textDiv.appendChild(textContainer);

  const buttonContainer = document.createElement("div");

  const button = document.createElement("button");
  button.setAttribute("aria-label", "View More");
  button.className =
    "rounded-[50px] bg-[#FEFA17] p-4 px-5 text-[16px]/[26px] font-bold hover:bg-gray-500";
  button.innerHTML = `${addArticleData.button.text} <i class="${addArticleData.button.iconClass}" aria-hidden="true"></i>`;

  buttonContainer.appendChild(button);
  textDiv.appendChild(buttonContainer);

  // Append children to article
  article.appendChild(imageDiv);
  article.appendChild(textDiv);

  // Append article to container
  container.appendChild(article);
};

const activitiesData: ActivitiesInterface[] = [];
const fetchActivities: (arg: string) => Promise<void> = async (
  ctgry: string
) => {
  try {
    let res: ActivitiesInterface[];
    if (activitiesData.length > 0) res = activitiesData;
    else res = await fetchApi("activities.json");
    const filteredActivities: ActivitiesInterface[] = res.filter(
      (activity) => activity.category === ctgry
    );

    // Set the initial number of articles to show
    currIndex = articlesPerLoad;

    // Populate the section
    populateActivitiesSection(filteredActivities);

    // Add event listener to "Load More" button
    const loadMoreButton = document.getElementById(
      "load-more"
    ) as HTMLButtonElement;
    loadMoreButton.addEventListener("click", () =>
      handleLoadMore(filteredActivities)
    );
  } catch (error) {
    console.log(error);
  }
};

// Handle "Load More" button click
const handleLoadMore = (data: ActivitiesInterface[]) => {
  currIndex += articlesPerLoad + 1; // Increment the index to show more articles
  populateActivitiesSection(data);
};

// default on page rendering
document.addEventListener("DOMContentLoaded", () => {
  fetchActivities("ruins");
});

const bubbleClicked = (paramText: string) => {
  const array: string[] = [
    "Explore Ruins",
    "Beach Snorkel",
    "City Cycling",
    "Mountain Trek",
    "Food Tour",
    "River Cruise",
    "Spa Retreat",
    "Road Trip",
  ];
  let index: number = array.indexOf(paramText);
  switch (index) {
    case 0:
      fetchActivities("ruins");
      break;
    case 1:
      fetchActivities("beach");
      break;
    case 2:
      fetchActivities("cycling");
      break;
    case 3:
      fetchActivities("trek");
      break;
    case 4:
      fetchActivities("food");
      break;
    case 5:
      fetchActivities("river");
      break;
    case 6:
      fetchActivities("spa");
      break;
    case 7:
      fetchActivities("road");
      break;
  }
};

// bubble section
const bubbles = document.getElementById("bubbles") as HTMLElement;
const bubbleOptions: () => Promise<BubbleImagesInterface[]> = async () => {
  try {
    const response: BubbleInterface = await fetchApi("bubble.json");
    return response.images;
  } catch (error) {
    console.log(error);
    return [];
  }
};
const addBubbleOptions: () => Promise<void> = async () => {
  const images: BubbleImagesInterface[] = await bubbleOptions();
  images.forEach((image) => {
    const figure = document.createElement("figure");
    figure.setAttribute(
      "class",
      "flex transform flex-col items-center gap-4 transition-transform duration-500 hover:scale-105 cursor-pointer"
    );
    const img = document.createElement("img");
    img.classList.add("size-[100px]");
    img.src = image.src;
    img.alt = image.alt;
    const figureCaption = document.createElement("figcaption");
    figureCaption.setAttribute("class", "text-[14px]/[22px] font-bold");
    figureCaption.textContent = image.caption;
    figure.appendChild(img);
    figure.appendChild(figureCaption);
    bubbles.appendChild(figure);

    // Add click event listener
    figure.addEventListener("click", () => {
      bubbleClicked(image.caption);
    });
  });
};
addBubbleOptions();

// Payment Options 2
const payment2 = document.getElementById("payment2") as HTMLElement;
const paymentOptions2: () => Promise<PaymentImagesInterface[]> = async () => {
  try {
    const response: PaymentInterface = await fetchApi("payment2.json");
    return response.images;
  } catch (error) {
    console.log(error);
    return [];
  }
};
const addPaymentOptions2: () => Promise<void> = async () => {
  const images: PaymentImagesInterface[] = await paymentOptions2();
  images.forEach((image) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.classList.add("h-[30px]", "w-[80px]");
    img.src = image.src;
    img.alt = image.alt;
    figure.appendChild(img);
    payment2.appendChild(figure);
  });
};
addPaymentOptions2();

// Bottom Banner
const bottomBanner = document.getElementById("bottom-banner") as HTMLElement;

const bottomBannerImages: () => Promise<
  BottomBannerImageInterface[]
> = async () => {
  try {
    const response: BottomBannerInterface = await fetchApi(
      "bottom-banner-img.json"
    );
    return response.images;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const addBottomBanner = async () => {
  const images: BottomBannerImageInterface[] = await bottomBannerImages();
  images.forEach((image) => {
    const figure = document.createElement("figure");
    figure.setAttribute(
      "class",
      "w-full transform transition-transform duration-500 hover:scale-110 hover:z-20"
    );
    const img = document.createElement("img");
    img.classList.add("w-full");
    img.src = image.src;
    img.alt = image.alt;
    figure.appendChild(img);
    bottomBanner.appendChild(figure);
  });
};

addBottomBanner();
