import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Wrong from "./components/Wrong";
import Register from "./components/Register";
import Admin from "./components/Admin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="*" element={<Wrong/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
