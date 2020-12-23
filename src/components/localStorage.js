export const loadedState = (() => {
  const initialValue = localStorage.getItem('timersList')
    ? JSON.parse(localStorage.getItem('timersList'))
    : [];

  localStorage.setItem('timersList', JSON.stringify(initialValue));

  return {
    timersList: initialValue,
    inputTimerName: '',
  };
})();
