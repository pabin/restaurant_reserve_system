import React, {Component, Fragment} from 'react'

import {
  View,
  Text,
  PanResponder,
  Animated,
  StyleSheet,
  TouchableNativeFeedback,
  Dimensions
} from 'react-native'


class Table extends Component {
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
      // onStartShouldSetPanResponderCapture: (e, gesture) => true,
      // onMoveShouldSetPanResponder: (e, gesture) => true,
      // onMoveShouldSetPanResponderCapture: (e, gesture) => true,

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
      <View style={styles.table}>
        <Text style={styles.text}>Table {this.props.tableNumber}</Text>
      </View>

    )
  }

}

export default Table


const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
  },

  table: {
    padding: 20,
    paddingVertical: 50,
    margin: 40,
    backgroundColor: "#3F7242",
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    width: Dimensions.get('window').width / 5,
  },

})
