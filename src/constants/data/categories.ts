export const topCategories = [
  { label: "Photography", href: "https://sharepal.in/bangalore/photography-on-rent", active: false },
  { label: "Gaming", href: "/bangalore/gaming-gadgets-on-rent", active: true },
  { label: "Outdoor", href: "https://sharepal.in/bangalore/outdoor-gears-on-rent", active: false },
  { label: "Entertainment", href: "https://sharepal.in/bangalore/entertainment-on-rent", active: false },
];

export const sidebarFilters = [
  { label: "All", match: () => true },
  {
    label: "GTA VI",
    match: (name: string) =>
      name.toLowerCase().includes("gta"),
  },
  {
    label: "PS5 Console",
    match: (name: string) => name.toLowerCase().includes("ps5"),
  },
  {
    label: "Xbox Console",
    match: (name: string) => name.toLowerCase().includes("xbox"),
  },
  {
    label: "VR",
    match: (name: string) =>
      name.toLowerCase().includes("oculus") ||
      name.toLowerCase().includes("quest") ||
      name.toLowerCase().includes("vr"),
  },
  {
    label: "Racing Wheel",
    match: (name: string) =>
      name.toLowerCase().includes("racing") ||
      name.toLowerCase().includes("wheel"),
  },
  {
    label: "Big Screen Gaming",
    match: (name: string) => name.toLowerCase().includes("projector"),
  },
];
