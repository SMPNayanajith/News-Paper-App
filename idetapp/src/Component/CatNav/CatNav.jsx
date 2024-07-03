import React from 'react'
import { FaBaseball } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { TbRibbonHealth } from "react-icons/tb";

function CatNav() {
  return (
    <div className='w-full  max-h-[56px] border-y-[1px] border-[#565656] border-opacity-25'>
      <ul className='w-full flex'>
        <li className='w-1/3'>
            <div className='w-full px-2 bg-sky-800 flex justify-center items-center flex-row space-x-2 text-white'>
            <span><FaBaseball/></span>
            <span>Sports</span>

            </div>
        </li>
        <li className='w-1/3'>
            <div className='w-full px-2  flex justify-center items-center flex-row space-x-2 text-gray-600'>
            <span><FaUserTie/></span>
            <span>Politics</span>

            </div>
        </li>
        <li className='w-1/3'>
            <div className='w-full px-2  flex justify-center items-center flex-row space-x-2 text-gray-600'>
            <span><TbRibbonHealth/></span>
            <span>Health News</span>

            </div>
        </li>
      </ul>
    </div>
  )
}

export default CatNav
