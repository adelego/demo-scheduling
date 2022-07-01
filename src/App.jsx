import React, { useState } from "react";

import logo from "./logo.png";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState();

  return (
    <div className="App">
      <img src={logo} alt="CDK-Scheduler - Programme ton message!" />
      <p className="tagline">Choisis l'heure et le message, on s'occupe du reste</p>

      <p>{error}</p>
      <form>
        <div class="label-and-input">
          <label for="message" class="input-label">
            Ecris nous un petit mot doux
          </label>
          <input
            id="message"
            type="text"
            placeholder="Le message à envoyer"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              setError(null);
            }}
          />
        </div>
        <div class="label-and-input">
          <label for="firstName" class="input-label">
            Signe-le
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="Ton prénom"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
              setError(null);
            }}
          />
        </div>
        <div class="label-and-input">
          <label for="time" class="input-label">
            Remplis une heure entre 14h et 14h30
          </label>
          <input
            id="time"
            type="text"
            placeholder="hh:mm:ss"
            value={time}
            onChange={(event) => {
              setTime(event.target.value);
              setError(null);
            }}
          />
        </div>
        <button type="submit">Programmer le message</button>
      </form>
    </div>
  );
}

export default App;
