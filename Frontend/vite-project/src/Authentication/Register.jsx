import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import './Register.css'
const Schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    Password: yup.string().min(4).max(16).required(),
    confirmpassword:yup.string().oneOf([yup.ref('Password'),null]).required()
})
const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate= useNavigate()
  const [confirmpassword, setConfirmPassword] = useState('');
  const [data,setData]= useState('')
    const {register,handleSubmit,formState:{errors} } = useForm({
        resolver:yupResolver(Schema)
    })
  const Submit = async (data) => {
    const { email, username, Password } = data
    try {
      const results = await axios.post('http://localhost:3300/register', {
        email,
        username,
        Password
      })
      const delay = 1000;
      if (results) {
        setData(results.data)
        const timerId = setTimeout(() => {
          navigate('/message')
        },delay)
        return ()=>clearTimeout(timerId)
      }
    } catch (e) {
      console.log(e)
    }
  }  
    console.log(data)
    return (
      <div>
            
        <form className='form-content' onSubmit={handleSubmit(Submit)}>
          <div>
            <h2 className='response'>{data}</h2>
         </div>
        <div>
             <h1>SignUp</h1>
        </div>          
          <div className='form-input'>
                  <input placeholder='Username' name='username' autoComplete='off' type='text' onChange={(e)=>setName(e.target.value)} {...register('username')} className='form-input'/>      
                </div>
                <p className='form-error'> {errors.username?.message}</p>
           <div className='form-input'>
                    <input placeholder='Email' name='email' autoComplete='off' type='email'onChange={(e)=>setEmail(e.target.value)}{...register('email')} className='form-input'/>
                </div>
                     <p className='form-error'> {errors.email?.message}</p>
           <div className='form-input'>
                   <input placeholder='Password' name='Password' autoComplete='off' type='password' onChange={(e)=>setPassword(e.target.value)} {...register('Password')} className='form-input'/>         
                </div>
                <p className='form-error'> {errors.Password?.message}</p>
                <div className='form-input'>
                    <input placeholder='Confirm Password' name='confirmpassword' autoComplete='off' onChange={(e)=>setConfirmPassword(e.target.value)} type='password' {...register('confirmpassword')} className='form-input' />
                </div>
                <p className='form-error'> {errors.confirmpassword && 'Password do not match'}</p>
          <div className='form-button'>
                    <button className='button' type='submit' >Submit</button>   
            </div>
          </form>  
           
    </div>
      
  )
}

export default Register