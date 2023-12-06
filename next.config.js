/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: '*',
        port: '9000',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: '*',
        port: '8080',
        pathname: '**',
      }
    ],
  },
};

module.exports = nextConfig;
