import React from "react"
import { useNavigate } from 'react-router-dom';
import Sidebar from './SideBar'
import './dashboard.css'
import api from "../../utils/fetcher";
import { BACKEND_URL } from "../../utils/constant";


export default function AdminProducts() {

    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = async () => {
        const { data } = await api.get('/admin/products/');
        if (data.status) {
            setProducts(data.products)
        }
    }

    return (<div >

        <Sidebar title={'Products'} >
            <div>
                <div className="app-card app-card-orders-table shadow-sm mb-5">
                    <div className="app-card-body" style={{ overflowX: "scroll" }}>
                        <div className="table-responsive">
                            <table className="table app-table-hover mb-0 text-left">
                                <thead>
                                    <tr>
                                        <th className="cell">Image</th>
                                        <th className="cell">Name</th>
                                        <th className="cell">Description</th>
                                        <th className="cell">Price</th>
                                        <th className="cell">Status</th>
                                        <th className="cell">Date</th>
                                        <th className="cell">Category</th>
                                        <th className="cell">Edit</th>
                                        <th className="cell">Delete</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {products.map(product => <Tr product={product} />)}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>

        </Sidebar>

    </div>)
}







const Tr = ({ product }) => {
    const history = useNavigate();
    const [isApproved, setApproved] = React.useState(product.isPublished)

    React.useEffect(() => {
        console.log(product)
    }, [isApproved])

    const onChange = async (e) => {
        setApproved(e.target.checked)
        const { data } = await api.post('/admin/update/product', {
            isPublished: e.target.checked,
            id: product._id
        })
        if (data.status) {
            setApproved(e.target.checked)
        }
    }

    const removeProduct = async () => {
        console.log(product._id)
        const { data } = await api.post('/admin/remove/product', {
            id: product._id
        })
        if(data.status){
            alert('Product Removed')
            window.location.reload()
        }
    }

    return <tr>
        <td>
            <img src={`${BACKEND_URL + product.thumbnail}`} alt='product-image' style={{ width: 45, height: 40 }} />
        </td>
        <td>{product.title}</td>
        <td>
            <span className="truncate">{product?.description?.length > 20 ? product?.description?.substr(0,20)+'...' : product?.description}</span>
        </td>
        <td>{product.purchase_price}/=</td>
        <td> <span className={`badge ${isApproved ? 'bg-success' : 'bg-primary'}`}>{isApproved ? 'live' : 'pending'}</span></td>
        <td><span>{new Date(product.createdAt).toDateString()}</span></td>
        <td>{product.categories}</td>
        <td>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" onChange={onChange} checked={isApproved} />
                <label class="form-check-label" for="flexSwitchCheckDefault">{!isApproved ? 'Approve' : 'UnPublish'}</label>
            </div>
        </td>
        <td> <a className="btn-sm app-btn-secondary" style={{
            cursor: 'pointer'
        }} onClick={removeProduct} >Delete</a></td>
    </tr>
}