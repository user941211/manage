// app/page.tsx

import Link from 'next/link';
import MaterialTable from '../components/MaterialTable';
import ProtectedRoute from '../components/ProtectedRoute';
import { prisma } from '../lib/prisma';
import { Material as PrismaMaterial } from '@prisma/client';

interface SerializedMaterial {
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

export default async function Home() {
  const materials: PrismaMaterial[] = await prisma.material.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  const serializedMaterials: SerializedMaterial[] = materials.map((material) => ({
    ...material,
    createdAt: material.createdAt.toISOString(),
    updatedAt: material.updatedAt.toISOString(),
  }));

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">자재 목록</h1>
        <Link 
          href="/add"
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
        >
          자재 추가
        </Link>
        <MaterialTable initialMaterials={serializedMaterials} />
      </div>
    </ProtectedRoute>
  );
}
