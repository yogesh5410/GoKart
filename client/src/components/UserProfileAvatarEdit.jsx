import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import SummaryApi from '../common/SummaryApi'
import Axios from "../utils/Axios"
import { updatedAvatar } from '../store/userSlice'
import { IoClose } from 'react-icons/io5'

const UserProfileAvatarEdit = () => {
    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleUploadAvatarImage = async(e)=>{
        const file = e.target.files[0]

        if(!file){
            return
        }

        const formData = new FormData()
        formData.append('avatar',file)

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data : formData
            })

            //console.log(response)
            const { data : responseData}  = response

            dispatch(updatedAvatar(responseData.data.avatar))

        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }
    }

    return (
        <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center">
            <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">
                <button onClick={() => window.history.back()} className="text-neutral-800 block w-fit ml-auto">
                        <IoClose size={30} />
                </button>
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

                <form onSubmit={(e) => { e.preventDefault() }}>    {/* Prevents the page from reloading */}
                    <label htmlFor="uploadProfile">
                        <div className="border border-primary-200 cursor-pointer hover:bg-primary-100 px-4 py-1 rounded-full mt-3">
                            {
                                loading ? "Loading..." : "Upload"
                            }
                        </div>
                    </label>
                    <input onChange={handleUploadAvatarImage} type="file" id="uploadProfile" className="hidden" />
                </form>

            </div>
        </section>
    )
}

export default UserProfileAvatarEdit
