export type SolarClient = {
  name: string;
  /** Path under /public, e.g. "/assets/images/clients logo/acme.png". Falls back to the name. */
  logo?: string;
  /** Client website. Omit to hide the link. */
  website?: string;
  /** Results to show for this client, e.g. { value: "0", label: "..." }. Omit to hide. */
  metrics?: { value: string; label: string }[];
};

export const SOLAR_CLIENTS: SolarClient[] = [
  {
    name: "Robosol",
    logo: "https://res.cloudinary.com/bosbpth7/image/upload/v1792737174/robosol-logo-without-bg.png",
    website: "https://robosolind.in",
  },
  {
    name: "Eurosol",
    logo: "https://res.cloudinary.com/dh87x8i37/image/upload/v1793276630/LOGOS_1_lihesv.png",
  },
  {
    name: "Jay Shree Electricals",
    logo: "https://res.cloudinary.com/dh87x8i37/image/upload/v1793276978/jay-shree-electricals_vvjelb.jpg",
  },
];
