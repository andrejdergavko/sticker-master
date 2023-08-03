/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'filin.mail.ru',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
