import React, { useEffect, useState } from "react"
import Sidebar from './SideBar'
import './dashboard.css'

import api from "../../utils/fetcher"


export default function DashBoard() {

    const [stats, setStats] = useState({})


 
    useEffect(() => {
        loadStats()
    }, [])

    const loadStats = async () => {
        const { data } = await api.get('/admin/stats')
        if (data.status) {
            console.log(data)
            setStats(data)
        }
    }

    return (<div className="container-fluid" >

        <Sidebar title={'Home'} >
            <div class="row gx-5">
                <div class="col-xxl-3 col-md-6 mb-5">
                    <div class="card card-raised border-start border-primary border-4">
                        <div class="card-body px-4">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <div class="me-2">
                                    <div class="display-5">{stats?.products}</div>
                                    <div class="card-text">Products</div>
                                </div>
                                <div class="icon-circle bg-primary text-white"><i class="fa fa-download"></i></div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="col-xxl-3 col-md-6 mb-5">
                    <div class="card card-raised border-start border-warning border-4">
                        <div class="card-body px-4">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <div class="me-2">
                                    <div class="display-5">{stats.orders}</div>
                                    <div class="card-text">Orders</div>
                                </div>
                                <div class="icon-circle bg-warning text-white"><i class="material-icons"></i></div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="col-xxl-3 col-md-6 mb-5">
                    <div class="card card-raised border-start border-secondary border-4">
                        <div class="card-body px-4">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <div class="me-2">
                                    <div class="display-5">{stats?.users}</div>
                                    <div class="card-text">Customers</div>
                                </div>
                                <div class="icon-circle bg-secondary text-white"><i class="material-icons"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xxl-3 col-md-6 mb-5">
                    <div class="card card-raised  border-info border-4">
                        <div class="card-body px-4">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <div class="me-2">
                                    <div class="display-5">{stats?.orderscompleted}</div>
                                    <div class="card-text">Completed Orders</div>
                                </div>
                                <div class="icon-circle bg-info text-white"><i class="material-icons"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Sidebar>

    </div>)
}