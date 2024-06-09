import React, { useEffect } from 'react'
import UnitPriceSelection from "./UnitPriceSelection"
import Categories from "./Categories"
import ThumbnailImage from "./ThumbnailImage"
import ExtraImages from "./ExtraImages"
import Box from '../../../../../Components/Box'

import api from '../../../../../utils/fetcher'
import { useNavigate } from 'react-router-dom'

const initialState = {
   title: '',
   rent_price: '',
   purchase_price: '',
   discount: '',
   qty: '',
   thumbnail: '',
   brand: '',
   images: [],
   description: '',
   categories: '',
}

export default function ProductForm() {


   const [product, setProduct] = React.useState(initialState)
   const [brands, setBrands] = React.useState([])

   const router = useNavigate()

   const onChange = (e) => {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: value })
   }

   const onSubmit = async () => {

      if (!isKeyValid('title')) {
         alert('Title is Required')
         return;
      }
      if (!isKeyValid('description')) {
         alert('description is Required')
         return;
      }
      if (!isKeyValid('thumbnail')) {
         alert('thumbnail is Required')
         return;
      }
      if (!isKeyValid('brand')) {
         alert('Please Select Brand is Required')
         return;
      }
      if (product.qty !== null && product.qty == 0) {
         alert('Quantity is Required')
         return;
      }

      const { data } = await api.post('/user/create/product', product)
      const { status, message } = data;
      if (status) {
         setProduct(initialState)
         window.history.back()
      } else {
         alert(message)
      }

   }
   const isKeyValid = (_s) => {
      console.log('[DEBUG] ', product[_s])
      if (product[_s] == null) {
         return false;
      }
      if (product[_s] == '') {
         return false;
      }
      if (product[_s].length < 4) {
         return false;
      }
      return true;
   }

   useEffect(() => {
      loadBrands()
   }, [])

   const loadBrands = async () => {
      const { data } = await api.get('/admin/brands');
      if (data.status) {
         setBrands(data.brands)
      }
   }

   return (
      <Box>
         <Box className="card mb-4">
            <article className="card-body">
               <h4 className="mb-4">Submit product</h4>
               <form onSubmit={(e) => e.preventDefault()} >


                  <UnitPriceSelection product={product} onChange={onChange} />
                  <ThumbnailImage onchangeUrl={(e) => {
                     setProduct({ ...product, thumbnail: e.url })
                  }} />
                  <ExtraImages onChange={(images) => {
                     setProduct({ ...product, images })
                  }} />

                  <Box className="row mb-4">
                     <label className="col-3 col-form-label">Description</label>
                     <Box className="col-9">
                        <textarea className="form-control" placeholder="Type here" rows={10} name='description' value={product.description} onChange={onChange} ></textarea>
                     </Box>

                  </Box>
                  <Box className="row mb-4">
                     <label className="col-3 col-form-label">Brand</label>
                     <Box className="col-9">
                        <select class="form-select" aria-label="Default select example" name='brand' value={product.brand} onChange={onChange} >
                           {brands.map(brand =>  <option value={brand.brand_name}>{brand.brand_name}</option>)}
                        </select>
                     </Box>
                  </Box>
                  <Categories product={product} onChange={onChange} />
                  <Box className="row mb-2">
                     <Box className="col-9 offset-3">
                        <button className="btn btn-primary" onClick={onSubmit} >Add product</button>
                        <button type="reset" className="btn btn-outline-danger">Cancel</button>
                     </Box>
                  </Box>

               </form>

            </article>

         </Box>
      </Box>
   )
}
