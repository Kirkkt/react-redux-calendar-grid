import React from 'react';
import styles from './style.css';
import CalendarEvents from './CalendarEvents';

class GridBackground extends React.Component {
  render() {
    return (
      <div className={styles.gridBackground}>
        <div key="0" className={styles.gridBackgroundBlock}/>
        <div key="1" className={styles.gridBackgroundBlock}/>
        <div key="2" className={styles.gridBackgroundBlock}/>
        <div key="3" className={styles.gridBackgroundBlock}/>
        <div key="4" className={styles.gridBackgroundBlock}/>
        <div key="5" className={styles.gridBackgroundBlock}/>
        <div key="6" className={styles.gridBackgroundBlock}/>
        <div key="7" className={styles.gridBackgroundBlock}/>
        <div key="8" className={styles.gridBackgroundBlock}/>
        <div key="9" className={styles.gridBackgroundBlock}/>
        <div key="10" className={styles.gridBackgroundBlock}/>
        <div key="11" className={styles.gridBackgroundBlock}/>
      </div>
    );
  }
}

export default class Grid extends React.Component {
  render() {
    return (
      <div className={styles.grid}>
        <GridBackground/>
        <CalendarEvents/>
      </div>
    );
  }
}
