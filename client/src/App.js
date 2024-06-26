import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { Login, Signup, Download } from "./pages";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/download/:userId/:fileName" element={<Download />} />

      </Routes>
    </div>
  );
}

export default App;