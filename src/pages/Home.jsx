import React, { useEffect, useState } from 'react'
import userimage from '../assets/user.png'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy} from "firebase/firestore";
import { auth , db } from '../config/Firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

const Home = () => {

  const [allBlogData , setAllBlogData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getDataFromFireStore = async() =>{

      try{
      const q = query(collection(db, "allblogs") , orderBy('postingTime' , 'desc'));
   
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
     // doc.data() is never undefined for query doc snapshots
     console.log(doc.id, " => ", doc.data());
     allBlogData.push({...doc.data(),
       docid: doc.id
   
     })
    setAllBlogData([...allBlogData])
   });
   
   
      }catch(error){
       console.log(error + 'unable to get data')
     }
     
   }
    getDataFromFireStore()
    
  
   
  }, [])
  



  const swithToUserPage = (uidforSingleUser) => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
      const uid = user.uid;
      navigate (`/user/${uidforSingleUser}`)
      console.log (user.uid)
    } else {
      navigate ('/login')
  }
  })
  }








  return (
    <>
    <h1 className='text-2xl font-bold p-5 text-white bg-black'>Readers Assalamualikum!</h1>
    <h1 className='text-2xl font-bold text-center text-purple-700 tracking-wider mt-2'>"Welcome To Our Tech Blog App"</h1>
    
    <h2 className='text-2xl text-center font-bold m-10'>All blogs</h2>

    {allBlogData.length > 0 ? allBlogData.map((item, index) => {
    return <div key={item.docid} className='flex w-[50%] px-7 py-5 flex-col bg-[#ffffff] justify-center items-start gap-4 rounded-lg shadow-lg  min-h-[40vh] min-w-[300px] m-10 border border-black'>

    <div className=''>

<div className='text-white w-[115px] rounded-lg flex justify-center items-center'>
   <img src={userimage} alt="logo" className='w-100 bg-black'/>
 </div>

  

<div className='flex flex-col justify-start items-start w-[80%] mt-5'>
<p className='font-bold text-2xl w-full break-words'>{item.title}</p>
<p className='text-sm text-[#747779] font-bold'>{item.fullName} - {item.postingDay}</p>
<p className='break-words text-[#7f868d] mt-5'>{item.blog}</p><br  />


</div>

 <div>
  <button onClick={()=> swithToUserPage(item.uid)} className='hover:text-[#dadcde] text-[#7749f8] rounded-lg py-1'>See More From This User</button>
 </div>

</div>







    </div>}): <h1>CHECK YOUR INTERNET CONNECTION!</h1> }
    
    
    </>
  )
}

export default Home