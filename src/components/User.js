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
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1),
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
          // var isDropArea = this.props.get_user_coordinates(gesture)
          // console.log('isDropArea @ user', isDropArea);
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

  isDropArea = (gesture) => {
    mX = gesture.moveX
    mY = gesture.moveY
    const tableCoordinates = this.props.tableCoordinates
    console.log('tableCoordinates @ drop Area: ', tableCoordinates);
    console.log('gesture @ drop Area: ', gesture);

    var foundRightLocation = false
    tableCoordinates.map((coord, index) => {
      if ((mX > coord.x1) && (mX < coord.x2) && (mY > coord.y1) && (mY < coord.y2)) {
        console.log('yes this is right location...')
        foundRightLocation =  true
      } else {
        console.log('Sorry Wrong Location...');
      }
    })
    return foundRightLocation
  }

  render() {
    const panStyle = {
          transform: this.state.pan.getTranslateTransform()
        }

    return(
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[panStyle]}>
          <View style={styles.user}>
            <Text style={styles.text}>{this.props.name}</Text>
          </View>
        </Animated.View>
    )
  }

}

export default User


const styles = StyleSheet.create({
  user: {
    zIndex: 10,
    padding: 10,
    margin: 10,
    marginHorizontal: 20,
    backgroundColor: "#C3302D",
    elevation: 5,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
    // position: 'absolute',
  },

  text: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
  },
})
