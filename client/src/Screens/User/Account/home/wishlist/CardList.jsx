import React from 'react'
import { BACKEND_URL } from '../../../../../utils/constant'
export default function CardList({ wishItem , onRemove }) {


   return (
      <div>
         <article className="card card-product-list  mt-5 mb-5">
            <div className="row g-0">
               <aside className="col-xl-3 col-md-4"> <a href="#" className="img-wrap">
                  <img src={`${BACKEND_URL}${wishItem.thumbnail}`} /> </a> </aside>

               <div className="col-xl-9 col-md-8 border-start">
                  <div className="card-body">
                     <a href="#" className="title mb-2"> {wishItem?.title}</a>
                     <div className="price-wrap me-3"> <span className="price h5"> ${wishItem?.purchase_price} </span> <del className="price-old"> ${wishItem?.purchase_price + wishItem?.discount} </del> </div>
                     {wishItem.onSale && <div style={{ padding: 10, background: 'teal', color: 'white' }} >SALE</div>}

                     <p className="text-muted">{wishItem.description.substring(0,200)+'...'}</p>
                     <div>
                        <a href="#">Details</a>
                        <a  class="btn btn-outline-danger w-100" onClick={()=> onRemove(wishItem._id)} > Remove </a>
                     </div>
                  </div>

               </div>

            </div>

         </article>
      </div>
   )
}
