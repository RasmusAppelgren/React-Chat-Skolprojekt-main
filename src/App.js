import { Route, Routes } from "react-router-dom";
import Start from "./components/Start";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Chat from "./components/Chat"
import { useContext } from "react";
import { AuthContext } from "./context/Auth-context"


function App() {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className="App">
      <Routes>
        <Route index element={currentUser ? <Dashboard /> : <SignIn />} />
        <Route path="/" element={<Start />} />
        <Route path="/Signin" element={<SignIn />} />
        <Route path="/Dashboard" element={currentUser ? <Dashboard /> : <SignIn />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Chat" element={currentUser ? <Chat /> : <SignIn />} />
      </Routes>

    </div>
  );

}
export default App;