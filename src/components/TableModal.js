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
      tableNumber: '',
    }
  }

  // Converts True to False and ViceVersa for State of Modal Visibility
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
    this.props.tableModalVisible()
  }

  // Saves Table Number on database from Table Modal
  saveTableDetail() {
    const {tableNumber, modalVisible} = this.state
    const db = SQLite.openDatabase("RestaurantReservedb.db", "1.0", "", 1);

    db.transaction(function(txn) {
      txn.executeSql("INSERT INTO Tables (tablenumber) VALUES (:tablenumber)", [tableNumber]);
      txn.executeSql("SELECT * FROM `tables`", [], (tx, tables) => {
        console.log('allTables', tables.rows._array);
        // this.setState({'allTables': tables.rows._array})
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
            <Text style={styles.text}>Table Number</Text>
              <TextInput
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={tableNumber => this.setState({tableNumber})}
                  placeholder="Eg. A1"
                  autoCorrect={false}
                  returnKeyType="next"
                  multiline={true}
                  numberOfLines={4}
              />
          </View>

          <View style={[styles.input]}>
            <View style={styles.buttonsContainer}>
              <View style={[styles.button, styles.marginRight]}>
                <Button
                  color="#C3302D"
                  title="Close"
                  onPress={() => this.setModalVisible(!this.state.modalVisible)}
                />
              </View>
              <View style={styles.button}>
                {this.state.tableNumber ?
                  <Button
                    title="Add"
                    color="#3F7242"
                    onPress={() => this.saveTableDetail()}
                  />
                  :
                  <Button
                    disabled={true}
                    color="#3F7242"
                    title="Add"
                  />
                }
              </View>
            </View>
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
    height: Dimensions.get('window').height/4,
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

  buttonsContainer: {
    flexDirection: 'row',
  },

  button: {
    flex: 1,
  },

  marginRight: {
    marginRight: 10,
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
