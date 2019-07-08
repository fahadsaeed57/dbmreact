import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
const { height, width } = Dimensions.get("window");

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      isCompleted: false
    };
    this.ref = firebase.firestore().collection("todoTasks");
  }
  toggleItem = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      };
    });
  };
  deleteItem = id => {
    this.ref
      .doc(id)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  };
  render() {
    const { isCompleted } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={this.toggleItem}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completeCircle : styles.incompleteCircle
              ]}
            />
          </TouchableOpacity>
        </View>
        <View style={{ width: width * 0.6 }}>
          <Text
            style={[
              styles.text,
              isCompleted ? styles.strikeText : styles.unstrikeText
            ]}
          >
            {this.props.taskname}{" "}
          </Text>
        </View>

        <View style={{ justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              Alert.alert(
                "Delete Task",
                "Do you really want to delete this task?",
                [
                  {
                    text: "NO",
                    onPress: () => console.log("NO Pressed"),
                    style: "cancel"
                  },
                  { text: "YES", onPress: () => this.deleteItem(this.props.id) }
                ]
              );
            }}
          >
            <Ionicons name={"ios-trash"} size={30} color={'#0050a0'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center"
    //justifyContent: 'space-between'
  },
  text: {
    fontWeight: "500",
    fontSize: 18,
    marginVertical: 20
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    //   borderColor: 'red',
    borderWidth: 3,
    marginRight: 20
  },
  completeCircle: {
    borderColor: "#bbb"
  },
  incompleteCircle: {
    borderColor: '#0050a0',
  },
  strikeText: {
    color: "#bbb",
    textDecorationLine: "line-through"
  },
  unstrikeText: {
    color: "#29323c"
  },

  // rowContainer: {
  //     flexDirection: 'row',
  //     width: width / 2,
  //     alignItems: 'center',
  //     justifyContent: 'space-between'
  //   },
  //   buttons: {
  //     flexDirection: 'row',
  //   },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: width * 0.02
  }
});

export default TodoList;
