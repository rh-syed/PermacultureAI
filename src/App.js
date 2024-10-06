import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Target the correct endpoint on the backend
    fetch("/api/hello")
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error("Error fetching message:", error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Permaculture Expert</h1>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
