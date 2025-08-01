// components/Countdown.jsx
import React, { useEffect, useState } from 'react';
import './Countdown.css';

const Countdown = ({ targetDate, onComplete, onSkip }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const diff = new Date(targetDate) - new Date();
    console.log(new Date(targetDate).toISOString(), new Date().toISOString(), diff);

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = getTimeLeft();
      setTimeLeft(updated);
      if (
        updated.days === 0 &&
        updated.hours === 0 &&
        updated.minutes === 0 &&
        updated.seconds === 0
      ) {
        clearInterval(interval);
        onComplete();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-container">
      <h1>Loading.. Pizza’s day is almost here</h1>
      <div className="timer">
        {['days', 'hours', 'minutes', 'seconds'].map((key) => (
          <div className="time-box" key={key}>
            <span className="number">{timeLeft[key]}</span>
            <span className="label">{key}</span>
          </div>
        ))}
      </div>
      <p className="subtext"></p>
      
      <button className="skip-button" onClick={onSkip}>
        Skip
        (Don’t)
      </button>

    </div>
  );
};

export default Countdown;
