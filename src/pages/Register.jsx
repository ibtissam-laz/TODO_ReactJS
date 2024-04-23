import React, { useEffect, useState } from 'react'
import '../styles/Register.css'
import { Link } from 'react-router-dom'
import { signUp } from '../features/Services'
import { useNavigate } from 'react-router-dom'
export default function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [username, setUsername] = useState('')
    const [isSuccess, setSuccess] = useState(false)
    const [passError, setPassError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [userError, setUserError] = useState('')
    useEffect(() =>{
        const validPass = async () => {
            if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(pass)) {
                setPassError('The password requires minimum of 8 characters that includes at least one number, one lowercase letter and one uppercase letter.')
            }else{
                setPassError('')
            }
        }
        validPass()
    },[pass])
    useEffect(() =>{
        const validUser = async () => {
            if(!/^[a-zA-Z][a-zA-Z0-9-_]{3,}$/.test(username)){
                setUserError('The username has to have at least 3 letters')
            }
            else {
                setUserError('')
            }
        }
        validUser()
    },[username])
    useEffect(() =>{
        const validEmail = async () => {
            if(!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)){
                setEmailError('Invalid Email!')
            } else {
                setEmailError('')
            }
        }
        validEmail()
    },[email])
    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            const newUser = await signUp(email, pass, username)
        if(newUser){
            setSuccess(true)
            navigate('/Login')
        } else {
            setSuccess(false)
        }
        }catch(error){
            setSuccess(false)
            console.error('Failed to create the user', error)
        }
    }
    return(
        <>
        <div className='register'>
                <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                    <br/>
                    <input
                        type='text'
                        id='username'
                        placeholder='username'
                        autoComplete='off'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label className="errorLabel">{userError}</label>
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
                    /> <label className="errorLabel" color='red'>{emailError}</label>
                    <br/>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        autoComplete='off'
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        required
                    /> 
                    <label className="errorLabel" color='red'>{passError}</label>
                    <br/>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <p>Already registered?</p>
            <Link to='/Login'><p>Log In here</p></Link>
        </>
    )
}
