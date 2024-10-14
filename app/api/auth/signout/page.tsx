// app/auth/signout/page.tsx

'use client';

import { signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    signOut({ callbackUrl: '/auth/signin' });
  }, [router]);

  return <p>로그아웃 중...</p>;
}
