import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from 'react-icons/fa'
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit'
import Axios from '../utils/Axios.js'
import SummaryApi from '../common/SummaryApi.js'
import AxiosToastError from '../utils/AxiosToastError.js'
import toast from 'react-hot-toast'
import fetchUserDetails from '../utils/fetchUserDetails.js'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../store/userSlice.js'

const Profile = () => {
    const user = useSelector(state => state.user)
    const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const [userData, setUserData] = useState({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
    })

    useEffect(() => {
        setUserData({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
        })
    }, [user])

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setUserData((prev) => {
            return {
                ...prev,        //spread operator so that other fields are not lost
                [name]: value    //[name] means variable which may be mobile, email.. else field(name) it is considered
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()      //prevent page from reloading
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateUserDetails,
                data: userData
            })

            const { data : responseData } = response

            if(responseData.success) {
                toast.success(responseData.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data))
            }

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-4">

            {/* Profile upload and display image */}
            <div className="w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
                {
                    user.avatar ? (
                        <img
                            alt={user.name}
                            src={user.avatar}
                            className='w-full h-full'
                        />) : (
                        <FaRegUserCircle size={65} />
                    )
                }
            </div>
            <button onClick={() => setOpenProfileAvatarEdit(true)} className="text-xs min-w-20 border border-primary-200 hover:bg-primary-100 px-3 py-1 rounded-full mt-3">Edit </button>

            {
                openProfileAvatarEdit && (
                    <UserProfileAvatarEdit close={() => setOpenProfileAvatarEdit(false)} />
                )
            }

            {/* name, mobie, email, change password */}
            <form  onSubmit={handleSubmit} className="my-4 grid gap-4">
                <div className="grid">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        className="p-2 bg-blue-50 outline-none border focus-within:border-primary-100 rounded "
                        value={userData.name}
                        name="name"
                        onChange={handleOnChange}
                        required
                    />
                </div>

                {/* // htmlfor is used to link label with id with input field */}
                <div className="grid">
                    <label htmlFor="email">Email</label>     
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your name"
                        className="p-2 bg-blue-50 outline-none border focus-within:border-primary-100 rounded "
                        value={userData.email}
                        name="email"
                        onChange={handleOnChange}
                        required
                    />
                </div>

                <div className="grid">
                    <label htmlFor="mobile">Mobile</label>     
                    <input
                        type="text"
                        id="mobile"
                        placeholder="Enter your mobile"
                        className="p-2 bg-blue-50 outline-none border focus-within:border-primary-100 rounded "
                        value={userData.mobile}
                        name="mobile"
                        onChange={handleOnChange}
                        required
                    />
                </div>

                <button className=" border border-primary-200 bg-yellow-200 text-blue-900 px-4 py-2 font-semibold rounded hover:bg-primary-100">
                    {
                    loading ? "Loading..." : "Submit" 
                    }
                </button>

            </form>
        </div>
    )
}

export default Profile
