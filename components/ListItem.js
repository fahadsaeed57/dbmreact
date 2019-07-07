import React from 'react';
import {View, Text, StyleSheet, Animated, Dimensions, PanResponder,TouchableOpacity} from 'react-native';
import firebase from 'firebase';
const {width} = Dimensions.get('window');

export default class ListItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.gestureDelay = -35;
    this.scrollViewEnabled = true;

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 35) {
          this.setScrollViewEnabled(false);
          let newX = gestureState.dx + this.gestureDelay;
          position.setValue({x: newX, y: 0});
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < 150) {
          Animated.timing(this.state.position, {
            toValue: {x: 0, y: 0},
            duration: 150,
          }).start(() => {
            this.setScrollViewEnabled(true);
          });
        } else {
          Animated.timing(this.state.position, {
            toValue: {x: width, y: 0},
            duration: 300,
          }).start(() => {
            // this.props.success(this.props.text);
            this.setScrollViewEnabled(true);
          });
        }
      },
    });
    this.ref = firebase.firestore().collection('todoTasks');
    this.panResponder = panResponder;
    this.state = {position,isCompleted: false};
   
  }

  setScrollViewEnabled(enabled) {
    if (this.scrollViewEnabled !== enabled) {
      this.props.setScrollEnabled(enabled);
      this.scrollViewEnabled = enabled;
    }
  }
  deleteitem(){
      console.log(this.props);
    // this.ref.doc(this.props.taskname).delete().then(function() {
    //     console.log("Document successfully deleted!");
    // }).catch(function(error) {
    //     console.log("Error removing document: ", error);
    // });
  }

  render() {
    return (
      <View style={styles.listItem}>
        <Animated.View style={[this.state.position.getLayout()]} {...this.panResponder.panHandlers}>
          <TouchableOpacity  onPress={()=>this.deleteitem()} style={styles.absoluteCell}>
            <Text style={styles.absoluteCellText} >DELETE</Text>
          </TouchableOpacity>
          <View style={styles.innerCell}>
            <Text>
              {this.props.taskname}
            </Text>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    height: 80,
    marginLeft: -100,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  absoluteCell: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  absoluteCellText: {
    margin: 16,
    color: '#FFF',
  },
  innerCell: {
    width: width,
    height: 80,
    marginLeft: 100,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
});