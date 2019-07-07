import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Expo from 'expo';

let window = Dimensions.get('window');
const contentHeight = window.height - 80;
const avatarBot = "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg";

export default class ChatScreen extends Component {
  // static navigationOptions = {
  //   title: 'ChatBot'
  // }

  constructor(props) {
    super(props);
    this.getDialogFlow = this.getDialogFlow.bind(this);
    this.state = { gifted: [], answers: [], height: contentHeight };
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    // Expo.Speech.stop();
  }

  _keyboardDidShow = (e) => {
    this.setState({ height: contentHeight - e.endCoordinates.height});
    // console.log(this.state.contentHeight, 'Keyboard Shown');
  }

  _keyboardDidHide = (e) => {
    this.setState({ height: contentHeight });
    // console.log(this.state.contentHeight, 'Keyboard Hidden');
  }

  componentWillMount() {
    this.setState({
      gifted: [
        {
          _id: 1,
          text: 'Hi I am Warden. I am here to help you with your depression and cheer you up buddy ;p!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Warden',
            avatar: avatarBot,
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      gifted: GiftedChat.append(previousState.gifted, messages),
    }))
    this.getDialogFlow(messages[0].text)
  }

  async getDialogFlow(msg) {
    const ACCESS_TOKEN = '70782e0eaf984a5190c94a3bcea2a6ab';

    try {
       const response = await fetch(`https://api.dialogflow.com/v1/query?v=20150910`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          query: msg,
          lang: 'en',
          sessionId: '203203'
        })
      })
      let responseJson = await response.json();

      const imageUrl = null;
      console.log(responseJson);

      responseJson.result.fulfillment.messages.map((item, i) => {
         if (item.payload !== undefined){
            if(item.payload.imageUrl !== undefined) {
              imageUrl = item.payload.imageUrl;
            }
        }
        return imageUrl
      })

      let answers = [
        {
          _id: responseJson.id,
          text: responseJson.result.fulfillment.speech,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Botler',
            avatar: avatarBot,
          },
          image: imageUrl,
          imageProps: {
             height: 200,
             width: 200
          }
        },
      ]

      // Expo.Speech.stop()
      // Expo.Speech.speak(responseJson.result.fulfillment.speech)

      this.setState(previousState => ({
        gifted: GiftedChat.append(previousState.gifted, answers),
      }))

      return responseJson;

    } catch(error) {
      console.error(error);
    }
  }

  renderChat = () => {
    return(
        <GiftedChat style = {{backgroundColor: "black"}}
          textInputProps={{autoFocus: true}}
          messages={this.state.gifted}
          placeholder='Ask me anything...'
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
    );
  }

  render() {
    if(Platform.OS === 'ios'){
      return this.renderChat();
     }
    else{
       return(
        <View style={{ height: this.state.height }}>
           { this.renderChat() }
        </View>
      )
    }
  }
}

