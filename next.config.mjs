/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false, /* Thêm dòng này để tắt chữ N */
  },
  allowedDevOrigins: ['192.168.1.9', 'localhost:3000'],
};

export default nextConfig;