import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider.jsx'
import Axios from '../utils/Axios.js'
import SummaryApi from '../common/SummaryApi.js'
import { logout } from '../store/userSlice.js'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError.js'
import { HiOutlineExternalLink } from 'react-icons/hi'
import isAdmin from '../utils/isAdmin.js'

const userMenu = ({ close }) => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClose = () => {
        if (close) close()
    }

    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.logout,
            })

            if (response.data.success) {
                if (close) close()
                dispatch(logout())
                localStorage.removeItem("token")
                toast.success(response.data.message)
                navigate("/")
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <div>
            <div className="font-semibold">My Account</div>
            <div className="text-sm flex items-center gap-2">
                <span className="max-w-52 text-ellipsis line-clamp-1"> {user.name} <span className="text-medium text-red-600">{user.role === "ADMIN" ? "(Admin)" : ""}</span></span>
                <Link onClick={handleClose} to={"/dashboard/profile"} className="hover:text-primary-200"> <HiOutlineExternalLink size={18} /> </Link>
            </div>

            <Divider />

            <div className="text-sm grid gap-2">
                {
                    isAdmin(user.role) && (
                        <Link onClick={handleClose} to={"/dashboard/category"} className="px-2 hover:bg-orange-300">Category</Link>
                    )
                }

                {
                    isAdmin(user.role) && (
                        <Link onClick={handleClose} to={"/dashboard/subcategory"} className="px-2 hover:bg-orange-300">Sub Category</Link>
                    )
                }

                {
                    isAdmin(user.role) && (
                        <Link onClick={handleClose} to={"/dashboard/upload-product"} className="px-2 hover:bg-orange-300">Upload Product</Link>
                    )
                }

                {
                    isAdmin(user.role) && (
                        <Link onClick={handleClose} to={"/dashboard/product"} className="px-2 hover:bg-orange-300">Product</Link>
                    )
                }

                <Link onClick={handleClose} to={"/dashboard/myorders"} className="px-2 hover:bg-orange-300">My Orders</Link>

                <Link onClick={handleClose} to={"/dashboard/address"} className="px-2 hover:bg-orange-300">Save Address</Link>

                <button onClick={handleLogout} className="text-left px-2 hover:bg-orange-300">Log out</button>
            </div>
        </div>
    )
}

export default userMenu

