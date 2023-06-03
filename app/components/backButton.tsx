'use client';
 
import { useRouter } from 'next/navigation';
 
export default function BackButton() {
  const router = useRouter();
 
  return (
    <button type="button" onClick={() => router.back()}>
      Önceki sayfaya git
    </button>
  );
}