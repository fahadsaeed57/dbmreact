import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView, TouchableOpacity, FlatList, RefreshControl} from 'react-native';
import {LinearGradient} from 'expo';
import {Ionicons} from '@expo/vector-icons';
import TodoList from '../components/TodoList';
import firebase from 'firebase';
import ListItem from '../components/ListItem';


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
 
    this.ref.onSnapshot((querySnapshot) => {
        const todos = [];
        
        querySnapshot.forEach((doc) => {
            todos.push({
                taskName: doc.data().taskName,
                id : doc.id

            });
            
            
            
        });
        
        this.setState({
            todos: todos,
            loading: false,
        });
    });
    

   
}

onPressAdd = () => {
  if(this.state.newTodoItem.trim() === '') {
      alert('task name is blank');
      return;
  }
  this.ref.add({
      taskName: this.state.newTodoItem
  }).then((data) => {
      console.log(`added data = ${data}`);
      this.setState({
          newTodoItem: '',
          loading: true
      });
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

  render() {
    // let todos = this.state.todoTasks.map((todo,index)=>{
    //   return  (<TodoList taskname={todo.taskName} key={index.toString()} />)
    // }
    // )
    return (
      <LinearGradient style={styles.container}  colors={['#DA4453', '#89216B']}>
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
                            
                          <TodoList taskname = {item.taskName} id={item.id} />
                          );
                    }}     
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={this.state.enable}               
                >
                </FlatList>
            </ScrollView>
            <TouchableOpacity style = {styles.button} onPress={this.onPressAdd}>
            <Ionicons name={"ios-add-circle"} size={70} color={'#800080'}
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
    color: '#fff',
    fontSize: 36,
    marginTop: 60,
    marginBottom: 30,
    fontWeight: '300'
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

