import React from 'react';
import {connect} from 'react-redux';

import styles from './style.css';
import Graph from '../../common/Graph';
import CalendarEventModel from '../../common/CalendarEventModel';

const HORIZONTAL_GAP = 5;
const FULL_WIDTH = 620 - HORIZONTAL_GAP * 2;

class CalendarEvent extends React.Component {
  render() {
    return (
      <div className={styles.CalendarEvent} style={this.props.style}>
        <div className={styles.CalendarEventContentWrapper}>
          <div className={styles.CalendarEventContent}>
            <div className={styles.CalendarEventItem}>
              Sample item
            </div>
            <div className={styles.CalendarEventLocation}>
              Sample location
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class CalendarEvents extends React.Component {

  getCalendarEventsSortedData() {
    const result = this.props.events.slice();
    result.sort((a, b) => a.start - b.start);
    return result;
  }

  getCalendarEventsModelData() {
    return this.getCalendarEventsSortedData()
      .map(({start, end}) => new CalendarEventModel(start, end));
  }

  getHorizontalPositions() {
    const modelData = this.getCalendarEventsModelData();
    const graph = new Graph(modelData.length);
    for (let from = 0; from < modelData.length; from++) {
      for (let to = from + 1; to < modelData.length; to++) {
        if (modelData[from].intersect(modelData[to])) {
          graph.addEdge(from, to);
        }
      }
    }
    const result = new Array(modelData.length);
    graph.getBuckets().forEach(component => {
      const widthFactor = component.length;
      component.forEach((bucket, bucketIndex) => {
        bucket.forEach(node => {
          const width = (FULL_WIDTH / widthFactor);
          result[node] = {
            width: width + 'px',
            marginLeft: (bucketIndex * width + HORIZONTAL_GAP) + 'px',
          };
        });
      });
    });
    return result;
  }

  getVerticalPositions() {
    const timeToPx = time => 1;
    return this.getCalendarEventsSortedData()
      .map(({start, end}) => {
        return {
          height: (end - start) + 'px',
          marginTop: start + 'px',
        };
      });
  }

  getCalendarEventsViewData() {
    const result = this.getHorizontalPositions();
    this.getVerticalPositions().forEach((position, index) =>
      result[index] = Object.assign(result[index], position));
    result.forEach(style => style.position = 'absolute');
    result.forEach(style => style.paddingLeft = HORIZONTAL_GAP + 'px');
    result.forEach(style => style.paddingRight = HORIZONTAL_GAP + 'px');
    return result;
  }

  getCalendarEvents() {
    return this.getCalendarEventsViewData().map((data, index) => (
      <CalendarEvent
        key={index}
        style={data}
      />
    ));
  }

  render() {
    return (
      <div className={styles.CalendarEvents}>
        {this.getCalendarEvents()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state
  }
}

export default connect(
  mapStateToProps,
  () => {}
)(CalendarEvents);
