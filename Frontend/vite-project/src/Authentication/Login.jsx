import React, { useState, useContext } from 'react'
import {LoginContext} from '../AuthContext/LoginContext'
import { useForm } from 'react-hook-form';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './Login.css'
const Schema = yup.object().shape({
    email: yup.string().email().required(),
    Password: yup.string().min(4).max(16).required(),
})
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const { data, setData } = useContext(LoginContext);
    const {register,handleSubmit,formState:{errors} } = useForm({
        resolver:yupResolver(Schema)
    })
    const Submit = async(data) => {
        const { Password, email } = data;
        try {
            const result = await axios.post('http://localhost:3300/login', {
                email,
                Password
            })
         
           const delay = 1000;
            if (result) {
                setData(result.data);
                const timerId = setTimeout(() => {
                    if (result.data.name) {
                        navigate('/message')   
                   }
                }, delay)
                return () => clearTimeout(timerId);
            }
        } catch (e) {
            console.log(e)
        }
    }
    console.log(data)
  return (
      <div>
          <form className='form-login' onSubmit={handleSubmit(Submit)}>
              <div>
                  {data.name ? <h2 className='response'>Login Successfull</h2> : <h2 className='response'>{ data}</h2>}
              </div>
        <div>
             <h1>Login</h1>
        </div>          
         
           <div className='form-input'>
                    <input placeholder='Email' name='email' autoComplete='off' type='email'onChange={(e)=>setEmail(e.target.value)}{...register('email')} className='form-input'/>
                </div>
                     <p className='form-error'> {errors.email?.message}</p>
           <div className='form-input'>
                   <input placeholder='Password' name='Password' autoComplete='off' type='password' onChange={(e)=>setPassword(e.target.value)} {...register('Password')} className='form-input'/>         
                </div>
                <p className='login-error'> {errors.Password?.message}</p>
          <div className='form-button'>
                    <button className='button' type='submit' >Submit</button>
            </div>
            </form>  
    </div>
  )
}

export default Login