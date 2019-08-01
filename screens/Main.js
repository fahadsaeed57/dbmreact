import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import {Ionicons} from '@expo/vector-icons';
import { Card, Badge, Button, Block, Text } from '../components';
import { theme, mocks } from '../constants';
import firebase from 'firebase';
const { width } = Dimensions.get('window');
import { Permissions, Notifications } from 'expo';

const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';

class Main extends Component {
static navigationOptions={
  title:"Warden"
}
  constructor(props){
    super(props)
    this.state = {
      
      loading: false,
    }
  }

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    try {
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();
  
      // POST the token to your backend server from where you can retrieve it to send push notifications.
       console.log(token)
  
       const dbh = firebase.firestore();
  
          dbh.collection("users").doc(""+this.currentUser.uid).update({
            pushtoken :token
          })
      //   .firestore()
      //   .ref('users/' + this.currentUser.uid + '/push_token')
      //   .set(token);
    } catch (error) {
      console.log(error);
    }
  };
  // sendPushNotification = () => {
  //   let response = fetch('https://exp.host/--/api/v2/push/send', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       to: 'ExponentPushToken[ubbWTmKWiwr6Z_IIqSsEbW]',
  //       sound: 'default',
  //       title: 'Demo',
  //       body: 'Demo notificaiton'
  //     })
  //   });
  // };
 

  state = {
    active: 'Products',
    categories: []
  }

  async componentDidMount() {
    this.currentUser = await firebase.auth().currentUser;
    await this.registerForPushNotificationsAsync();
  }


  // componentDidMount() {
  //   this.setState({ categories: this.props.categories });
  // }

  handleTab = tab => {
    const { categories } = this.props;
    const filtered = categories.filter(
      category => category.tags.includes(tab.toLowerCase())
    );

    this.setState({ active: tab, categories: filtered });
  }

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.handleTab(tab)}
        style={[
          styles.tab,
          isActive ? styles.active : null
        ]}
      >
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    
    const { profile, navigation } = this.props;
    const { categories, loading } = this.state;
    const tabs = ['Products'];

    return (
      <Block  style={{backgroundColor: 'white'}}>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold primary>Warden</Text>
         
          <Button  onPress={() => 
            {
              this.setState({loading:true})
              firebase.auth().signOut()
            }}>
              {loading ?
                <ActivityIndicator size="small" color="#0050a0" /> : 
                <Ionicons name={"ios-log-out"} size={28} color={'#0050a0'}/>
              } 
          
          </Button>
        </Block>

        {/* <Block flex={false} row style={styles.tabs}>
          {tabs.map(tab => this.renderTab(tab))}
        </Block> */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2}}
        >
          <Block flex={false} row space="between" style={styles.categories}>
          <TouchableOpacity
                
                onPress={() => navigation.navigate('Chat')}
              >
                <Card center middle shadow style={styles.category } >
                  <Badge margin={[0, 0, 15]} size={90} color="#87CEEB">
                    <Image source={require('../assets/images/1.png')} style={{height:60,width:65}} />
                  </Badge>
                  <Text medium height={30}>Chat</Text>
                </Card>
                </TouchableOpacity>
                <TouchableOpacity
                
                onPress={() => this.props.navigation.navigate('Todo')}
              >
                <Card center middle shadow style={styles.category} >
                  <Badge margin={[0, 0, 15]} size={90} color="#87CEEB">
                    <Image source={require('../assets/images/2.png')} style={{height:60,width:60}}/>
                  </Badge>
                  <Text medium height={30}>To do</Text>
                </Card>
                </TouchableOpacity>
                <TouchableOpacity
                
                onPress={() => this.props.navigation.navigate('Test')}
              >
                <Card center middle shadow style={styles.category}>
                  <Badge margin={[0, 0, 15]} size={90} color="#87CEEB">
                    <Image source={require('../assets/images/4.png')} style={{height:65,width:55}} />
                  </Badge>
                  <Text medium height={30}>Personality Test</Text>
                </Card>
                </TouchableOpacity>
                <TouchableOpacity
                
                onPress={() => this.props.navigation.navigate('Report')}
              >
                <Card center middle shadow style={styles.category}>
                  <Badge margin={[0, 0, 15]} size={90} color="#87CEEB">
                    <Image source={require('../assets/images/5.png')}  style={{height:60,width:45}}/>
                  </Badge>
                  <Text medium height={20}>Performance Report</Text>
                </Card>
                </TouchableOpacity>
          </Block>
        </ScrollView>
      </Block>
    )
  }
}

Main.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories,
}

export default Main;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
    maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
    maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
  },
  
})
