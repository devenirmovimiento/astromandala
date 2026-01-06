/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: process.env.GITHUB_ACTIONS ? '/astromandala' : '',
    assetPrefix: process.env.GITHUB_ACTIONS ? '/astromandala/' : '',
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
