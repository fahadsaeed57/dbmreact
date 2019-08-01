import React, { Component } from 'react'
import { Animated, Dimensions, Image, FlatList, Modal, StyleSheet, ScrollView,ActivityIndicator,TouchableOpacity } from 'react-native';
import { Button, Block, Text } from '../components';
import { theme } from '../constants';
import AnswersInput from '../components/AnswersInput';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import firebase from 'firebase';
import { View } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';


const { width, height } = Dimensions.get('window');

class TestScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  

  state = {
    checked:[],
    loading:true,
    questions:[]
  }

  componentDidMount(){
  
      var that = this
      // if(Platform.OS=="android"){
      //   BackHandler.addEventListener('hardwareBackPress', function() {
      //     that.props.navigation.navigate('Main')
      //      return true;
      //   });
      // }
  
      this.ref =  firebase.firestore().collection('questionnaire').limit(15);
    
      this.ref.onSnapshot((querySnapshot) => {
          var questions = [];
          var count =0;
          querySnapshot.forEach((doc) => {
              
             
              questions.push({
                  question: doc.data().question,
                  id : doc.id,
                  
                  
                 
              });
              
             
              
          });
          console.log(questions)
          this.setState({
              questions: questions,
              loading: false,
              currentQuestion:questions[0],
              questionCount:1,
              selectedIndex:-1
          });
      });
          
  }

  
onPressingNext=()=>{
  if(this.state.questionCount < this.state.questions.length){
   

    this.setState({ selectedIndex:-1,questionCount:this.state.questionCount+1, currentQuestion: this.state.questions[this.state.questionCount-1]})
  }else{
    
    alert("No more questions")
   }
}
  onSelect(index, value,questionnum){

    if(this.state.checked[questionnum]){

        this.setState({
          checked:[...this.state.checked.slice(0,-1),value]
        },()=>{
          console.log(this.state.checked)
          console.log("this")
        })
    }
    else{
      this.setState({
        checked:[...this.state.checked,value]
      },()=>{
        console.log(this.state.checked)
      })
    }
    
    
  }
  // prev(){
  //   if(this.state.questionCount > 1){
      
  //     this.setState({ questionCount:this.state.questionCount-1, currentQuestion: this.state.questions[this.state.questionCount],checked:[...this.state.checked.slice(0,-1)]})
  //   }
  // }

  generateOptions(){
    if(this.state.questionCount>0){
      return (
        <RadioGroup
        selectedIndex={this.state.selectedIndex}

        onSelect = {(index, value) => this.onSelect(index, value,this.state.questionCount-1)}
      >
        <RadioButton value={1} >
          <Text>Fully Agree </Text>
        </RadioButton>
    
        <RadioButton value={0.8}>
          <Text>Agree</Text>
        </RadioButton>
    
        <RadioButton value={0.6}>
          <Text>Normal</Text>
        </RadioButton>
        <RadioButton value={0.4}>
          <Text>Disagree</Text>
        </RadioButton>
        <RadioButton value={0.2}>
          <Text>Completely disagree</Text>
        </RadioButton>
      </RadioGroup>

      )
    }
  
  }
  
  render() {
    const { navigation } = this.props;
    if(this.state.loading===false && this.state.questions){
    return (
      <Block style={{backgroundColor: 'white'}}>
        <Block center bottom flex={0.4}>
          <Text h1 center bold primary>
            QUESTION {this.state.questionCount}/15
          </Text>
          <Text h3 style={{ marginTop: theme.sizes.padding / 2 }}>
          </Text>
          
        </Block>
        {/* <Block center middle>
        
        </Block> */}
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Text>
            {this.state.currentQuestion.question}
          </Text>
       
       {this.generateOptions()}
      <TouchableOpacity onPress={() => this.onPressingNext()} >
          <View style={{paddingTop: 5,paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius:10, backgroundColor:"green"}}>
            <Icon name="md-arrow-round-forward" size={30} color="white" />
          </View>
        </TouchableOpacity >
        
        </Block>
        
      </Block>
    )
     }
     else{
       return(
       <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
         <ActivityIndicator size="large" color="#0000ff" />

       </View>)
     }
    }
}

TestScreen.defaultProps = {
  illustrations: [
    { id: 1, source: require('../assets/images/1.png') },
    { id: 2, source: require('../assets/images/2.png') },
    { id: 3, source: require('../assets/images/3.png') },
    { id: 4, source: require('../assets/images/4.png') },
    { id: 5, source: require('../assets/images/5.png') },
  ],
};

export default TestScreen;

const styles = StyleSheet.create({
  stepsContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
    
  },
})
 
