import React from 'react'
import AccountTab from "./AccountTab"
import NewOrders from "./NewOrder"
import EditProfile from "./EditProfile"
import AddProduct from './AddProduct/index'
import ProductListing from './ProductListing'
import Box from '../../../../Components/Box'
import WishlistTab from './wishlist/WishListTab'
import { useNavigate , useSearchParams } from 'react-router-dom';
import Text from '../../../../Components/Text'
import { useCookies } from 'react-cookie'

export default function SideBar() {
  const history = useNavigate()
  let [searchParams, setSearchParams] = useSearchParams();

  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  
  
    let page = searchParams.get("page")
    console.log(page)
  return (
    <Box>
      <Box className="d-flex align-items-start account-tab" >
        <Box className="nav flex-column nav-pills me-3 account-tab" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <a className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
          <a className="nav-link" id="v-pills-new-order-tab" data-bs-toggle="pill" data-bs-target="#v-pills-products" type="button" role="tab" aria-controls="v-pills-products" aria-selected="false">My Products</a>
          <a className="nav-link" id="v-pills-new-order-tab" data-bs-toggle="pill" data-bs-target="#v-pills-new-orders" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Order History</a>
          <a className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-wishlist" type="button" role="tab" aria-controls="v-pills-wishlist" aria-selected="false" onClick={()=> setSearchParams({
            page : 'wishlist'
          })} >Wishlist</a>
          <a className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile Settings</a>
          <a className="btn btn-danger" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false"
            onClick={()=>{
              removeCookie('token')
              history('/login')
            }}
          
          >Log Out</a>
        </Box>
        <Box className="tab-content" id="v-pills-tabContent">
          <Box className={`tab-pane fade ${ (page && page === 'wishlist') ? '' : 'show active' }`} id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
            <AccountTab />
          </Box>
          <Box className="tab-pane fade" id="v-pills-products" role="tabpanel" aria-labelledby="v-pills-products">
            <ProductListing />
          </Box>

          <Box className="tab-pane fade" id="v-pills-new-orders" role="tabpanel" aria-labelledby="v-pills-new-orders">
            <NewOrders />
          </Box>
          <Box className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
            <Box className='container'>
              <EditProfile />
            </Box>
          </Box>
          <Box className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">

          </Box>
          <Box className={`tab-pane fade ${ (page && page === 'wishlist') ? 'show active' : '' }`} id="v-pills-wishlist" role="tabpanel" aria-labelledby="v-pills-wishlist-tab">
            <WishlistTab />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
