/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "images.pexels.com",
          },
          {
            protocol: "https",
            hostname: "img.clerk.com",
          },
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
          },
          {
            protocol: "https",
            hostname: "i.pinimg.com",
          },
        ],
      },
};

export default nextConfig;
