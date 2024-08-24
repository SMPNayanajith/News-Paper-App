import Home from "../Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function ReaderRoutes() {

    return ( 
        <Routes >
            <Route path="/" element={<Home/> } />
        
        </Routes>
    )

}
export default ReaderRoutes;