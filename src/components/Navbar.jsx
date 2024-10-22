import React from 'react'

function Navbar() {
  return (
    <>
    <nav className='flex justify-between  py-5  bg-purple-950 text-white  px-6'>
      <div className="logo">
           <span className='font-bold text-2xl font-serif'>TasksTide</span>
      </div>
      <ul className='flex mx-9 gap-8 '>
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
         <li className='cursor-pointer hover:font-bold transition-all' >Your Tasks</li>
      </ul>
    </nav>
    </>
  )
}

export default Navbar

