# 🌊 Happy Birthday Website - 3D Ocean Experience

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)](https://nextjs.org/)
[![React Three Fiber](https://img.shields.io/badge/R3F-blue?logo=react)](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)

Dự án là một trang web tương tác 3D sinh động mang chủ đề đại dương, được thiết kế đặc biệt như một món quà sinh nhật bất ngờ dành cho chị **Tam Triều Dâng**. Trải nghiệm người dùng đi từ một màn hình chờ (Landing Page) lấp lánh ánh sáng biển sâu, cho đến khi "lặn xuống" không gian 3D xoay 360 độ chứa đựng các kỷ niệm, hành trình sự nghiệp, rạp chiếu phim mini và khu vực gửi lời chúc bí mật của fan hâm mộ.

---

## 📸 Hình ảnh & Demo (Screenshots & Demo)

* **Link Demo Trực Tuyến:** [Xem Demo tại đây](https://your-demo-link.vercel.app) *(Thay đổi link nếu đã deploy)*

*(Bạn có thể chèn ảnh chụp màn hình dự án tại đây để tăng tính trực quan)*
<!-- ![Landing Page](public/screenshot.png) -->

---

## 🛠️ Công nghệ Sử dụng (Tech Stack)

Dự án được xây dựng dựa trên các công nghệ và thư viện Front-end/Back-end hiện đại nhất để đảm bảo hiệu năng và trải nghiệm mượt mà:
* **Next.js (App Router):** Framework React tối ưu hóa hiệu suất, SEO, Route Handlers (API Routes).
  * **`next/dynamic`:** Được áp dụng để tải bất đồng bộ (Lazy Loading) các thành phần 3D nặng (Canvas, Three.js) ở phía Client, giúp loại bỏ hoàn toàn các lỗi xung đột Server-Side Rendering (SSR).
* **React Three Fiber & Three.js:** Cốt lõi xây dựng không gian 3D dưới lòng đại dương, xử lý ánh sáng, đổ bóng và hệ thống Camera chuyển động.
* **GSAP (GreenSock):** Thư viện animation mạnh mẽ xử lý các chuyển động trôi nổi, bơi lội ngẫu nhiên của các sinh vật biển.
* **Framer Motion:** Xử lý các hiệu ứng chuyển động mượt mà cho các phần tử UI 2D overlays.
* **Tailwind CSS:** Thiết kế giao diện nhanh chóng, linh hoạt với phong cách Glassmorphism (hiệu ứng kính mờ) hiện đại.
* **Supabase:** Sử dụng làm Database lưu trữ các lời chúc từ fan hâm mộ một cách bảo mật và nhanh chóng.
* **Mistral AI:** Tích hợp kiểm duyệt nội dung thông minh bằng AI qua API của Mistral.

---

## 🤖 Kiểm duyệt Lời chúc thông minh bằng Mistral AI

Để đảm bảo các lời chúc gửi đến luôn lành mạnh và ý nghĩa, dự án tích hợp hệ thống kiểm duyệt tự động thông qua **Mistral AI API** (`mistral-small-latest`):
* **Cơ chế hoạt động:** Mỗi khi fan gửi lời chúc, nội dung sẽ được gửi đến API Mistral AI.
* **Vai trò:** AI sẽ tự động phân tích ngữ cảnh tiếng Việt hoặc tiếng Anh để phát hiện các từ ngữ độc hại, spam, quảng cáo hoặc nội dung không phù hợp.
* **Kết quả:** Lời chúc hợp lệ (`APPROVED`) mới được lưu trực tiếp vào cơ sở dữ liệu Supabase, trong khi các nội dung không phù hợp (`BLOCKED`) sẽ bị chặn ngay lập tức kèm thông báo lỗi thân thiện cho người dùng.

---

## ✨ Tính năng Nổi bật (Noticeable Features)

* **Cinematic Landing Page Tách Biệt:** Màn hình chào mừng độc lập với hiệu ứng nền `radial-gradient` mô phỏng ánh sáng rọi xuống mặt nước, cùng nút "Lặn Xuống" tích hợp hiệu ứng sóng âm lôi cuốn.
* **Trải nghiệm 3D 360 Độ:** Hệ thống chuyển Tab độc quyền thông qua việc xoay camera góc 90 độ trong không gian Three.js, tạo cảm giác người dùng đang bơi vòng tròn dưới đáy biển.
* **Hệ sinh thái đại dương sinh động:** Hàng loạt loài sinh vật biển (Cá, Sứa, Cua, Sao biển) được gắn animation GSAP để di chuyển lơ lửng, lắc lư tự nhiên theo các chu kỳ thời gian ngẫu nhiên.
* **Giao diện 4 Khu vực chức năng (Tabs):**
  * 🌸 *Góc Nhỏ Của Dâng:* Layout Album ảnh kỷ niệm.
  * 🚀 *Hành Trình Sự Nghiệp:* Timeline các cột mốc nổi bật thả nổi.
  * 🎬 *Rạp Phim Đại Dương:* Video Modal tích hợp nút mở quà pháo hoa bất ngờ.
  * 💬 *Khu Vực Fan:* Bảo vệ bằng Passcode khóa bảo mật (Mật khẩu: `1007`) để lại lời chúc.

---

## 📁 Cấu trúc Thư mục (Project Structure)

```text
give-a-wish-3D-website/
├── public/                  # Các file tĩnh (Hình ảnh, Mô hình 3D, Âm thanh, Fonts)
├── src/
│   ├── app/                 # Next.js App Router (Giao diện chính, cấu hình trang)
│   │   ├── api/             # API Routes xử lý backend
│   │   │   └── wishes/      # API tiếp nhận và duyệt lời chúc qua Mistral AI & Supabase
│   │   ├── globals.css      # Cấu hình Tailwind & CSS toàn cục
│   │   ├── layout.js        # Khung bố cục chính (Layout)
│   │   └── page.js          # Trang điều hướng chính
│   └── components/          # Các thành phần React dùng chung
│       ├── models/          # Các mô hình 3D (Sao biển, Chai thủy tinh, Rương)
│       ├── ocean/           # Cảnh đại dương và sinh vật biển (Cá, Cua, Sứa, Tôm)
│       ├── tabs/            # Nội dung giao diện của 4 khu vực hiển thị chính
│       ├── TabOverlays.js   # Lớp phủ UI điều khiển các Tabs
│       └── UnderwaterBackground.js # Hiệu ứng nền đại dương dưới nước
├── package.json             # Quản lý các dependencies và tập lệnh chạy
└── README.md                # Tài liệu hướng dẫn dự án
```

---

## 🚀 Hướng dẫn Cài đặt & Khởi chạy (Build & Deployment)

### Yêu cầu hệ thống
* **Node.js** phiên bản 18.x trở lên
* **npm** hoặc **yarn**

### 1. Thiết lập biến môi trường (Environment Variables)

Tạo một file `.env.local` ở thư mục gốc của dự án và cấu hình các biến sau:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Mistral AI Configuration
MISTRAL_API_KEY=your_mistral_api_key
```

### 2. Chạy ở môi trường Phát triển (Development)

Cài đặt các gói phụ thuộc (Dependencies):
```bash
npm install
```

Khởi chạy ứng dụng ở chế độ phát triển:
```bash
npm run dev
```
Sau đó truy cập [http://localhost:3000](http://localhost:3000) trên trình duyệt của bạn.

### 3. Xây dựng và Chạy ở môi trường Sản xuất (Production)

Tạo bản build tối ưu hóa:
```bash
npm run build
```

Khởi chạy ứng dụng đã được build:
```bash
npm run start
```

### 4. Deploy lên Vercel

Dự án Next.js này có thể dễ dàng deploy lên **Vercel** chỉ với vài bước đơn giản:
1. Đẩy mã nguồn lên một kho chứa Git cá nhân (GitHub, GitLab, hoặc Bitbucket).
2. Truy cập [Vercel](https://vercel.com/) và liên kết tài khoản Git của bạn.
3. Thêm các biến môi trường cấu hình ở bước 1 vào phần thiết lập Environment Variables của Vercel.
4. Bấm **Deploy**. Vercel sẽ tự động xử lý và cung cấp một tên miền hoạt động thực tế.

---

## 📄 Giấy phép (License)

Dự án này được phát hành theo giấy phép [MIT License](LICENSE). Bạn có thể tự do chỉnh sửa và phân phối lại cho mục đích phi thương mại.

---

## ✍️ Tác giả (Authors)

Dự án được đồng phát triển bởi:

1. **Lương Nhân**
   * **GitHub:** [@nhankuun2006](https://github.com/nhankuun2006)
   * **Vai trò:** Lập trình viên Back-end (Back-end Developer) - API Database và AI Moderation, điều hướng route.

2. **Trọng Phúc**
   * **GitHub:** [@username-placeholder](https://github.com/username-placeholder)
   * **Vai trò:** [Vai trò của tác giả thứ hai, ví dụ: UI/UX Designer / Co-Developer]