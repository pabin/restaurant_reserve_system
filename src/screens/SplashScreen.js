import React, {Component, Fragment} from 'react'

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  Image,
} from 'react-native';

class SplashScreen extends Component {
    constructor(props) {
      super(props)

      this.state = {
        loadingValue: 0,
      }

      setTimeout(() => {
        console.log('Loading...');
        this._renderLoadingBar()

        setTimeout(() => {
          this.props.navigation.navigate("HOME_SCREEN")
        }, 200)

      }, 2000)
    }

    _renderLoadingBar() {

      for( var i=0; i<=300; i+=10) {
        // console.log(this.state.loadingValue);
        this.setState({loadingValue: i})
      }
    }

    render() {

      const paddingValue = {
        paddingRight: this.state.loadingValue
      }

      return (
        <Fragment>
          <View style={styles.container}>
            <StatusBar hidden={true} />

            <Text style={styles.logoText}>
              QuizSewa
            </Text>

            <View style ={styles.roundedButtonParent}>
              <View style ={[styles.roundedButtonChild, paddingValue]}>
              </View>
            </View>

            <Text style={styles.loadingText}>
              Loading...
            </Text>

          </View>
        </Fragment>
      )
    }
}

export default SplashScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    justifyContent: 'center',
    backgroundColor: '#000000'
  },

  logoText: {
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    padding: 20,
  },

  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },

  roundedButtonParent: {
    flexDirection: 'row',
    backgroundColor: "#1e824c",
    elevation: 5,
    borderRadius:20,
    marginVertical: 8,
  },

  roundedButtonChild: {
    backgroundColor: "orange",
    borderRadius:20,
    padding: 10,
  },
})
