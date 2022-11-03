import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Search() {
  const [search] = useSearchParams();
  console.log(search.get('keyword'));  
  return (
    <div>
        <h1>Kết quả tìm kiếm</h1>
    </div>
  )
}
