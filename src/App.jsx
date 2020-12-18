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
  const [inputTimerName, setInputTimerName] = useState('');

  const handleName = (event) => {
    setInputTimerName(event.target.value);
  };

  const addTimer = () => {
    const newTimer = {
      name: inputTimerName || String(+moment()),
      id: +moment(),
    };

    setTimersList([newTimer, ...timersList]);
    setInputTimerName('');
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
    <div className="wrapper">
      <div className="timer">
        <div className="timer__set">
          <input
            className="timer__name"
            type="text"
            placeholder="Enter tracker name"
            value={inputTimerName}
            onChange={handleName}
            onKeyPress={onEnter}
          />
          <button
            className="timer__add"
            type="button"
            onClick={addTimer}
          >
            <img src={addPic} alt="add timer" />
          </button>
        </div>

        {timersList.map((timerObj) => {
          const {
            name,
            id,
          } = timerObj;

          return (
            <Timer
              name={name}
              id={id}
              deleteTimer={deleteTimer}
              key={id}
            />
          );
        })}
      </div>
    </div>
  );
};
