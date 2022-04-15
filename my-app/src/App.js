import React from 'react';
import Sidebar from './components/Sidebar';
import './App.css';
import NavbarHome from './components/navbar/navbarHome';
import Admin from "./components/pages/admin";
import Home from "./components/pages/home";
import Upload from './components/pages/upload';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
  return (
    <div className="A-Drive">
      <div className='="Sidebar'>
      </div>
         <Router>
         <Sidebar/>
      <NavbarHome />
      <Routes>
        <Route path='/' exact component={Home} />
        <Route path='/upload' component={Upload} />
        <Route path='/admin' component={Admin} />
        <Route path='/logout' component={Home} />
      </Routes>
    </Router>
    </div>


    
  );
}

export default App;

