import React from 'react';

// Custom Components
import Box from '../../Components/Box/index'
import Footer from '../../Components/Footer';
import Header from '../../Components/Header/index'
import CartItem from './CartItem';
import ItemTotal from './TotalItem';
import cart from './cart.jpg'
import useStore from '../../utils/store';


export default function CartScreen() {

    const products = useStore((state) => state.products)

    return <Box>
        <Box id="HeroSection" display={'flex'} flexDirection={'column'} flex bg={'#F7F3F0'} >

            <Header />
        </Box>
        <div className='container mt-5 mb-5'>
            <div className='row'> 
                <div className='col-lg-8'>
                    {
                        products.length > 0 ? products.map(product => <CartItem product={product} />)
                            : (
                                <div className='card card-body mb-3' style={{ alignItems: "center", justifyContent: "center" }}>
                                    <h3>No Items in Cart</h3>
                                    <img src={cart} alt="No items in cart" style={{ width: 250, height: 250 }} />
                                </div>
                            )
                    }

                </div>
                <div className='col-lg-4'>
                    <ItemTotal />
                </div>

            </div>

        </div>

        <Footer />
    </Box>
}