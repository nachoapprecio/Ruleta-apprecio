/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimized for Vercel deployment
  poweredByHeader: false,
  compress: true,
  // Standard deployment configuration for Vercel
  trailingSlash: true
}

module.exports = nextConfig