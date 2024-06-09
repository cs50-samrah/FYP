import { useEffect, useState } from "react";
import api from "../../../utils/fetcher";
import Sidebar from "../SideBar";
import { useNavigate } from 'react-router-dom';


export default function AdminViewCategory() {


    const [categories, setCategorys] = useState([])

    useEffect(() => {
        loadCategory()
    }, [])


    const loadCategory = async () => {
        const { data } = await api.get('/admin/categories');
        if (data.status) {
            setCategorys(data.categories)
        }
    }

    const removeCategory = async (id) =>{
        const { data } = await api.delete('/admin/remove/category/'+id)
        setCategorys(categories.filter(cat => cat._id !== id))
    }

    return (<div className="container-fluid" >
        <Sidebar title={'Category'} >
            <div>
                <div className="app-card app-card-orders-table shadow-sm mb-5">
                    <div className="app-card-body" style={{ overflowX: "scroll" }}>
                        <div className="table-responsive">
                            <table className="table app-table-hover mb-0 text-left">
                                <thead>
                                    <tr>
                                        <th className="cell">Id</th>
                                        <th className="cell">Category Name</th>
                                        <th className="cell">Created At</th>
                                        <th className="cell">Delete</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {categories.map(category => <Tr category={category} removeCategory={removeCategory} />)}
                                </tbody>
                                <tfoot>
                                <tr>
                                        <th className="cell">Id</th>
                                        <th className="cell">Category Name</th>
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

const Tr = ({ category , removeCategory}) => {
 
    return <tr>

        <td>{category?._id}</td>
        <td>{category?.cat_name}</td>
        <td>{new Date(category?.createdAt).toDateString()}</td>
        <td> <a className="btn-sm app-btn-secondary" onClick={()=> removeCategory(category?._id)} >Remove</a></td>
    </tr>
}