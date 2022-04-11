import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";

export const date = (resTime) => new Date(resTime).toLocaleDateString("en-US");
export const time = (resTime) =>
  new Date(resTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

export const startDateValue = () => {
  let today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  let dateNextHr = setMinutes(setSeconds(today.addHours(1), 0), 0);
  let dateNextDay = setHours(setMinutes(setSeconds(tomorrow, 0), 0), 9);
  let dateThisDay = setHours(setMinutes(setSeconds(today, 0), 0), 9);

  let startVal =
    today.getHours() < 9
      ? dateThisDay
      : today.getHours() > 19
      ? dateNextDay
      : dateNextHr;
  return startVal;
};
