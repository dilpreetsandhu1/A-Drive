import React from 'react';
import Sidebar from '../Sidebar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./admin";

const Home = () =>{
    return (
        <div>
<Sidebar/>
            {/*
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' exact component={Home} />
                    <Route path='/admin' exact component={Admin}/>
                </Routes>
            </Router>
            <Sidebar/> 
            */}
<div className = "sidebar.header">
  </div>
  </div>
    );
}

export default Home; 