import React , { useState , useEffect} from 'react'

import Box from '../../../../Components/Box';
import api from '../../../../utils/fetcher';

const imageAvatar = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.8F97-4tTe0kDw2M0XktW8gHaHZ%26pid%3DApi&f=1";

export default function AccountTab() {
   const [currentUser, setCurrentUser] = useState({
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      dob: '',
      avatar: ''
   })

   useEffect(() => {
      getMe()
   }, [])

   const getMe = async () => {
      const { data } = await api.get('user');
      const { status, user } = data;
      if (status) setCurrentUser({ ...user })
   }
   return (
      <Box>
         <Box className="card-body">
            <Box className="itemside align-items-center">
               <Box className="aside">
                  <img src={currentUser.avatar ?? imageAvatar} className="icon-md img-avatar" /> </Box>
               <Box className="info">
                  <h6 className="title">{currentUser.firstName + " " + currentUser.lastName}</h6>
                  <p>Email: {currentUser.email} <i className="dot"></i> Phone: {currentUser.phone} <a href="#" className="px-2"><i className="fa fa-pen"></i></a> </p>
               </Box>
            </Box>
            <hr />
            <p className="text-muted">Delivery addresses</p>
            <Box className="row g-2 mb-3">
               <Box className="col-md-6">
                  <article className="box"> <b className="mx-2 text-muted"><i className="fa fa-map-marker-alt"></i></b> { currentUser.address ?? "Tashkent city, Street name, Building 123, House 321"} </article>
               </Box>
            </Box>
            <a href="#" className="btn btn-outline-primary"> <i className="me-2 fa fa-plus"></i> Add new address </a>
            <hr />
            <p className="text-muted">Payment methods</p>
            <Box className="row g-2 mb-3">
               <Box className="col-md-6">
                  <article className="box"> <b className="mx-2 text-muted"><i className="fa fa-credit-card"></i></b> Visa •••• 9905, Exp: 12/21 </article>
               </Box>

            </Box>
            <a href="#" className="btn btn-outline-primary"> <i className="me-2 fa fa-plus"></i> Add payment method </a>
         </Box>
      </Box>
   )
}
