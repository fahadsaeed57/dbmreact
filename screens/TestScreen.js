import React from 'react';
import {KeyboardAvoidingView , ImageBackground,StyleSheet,TouchableOpacity,Text} from 'react-native';
import {LinearGradient} from 'expo';


export default class LoginScreen extends React.Component {
    render(){
        return(
           <LinearGradient style={styles.container} colors={['#87CEEB', 'white']}> 
             

           </LinearGradient>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#f23657',
        alignSelf: 'stretch',
        width : null,
        justifyContent: 'center',
        alignItems: 'center'
        }
})