import React, { useState, useEffect } from "react";
import { publishEvent } from "./publishEvent";

import logo from "./logo.png";
import "./App.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState();
  const [feedback, setFeedback] = useState();
  const [startDate, setStartDate] = useState(new Date());

  const onSubmit = async (event) => {
    event.preventDefault();
    setFeedback("");
    await publishEvent(message, firstName, startDate);
    setFeedback("La demande a bien été envoyée");
    setError("");
    setStartDate(new Date());
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
            Choisis une heure
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={5}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
        <button type="submit">Programmer le message</button>
      </form>
      <div class="feedback-message">
        <p class="error">{error}</p>
        <p>{feedback}</p>
      </div>
    </div>
  );
}

export default App;
