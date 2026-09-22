/**
 * Fleet by crane type, and the two crane makes the old site named.
 * `art` picks a line drawing from MachineArt.jsx.
 */
export const FLEET = [
  {
    id: 'all-terrain',
    art: 'allTerrain',
    name: 'All-terrain cranes',
    short: 'Road-going cranes that drive to site and set up fast.',
    text: 'Equipped to move securely and productively on busy urban roads, then set up on site for heavy lifts at height.',
    uses: ['Heavy lifting', 'Infrastructure projects', 'Bridge beam erection'],
  },
  {
    id: 'rough-terrain',
    art: 'roughTerrain',
    name: 'Rough-terrain cranes',
    short: 'Built for difficult off-road ground.',
    text: 'Our rough-terrain cranes have had great success on difficult off-road ground, where sites are unfinished and access is hard.',
    uses: ['Mining', 'Construction sites', 'Wind farms'],
  },
  {
    id: 'franna',
    art: 'franna',
    name: 'Franna cranes',
    short: 'Pick-and-carry cranes for moving loads around site.',
    text: 'Compact and manoeuvrable, for lifting and relocating equipment on site and managing lifts in tight confines.',
    uses: ['Plant maintenance', 'Shut-downs', 'Tight sites'],
  },
  {
    id: 'truck-mounted',
    art: 'truckCrane',
    name: 'Truck-mounted cranes & crane trucks',
    short: 'A crane and a truck in one.',
    text: 'Crane trucks lift, move and position materials, and carry them from one point to another in a single trip.',
    uses: ['Deliveries with offload', 'Machine moving', 'Containers'],
  },
  {
    id: 'excavators',
    art: 'excavator',
    name: 'Excavators',
    short: 'Plant hire for site preparation.',
    text: 'Excavators available alongside our cranes, so one call covers the earthworks and the lift.',
    uses: ['Earthworks', 'Site preparation', 'Trenching'],
  },
];

export const MAKES = [
  {
    id: 'liebherr',
    name: 'Liebherr',
    title: 'Liebherr all-terrain and truck-mounted cranes',
    paragraphs: [
      'Liebherr builds high-speed all-terrain mobile cranes and telescopic truck-mounted cranes, as well as compact cranes and heavy-duty lattice boom cranes used worldwide. That range makes them ideal for the complexity of different site requirements.',
      'Our Liebherr cranes are equipped for heavy-duty operations and construction work across different industries. Liebherr engines achieve a high degree of efficiency through reduced fuel consumption and low emissions, protecting the environment and making the most of resources over the crane’s life.',
    ],
  },
  {
    id: 'grove',
    name: 'Grove',
    title: 'Grove hydraulic cranes',
    paragraphs: [
      'Our Grove plant includes the AT750BE, a hydraulic crane suited to a wide range of operational requirements. Grove cranes are built to withstand the elements and are incredibly durable.',
      'Grove plant is available for day-to-day hire, long-term hire, infrastructure projects, shut-downs, heavy lifting and other crane hire jobs, with a fully certified rigger and equipment if you need that service.',
    ],
  },
];
