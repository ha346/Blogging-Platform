import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
function App() {

  const [alert,setAlert]=useState(null)

  const showAlert = (message,type) => {
    setAlert({
      msg: message,
      type:type
    })

    setTimeout(() => {
      setAlert(null)
    },1500)
  }

  return (
    <>
      <NoteState>
      <Router>
          <Navbar /> 
          <Alert alert={alert} />
        <div className="container">
        <Routes>
          <Route exact element={<Home showAlert={showAlert} />} path="/" />
          <Route exact element={<About />} path="/about" />
          <Route exact element={<Login showAlert={showAlert} />} path="/login" />
          <Route exact element={<Signup showAlert={showAlert} />} path="/signup" />
        </Routes>
      </div>
      </Router>
      </NoteState>
     </>
  );
}

export default App;
