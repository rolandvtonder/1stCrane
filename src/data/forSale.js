/**
 * Cranes currently for sale. Add, edit or remove entries here — the For Sale
 * page and the homepage teaser both read this list.
 *
 * The old site only named the Grove AT750BE; its year, hours and price
 * weren't published, so they're "on request" until you fill them in.
 */
export const LISTINGS = [
  {
    id: 'grove-at750be',
    make: 'Grove',
    model: 'AT750BE',
    type: 'Hydraulic mobile crane',
    status: 'Available',
    price: 'Price on request',
    photo: null, // e.g. 'crane-golden-hour' once there's a photo of this exact machine
    summary:
      'The core machine in our sales range: a durable hydraulic Grove crane with multiple axles and the hydraulic power to lift materials to height.',
    specs: [
      { label: 'Make', value: 'Grove' },
      { label: 'Model', value: 'AT750BE' },
      { label: 'Counterweight', value: 'On request' },
      { label: 'Capacity on outriggers', value: 'On request' },
    ],
  },
];

export const BUYING = [
  {
    icon: 'shield',
    title: 'Inspected and maintained',
    text: 'Each crane is thoroughly inspected and maintained for reliability, performance and safety.',
  },
  {
    icon: 'clipboard',
    title: 'The right machine',
    text: 'We help you choose, weighing your operational needs, budget and long-term goals.',
  },
  {
    icon: 'tag',
    title: 'Support after the sale',
    text: 'Advice on financing options through the purchase, and after-sales service once it’s yours.',
  },
];
