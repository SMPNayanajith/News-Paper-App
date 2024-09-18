import React from 'react'
import { Link } from 'react-router-dom';
import { userState } from '../../recoil/userState';
import { useRecoilValue } from 'recoil';



function NavBar() {

  const user= useRecoilValue(userState);
  console.log("user:" ,user);

  return (
    <div>
        <nav className="bg-white border border-opacity-15 border-[#565656] m-1 ">
        <div className="w-full md:w-/ mx-auto h-[56px] flex flex-row justify-between items-center px-5 ">
            <div></div>
            <div>

              {
              user.isLoggedIn ? (<span className=' font-medium' >Welcome,{user.userName}</span>):(<Link to="/user-login">
                    <span className='cursor-pointer hover:text-purple-500 font-medium ' >Login </span>
                </Link>)
              }
                
                
            </div>

        </div>
        </nav>
    </div>
  )
}

export default NavBar
