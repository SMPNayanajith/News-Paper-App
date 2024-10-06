import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { userState } from '../../recoil/userState';
import { useRecoilValue } from 'recoil';
import Logout from '../Logout/Logout';

function NavBar() {
  const directLogin =()=>{
    Navigate("/user-login")
    
}

  const user = useRecoilValue(userState);
  console.log("user:", user);

  return (
    <div>
      <nav className="bg-white border border-opacity-15 border-[#565656] m-1">
        <div className="w-full mx-auto h-[56px] flex justify-between items-center px-5">
          {/* Left Side: Logout button */}
          <div className="flex-shrink-0">
            <Logout />
          </div>

          {/* Center: News@Live */}
          <div className="text-center">
            <span className='font-bold  text-[24px] text-[#627BFE]'>News@Live</span>
          </div>

          {/* Right Side: Login or Welcome Message */}
          <div className="flex-shrink-0">
            {user.isLoggedIn ? (
              <span className="font-medium">Welcome, {user.userName}</span>
            ) : (
              <Link to="/user-login">
                <span className="cursor-pointer hover:text-purple-500 font-medium">
                  Login
                </span>
              </Link>
              
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
