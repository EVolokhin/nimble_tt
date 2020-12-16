/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

import React, { useState } from 'react';
import moment from 'moment';
import { Timer } from './components/timer';
import addPic from './style/icons/play_circle_filled-black-48dp.svg';
import { useLocalStorage } from './components/localStorage';
import './App.scss';

export const App = () => {
  const [timersList, setTimersList] = useLocalStorage('timersList');
  const [timerName, setTimerName] = useState('');

  const handleName = (event) => {
    setTimerName(event.target.value);
  };

  const addTimer = () => {
    const newTimer = {
      name: timerName || String(+moment()),
      time: 0,
      active: true,
      start: +moment(),
      // start: 0,
      id: +moment(),
    };

    setTimersList([newTimer, ...timersList]);
    setTimerName('');
  };

  const deleteTimer = (id) => {
    const deleteIndex = timersList.findIndex(timerObj => timerObj.id === id);
    const newList = [...timersList];

    newList.splice(deleteIndex, 1);

    setTimersList(newList);
  };

  const onEnter = (event) => {
    if (event.key === 'Enter') {
      addTimer();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={timerName}
        onChange={handleName}
        onKeyPress={onEnter}
      />
      <button
        type="button"
        onClick={addTimer}
      >
        <img src={addPic} alt="add timer" />
      </button>

      {timersList.map((timerObj, ind) => {
        const {
          name,
          time,
          active,
          start,
          id,
        } = timerObj;

        return (
          <Timer
            name={name}
            time={time}
            active={active}
            start={start}
            id={id}
            deleteTimer={deleteTimer}
            key={id}
          />
        );
      })}
    </div>
  );
};
