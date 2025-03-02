import React from 'react'
import noDataImage from '../assets/noData.png'

const NoData = () => {
    return (
        <div className='flex flex-col justify-center items-center p-8 gap-0'>
            <img
                src={noDataImage}
                alt="NO DATA"
                className='w-40 h-40'
            />
            <p className="font-semi-bold text-2xl">No Data</p>
        </div>
    )
}

export default NoData
