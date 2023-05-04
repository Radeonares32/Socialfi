import { Home } from "./components/home/Home";
import { Register } from "./components/register/register";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default App;
