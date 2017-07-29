const defaultState = [
  {
    "start": 30,
    "end": 150
  },
  {
    "start": 540,
    "end": 600
  },
  {
    "start": 560,
    "end": 620
  },
  {
    "start": 610,
    "end": 670
  }
];

export default (state = defaultState, action) => {
  const newState = [...state];
  switch (action.type) {
    case "CLEAR_ALL_EVENTS": {
      return [];
    }
    case "ADD_EVENT": {
      return [...newState, action.payload];
    }
    default: {
      return newState;
    }
  }
};
