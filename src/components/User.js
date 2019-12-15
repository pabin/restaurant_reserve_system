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
      userItemLength: '',
      userItemHeight: '',
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
          }).start();
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


  // Checks if the Gesture Coordinates are with in the Table Coordinates
  isDropArea = (gesture) => {
    const {userItemLength, userItemHeight} = this.state

    // Update on these formulas is required based on Gesture Location on UserItem
    var mX = gesture.moveX
    var mY = gesture.moveY
    var ox2 = mX
    var ox1 = mX - userItemLength
    var oy1 = mY - (userItemHeight)/2
    var oy2 = mY + (userItemHeight)/2

    console.log('ox1: ', ox1);
    console.log('ox2: ', ox2);
    console.log('oy1: ', oy1);
    console.log('oy2: ', oy2);

    const tableCoordinates = this.props.tableCoordinates
    console.info('tableCoordinates @ drop Area: ', tableCoordinates);
    console.info('gesture @ drop Area: ', gesture);

    var foundRightLocation = false
    tableCoordinates.map((coord, index) => {
      if ((ox1 > coord.x1) && (ox2 < coord.x2) && (oy1 > coord.y1) && (oy2 < coord.y2)) {
        console.log('Yes, this is right location...')
        foundRightLocation =  true
      } else {
        console.log('Sorry, Wrong Location...');
      }
    })
    return foundRightLocation
  }

  // Get Width of the UserPanel View, Just for Coordinates Calculations
  get_dimensions = (layout) => {
    console.log('Useritem Layout :', layout);
    const {width, height} = layout;
    this.setState({'userItemLength': width, 'userItemHeight': height})
  }


  render() {
    const panStyle = {
          transform: this.state.pan.getTranslateTransform()
        }

    return(
        <Animated.View
          {...this.panResponder.panHandlers}
          onLayout={(event) => { this.get_dimensions(event.nativeEvent.layout) }}
          style={[panStyle, styles.user]}>
            <Text style={styles.text}>{this.props.name}</Text>
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
  },

  text: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
  },
})
