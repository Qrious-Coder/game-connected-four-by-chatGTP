import React, { useState, useEffect } from 'react';

const Countdown = ({ eventDate }) => {
  const [timeRemaining, setTimeRemaining] = useState({});

  useEffect(() => {
    const countdownDate = new Date(eventDate).getTime() - 24 * 60 * 60 * 1000;
    console.log(countdownDate)

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [eventDate]);

  console.log(timeRemaining)
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const formattedEventDate = new Date(eventDate).toLocaleString('en-US',
    { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div>
      {/* Check if all properties of timeRemaining are zero */}
      {timeRemaining.days === 0 && timeRemaining.hours === 0 && timeRemaining.minutes === 0 && timeRemaining.seconds === 0 ? (
        <span>{formattedEventDate}</span>
      ) : (
        <span>
          {formatTime(timeRemaining.days)}:
          {formatTime(timeRemaining.hours)}:
          {formatTime(timeRemaining.minutes)}:
          {formatTime(timeRemaining.seconds)}
        </span>
      )}
    </div>
  );
};

export default Countdown;
