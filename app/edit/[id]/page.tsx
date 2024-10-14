// app/edit/[id]/page.tsx

'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Material {
  id: number;
  location: string;
  manufacturer: string;
  name: string;
  model: string;
  status: string;
  quantity: number;
}

export default function EditMaterial() {
  const router = useRouter();
  const { id } = useParams();
  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetchMaterial();
    }
  }, [id]);

  const fetchMaterial = async () => {
    try {
      const response = await axios.get(`/api/materials/${id}`);
      setMaterial(response.data);
    } catch (error) {
      console.error('Failed to fetch material', error);
      alert('자재 정보를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!material) return;
    try {
      await axios.put(`/api/materials/${id}`, material);
      router.push('/');
    } catch (error) {
      console.error('Failed to update material', error);
      alert('자재 수정에 실패했습니다.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!material) return <p>Material not found</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">자재 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">위치</label>
          <input
            type="text"
            value={material.location}
            onChange={(e) => setMaterial({ ...material, location: e.target.value })}
            required
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">제조사</label>
          <input
            type="text"
            value={material.manufacturer}
            onChange={(e) => setMaterial({ ...material, manufacturer: e.target.value })}
            required
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">자재명</label>
          <input
            type="text"
            value={material.name}
            onChange={(e) => setMaterial({ ...material, name: e.target.value })}
            required
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">모델명</label>
          <input
            type="text"
            value={material.model}
            onChange={(e) => setMaterial({ ...material, model: e.target.value })}
            required
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">상태</label>
          <input
            type="text"
            value={material.status}
            onChange={(e) => setMaterial({ ...material, status: e.target.value })}
            required
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">수량</label>
          <input
            type="number"
            value={material.quantity}
            onChange={(e) => setMaterial({ ...material, quantity: parseInt(e.target.value) })}
            required
            className="w-full border p-2"
          />
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            수정
          </button>
          <Link href="/" className="bg-gray-500 text-white px-4 py-2 rounded">취소</Link>
        </div>
      </form>
    </div>
  );
}
