/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
      },
      {
        protocol: 'http',
        hostname: 'storage.yandexcloud.net',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
