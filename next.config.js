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
          {
            protocol: 'https',
            hostname: 'picsum.photos',
            port: '',
            pathname: '/id/**',
          },
        ],
      },


      //distDir: 'build',
      //basePath: '/shop',


      async rewrites() {
        return [
          {
            source: '/blog',
            destination: 'https://www.techcareer.net/blog'
          },
          {
            source: '/blog/:slug',
            destination: 'https://www.techcareer.net/blog/:slug'
          }
        ]
      }
}

module.exports = nextConfig
