/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'statics.zurrose-shop.ch',
        port: ''
      }
    ],
  }
};

export default nextConfig;
