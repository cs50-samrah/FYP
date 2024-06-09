import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';


import Login from './Screens/AuthScreens/Login';
import Signup from './Screens/AuthScreens/Signup';

import HomeScreen from './Screens/HomeScreen/index';
import AccountHome from './Screens/User/Account/home';

import DashBoard from './Screens/AdminScreens/DashBoard'
import AdminProducts from './Screens/AdminScreens/Products';
import AdminUsers from './Screens/AdminScreens/Users';
import AdminViewBrand from './Screens/AdminScreens/Brand/ViewBrand';
import AdminAddBrand from './Screens/AdminScreens/Brand/AddBrand';
import AdminViewCategory from './Screens/AdminScreens/Category/ViewCategory';
import AdminAddCategory from './Screens/AdminScreens/Category/AddCategory';
import AdminOrders from './Screens/AdminScreens/Orders';

import AddProduct from './Screens/User/Account/home/AddProduct';

import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';


import ProductListScreen from './Screens/ProductsScreen';
import CheckoutScreen from './Screens/CheckoutScreen';

import AboutUs from './Screens/AboutUs';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<HomeScreen/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/product/:id" element={<ProductScreen/>} />
          <Route exact path="/account" element={<AccountHome/>} />
          <Route exact path="/cart" element={<CartScreen/>} />
          <Route exact path="/product/add" element={<AddProduct />} />
          <Route exact path="/category/:id/:name" element={<ProductListScreen />} />
          <Route exact path="/search" element={<ProductListScreen />} />
          <Route exact path="/products" element={<ProductListScreen />} />
          <Route exact path="/admin" element={<DashBoard/>} />
          <Route exact path="/admin/products/" element={<AdminProducts/>} />
          <Route exact path="/admin/users/" element={<AdminUsers/>} />
          <Route exact path="/admin/brand/view" element={<AdminViewBrand/>} />
          <Route exact path="/admin/brand/add" element={<AdminAddBrand/>} />
          <Route exact path="/admin/category/view" element={<AdminViewCategory/>} />
          <Route exact path="/admin/category/add" element={<AdminAddCategory/>} />
          <Route exact path="/admin/orders" element={<AdminOrders/>} />
          <Route exact path="/checkout" element={<CheckoutScreen/>} />
          <Route exact path="/aboutus" element={<AboutUs/>} />
      </Routes>
  </Router>
 
   
  );
}

export default App;
