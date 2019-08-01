import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView, TouchableOpacity, FlatList, RefreshControl} from 'react-native';
import {LinearGradient} from 'expo';
import {Ionicons} from '@expo/vector-icons';
import TodoList from '../components/TodoList';
import firebase from 'firebase';
import { Notifications } from 'expo';


const { height, width } = Dimensions.get('window');
export default class Todoscreen extends React.Component {
  static navigationOptions = {
    header : null
  }
  constructor(props) {
    super(props)

    this.state = {
      newTodoItem: '',
      loading: false,
      enable: true
      
    };
    // this.renderSeparator = this.renderSeparator.bind(this);
    // this.success = this.success.bind(this);
    // this.setScrollEnabled = this.setScrollEnabled.bind(this);

    this.ref = firebase.firestore().collection('todoTasks');
  }

  componentDidMount() {
    
this.getTodos();
   
}
getTodos=()=>{
  let query = this.ref.where("uId","==",firebase.auth().currentUser.uid)
    query.onSnapshot((querySnapshot) => {
        const todos = [];
        
        querySnapshot.forEach((doc) => {
            
            todos.push({
                taskName: doc.data().taskName,
                id : doc.id,
                date:doc.data().date,
                isComplete:doc.data().isComplete,
                notificationId:doc.data().notificationId
               
            });
            
           
            
        });
        console.log(todos)
        this.setState({
            todos: todos,
            loading: false,
        });
    });
    
}
sendNotificationImmediately =  (taskname) => {
  let notificationId = Notifications.scheduleLocalNotificationAsync({
    title: 'Task Reminder',
    body: 'you have to complete '+taskname,
  }
  ,
  {
    repeat: 'day',
    time: new Date().getTime() + 5000,
  },
  
  );
return notificationId; // can be saved in AsyncStorage or send to server
};

onPressAdd = () => {
  if(this.state.newTodoItem.trim() === '') {
      alert('task name is blank');
      return;
  }
 


  this.ref.add({
      taskName: this.state.newTodoItem,
      date: new Date().getTime(),
      isComplete:false,
      uId:firebase.auth().currentUser.uid,
      notificationId:""
    
  }).then((data) => {
      console.log(`added data = ${data}`);
      this.sendNotificationImmediately(this.state.newTodoItem).then((res)=>{
        this.ref.doc(data.id).update({
            notificationId:res
          });

      }).catch((err)=>{
        console.log(err);
      })
      this.setState({
          newTodoItem: '',
          loading: true
      },()=>{
        // this.getTodos();
        // console.log("notification 2 "+notificationid)
       
  
          
         
      });
      
      // 
  }).catch((error) => {
      console.log(`error adding Firestore document = ${error}`);
      this.setState({
          newTodoItem: '',
          loading: true
      });
  });
}



  // newTodoItemController = textValue => {
  //   this.setState({
  //     newTodoItem: textValue
  //   });
  // }



getMonthinString(number){
  months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"]
  return months[number];
}

  render() {
    // let todos = this.state.todoTasks.map((todo,index)=>{
    //   return  (<TodoList taskname={todo.taskName} key={index.toString()} />)
    // }
    // )
    return (
      <LinearGradient style={styles.container}  colors={[ '#87CEEB', 'white']}>
        <StatusBar barStyle = "light-content" />
        <Text style={styles.appTitle}> To do list</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={'Add an item!'}
            value={this.state.newTodoItem}
            // onChangeText={this.newTodoItemController}
            placeholderTextColor={'#999'}
            returnKeyType={'done'}
            autoCorrect={false}
            onChangeText={
              (text) => {
                  this.setState({ newTodoItem: text });
              }
         }
            />
            <ScrollView contentContainerStyle={styles.listContainer}>
            <FlatList                    
                    data={this.state.todos}
                    ItemSeparatorComponent={this.renderSeparator}
                    renderItem={({ item, index }) => {
                        return (
                            
                          <TodoList taskname = {item.taskName} id={item.id} month={this.getMonthinString(new Date(item.date).getMonth())} day={new Date(item.date).getDate()}  isComplete={item.isComplete} notificationId={item.notificationId}/>
                          
                          );
                    }}     
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={this.state.enable}               
                >
                </FlatList>
            </ScrollView>
            <TouchableOpacity style = {styles.button} onPress={this.onPressAdd}>
            <Ionicons name={"ios-add-circle"} size={70} color={'#0050a0'}
           style={styles.inputIcon}/>
            </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center',
    //justifyContent: 'center'
  },
  appTitle: {
    color: '#0050a0',
    fontSize: 36,
    marginTop: 60,
    marginBottom: 30,
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 5
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 24
  },
  listContainer: {
    alignItems: 'center'
  },
  button: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginBottom: 10
  }
  
});

