import React from 'react'
import { useParams } from 'react-router-dom'

export default function Single() {
  const params = useParams();
  const {id} = params;
  return (
    <h1>Single: {id}</h1>
  )
}
