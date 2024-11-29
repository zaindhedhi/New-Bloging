import React from 'react'
import userimage from '../assets/user.png'

const Home = () => {














  return (
    <>
    <h1 className='text-2xl font-bold p-5 text-white bg-black'>Readers Assalamualikum!</h1>
    <h1 className='text-2xl font-bold text-center text-purple-700 tracking-wider mt-2'>"Welcome To Our Tech Blog App"</h1>
    
    <h2 className='text-2xl text-center font-bold m-10'>All blogs</h2>

    <div className='flex w-[50%] px-7 py-5 flex-col bg-[#ffffff] justify-center items-start gap-4 rounded-lg shadow-lg  min-h-[40vh] min-w-[300px] m-10 border border-black'>

    <div className=''>

<div className='text-white w-[115px] rounded-lg flex justify-center items-center'>
   <img src={userimage} alt="logo" className='w-100 bg-black'/>
 </div>

  

<div className='flex flex-col justify-start items-start w-[80%] mt-5'>
<p className='font-bold text-2xl w-full break-words'>{item.title}</p>
<p className='text-sm text-[#747779] font-bold'>{userObj.fullName} - {item.postingDay}</p>
<p className='break-words text-[#7f868d] mt-5'>{item.blog}</p><br  />


</div>


</div>







    </div>
    
    
    </>
  )
}

export default Home