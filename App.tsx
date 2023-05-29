import "react-native-gesture-handler";

import { LogBox, SafeAreaView, StyleSheet } from "react-native";
import Provider from "./src/store/StoreProvider";
import { NavigationContainer } from "@react-navigation/native";
import { ToastProvider } from "react-native-toast-notifications";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { GlobalStyles } from "./src/theme/GlobalStyles";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppRoutes from "./src/navigation/routes";
import { NativeBaseProvider, extendTheme } from "native-base";
import { createDrawerNavigator } from "@react-navigation/drawer";

SplashScreen.preventAutoHideAsync();
LogBox.ignoreLogs([
  "VirtualizedLists should never be nested",
  "Require cycle: src/store/store.ts",
  "No native splash screen registered for given view controller",
  `Key "cancelled" in the image picker result is deprecated`,
]);

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const theme = extendTheme({
    components: {
      Select: {
        width: "100%",
        baseStyle: {
          width: "100%",
        },
      },
      Button: {
        // Can simply pass default props to change default behaviour of components.
        baseStyle: {
          rounded: "md",
        },
        defaultProps: {
          colorScheme: "red",
        },
      },
      Heading: {
        // Can pass also function, giving you access theming tools
        baseStyle: ({ colorMode }: any) => {
          return {
            color: colorMode === "dark" ? "red.300" : "blue.300",
            fontWeight: "normal",
          };
        },
      },
    },
  });

  return (
    <SafeAreaView style={GlobalStyles.container} onLayout={onLayoutRootView}>
      <NativeBaseProvider theme={theme}>
        <Provider>
          <ToastProvider
            placement="bottom"
            animationType="slide-in"
            offsetBottom={100}
            swipeEnabled={true}
            duration={5000}
            animationDuration={250}
          >
            <NavigationContainer>
              <AppRoutes />
            </NavigationContainer>
          </ToastProvider>
        </Provider>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
