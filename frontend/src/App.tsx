import { Home } from "./components/home/Home";
import { Register } from "./components/register/register";
import { Information } from "./components/account/information/information";

import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route
        path="information"
        element={
          <RequireAuth loginPath="/">
            <Information />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
