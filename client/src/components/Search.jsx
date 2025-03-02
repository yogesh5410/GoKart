import React, { useState, useEffect } from 'react'
import { IoSearch } from "react-icons/io5";
import { TypeAnimation } from 'react-type-animation';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { useMobile } from '../hooks/useMobile';

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMobile();
  const params = useLocation()
  const searchText = params.search.slice(3)

  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    const isSearch = location.pathname === '/search';
    setIsSearch(isSearch);
  }, [location])

  const redirectToSearchPage = () => {
    navigate('/search');
  }

  const handleOnChange = (e) => {
    const value = e.target.value 
    const url = `/search?q=${value}`
    navigate(url)
  }

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg overflow-hidden flex items-center text-neutral-500 bg-slate-200 group focus-within:border-primary-200 border-2">
      {
        (isMobile && isSearch) ? (
          <Link to ={"/"} className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full ">
            <FaArrowLeft size={22} />
          </Link>
        ) : (
          <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
            <IoSearch size={22} />
          </button>
        )
      }


      <div className="w-full h-full flex items-center">
        {
          !isSearch ? (
            // when not in search page
            <div onClick={redirectToSearchPage}>
              <TypeAnimation
                sequence={[
                  'Search "sugar"',
                  1000,
                  'Search "bread"',
                  1000,
                  'Search "paneer"',
                  1000,
                  'Search "curd"',
                  1000,
                  'Search "milk"',
                  1000,
                  'Search "rice"',
                  1000,
                  () => {
                    console.log('Sequence completed');
                  },
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ fontSize: '1em', display: 'inline-block' }}
              />
            </div>
          ) : (
            // when in search page
            <div className="h-full w-full">
              <input
                type="text"
                placeholder="Search items"
                autoFocus
                defaultValue={searchText}
                className="w-full bg-transparent h-full outline-none"
                onChange={handleOnChange}
              />
            </div>
          )
        }
      </div>

    </div>
  )
}

export default Search
