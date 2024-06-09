import React from 'react'
import {  Link } from "react-router-dom"
import { BACKEND_URL } from '../../utils/constant'


export default function ListItem({ product, AddProductToWishList, AddProductToCart }) {

   return (
      <div  >
         <article className="card card-product-list">
            <div className="row g-0">
               <aside className="col-xl-3 col-lg-4 col-md-12 col-12"   >
                  <a href="#" className="img-wrap"> <img src={`${BACKEND_URL + product?.thumbnail}`} /> </a> </aside>

               <div className="col-xl-6 col-lg-5 col-md-7 col-sm-7"  >
                  <Link to={`/product/${product._id}`} >
                     <div className="card-body">
                        <a href="#" className="h6 title mb-3"> {product?.title} </a>
                        <ul className="list-check mb-2">
                           {
                              product?.description.split('\n').slice(0, 3).map((feature, index) => {
                                 const truncatedFeature = feature.length > 100 ? feature.substring(0, 100) + '...' : feature;
                                 return (
                                    <li className="list-check-item" key={index}>
                                       <i className="bx bx-check text-success"></i> {truncatedFeature}
                                    </li>
                                 );
                              })
                           }
                        </ul>


                     </div>

                  </Link>
               </div>

               <aside className="col-xl-3 col-lg-3 col-md-5 col-sm-5">
                  <div className="info-aside">
                     <div className="price-wrap"> <span className="price h5">Rent :  ${product?.rent_price} </span> <del className="price-old"> </del> </div>
                     <div className="price-wrap"> <span className="price h5">Purchase :  ${product?.purchase_price} </span> <del className="price-old"> ${product?.purchase_price + product.discount}</del> </div>

                     <p className="text-success">Free shipping</p>
                     <p className="text-muted"> 10 days ship </p>
                     <br /> <a className="btn btn-primary w-100 mb-2" onClick={() => AddProductToCart(product)} > Add to cart </a> <a onClick={() => AddProductToWishList(product)} className="btn btn-outline-primary w-100"> Wishlist </a>
                  </div>

               </aside>

            </div>

         </article>
      </div>
   )
}
