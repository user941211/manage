// app/layout.tsx

import './globals.css';
import Providers from '../components/Providers';
import { ReactNode } from 'react';

export const metadata = {
  title: '자재 관리 시스템',
  description: '내부 사용을 위한 자재 관리 웹페이지',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gray-100">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
