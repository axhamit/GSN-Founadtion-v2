/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ["three"],
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Send the bare domain to the canonical www host.
      {
        source: "/:path*",
        has: [{ type: "host", value: "gsnfoundation.com" }],
        destination: "https://www.gsnfoundation.com/:path*",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
