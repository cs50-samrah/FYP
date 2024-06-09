import React, { useEffect } from 'react'
import ProductForm from "./ProductForm"
import api from '../../../../../utils/fetcher'
import { useNavigate } from 'react-router-dom'
export default function AddProduct() {
 
  const navigate = useNavigate()

  useEffect(()=>{
   (async ()=>{
    const { data } = await api.get('/user')
    const { status } = data
    if(!status){
      alert('You Need To be Logged In Before Creating A Listing')
      navigate('/')
      return;
    }
   })()
  },[])
 
  return (
    <div>
        <ProductForm />
    </div>
  )
}
