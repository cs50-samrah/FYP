import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Sidebar({ title, children }) {
    const history = useNavigate();

    const getIsAdminLogin = () => {
        const isLogin = window.localStorage.getItem('isLogin');
        return isLogin === 'true'
    }



    useEffect(() => {


        if (!getIsAdminLogin()) {
            const email = prompt("Please enter your email:");
            if (email === 'admin') {
                // Prompt the user for their password
                const password = prompt("Please enter your password:");
                if (password === 'admin') {
                    window.localStorage.setItem('isLogin', 'true')
                 
                } else {
                    alert('Incorrect password.')
                }
            } else {
                alert('Incorrect email.')
            }
        }
    }, [])

    return (
        <div >
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Admin</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" onClick={() => history("/admin")}>Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" onClick={() => history("/admin/products")}>Products</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" onClick={() => history("/admin/users")}>Users</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" onClick={() => history("/admin/orders")}>Orders</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Category
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" onClick={()=> history('/admin/category/view')} >View Categorys</a></li>
                                    <li><a class="dropdown-item" onClick={()=> history('/admin/category/add')} >Add New Category</a></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Brands
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" onClick={()=> history('/admin/brand/view/')} >View Brands</a></li>
                                    <li><a class="dropdown-item" onClick={()=> history('/admin/brand/add')}>Add New Brand</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" onClick={() =>{
                                     window.localStorage.clear()
                                     history('/')
                                }}>Logout</a>
                            </li>
                          
                        </ul>
                       
                    </div>
                </div>
            </nav>
            <main className='col-md-12 ms-sm-auto col-lg-12 px-md-4' >
                <h2 className='my-5'>{title}</h2>
                {children}
            </main>
        </div>
    )
}
