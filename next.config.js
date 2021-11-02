/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/moyo-0f854cb2e63d42e8b31c147bd9c2db2a',
        permanent: false,
      },
    ];
  },
};
