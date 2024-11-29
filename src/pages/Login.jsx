import React, { useRef } from 'react'
import { useNavigate , Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Firebase/config';

const Login = () => {

  const email = useRef();
  const password = useRef();

  

  
   // navigate
   const navigate = useNavigate()


   const loginUser = (event)=>{
    // login user
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      navigate('/')
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage)
    });

    event.preventDefault()
    email.current.value = ''
    password.current.value = ''
  
  }


const goToRegister = () => {
  navigate('/register')
}




  return (
  
        <>
    <div className='border-4 mx-10 mt-10 p-10'>
    <div className='flex mt-20 justify-center text-2xl font-bold'>
        <h1 className='flex items-center'>Login User</h1>
      </div>
    
    <form onSubmit={loginUser} className='flex  flex-col gap-4 justify-center items-center h-[40vh]'>
    <label className="input input-bordered flex items-center gap-2 ">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="10"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input ref={email} type="email"  placeholder="Email" />
</label>

<label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
  <input ref={password} type="password" className="grow"  placeholder='Enter Password' />
</label>
<div className='flex gap-4'>
<button type='submit' className="  btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Sign In</button>

</div>
    </form>
    <p className='text-center mt-2'>Don't have an Account? <button onClick={goToRegister} className="  btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Register Now</button></p>
    </div>
    
    
    
    </>
    
    
  )
}

export default Login