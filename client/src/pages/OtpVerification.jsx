import React, { useState, useRef, useEffect } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const VerifyOtp = () => {

    const [data, setData] = useState(["", "", "", "", "", ""])
    const navigate = useNavigate()
    const isValid = data.every(item => item)
    const inputRef = useRef([]) //useRef([]) is used to create a container to store references to your input fields.
    const location = useLocation()
    //console.log(location)

    useEffect(()=>{
        if(!location?.state?.email) navigate("/forgot-password")
    })
    
    const handleSubmit = async (e) => {
        e.preventDefault()              // Prevents the page from reloading

        try {
            const response = await Axios({
                ...SummaryApi.verifyOtp,       //spred operator
                data : {
                    otp : data.join(""),
                    email : location?.state?.email
                }
            })
            //console.log(response)

            if (response.data.error) toast.error(response.data.message)

                if(response.data.success){
                    toast.success(response.data.message)
                    setData(["","","","","",""])
                    navigate("/reset-password",{
                        state : {
                            data : response.data,
                            email : location?.state?.email
                        }
                    })
                }
    

        } catch (error) {
            AxiosToastError(error)
        }
    }



    return (
        <section className="w-full container mx-auto px-2 ">
            <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-4">
                <p className="text-2xl font-semibold">OTP Verification</p>

                <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>

                    <div className="grid gap-1">
                        <label htmlFor="otp">Enter Your OTP: </label>
                        <div className="flex items-center gap-2 justify-between mt-4">
                            {
                                data.map((element, index)=>{
                                    return(
                                        <input
                                        type="text"
                                        key={index}
                                        id="otp"
                                        ref={(ref)=>{           //ref={(ref) => { inputRef.current[index] = ref; }} saves a reference to the input field in inputRef.
                                            inputRef.current[index]=ref
                                            return ref
                                        }}
                                        maxLength={1}
                                        value={data[index]}
                                        onChange={(e)=>{
                                            const value = e.target.value
                                            // console.log(value)
                                            const newData = [...data]
                                            newData[index] = value
                                            setData(newData)

                                            if(value && index<5){
                                                inputRef.current[index+1].focus()
                                            }
                                        }}
                                        className="bg-blue-50 p-2 w-full max-w-16 border rounded outline-none focus:border-2 focus:border-yellow-400 text-center font-semibold"
                                        />
                                    )
                                })
                            }
                        </div>

                    </div>

                    <button disabled={!isValid} className={` ${isValid ? ("bg-green-700 hover:bg-green-900") : ("bg-gray-500")} text-white px-2 py-2.5 rounded my-2 font-semibold tracking-wider`}>Verify OTP</button>

                </form>

                <p>Already have an account? <Link to="/login" className="text-blue-500 font-semibold hover:text-blue-800">Login</Link></p>

            </div>

        </section>
    )
}

export default VerifyOtp
