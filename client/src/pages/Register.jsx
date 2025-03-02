import React, { useState } from 'react'
import { IoEyeOff } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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

        if (data.password !== data.confirmPassword) {
            toast.error("Password and Confirm Password are not same")
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,       //spred operator
                data: data
            })
            //console.log(response)

            if(response.data.error) toast.error(response.data.message)

            if (response.data.success) {
                toast.success(response.data.message)
                setData({
                    name: "", 
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                navigate("/login")
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }
    
    

    return (
        <section className="w-full container mx-auto px-2">
            <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-4">
                <p className="text-2xl font-semibold">Welcome to Registration</p>

                <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            autoFocus
                            className="bg-blue-50 p-2 border rounded outline-none focus:border-2 focus:border-yellow-400"
                            name="name"     // field name
                            value={data.name}        //field "name"'s value     current => ""
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                    </div>

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

                    <div className="grid gap-1">
                        <label htmlFor="password">Password: </label>
                        <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-2 focus-within:border-yellow-400">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full outline-none"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
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
                                placeholder="Enter your confirm password"
                            />
                            <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {
                                    showConfirmPassword ? (<IoEyeSharp />) : (<IoEyeOff />)
                                }
                            </div>
                        </div>
                    </div>

                    <button disabled={!isValid} className={` ${isValid ? ("bg-green-500 hover:bg-green-700") : ("bg-gray-500")} text-white px-2 py-2.5 rounded my-2 font-semibold tracking-wider`}>Register</button>

                </form>

                <p>Already have an account? <Link to="/login" className="text-blue-500 font-semibold hover:text-blue-800">Login</Link></p>
            </div>

        </section>
    )
}

export default Register
