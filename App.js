import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Root} from 'native-base';
import {Provider} from 'react-redux';

import rootStore from './src/utils/rootStore';
import NavigationService from './src/utils/navigationService';

import Login from './src/screens/Login';
import Dashboard from './src/screens/Dashboard';
import Garden from './src/screens/Garden';
import Plants from './src/screens/Plants';
import Plant from './src/screens/Plant';
import Recipes from './src/screens/Recipes';
import Recipe from './src/screens/Recipe';
import Settings from './src/screens/Settings';
import Tips from './src/screens/Tips';

let disableGestures = {
  gesturesEnabled: false,
};

const StackNavigation = createStackNavigator(
  {
    Login: {screen: Login, navigationOptions: disableGestures},
    Dashboard: {screen: Dashboard, navigationOptions: disableGestures},
    Garden: {screen: Garden},
    Plants: {screen: Plants},
    Plant: {screen: Plant},
    Recipes: {screen: Recipes},
    Recipe: {screen: Recipe},
    Settings: {screen: Settings},
    Tips: {screen: Tips},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login',
    // initialRouteName: 'Dashboard',
    navigationOptions: {
      header: {visible: false},
    },
    // defaultNavigationOptions: {
    //   gestureEnabled: false,
    // },
  },
);

const AppContainer = createAppContainer(StackNavigation);

class App extends Component {
  state = {};

  render() {
    console.disableYellowBox = true;
    return (
      <Root>
        <Provider store={rootStore}>
          <StatusBar
            ref={statusbar => (this._statusBar = statusbar)}
            backgroundColor="white"
            barStyle="dark-content"
            animated={true}
          />
          <AppContainer
            ref={nav => {
              NavigationService.setTopLevelNavigator(nav);
            }}
          />
        </Provider>
      </Root>
    );
  }
}

export default App;
