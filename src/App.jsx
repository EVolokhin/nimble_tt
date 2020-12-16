/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useRef, useState } from 'react';
import moment from 'moment';

import './App.scss';

export const App = () => {
  const [timer, setTimer] = useState({
    time: 0,
    active: false,
    start: 0,
  });

  console.log(timer);

  const intervalRef = useRef();

  const startTimer = () => {
    console.log('start button');
    setTimer(prev => ({
      ...prev,
      start: moment() - prev.time,
    }));

    const timeCounter = setInterval(() => {
      setTimer(prev => ({
        ...prev,
        time: moment() - prev.start,
        active: true,
      }));
    }, 1000);

    intervalRef.current = timeCounter;
  };

  const stopTimer = () => {
    console.log('stop button');
    clearInterval(intervalRef.current);
    setTimer(prev => ({
      ...prev,
      active: false,
    }));
  };

  const deleteTimer = () => {
    console.log('delete button');
    setTimer(prev => ({
      ...prev,
      time: 0,
      active: false,
    }));
  };

  const convertTime = () => {
    const seconds = moment.duration(timer.time, 'milliseconds');
    const hours = (Math.floor(seconds.asHours()) < 10)
      ? `0${Math.floor(seconds.asHours())}`
      : Math.floor(seconds.asHours());

    return `${hours}:${moment.utc(timer.time).format('mm:ss')}`;
  };

  return (
    <div className="timer">
      <h3>
        {`TIMER: ${convertTime()}`}
      </h3>

      {!timer.active
      && (
        <button
          type="button"
          onClick={startTimer}
        >
          start
        </button>
      )}

      {timer.active
      && (
        <button
          type="button"
          onClick={stopTimer}
        >
          pause
        </button>
      )}

      <button
        type="button"
        onClick={deleteTimer}
      >
        delete
      </button>
    </div>
  );
};
