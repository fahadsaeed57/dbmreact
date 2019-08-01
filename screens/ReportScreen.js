import React from 'react';
import {KeyboardAvoidingView , Image, StyleSheet, Dimensions, View} from 'react-native';
import {LinearGradient} from 'expo';
import AnswersInput from '../components/AnswersInput'
import { Text } from '../components';
import { theme, mocks } from '../constants';
const { width } = Dimensions.get('window');

import {Rating} from 'react-native-ratings';
export default class ReportScreen extends React.Component {
    render(){
        return(
           <View style={styles.container}>
            <Text h1 bold primary>  {"\n"}Warden</Text>
            <Text h2 secondary> Your Pal</Text>
           </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white',
        alignSelf: 'stretch',
        width : null,
        justifyContent: 'center',
        alignItems: 'center'
        }
})