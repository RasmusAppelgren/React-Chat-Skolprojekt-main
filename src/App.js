import { Route, Routes } from "react-router-dom";
import Start from "./components/Start";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/Signin" element={<SignIn />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Register" element={<Register />} />
      </Routes>

    </div>
  );
}

export default App;