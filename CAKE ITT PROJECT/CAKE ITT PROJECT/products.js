const products = [
  /* =========================
     Vendor A: Bbestedinles & More
  ========================= */

  {
    id: "bbestedinles-butter-cream-cakes",
    name: "Butter Cream Cakes",
    vendor: "Bbestedinles & More",
    image: "images/butter-cream.jpg",
    description: "Beautiful butter cream cakes from Bbestedinles & More, perfect for birthdays, celebrations, and special moments.",
    flavours: ["Vanilla", "Chocolate", "Red Velvet", "Strawberry", "Marble"],
    sizes: [
      { name: "6 inches", price: 15000 },
      { name: "8 inches", price: 25000 },
      { name: "10 inches", price: 35000 },
      { name: "12 inches", price: 50000 }
    ],
    extras: [
      { name: "Buttercream", price: 0 },
      { name: "Chocolate Drip", price: 3000 },
      { name: "Extra Design", price: 5000 }
    ],
    allowMessage: true
  },

  {
    id: "bbestedinles-whipped-cream-cakes",
    name: "Whipped Cream Cakes",
    vendor: "Bbestedinles & More",
    image: "images/whipped.jpg",
    description: "Soft and creamy whipped cream cakes from Bbestedinles & More, made for sweet and memorable occasions.",
    flavours: ["Vanilla", "Chocolate", "Red Velvet", "Strawberry", "Marble"],
    sizes: [
      { name: "6 inches", price: 17000 },
      { name: "8 inches", price: 27000 },
      { name: "10 inches", price: 37000 },
      { name: "12 inches", price: 52000 }
    ],
    extras: [
      { name: "Whipped Cream", price: 0 },
      { name: "Chocolate Drip", price: 3000 },
      { name: "Extra Design", price: 5000 }
    ],
    allowMessage: true
  },


  /* =========================
     Vendor B: Blessed Cakes and Events
  ========================= */

  {
    id: "blessed-butter-cream-cakes",
    name: "Butter Cream Cakes",
    vendor: "Blessed Cakes and Events",
    image: "images/butter-cream.jpg",
    description: "Custom butter cream cakes from Blessed Cakes and Events, suitable for birthdays, events, and celebrations.",
    flavours: ["Vanilla", "Chocolate", "Red Velvet", "Strawberry", "Marble"],
    sizes: [
      { name: "6 inches", price: 15000 },
      { name: "8 inches", price: 25000 },
      { name: "10 inches", price: 35000 },
      { name: "12 inches", price: 50000 }
    ],
    extras: [
      { name: "Buttercream", price: 0 },
      { name: "Chocolate Drip", price: 3000 },
      { name: "Extra Design", price: 5000 }
    ],
    allowMessage: true
  },

  {
    id: "blessed-whipped-cream-cakes",
    name: "Whipped Cream Cakes",
    vendor: "Blessed Cakes and Events",
    image: "images/whipped.jpg",
    description: "Creamy whipped cream cakes from Blessed Cakes and Events, made for clean designs and rich taste.",
    flavours: ["Vanilla", "Chocolate", "Red Velvet", "Strawberry", "Marble"],
    sizes: [
      { name: "6 inches", price: 17000 },
      { name: "8 inches", price: 27000 },
      { name: "10 inches", price: 37000 },
      { name: "12 inches", price: 52000 }
    ],
    extras: [
      { name: "Whipped Cream", price: 0 },
      { name: "Chocolate Drip", price: 3000 },
      { name: "Extra Design", price: 5000 }
    ],
    allowMessage: true
  },

  {
    id: "blessed-bento-cakes",
    name: "Bento Cakes",
    vendor: "Blessed Cakes and Events",
    image: "images/bento.webp",
    description: "Cute mini bento cakes from Blessed Cakes and Events, perfect for small surprises, birthdays, and gifts.",
    flavours: ["Vanilla", "Chocolate", "Red Velvet", "Strawberry"],
    sizes: [
      { name: "Small Bento", price: 7000 },
      { name: "Medium Bento", price: 10000 }
    ],
    extras: [
      { name: "Simple Design", price: 0 },
      { name: "Custom Message", price: 1000 },
      { name: "Extra Topping", price: 1500 }
    ],
    allowMessage: true
  },

  {
    id: "blessed-cake-loaves",
    name: "Cake Loaves",
    vendor: "Blessed Cakes and Events",
    image: "images/cake-loaves.jpg",
    description: "Simple, rich cake loaves from Blessed Cakes and Events, perfect for tea time, gifting, or casual cravings.",
    flavours: ["Vanilla", "Chocolate", "Banana", "Marble", "Lemon"],
    sizes: [
      { name: "Small Loaf", price: 5000 },
      { name: "Medium Loaf", price: 8000 },
      { name: "Large Loaf", price: 12000 }
    ],
    extras: [
      { name: "Plain", price: 0 },
      { name: "With Nuts", price: 1500 },
      { name: "Chocolate Chips", price: 1200 }
    ],
    allowMessage: false
  },

  {
    id: "blessed-cupcakes",
    name: "Cupcakes",
    vendor: "Blessed Cakes and Events",
    image: "images/cupcakes.jpg",
    description: "Soft and cute cupcakes from Blessed Cakes and Events, perfect for gifts, events, and cravings.",
    flavours: ["Vanilla", "Chocolate", "Red Velvet", "Strawberry"],
    sizes: [
      { name: "Box of 6", price: 6000 },
      { name: "Box of 12", price: 11000 },
      { name: "Box of 24", price: 21000 }
    ],
    extras: [
      { name: "Plain", price: 0 },
      { name: "Sprinkles", price: 1000 },
      { name: "Cream Topping", price: 1500 }
    ],
    allowMessage: false
  },

  {
    id: "blessed-parfait",
    name: "Parfait",
    vendor: "Blessed Cakes and Events",
    image: "images/parfait.jpg",
    description: "Creamy, fruity parfaits from Blessed Cakes and Events, made with yoghurt, granola, fruits, and toppings.",
    flavours: ["Mixed Fruit", "Strawberry", "Oreo", "Banana", "Apple"],
    sizes: [
      { name: "Small Cup", price: 3500 },
      { name: "Medium Cup", price: 5000 },
      { name: "Large Cup", price: 7000 }
    ],
    extras: [
      { name: "Standard Topping", price: 500 },
      { name: "Oreo Crumbs", price: 800 },
      { name: "Extra Fruits", price: 1000 },
      { name: "Honey", price: 500 }
    ],
    allowMessage: false
  },

  {
    id: "blessed-small-chops",
    name: "Small Chops",
    vendor: "Blessed Cakes and Events",
    image: "images/small-chops.jpg",
    description: "Party-ready small chops from Blessed Cakes and Events, perfect for birthdays, hangouts, meetings, and events.",
    flavours: [],
    sizes: [
      { name: "Small Pack", price: 5000 },
      { name: "Medium Pack", price: 10000 },
      { name: "Large Pack", price: 18000 },
      { name: "Party Tray", price: 35000 }
    ],
    extras: [
      { name: "Spring Rolls", price: 0 },
      { name: "Samosa", price: 0 },
      { name: "Puff Puff", price: 0 },
      { name: "Mixed Pack", price: 2000 }
    ],
    allowMessage: false
  },


  /* =========================
     Vendor C: Dara Kakes
  ========================= */

  {
    id: "dara-butter-cream-cakes",
    name: "Butter Cream Cakes",
    vendor: "Dara Kakes",
    image: "images/butter-cream.jpg",
    description: "Custom butter cream cakes from Dara Kakes, made for birthdays, celebrations, and sweet memories.",
    flavours: ["Vanilla", "Chocolate", "Red Velvet", "Strawberry", "Marble"],
    sizes: [
      { name: "6 inches", price: 15000 },
      { name: "8 inches", price: 25000 },
      { name: "10 inches", price: 35000 },
      { name: "12 inches", price: 50000 }
    ],
    extras: [
      { name: "Buttercream", price: 0 },
      { name: "Chocolate Drip", price: 3000 },
      { name: "Extra Design", price: 5000 }
    ],
    allowMessage: true
  },

  {
    id: "dara-whipped-cream-cakes",
    name: "Whipped Cream Cakes",
    vendor: "Dara Kakes",
    image: "images/whipped.jpg",
    description: "Smooth whipped cream cakes from Dara Kakes, perfect for simple, classy, and beautiful celebrations.",
    flavours: ["Vanilla", "Chocolate", "Red Velvet", "Strawberry", "Marble"],
    sizes: [
      { name: "6 inches", price: 17000 },
      { name: "8 inches", price: 27000 },
      { name: "10 inches", price: 37000 },
      { name: "12 inches", price: 52000 }
    ],
    extras: [
      { name: "Whipped Cream", price: 0 },
      { name: "Chocolate Drip", price: 3000 },
      { name: "Extra Design", price: 5000 }
    ],
    allowMessage: true
  },

  {
    id: "dara-bento-cakes",
    name: "Bento Cakes",
    vendor: "Dara Kakes",
    image: "images/bento.webp",
    description: "Mini bento cakes from Dara Kakes, perfect for gifts, small birthdays, and surprise packages.",
    flavours: ["Vanilla", "Chocolate", "Red Velvet", "Strawberry"],
    sizes: [
      { name: "Small Bento", price: 7000 },
      { name: "Medium Bento", price: 10000 }
    ],
    extras: [
      { name: "Simple Design", price: 0 },
      { name: "Custom Message", price: 1000 },
      { name: "Extra Topping", price: 1500 }
    ],
    allowMessage: true
  },

  {
    id: "dara-cupcakes",
    name: "Cupcakes",
    vendor: "Dara Kakes",
    image: "images/cupcakes.jpg",
    description: "Soft cupcakes from Dara Kakes, suitable for gifts, school events, birthdays, and cravings.",
    flavours: ["Vanilla", "Chocolate", "Red Velvet", "Strawberry"],
    sizes: [
      { name: "Box of 6", price: 6000 },
      { name: "Box of 12", price: 11000 },
      { name: "Box of 24", price: 21000 }
    ],
    extras: [
      { name: "Plain", price: 0 },
      { name: "Sprinkles", price: 1000 },
      { name: "Cream Topping", price: 1500 }
    ],
    allowMessage: false
  },

  {
    id: "dara-small-chops",
    name: "Small Chops",
    vendor: "Dara Kakes",
    image: "images/small-chops.jpg",
    description: "Party-style small chops from Dara Kakes, made for hangouts, birthdays, meetings, and events.",
    flavours: [],
    sizes: [
      { name: "Small Pack", price: 5000 },
      { name: "Medium Pack", price: 10000 },
      { name: "Large Pack", price: 18000 },
      { name: "Party Tray", price: 35000 }
    ],
    extras: [
      { name: "Spring Rolls", price: 0 },
      { name: "Samosa", price: 0 },
      { name: "Puff Puff", price: 0 },
      { name: "Mixed Pack", price: 2000 }
    ],
    allowMessage: false
  }
];