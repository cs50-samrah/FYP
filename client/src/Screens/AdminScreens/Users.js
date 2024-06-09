import React from "react"
import { useNavigate } from 'react-router-dom';
import Sidebar from './SideBar'
import './dashboard.css'
import api from "../../utils/fetcher";
import { BACKEND_URL } from "../../utils/constant";


export default function AdminUsers() {

    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        const { data } = await api.get('/admin/users/');
        if (data.status) {
            setUsers(data.users)
        }
    }

    const deleteUser = async (user) => {
        const { data } = await api.delete('/admin/remove/user/' + user._id);
        if (data.status) {
            loadUsers()
        }
    }

    return (<div >

        <Sidebar title={'Users'} >
            <div>
                <div className="app-card app-card-orders-table shadow-sm mb-5">
                    <div className="app-card-body" style={{ overflowX: "scroll" }}>
                        <div className="table-responsive">
                            <table className="table app-table-hover mb-0 text-left">
                                <thead>
                                    <tr>
                            
                                        <th className="cell">firstName</th>
                                        <th className="cell">lastName</th>
                                        <th className="cell">email</th>
                                        <th className="cell">Dob</th>
                                        <th className="cell">phone</th>
                                        <th className="cell">Delete</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {users.map(user => <Tr user={user} deleteUser={deleteUser} />)}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>

        </Sidebar>

    </div>)
}







const Tr = ({ user  , deleteUser}) => {
    const history = useNavigate();
    const [ isApproved , setApproved ] = React.useState(user.isBanned)

    React.useEffect(()=>{
        console.log(isApproved)
    },[isApproved])



    return <tr>

        <td>{user?.firstName}</td>
        <td>
            <span className="truncate">{user?.lastName}</span>
        </td>
        <td>{user?.email}</td>
        <td><span>{user?.dob}</span></td>
        <td>{user?.phone}</td>

        <td> <a className="btn-sm app-btn-secondary" onClick={()=> deleteUser(user)}>Remove</a></td>
    </tr>
}