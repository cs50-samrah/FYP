
import Box from "../../Components/Box"
import Header from "../../Components/Header"
import RouteBar from "./RouteBar"
import FilterSideBar from './FilterSideBar'
import { useParams, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../../utils/fetcher"
import GridItem from "./GridItem"
import ListItem from "./ListItem"
import useStore from '../../utils/store';


import cart from './cart.jpg'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductsScreen() {

    const params = useParams()
    const query = useSearchParams()
    const { id, name } = params
    const q = query[0].get('q')

    const [sharedValue, setSharedValue] = useState(false);
    const [products, setProducts] = useState([])
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(0)

    const addToCart = useStore(state => state.addProduct)


    useEffect(() => {
        LoadProducts()
    }, [q, id])

    const LoadProducts = async () => {
        if (q) {
            const { data } = await api.get(`/filter/search/${encodeURIComponent(q)}`)
            if (data.status) {
                setProducts(data.products)
            }
            return;
        }
        if (id) {
            const { data } = await api.get(`/filter/${encodeURIComponent(name)}`)
            if (data.status) {
                setProducts(data.products)
            }
            return;
        }
        const { data } = await api.get('/product/all')
        if (data.status) {
            setProducts(data.products)
        }
    }

    const AddProductToCart = async (product) => {
        console.log(product)
        addToCart({ ...product, type: 'rent', price: product.rent_price })
        toast('Added to cart')
    }
    const AddProductToWishList = async (product) => {
        const { data } = await api.post('user/wishlist', {
            productId: product._id
        });
        const { status, message } = data;
        if (status) {
            toast('Added To wishList')
        } else {
            toast(message)
        }
    }
    const ApplyPricefilter = async () => {

        if (minPrice === 0 && maxPrice === 0) return toast.warn('Please Add Some Min & Max Values');
        console.log(minPrice,maxPrice)
        if (Number(maxPrice) > Number(minPrice)) {
            const { data } = await api.get(`/filter/price/${minPrice}/${maxPrice}`)
            console.log(data)
            if (data.status) {
                setProducts(data.products)
            }
        }else{
            toast.warn('Max Price Should Be Greater Than Min Price')
        }
    }

    return (<Box>
        <Box id="HeroSection" display={'flex'} flexDirection={'column'} flex bg={'#F7F3F0'} >
            <Header />
        </Box>
        <ToastContainer />
        <div className='container  mt-5 mb-5'>
            <RouteBar route={id ? name : null} setSharedValue={setSharedValue} sharedValue={sharedValue} />
            <div className='row mt-2'>
                <div className='col-lg-3'>
                    <FilterSideBar ApplyPricefilter={ApplyPricefilter} setMaxPrice={setMaxPrice} setMinPrice={setMinPrice} />
                </div>
                {products.length === 0 && <div className="col-lg-9">
                    <div className='card card-body mb-3' style={{ alignItems: "center", justifyContent: "center" }}>
                        <h3>No Product Found</h3>
                        <img src={cart} alt="No items in cart" style={{ width: 250, height: 250 }} />
                    </div>
                </div>}
                {
                    sharedValue ? <div className='col-lg-9'>
                        <div className='row' >
                            {products.map((p, i) => <GridItem key={i} product={p} AddProductToCart={AddProductToCart} AddProductToWishList={AddProductToWishList} />)}
                        </div>
                    </div> :
                        <div className='col-lg-9'>
                            {products.map((p, i) => <ListItem key={i} product={p} AddProductToWishList={AddProductToWishList} AddProductToCart={AddProductToCart} />)}
                        </div>

                }
            </div>
        </div>
    </Box>
    )
}