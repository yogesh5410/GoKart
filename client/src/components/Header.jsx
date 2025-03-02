import React, { useState, useEffect } from 'react'
import logo from "../assets/logo.png"
import Search from "./Search.jsx"
import { Link } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6"
import { useMobile } from "../hooks/useMobile.jsx"
import { useLocation, useNavigate } from 'react-router-dom'
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux'
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu.jsx"
import { DisplayPriceInRupees } from '../utils/displayPriceInRupees.js'
import { useGlobalContext } from '../provider/GlobalProvider.jsx';
import DisplayCartItem from './DisplayCartItem.jsx'

const Header = () => {
    const isMobile = useMobile()
    const location = useLocation()
    const isSearchPage = location.pathname === '/search'
    const navigate = useNavigate()
    const user = useSelector((state) => state?.user)
    const [openUserMenu, setOpenUserMenu] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    // const [totalPrice, setTotalPrice] = useState(0)
    // const [totalQty, setTotalQty] = useState(0)
    const { totalPrice, totalQty} = useGlobalContext()
    const [openCartSection,setOpenCartSection] = useState(false)


    const handleCloseUserMenu = () => {
        setOpenUserMenu(false)
    }

    const redirectToLoginPage = () => {
        navigate('/login')
    }

    const handleMobileUser = () => {
        if (!user._id) navigate('/login')
        else navigate('/user')
    }

    //total item and total price
    // useEffect(() => {
    //     const qty = cartItem.reduce((preve, curr) => {
    //         return preve + curr.quantity
    //     }, 0)           //0=initial value
    //     setTotalQty(qty)

    //     const tPrice = cartItem.reduce((preve, curr) => {
    //         return preve + (curr.productId.price * curr.quantity)
    //     }, 0)
    //     setTotalPrice(tPrice)

    // }, [cartItem])


    return (
        <header className="h-28 lg:h-20 shadow-md bg- bg-green-500 sticky top-0 z-40 flex flex-col justify-center gap-1">

            {
                !(isSearchPage && isMobile) && (
                    <div className="container mx-auto flex items-center px-2 justify-between">
                        {/* Logo */}
                        <div className="h-full">
                            <Link to={"/"} className="h-full flex justify-center items-center">
                                <img src={logo} width={170} height={60} alt='logo' className="hidden lg:block" />
                                <img src={logo} width={120} height={60} alt='logo' className="lg:hidden" />
                            </Link>
                        </div>

                        {/* Search */}
                        <div className="hidden lg:block">
                            <Search />
                        </div>


                        {/**login and my cart */}
                        <div>
                            {/* mobile version */}
                            <button onClick={handleMobileUser} className="text-balck lg:hidden">
                                <FaRegCircleUser size={30} />
                            </button>
                            {/* desktop version */}
                            <div className="hidden lg:flex items-center gap-10">
                                {

                                    user?._id ? (
                                        <div className="relative">
                                            <div onClick={() => setOpenUserMenu(!openUserMenu)} className="flex items-center gap-1 cursor-pointer select-none">
                                                <p>Account</p>
                                                {
                                                    openUserMenu ? (
                                                        <GoTriangleUp size={25} />
                                                    ) : (
                                                        <GoTriangleDown size={25} />
                                                    )
                                                }
                                            </div>
                                            {
                                                openUserMenu && (
                                                    <div className="absolute right-0 top-12">
                                                        <div className="bg-white rounded p-2 min-w-52 lg:shadow-lg">
                                                            <UserMenu close={handleCloseUserMenu} />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ) : (
                                        <button onClick={redirectToLoginPage} className="text-lg px-2">Login</button>
                                    )

                                }

                                <button onClick={()=>setOpenCartSection(true)} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-800 px-2 py-2 rounded text-white text-sm">
                                    {/* add to cart button */}
                                    <div className="animate-bounce">
                                        <BsCart4 size={28} />
                                    </div>
                                    {
                                        cartItem[0] ? (
                                            <div>
                                                <p>{totalQty} Items</p>
                                                <p>{DisplayPriceInRupees(totalPrice)}</p>
                                            </div>
                                        ) : (
                                            <p>My Cart</p>
                                        )
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            <div className="container mx-auto px-2 lg:hidden">
                <Search />
            </div>

            {
            openCartSection && (
                <DisplayCartItem close={()=>setOpenCartSection(false)}/>
            )
        }
        </header>
    )
}

export default Header
