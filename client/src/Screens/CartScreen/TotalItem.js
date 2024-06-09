import React, { useState } from 'react'
import useStore from '../../utils/store';
import { useNavigate } from 'react-router-dom';


export default function ItemTotal() {
    const items =  useStore(state => state.products)
    const [total , setTotal] = React.useState(0);
    const [totalWithTax , settotalWithTax] = React.useState(0);

    const navigate = useNavigate();

    React.useEffect(()=>{
      var calculate = 0;
        items.forEach(item =>{
            calculate += item._qty * item.price;
            setTotal(calculate) 
        })
        settotalWithTax(calculate + +(0.10 * calculate).toFixed(2) )
        if(items.length === 0){
         setTotal(0) 
        }
    },[items])
  return (
    <div><aside >
    <div className="card mb-3">
       <div className="card-body">
          <form  onSubmit={(e)=> e.preventDefault()}>
             <label className="form-label">Have coupon?</label> 
             <div className="input-group">
                  <input type="text" className="form-control" placeholder="Coupon code" /> 
                  <button className="btn btn-light">Apply</button> </div>
          </form>
       </div>
       
    </div>

    <div className="card">
       <div className="card-body">
          <dl className="dlist-align">
             <dt>Total price:</dt>
             <dd className="text-end"> ${total}</dd>
          </dl>
     
          <dl className="dlist-align">
             <dt>TAX: <span>10%</span> </dt>
             <dd className="text-end text-danger"> + ${(0.10 * total).toFixed(2)} </dd>
          </dl>
          <hr />
          <dl className="dlist-align">
             <dt>Total:</dt>
             <dd className="text-end text-dark h5"> ${totalWithTax} </dd>
          </dl>
          <div className="d-grid gap-2 my-3"> 
          <a className="btn btn-primary w-100" onClick={()=> navigate('/checkout')} > Make Purchase </a> 
          <a className="btn btn-light w-100"> Back to shop </a> </div>
       </div>
       
    </div>

 </aside></div>
  )
}
