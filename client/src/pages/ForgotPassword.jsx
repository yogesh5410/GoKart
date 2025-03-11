import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPassword = () => {

    const [data, setData] = useState({
        email: ""
    })

    const navigate = useNavigate()

    const isValid = Object.values(data).every(item => item)

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

    const handleSubmit = async (e) => {
        e.preventDefault()              // Prevents the page from reloading

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password,       //spred operator
                data: data
            })
            //console.log(response)

            if(response.data.error) toast.error(response.data.message)

            if (response.data.success) {
                toast.success(response.data.message)

                navigate("/verify-forgot-password-otp", {
                    state : data
                })

                setData({
                    email: "",
                    password: "",
                })

            }

        } catch (error) {
            AxiosToastError(error)
        }
    }
    
    

    return (
        <section className="w-full container mx-auto px-2 ">
            <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-4">
                <p className="text-2xl font-semibold">Forgot Password</p>

                <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>

                    <div className="grid gap-1">
                        <label htmlFor="email">Email: </label>
                        <input
                            type="text"
                            className="bg-blue-50 p-2 border rounded outline-none focus:border-2 focus:border-yellow-400"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    <button disabled={!isValid} className={` ${isValid ? ("bg-green-700 hover:bg-green-900") : ("bg-gray-500")} text-white px-2 py-2.5 rounded my-2 font-semibold tracking-wider`}>Send Otp</button>

                </form>

                <p>Already have an account? <Link to="/login" className="text-blue-500 font-semibold hover:text-blue-800">Login</Link></p>

            </div>

        </section>
    )
}

export default ForgotPassword
