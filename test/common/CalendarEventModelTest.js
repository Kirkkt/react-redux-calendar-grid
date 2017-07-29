import test from 'ava';

import CalendarEventModel from '../../src/common/CalendarEventModel';

test('CalendarEventModel.intersect', t => {
  const run = (fromA, toA, fromB, toB, expected) => {
    const eventA = new CalendarEventModel(fromA, toA);
    const eventB = new CalendarEventModel(fromB, toB);
    t.is(eventA.intersect(eventB), expected);
    t.is(eventB.intersect(eventA), expected);
  };
  run(1, 2, 3, 4, false, t);
  run(11, 12, 3, 4, false, t);
  run(1, 2, 2, 3, false, t);
  run(11, 12, 2, 11, false, t);
  run(1, 3, 2, 4, true, t);
  run(1, 4, 2, 3, true, t);
  run(1, 4, 3, 3, true, t);
});

test('CalendarEventModel.toString', t => {
  const run = (startTime, endTime, expected) => {
    const model = new CalendarEventModel(startTime, endTime);
    t.is(model.toString(), expected);
  };
  run(30, 90, '[09:30 - 10:30]');
  run(540, 600, '[18:00 - 19:00]');
  run(570, 620, '[18:30 - 19:20]');
  run(610, 660, '[19:10 - 20:00]');
  run(900, 1000, '[00:00 - 01:40]');
  run(899, 1250, '[23:59 - 05:50]');
});
