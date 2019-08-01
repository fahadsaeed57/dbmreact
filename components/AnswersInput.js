import React from 'react';
import {StyleSheet,Text, View, Dimensions } from 'react-native';
import {CheckBox} from 'react-native-elements';
const { height, width } = Dimensions.get('window');

export default class AnswersInput extends React.Component {
    state = {
        checked1: false,
        checked2: true,
        checked3: false,
        checked4: false,
        checked5: false
    }
    render(){
        return(
           <View style={styles.container}>
                <View style={styles.checked}> 
                    <CheckBox 
                        center
                        size={width *  0.15}
                        checkedColor='red'
                        checkedIcon='check-circle'
                        uncheckedIcon='circle-o'
                        checked={this.state.checked1}
                        onPress={() => this.setState(prevState => {
                            return {
                                checked1: !prevState.checked1,
                                checked2:false,
                                checked3:false,
                                checked4:false,
                                checked5:false
                            };
                          })}
                    />
                </View>
                <View style={styles.checked}>
                    <CheckBox 
                        center
                        size={width *  0.10}
                        checkedColor='red'
                        checkedIcon='check-circle'
                        uncheckedIcon='circle-o'
                        checked={this.state.checked2}
                        onPress={() => this.setState(prevState => {
                            return {
                                checked1: false,
                                checked2:!prevState.checked2,
                                checked3:false,
                                checked4:false,
                                checked5:false
                            };
                          })}
                    />
                </View>
                <View style={styles.checked}>
                    <CheckBox 
                        center
                        size={width *  0.05}
                        checkedIcon='check-circle'
                        uncheckedIcon='circle-o'
                        checked={this.state.checked3}
                        onPress={() => this.setState(prevState => {
                            return {
                                checked1: false,
                                checked2:false,
                                checked3:!prevState.checked3,
                                checked4:false,
                                checked5:false
                            };
                          })}
                    />
                </View>
                <View style={styles.checked}>
                    <CheckBox 
                        center
                        size={width *  0.10}
                        checkedColor='green'
                        checkedIcon='check-circle'
                        uncheckedIcon='circle-o'
                        checked={this.state.checked4}
                        onPress={() => this.setState(prevState => {
                            return {
                                checked1: false,
                                checked2:false,
                                checked3:false,
                                checked4:!prevState.checked4,
                                checked5:false
                            };
                          })}
                       
                    />
                </View>
                <View style={styles.checked}>
                    <CheckBox 
                        center
                        size={width *  0.15}
                        checkedColor='green'
                        checkedIcon='check-circle'
                        uncheckedIcon='circle-o'
                        checked={this.state.checked5}
                        onPress={() => this.setState(prevState => {
                            return {
                                checked1: false,
                                checked2:false,
                                checked3:false,
                                checked4:false,
                                checked5:!prevState.checked5
                            };
                          })}
                        
                    />
                </View>
           </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'row',
        alignSelf: 'stretch',
        width : null,
        justifyContent: 'center',
        alignItems: 'center'
        },
     checked:{
         margin:-10
     },   
})