import React from 'react';
import {connect} from 'react-redux';

import styles from './style.css';
import {addEvent, clearAllEvents} from '../../dispatchers';

class EventButtons extends React.Component {

  addEvent = () => {
    const startTimeString = prompt("Start time? (e.g. 10:10 am)");
    if (!startTimeString) {
      return
    }
    const endTimeString = prompt("End time? (e.g. 10:40 am)");
    if (!endTimeString) {
      return
    }
    this.props.addEvent({startTimeString, endTimeString})
  }

  render() {
    return (
      <div className={styles.eventButtons}>
        <button className={styles.eventButton} onClick={this.props.clearAllEvents}>
          Clear all events
        </button>
        <button className={styles.eventButton} onClick={this.addEvent}>
          Add new event
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEvent,
  clearAllEvents,
})

export default connect(
  () => {},
  mapDispatchToProps
)(EventButtons);
