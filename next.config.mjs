/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  // Static export: `next build` writes the site to /out (works on Cloudflare Pages, Netlify and Vercel)
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
