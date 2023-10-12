import {
  NavigationContainerRef,
  CommonActions,
  StackActions,
} from '@react-navigation/native';

let navigatorRef: NavigationContainerRef | null = null;

export function setTopLevelNavigator(ref: NavigationContainerRef | null) {
  navigatorRef = ref;
}

export function navigate(name: string, params?: object) {
  if (navigatorRef) {
    navigatorRef.dispatch(
      CommonActions.navigate({
        name,
        params,
      }),
    );
  }
}

export function goBack() {
  if (navigatorRef) {
    navigatorRef.dispatch(CommonActions.goBack());
  }
}

export function replace(name: string, params?: object) {
  if (navigatorRef) {
    navigatorRef.dispatch(StackActions.replace(name, params));
  }
}
