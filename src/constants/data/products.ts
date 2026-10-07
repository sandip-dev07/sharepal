import raw from "./product-list.json";
import type { Product } from "@/lib/rental";


const featured = [
  {
    id: 18273,
    image:
      "/figma/imgTheseAreProductImagesOfRentPs5ConsoleWith100GamesComboW1ControllerBySharePal.png",
    six_day_rent: 2479,
    out_of_stock: false,
    tag: "Trending",
  },
  {
    id: 20242,
    image:
      "/figma/imgTheseAreProductImagesOfRentPs5ConsoleWith100GamesWithEaPlayW2ControllerBySharePal.png",
    six_day_rent: 4712,
    out_of_stock: false,
    tag: "Trending",
  },
  {
    id: -1,
    name: "Oculus Quest 3S",
    image:
      "/figma/imgThisIsAnImageOfOculusQuest3SOnRentOfferedBySharePalIn.png",
    six_day_rent: 2834,
    out_of_stock: false,
    tag: "Trending",
  },
  {
    id: 18255,
    image:
      "/figma/imgTheseAreProductImagesOfRentPs5ConsoleWith100GamesComboW2ControllersBySharePal.png",
    six_day_rent: 3047,
    out_of_stock: false,
    tag: "Trending",
  },
  {
    id: -2,
    name: "Oculus Quest 2",
    image: "/figma/imgThisIsAnImageOfOculusQuest2OnRentOfferedBySharePalIn.png",
    six_day_rent: 2689,
    out_of_stock: false,
    tag: "Trending",
  },
  {
    id: 20105,
    image:
      "/figma/imgTheseAreProductImagesOfRentPs5ConsoleWithEaPlayComboW2ControllersBySharePal.png",
    six_day_rent: 2376,
    out_of_stock: false,
    tag: "Trending",
  },
  {
    id: 8185,
    image:
      "/figma/imgTheseAreProductImagesOfRentPs5ConsoleW1ControllerBySharePal.png",
    six_day_rent: 2127,
    out_of_stock: false,
    tag: "",
  },
  {
    id: -3,
    name: "PS5 + GTA 6 with 1 Controller",
    image:
      "/figma/imgTheseAreProductImagesOfPs5Gta6With1ControllerBySharePalInBangalore.png",
    six_day_rent: 0,
    out_of_stock: true,
    tag: "New",
  },
  {
    id: -4,
    name: "Xbox Series S (400+ Games) w/1 Controller",
    image:
      "/figma/imgTheseAreProductImagesOfXboxSeriesSW2WithGamePassControllersOnRentBySharePal.png",
    six_day_rent: 0,
    out_of_stock: true,
    tag: "",
  },
  {
    id: -5,
    name: "Xbox Series S (200+ Games) w/2 Controllers",
    image:
      "/figma/imgTheseAreProductImagesOfXboxSeriesSW2WithGamePassControllersOnRentBySharePal1.png",
    six_day_rent: 0,
    out_of_stock: true,
    tag: "",
  },
  {
    id: 18117,
    image:
      "/figma/imgTheseAreProductImagesOfRentPs5ConsoleWithEaPlayComboW2ControllersBySharePal1.png",
    six_day_rent: 3047,
    out_of_stock: false,
    tag: "",
  },
  {
    id: -6,
    name: "Sony PlayStation PS VR2",
    image:
      "/figma/imgThisIsAnImageOfSonyPlayStationPsVr2HorizonCallOfTheMountainBundleOnRentOfferedBySharePalIn.png",
    six_day_rent: 0,
    out_of_stock: true,
    tag: "New",
  },
];
const catalog: Product[] = raw.products;
export const products: Product[] = [
  ...featured.map((p) => ({
    rating: 0,
    booked_count: 0,
    name: "",
    per_day_rent: 0,
    ...catalog.find((item) => item.id === p.id),
    ...p,
  })),
  ...catalog.filter((p) => !featured.some((item) => item.id === p.id)),
];
