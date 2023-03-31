import "./App.css"
import {  Route, Routes } from "react-router-dom";
import Chats from "./component/chats/Chats";
import Home from "./component/home/Home";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/chats" element={<Chats />} />
      </Routes>
    </div>
  );
}

export default App;
