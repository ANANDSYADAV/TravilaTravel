interface AddArticleDataInterface {
    images: {
        curve: string,
        luggage: string
    },
    texts: {
        small: string,
        large: string
    },
    button: {
        text: string,
        iconClass: string
    }
}


interface testimonialsInterface {
    userName: string,
    authorImage: string,
    alt: string,
    location: string,
    rating: number,
    message: string
}


interface InspirationInterface {
    id: number,
    category: string,
    image: string,
    date: string,
    timeToRead: string,
    comments: string,
    title: string,
    author: {
        name: string,
        image: string
    }
}


interface ActivitiesInterface {
    category: string,
    image: {
        src: string,
        alt: string
    },
    badge: {
        text: string,
        style: string
    },
    icon: {
        class: string,
        ariaHidden: boolean
    },
    title: string,
    activities: [],
    extraInfo: {
        text: string,
        iconClass: string
    }
}


interface BubbleImagesInterface {
    src: string,
    alt: string,
    caption: string
}
interface BubbleInterface {
    images: BubbleImagesInterface[],
}


interface PaymentImagesInterface {
    src: string;
    alt: string;
}
interface PaymentInterface {
    images: PaymentImagesInterface[],
}


interface BottomBannerImageInterface {
    src: string,
    alt: string
}
interface BottomBannerInterface {
    images: BottomBannerImageInterface[],
}


interface cardDataCachedInterface {
    image: string,
    altText: string,
    badge: string,
    title: string,
    duration: string,
    guests: string,
    price: string,
    pricePerPerson: string,
    buttonText: string,
    rating: number,
    reviews: number,
    location: string,
    category: string,
    id: number
}

interface BaseFormData {
    category: string;
}

interface formOneDataInterface extends BaseFormData {
    location: string;
}

interface formTwoDataInterface extends BaseFormData {
    from: string;
    to: string;
}

type formDataInterface = formOneDataInterface | formTwoDataInterface;

export { AddArticleDataInterface, testimonialsInterface, InspirationInterface, ActivitiesInterface, BubbleImagesInterface, BubbleInterface, PaymentImagesInterface, PaymentInterface, BottomBannerImageInterface, BottomBannerInterface, cardDataCachedInterface, formDataInterface };