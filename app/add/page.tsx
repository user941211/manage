// app/add/page.tsx

'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AddMaterial() {
  const [location, setLocation] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [name, setName] = useState('')
  const [model, setModel] = useState('')
  const [status, setStatus] = useState('')
  const [quantity, setQuantity] = useState(0)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('/api/materials', {
        location,
        manufacturer,
        name,
        model,
        status,
        quantity,
      })
      router.push('/')
    } catch (error) {
      console.error('Failed to add material', error)
      alert('자재 추가에 실패했습니다.')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">자재 추가</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">위치</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">제조사</label>
          <input
            type="text"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            required
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">자재명</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">모델명</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">상태</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">수량</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            required
            className="w-full border p-2"
          />
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            추가
          </button>
          <Link href="/" className="bg-gray-500 text-white px-4 py-2 rounded">취소</Link>
        </div>
      </form>
    </div>
  )
}
