import React from 'react';
import { useNavigate } from "react-router-dom";
import { useResetRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../../recoil/userState';

function Logout() {
    const navigate = useNavigate();
    const resetUser = useResetRecoilState(userState);  // Resets user state in Recoil
    const user = useRecoilValue(userState); // Get the user state to check if logged in

    const handleLogout = () => {
        // Remove the auth token from localStorage
        localStorage.removeItem('authToken');

        // Reset the Recoil state
        resetUser();

        // Redirect the user to the login page
        navigate('/user-login');
    };

    // Show the "Logout" button only if the user is logged in
    if (!user.isLoggedIn) {
        return null; // If user is not logged in, return nothing
    }

    return (
        <button onClick={handleLogout} className="logout-button cursor-pointer hover:text-purple-500 font-medium">
            Logout
        </button>
    );
}

export default Logout;
