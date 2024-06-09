import Sidebar from "../SideBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../../utils/fetcher";
import { useNavigate } from 'react-router-dom';

export default function AdminAddBrand() {

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        const brand_name = e.target.brand_name.value

        if (brand_name === '') {
            toast.error("Brand Name is required", {
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

        const { data } = await api.post('/admin/add/brand', { brand_name });

        const { status } = data;

        if (status) {

            toast.success("Brand Added Successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {

                navigate("/admin/brand/view");
            }, 1000);
        }else{
            toast.error("Brand Not Added", {
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

    return <Sidebar title={'Add Brand'} >
        <ToastContainer />
        <div className="d-flex justify-content-center align-items-center">

            <form className="w-50" onSubmit={onSubmit} >
                <div class="form-group">
                    <label for="exampleInputEmail1">Brand Name</label>
                    <input type="text" name="brand_name" class="form-control" placeholder="Enter Brand Name" />
                </div>
                <div className="my-5"></div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </Sidebar>
}