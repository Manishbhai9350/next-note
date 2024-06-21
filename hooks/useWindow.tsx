'use client'
import {useEffect,useState} from 'react'

const useWindow = () => {
    const [width,setWidth] = useState(0)
    const [height,setHeight] = useState(0)
    
    const resize = () => {
        setHeight(innerHeight)
        setWidth(innerWidth)
    }
    useEffect(() => {
        resize()
        window.addEventListener('resize',resize)
        
      return () => {
          window.removeEventListener('resize',resize)
      }
    }, [])
    return {width,height}
}

export default useWindow;