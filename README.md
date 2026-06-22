#  Happy Birthday Website - 3D Ocean Experience

##  Brief Description
Dự án là một trang web tương tác 3D sống động mang chủ đề đại dương, được thiết kế đặc biệt như một món quà sinh nhật bất ngờ dành cho chị Tam Triều Dâng. Trải nghiệm người dùng đi từ một màn hình chờ (Landing Page) lấp lánh ánh sáng biển sâu, cho đến khi "lặn xuống" không gian 3D xoay 360 độ chứa đựng các kỷ niệm, hành trình sự nghiệp, rạp chiếu phim mini và khu vực gửi lời chúc bí mật của fan hâm mộ.

##  Tech Stack
Dự án được xây dựng dựa trên các công nghệ Front-end hiện đại nhất để đảm bảo hiệu năng và trải nghiệm mượt mà:
* **Next.js (App Router):** Framework React tối ưu hóa hiệu suất, SEO và cấu trúc routing.
* **React Three Fiber & Three.js:** Cốt lõi xây dựng không gian 3D, xử lý ánh sáng và hệ thống Camera điều hướng.
* **GSAP (GreenSock):** Thư viện animation mạnh mẽ xử lý các chuyển động tự nhiên, ngẫu nhiên cho hệ thống sinh vật biển.
* **Tailwind CSS:** Thiết kế giao diện nhanh chóng, linh hoạt với phong cách Glassmorphism (hiệu ứng kính mờ) hiện đại.

##  Noticeable Features
* **Cinematic Landing Page Tách Biệt:** Màn hình chào mừng độc lập với hiệu ứng nền `radial-gradient` mô phỏng ánh sáng rọi xuống mặt nước, cùng nút "Lặn Xuống" tích hợp hiệu ứng sóng âm lôi cuốn.
* **Trải nghiệm 3D 360 Độ:** Hệ thống chuyển Tab độc quyền thông qua việc xoay camera góc 90 độ trong không gian Three.js, tạo cảm giác người dùng đang bơi vòng tròn dưới đáy biển.
* **Hệ sinh thái đại dương sinh động:** Hàng loạt loài sinh vật biển (Cá, Sứa, Cua, Sao biển) được gắn animation GSAP để di chuyển lơ lửng, lắc lư tự nhiên theo các chu kỳ thời gian ngẫu nhiên.
* **Giao diện 4 Khu vực chức năng (Tabs):**
  * *Góc Nhỏ Của Dâng:* Layout Album ảnh kỷ niệm.
  * *Hành Trình Sự Nghiệp:* Timeline các cột mốc nổi bật thả nổi.
  * *Rạp Phim Đại Dương:* Video Modal tích hợp nút mở quà pháo hoa bất ngờ.
  * *Khu Vực Fan:* Bảo vệ bằng Passcode khóa bảo mật (Mật khẩu: 1007) để lại lời chúc.

##  How to Manual Build and Deploy

### Yêu cầu môi trường
* Node.js 

### 1. Chạy ở môi trường Development (Môi trường dev)
Cài đặt các gói phụ thuộc (Dependencies):
```bash
npm run dev