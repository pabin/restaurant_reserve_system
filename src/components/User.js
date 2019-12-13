import React, {Component, Fragment} from 'react'

import {
  View,
  Text,
  PanResponder,
  Animated,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native'


class User extends Component {
  constructor(props) {
    super()

    this.state = {
      showDraggable: true,
      dropAreaValues: null,
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1)
    }

    // Add a listener for the delta value change
    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => this._val = value);
    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onStartShouldSetPanResponderCapture: (e, gesture) => true,
      onMoveShouldSetPanResponder: (e, gesture) => true,
      onMoveShouldSetPanResponderCapture: (e, gesture) => true,
            
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),

      onPanResponderRelease: (e, gesture) => {
          if (this.isDropArea(gesture)) {
            Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 1000
          }).start(() =>
            this.setState({
               showDraggable: false
            })
          );
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            friction: 5
          }).start();
        }
      }
    });
    // adjusting delta value
    this.state.pan.setValue({ x:0, y:0});
  }

  isDropArea(gesture) {
    return gesture.moveY < 200;
  }


  render() {
    const panStyle = {
          transform: this.state.pan.getTranslateTransform()
        }

    return(
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle, styles.user]}>

        <Text style={styles.text}>{this.props.name}</Text>
      </Animated.View>
    )
  }

}

export default User


const styles = StyleSheet.create({
  user: {
    padding: 10,
    margin: 10,
    marginHorizontal: 30,
    backgroundColor: "orange",
    elevation: 5,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
  },

  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
})
