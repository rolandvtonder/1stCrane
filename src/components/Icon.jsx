/**
 * Line icons on a 24px grid, 1.5 stroke, round caps — one family throughout.
 * Decorative by default (aria-hidden); pass `label` when an icon stands alone.
 */
const PATHS = {
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
  arrowDown: <path d="M12 4v15M6 13l6 6 6-6" />,
  arrowUpRight: <path d="M7 17 17 7M8.5 7H17v8.5" />,
  chevronLeft: <path d="M15 5l-7 7 7 7" />,
  chevronRight: <path d="M9 5l7 7-7 7" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  phone: (
    <path d="M5.2 4h3.3l1.7 4.3-2.2 1.4a11 11 0 0 0 6.3 6.3l1.4-2.2 4.3 1.7v3.3a1.2 1.2 0 0 1-1.2 1.2C10.9 20 4 13.1 4 5.2A1.2 1.2 0 0 1 5.2 4z" />
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  fax: (
    <>
      <path d="M7 9V4h7.5L17 6.5V9" />
      <path d="M7 17H4.5V9h15v8H17" />
      <rect x="7" y="13" width="10" height="7" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14.5" rx="1.5" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  layers: <path d="M12 4 3 8.5 12 13l9-4.5zM3 12.5 12 17l9-4.5M3 16.5 12 21l9-4.5" />,
  crane: (
    <>
      <path d="M3 20.5h18" />
      <rect x="4" y="15" width="10" height="3.5" rx=".5" />
      <path d="M6.5 15 19 5.5M19 5.5v6.5" />
      <path d="M19 12v1.5a1.6 1.6 0 1 1-1.6 1.6" />
    </>
  ),
  sling: (
    <>
      <path d="M12 3.5v3.5M12 7 5.5 13M12 7l6.5 6" />
      <rect x="4" y="13" width="16" height="6.5" rx=".5" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 16.5V6.5h11.5v10" />
      <path d="M14 10h3.8l3.2 3.6v2.9h-2.2M9 16.5h5" />
      <circle cx="6.8" cy="17" r="1.9" />
      <circle cx="17" cy="17" r="1.9" />
    </>
  ),
  move: (
    <>
      <rect x="3" y="9" width="9.5" height="9.5" rx=".5" />
      <path d="M5.5 9V6.5h4.5V9M15.5 13.75H21M18 10.75l3 3-3 3" />
    </>
  ),
  box: <path d="M4 7.8 12 4l8 3.8v8.4L12 20l-8-3.8zM4 7.8l8 3.8 8-3.8M12 11.6V20" />,
  compass: (
    <>
      <circle cx="12" cy="6" r="2" />
      <path d="M11 7.8 6.5 20M13 7.8 17.5 20M8.4 15h7.2M12 3.2V4" />
    </>
  ),
  shield: <path d="M12 3.5 19 6v6c0 4.2-2.9 7.3-7 8.5-4.1-1.2-7-4.3-7-8.5V6zM9 12l2.2 2.2L15.5 10" />,
  hardhat: (
    <>
      <path d="M3.5 17h17v2.5h-17z" />
      <path d="M5.5 17a6.5 6.5 0 0 1 13 0M10 10.9V7.5h4v3.4" />
    </>
  ),
  clipboard: (
    <>
      <path d="M8.5 5H6v15h12V5h-2.5" />
      <rect x="8.5" y="3.5" width="7" height="3" rx=".5" />
      <path d="M9.5 13l2 2 3.5-4" />
    </>
  ),
  wrench: (
    <path d="M14.7 4.2a4.6 4.6 0 0 0-4.2 6.3L4.3 16.7a1.9 1.9 0 0 0 2.7 2.7l6.2-6.2a4.6 4.6 0 0 0 6.3-4.2l-2.8 2.8-2.7-.7-.7-2.7z" />
  ),
  tag: (
    <>
      <path d="M3.5 12.3V4.5h7.8l9.2 9.2-7.8 7.8z" />
      <circle cx="8" cy="9" r="1.3" />
    </>
  ),
  facebook: <path d="M14.5 8H17V4.5h-2.5A3.5 3.5 0 0 0 11 8v2.5H8.5V14H11v6.5h3.5V14H17l.5-3.5h-3V8.5a.5.5 0 0 1 .5-.5z" />,
  image: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="1.5" />
      <path d="M3.5 16l5-5 4 4 3-3 5 5" />
      <circle cx="15.5" cy="9.5" r="1.2" />
    </>
  ),
};

export default function Icon({ name, size = 24, label, className = '', strokeWidth = 1.5 }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
