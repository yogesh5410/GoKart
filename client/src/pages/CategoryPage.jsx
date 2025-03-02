import React, { useState, useEffect } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import EditCategory from '../components/EditCategory'
import { toast } from 'react-hot-toast'
import ConfirmBox from '../components/ConfirmBox'
import AxiosToastError from '../utils/AxiosToastError'
import { useSelector } from 'react-redux'

const CategoryPage = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [loading,setLoading] = useState(false)
    const [categoryData,setCategoryData] = useState([])
    const [editData, setEditData] = useState({
        name: "",
        image: ""
    })
    const [openConfirmBox, setOpenConfirmBox] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState({
        _id: ""
    });
    
    const handleDeleteCategory = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data: deleteCategory
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                fetchCategory()
                setOpenConfirmBox(false)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    // const allCategory = useSelector(state => state.product.allCategory) 

    // useEffect(() => {
    //     setCategoryData(allCategory)
    // }, [allCategory])


    const fetchCategory = async () => {
        try {
            setLoading(true)
            //console.log("yogesh")
            const response = await Axios({
                ...SummaryApi.getCategory
            })
            //console.log(response)
            const { data: responseData } = response

            if (responseData.success) {
                setCategoryData(responseData.data)
            }

        } catch(error) {
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])                   //single time rendered
    
    return (
        <section>
            <div className="p-2 bg-white shadow-md flex items-center justify-between sticky top-0">
                <h2 className="font-semibold">Category</h2>
                <button onClick={() => { setOpenUploadCategory(true) }} className="text-sm border border-primary-100 hover:bg-primary-100 py-1 px-2 rounded">Add Category</button>
            </div>
            {
                !categoryData[0] && !loading && (
                    <NoData />
                )
            }

            {
                loading && (<Loading />)
            }

            <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
                {
                    categoryData.map((category, index) => {
                        return (
                            <div className="w-32 h-56 group  rounded shadow-md" key={category._id}>
                                <img
                                    alt={category.name}
                                    src={category.image}
                                    className="w-full object-scale-down"
                                />
                                <div className="items-center h-9 flex gap-2">
                                    <button onClick={() => {
                                        setOpenEdit(true)
                                        setEditData(category)
                                    }}
                                        className="flex-1 bg-green-100 text-green-600 font-medium py-1 rounded hover:bg-green-200">Edit</button>

                                    <button onClick={() => {
                                        setOpenConfirmBox(true)
                                        setDeleteCategory(category)
                                    }}
                                        className="flex-1 bg-red-100 text-red-600 font-medium py-1 rounded hover:bg-red-200">Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {
                openUploadCategory && (
                    <UploadCategoryModel close={() => { setOpenUploadCategory(false) }} fetchData={fetchCategory} />
                )
            }

            {
                openEdit && (
                    <EditCategory data={editData} close={() => { setOpenEdit(false) }} fetchData={fetchCategory} />
                )
            }

            {
                openConfirmBox && (
                    <ConfirmBox close={() => setOpenConfirmBox(false)} cancel={() => setOpenConfirmBox(false)} confirm={handleDeleteCategory} />
                )
            }

        </section>
    )
}

export default CategoryPage
