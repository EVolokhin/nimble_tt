import React, { useCallback, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import pausePic from '../style/icons/pause_circle_outline-black-48dp.svg';
import playPic from '../style/icons/play_circle_outline-black-48dp.svg';
import deletePic from '../style/icons/highlight_off-black-48dp.svg';

import './timer.scss';

export const Timer = ({
  timerName,
  id,
  deleteTimer,
}) => {
  // if timer excist we take the data from local storage
  // if no setting the new object

  const initialValue = localStorage.getItem(`${id}`)
    ? JSON.parse(localStorage.getItem(`${id}`))
    : {
      timerName,
      time: 0,
      active: true,
      start: +moment(),
      id,
    };

  const [timer, setTimer] = useState(initialValue);

  // for ability to clear Interval
  const intervalRef = useRef();

  // updating localStorage when timer buttons play/pause onClick
  const updateStorage = useCallback((key) => {
    const udpadeTimer = { ...timer };

    (key === 'play') ? udpadeTimer.active = true : udpadeTimer.active = false;

    localStorage.setItem(`${id}`, JSON.stringify(udpadeTimer));
  }, [timer]);

  const startTimer = () => {
    setTimer((prev) => {
      if (prev.active) {
        return {
          ...prev,
          time: moment() - prev.start,
        };
      }

      return {
        ...prev,
        start: moment() - prev.time,
        active: true,
      };
    });

    updateStorage('play');

    const timeCounter = setInterval(() => {
      setTimer(prev => ({
        ...prev,
        time: moment() - prev.start,
      }));
    }, 1000);

    intervalRef.current = timeCounter;
  };

  // for launching timer after creation and first render
  useEffect(() => {
    if (timer.active) {
      startTimer();
    }

    // for cancel the timer (setTimer) when component deleted and unmounted
    return function cleanup() {
      clearInterval(intervalRef.current);
      localStorage.removeItem(`${id}`, JSON.stringify(timer));
    };
  }, []);

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(prev => ({
      ...prev,
      active: false,
    }));

    updateStorage('pause');
  };

  // converting time to show more than 24 hours
  const convertTime = () => {
    const seconds = moment.duration(timer.time, 'milliseconds');
    const hours = (Math.floor(seconds.asHours()) < 10)
      ? `0${Math.floor(seconds.asHours())}`
      : Math.floor(seconds.asHours());

    return `${hours}:${moment.utc(timer.time).format('mm:ss')}`;
  };

  // setting active/paused class for timer
  const classContainer = (timer.active)
    ? 'timer__container active'
    : 'timer__container';

  return (
    <div className={classContainer}>
      <h3 className="timer__header">
        <span className="timer__title">{timer.timerName}</span>
        <span>{convertTime()}</span>
      </h3>

      {!timer.active
      && (
        <button
          className="timer__button"
          type="button"
          onClick={startTimer}
        >
          <img
            className="timer__image"
            src={playPic}
            alt="start"
          />
        </button>
      )}

      {timer.active
      && (
        <button
          className="timer__button"
          type="button"
          onClick={stopTimer}
        >
          <img
            className="timer__image"
            src={pausePic}
            alt="pause"
          />
        </button>
      )}

      <button
        className="timer__button"
        type="button"
        onClick={() => deleteTimer(id)}
      >
        <img src={deletePic} alt="delete" />
      </button>
    </div>
  );
};

Timer.propTypes = {
  timerName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  deleteTimer: PropTypes.func.isRequired,
};
