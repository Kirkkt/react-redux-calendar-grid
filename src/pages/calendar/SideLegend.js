import React from 'react';
import styles from './style.css';
import Controller from './SideLegendController';

class HalfOClockHourStamp extends React.Component {
  render() {
    return (
      <div className={styles.halfOClockHourStamp}>
        {this.props.hourStampText}
      </div>
    );
  }
}

class OClockHourStamp extends React.Component {
  render() {
    return (
      <div className={styles.oClockHourStamp}>
        <span className={styles.hourStampText}>{this.props.hourStampText}</span>
        <span className={styles.amOrPm}>{this.props.amOrPm}</span>
      </div>
    );
  }
}

export default class SideLegend extends React.Component {
  getHourStamps() {
    return Controller.getHourStamps().map(({hourStampText, amOrPm}, index) => {
      if (amOrPm === Controller.AM_OR_PM.NA) {
        return (
          <HalfOClockHourStamp
            key={index}
            hourStampText={hourStampText}
          />
        );
      } else {
        return (
          <OClockHourStamp
            key={index}
            hourStampText={hourStampText}
            amOrPm={amOrPm}
          />
        );
      }
    });
  }
  render() {
    return (
      <div className={styles.sideLegend}>
        {this.getHourStamps()}
      </div>
    );
  }
}
