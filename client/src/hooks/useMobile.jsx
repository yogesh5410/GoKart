import React, { useState, useEffect } from 'react'

export const useMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(window.innerwidth < breakpoint)
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < breakpoint)
        
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    })
    return isMobile
}
