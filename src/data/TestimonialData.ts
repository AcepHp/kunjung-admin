export type Testimonial = {
    id: number;
    name: string;
    date: string;
    rating: number;
    content: string;
};

export type TestimonialSummary = {
    averageRating: number;
    totalReviews: number;
};

export const testimonialSummary: TestimonialSummary = {
    averageRating: 4.9,
    totalReviews: 876,
};

export const testimonialData: Testimonial[] = [
    {
        id: 1,
        name: 'Olivia Rodrigo',
        date: '16 Jul 2025',
        rating: 4.7,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique, nulla vitae posuere viverra, sapien justo cursus arcu, at porta elit nisi eget orci. Mauris ultrices, odio eget dapibus dictum, risus ex facilisis purus, a ullamcorper velit lacus in nulla. Curabitur...',
    },
    {
        id: 2,
        name: 'James Smith',
        date: '05 Aug 2025',
        rating: 4.5,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec nibh at orci tincidunt suscipit. Nullam vehicula, augue vitae elementum viverra, lorem nisi dapibus urna, non fermentum magna sem nec nisl. Suspendisse potenti. Pellentesque habitant...',
    },
    {
        id: 3,
        name: 'Ayu Lestari',
        date: '20 Aug 2025',
        rating: 5,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Nulla facilisi. Vestibulum condimentum, lacus ut fermentum accumsan, justo lectus pretium lectus, in luctus ligula nulla non purus. Morbi faucibus eu metus nec pellentesque...',
    },
        {
        id: 4,
        name: 'Budi Santoso',
        date: '02 Sep 2025',
        rating: 4.6,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo nec nulla placerat cursus. Sed sit amet sapien vel augue fermentum tincidunt...',
    },
    {
        id: 5,
        name: 'Siti Nurhaliza',
        date: '10 Sep 2025',
        rating: 4.8,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas...',
    },
    {
        id: 6,
        name: 'Rizky Ramadhan',
        date: '15 Sep 2025',
        rating: 4.9,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non lorem non nisl convallis vestibulum. Vivamus at orci sed erat consequat dictum...',
    },
    {
        id: 7,
        name: 'Dewi Anggraini',
        date: '18 Sep 2025',
        rating: 4.4,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget velit euismod, viverra lacus sed, sodales sapien. Integer ac neque id lorem...',
    },
    {
        id: 8,
        name: 'Fajar Nugroho',
        date: '22 Sep 2025',
        rating: 4.3,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at felis non metus bibendum facilisis. Nulla facilisi. Integer posuere...',
    },
    {
        id: 9,
        name: 'Maya Putri',
        date: '25 Sep 2025',
        rating: 5,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae...',
    },
    {
        id: 10,
        name: 'Ahmad Fauzi',
        date: '28 Sep 2025',
        rating: 4.6,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas efficitur, erat a luctus commodo, lacus magna posuere turpis...',
    },
    {
        id: 11,
        name: 'Kevin Tan',
        date: '01 Oct 2025',
        rating: 4.7,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam euismod, velit at scelerisque fermentum, augue sapien volutpat elit...',
    },
    {
        id: 12,
        name: 'Putri Wulandari',
        date: '04 Oct 2025',
        rating: 4.8,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in libero at ipsum porttitor finibus. Suspendisse potenti...',
    },
    {
        id: 13,
        name: 'Yoga Pratama',
        date: '07 Oct 2025',
        rating: 4.5,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed turpis nec lorem vestibulum varius at sed erat...',
    },
    {
        id: 14,
        name: 'Nabila Zahra',
        date: '10 Oct 2025',
        rating: 4.9,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi malesuada, magna a faucibus dictum, neque erat gravida magna...',
    },
    {
        id: 15,
        name: 'Dimas Arya',
        date: '12 Oct 2025',
        rating: 4.4,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut lacus vitae justo interdum tincidunt non sed nulla...',
    },

];
