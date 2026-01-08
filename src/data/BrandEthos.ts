// brandEthos.api.ts (mock API response)

export const brandEthosResponse = {
  success: true,
  message: "Brand ethos data fetched successfully",
  data: {
    hero: {
      title: "Our Story",
      subtitle:
        "Begins with a simple idea: the belief that a stay can be more than just a temporary escape—it can be a journey of discovery, connection, and inspiration.",
      image: {
        url: "/stays.png",
        alt: "Kunjung resort at sunset",
      },
    },

    introduction: {
      label: "KUNJUNG Family",
      title: "Kunjung is a provider of curated, artisan-crafted stays.",
      subtitle: "By combining architecture, cultural elements, and attentive hospitality",
      description:
        "Kunjung was created to be more than a place to stay—it’s a place to belong. Every visit is an opportunity to experience warmth, inspiration, and comfort in a space that feels like home. Through thoughtful design and genuine hospitality, we create meaningful moments that stay with you long after you leave.",
      corePrinciples: [
        "Warm",
        "Accessible",
        "Curated",
      ],
    },


    foundersStory: {
      title: "Founders' Story",
      content: {
        image: {
          url: "/founder.png",
          alt: "Founder of Kunjung",
        },
        description:
          "From the beginning of his career, Rosihan has believed that a home is more than just a place to live—it is a space that inspires and comforts. With an educational background from the Bandung Institute of Technology (ITB) and international experience, he spent over a decade building Periwaland, a real estate brand known for its aesthetic design, meticulous attention to detail, and the philosophy that every home is a crafted masterpiece.\n\nWith more than 30 years in hospitality management through his own villas, Rosihan founded Kunjung as a natural extension of his vision: to create curated stays that are not only beautiful but also warm, welcoming, and memorable. For him, every guest is part of a story, and every space is an invitation to feel at home.",
      },
    },

    vision: {
      title: "Our Vision",
      description:
        "Kunjung envisions itself as a villa and accommodations brand that delivers deep, unforgettable experiences through attentive personal service, inspiring spaces, and soul-stirring design.",
      image: {
        url: "/stays.png",
        alt: "Kunjung architecture vision",
      },
    },

    mission: {
      title: "Our Mission",
      description:
        "Kunjung’s mission is to provide thoughtfully tailored service for every guest, craft spaces that are visually and emotionally beautiful, and create meaningful, memorable moments. We prioritize warmth and individuality in every interaction, ensuring each guest feels welcomed and inspired.",
      image: {
        url: "/stays.png",
        alt: "Kunjung mission space",
      },
    },

    gallery: {
      type: "imageGrid",
      images: [
        {
          url: "/stays.png",
        },
        {
          url: "/stays.png",
        },
        {
          url: "/stays.png",
        },
        {
          url: "/stays.png",
        },
      ],
    },

    closingStatement: {
      label: "Attentive Services",
      text:
        "We’re here to make your stay comfortable with thoughtful service and genuine care. Whatever you need, we’re ready to assist.",
    },
  },
};
