import { createStore } from 'redux';
import { loadedState } from '../components/localStorage';
// import { initialState } from './initialState';

const ACTION_TYPES = {
  ADD_TIMER: 'App::setTimersList',
  HANDLE_NAME: 'App::setTimerName',
};

// action creator
export const addTimer = timerData => ({
  type: ACTION_TYPES.ADD_TIMER,
  payload: timerData,
});

export const addName = value => ({
  type: ACTION_TYPES.HANDLE_NAME,
  payload: value,
});

// selector
export const selectTimers = state => state.timersList;
export const selectName = state => state.inputTimerName;

const rootReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TIMER: {
      localStorage.setItem('timersList', JSON.stringify(action.payload));

      return {
        ...state,
        timersList: action.payload,
      };
    }

    case ACTION_TYPES.HANDLE_NAME: {
      return {
        ...state,
        inputTimerName: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export const store = createStore(rootReducer, loadedState);
