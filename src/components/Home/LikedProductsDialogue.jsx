import React from 'react'
import './home.css'

const LikedProductsDialog = ({ likedProductIds, products, onClose }) => {


  const getLikedProducts = () => {
    const likedProducts = []
    likedProductIds.map((productId) => {
      return likedProducts.push(...
        products.filter((product) => {
          return product.id==productId
        }),
      )
    })
    return likedProducts
  }

  const likedProducts = getLikedProducts()


  return (
    <div className="liked__products__dialog">
      <div className="liked__products__dialog__content">
        <h2>Liked Products</h2>
        <div className="liked__product__list">
          <div className='list__container'>
          {likedProducts.length > 0 ? (
            likedProducts.map((product) => (
              <div key={product.id} className="liked__product__item">
                <img src={product.thumbnail} alt="image" />
                <div>
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                <button className='buy__button' >Buy</button>
                </div>
              </div>
            ))
          ) : (
            <p>No liked products yet.</p>
          )}
          </div>
        </div>
          <button className='close__button' onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default LikedProductsDialog
