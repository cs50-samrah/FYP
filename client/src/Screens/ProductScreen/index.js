import React, { useEffect } from 'react';

// Custom Components
import Box from '../../Components/Box/index'
import Text from '../../Components/Text/index'
import Button from '../../Components/Button';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header/index'

// Images Import

import StarIcon from '../../Assets/Star.svg';



import api from '../../utils/fetcher'
import { BACKEND_URL } from '../../utils/constant'

// Custom Hooks
import useDimesions from '../../utils/useDimensions';
import useStore from '../../utils/store';

import { useLocation, useParams } from 'react-router-dom';
import ImageCarousal from '../../Components/ProductMultiImage/ImageCarousal';


// toast lib

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function ProductScreen() {

    const [, , isMobile] = useDimesions();

    const [topProducts, setTopProducts] = React.useState([]);

    const [product, setProduct] = React.useState(null);

    const [reviews, setReviews] = React.useState([]);

    const { id } = useParams()

    const { pathname } = useLocation()

    const addToCart = useStore(state => state.addProduct)

    const [ selected , setSelected ] =  React.useState({
        type : 'rent',
        price : 0,
    })


    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    React.useEffect(() => {
        document.title = 'Product'
        loadProductDetail()
        loadTopProducts()
        loadReviews()
    }, [])

    const loadTopProducts = async () => {
        const { data } = await api.get('product/all')
        const { status, products, } = data
        if (status) {
            setTopProducts(products)
        }
    }
    const loadProductDetail = async () => {
        const { data } = await api.get(`product/${id}`)
        const { status, product } = data
        if (status) {
            setProduct(product)
            setSelected({...selected , price : product.rent_price})
        }
    }
    const loadReviews = async () => {
        try {
        const { data } = await api.get(`/user/reviews/${id}`)
        const { status, review } = data
        if (status) {
            setReviews(review)
        }
                    
    } catch (error) {
            
    }
    }

    const addtoWishList = async () => {
        const { data } = await api.post('user/wishlist', {
            productId: product._id
        });
        const { status, message } = data;
        if (status) {
            toast('Added To wishList')
        }else{
            toast(message)
        }
    }

    const handleChange = (type , price) => {

        setSelected({ type , price })
    }

    useEffect(()=>{
        console.log(selected)
    },[selected])


    return (<Box   >
        <Box id="HeroSection" display={'flex'} flexDirection={'column'} flex bg={'#F7F3F0'} >

            <Header />

        </Box>
        <ToastContainer />

        {/* PRODUCT */}
        <Box w={'100%'} display={'flex'} justifyContent={'center'} flexWrap={'wrap'} style={{ minHeight: '600px' }} >

            {product && <ImageCarousal product={product} />}

            <Box pl={10} w={isMobile ? '100%' : '40%'} display={'flex'} flexDirection={'column'} padding={8} justifyContent={'center'} >
                <Text fontSize={'2em'} color={'var(--text-orange)'} fontFamily={'kids'} >{product?.title}</Text>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                     defaultChecked={selected.type === 'rent'}
                     onChange={()=> handleChange('rent' , product?.rent_price)}
                    />
                    <Text fontWeight={'bold'} fontSize={18} >
                        {product?.rent_price}$  Rent / Monthly
                    </Text>

                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                     id="flexRadioDefault2" 
                     onChange={()=> handleChange('purchase' , product?.purchase_price)}
                     />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        <Text fontWeight={'bold'} fontSize={18} >
                            {product?.purchase_price}$ Retail Price
                        </Text>
                    </label>
                </div>
                <Box>
                    <Text>
                        {product?.description?.substring(0, 400)}..
                    </Text>
                </Box>
                <Box>
                    <Button
                     onClick={()=> {
                        console.log(selected)
                        addToCart({...product , ...selected})
                        toast('Product Added To Cart')
                     }}
                    >
                        Add to Cart
                    </Button>
                    <Button style={{
                        marginLeft: '10px'
                    }}
                        onClick={addtoWishList}
                    >
                        Add To Wishlist
                    </Button>
                </Box>
            </Box>

        </Box>



        {/* RELATED PRODUCTS  */}
        <Box h={'auto'} className={'bg-topcollection'} mt={'1em'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
            <Text mb={'0.4em'} fontFamily={'Kids'} fontSize={'2em'} color={'var(--text-orange)'} >Related Products</Text>
            <Text >Lorem Ipsum, Once a Ipsum always a Ipsum</Text>
            <Box w={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexWrap={isMobile ? 'wrap' : null} >
                {topProducts.map(tproduct => <TopCollectionCard product={tproduct} key={tproduct._id} />)}
            </Box>
        </Box>




        {/* REVIEW */}
        <Box h={400} mt={'1em'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
            <Text mb={'0.4em'} fontFamily={'Kids'} fontSize={'2em'} color={'var(--text-orange)'} >Happy Customer</Text>
            <Box w={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexWrap={isMobile ? 'wrap' : null} >
             
                {reviews.map(review =>{
                    return    <ReviewCard review={review} />
                })}
            </Box>
        </Box>

        {/* FOOTER */}
        <Footer />
    </Box>);
}

export default ProductScreen;



const TopCollectionCard = ({ product }) => {
    return <Box
        className={'collection-box'}
        bg={'white'} style={{
            padding: '8px'
        }}
        ml={8} mb={8} rounded={8}
        w={'18rem'}
    >
        <img src={BACKEND_URL + product.thumbnail} width={'200px'} />
        <Box padding={8} >
            <Text fontSize={'1.4em'} fontWeight={'bold'} >{product?.title?.length ? product?.title.substr(0, 20) + "..." : product?.title}</Text>
            <Text lineHeight={'1px'} fontSize={'0.8em'} color={'gray'} >Rent Price starting from</Text>
            <Text fontWeight={'bold'} >${product.rent_price}</Text>
            <Text lineHeight={'1px'} fontSize={'0.8em'} color={'gray'} >Retail Price</Text>
            <Text fontWeight={'bold'} >${product.purchase_price}</Text>
        </Box>
    </Box>
}

const ReviewCard = ({ review }) => {
    const [width, height, isMobile] = useDimesions();
    const arr = new Array(review.rating).fill(0);
    return <Box mt={20} w={isMobile ? '100%' : '20%'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} ml={6} style={{ padding: 8 }}>
        <Box display={'flex'}  >
            {arr.map(i =>     <img src={StarIcon} /> )}
        </Box>
        <Box>
            <Text textAlign={'center'} mb={10} mt={15} >{review?.comment}</Text>
            <Text textAlign={'center'} color={'gray'} >{review?.user?.firstName}</Text>
        </Box>
    </Box>
}

