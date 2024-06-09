
import SideBar from "../SideBar"
import api from "../../../utils/fetcher"
import { useEffect, useState } from "react"

export default function AdminOrders() {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        const { data } = await api.get('/admin/orders');
        if (data.status) {
            setOrders(data.orders)
        }
    }

    return <div className="container-fluid"  >
        <SideBar title={'Orders'} >
            <div>
                <div className="app-card app-card-orders-table shadow-sm mb-5">
                    <div className="app-card-body" style={{ overflowX: "scroll" }}>
                        <div className="table-responsive">
                            <table className="table app-table-hover mb-0 text-left">
                                <thead>
                                    <tr>
                                        <th className="cell">Order Id</th>
                                        <th className="cell">Order Date</th>
                                        <th className="cell">Order Status</th>
                                        <th className="cell">Delivery Status</th>
                                        <th className="cell">Contact</th>
                                        <th className="cell">Amount</th>
                                        <th className="cell">Shipping Address</th>
                                        <th className="cell">Country</th>
                                        <th className="cell">State</th>
                                        <th className="cell">Zip Code</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {orders.map(order => <Tr order={order} />)}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th className="cell">Order Id</th>
                                        <th className="cell">Order Date</th>
                                        <th className="cell">Order Status</th>
                                        <th className="cell">Delivery Status</th>
                                        <th className="cell">Contact</th>
                                        <th className="cell">Amount</th>
                                        <th className="cell">Shipping Address</th>
                                        <th className="cell">Country</th>
                                        <th className="cell">State</th>
                                        <th className="cell">Zip Code</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </SideBar>
    </div>
}

const Tr = ({ order }) => {

    const [status, setStatus] = useState(order?.status)
    const [delivery_status, setDelivery_status] = useState(order?.delivery_status)

    const onChangeSelect = async (e) => {
        console.log(e.target.name, e.target.value)

        if (e.target.name === "status") {
            setStatus(e.target.value)
        } else if (e.target.name === "delivery_status") {
            setDelivery_status(e.target.value)
        }
        const { data } = api.put('/admin/order/' + order._id, { [e.target.name]: e.target.value })

        console.log(data)
    }


    return <tr>

        <td>{order?.orderid}</td>
        <td>{new Date(order?.orderDate).toDateString()}</td>
        <td>
            {status === "pending" ? <select name="status" value={status} onChange={onChangeSelect} >
                <option value="pending"  >pending</option>
                <option value="approved">approved</option>
                <option value="canceled">canceled</option>
            </select>
                : <span className="badge bg-warning">{status}</span>
            }

        </td>
        <td>
            {status !== "canceled" ?      <select name="delivery_status" value={delivery_status} onChange={onChangeSelect}>
                <option value="pending" >pending</option>
                <option value="shipping">shipping</option>
                <option value="delivered">delivered</option>
            </select>
         : <span className="badge bg-danger">Order Cant Be Tracked,<br /> Order is Canceled</span>    
        }
       
        </td>
        <td>{order?.contact?.email}</td>
        <td>{order?.total_amount}/=</td>
        <td>{order?.shipping_address?.address}</td>
        <td>{order?.shipping_address?.country}</td>
        <td>{order?.shipping_address?.state}</td>
        <td>{order?.shipping_address?.zip}</td>
    </tr>
}