const paths = {
  anchor:
    "M12 2v6m0 0a3 3 0 100 6m0-6a3 3 0 000 6m0 0v8m-7-4c0 4 3 6 7 6s7-2 7-6M5 10h4m6 0h4",
  scroll:
    "M6 4h9a3 3 0 013 3v10a3 3 0 003 3H8a3 3 0 01-3-3V4zm0 0a3 3 0 00-3 3v1h3M9 9h6m-6 4h6",
  "file-text": "M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zM14 3v5h5M9 13h6M9 17h6M9 9h2",
  landmark: "M4 21h16M5 21V10m4 11V10m6 11V10m4 11V10M3 10l9-6 9 6M3 10h18",
  notebook: "M6 3h11a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2zM9 3v18M6 7h0M6 11h0M6 15h0",
  search: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35",
  menu: "M3 6h18M3 12h18M3 18h18",
  close: "M6 6l12 12M18 6L6 18",
  "chevron-down": "M6 9l6 6 6-6",
  "chevron-right": "M9 18l6-6-6-6",
  print: "M6 9V3h12v6M6 18h12v3H6v-3zM4 9h16a2 2 0 012 2v5h-4M4 9a2 2 0 00-2 2v5h4",
  "arrow-up": "M12 19V5m0 0l-6 6m6-6l6 6",
  "arrow-left": "M19 12H5m0 0l6 6m-6-6l6-6",
  "arrow-right": "M5 12h14m0 0l-6-6m6 6l-6 6",
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  mail: "M4 4h16v16H4V4zm0 0l8 8 8-8",
  phone: "M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .8 3a2 2 0 01-.5 2.1L8 10.3a16 16 0 006 6l1.5-1.4a2 2 0 012.1-.5c1 .4 2 .7 3 .8a2 2 0 011.6 2.1z",
  "map-pin": "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z M12 13a3 3 0 100-6 3 3 0 000 6z",
  compass: "M12 22a10 10 0 100-20 10 10 0 000 20zM16 8l-2.5 6-6 2.5 2.5-6 6-2.5z",
  layers: "M12 2l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5",
  target: "M12 22a10 10 0 100-20 10 10 0 000 20zM12 17a5 5 0 100-10 5 5 0 000 10zM12 13a1 1 0 100-2 1 1 0 000 2z",
  book: "M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z",
};

export default function Icon({ name, className = "w-5 h-5", strokeWidth = 1.6 }) {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
