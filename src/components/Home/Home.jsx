import React, { useEffect, useState } from 'react'
import './home.css'
import { connect } from 'react-redux'
import { fetchProducts, setSelectedProduct } from '../../redux/actions'
import { Link } from 'react-router-dom'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import Header from '../Header/Header'
import LikedProductsDialog from './LikedProductsDialogue'

const Home = ({ products, fetchProducts, setSelectedProduct }) => {
  const [liked, setLiked] = useState(false)
  const [sortByCategory, setSortByCategory] = useState('')
  const [sortByPrice, setSortByPrice] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8
  const [searchedProducts, setSearchedProducts] = useState([])
  const [showLikedProducts, setShowLikedProducts] = useState(true);


  const handleOpenLikedPage = () => {
    setShowLikedProducts(true);
  };

  const handleCloseLikedPage = () => {
    setShowLikedProducts(false);
  };

  // product serch section

  const handleSearch = (query) => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase()),
    )
    setSearchedProducts(filteredProducts)
  }

  // storing the favorite product locally in local storage

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    const likedProducts =
      JSON.parse(localStorage.getItem('likedProducts')) || {}
    setLiked(likedProducts)
  }, [])

  useEffect(() => {
    localStorage.setItem('likedProducts', JSON.stringify(liked))
  }, [liked])

  // liked products count and id's

  const likedCount = Object.values(liked).filter((isLiked) => isLiked).length
  const likedProductIds = Object.keys(liked).filter(
    (productId) => liked[productId],
  )

  // handling like and dislike

  const handleLike = (productId) => {
    setLiked((prevLiked) => ({
      ...prevLiked,
      [productId]: !prevLiked[productId],
    }))
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
  }



  const filteredProducts = products.filter((product) =>
    sortByCategory ? product.category === sortByCategory : true,
  )

  // sorting by the price

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortByPrice === 'lowToHigh') {
      return a.price - b.price
    } else if (sortByPrice === 'highToLow') {
      return b.price - a.price
    } else {
      return 0
    }
  })

  // pagination section

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  )
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div>
      <Header handleSearch={handleSearch} />
      <h1 className="products__heading">Trending Products</h1>
      <div className="home">

      {/* filter section here */}

        <div className="filter__container">
          <div>
            <label htmlFor="category">Sort by Category: </label>
            <select
              id="category"
              value={sortByCategory}
              onChange={(e) => setSortByCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="smartphones"> Smartphones</option>
              <option value="laptops"> Laptops</option>
              <option value="fragrances"> Fragrance</option>
              <option value="groceries"> Groceries</option>
              <option value="skincare"> Skincare</option>
            </select>
          </div>

          <div>
            <label htmlFor="price">Sort by Price: </label>
            <select
              id="price"
              value={sortByPrice}
              onChange={(e) => setSortByPrice(e.target.value)}
            >
              <option value="">None</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>

          {/* Favorite products section */}

          <div onClick={handleOpenLikedPage}>
            <div className="liked__section">
              <AiFillHeart color="black" size={25} />
              <div className="badge">{likedCount}</div>
            </div>
          </div>

        </div>

        {/* product showing */}

        <div className="product__card__container">
          {/* {searchedProducts.length === 0 && 'Oops , no item found !'} */}
          {searchedProducts.length > 0
            ? searchedProducts.map((product) => (
                <div className="product__card" key={product.id}>
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={`/products/${product.id}`}
                    onClick={() => handleProductClick(product)}
                  >
                    <img
                      className="product__image"
                      src={product.thumbnail}
                      alt="product"
                    />
                  </Link>
                  <div className="product__card__details">
                    <h2>{product.title}</h2>
                    <h1>${product.price}/-</h1>
                    <div onClick={() => handleLike(product.id)}>
                      {liked[product.id] ? (
                        <AiFillHeart size={25} color="red" />
                      ) : (
                        <AiOutlineHeart size={25} />
                      )}
                    </div>
                  </div>
                </div>
              ))
            : currentProducts.map((product) => (
                <div className="product__card" key={product.id}>
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={`/products/${product.id}`}
                    onClick={() => handleProductClick(product)}
                  >
                    <img
                      className="product__image"
                      src={product.thumbnail}
                      alt="product"
                    />
                  </Link>
                  <div className="product__card__details">
                    <h2>{product.title}</h2>
                    <h1>${product.price}/-</h1>
                    <div onClick={() => handleLike(product.id)}>
                      {liked[product.id] ? (
                        <AiFillHeart size={25} color="red" />
                      ) : (
                        <AiOutlineHeart size={25} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* pagination UI */}

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <div className="page__numbers">
          {currentPage} of {totalPages}
        </div>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {showLikedProducts && (
        <LikedProductsDialog
          likedProductIds={likedProductIds}
          products={products}
          onClose={handleCloseLikedPage}
        />
      )}

    </div>
  )
}

const mapStateToProps = (state) => ({
  products: state.products,
})

const mapDispatchToProps = {
  fetchProducts,
  setSelectedProduct,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
