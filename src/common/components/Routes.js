import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Calendar from '../../pages/calendar/page';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Calendar} />
  </Route>
);
