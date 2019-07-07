import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
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
    let result = {"v":"5.4.4","fr":33.3333282470703,"ip":0,"op":67.0006440797762,"w":640,"h":426,"nm":"Comp 1","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"circle 3","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":61.001,"s":[100],"e":[0]},{"t":66.0006344666452}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[335.522,196.224,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[67.181,74.645,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[209.133,187.406],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"st","c":{"a":0,"k":[0.839215695858,0.074509806931,0.674509823322,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":5,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[6.566,57.703],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[87],"e":[19]},{"t":62.0005960141212}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0],"e":[-720]},{"t":62.0005960141212}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":67.0006440797762,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"circle 2","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":61.001,"s":[100],"e":[0]},{"t":64.0006152403832}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[336.527,206.033,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[51.881,57.645,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[209.133,187.406],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"st","c":{"a":0,"k":[0.839215695858,0.074509806931,0.674509823322,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":5,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[6.566,57.703],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[80],"e":[22]},{"t":59.0005671747283}],"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[1273],"e":[1273]},{"t":59.0005671747283}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":67.0006440797762,"st":0,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"circle 1","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":63.001,"s":[100],"e":[0]},{"t":66.0006344666452}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[337.414,214.689,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[38.381,42.645,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[209.133,187.406],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"st","c":{"a":0,"k":[0.839215695858,0.074509806931,0.674509823322,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":5,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[6.566,57.703],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[21],"e":[87]},{"t":63.0006056272522}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0],"e":[1038]},{"t":63.0006056272522}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":67.0006440797762,"st":0,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"heart","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":26,"s":[100],"e":[0]},{"t":61.0005864009902}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":0,"s":[351.364,239.385,0],"e":[357.935,233.243,0],"to":[1.095,-1.024,0],"ti":[-1.021,0.891,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":24,"s":[357.935,233.243,0],"e":[357.491,234.04,0],"to":[1.021,-0.891,0],"ti":[1.169,-0.191,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":26,"s":[357.491,234.04,0],"e":[350.921,234.389,0],"to":[-1.169,0.191,0],"ti":[1.095,-0.058,0]},{"t":61.0005864009902}],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":0,"s":[24.308,24.308,100],"e":[42.308,42.308,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":24,"s":[42.308,42.308,100],"e":[42.308,42.308,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":26,"s":[42.308,42.308,100],"e":[24.308,24.308,100]},{"t":61.0005864009902}],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[5.166,2.85],[19.684,-1.667],[4.712,-15.925],[0.509,-7.886],[-6.498,0.52],[-5.875,56.75],[21.679,6.929],[0.828,-1.243]],"o":[[-7.25,-4],[-16.511,1.398],[-2.036,6.883],[-2.144,33.236],[6.25,-0.5],[-0.625,-8.25],[-28.361,-9.065],[-1.063,-1.281]],"v":[[-54.5,-56.5],[-83.684,-62.583],[-116.993,-36.526],[-120,-14.75],[-45.25,62.25],[26,-21.625],[0.861,-59.935],[-47,-50.75]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.99831495098,0.999158014036,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.837576593137,0.073852516623,0.67338998832,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":67.0006440797762,"st":0,"bm":0}],"markers":[]}
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
