import "./styles/App.css";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Home />}></Route>
        <Route index path="/profile" element={<Profile />}></Route>
        <Route index path="/settings" element={<Settings />}></Route>
      </Routes>
    </div>
  );
}

export default App;
