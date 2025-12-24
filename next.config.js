/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  eslint: {
    // Solo durante el desarrollo, en producción debe ejecutarse
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Activar comprobación de tipos en build
    ignoreBuildErrors: false,
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
