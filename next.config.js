/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  compiler: {
    emotion: true,
  },
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: process.env.NEXT_PUBLIC_GRAPHQL_URL ||'http://localhost:5001/graphql',
      },
    ];
  },
  reactStrictMode: true,
};
