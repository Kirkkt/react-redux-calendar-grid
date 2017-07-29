// no test
const CalendarEventModel = function(startTime, endTime) {
  this.startTime = startTime;
  this.endTime = endTime;
};

CalendarEventModel.prototype.intersect = function(another) {
  return another.endTime > this.startTime && another.startTime < this.endTime;
};

CalendarEventModel.prototype.toString = function() {
  const renderAsTwoDigits = number => {
    if (number < 10) {
      return '0' + number;
    } else {
      return '' + number;
    }
  };
  const numberToTimeString = number =>
    renderAsTwoDigits((Math.floor(number / 60) + 9) % 24) + ":" + renderAsTwoDigits(number % 60);
  return '[' + numberToTimeString(this.startTime) + ' - ' + numberToTimeString(this.endTime) + ']';
};

module.exports = CalendarEventModel;
