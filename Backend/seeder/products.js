const products = [
  {
    title: 'Enchanted Evening Diamond Ring',
    slug: 'enchanted-evening-diamond-ring',
    description: 'A stunning ring featuring a brilliant-cut diamond set in a classic 18k white gold band. Perfect for engagements or special occasions.',
    shortDescription: 'Classic 18k white gold diamond ring.',
    category: 'Rings',
    collections: ['Bridal', 'Classic'],
    images: [
      { url: '/images/ring1.jpg', alt: 'Enchanted Evening Diamond Ring on display' }
    ],
    variants: [
      {
        sku: 'EEDR-WG-050',
        title: '0.5 Carat',
        price: 2500,
        stock: 10,
        attributes: { "metal": "White Gold", "size": "6" }
      },
      {
        sku: 'EEDR-WG-075',
        title: '0.75 Carat',
        price: 3800,
        stock: 5,
        attributes: { "metal": "White Gold", "size": "7" }
      }
    ],
    price: 2500,
    currency: 'USD',
    tags: ['diamond', 'engagement', 'ring', 'white gold'],
    active: true,
  },
  {
    title: 'Midnight Sapphire Pendant',
    slug: 'midnight-sapphire-pendant',
    description: 'A deep blue sapphire pendant hangs gracefully from a delicate sterling silver chain. The sapphire is surrounded by a halo of smaller diamonds, adding a touch of sparkle.',
    shortDescription: 'Deep blue sapphire pendant with diamond halo.',
    category: 'Necklaces',
    collections: ['Gemstone', 'Gifts'],
    images: [
      { url: '/images/necklace1.jpg', alt: 'Midnight Sapphire Pendant' }
    ],
    variants: [
      {
        sku: 'MSP-SS-18',
        title: '18-inch Chain',
        price: 850,
        stock: 15
      },
       {
        sku: 'MSP-SS-20',
        title: '20-inch Chain',
        price: 875,
        stock: 12
      }
    ],
    price: 850,
    currency: 'USD',
    tags: ['sapphire', 'pendant', 'necklace', 'silver'],
    active: true,
  }
];

module.exports = products;