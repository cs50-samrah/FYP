


import useDimesions from "../../../../utils/useDimensions";

import Text from "../../../../Components/Text";
import Box from "../../../../Components/Box";
import Footer from "../../../../Components/Footer";
import Header from "../../../../Components/Header";
import SideBar from "./SideBar";
import loginImage from "../../../../Assets/login.png"

import { useNavigate, Link } from "react-router-dom";
import { useCookies } from 'react-cookie'



export default function AccountHome() {
    const [cookies, removeCookie] = useCookies();

    return <Box>
        <Header />
        {
            cookies.token ? (<Box  >

                <Box className='container mt-5 mb-5'>
                    <Box className='row'>
                        <Box className='col-lg-12'>
                            <SideBar />
                        </Box>
                    </Box>

                </Box>
                <Box style={{ textAlign: "center" }}>
                    {/* <p> Seller?<a className='btn btn-primary' href='/seller/'>Visit</a> Seller panel</p> */}
                </Box>
            </Box>) : <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} h={'60vh'} >
                <img src={loginImage} alt="Login Image" width={'300'} height={'450'} />
                <p>Please <Link to={'/login'} >Signin</Link>  To continue </p>
            </Box>
        }
        <Footer />
    </Box>
}