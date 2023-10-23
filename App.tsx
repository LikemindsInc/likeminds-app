import 'react-native-gesture-handler';

import {
  Linking,
  LogBox,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Provider from './src/store/StoreProvider';
import { NavigationContainer } from '@react-navigation/native';
import { ToastProvider } from 'react-native-toast-notifications';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GlobalStyles } from './src/theme/GlobalStyles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppRoutes from './src/navigation/routes';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { setTopLevelNavigator } from './src/utils/NavigateUtil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_SCREEN_LIST, NAVIGATION_PERSISTENCE_KEY } from './src/constants';

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
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
  });

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(
            NAVIGATION_PERSISTENCE_KEY,
          );
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) restoreState();
  }, [isReady]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && isReady) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isReady]);

  if (!fontsLoaded) {
    return null;
  }

  if (!isReady) {
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
            >
              <NavigationContainer
                ref={(navigatorRef) => {
                  setTopLevelNavigator(navigatorRef);
                }}
                initialState={initialState}
                onStateChange={(state) => {
                  AsyncStorage.setItem(
                    NAVIGATION_PERSISTENCE_KEY,
                    JSON.stringify(state),
                  );
                }}
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
