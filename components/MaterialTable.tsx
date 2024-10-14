// components/MaterialTable.tsx

'use client';

import { useState } from 'react';
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

interface MaterialTableProps {
  initialMaterials: Material[];
}

type SortOrder = 'asc' | 'desc';

const MaterialTable: React.FC<MaterialTableProps> = ({ initialMaterials }) => {
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const [query, setQuery] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Material | null; order: SortOrder }>({
    key: null,
    order: 'asc',
  });

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`/api/materials/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete material');
      }
      setMaterials(materials.filter((material) => material.id !== id));
    } catch (error) {
      console.error('Failed to delete material', error);
      alert('자재 삭제에 실패했습니다.');
    }
  };

  const handleSort = (key: keyof Material) => {
    let order: SortOrder = 'asc';
    if (sortConfig.key === key && sortConfig.order === 'asc') {
      order = 'desc';
    }
    setSortConfig({ key, order });

    const sortedMaterials = [...materials].sort((a, b) => {
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setMaterials(sortedMaterials);
  };

  const filteredMaterials = materials.filter((material) =>
    material.name.toLowerCase().includes(query.toLowerCase())
  );

  const getSortIndicator = (key: keyof Material) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.order === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <>
      <input
        type="text"
        placeholder="자재명 검색..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {/* ID 컬럼 숨기기: 삭제 */}
            {/* <th className="py-2">ID</th> */}
            <th
              className="py-2 cursor-pointer"
              onClick={() => handleSort('location')}
            >
              위치{getSortIndicator('location')}
            </th>
            <th
              className="py-2 cursor-pointer"
              onClick={() => handleSort('manufacturer')}
            >
              제조사{getSortIndicator('manufacturer')}
            </th>
            <th
              className="py-2 cursor-pointer"
              onClick={() => handleSort('name')}
            >
              자재명{getSortIndicator('name')}
            </th>
            <th
              className="py-2 cursor-pointer"
              onClick={() => handleSort('model')}
            >
              모델명{getSortIndicator('model')}
            </th>
            <th
              className="py-2 cursor-pointer"
              onClick={() => handleSort('status')}
            >
              상태{getSortIndicator('status')}
            </th>
            <th
              className="py-2 cursor-pointer"
              onClick={() => handleSort('quantity')}
            >
              수량{getSortIndicator('quantity')}
            </th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMaterials.length > 0 ? (
            filteredMaterials.map((material) => (
              <tr key={material.id} className="text-center border-t">
                {/* ID 컬럼 숨기기: 삭제 */}
                {/* <td className="py-2">{material.id}</td> */}
                <td className="py-2">{material.location}</td>
                <td className="py-2">{material.manufacturer}</td>
                <td className="py-2">{material.name}</td>
                <td className="py-2">{material.model}</td>
                <td className="py-2">{material.status}</td>
                <td className="py-2">{material.quantity}</td>
                <td className="py-2">
                  <Link 
                    href={`/edit/${material.id}`}
                    className="text-blue-500 mr-2"
                  >
                    수정
                  </Link>
                  <button
                    onClick={() => handleDelete(material.id)}
                    className="text-red-500"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="py-4">
                등록된 자재가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default MaterialTable;
