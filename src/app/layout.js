import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Đại Dương Bất Ngờ | Dâng',
  description: 'Thế giới bí mật dưới đáy đại dương dành cho Tam Triều Dâng.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-[#021428] text-white selection:bg-[#ff99c4] selection:text-white`}>
        
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}