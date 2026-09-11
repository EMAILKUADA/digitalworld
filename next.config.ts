import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      'maplibre-gl.mjs': {
        loaders: [`${__dirname}/tools/maplibre-url-loader.cjs`],
        as: '*.js',
      },
    },
  },
  output: process.env.VERCEL ? undefined : 'standalone',
  serverExternalPackages: ['ws'],
  transpilePackages: ['react-map-gl', 'mapbox-gl', 'maplibre-gl'],
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  async headers() {
    return [
      {
        source: '/vendor/maplibre/:version/:file*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { 
            key: 'Content-Security-Policy', 
            value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: wss: data: blob:; frame-ancestors 'self' https://*.weebly.com https://vercel.app;" 
          },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
};

export default nextConfig;
