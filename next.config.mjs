/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  // Static export: `next build` writes the site to /out
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;