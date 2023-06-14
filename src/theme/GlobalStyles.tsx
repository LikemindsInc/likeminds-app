import { StyleSheet } from "react-native";
import colors from "./colors";
import font from "./font";

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: colors.white,
  },
  textCenter: {
    textAlign: "center",
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
  subHeading: {
    fontSize: font.size.font20,
  },
  articleFont: {
    fontSize: font.size.font14,
  },
  fontInterBlack: {
    fontFamily: "Inter-Black",
  },
  fontInterRegular: {
    fontFamily: "Inter-Regular",
  },
  fontInterMedium: {
    fontFamily: "Inter-Medium",
  },
  fontWeight400: {
    fontWeight: "400",
  },
  fontWeight700: {
    fontWeight: "700",
  },
  alignHorizontalCenter: {
    flexDirection: "row",
    justifyContent: "center",
  },
  alignVerticalCenter: {
    flexDirection: "column",
    justifyContent: "center",
  },
  mb10: {
    marginBottom: 10,
  },
  mt10: {
    marginTop: 10,
  },
  mb20: {
    marginBottom: 20,
  },
  mt5: {
    marginTop: 5,
  },
  mb5: {
    marginBottom: 5,
  },
  mt20: {
    marginTop: 20,
  },

  mb30: {
    marginBottom: 30,
  },
  mt30: {
    marginTop: 30,
  },

  mb40: {
    marginBottom: 40,
  },
  mt40: {
    marginTop: 40,
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
    paddingHorizontal: 22,
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
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
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },

  flexOne: {
    flex: 1,
  },

  displayRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  displayRowCenter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  header: {
    paddingHorizontal: 25,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: colors.white,
    flexDirection: "row",
    width: "100%",
    height: 60,
    alignItems: "center",
  },

  inputStyle: {
    backgroundColor: "#F3F5F7",
    height: 60,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 10,
    fontFamily: "Inter-Regular",
    fontSize: font.size.font13,
    marginBottom: 20,
  },
  primaryButtonOnline: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
  menuContainer: {},
  menuItemsCard: {},
  circleContainer: {},
  drawerContainer: {
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 25,
  },
});
