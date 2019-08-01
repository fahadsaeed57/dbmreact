import React from 'react';
import { Button, StyleSheet, View, Image, Text } from 'react-native';
import { DangerZone } from 'expo';
import firebase from 'firebase';
import '@firebase/firestore';
import credentials from '../firebase/auth';

const { Lottie } = DangerZone;

export default class App extends React.Component {
  constructor(props){
    super(props);
    if (!firebase.apps.length) { firebase.initializeApp(credentials); }
  }
  state = {
    animation: null,
  };

  componentWillMount() {
    this._playAnimation();
    // setTimeout(()=>{
    //     this.props.navigation.navigate('Auth');
    // },2000)
  }
  componentDidMount(){

    
      firebase.auth().onAuthStateChanged(user => {
        // console.log(user)
        if(user){
          setTimeout(()=>{this.props.navigation.navigate(user.emailVerified ? 'App' : 'Auth')},2000)
        }
        else{
          setTimeout(()=>{this.props.navigation.navigate( 'Auth')},2000)
        }
        
      })
    
    // const dbh = firebase.firestore();

    // dbh.collection("users").doc("maria").set({
    //   name: "maria",
    //   email: "maria.zafar9715@gmail.com",
    //   age: 21 ,
    //   password: "mariafahad",
    //   phonenumber: "03471223562"
    // }) 
    }
  render() {
    return (
      <View style={styles.animationContainer}>
        {this.state.animation &&
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 400,
              height: 400,
              backgroundColor: '#fff',
            }}
            source={this.state.animation}
          />}
        
      </View>
    );
  }

  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimationAsync();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  _loadAnimationAsync = async () => {
    let result = {"v":"5.5.4","fr":24,"ip":0,"op":49,"w":1200,"h":1200,"nm":"circles 2","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Circle1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.562,"y":0.562},"o":{"x":0.167,"y":0.167},"t":0,"s":[910,346,0],"to":[292.028,0,0],"ti":[282.181,-1.586,0]},{"i":{"x":0.655,"y":0.655},"o":{"x":0.308,"y":0.308},"t":11.549,"s":[917.819,853.586,0],"to":[-293.825,1.652,0],"ti":[272,0,0]},{"i":{"x":0.686,"y":0.686},"o":{"x":0.342,"y":0.342},"t":24.602,"s":[286,352,0],"to":[-280,-6,0],"ti":[-278,8,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.437,"y":0.437},"t":35.91,"s":[288,848,0],"to":[280,4,0],"ti":[-274,0,0]},{"t":48.8486328125,"s":[910,346,0]}],"ix":2},"a":{"a":0,"k":[51.789,51.789,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[28.602,0],[0,-28.602],[-28.602,0],[0,28.602]],"o":[[-28.602,0],[0,28.602],[28.602,0],[0,-28.602]],"v":[[0,-51.789],[-51.789,0],[0,51.789],[51.789,0]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.031372550875,0.270588248968,0.407843142748,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[51.789,51.789],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":48.8488488488488,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Circle5","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.562,"y":0.562},"o":{"x":0.167,"y":0.167},"t":4.004,"s":[910,346,0],"to":[292.028,0,0],"ti":[282.181,-1.586,0]},{"i":{"x":0.655,"y":0.655},"o":{"x":0.308,"y":0.308},"t":15.553,"s":[917.819,853.586,0],"to":[-293.825,1.652,0],"ti":[272,0,0]},{"i":{"x":0.686,"y":0.686},"o":{"x":0.342,"y":0.342},"t":28.606,"s":[286,352,0],"to":[-280,-6,0],"ti":[-278,8,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.437,"y":0.437},"t":39.914,"s":[288,848,0],"to":[280,4,0],"ti":[-274,0,0]},{"t":52.852636816504,"s":[910,346,0]}],"ix":2,"x":"var $bm_rt;\n$bm_rt = loopIn('cycle');"},"a":{"a":0,"k":[51.789,51.789,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[28.602,0],[0,-28.602],[-28.602,0],[0,28.602]],"o":[[-28.602,0],[0,28.602],[28.602,0],[0,-28.602]],"v":[[0,-51.789],[-51.789,0],[0,51.789],[51.789,0]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.219607843137,0.427450980392,0.537254901961,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[51.789,51.789],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":48.8488488488488,"st":4.004004004004,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"Circle4","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.562,"y":0.562},"o":{"x":0.167,"y":0.167},"t":8.008,"s":[910,346,0],"to":[292.028,0,0],"ti":[282.181,-1.586,0]},{"i":{"x":0.655,"y":0.655},"o":{"x":0.308,"y":0.308},"t":19.557,"s":[917.819,853.586,0],"to":[-293.825,1.652,0],"ti":[272,0,0]},{"i":{"x":0.686,"y":0.686},"o":{"x":0.342,"y":0.342},"t":32.61,"s":[286,352,0],"to":[-280,-6,0],"ti":[-278,8,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.437,"y":0.437},"t":43.918,"s":[288,848,0],"to":[280,4,0],"ti":[-274,0,0]},{"t":56.856640820508,"s":[910,346,0]}],"ix":2,"x":"var $bm_rt;\n$bm_rt = loopIn('cycle');"},"a":{"a":0,"k":[51.789,51.789,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[28.602,0],[0,-28.602],[-28.602,0],[0,28.602]],"o":[[-28.602,0],[0,28.602],[28.602,0],[0,-28.602]],"v":[[0,-51.789],[-51.789,0],[0,51.789],[51.789,0]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.360784322023,0.549019634724,0.631372570992,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[51.789,51.789],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":48.8488488488488,"st":8.00800800800801,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"Circle3","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.562,"y":0.562},"o":{"x":0.167,"y":0.167},"t":12.012,"s":[910,346,0],"to":[292.028,0,0],"ti":[282.181,-1.586,0]},{"i":{"x":0.655,"y":0.655},"o":{"x":0.308,"y":0.308},"t":23.561,"s":[917.819,853.586,0],"to":[-293.825,1.652,0],"ti":[272,0,0]},{"i":{"x":0.686,"y":0.686},"o":{"x":0.342,"y":0.342},"t":36.614,"s":[286,352,0],"to":[-280,-6,0],"ti":[-278,8,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.437,"y":0.437},"t":47.922,"s":[288,848,0],"to":[280,4,0],"ti":[-274,0,0]},{"t":60.860644824512,"s":[910,346,0]}],"ix":2,"x":"var $bm_rt;\n$bm_rt = loopIn('cycle');"},"a":{"a":0,"k":[51.789,51.789,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[28.602,0],[0,-28.602],[-28.602,0],[0,28.602]],"o":[[-28.602,0],[0,28.602],[28.602,0],[0,-28.602]],"v":[[0,-51.789],[-51.789,0],[0,51.789],[51.789,0]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.625490196078,0.637254961799,0.550980451995,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[51.789,51.789],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":48.8488488488488,"st":12.012012012012,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"Circle2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.562,"y":0.562},"o":{"x":0.167,"y":0.167},"t":16.016,"s":[910,346,0],"to":[292.028,0,0],"ti":[282.181,-1.586,0]},{"i":{"x":0.655,"y":0.655},"o":{"x":0.308,"y":0.308},"t":27.565,"s":[917.819,853.586,0],"to":[-293.825,1.652,0],"ti":[272,0,0]},{"i":{"x":0.686,"y":0.686},"o":{"x":0.342,"y":0.342},"t":40.618,"s":[286,352,0],"to":[-280,-6,0],"ti":[-278,8,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.437,"y":0.437},"t":51.926,"s":[288,848,0],"to":[280,4,0],"ti":[-274,0,0]},{"t":64.864648828516,"s":[910,346,0]}],"ix":2,"x":"var $bm_rt;\n$bm_rt = loopIn('cycle');"},"a":{"a":0,"k":[51.789,51.789,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[28.602,0],[0,-28.602],[-28.602,0],[0,28.602]],"o":[[-28.602,0],[0,28.602],[28.602,0],[0,-28.602]],"v":[[0,-51.789],[-51.789,0],[0,51.789],[51.789,0]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.949019610882,0.898039221764,0.768627464771,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[51.789,51.789],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":48.8488488488488,"st":16.016016016016,"bm":0}],"markers":[]}
    this.setState({ animation: result }, this._playAnimation);
  };
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
