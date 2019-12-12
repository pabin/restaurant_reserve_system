import React, {Component, Fragment} from 'react'

import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  ImageBackground,
  Image,
} from 'react-native';

class HomeScreen extends Component {
    constructor(props) {
      super(props)

      this.state = {
        check_me: true
      }
    }

    render() {
      console.log("Hi there how are you mate...");
      return (
        <Fragment>
          <View style={styles.container}>
            <Text style={styles.textContainer}>
              QuizSewa
            </Text>

            <TouchableHighlight style ={styles.roundedButton}>
              <Text style={styles.buttonText}>Play Now</Text>
            </TouchableHighlight>

            <TouchableHighlight style ={styles.roundedButton}>
              <Text style={styles.buttonText}>Lok Sewa Quiz</Text>
            </TouchableHighlight>

            <TouchableHighlight style ={styles.roundedButton}>
              <Text style={styles.buttonText}>Leader Board</Text>
            </TouchableHighlight>

            <TouchableHighlight style ={styles.roundedButton}>
              <Text style={styles.buttonText}>Setting</Text>
            </TouchableHighlight>

            <TouchableHighlight style ={styles.roundedButton}>
              <Text style={styles.buttonText}>Profile</Text>
            </TouchableHighlight>

          </View>
        </Fragment>
      )
    }
}

export default HomeScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    justifyContent: 'center',
  },

  textContainer: {
    fontSize: 38,
    padding: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Acme',
  },

  roundedButton: {
    backgroundColor: "#1e824c",
    elevation: 5,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
    marginVertical: 8,
  },

  buttonText: {
    padding: 8,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#FFFFFF'

  }
})
