import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/Firebase/config';
import { collection, addDoc } from "firebase/firestore"; 


const Register = () => {

 const fullName = useRef();
 const email = useRef();
 const password = useRef();
 const repeatPassword = useRef()
 const [regisSuccess , setRegisSuccess] = useState(false)

  

  


 

 // navigate
 const navigate = useNavigate()

 const registerUser = (event) => {

    event.preventDefault();
    setRegisSuccess(false)
    
    

    


  // register user
  
 createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then(async (userCredential) => {
    // Signed up 
    const user = userCredential.user;

    


   const docRef = await addDoc(collection(db, "users"), {
    fullName: fullName.current.value,
    uid: auth.currentUser.uid,
    email: email.current.value,
   });
   console.log("Document written with ID: ", docRef.id);
   
     fullName.current.value = ''
     email.current.value = ''
     password.current.value = ''
     repeatPassword.current.value = ''
     setRegisSuccess(true)



     console.log(user)
     navigate('/login')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });


 }





  return (
    <>
     {/* Register Componet */}

    <div className='border-4 mx-10 mt-10 p-10'>
    <div className='flex mt-20 mb-5 justify-center text-2xl font-bold'>
        <h1 className='flex items-center'>Register/Login User</h1>
      </div>
    
    <form onSubmit={()=>registerUser(event)} className='flex  flex-col gap-4 justify-center items-center h-[40vh]'>
    <label className="input input-bordered flex items-center gap-2 ">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input ref={fullName} type="text"  placeholder="Full Name" />
</label>

    <label className="input input-bordered flex items-center gap-2 ">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
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
  <input ref={repeatPassword} type="password" className="grow"  placeholder='Repeat Password' />
</label>
<div className='flex gap-4'>
<button type='submit' className="  btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Sign Up</button>
</div>
    </form>
  {regisSuccess && <div role="alert" className="alert alert-success">
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-6 w-6 shrink-0 stroke-current"
  fill="none"
  viewBox="0 0 24 24">
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
<span>Registration Successful!</span>
</div>}
    </div>

    
    
    </>
  )
}

export default Register