import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import pausePic from '../style/icons/pause_circle_outline-black-48dp.svg';
import playPic from '../style/icons/play_circle_outline-black-48dp.svg';
import deletePic from '../style/icons/highlight_off-black-48dp.svg';

export const Timer = ({
  name,
  time,
  active,
  start,
  id,
  deleteTimer,
}) => {
  const [timer, setTimer] = useState({
    name,
    time,
    active,
    start,
    id,
  });

  // for ability to clear Interval
  const intervalRef = useRef();

  const startTimer = () => {
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

  // for launching timer after creation and first render
  useEffect(() => {
    startTimer();

    // for cancel the timer (setTimer) when component unmounted
    return function cleanup() {
      clearInterval(intervalRef.current);
    };
  }, []);

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(prev => ({
      ...prev,
      active: false,
    }));
  };

  // for shoving hours in time more than 24
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
        {`${timer.name}: ${convertTime()}`}
      </h3>

      {!timer.active
      && (
        <button
          type="button"
          onClick={startTimer}
        >
          <img src={playPic} alt="start" />
        </button>
      )}

      {timer.active
      && (
        <button
          type="button"
          onClick={stopTimer}
        >
          <img src={pausePic} alt="pause" />
        </button>
      )}

      <button
        type="button"
        onClick={() => deleteTimer(id)}
      >
        <img src={deletePic} alt="delete" />
      </button>
    </div>
  );
};

Timer.propTypes = {
  name: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  start: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  deleteTimer: PropTypes.func.isRequired,
};
