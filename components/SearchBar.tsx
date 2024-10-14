// components/SearchBar.tsx

'use client'

import { useState, ChangeEvent } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <input
      type="text"
      placeholder="자재명 검색..."
      value={query}
      onChange={handleChange}
      className="border p-2 w-full mb-4"
    />
  )
}

export default SearchBar
