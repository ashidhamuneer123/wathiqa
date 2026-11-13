/** @type {import('next').NextConfig} */
const isExport = process.env.STATIC_EXPORT === "1";
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  ...(isExport ? { output: "export", images: { unoptimized: true }, trailingSlash: true } : {}),
};
export default nextConfig;
