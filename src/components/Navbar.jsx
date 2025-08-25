
import React from 'react'

const Navbar = () => {
  return (
    <nav className = 'bg-slate-800 text-white '>
      <div className='mycontainer flex justify-between items-center px-4 h-14 py-5'>
        <div className="logo font-bold flex flex-row items-end justify-center">
          <img src="icons/lock.png.png" alt="" className='w-6'/>
          <div>
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
          </div>
          </div>
      {/* <ul>
        <li className='flex gap-6'>
          <a className='hover:font-bold text-green-300' href="/">Home</a>
          <a className='hover:font-bold text-green-300' href="#">About</a>
          <a className='hover:font-bold text-green-300' href="#">Contact</a>
        </li>
      </ul> */}
      <button className='text-white bg-green-600 my-5 rounded-full flex justify-between items-center right-[10px] '>
        <img className='invert w-10 p-1' src="/icons/github-mark-white.svg" alt="github logo" />
        <span className='font-bold px-2'>Github</span>
      </button>
      </div>
      
    </nav>
  )
}

export default Navbar
