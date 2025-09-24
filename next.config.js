/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimized for Vercel deployment
  poweredByHeader: false,
  compress: true,
  // Enable static exports for better performance
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig