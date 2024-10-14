// components/ProtectedRoute.tsx

'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // 아직 로딩 중인 경우
    if (!session) router.push('/auth/signin'); // 인증되지 않은 경우 로그인 페이지로 이동
  }, [session, status, router]);

  if (status === 'loading' || !session) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
