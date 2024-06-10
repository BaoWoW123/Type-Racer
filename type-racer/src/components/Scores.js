import NavBar from "./NavBar";
import "../styles/scores.css";

const Scores = ({ scores }) => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="Scores">
        <h1>Scoreboard</h1>
        <ul>
          <li>
            <h2>Username</h2>
            <h2>Words per minute (wpm)</h2>
            <h2>Characters per minute (cpm)</h2>
            <h2>Accuracy (%)</h2>
          </li>
          {scores.map((object, index) => {
            return (
              <li key={index}>
                <div>{object.username}</div>
                <div>{object.wpm}</div>
                <div>{object.cpm}</div>
                <div>{Math.ceil(object.accuracy * 100)}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Scores;
