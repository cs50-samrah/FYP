import React from 'react';

// Custom Components
import Box from '../../Components/Box/index'
import Text from '../../Components/Text/index'
import Footer from '../../Components/Footer';
import Header from '../../Components/Header/index'

// Images Import

import Search from '../../Assets/search.png'

import Collection1 from '../../Assets/collection1.png'
import Offer1 from '../../Assets/offer1.svg'
import Offer2 from '../../Assets/offer2.svg'

import Category1 from '../../Assets/catgeory1.png'

import Baby from '../../Assets/baby.png'
import Rainbow from '../../Assets/rainbow.png'
import BookReader from '../../Assets/BookReader.svg'
import BabyHeaderLeft from '../../Assets/baby-header-left.png'
import HERO from '../../Assets/Hero.svg'
import StarIcon from '../../Assets/Star.svg';


// css
import './Home.css'
import api from '../../utils/fetcher'
import { BACKEND_URL } from '../../utils/constant'

// Custom Hooks
import useDimesions from '../../utils/useDimensions';
import { useNavigate , Link } from 'react-router-dom';


function HomeScreen() {

    const [width, height, isMobile] = useDimesions();

    const [topProducts, setTopProducts] = React.useState([]);
    const [reviews, setReviews] = React.useState([]);
    const [categories, setCategory] = React.useState([]);


    React.useEffect(() => {
        document.title = 'HomePage'
        loadTopProducts()
        loadTopReviews()
        loadTopCategories()
    }, [])

    const loadTopProducts = async () => {
        const { data } = await api.get('product/all')
        const { status, products, } = data
        if (status) {
            setTopProducts(products.slice(0,3))
        }
    }
    const loadTopReviews = async () => {
        const { data } = await api.get('reviews')
        const { status, reviews} = data
        if (status) {
            setReviews(reviews)
        }
    }
    const loadTopCategories = async () => {
        const { data } = await api.get('admin/categories')
        const { status, categories} = data
        if (status) {
            setCategory(categories)
        }
    }




    return (<Box   >
        <Box id="HeroSection" display={'flex'} flexDirection={'column'} flex bg={'#F7F3F0'} >

            <Header />

            {/* Hero */}

            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}
                flexWrap={isMobile ? 'wrap' : null}
                p={15}
            >
                <Box w={isMobile ? '100%' : '50%'}

                    p={10}
                    display={'flex'}
                    flexDirection={'column'}
                    // justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Text fontSize={isMobile ? '1rem' : '2rem'}
                        fontWeight={'bold'}
                        color={'#DB915E'}
                        fontFamily={'kids'}
                        w={isMobile ? '80%' : '60%'}
                    >All The Things Your Kid Needs, 'Til They Don't.</Text>
                    <Text w={isMobile ? '80%' : '60%'} >Lorem ipsum is placeholder text commonly used in the graphic</Text>
                    {/* <button style={{
                        color: 'white',
                        border: 'none',
                        background: '#DB915E',
                        borderRadius: 8,
                        padding: 12,
                        minWidth: '140px'
                    }} >Buy Now
                    </button> */}
                    <Box
                        bg={'#DB915E'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        rounded={'35px'}
                        w={isMobile ? '90%' : '70%'}
                        className={'hero_child'}
                    >
                        <img src={Search} alt='search Icon' width={20} style={{
                            background: 'white',
                            padding: 4,
                            borderRadius: 12,
                            marginRight: 12
                        }} />
                        <Text color={'white'} mt={0} mb={0} ml={0} mr={10} >Find Your Product</Text>
                        <form action="/search" method="get" >

                            <input type='text' name="q" placeholder='Search' style={{
                                border: 'none'
                            }} >
                            </input>
                        </form>
                    </Box>
                </Box>
                <Box w={isMobile ? '100%' : '50%'}  >
                    <img src={HERO} width={'100%'} height={'100%'} />
                </Box>
            </Box>

        </Box>





        <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexWrap={isMobile ? 'wrap' : null}
            p={15}
        >
            <Box w={isMobile ? '100%' : '50%'}
                pt={'10%'}
                padding={10}
                display={'flex'}
                justifyContent={'center'}
                flexDirection={'column'}
                alignItems={'center'}
                position={'relative'}
            >
                <Box w={'80%'} position={'absolute'} left={0} top={-40} >
                    <img src={BabyHeaderLeft} height={isMobile ? 100 : 200} ></img>
                </Box>
                <Box w={'80%'} >
                    <img src={BookReader} ></img>
                </Box>
                <Text fontSize={'2em'} fontWeight={'bold'} w={isMobile ? '90%' : '80%'} >WHY BUY WHEN YOU CAN RENT?</Text>
                <Text
                    fontSize={isMobile ? '2rem' : '2.5rem'}
                    fontWeight={'bold'}
                    color={'var(--text-orange)'}
                    fontFamily={'kids'}
                    w={isMobile ? '90%' : '80%'}
                >
                    You're renting today's best accessories and toys for your child.
                </Text>
                <Text fontSize={'1.4em'} w={isMobile ? '90%' : '80%'} >We'll deliver your items exactly when you want, you can enjoy them as long as you like, and then we'll pick them back up when you're ready.</Text>

            </Box>
            <Box w={isMobile ? '100%' : '50%'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                position={'relative'}
                pt={'10%'}
            >

                <img src={Baby} style={{
                    maxHeight: '400px'
                }} ></img>
                <Box position={'absolute'} right={0} top={0}  >
                    <img src={Rainbow} width={isMobile ? 100 : 200} ></img>
                </Box>
            </Box>

        </Box>

        {/* TOP COLLECTION  */}
        <Box h={'auto'} className={'bg-topcollection'} mt={'1em'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
            <Text mb={'0.4em'} fontFamily={'Kids'} fontSize={'2em'} color={'var(--text-orange)'} >Top Collection</Text>
            <Text >Lorem Ipsum, Once a Ipsum always a Ipsum</Text>
            <Box w={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexWrap={isMobile ? 'wrap' : null} >
                {topProducts.map(tproduct => <TopCollectionCard product={tproduct} />)}
            </Box>
        </Box>

        {/*  WE OFFER */}
        <Box mt={isMobile ? 10 : 40} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} >
            <Text mt={8} mb={isMobile ? 40 : 20} fontFamily={'Kids'} fontSize={'2em'} color={'var(--text-orange)'} >We Offer</Text>
            <Box style={{ padding: 8, paddingTop: 15, paddingBottom: 15 }} display={'flex'} justifyContent={'center'} alignItems={'center'} flexWrap={isMobile ? 'wrap' : null} >
                <Box w={isMobile ? '100%' : '50%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <img src={Offer1} width={'100%'} style={{ maxHeight: 400 }} ></img>
                </Box>
                <Box w={isMobile ? '100%' : '50%'} display={'flex'} justifyContent={'center'} alignItems={'center'} >
                    <img src={Offer2} style={{ maxHeight: 400 }} width={'90%'} ></img>
                </Box>
            </Box>
        </Box>

        {/* CATEGORY */}
        <Box h={'auto'} className={'bg-category'} mt={'1em'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
            <Text mb={'0.4em'} fontFamily={'Kids'} fontSize={'2em'} color={'var(--text-orange)'} >Category</Text>
            <Text >Explore All Categories For Kids</Text>
            <Box w={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}
             flexWrap={'wrap' } >
               {categories.map(category => <CategoryCard category={category} /> )}
            </Box>
        </Box>
        {/* REVIEW */}
        <Box h={400} mt={'1em'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
            <Text mb={'0.4em'} fontFamily={'Kids'} fontSize={'2em'} color={'var(--text-orange)'} >Happy Customer</Text>
            <Box w={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexWrap={isMobile ? 'wrap' : null} >
             { reviews.map(review => <ReviewCard  review={review} />)}
            </Box>
        </Box>

        {/* FOOTER */}
        <Footer />
    </Box>);
}

export default HomeScreen;



const TopCollectionCard = ({ product }) => {
    const history = useNavigate()
    return <Box
        className={'collection-box'}
        bg={'white'} style={{
            padding: '8px'
        }}
        ml={8} mb={8} rounded={8}
        w={'18rem'}
        h={'420px'}
        
        onClick={() => {
            history(`/product/${product._id}`, {
                preventScrollReset: false
            })
        }}
    >
        <img src={BACKEND_URL + product.thumbnail} width={'100%'} height={'200px'} />
        <Box padding={8} >
            <Text fontSize={'1.4em'} fontWeight={'bold'} >{product?.title?.length ? product?.title.substr(0, 20) + "..." : product?.title}</Text>
            <Text lineHeight={'1px'} fontSize={'0.8em'} color={'gray'} >Rent Price starting from</Text>
            <Text fontWeight={'bold'} >${product.rent_price}</Text>
            <Text lineHeight={'1px'} fontSize={'0.8em'} color={'gray'} >Retail Price</Text>
            <Text fontWeight={'bold'} >${product.purchase_price}</Text>
        </Box>
    </Box>
}
const CategoryCard = ({ category }) => {
    return <Box
        className={'collection-box'}
        style={{
            padding: '8px'
        }}
        ml={8} mb={8} rounded={8}

    >
        <img src={category?.thumbnail ?  BACKEND_URL+category?.thumbnail : Category1} width={'300px'} />
        <Box style={{ position: 'relative' }} padding={8} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} >
            <Text fontSize={'1.8em'} fontFamily={'Kids'} fontWeight={'bold'} color={'var(--text-orange)'} >{category.cat_name}</Text>
            <Text lineHeight={'1px'} fontSize={'0.8em'} color={'gray'} >Rent Price starting from</Text>
            <Link  
             to={`category/${category._id}/${category.cat_name}`}
            style={{
                color : 'var(--text-orange)',
                fontSize : '1.3em'
            }} > View More</Link>
            <Box position={'absolute'} bottom={'0px'} w={90} h={3} bg={'rgba(219,145,94,0.8)'} style={{
                filter: 'blur(2px)'
            }} ></Box>

        </Box>
    </Box>
}
const ReviewCard = ({ review }) => {
    const [width, height, isMobile] = useDimesions();
    const arr = new Array(review?.rating).fill(0);
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

