import moment from "moment";

class DateFormatter {
  static format(date: Date | string, format: string) {
    return moment(date).format(format);
  }

  static getTimeAgo(time: string) {
    return moment(time).fromNow();
  }
}

export default DateFormatter;
