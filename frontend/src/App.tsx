import { Home } from "./components/home/Home";
import { Register } from "./components/register/register";
import { Information } from "./components/account/information/information";

import { Routes, Route } from "react-router-dom";
import {} from "react-auth-kit";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, RequireAuth } from "react-auth-kit";

function App() {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route
            path="information"
            element={
              <RequireAuth loginPath={"/"}>
                <Information />
              </RequireAuth>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
