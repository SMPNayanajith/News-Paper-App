import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/userState';
import Logout from '../Logout/Logout';


function NavBar() {
  const user = useRecoilValue(userState); // Access user state
  const navigate = useNavigate();

  const navigateToDetails = () => {
    if (user.roleType === 'reporter') {
      navigate('/mydeatails');
    } else if (user.roleType === 'reader') {
      navigate('/readerDetails');
    }
  };

  return (
    <div>
      
      <nav className="bg-white border border-opacity-15 border-[#565656] m-1">
        <div className="w-full mx-auto h-[56px] flex justify-between items-center px-5">
          {/* Left Side: Logo and Navigation */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <span className="font-bold text-[24px] text-[#627BFE]">News@Live</span>

            {/* Home Page Link */}
            <button
              className="cursor-pointer hover:text-purple-500 font-medium"
              onClick={() => navigate('/')}
            >
              Home
            </button>

            {/* My Account Link */}
            {user.isLoggedIn && (
              <button
                className="cursor-pointer hover:text-purple-500 font-medium"
                onClick={navigateToDetails}
              >
                My Account
              </button>
            )}
          </div>

          {/* Right Side: Login or Logout */}
          <div className="flex-shrink-0 flex items-center space-x-8">
            {user.isLoggedIn ? (
              <>
                <span className="font-medium">Welcome, {user.userName}</span>
                <Logout />
              </>
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
