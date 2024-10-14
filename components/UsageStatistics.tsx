// components/UsageStatistics.tsx

'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

interface UsageData {
  date: string
  usage: number
}

const UsageStatistics: React.FC = () => {
  const [data, setData] = useState<UsageData[]>([])

  useEffect(() => {
    fetchUsageData()
  }, [])

  const fetchUsageData = async () => {
    try {
      const response = await axios.get('/api/statistics/usage')
      setData(response.data)
    } catch (error) {
      console.error('Failed to fetch usage statistics', error)
    }
  }

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="usage" stroke="#8884d8" />
    </LineChart>
  )
}

export default UsageStatistics
