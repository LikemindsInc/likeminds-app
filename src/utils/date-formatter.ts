import moment from "moment";

class DateFormatter {
  static format(date: Date | string, format: string) {
    return moment(date).format(format);
  }
}

export default DateFormatter;
