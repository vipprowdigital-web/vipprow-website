/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  compress: true,
  turbopack: {},
  experimental: {
    inlineCss: true,
    optimizeCss: true,
    cssChunking: "strict",
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "react-icons",
      "recharts",
      "swiper",
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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      const existingCacheGroups =
        config.optimization.splitChunks?.cacheGroups || {};
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...existingCacheGroups,
          // Isolate Three.js + React-Three-Fiber into its own chunk.
          // These are only loaded on pages that use Beams.tsx (dynamically imported),
          // keeping them out of shared vendor chunks served on every route.
          threeVendor: {
            test: /[\\/]node_modules[\\/](three|@react-three[\\/]fiber|@react-three[\\/]drei|ogl|cobe)[\\/]/,
            name: "three-vendor",
            chunks: "all",
            priority: 30,
            enforce: true,
          },
          // Swiper into its own chunk so it's not bundled with pages that don't use it.
          swiperVendor: {
            test: /[\\/]node_modules[\\/]swiper[\\/]/,
            name: "swiper-vendor",
            chunks: "all",
            priority: 25,
            enforce: true,
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
