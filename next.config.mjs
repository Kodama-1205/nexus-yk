/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Phase 1 はローカル `public/` の画像が中心です。
    // 将来、外部 CDN の画像を `next/image` で扱う場合は `remotePatterns` を追加してください。
    remotePatterns: [],
  },
};

export default nextConfig;
