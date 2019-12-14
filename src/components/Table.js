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

  }


  render() {
    const panStyle = {
          transform: this.state.pan.getTranslateTransform()
        }

    return(
      <View style={styles.table} onLayout={(event) => { this.props.find_dimesions(event.nativeEvent.layout) }}>
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
    // zIndex: -1,
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
