/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly disable static export
  output: undefined,
  // Ensure we're using standard Next.js deployment
  experimental: {
    outputFileTracingRoot: undefined
  }
}

module.exports = nextConfig