import React, { Children } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'wc-toast';
import { BACKEND_URL } from '../../utils/constant'

export default function GridProduct({ product ,children }) {
    const history = useNavigate();
    const random = (v) => Math.floor((Math.random() * v) + 1)
    const price = random(300)
    const addToCart = () => {
        toast.success('added To Card success');
    }
    return (
        <div className="col-lg-3 col-sm-6 col-12"  >
            <div className="card card-product-grid" >
                <div className="img-wrap" onClick={() => history("/view/1/")}>
                    <img src={`${BACKEND_URL}${product.thumbnail}`} />
                </div>
                <div className="info-wrap border-top">
                    <div className="price-wrap"> <strong className="price">${product.purchase_price}</strong> </div>

                    <p className="title mb-2">{product.title}</p>
                   {children}
                </div>
            </div>

        </div>
    )
}
