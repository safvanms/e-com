import React from 'react'
import { useParams } from 'react-router-dom'

const LikedProducts = () => {
  const {likedProductIds} = useParams();

  console.log(likedProductIds, 'Liked Product Ids');

  return (
    <div>
      <h1>Liked Products</h1>
    </div>
  )
}

export default LikedProducts
