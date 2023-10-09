import { StyleSheet } from 'react-native';
import colors from './colors';
import font from './font';
import Util from '../utils';

const { wp } = Util.responsiveWidthHeight();

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(6.75),
    paddingTop: wp(4.32),
    paddingBottom: wp(4.32),
    backgroundColor: colors.white,
  },
  title: {
    fontSize: wp(6.48),
  },
  textCenter: {
    textAlign: 'center',
  },
  textGrey: {
    color: colors.grey,
  },
  textRed: {
    color: colors.red,
  },
  textWhite: {
    color: colors.white,
  },
  textNavyBlue: {
    color: colors.navyBlue,
  },
  textBlack: {
    color: colors.black,
  },
  textPurple: {
    color: colors.purple,
  },
  subHeading: {
    fontSize: font.size.font20,
  },
  articleFont: {
    fontSize: font.size.font14,
  },
  fontInterBlack: {
    fontFamily: 'Inter-Black',
  },
  fontInterRegular: {
    fontFamily: 'Inter-Regular',
  },
  fontInterMedium: {
    fontFamily: 'Inter-Medium',
  },
  fontWeight100: {
    fontWeight: '100',
  },
  fontWeight400: {
    fontWeight: '400',
  },
  fontWeight600: {
    fontWeight: '600',
  },
  fontWeight700: {
    fontWeight: '700',
  },
  alignHorizontalCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  alignVerticalCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  mb10: {
    marginBottom: wp(2.7),
  },
  mt10: {
    marginTop: wp(2.7),
  },
  mb20: {
    marginBottom: wp(5.4),
  },
  mt5: {
    marginTop: wp(1.35),
  },
  mb5: {
    marginBottom: wp(1.35),
  },
  mt20: {
    marginTop: wp(5.4),
  },

  mb30: {
    marginBottom: wp(8.1),
  },
  mt30: {
    marginTop: wp(8.1),
  },

  mb40: {
    marginBottom: wp(10.8),
  },
  mt40: {
    marginTop: wp(10.8),
  },
  fontSize10: {
    fontSize: font.size.font10,
  },
  fontSize13: {
    fontSize: font.size.font13,
  },
  fontSize16: {
    fontSize: font.size.font16,
  },
  fontSize15: {
    fontSize: font.size.font15,
  },
  fontSize20: {
    fontSize: font.size.font20,
  },
  fontSize18: {
    fontSize: font.size.font18,
  },
  fontSize24: {
    fontSize: font.size.font24,
  },
  buttonStyle: {
    // paddingHorizontal: 22,
    paddingVertical: 21,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonOval: {
    borderRadius: 20,
  },
  pl4: {
    paddingLeft: 8,
  },

  textPrimary: {
    color: colors.primary,
  },

  flewRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },

  flexOne: {
    flex: 1,
  },

  displayRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  displayRowCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  header: {
    paddingHorizontal: 25,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: colors.white,
    flexDirection: 'row',
    width: '100%',
    height: 60,
    alignItems: 'center',
  },

  inputStyle: {
    fontFamily: 'Inter-Regular',
    fontSize: font.size.font13,
  },
  primaryButtonOnline: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
  menuContainer: {},
  menuItemsCard: {},
  card: {
    shadowColor: 'gray', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Android elevation (simulates shadow)
    borderRadius: 8,
  },
  circleContainer: {},
  drawerContainer: {
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 25,
  },
  shadowBox: {
    shadowColor: '#88969D30',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 100,
    shadowRadius: 3,
    elevation: 1,
  },
});
