import { useEffect, useState } from "react";
import api from "../../../utils/fetcher";
import Sidebar from "../SideBar";
import { useNavigate } from 'react-router-dom';


export default function AdminViewBrand() {


    const [brands, setBrands] = useState([])

    useEffect(() => {
        loadBrands()
    }, [])


    const loadBrands = async () => {
        const { data } = await api.get('/admin/brands');
        if (data.status) {
            setBrands(data.brands)
        }
    }

    const removeBrand = async (id) =>{
        const { data } = await api.delete('/admin/remove/brand/'+id)
        setBrands(brands.filter(brand => brand._id !== id))
    }

    return (<div className="container-fluid" >
        <Sidebar title={'Brand'} >
            <div>
                <div className="app-card app-card-orders-table shadow-sm mb-5">
                    <div className="app-card-body" style={{ overflowX: "scroll" }}>
                        <div className="table-responsive">
                            <table className="table app-table-hover mb-0 text-left">
                                <thead>
                                    <tr>
                                    
                                        <th className="cell">Id</th>
                                        <th className="cell">Brand Name</th>
                                        <th className="cell">Created At</th>
                                        <th className="cell">Delete</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {brands.map(brand => <Tr brand={brand} removeBrand={removeBrand} />)}
                                </tbody>
                                <tfoot>
                                <tr>
                                        <th className="cell">Id</th>
                                        <th className="cell">Brand Name</th>
                                        <th className="cell">Created At</th>
                                        <th className="cell">Delete</th>
                                    </tr>
                                    </tfoot>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </Sidebar >
    </div>)
}

const Tr = ({ brand , removeBrand }) => {

    return <tr>

        <td>{brand?._id}</td>
        <td>{brand?.brand_name}</td>
        <td>{new Date(brand?.createdAt).toDateString()}</td>
        <td> <a className="btn-sm app-btn-secondary" onClick={()=> removeBrand(brand?._id)} >Remove</a></td>
    </tr>
}