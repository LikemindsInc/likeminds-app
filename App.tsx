import 'react-native-gesture-handler';

import { LogBox, SafeAreaView, StyleSheet } from 'react-native';
import Provider from './src/store/StoreProvider';
import { NavigationContainer } from '@react-navigation/native';
import { ToastProvider } from 'react-native-toast-notifications';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useCallback, useRef } from 'react';
import { GlobalStyles } from './src/theme/GlobalStyles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppRoutes from './src/navigation/routes';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import KeyboardDismisser from './src/components/KeyboardDismisser/KeyboardDismisser';
import { setTopLevelNavigator } from './src/utils/NavigateUtil';
// import * as Sentry from "sentry-expo";
// import { SENTRY_DNS } from "./src/constants";

// const routingInstrumentation =
//   new Sentry.Native.ReactNavigationInstrumentation();

// Sentry.init({
//   dsn: SENTRY_DNS,
//   enableInExpoDevelopment: false,
//   tracesSampleRate: 1.0,
//   integrations: [],
//   debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
// });

SplashScreen.preventAutoHideAsync();
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
  'Require cycle: src/store/store.ts',
  'No native splash screen registered for given view controller',
  `Key "cancelled" in the image picker result is deprecated`,
  'Constants.platform.ios.model',
  'Each child in a list',
  'Require cycle',
  'ImmutableStateInvariantMiddleware took',
]);

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function App() {
  const navigation = useRef() as any;
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
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
        width: '100%',
        baseStyle: {
          width: '100%',
        },
      },
      Button: {
        // Can simply pass default props to change default behaviour of components.
        baseStyle: {
          rounded: 'md',
        },
        defaultProps: {
          colorScheme: 'red',
        },
      },
      Heading: {
        // Can pass also function, giving you access theming tools
        baseStyle: ({ colorMode }: any) => {
          return {
            color: colorMode === 'dark' ? 'red.300' : 'blue.300',
            fontWeight: 'normal',
          };
        },
      },
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={GlobalStyles.container} onLayout={onLayoutRootView}>
        <NativeBaseProvider theme={theme}>
          <Provider>
            <ToastProvider
              placement="top"
              animationType="slide-in"
              offsetBottom={100}
              swipeEnabled={true}
              duration={5000}
              animationDuration={250}
              // renderType={{
              //   custom_type: (toast) => {
              //     if(toast.type === "")
              //   }
              // }}
            >
              <NavigationContainer
                // ref={navigation}
                ref={(navigatorRef) => {
                  setTopLevelNavigator(navigatorRef);
                }}

                // onReady={() => {
                //   // Register the navigation container with the instrumentation
                //   routingInstrumentation.registerNavigationContainer(
                //     navigation
                //   );
                // }}
              >
                <AppRoutes />
              </NavigationContainer>
            </ToastProvider>
          </Provider>
        </NativeBaseProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
