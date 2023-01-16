import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Wrong from "./components/Wrong";
import Register from "./components/Register";
import Admin from "./components/Admin";
import AddProjects from "./components/AddProjects";
import MyProjects from "./components/MyProjects";
import { UserProvider } from "./contexts/UserContext";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/myprojects" element={<MyProjects/>} />
          <Route path="/add" element={<AddProjects/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="*" element={<Wrong/>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
