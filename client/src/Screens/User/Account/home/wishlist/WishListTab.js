
import CardList from './CardList'
import RecomendedSideList from './RecomendedList'
import api from '../../../../../utils/fetcher'
import { useEffect, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function WishlistTab() {
    const [wishLists, setWishList] = useState([])

    useEffect(() => {
        loadWishList()
    }, [])

    const loadWishList = async () => {
        const { data } = await api.get('/user/wishlist')
        const { status, wishlists, message } = data
        if (status) {
            setWishList(wishlists)
        } else {
            toast(message)
        }
    }
    const onWishItemRemove = async (id) =>{
        console.log(id)

        const { data } = await api.delete('user/wishlist/'+id)
        const {status , message} = data

        toast(message)

        if(status){
            setWishList(wishLists.filter(item => item._id !== id))
        }

    }
    return <div className='container'>
        <ToastContainer />
        <div className='row'>

            <div className='col-lg-10'>
                {
                    wishLists.map(wishItem =>{
                        return  <CardList wishItem={wishItem} onRemove={onWishItemRemove}  />
                    })
                }
            </div>


        </div>
    </div>
}