import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../utils/constant';
import useStore from '../../utils/store';
import { FaTrashAlt } from "react-icons/fa";

export default function CartItem({ product }) {

   const navigate = useNavigate();

   const [qty, setQty] = React.useState(product._qty);

   const updateQty = useStore(state => state.updateQty);

   const removeProduct = useStore(state => state.remove);

   const increaseQty = () => {
      if (product.qty > qty) {
         setQty(qty + 1);
         updateQty(product, qty + 1);
      }
   }
   const decreaseQty = () => {
      if (qty > 1) {
         setQty(qty - 1);
         updateQty(product, qty - 1);
      }
   }

   return (
      <div>
         <article className="card card-body mb-3">
            <div className="row gy-3 align-items-center">
               <div className="col-md-6">
                  <a className="itemside align-items-center"    >
                     <div className="aside">
                        <img src={`${BACKEND_URL + product.thumbnail}`} height="72" width="72" className="img-thumbnail img-sm" />
                     </div>
                     <div className="info">
                        <p className="title" onClick={()=> navigate(`/product/${product._id}`)}>{product.title}</p>
                        <span className="text-muted">{product.categories}</span>
                     </div>
                  </a>
               </div>

               <div className="col-auto">
                  <div className="input-group input-spinner">
                     <button className="btn btn-light" type="button" onClick={decreaseQty}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#999" viewBox="0 0 24 24">
                           <path d="M19 13H5v-2h14v2z"></path>
                        </svg>
                     </button>
                     <input type="text" className="form-control" value={qty} />
                     <button className="btn btn-light" type="button" onClick={increaseQty}  >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#999" viewBox="0 0 24 24">
                           <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                        </svg>
                     </button>
                  </div>

               </div>

               <div className="col"> {product.type} : <strong className="price"> $ {product.price}</strong>  </div>
               <div className="col text-end">
                  <a className="btn btn-icon btn-light" onClick={() => removeProduct(product)} >
                     <FaTrashAlt color='red' /> </a> </div>
            </div>

         </article>
      </div>
   )
}
