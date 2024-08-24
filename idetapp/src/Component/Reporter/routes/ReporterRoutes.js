import Home from "../Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function ReporterRoutes() {

    return ( 
        <Routes >
            <Route path="/" element={<Home/> } />
        
        </Routes>
    )

}
export default ReporterRoutes;