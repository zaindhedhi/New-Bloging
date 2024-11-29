import React, { useEffect, useRef, useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from '../config/Firebase/config';
import { updatePassword } from 'firebase/auth';
import userimage from '../assets/user.png'

const Profile = () => {
  const newpassword = useRef()
  const repeatnewpassword = useRef()
  const [userObj , setUserObj] = useState({})
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);


 useEffect(() => {
   const getDataFromFireStore = async() => {
    const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  setUserObj({...doc.data()})
});
   }
 
   getDataFromFireStore()

 }, [])
 
 const updateUserPassword = (event) => {
      event.preventDefault()



      if(newpassword.current.value === repeatnewpassword.current.value){
        const user = auth.currentUser;
      const newPassword = repeatnewpassword.current.value;

      updatePassword(user, newPassword).then(() => {
        // Update successful.
        console.log('Password update')
        newpassword.current.value = ''
        repeatnewpassword.current.value = ''

     // Show the alert after successful submission
     setShowAlert(true);
     // Hide the alert after 3 seconds
     setTimeout(() => {
      setShowAlert(false);
     }, 3000);

      }).catch((error) => {
        // An error ocurred
        // ...
        console.log(error)
        // Show the alert for error
     setShowError(true);
     // Hide the alert after 3 seconds
     setTimeout(() => {
      setShowError(false);
     }, 5000);
      });


      } else {
        console.log('password mismatch')
      }
 }









  return (
    <>
    <h1 className='text-2xl font-bold p-5 text-white bg-black text-center'>Profile</h1>

    {/* card */}
    <div className='flex justify-around m-5 '>
    <div className="card bg-base-100 w-96  shadow-xl border-2 border-black ">
  <figure className="px-10 pt-10">
    <img
      src={userimage}
      alt="Shoes"
      className="rounded-xl" />
  </figure>
  <div className="card-body  text-start ">
    <h2 className="card-title mb-5">{userObj.fullName}</h2>
    <p className='font-bold text-indigo-700 tracking-wider'>Change Password</p>

    <form onSubmit={() => updateUserPassword(event)}>
 
    <input ref={newpassword} type="password" placeholder="New Password" className="input input-bordered w-full max-w-xs mb-2" />
    <input ref={repeatnewpassword} type="password" placeholder="Confirm Password" className="input input-bordered w-full max-w-xs" />

    <div className="card-actions">
      <button type='submit' className="btn btn-wide mt-3 bg-black text-white hover:bg-blue-600">Update Password</button>
    </div>
    </form>

  </div>
</div>
    </div>

    <div className="fixed top-20 right-0 p-5">

    {showAlert && <div role="alert" className="alert alert-success">
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
    <span>Password Has Been Changed!</span>
    </div>}
    </div>
    
    {/* error */}

    <div className="fixed top-20 right-0 p-5">

    {showError && <div role="alert" className="alert alert-error">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>Error! Require Login Again.</span>
</div>}
    </div>
    
    
    
    
    </>
  )
}

export default Profile