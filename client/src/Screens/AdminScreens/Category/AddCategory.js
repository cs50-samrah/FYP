import Sidebar from "../SideBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../../utils/fetcher";
import { useNavigate } from 'react-router-dom';
import { ImageUploader } from "../../User/Account/home/AddProduct/ThumbnailImage";
import { useState } from "react";

export default function AdminAddCategory() {

    const navigate = useNavigate();

    const [cat_thumb , setCat_thumb] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        const cat_name = e.target.cat_name.value

        if (cat_name === '') {
            toast.error("Category Name is required", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        const { data } = await api.post('/admin/add/category', { cat_name  , thumbnail : cat_thumb });

        const { status } = data;

        if (status) {

            toast.success("Category Added Successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {

                navigate("/admin/category/view");
            }, 1000);
        } else {
            toast.error("Category Not Added", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return <Sidebar title={'Add Catgeory'} >
        <ToastContainer />
        <div className="d-flex justify-content-center align-items-center">

            <form className="w-50" onSubmit={onSubmit} >
                <div class="form-group">
                    <label for="exampleInputEmail1">Category Name : </label>
                    <input type="text" name="cat_name" class="form-control" placeholder="Enter Catgeory Name" />
                </div>
                <div className="mt-3">
                    <label for="exampleInputEmail1">Category Thumbnail : </label>
                    <ImageUploader onchangeUrl={(url) => {
                        setCat_thumb(url?.url)
                    }} />
                </div>
                <div className="my-5"></div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </Sidebar>
}