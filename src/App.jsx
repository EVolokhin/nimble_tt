import React, { useCallback } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Timer } from './components/timer';
import { selectTimers, addTimer, selectName, addName } from './store/index';
import addPic from './style/icons/play_circle_filled-black-48dp.svg';
import './App.scss';

export const App = () => {
  const timersList = useSelector(selectTimers);
  const inputTimerName = useSelector(selectName);
  const dispatch = useDispatch();

  const setTimersList = useCallback((timer) => {
    dispatch(addTimer(timer));
  }, [dispatch]);

  const setInputTimerName = useCallback((val) => {
    dispatch(addName(val));
  }, [dispatch]);

  const handleName = useCallback((event) => {
    setInputTimerName(event.target.value);
  }, [setInputTimerName]);

  const addNewTimer = () => {
    const newTimer = {
      timerName: inputTimerName || String(+moment()),
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
      addNewTimer();
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
            onClick={addNewTimer}
          >
            <img src={addPic} alt="add timer" />
          </button>
        </div>

        {timersList.map((timerObj) => {
          const {
            timerName,
            id,
          } = timerObj;

          return (
            <Timer
              timerName={timerName}
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
