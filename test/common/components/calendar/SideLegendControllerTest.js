import test from 'ava';
import SideLegendController from '../../../../src/pages/calendar/SideLegendController';

test('SideLegendController.getHourStamps', t => {
  const actual = SideLegendController.getHourStamps();
  t.is(actual instanceof Array, true);

  t.deepEqual(actual.map(stamp => stamp.hourStampText), [
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '1:00',
    '1:30',
    '2:00',
    '2:30',
    '3:00',
    '3:30',
    '4:00',
    '4:30',
    '5:00',
    '5:30',
    '6:00',
    '6:30',
    '7:00',
    '7:30',
    '8:00',
    '8:30',
    '9:00',
  ]);

  t.is(
    actual
      .map(stamp => stamp.amOrPm)
      .filter((amOrPm, index) => index & 1)
      .reduce((allNa, amOrPm) => allNa && amOrPm === SideLegendController.AM_OR_PM.NA, true),
    true
  );

  t.deepEqual(
    actual
      .map(stamp => stamp.amOrPm)
      .filter((amOrPm, index) => !(index & 1))
      .slice(0, 3),
    [
      SideLegendController.AM_OR_PM.AM,
      SideLegendController.AM_OR_PM.AM,
      SideLegendController.AM_OR_PM.AM,
    ]
  );
  t.deepEqual(
    actual
      .map(stamp => stamp.amOrPm)
      .filter((amOrPm, index) => !(index & 1))
      .slice(3),
    [
      SideLegendController.AM_OR_PM.PM,
      SideLegendController.AM_OR_PM.PM,
      SideLegendController.AM_OR_PM.PM,
      SideLegendController.AM_OR_PM.PM,
      SideLegendController.AM_OR_PM.PM,
      SideLegendController.AM_OR_PM.PM,
      SideLegendController.AM_OR_PM.PM,
      SideLegendController.AM_OR_PM.PM,
      SideLegendController.AM_OR_PM.PM,
      SideLegendController.AM_OR_PM.PM,
    ]
  );
});
