/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  compress: true,
  experimental: {
    optimizeCss: true,
    cssChunking: "strict",
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "react-icons",
      "recharts",
    ],
  },
  modularizeImports: {
    "@tabler/icons-react": {
      transform: "@tabler/icons-react/dist/esm/icons/{{member}}",
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "i.postimg.cc" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.aceternity.com" },
      { protocol: "https", hostname: "cdn.rareblocks.xyz" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

module.exports = nextConfig;
