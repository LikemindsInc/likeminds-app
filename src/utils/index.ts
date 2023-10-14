import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export class Util {
  static debounce = (callback: (...args: any) => void, delay: number) => {
    let timeoutId: any;
    return (...args: any) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  static capitalize(value: string, separator = '-') {
    if (separator === '' || !separator)
      return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;

    return value
      .split(separator)
      .map((item) => `${item.charAt(0).toUpperCase()}${item.slice(1)}`)
      .join(' ');
  }

  static getNumber(value: string) {
    return value.replace(/[^0-9]/g, '');
  }

  static responsiveWidthHeight() {
    return {
      wp,
      hp,
    };
  }

  static convertToLong = (date: Date) => {
    const dateOption = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    } as Intl.DateTimeFormatOptions;
    return date?.toLocaleDateString('en-us', dateOption);
  };
}

export default Util;
