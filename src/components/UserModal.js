import React, {Component, Fragment} from 'react'

import {
  View,
  Text,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Dimensions,
} from 'react-native'

import SQLite from "react-native-sqlite-2";



class TableModal extends Component {
  constructor(props) {
    super()

    this.state = {
      modalVisible: props.visible,
      name: '',
      quantity: '',
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  saveUserDetail() {
    console.log('hi');
    const {name, quantity, modalVisible} = this.state
    const db = SQLite.openDatabase("RestaurantReserve.db", "1.0", "", 1);

    db.transaction(function(txn) {
      txn.executeSql("INSERT INTO Users (name) VALUES (:name)", [name]);
      txn.executeSql("SELECT * FROM `users`", [], (tx, users) => {
        console.log('allUsers', users.rows._array);
        // this.setState({'allUsers': users.rows._array})
      });
    });

    this.setModalVisible(!modalVisible)
  }


  render() {
    return(
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        >
        <KeyboardAvoidingView style={styles.modalContainer} behavior="padding" enabled>
          <View style={styles.input} >
            <Text style={styles.text}>Name</Text>
              <TextInput
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={name => this.setState({name})}
                  autoCorrect={false}
                  returnKeyType="next"
                  multiline={true}
                  numberOfLines={4}
              />
          </View>

          <View style={styles.input} >
            <Text style={styles.text}>Quantity</Text>
              <TextInput
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={quantity => this.setState({quantity})}
                  autoCorrect={false}
                  returnKeyType="next"
                  multiline={true}
                  numberOfLines={4}
              />
          </View>

          <View style={styles.input}>
            {this.state.name && this.state.quantity ?
              <Button
                title="Add"
                color="#1e824c"
                onPress={() => this.saveUserDetail()}
              />
              :
              <Button
                disabled={true}
                color="#1e824c"
                title="Add"
              />
            }
          </View>
        </KeyboardAvoidingView>
      </Modal>
    )
  }
}


export default TableModal


const styles = StyleSheet.create({
  modalContainer: {
    marginTop: Dimensions.get('window').height/5,
    width: Dimensions.get('window').width/3,
    height: Dimensions.get('window').height/3,
    padding: 10,
    backgroundColor: 'white',
    borderRadius:20,
    borderWidth: 2,
    borderColor: '#000',
    elevation: 5,
    alignSelf: 'center',
  },

  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  input: {
    flex: 1,
    alignSelf: 'stretch',
    margin: 10,
    padding: 5,
  },

  textInput: {
    marginBottom: 10,
    padding: 10,
    color: "#fff",
    borderWidth: 2,
    borderColor: '#78909C',
    color: 'black'
  },
})
