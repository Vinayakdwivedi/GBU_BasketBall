import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,  // ← required for static export
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
    ],
  },
}

export default nextConfig