import React, { useEffect, useRef, useState } from 'react'
import { collection, addDoc, Timestamp, getDocs, query, where, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from '../config/Firebase/config';
import userimage from '../assets/user.png'



const Dashboard = () => {

    // states
 const [loading, setLoading] = useState(false);
 const [blogData, setBlogData] = useState([]);
 const [userObj , setUserObj] = useState({})
 const [error , setError] = useState(true)
 const [editModal , setEditModal ] = useState(false)
 const [editindex , setIndex] = useState(0)
 const [Item1 , setItem]= useState(null)

 
 const title = useRef()
 const blog = useRef()
 const name = useRef()
 const descr = useRef()
 
 useEffect(() => {
   const getDataFromFireStoreBlog = async() =>{

   try{
   const q = query(collection(db, "allblogs"), where("uid", "==", auth.currentUser.uid) , orderBy('postingTime' , 'desc'));

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
    const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));

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




















//  add blog 
const postBlog = async(event) => {
  event.preventDefault()
  setLoading(true)
  
  // Add a new document with a generated id.
  try {
    const docRef = await addDoc(collection(db, "allblogs"), {
      title: title.current.value,
      blog: blog.current.value,
      uid: auth.currentUser.uid,
      postingTime: Timestamp.now(),
      postingDay: getDate(),
      fullName: userObj.fullName,
      
    });
    console.log("Document written with ID: ", docRef.id);
    blogData.unshift({
      title: title.current.value,
      blog: blog.current.value,
      uid: auth.currentUser.uid,
      postingTime: Timestamp.now(),
      postingDay: getDate(),
      fullName: userObj.fullName,
      docid: docRef.id
    })
    setBlogData([...blogData])
    title.current.value = ''
    blog.current.value = ''
    // setError(false)

} catch (e) {
  console.error("Error adding document: ", e);
} finally{
  setLoading(false)
}




 }


 function getDate() {
  const date = new Date();
  const day = new Intl.DateTimeFormat('en-GB', { day: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(date);
  const year = new Intl.DateTimeFormat('en-GB', { year: 'numeric' }).format(date);

  // Combine all parts with a comma after the day
  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
}



// delete blog from database
const deleteBlog = async (item , index) => {
  try {
    await deleteDoc(doc(db, "allblogs", item.docid));
    blogData.splice(index , 1)
    setBlogData ([...blogData])
    console.log('deleted')
    }catch {
    console.log ('unable to delete')
  }
}

  //edit blog from database
  


    const editFunc = (item , index) =>{
      // document.getElementById('my_modal_3').showModal()

      setEditModal (true)
      setIndex (index)
      setItem (item)
    }
    
    const editBlog = async(item , index, event) =>{
     
      event.preventDefault();
     console.log(item.docid)
    
   
    const washingtonRef = doc(db, "allblogs", item.docid);
    try{
     const updatedTitle = name.current.value;
     const updatedBlog = descr.current.value;
 
     console.log("Title:", updatedTitle);
     console.log("Blog:", updatedBlog);
     console.log(item.docid);
 
     await updateDoc(washingtonRef, {
    title: updatedTitle,
    blog: updatedBlog
   });
   blogData[index].title = updatedTitle
   blogData[index].blog = updatedBlog
   setBlogData([...blogData])
   name.current.value = ''
   descr.current.value = ''
  //  document.getElementById('my_modal_3').close();
  setEditModal(false)
 }catch(error){
   console.log(error + 'nhi ho raha hai')
 
 }
    }








  




  return (
    <>
       <h1 className='text-center font-bold mt-5 text-2xl'>Dashboard</h1>

{/* form  */}
  <div className='mt-10 max-w-[881px] mx-auto border-4 border-fuchsia-500 p-4 sm:p-6 rounded-md shadow-lg bg-white'>
  <form className='flex  flex-col gap-4 justify-center items-center'>

<label  className="form-control w-full max-w-xs">
<div className="label">
 <span className="label-text text-2xl">Blog Title?</span>
</div>
<input ref={title}  type="text" placeholder="Write Your Blog Title" className="input input-bordered w-full max-w-xs" />
</label>
<textarea className="textarea textarea-secondary w-[20rem]" placeholder="What is in Your Mind?" ref={blog}></textarea>

<button type='submit'onClick={postBlog} className=" btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">{loading ? <span className="loading loading-dots loading-lg"></span> : "Publish Blog!"}</button>
</form>
{/* form end */}
</div>
    
<h1 className='mt-10 max-w-[881px] mx-auto font-bold text-2xl'>My Blogs</h1>

<div className='mt-10 max-w-[881px] mx-auto border-4 border-fuchsia-500 p-4 sm:p-6 rounded-md shadow-lg bg-white'>
{/* {error && <h1 className='text-center mt-5'>Add Blogs!</h1>} */}


{blogData.length > 0 ? blogData.map((item, index) => {
          return <div key={item.docid} className='flex w-[100%] px-7 py-5 flex-col bg-[#ffffff] justify-center items-start gap-4 rounded-lg shadow-lg  min-h-[40vh] min-w-[300px] mt-10 border border-black'>

            <div className=''>

             <div className='text-white w-[115px] rounded-lg flex justify-center items-center'>
                <img src={userimage} alt="logo" className='w-100 bg-black'/>
              </div>

               

             <div className='flex flex-col justify-start items-start w-[80%] mt-5'>
             <p className='font-bold text-2xl w-full break-words'>{item.title}</p>
             <p className='text-sm text-[#747779] font-bold'>{userObj.fullName} - {item.postingDay}</p>
             <p className='break-words text-[#7f868d] mt-5'>{item.blog}</p><br  />


             <div className=''>
              <button className=" m-5 px-10 btn btn-success" onClick={()=>editFunc(item , index)}  >Edit</button>
              <button className=" px-10 btn btn-error" onClick={() => {

             
                document.getElementById('delete-modal').showModal()
              }}>Delete</button>
             </div>

             </div>


            </div>

              

           
            
            
<dialog id="delete-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">You Want To Delete !</h3>
          <p className="py-4">Are You Sure?</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-error mx-2" onClick={()=> deleteBlog(item , index)}>Yes</button>
              <button className="btn btn-success mx-2">No</button>
            </form>
          </div>
        </div>
      </dialog>
        </div>
        }): <h1 className='font-bold text-center'>Add Blogs!</h1> }
</div>

    {editModal ?    <div className="fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-transparent">
    <div className="modal-box">
      
        {/* if there is a button in form, it will close the modal */}
      
      <h3 className="font-bold text-lg mb-5">Update Blog!</h3>
      
      <form onSubmit={(event)=>editBlog(Item1 , editindex, event)}>
 
      <label className="form-control w-full max-w-xs">
      <div className="label">
     <span className="font-bold">Title</span>
     </div>
    <input ref={name}  type="text" placeholder="Write Your Blog Title" className="input input-bordered w-full max-w-xs" />
    <div className="label">
    </div>
    </label>
 
    <label  className="form-control">
   <div className="label">
     <span className="font-bold">Blog</span>
   </div>
   <textarea ref={descr}  className="textarea textarea-bordered h-24" placeholder="What is in your Mind?"></textarea>
   <div className="label">
   </div>
 </label>
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
 <button type='submit'  className='btn btn-primary w-full mt-3 font-bold'>Update</button>
 
      </form>
    </div>
  </div> : null}
    
    
    </>
  )
}

export default Dashboard

// {/* You can open the modal using document.getElementById('ID').showModal() method */}
// <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button>
// <dialog id="my_modal_3" className="modal">
//   <div className="modal-box">
//     <form method="dialog">
//       {/* if there is a button in form, it will close the modal */}
//       <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//     </form>
//     <h3 className="font-bold text-lg">Hello!</h3>
//     <p className="py-4">Press ESC key or click on ✕ button to close</p>
//   </div>
// </dialog>