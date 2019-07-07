import React from 'react';
import {KeyboardAvoidingView , ImageBackground,StyleSheet,TouchableOpacity,Text} from 'react-native';
import {LinearGradient} from 'expo';
import LoginForm from '../components/LoginForm';



export default class LoginScreen extends React.Component {
  
    render() {
      return (
        <KeyboardAvoidingView behavior= "padding" style={styles.wrapper}>
            <LinearGradient style={styles.container}  colors={['#DA4453', '#89216B']}>
             <LoginForm navigation={this.props.navigation}/>
             <TouchableOpacity 
        
        onPress = {() => {this.props.navigation.navigate('Signup')}}
        >
        <Text style={styles.signupText}> Not A Member? Signup!</Text>
        </TouchableOpacity>
        </LinearGradient>
        </KeyboardAvoidingView>
      );
    }
  }

  
const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    signupText:{
        paddingTop: 40,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16
      },
      // container: {
      //   flex: 1,
      //   backgroundColor: '#f23657',
      //   alignItems: 'center',
      //   //justifyContent: 'center'
      // }
    container: {
      flex: 1, 
      backgroundColor: '#f23657',
      alignSelf: 'stretch',
      width : null,
      justifyContent: 'center',
      alignItems: 'center'
      }
  });