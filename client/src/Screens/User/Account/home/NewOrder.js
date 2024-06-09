import React, { useEffect } from 'react'
import Box from '../../../../Components/Box'
import Camera from '../../../../Assets/camera.jpg'
import api from '../../../../utils/fetcher'
import { BACKEND_URL } from '../../../../utils/constant'

export default function NewOrders() {

   const [orders, setOrders] = React.useState([])

   const [selected, setSelected] = React.useState([])

   const [comment, setComment] = React.useState('')
   const [rating, setRating] = React.useState(1)
   const [product, setProduct] = React.useState(null)



   useEffect(() => {
      fetchOrders()
   }, [])

   const fetchOrders = async () => {
      try {
         const { data } = await api.get('/user/orders')
         const { status } = data
         if (status) {
            setOrders(data.orders)
         }
         console.log(data)

      } catch (error) {

      }
   }
   const CancelOrder = async (id) => {
      try {

         const { data } = await api.put('/user/order/cancel/' + id)
         setOrders(orders.filter(order => order._id !== id))
      } catch (error) {

      }
   }

   const addReview = async () => {
      if(!product){
         alert('Product Not Selected For Review')
         return;
      }
      if(comment.length < 4){
         alert('comment Too Small')
         return;
      }
      
  
         try {
            const { data } = await api.post('/user/review', {
               product,
               comment,
               rating
            })
            console.log(data)
         } catch (error) {

         }

   }

   return (
      <Box w={'100%'} >


         {orders.map(order => {
            return <Box className="card-body" w={'100%'} key={order._id} >
               <header className="d-md-flex">
                  <Box className="flex-grow-1">
                     <h6 className="mb-3"> Order ID: {order.orderid} <i className="dot"></i><span className={order.status === 'approved' ? "text-primary" : "text-danger"}> {order.status} </span> </h6>
                     <span>Date: <span style={{ fontWeight: 'bolder' }} > {new Date(order.orderDate).toDateString()} </span> </span>
                     <span>Delivery Status: <span style={{ fontWeight: 'bolder' }} className={order.delivery_status === 'shipping' ? 'text-success' : 'text-dark'} > {order?.delivery_status} </span> </span>
                  </Box>
                  <Box>
                     {order.status !== "approved" ?
                        (order.status !== "canceled" ?
                           <a onClick={() => CancelOrder(order._id)} className="btn btn-sm btn-outline-danger">Cancel order</a>
                           : null) : null
                     }
                     {order.status === 'approved' &&
                        <a className="btn btn-sm btn-outline-success"
                           data-bs-toggle="modal"
                           data-bs-target="#exampleModal"
                           onClick={() => {
                              setSelected(order)
                              console.log(order)
                           }}
                        >Give Review</a>}
                  </Box>
               </header>
               <hr />

               <Box className="row">
                  <Box className="col-md-4">
                     <p className="mb-0 text-muted">Contact</p>
                     <p className="m-0"> {order.contact.firstName} {order.contact.lastName} <br /> Email: {order.contact.email} </p>
                  </Box>

                  <Box className="col-md-4 border-start">
                     <p className="mb-0 text-muted">Shipping address</p>
                     <p className="m-0"> {order.shipping_address.country} <br /> {order.shipping_address.address} </p>
                  </Box>

                  <Box className="col-md-4 border-start">
                     <p className="mb-0 text-muted">Payment</p>
                     <p className="m-0"> <span className="text-success"> Visa **** 0932 </span>  <br /> Total paid: ${order.total_amount} </p>
                  </Box>

               </Box>

               <hr />
               <ul className="row">
                  {order.products.map(product => {
                     return <li className="col-lg-4 col-md-6">
                        <Box className="itemside mb-3">
                           <Box className="aside"> <img width="72" height="72" src={`${BACKEND_URL}${product.thumbnail}`} className="img-sm rounded border" /> </Box>
                           <Box className="info">
                              <p className="title">{product.title}</p>
                              <strong>  ${product.rent_price}</strong>
                           </Box>
                        </Box>
                     </li>
                  })}

               </ul>
            </Box>
         })}


         <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
               <div class="modal-content">
                  <div class="modal-header">
                     <h5 class="modal-title" id="exampleModalLabel">Review {selected?.title}</h5>
                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                     <br />
                     <label >Product : </label>
                     <select className='mb-3' onChange={(e) => {
                        setProduct(e.target.value)
                        console.log(e.target.value)
                     }}>
                        <option value="-1">Select</option>
                        {selected?.products?.map(review => {
                           return <option value={review._id}>{review.title} </option>
                        })}
                     </select>
                     <br />
                     <label htmlFor="review_comment">Review</label>
                     <textarea type="text" id='review_comment' className="form-control my-3"
                        placeholder="Enter your review"
                        onChange={(e) => setComment(e.target.value)}
                     />
                     <label htmlFor="review_comment">Rating(1-5)</label>
                     <input type="number" min={1} max={5}
                        value={rating}
                        onChange={(e) => {
                           const n = Number(e.target.value)
                           if (n >= 1 && n <= 5) {
                              setRating(n)
                           }
                        }}
                        className="form-control" placeholder="Enter your rating" />
                  </div>
                  <div class="modal-footer">
                     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                        onClick={addReview}
                     >Save changes</button>
                  </div>
               </div>
            </div>
         </div>
      </Box>
   )
}
