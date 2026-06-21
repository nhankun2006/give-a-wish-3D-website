/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false, /* Thêm dòng này để tắt chữ N */
  },
};

export default nextConfig;