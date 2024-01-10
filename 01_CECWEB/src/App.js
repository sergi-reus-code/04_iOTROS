import React , {Button}from "react";

import "./App.css";

import Navbar from "./components/Navbar";
import Slidebar from "./components/Slidebar";
import Midlebar from "./components/Midlebar";
import Footbar from "./components/Footbar";

function App() {
  return (
    <div className="App">
      <div className="Navbar">
        <Navbar />
        
      </div>
      <div className="Slidebar">
        <Slidebar />
      </div>
      <div className="Midlebar">
        <Midlebar />
      </div>
      <div className="Footbar">
        <Footbar />
      </div>
    </div>
  );
}

export default App;
