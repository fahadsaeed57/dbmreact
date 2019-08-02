import React, { Component } from 'react';
import { View,StyleSheet,ActivityIndicator,Alert } from 'react-native';
import {LinearGradient} from 'expo';
import Icon from 'react-native-vector-icons/Entypo';
import { Button, Text } from '../components';
import firebase from 'firebase';
import { heightPercentageToDP as hp, widthPercentageToDP as dp } from 'react-native-responsive-screen';
import axios from 'axios';

export default class PerformanceGeneration extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading:true,
        loadingSave:false
    };

  }

  componentWillMount(){

      const {navigation} = this.props;
      const checked=navigation.getParam('checked', 'NO-ID');
      const totalquestions = navigation.getParam('totalquestions','noid')
      let probabilitysum = 0;
      let depressiontotal = 0;
      for(let i =0; i < checked.length;i++){
        probabilitysum +=checked[i]
      }
      depressiontotal = (probabilitysum/totalquestions) * 100;
      this.setState({loading:false,depressiontotal:depressiontotal})
      
  }
  getMonthinString(number){
    months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"]
    return months[number];
  }
  saveToDatabase(){
    this.setState({loadingSave:true})
    var d = new Date();
    var day = d.getDate();
    var month = this.getMonthinString(d.getMonth())
    var year = d.getFullYear()
    var time_stamp = d.getTime()

    const data2post = {
        user_id : firebase.auth().currentUser.uid,
        percentage: this.state.depressiontotal,
        day: day,
        month:month,
        year:year.toString(),
        time_stamp:time_stamp.toString(),
        date:day+"-"+month+"-"+year

    }
    axios.post(`http://34.74.104.48:8080/savedbm`, data2post).then(res => {
        const data = res.data;
          if(data.message){
              this.setState({  loadingSave: false })
              Alert.alert("Succes","Saved Successfully",
              [
                  
                  {text: 'OK', onPress: () => this.props.navigation.navigate('Main')},
                ]);
             
               
             
          }
      }).catch((error)=>{
          alert(error)
          this.setState({ loadingSave : false })
      });

    // console.log(data2post)


  }
  generateIcon(){
      if(this.state.depressiontotal<50){
          return (<Icon active size={hp('30%')} name='emoji-happy' />)
      }
      else if(this.state.depressiontotal == 50){
        return (<Icon active size={hp('30%')} name='emoji-neutral' />)
      }
      else{
        return (<Icon active size={hp('30%')} name='emoji-sad' />)
      }

  }
  render() {
      if(this.state.loading==false){
        return (
            <LinearGradient
            colors={[ '#87CEEB', 'white']}  style={styles.container}>
                <View style={{backgroundColor:'white',borderRadius:20,width: dp('90%'), height: hp('70%'),alignItems:'center',justifyContent:'center'}}>
                        {this.generateIcon()}
                        <Text style={{color:'#494871',textAlign:'center',fontSize:hp('3%')}}> Your Depression % is {this.state.depressiontotal.toFixed(2)} {"\n"} </Text>
                        <Button style={{width:dp('70%')}}gradient onPress={()=>{this.saveToDatabase()}}>
              {this.state.loadingSave ?
                <ActivityIndicator size="small" color="white" /> : 
                <Text bold white center>Save</Text>
              }
              
            </Button>
                </View>
            </LinearGradient>
        );
      }
      else{
          return (
            <LinearGradient
            colors={[ '#87CEEB', 'white']}  style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
   
          </LinearGradient>
          )
      }
  
  }
}

const styles = StyleSheet.create({
    container:{
        flex :1,
        alignItems:'center',
        justifyContent : 'center',
        backgroundColor:'#5E7A7C'
    }

})
