/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['minio.nutech-integrasi.app'], // Add your domain(s) here
  },
}

module.exports = nextConfig
