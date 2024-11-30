import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../config/Firebase/config';
import { collection, query, where, getDocs } from "firebase/firestore";


const Navbar = () => {
  
  const [userCheck , setUserCheck] = useState(false)
  const [userObj , setUserObj] = useState({})

// use navigate
const navigate = useNavigate()

const getDataFromFireStore = async() => {
  
const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  setUserObj({...doc.data()})
});
}






useEffect(() => {
  onAuthStateChanged(auth , (user) => {
    if(user){
       getDataFromFireStore();
        setUserCheck(true)
        return
    }
       
    
  })
 

}, [])

// logout user
const logoutUser = () => {
signOut(auth).then(() => {
  navigate('/login')
}).catch((error) => {
  // An error happened.
});
}

  return (

         // Navbar Component
    
    <>
    <div className="navbar bg-primary text-primary-content">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className=" font-bold menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <summary>Register/Login</summary>
          <ul className="p-2">
            <li><Link to={'register'}>Register</Link></li>
            <li><Link to={'login'}>Login</Link></li>
          </ul>
        </li>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'about'}></Link></li>
        <li><button onClick={logoutUser} className="  text-2xl bg-lime-300 hover:bg-rose-600 py-1 btn border-black border-4">Log Out</button></li>
        
      </ul>
    </div>


    {/* desk top */}
    <Link to={'/'} className="btn btn-ghost text-xl">Daily Tech-Blogs </Link>
  </div>
  {userCheck ? ( <div className=" font-bold navbar-end hidden lg:flex ">

        <ul className="menu menu-horizontal px-1">
      <li>
        <details>
          <summary>
            <button>
              <img src="https://i.ibb.co/yVJBYFG/businessman-character-avatar-isolated-24877-60111.jpg" alt="user Avatar" className="w-8 h-8 rounded-full border-2 border-white" />
            </button>
            <span className=" font-bold">{userObj.fullName}</span>
          </summary>
          <ul>
          <li><Link to={'/'} >Home</Link></li>
          <li><Link to={'/dashboard'}>Dashboard</Link></li>
          <li><Link to={'/profile'}>Profile</Link></li>
          <li><button onClick={logoutUser} className=" text-2xl bg-lime-300 hover:bg-rose-600 py-1 btn border-black border-4 ">Log Out</button></li>
          </ul>
        </details>
      </li>
      
    </ul>
  </div>): <li><Link to={'login'} className='font-bold border-solid border-8 border-yellow-300 hover:bg-lime-300 p-2 bg-white'>Login/Register</Link></li>}
  
</div>
    
    
    </>
  )
}

export default Navbar



