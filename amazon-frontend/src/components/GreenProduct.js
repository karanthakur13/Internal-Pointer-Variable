import React from 'react'
import Rating from './Rating'
import "../styles/Product.css"
import { Link } from 'react-router-dom'


const GreenProduct = ({ product }) => {

    const src = `/Carbon${product.greenRating}.png`
    return (
        ((product.greenRating === 0 || product.greenRating === 2) &&
            <Link to={`/products/product/${product._id}`}>
                <div className="product-card" >
                    <div className="product-image">
                        <img src={`/productPhoto/${product.product_id}.jpeg`} alt="" />
                    </div>
                    <h2>{product.name}</h2>
                    <Rating rating={product.rating} numRev={product.numRev} />
                    <img className='greenRating' src={src} />
                    <p>₹{product.price}.00</p>
                </div>
            </Link>)
    )
}

export default GreenProduct
