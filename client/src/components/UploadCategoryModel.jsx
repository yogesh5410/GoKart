import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import uploadImage from '../utils/UploadImage'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'

const UploadCategoryModel = ({ close, fetchData }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        name: "",
        image: ""
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value   //[name] means variable otherwise field
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        try{
            setLoading(true)
            
            const response = await Axios({
                ...SummaryApi.addCategory,
                data: data
            })

            const { data : responseData } = response

            if(responseData.success) {
                toast.success(responseData.message)
                close()
                fetchData()
            }
        } catch(error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    const handleUploadImage = async(e) => {
        const file = e.target.files[0]

        if(!file) {
            return
        }

        setLoading(true)
        const ImageUrl = await uploadImage(file)
        //console.log(ImageUrl.data.data.url)

        setData((prev) => {
            return {
                ...prev,
                image: ImageUrl.data.data.url
            }
        })
        setLoading(false)
    }

    return (
        <section className="fixed top-0 bottom-0 left-0 right-0 p-4  bg-neutral-800 bg-opacity-60 flex items-center justify-center">
            <div className="bg-white max-w-4xl w-full p-4 rounded">
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold ">Category</h1>
                    <button className="w-fit block ml-auto">
                        <IoClose size={25} onClick={close} />
                    </button>
                </div>

                <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <label id="categoryName">Name</label>
                        <input
                            type="text"
                            id="categoryName"
                            placeholder="Enter category name"
                            value={data.name}
                            name="name"
                            onChange={handleOnChange}
                            required
                            className="bg-blue-50 p-2 outline-none border border-blue-100 focus-within:border-primary-100 rounded"
                        />
                    </div>

                    <div className="grid gap-1">
                        <p>Image</p>
                        <div className='flex gap-3 flex-col lg:flex-row items-center'>
                            <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                                {
                                    data.image ? (
                                        <img
                                            src={data.image}
                                            alt={data.name}
                                            className="w-full h-full object-scale-down"
                                        />
                                    ) : (
                                        <p className="text-sm text-neutral-500">No Image</p>
                                    )
                                }
                                
                            </div>

                            <label htmlFor="uploadCategoryImage">
                                <div  className={`${!data.name ? "bg-gray-400" : "border-primary-200 hover:bg-primary-100"} 
                                px-4 py-1 rounded cursor-pointer border 
                                `}>
                                    {
                                        loading ? "Uploading..." : "Upload Image"
                                    }
                                </div>
                                <input disabled={!data.name}
                                    type="file"
                                    id="uploadCategoryImage"
                                    className="hidden"
                                    name="image"
                                    onChange={handleUploadImage}
                                />
                            </label>
                        </div>
                    </div>

                    <button className={
                        `
                        ${data.name && data.image ? "bg-primary-100 hover:bg-primary-200" : "bg-gray-400"}
                        px-4 py-1 rounded text-white w-fit m-auto
                        `
                    }>Add Category</button>
                </form>
            </div>

        </section>
    )
}

export default UploadCategoryModel
