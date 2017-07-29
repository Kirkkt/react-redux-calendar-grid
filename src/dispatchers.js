import store from './store';

const clearAllEvents = () => {
  store.dispatch({
    type: "CLEAR_ALL_EVENTS"
  });
}

const getHourIn24 = (hour, isAm) => {
  if (isAm && hour === 12) {
    return 0;
  }
  if (isAm) {
    return hour;
  }
  if (hour === 12) {
    return 12;
  }
  return hour + 12;
}

const timeStringToInt = string => {
  const hour = Number.parseInt(string.split(':')[0]);
  const minute = Number.parseInt(string.split(':')[1].slice(0, 2));
  const isAm = string.toLowerCase().indexOf('am') !== -1;
  const hourIn24 = getHourIn24(hour, isAm);
  return hourIn24 * 60 + minute - 540;
}

const addEvent = ({startTimeString, endTimeString}) => {
  store.dispatch({
    type: "ADD_EVENT",
    payload: {
      "start": timeStringToInt(startTimeString),
      "end": timeStringToInt(endTimeString),
    },
  });
}

export {
  clearAllEvents,
  addEvent,
}
