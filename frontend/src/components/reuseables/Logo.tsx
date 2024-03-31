import React from 'react'
import { useNavigate } from 'react-router-dom'
interface LogoType{
  className?: string
  link?:Boolean
}
const Logo: React.FC<LogoType> = ({ className, link = false }) => {
  const handleClick = () => {
    if (link) {
    navigate("/")
    }
}

  const navigate = useNavigate()
  return (
    <p onClick={handleClick} className={` ${className}  tracking-tight font-heading font-extrabold text-3xl md:text-5xl text-primary`}>TJH</p>
  )
}

export default Logo