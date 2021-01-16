import {StackActions, NavigationActions} from 'react-navigation';
import analytics from '@react-native-firebase/analytics';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params = {}) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function resetAndNavigate(
  routeName,
  params = {},
  pastRoutes = [{routeName: 'Dashboard'}],
) {
  if (routeName === 'Dashboard' || routeName === 'Login') {
    pastRoutes = [];
  }
  let actions = pastRoutes.map(route =>
    NavigationActions.navigate({
      routeName: route.routeName,
      params: route.params,
    }),
  );
  actions.push(NavigationActions.navigate({routeName, params}));
  const resetAction = StackActions.reset({
    index: actions.length - 1,
    actions,
  });
  _navigator.dispatch(resetAction);
}

export default {
  navigate,
  setTopLevelNavigator,
  resetAndNavigate,
};
