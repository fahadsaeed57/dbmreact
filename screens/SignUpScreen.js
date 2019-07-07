import React from 'react';
import {KeyboardAvoidingView , StyleSheet,TouchableOpacity,Text} from 'react-native';
import {LinearGradient} from 'expo';
import SignUpForm from '../components/SignUpForm';



export default class SignUpScreen extends React.Component {
  
    render() {
      return (
        <KeyboardAvoidingView behavior= "padding" style={styles.wrapper}>
          <LinearGradient style={styles.container}  colors={['#2BC0E4', '#EAECC6']}>
              <SignUpForm  navigation={this.props.navigation}/>
              <TouchableOpacity 
                onPress = {() => {this.props.navigation.navigate('Login')}}
              >
              <Text style={styles.signupText}> Already have an account ? Login!</Text>
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
    container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center',
    //justifyContent: 'center'
  },
    // container: {
    //   flex: 1, 
    //   alignSelf: 'stretch',
    //   width : null,
    //   justifyContent: 'center',
    //   alignItems: 'center'
    //   },
      signupText:{
        paddingTop :15,
        marginBottom : 15,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16
      },
  });