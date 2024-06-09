import React, { useState, useEffect } from 'react'
import Box from '../../../../Components/Box';
import api from '../../../../utils/fetcher'
const imageAvatar = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.8F97-4tTe0kDw2M0XktW8gHaHZ%26pid%3DApi&f=1";

export default function EditProfile() {

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

   const OnChangeText = (e) => {
      const { name, value } = e.target;
      setCurrentUser({ ...currentUser, [name]: value })
   }

   const onSubmit = async () =>{
      //   alert(JSON.stringify(currentUser , null , 4 ))
      const { data } = await api.post('/user/update' , currentUser);
      const { user } = data
      if(user.modifiedCount){
         alert('updated')
      }
   }

   return (
      <Box>
         <Box className="card-body">
            <form onSubmit={(e) => e.preventDefault()} >
               <Box className="row">
                  <Box className="col-lg-8">
                     <Box className="row gx-3">
                        <Box className="col-6 mb-3"> <label className="form-label">First name</label>
                           <input className="form-control" type="text" value={currentUser.firstName} name='firstName' placeholder="Type here" onChange={OnChangeText} /> </Box>

                        <Box className="col-6 mb-3"> <label className="form-label">Last name</label>
                           <input className="form-control" type="text" value={currentUser.lastName} name='lastName' placeholder="Type here" onChange={OnChangeText} /> </Box>

                        <Box className="col-lg-6 col-md-6 mb-3"> <label className="form-label">Email</label>
                           <input className="form-control" type="email" value={currentUser.email} name='email' placeholder="example@mail.com" onChange={OnChangeText} /> </Box>

                        <Box className="col-lg-6 col-md-6 mb-3"> <label className="form-label">Phone</label>
                           <input className="form-control" type="tel" placeholder="+1234567890" value={currentUser.phone} name='phone' onChange={OnChangeText} /> </Box>

                        <Box className="col-lg-12 mb-3"> <label className="form-label">Address</label>
                           <input className="form-control" type="text" placeholder="Type here" value={currentUser.address} name='address' onChange={OnChangeText} /> </Box>

                        <Box className="col-lg-6 col-6 mb-3"> <label className="form-label">Birthday</label>
                           <input className="form-control" type="date" value={currentUser.dob} name='dob' onChange={OnChangeText} /> </Box>

                     </Box>

                  </Box>

                  <aside className="col-lg-4">
                     <Box className="text-lg-center mt-3">
                        <img className="img-lg mb-3 img-avatar" src={currentUser.avatar ?? imageAvatar} alt="User Photo" />
                        <Box> <a className="btn btn-sm btn-light" href="#"> <i className="fa fa-camera"></i> Upload </a> <a className="btn btn-sm btn-outline-danger" href="#"> <i className="fa fa-trash"></i> </a> </Box>
                     </Box>
                  </aside>

               </Box>
               <br /> 
               <button className="btn" 
               style={{ background: 'var(--text-orange)', color: 'white' }}
                 onClick={onSubmit}  >Save changes</button>
            </form>
            <hr className="my-4" />
            <Box className="row" style={{ maxWidth: "920px" }}>
               <Box className="col-md">
                  <article className="box mb-3 bg-light">
                     <a className="btn float-end btn-light btn-sm" href="#">Change</a>
                     <p className="title mb-0">Password</p>
                     <small className="text-muted d-block" style={{ width: "70%" }}>You can reset or change your password by clicking here</small>
                  </article>
               </Box>

               <Box className="col-md">
                  <article className="box mb-3 bg-light">
                     <a className="btn float-end btn-outline-danger btn-sm" href="#">Deactivate</a>
                     <p className="title mb-0">Remove account</p>
                     <small className="text-muted d-block" style={{ width: "70%" }}>Once you delete your account, there is no going back.</small>
                  </article>
               </Box>

            </Box>

         </Box>
      </Box>
   )
}
