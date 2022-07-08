import React, { useState, useEffect } from "react";
import { publishEvent } from "./publishEvent";

import logo from "./logo.png";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState();
  const [feedback, setFeedback] = useState();

  useEffect(() => {
    const splitTime = time.split(":");
    if (splitTime.length !== 3) {
      setError("L'heure doit être au format hh:mm:ss");
      return;
    }
    const [hours, minutes, seconds] = splitTime.map((hour) => parseInt(hour));
    console.log(hours, minutes, seconds);
    if (isNaN(hours)) {
      setError("L'heure doit être un nombre");
      return;
    }
    if (isNaN(minutes)) {
      setError("Les minutes doivent être un nombre");
      return;
    }
    if (isNaN(seconds)) {
      setError("Les secondes doivent être un nombre");
      return;
    }
    if (seconds < 0 || seconds >= 60) {
      setError("Les erreurs doivent être entre 0 et 59");
      return;
    }

    if (hours != 14 || minutes < 0 || minutes >= 30) {
      setError("L'heure doit être entre 14:00 et 14:30");
    }
  }, [time, error]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setFeedback("");
    await publishEvent(message, firstName, time);
    setFeedback("La demande a bien été envoyée");
    setError("");
    setTime("");
    setMessage("");
    setFirstName("");
  };

  return (
    <div className="App">
      <img src={logo} alt="CDK-Scheduler - Programme ton message!" />
      <p className="tagline">Choisis l'heure et le message, on s'occupe du reste</p>

      <form onSubmit={onSubmit}>
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
          <p class="error">{error}</p>
        </div>
        <button type="submit">Programmer le message</button>
      </form>
      <div class="feedback-message">
        <p>{feedback}</p>
      </div>
    </div>
  );
}

export default App;
