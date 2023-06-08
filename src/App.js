import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import ListEmployeeComponent from "./components/emplistComponent";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import CreateEmployeeComponent from "./components/CreateEmployeeComponent";
import UpdateEmployeeComponent from "./components/UpdateEmployeeComponent";
import ViewEmployeeComponent from "./components/ViewEmployeeComponent";
import Home from "./components/loginpage";
import Register from "./components/Registerpage";
import { Routes } from "react-router-dom";
function App() {
  return ( 
    <div>
      <Router>
        <HeaderComponent />
        <div className="contain">
          <Routes>
            <Route path="/" element={< Home/>} />
            <Route path="/register" element={< Register/>} />
            <Route path="/employees" element={<ListEmployeeComponent />}></Route>
            <Route path="/add-employee" element={<CreateEmployeeComponent />} />
            <Route path ="/update-employee/:id" element={<UpdateEmployeeComponent/>}></Route>
            <Route path ="/view-employee/:id"  element= {<ViewEmployeeComponent/>}></Route>
            
          </Routes>
        </div>
        
      </Router>
    </div>
  );
}

export default App;
