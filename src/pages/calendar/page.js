import React from 'react';
import { browserHistory } from 'react-router';
import styles from './style.css';
import SideLegend from './SideLegend';
import Grid from './Grid';
import EventButtons from './EventButtons';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className={styles.content}>
          <SideLegend/>
          <Grid/>
        </div>
        <div className={styles.footer}>
          <EventButtons/>
        </div>
      </div>
    );
  }
}
