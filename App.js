import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import drawerNavigator from './components/drawerNavigator';
const navigationOptions = { headerShown: false }


const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: navigationOptions
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: navigationOptions
  },
});

const AppStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: navigationOptions
  }
});

const MainNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Auth: AuthStack,
    App: drawerNavigator,
  },
  {
    initialRouteName: "Loading"
  }
);

const App = createAppContainer(MainNavigator);

export default App;
