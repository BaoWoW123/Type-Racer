import "./styles/App.css";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import { useEffect, useState } from "react";
import axios from 'axios' ;
import Scores from "./components/Scores";

function App() {
    const [scores, setScores] = useState([]);

    useEffect(() => {
      const fetchscores = async () => {
        try {
          const res = await axios.get('http://localhost:8080/scores');
          setScores(res.data);
        } catch(error) {
          console.error('Error fetching scores:', error)
        }
      }
      fetchscores()
    }, []);

  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Home />}></Route>
        <Route index path="/profile" element={<Profile />}></Route>
        <Route index path="/settings" element={<Settings />}></Route>
        <Route index path="/scores" element={<Scores scores = {scores} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
