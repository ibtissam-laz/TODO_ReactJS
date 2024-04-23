import React, { useState } from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login } from '../features/Slices'
import { userLogin } from '../features/Services'

export default function Login() {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [isError, setError] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = async(e) => {
        e.preventDefault()
            const res = await userLogin({ email: email, pass: pass })
            if(res.message === 'success'){
                console.log('you logged in')
                setError(false)
                dispatch(login())
                navigate("/Notes")
            }else {
                setError(true)
            }
}

    return (
        <>
        <div className='login'>
        {isError && (
                <div> <FontAwesomeIcon icon={faTimes} color="red" />
                <span> the email or the password are invalid! </span></div>
            )}
        
            <form onSubmit={handleSubmit}>
                <h1>LogIn</h1>
                <label htmlFor="email">Email: </label>
                    <br/>
                    <input
                        type="email"
                        id="email"
                        aria-describedby="emailHelpId"
                        placeholder="email"
                        autoComplete='off'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    /> <br/>
                    <label htmlFor="password">Password: </label>
                    <br/>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        autoComplete='off'
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        required
                    /> <br/>
                <button type='submit'>Log In</button>
            </form>
        </div>
        <p>You don't have an account?</p>
        <Link to='/Register'><p>Sign Up in here</p></Link>
        
        </>
    )
}