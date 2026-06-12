/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  compress: true,
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "i.postimg.cc" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.aceternity.com" },
      { protocol: "https", hostname: "cdn.rareblocks.xyz" },
    ],
  },
};

module.exports = nextConfig;
