import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login")
        }
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    return (
        <div className='xl:h-24 shadow-xl flex justify-around'>
            <div className='h-full w-3/12 flex items-center'>
                <img src="https://www.summarizer.org/web_assets/frontend/img/logo.png" alt="logo"  className='h-4/5'/>
            </div>
            <div className='h-full w-6/12 flex items-center'>
                <ul className='w-full flex justify-evenly text-lg font-semibold'>
                    <li className='hover:bg-teal-300 cursor-pointer px-4 py-1 rounded-lg ease-in-out duration-300'> <Link to="/home">Home</Link> </li>
                    <li className='hover:bg-teal-300 cursor-pointer px-4 py-1 rounded-lg ease-in-out duration-300'> <Link to="/history">History</Link> </li>
                    <li onClick={handleLogout} className='hover:bg-teal-300 cursor-pointer px-4 py-1 rounded-lg ease-in-out duration-300'>LogOut</li>
                </ul>
            </div>

            
        </div>
    )
}

export default Navbar