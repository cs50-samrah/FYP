
import Text from "../Text";
import Box from "../Box"
import Button from "../Button";
import useDimesions from "../../utils/useDimensions"

import Search from '../../Assets/search.png'
import SocialIcons from '../../Assets/SocialIcons.png'
import Sun from '../../Assets/sun.png'
import Star from '../../Assets/star.png'
import WishList from '../../Assets/wishlist.png'
import Cart from '../../Assets/cart.png'
import { useNavigate } from "react-router-dom";
import useStore from "../../utils/store";
import { useEffect, useState } from "react";
import api from "../../utils/fetcher";
import { Link } from "react-router-dom";

export default function Header() {
    const [width, height, isMobile] = useDimesions();
    const history = useNavigate()
    const products = useStore(state => state.products)
    const [categories, setCategories] = useState([])



    useEffect(() => {

        loadCategorys()
    }, [])

    const loadCategorys = async () => {
        const { data } = await api.get('/admin/categories')
        if (data.status) {
            setCategories(data.categories)
        }
    }

    return <Box>
        {/* Nav*/}
        <Box id={'navbar'} pt={4} display={'flex'} alignItems={'center'} justifyContent={'space-between'} w={'100%'} p={14} >
            {/* Social Icons */}
            <img src={SocialIcons} style={{ height: 30 }} />
            <Box mt={isMobile ? '1em' : null} id={'nav-center'}
                flexWrap={isMobile ? 'wrap' : null}
                display={'flex'} justifyContent={'center'} alignItems={'center'}  >

                <Box className={'boxNav'} mr={10} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}
                onClick={() => history('/aboutus')} 
                >
                    <img src={Star} alt='star Image' />
                    <Text fontWeight={'bold'} >About Us</Text>
                </Box>
                {/* <img src={Name} alt='Logo' height={60} id='LogoName' /> */}
                <Text fontSize={isMobile ? '1.4em' : '2em'} fontFamily={'Kids'} fontWeight={'bold'} color={'var(--text-orange)'} >Kids Good Hub</Text>
               
                <Box w={isMobile ? '100%' : null} className={'boxNav'} mr={10} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} onClick={() => history('/cart')} >
                    <img src={Cart} alt='star Image' />
                    <Text fontWeight={'bold'} >Cart  <span className="badge bg-danger" >{products.length}</span> </Text>
                </Box>
            </Box>
            <Box display={'flex'} id={'Search_box'} >
                {/* Search Box */}
                <Box mr={5}
                    bg={'white'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    rounded={8}
                    padding={4} >
                    <img src={Search} alt='search Icon' width={20} />
                    <form action="/search" method="get" >

                        <input type='text' name="q" placeholder='Search' style={{
                            border: 'none'
                        }} >

                        </input>
                    </form>
                </Box>
                <Button onClick={() => history('/product/add')} >
                    Rent Or Sell
                </Button>
            </Box>

        </Box>
        {/* SubNav */}
        <Box id={'SubNav'} className={'header-main'} display={'flex'} justifyContent={'center'} >
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexWrap={'wrap'} >
                <Link to={'/'} >Home</Link>
           
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Category
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        {categories.map(item => <li key={item._id}><Link to={`/category/${item?._id}/${encodeURIComponent(item?.cat_name)}`} class="dropdown-item" >{item?.cat_name}</Link></li>)}
                    </ul>
                </li>

                <Link to={'/products'} >Products</Link>

                <Link to={'/account'} >Account</Link>
                <Link to={'/account?page=wishlist'}  >WishList</Link>
            </Box>

        </Box>

    </Box>
}