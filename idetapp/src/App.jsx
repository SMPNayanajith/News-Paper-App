import { BrowserRouter, Route, Routes,  } from "react-router-dom";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import NewsLog from "./Component/Reporter/NewsLog";
import Registration from "./Component/Registration/Registration";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "./recoil/userState";
import { useEffect } from "react";
import ReporterRegistration from "./Component/Registration/ReporterRegistration";
import CreateArticle from "./Component/Reporter/CreateArticle";
import MyDetails from "./Component/MyDetails/MyDetails";
import MyDetailsReader from "./Component/MyDetails/MyDetailsReader";


function App() {

  const setUser = useSetRecoilState(userState)

  const fetchUserDetails = async () => {

    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        //decode the token to get user details
        const decordedToken = jwtDecode(token);
        const { userId, roleType } = decordedToken;
        //then fetch user details

        const response = await axios.get("http://localhost:3001/auth/user-details", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("response.data", response.data);
        const userDetails = response.data;

        setUser({
          isLoggedIn: true,
          userName: userDetails.firstName,
          roleType: roleType,
        })



      } catch (error) {
        console.error("Error fetching user data", error);
      }
    }



  }

    useEffect(() => {
      fetchUserDetails();

    }, [setUser])


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/user-login" element={<Login />} ></Route>
          <Route path="/reporter" element={<NewsLog />} ></Route>
          <Route path="/registration" element={<Registration />} ></Route>
          <Route path="/ReporterRegistration" element={<ReporterRegistration />} ></Route>
          <Route path="/create-article" element={<CreateArticle />} ></Route>
          <Route path="/mydeatails" element={<MyDetails />} ></Route>
          <Route path="/readerDetails" element={<MyDetailsReader />} ></Route>
          
        </Routes>
      </BrowserRouter>
      {/* <RecoilTest/>
      <ChildComp/> */}

    </div>
  );
}

export default App;
