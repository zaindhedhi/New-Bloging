import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import userimage from '../assets/user.png'
import { collection, addDoc, Timestamp, getDocs, query, where, orderBy, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from '../config/Firebase/config';

const SingleUser = () => {

    const {id} = useParams()
    const [blogData , setBlogData] = useState([])
    const [userObj , setUserObj] = useState({})
    const navigate = useNavigate()

 useEffect(() => {
    const getDataFromFireStoreBlog = async() =>{

        try{
        const q = query(collection(db, "allblogs"), where("uid", "==", id) , orderBy('postingTime' , 'desc'));
     
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
       // doc.data() is never undefined for query doc snapshots
       console.log(doc.id, " => ", doc.data());
       blogData.push({...doc.data(),
         docid: doc.id
     
       })
      setBlogData([...blogData])
     });
     
     
        }catch(error){
         console.log(error + 'unable to get data')
       }
       
     }
      getDataFromFireStoreBlog()
 
  
 }, [])
 
 useEffect(() => {
    const getDataFromFireStore = async() => {
        const q = query(collection(db, "users"), where("uid", "==", id));
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setUserObj({...doc.data(),
            docid: doc.id
            
          });
        });
      }
      
      getDataFromFireStore()

 }, [])
 








  return (
    <>
    <h1 className='text-2xl font-bold p-5 text-white bg-black'  onClick={()=> navigate('/')}>{'<'}Back to Home</h1>

    <h2 className='text-2xl text-start font-bold m-10'>{blogData.length > 0 ? 'All from ' + blogData[0].fullName : null}</h2>
    
    <div className='flex flex-col justify-center items-end gap-y-1 absolute right-[60px] '>
        <img src={userimage} alt="logo" className='w-[250px]  mt-[50px] p-5'/>
        <div className='flex flex-col justify-center items-center  '>
        <p className='text-black font-bold underline'>{userObj.email}</p>
        <p className='text-3xl font-bold text-[#7749f8]'>{userObj.fullName}</p>
        </div>
    </div>



   {blogData.length > 0 ? blogData.map((item, index) => {
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

 </div>














    </div>
   }): <h1>No Blog Posted Yet From This User!</h1> }
    
    
    
    
    
    
    
    
    
    </>
  )
}

export default SingleUser