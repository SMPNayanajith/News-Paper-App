import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import NewsLog from "./Component/Reporter/NewsLog";
import NewsFeed from "./Component/Reader/NewsFeed";
import Registration from "./Component/Registration/Registration";



function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Home/>} ></Route>
        <Route path="/user-login" element={<Login/>} ></Route>
        <Route path="/reader" element={<NewsFeed/>} ></Route>
        <Route path="/reporter" element={<NewsLog/>} ></Route>
        <Route path="/registration" element={<Registration/>} ></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
