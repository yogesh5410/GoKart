import './App.css'
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice.js'
import fetchUserDetails from './utils/fetchUserDetails.js';
import Axios from './utils/Axios.js';
import SummaryApi from './common/SummaryApi.js';
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './store/productSlice.js';
import GlobalProvider from './provider/GlobalProvider.jsx';
import CartMobileLink from './components/CartMobile.jsx'
import { useLocation } from 'react-router-dom';


function App() {
  const dispatch = useDispatch()
  const location = useLocation()

  const fetchUser = async () => {
    const userData = await fetchUserDetails()
    //console.log(userData)
    dispatch(setUserDetails(userData?.data))
  }

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...SummaryApi.getCategory
      })
      //console.log(response)
      const { data: responseData } = response

      if (responseData.success) {
        dispatch(setAllCategory(responseData.data))
      }

    } catch (error) {
      toast.error(error)
    } finally {
      dispatch(setLoadingCategory(false))
    }
  }


  const fetchSubCategory = async () => {
    try {

        const response = await Axios({
            ...SummaryApi.getSubCategory
        })
        //console.log(response)
        const { data: responseData } = response

        if (responseData.success) {
            dispatch(setAllSubCategory(responseData.data))
        }

    } catch(error) {
        toast.error(error)
    }
}




  useEffect(() => {
    fetchUser()
    fetchCategory()
    fetchSubCategory()
  }, [])

  return (
    <GlobalProvider> 
      <Header/>
      <main className='min-h-[78vh]'>
          <Outlet/>
      </main>
      <Footer/>
      <Toaster/>
      {
         location.pathname !== '/checkout' && 
        (
          <CartMobileLink/>
        )
      }
    </GlobalProvider>
  )
}

export default App
