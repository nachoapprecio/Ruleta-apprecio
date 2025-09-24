/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force server-side features to prevent static export
  async redirects() {
    return []
  },
  async rewrites() {
    return []
  }
}

module.exports = nextConfig