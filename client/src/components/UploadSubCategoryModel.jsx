import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import uploadImage from '../utils/UploadImage'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { useSelector } from 'react-redux'

const UploadSubCategoryModel = ({ close, fetchData }) => {
  const [loading, setLoading] = useState(false)
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: []
  })
  const allCategory = useSelector(state => state.product.allCategory)

  const handleChange = (e) => {
    const { name, value } = e.target
    setSubCategoryData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }

    setLoading(true)
    const response = await uploadImage(file)
    console.log(response)
    const { data : ImageResponse } = response

    setSubCategoryData((preve) => {
      return {
        ...preve,
        image: ImageResponse.data.url
      }
    })

    setLoading(false)
  }

  const handleRemoveCategorySelected = (categoryId) => {
    const index = subCategoryData.category.findIndex(el => el._id === categoryId)
    subCategoryData.category.splice(index, 1)       //changes the variable subCategoryData directly

    // setSubcategoryData(subcategoryData)        Does not trigger a re-render because React compares the new state (subcategoryData) with the current state. If they are the same reference, React does not update the component.

    setSubCategoryData((prev) => {
      return {
        ...prev
      }
    })   // Works because it creates a new object reference. Even though the contents remain the same, React sees it as a state change and triggers a re-render.
  }


  const handleSubmitSubCategory = async (e) => {
    e.preventDefault()

    try {

      const response = await Axios({
        ...SummaryApi.createSubCategory,
        data: subCategoryData
      })
  
      const { data : responseData } = response
  
      if(responseData.success) {
        toast.success(responseData.message)
        if(close) close()
          if(fetchData){
            fetchData()
        }
      }

    } catch(error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className="fixed top-0 right-0 left-0 bottom-0 bg-neutral-800 bg-opacity-70 flex justify-center items-center p-4">
      <div className="w-full max-w-5xl bg-white p-4 rounded">
        <div className="flex justify-between items-center gap-3">
          <h1 className="font-semibold">Add Sub Category</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>

        <div>
          <form className="my-3 grid gap-3" onSubmit={handleSubmitSubCategory}>

            <div className="grid gap-1">
              <label htmlFor="name">Sub Category Name</label>
              <input
                id="name"
                name="name"
                value={subCategoryData.name}
                type="text"
                onChange={handleChange}
                className="p-3 border outline-none focus-within:border-primary-100 rounded"
              />
            </div>

            <div className="grid gap-1">
              <p>Image</p>
              <div className="flex flex-col lg:flex-row items-center gap-3">
                <div className="border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center">
                  {
                    subCategoryData.image ? (
                      <img
                        alt='subCategory'
                        src={subCategoryData.image}
                        className='w-full h-full object-scale-down'
                      />
                    ) : (
                      <p className="text-sm text-neutral-500 ">No Image</p>
                    )
                  }
                </div>
                <label htmlFor='uploadSubCategoryImage'>
                  <div className="px-4 py-1 border border-primary-100 text-primary-100 rounded hover:bg-primary-100 hover:text-neutral-800 cursor-pointer">
                    {
                      loading ? "Uploading..." : "Upload Image"
                    }
                  </div>
                  <input
                    type="file"
                    id="uploadSubCategoryImage"
                    className='hidden'
                    onChange={handleUploadSubCategoryImage}
                  />
                </label>
              </div>
            </div>

            <div className="grid gap-1">
              <label>Select Category</label>
              <div className="border outline-none focus-within:border-primary-100 rounded">
                {/*display value*/}
                <div className='flex flex-wrap gap-2'>
                  {
                    subCategoryData.category.map((cat, index) => {
                      return (
                        <p key={cat._id + "selectedValue"} className='bg-white shadow-md px-1 m-1 flex items-center gap-2'>
                          {cat.name}
                          <div className='cursor-pointer hover:text-red-600' onClick={() => handleRemoveCategorySelected(cat._id)}>
                            <IoClose size={20} />
                          </div>
                        </p>
                      )
                    })
                  }
                </div>


                {/*Select category*/}
                <select
                  className='w-full p-2 bg-transparent outline-none border'
                  onChange={(e) => {
                    const value = e.target.value
                    const categoryDetails = allCategory.find(el => el._id == value)

                    setSubCategoryData((preve) => {
                      return {
                        ...preve,
                        category: [...preve.category, categoryDetails]
                      }
                    })
                  }}
                >
                  <option value={""}>Select Category</option>
                  {
                    allCategory.map((category, index) => {
                      return (
                        <option value={category?._id} key={category._id + "subcategory"}>{category?.name}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>

            <button
              className={`px-4 py-2 border
                            ${subCategoryData?.name && subCategoryData?.image && subCategoryData?.category[0] ? "bg-primary-200 hover:bg-primary-100" : "bg-gray-200"}    
                            font-semibold
                        `}
            >
              Submit
            </button>

          </form>
        </div>
      </div>

    </section>
  )
}

export default UploadSubCategoryModel
