import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import NewsLog from "./Component/Reporter/NewsLog";
import NewsFeed from "./Component/Reader/NewsFeed";



function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} ></Route>
        <Route path="/login" element={<Login/>} ></Route>
        <Route path="/reader" element={<NewsFeed/>} ></Route>
        <Route path="/reporter" element={<NewsLog/>} ></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
