import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { IoEyeOff } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'

const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })
    const isValid = Object.values(data).every(item => item)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    useEffect(() => {
        if (!(location?.state?.data?.success)) navigate("/")
        if (location?.state?.email) {
            setData((prev) => {
                return {
                    ...prev,
                    email: location?.state?.email
                }
            })
        }
    }, [])



    const handleChange = (e) => {           //e refers to the event
        //e.target: Refers to the <input> element.
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,            // Keeps other fields as is
                [name]: value           // Dynamically updates the field with 'name' ("name") to 'value' ("J")
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()              // Prevents the page from reloading

        // if (data.newPassword !== data.confirmPassword) {
        //     toast.error("New Password and Confirm Password are not same")
        // }

        try {
            const response = await Axios({
                ...SummaryApi.reset_password,       //spred operator
                data: data
            })
            //console.log(response)

            if (response.data.error) toast.error(response.data.message)

            if (response.data.success) {
                toast.success(response.data.message)

                navigate("/login")

                setData({
                    email: "",
                    newPassword: "",
                    confirmPassword: ""
                })

            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className="w-full container mx-auto px-2">
            <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-4">
                <p className="text-2xl font-semibold">Reset Your Password</p>

                <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>

                    <div className="grid gap-1">
                        <label htmlFor="password">New Password: </label>
                        <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-2 focus-within:border-yellow-400">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full outline-none"
                                name="newPassword"
                                value={data.newPassword}
                                onChange={handleChange}
                                placeholder="Enter new password"
                            />
                            <div onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ? (<IoEyeSharp />) : (<IoEyeOff />)
                                }
                            </div>
                        </div>
                    </div>



                    <div className="grid gap-1">
                        <label htmlFor="confirmPassword">Confirm Password: </label>
                        <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-2 focus-within:border-yellow-400">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="w-full outline-none"
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder="Enter confirm password"
                            />
                            <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {
                                    showConfirmPassword ? (<IoEyeSharp />) : (<IoEyeOff />)
                                }
                            </div>
                        </div>
                    </div>

                    <button disabled={!isValid} className={` ${isValid ? ("bg-green-700 hover:bg-green-900") : ("bg-gray-500")} text-white px-2 py-2.5 rounded my-2 font-semibold tracking-wider`}>Reset Password</button>

                </form>

                <p>
                    Already have account? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
                </p>

            </div>

            

        </section>
    )
}

export default ResetPassword
