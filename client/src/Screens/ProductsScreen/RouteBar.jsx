import React, { useState } from 'react'
import { Link } from 'react-router-dom';


export default function RouteBar({ route, sharedValue, setSharedValue }) {


   React.useEffect(() => {
      if (sharedValue) {
         document.getElementById("listView").classList.remove("active")
         document.getElementById("GridView").classList.add("active");
      } else {
         document.getElementById("GridView").classList.remove("active")
         document.getElementById("listView").classList.add("active");
      }
   }, [sharedValue])

   return (
      <div>
         <div className="card">
            <div className="card-body d-lg-flex align-items-center">
               <nav className="mb-3 mb-lg-0">
                  <ol className="breadcrumb mb-0">
                     <li className="breadcrumb-item"> <Link to={'/'} >Home</Link> </li>
                     <li className="breadcrumb-item active"> <a href="#">Category</a> </li>
                     {route && <li className="breadcrumb-item active"> <a href="#">{route}</a> </li>}
                     <li className="breadcrumb-item active">Items</li>
                  </ol>
               </nav>

               <div className="ms-auto">
                  <div className="d-inline-flex align-middle dropdown">
                     <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false"> Filter by </button>
                     <nav className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenu2"> <a className="dropdown-item" href="#">Dropdown link</a> <a className="dropdown-item" href="#">Dropdown link</a> </nav>
                  </div>

                  <div className="btn-group mx-2">
                     <a className="btn btn-light active" id='listView' data-bs-toggle="tooltip" title="List view" onClick={() => setSharedValue(false)} >
                        <i class='bx bx-list-ul py-1' style={{ fontSize: 20 }}></i> </a>
                     <a className="btn btn-light " id='GridView' data-bs-toggle="tooltip" title="Grid view" onClick={() => setSharedValue(true)}>
                        <i class='bx bxs-grid py-1' style={{ fontSize: 20 }}></i> </a>
                  </div>

               </div>
            </div>

         </div>
      </div>
   )
}
