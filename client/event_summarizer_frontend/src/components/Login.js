import React, { useState, useEffect } from 'react'
import InputField from './InputField'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")


    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            navigate("/home")
        }
    },[navigate])

    
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("")
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [errorMessage])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responces = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const result = await responces.json();

            if (result.token && responces.ok) {

                localStorage.setItem("token", result.token)
                navigate("/home");
            } else {
                setErrorMessage(result.message || "Login failed, please try again!");
            }

        } catch (err) {
            console.error(err.message)

        } finally {
            setEmail("")
            setPassword("")
        }
    }

    return (
        <div>
            <div className='flex justify-end'>
                {errorMessage && <p className="text-red-500 text-lg font-semibold absolute p-5 transition-opacity duration-500 ease-in-out ${errorMessage ? 'opacity-100' : 'opacity-0'">{errorMessage}</p>}
            </div>
            <div className='bg-teal-100 h-screen flex justify-center items-center'>
                <div className='w-full h-full md:w-7/12 md:h-4/5 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-wrap relative'>

                    <div className='xl:w-1/2 w-full'>
                        <p className='absolute z-10 font-extrabold text-3xl md:text-4xl xl:text-5xl text-teal-400 pl-14 pt-10'>
                            WELCOME
                        </p>

                    </div>
                    <div className='w-full h-full bg-teal-200 -rotate-12 -translate-x-1/2 translate-y-2 rounded-xl absolute'></div>

                    <div className='xl:w-1/2 w-full p-24 z-20 flex justify-center items-center'>
                        <div className='md:size-full'>
                            <p className='font-extrabold text-teal-400 text-4xl text-center mb-10'>Login</p>
                            <form onSubmit={handleSubmit}>
                                <InputField
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />

                                <InputField
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                />

                                <div className='flex justify-center mt-8'>
                                    <input type="submit" value="Log in"
                                        className='bg-teal-300 text-zinc-100 px-16 py-1 font-semibold text-xl rounded-full shadow-xl' />
                                </div>
                            </form>


                            <p className='mt-5 text-right'>Create account !!<strong className='text-teal-300'><Link to="/signup">  sign up </Link> </strong></p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Login