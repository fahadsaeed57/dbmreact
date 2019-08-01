import React from 'react';
import { StyleSheet, Text, View,  KeyboardAvoidingView, ImageBackground} from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import { createStackNavigator,createSwitchNavigator } from 'react-navigation';
import ChatScreen from './screens/ChatScreen';
import Loading from './screens/Loading';
import Main from './screens/Main';
import Todoscreen from './screens/Todoscreen';
import WelcomeSCreen from './screens/WelcomeScreen';
import TestScreen from './screens/TestScreen';
import ReportScreen from './screens/ReportScreen';
import WalkthroughTravel from './screens/WalkthroughTravel/index';

 

const LoginSignUp = createStackNavigator({
  Welcome: {
    screen: WelcomeSCreen,
    navigationOptions: () => ({
      headerBackTitle: null,
      header:null,
    }),
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      headerBackTitle: null,
      header:null,
    }),
  },

  Signup: {
    screen: SignUpScreen,
    navigationOptions: () => ({
      header : null,
    }),
  },
  Chat:{
    screen:ChatScreen
  }
});
const App = createStackNavigator({
  Main : {
    screen : Main
  },
  Chat : {
    screen  : ChatScreen
  },
  Todo : {
    screen : Todoscreen
  },
  Test : {
      screen : WalkthroughTravel
  },
  Report : {
    screen : TestScreen
  }
  

})
const Navigation = createSwitchNavigator({
  Loading : {
    screen : Loading,
  },
  Auth : {
    screen : LoginSignUp
  },
  App : {
    screen  : App
  }
})
export default Navigation;



const styles = StyleSheet.create({
});