// app/materials/[id]/page.tsx

'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import QRCodeComponent from '../../../components/QRCodeComponent';
import Link from 'next/link';

interface Material {
  id: number;
  location: string;
  manufacturer: string;
  name: string;
  model: string;
  status: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export default function MaterialDetail() {
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

  if (loading) return <p>Loading...</p>;
  if (!material) return <p>Material not found</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">자재 상세 정보</h1>
      <div className="mb-4">
        <p><strong>ID:</strong> {material.id}</p>
        <p><strong>위치:</strong> {material.location}</p>
        <p><strong>제조사:</strong> {material.manufacturer}</p>
        <p><strong>자재명:</strong> {material.name}</p>
        <p><strong>모델명:</strong> {material.model}</p>
        <p><strong>상태:</strong> {material.status}</p>
        <p><strong>수량:</strong> {material.quantity}</p>
      </div>
      <div className="mb-4">
        <QRCodeComponent value={`Material ID: ${material.id}`} />
      </div>
      <Link href="/">
        <a className="bg-gray-500 text-white px-4 py-2 rounded">돌아가기</a>
      </Link>
    </div>
  );
}
