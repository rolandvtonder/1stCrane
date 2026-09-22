/**
 * Technical line drawings of each crane type, used on the dark fleet tiles.
 * Drawn rather than photographed: the job photos don't show which machine is
 * which model, and a drawing never mislabels a crane.
 * Artboard 240×140, ground line at y=122.
 */
const wheel = (x, y, r) => (
  <g key={`w${x}`}>
    <circle cx={x} cy={y} r={r} />
    <circle cx={x} cy={y} r={(r * 0.38).toFixed(1)} />
  </g>
);

const hook = (x, top, block) => (
  <g key={`h${x}`}>
    <path d={`M${x} ${top}V${block}`} />
    <rect x={x - 3.5} y={block} width="7" height="6" rx="1" />
    <path d={`M${x} ${block + 6}v3a3 3 0 1 1-3 3`} />
  </g>
);

const ground = <path d="M14 122H226" className="art__ground" />;

const ART = {
  allTerrain: (
    <>
      {ground}
      <path d="M22 96h154v12H22z" />
      <path d="M176 108V72h24l14 17v19z" />
      <path d="M182 77h16l8 10h-24z" />
      {[40, 64, 136, 160].map((x) => wheel(x, 112, 10))}
      <path d="M54 96V84h60v12" />
      <path d="M92 84V68h20v16" />
      <path d="M96 72h12v8H96z" />
      <path d="M58 84 216 18l4 7L64 91z" />
      <path d="M106 63l3.5 6.5M146 46.5l3.5 6.5M184 30.5l3.5 6.5" />
      {hook(219, 23, 64)}
      <path d="M28 108l-8 12h14M172 108l8 12h-14" className="art__faint" />
    </>
  ),
  roughTerrain: (
    <>
      {ground}
      <path d="M36 88h148v16H36z" />
      {wheel(64, 104, 17)}
      {wheel(158, 104, 17)}
      <path d="M110 88V64h26v24" />
      <path d="M115 69h16v11h-16z" />
      <path d="M70 84 192 29l4 7L77 91z" />
      <path d="M120 61l3.5 6.5M158 44l3.5 6.5" />
      {hook(195, 34, 70)}
    </>
  ),
  franna: (
    <>
      {ground}
      <path d="M22 84h74v22H22z" />
      <path d="M30 84v-8h30v8" />
      <path d="M98 106V56h26v50" />
      <path d="M103 61h16v16h-16z" />
      <path d="M126 92h62v14h-62z" />
      {wheel(50, 110, 12)}
      {wheel(170, 110, 12)}
      <path d="M108 58 214 33l2 8-106 25z" />
      <path d="M152 47l2 8M188 38.5l2 8" />
      {hook(215, 38, 74)}
    </>
  ),
  truckCrane: (
    <>
      {ground}
      <path d="M20 96h150v10H20z" />
      <path d="M24 96v-8h112v8" />
      <path d="M170 106V70h24l14 18v18z" />
      <path d="M175 75h17l9 12h-26z" />
      {[44, 68, 188].map((x) => wheel(x, 112, 10))}
      <path d="M146 88V58h10v30" />
      <path d="M146 60 150 54l-46-30-4 6z" />
      <path d="M100 30 104 24 60 41l2 6z" />
      {hook(61, 45, 60)}
      <path d="M49 73h24v15H49z" />
      <path d="M53 73l8-7 8 7" className="art__faint" />
    </>
  ),
  excavator: (
    <>
      {ground}
      <path d="M40 104h110a9 9 0 0 1 0 18H40a9 9 0 0 1 0-18z" />
      {wheel(42, 113, 6)}
      {wheel(148, 113, 6)}
      <path d="M62 113h.01M82 113h.01M102 113h.01M122 113h.01" className="art__dots" />
      <path d="M52 104V82h78v22" />
      <path d="M52 90H40v14" />
      <path d="M104 82V52h26v30" />
      <path d="M109 57h16v16h-16z" />
      <path d="M126 80 176 27l8 6-50 52z" />
      <path d="M178 27l7-4 24 55-7 4z" />
      <path d="M203 80c-10 2-16 10-14 20h22c2-8-1-16-8-20z" />
      <path d="M194 100v5M200 100v5M206 100v5" />
    </>
  ),
};

export default function MachineArt({ name, className = '' }) {
  return (
    <svg className={`art ${className}`} viewBox="0 0 240 140" aria-hidden="true" focusable="false">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {ART[name]}
      </g>
    </svg>
  );
}
