/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["i.annihil.us"],
  },
  // ... autres configurations
};

/*
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.annihil.us",
      },
    ],
  },
};
*/

/*
const path = require("path");

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias["@components"] = path.join(__dirname, "components");
    }

    return config;
  },
};

*/
