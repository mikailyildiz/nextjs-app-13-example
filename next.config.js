/** @type {import('next').NextConfig} */
const nextConfig = {
    // generateBuildId: async () => {
    //     // You can, for example, get the latest git commit hash here
    //     return 'my-build-id';
    // },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'fakestoreapi.com',
            port: '',
            pathname: '/img/**',
          },
        ],
      },
}

module.exports = nextConfig
