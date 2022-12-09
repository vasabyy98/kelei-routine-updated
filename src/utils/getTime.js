export const getGreeting = () => {
  let currentTime = new Date();
  let morningStart = new Date();
  let morningEnd = new Date();
  let afternoonStart = new Date();
  let afternoonEnd = new Date();
  let eveningStart = new Date();
  let eveningEnd = new Date();
  let nightStart = new Date();
  let nightEnd = new Date();

  morningStart.setHours(4, 0, 0);
  morningEnd.setHours(12, 0, 0);
  afternoonStart.setHours(12, 0, 0);
  afternoonEnd.setHours(17, 0, 0);
  eveningStart.setHours(17, 0, 0);
  eveningEnd.setHours(21, 0, 0);
  nightStart.setHours(21, 0, 0);
  nightEnd.setHours(4, 0, 0);

  if (currentTime >= morningStart && currentTime <= morningEnd) {
    return "Good morning,";
  } else if (currentTime >= afternoonStart && currentTime <= afternoonEnd) {
    return "Good afternoon,";
  } else if (currentTime >= eveningStart && currentTime <= eveningEnd) {
    return "Good evening,";
  } else {
    return "Welcome,";
  }
};
