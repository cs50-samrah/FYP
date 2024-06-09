import React, { useState, useEffect } from "react";
import Box from "../../../../Components/Box";
import api from "../../../../utils/fetcher";
import GridProduct from '../../../../Components/ProductCard/index'
import useDimensions from '../../../../utils/useDimensions'

export default function ProductListing() {
    const [products, setProducts] = useState([])
    const [width, height, isMobile] = useDimensions();
    useEffect(() => {
        fetchProducts()
    }, [])
    const fetchProducts = async () => {
        const { data } = await api.get('/user/products')
        const { status, products } = data
        console.log(status && products)
        if (status) setProducts(products)
    }

    const removeProduct = async (id) => {
        const { data } = await api.post('/user/remove/product' , {id})
        if(data.status){
            window.location.reload()
        }

    }

    return <Box w={isMobile ? '60vw' : '70vw'} className={'row'} >


        {products.map(product => <GridProduct product={product} >
            <p className={`title mb-2 ${product.isPublished ? 'text-success' : 'text-primary'}`} >Status :  {product.isPublished ? 'published' : 'pending'}</p>
            <a className="btn btn-danger"
            onClick={()=> removeProduct(product._id)}
            >Remove</a>
        </GridProduct>)}

    </Box>
}