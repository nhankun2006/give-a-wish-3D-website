import './globals.css';
import { Inter, Alex_Brush, Great_Vibes } from 'next/font/google';

// Font mặc định cho cả trang
const inter = Inter({ subsets: ['latin'] });

// Cấu hình Font chữ nghệ thuật (hỗ trợ tiếng Việt đầy đủ)
const alexBrush = Alex_Brush({ 
  subsets: ['vietnamese'], 
  weight: '400',
  variable: '--font-alex-brush' // Tạo biến để dùng trong CSS/Style nếu cần
});

const greatVibes = Great_Vibes({ 
  subsets: ['vietnamese'], 
  weight: '400',
  variable: '--font-great-vibes'
});

export const metadata = {
  title: 'Đại Dương Bất Ngờ | Dâng',
  description: 'Thế giới bí mật dưới đáy đại dương dành cho Tam Triều Dâng.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${alexBrush.variable} ${greatVibes.variable}`}>
      <body className={`${inter.className} bg-[#021428] text-white selection:bg-[#ff99c4] selection:text-white`}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}