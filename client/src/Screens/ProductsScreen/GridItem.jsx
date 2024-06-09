import React from 'react'
import {  Link } from 'react-router-dom';
import { BACKEND_URL } from '../../utils/constant';


export default function GridItem({ product, AddProductToWishList, AddProductToCart }) {
  return (
    <div className="col-lg-4 col-sm-6 col-12"  >
      <div className="card card-product-grid">
        <div className="img-wrap" > <img src={BACKEND_URL + product.thumbnail} /> </div>
        <div className="info-wrap border-top">
          <Link to={`/product/${product._id}`} >
            <div className="price-wrap"> Rent : <strong className="price">${product.rent_price}</strong> </div>
            <div className="price-wrap"> Purchase <strong className="price">${product.purchase_price}</strong> </div>

            <p className="title mb-2">{product.title}</p>
          </Link>
          <a className="btn btn-primary" onClick={() => AddProductToCart(product)} >Add to cart</a> <a onClick={() => AddProductToWishList(product)} className="btn btn-outline-primary btn-icon"> <i class='bx bxs-heart my-1'></i></a>
        </div>
      </div>

    </div>
  )
}
