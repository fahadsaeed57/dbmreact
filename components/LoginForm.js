import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, keyboardType, Keyboard } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import firebase from 'firebase';
import '@firebase/firestore';
export default class LoginForm extends React.Component {
constructor(props){
  super(props)
  this.state = {
    email:'',
    password: ''
  }
}

  login = () => {
    const {email,password} = this.state
    if(email=="" && password==""){
      // alert('Enter Your Email & Password')
      this.setState({Error: 'Enter Your Email & Password'})
    }
    else if(email==""){
      // alert('Email not Found !')
      this.setState({Error: 'Email not Found !'})
    }
    else if(password==""){
      // alert('Password not Found !')
      this.setState({Error: 'Password not Found !'})
    }
    else {
      // this.setState({Error: ''})
      // this.props.navigation.navigate('Chat');
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        if(res.user.emailVerified==false){
          alert("email not verified")
        }
        else{
          this.props.navigation.navigate('App');
        }
      })
      .catch(error => this.setState({ Error: error.message }))
    }

   Keyboard.dismiss()
  }
  render() {
    return (
      <View style={styles.formContainer}>
       
        <Text style={styles.header}> Login </Text>
        <View>
        
        <Ionicons name={"ios-person-add"} size={28} color={'#E57373'}
           style={styles.inputIcon}/>
        <TextInput 
          placeholder='Username/Email'
          style={styles.textInput}
          keyboardType="email-address"
          returnKeyType='next'
          autoCorrect={true}
          onSubmitEditing={()=> this.refs.txtPassword.focus()}
          onChangeText ={
            email => this.setState({email})
          }

        />
        </View>
        <View>
        <Ionicons name={"ios-lock"} size={28} color={'#E57373'}
           style={styles.inputIcon}/>
        <TextInput 
          placeholder='Password'
          secureTextEntry={true}
          style={styles.textInput}
          returnKeyType='go'
          autoCorrect={false}
          ref={"txtPassword"}
          onChangeText ={
            password => this.setState({password})
          }

        />
        </View>
           <Text style = {{color: 'red', textAlign: "center"}}>
         {this.state.Error}
    </Text>
        <TouchableOpacity 
        style={styles.button}
        onPress = {this.login}
        >
          <Text style={styles.btntext}> login </Text>
        </TouchableOpacity>
        
         
      
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal:50,
  },
  button: {
    alignSelf: 'flex-end',
    width: '30%',
    marginTop: 20,
    //backgroundColor: '#EF9A9A',
    alignItems: 'center',
    padding: 20,
    borderRadius:70,
    },
    btntext: {
      color: 'white',
      fontSize: 28,
      fontWeight: "normal"
    },
    inputIcon: {
      position: 'absolute',
      top: 10,
      left:20
    },
    signupText:{
      paddingTop: 40,
      color: 'white',
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 16
    },
    header: {
      paddingTop: 40,
      fontSize: 38,
      color: 'white',
      fontWeight: 'bold',
      marginBottom: 80,
      alignSelf: "center"
    }
});
