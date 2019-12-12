import React, {Component, Fragment} from 'react'

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';

import SQLite from "react-native-sqlite-2";


class HomeScreen extends Component {
    constructor(props) {
      super(props)

      const db = SQLite.openDatabase("RestaurantReserve.db", "1.0", "", 1);

      db.transaction(function(txn) {
        txn.executeSql(
          "CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30), quantity INTEGER)",
          []
        );

        txn.executeSql(
          "CREATE TABLE IF NOT EXISTS Tables(table_id INTEGER PRIMARY KEY NOT NULL, tablenumber VARCHAR(5), user_id INTEGER)",
          []
        );

        txn.executeSql(
          "CREATE TABLE IF NOT EXISTS Tokens(token_id INTEGER PRIMARY KEY NOT NULL, token VARCHAR(30), user_id INTEGER, table_id INTEGER)",
          []
        );

        txn.executeSql("SELECT * FROM `users`", [], function(tx, res) {
          for (let i = 0; i < res.rows.length; ++i) {
            console.log("item:", res.rows.item(i));
          }
        });

      })

      this.state = {
        modalVisible: false,
        quantity: '',
        userName: '',
      }

    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }


    saveUserDetail() {
      const db = SQLite.openDatabase("RestaurantReserve.db", "1.0", "", 1);

      db.transaction(function(txn) {
        txn.executeSql("INSERT INTO Users (name) VALUES (:name)", ["raj"]);
        txn.executeSql("SELECT * FROM `users`", [], function(tx, res) {
          for (let i = 0; i < res.rows.length; ++i) {
            console.log("item:", res.rows.item(i));
          }
        });
      });

    }


    render() {
      console.log("Hi there how are you mate...");
      return (
        <Fragment>
            <View style={styles.container}>

              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.modalContainer}>
                  <View style={styles.input} >
                    <Text style={styles.text}>Name</Text>
                      <TextInput
                          style={styles.textInput}
                          autoCapitalize="none"
                          onChangeText={quantity => this.setState({quantity})}
                          autoCorrect={false}
                          keyboardType="email-address"
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
                          onChangeText={userName => this.setState({userName})}
                          autoCorrect={false}
                          keyboardType="email-address"
                          returnKeyType="next"
                          multiline={true}
                          numberOfLines={4}
                      />
                  </View>

                  <View style={styles.input}>
                    <TouchableHighlight
                      style={styles.addUser}
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}>
                      <Text style={styles.text}>Add</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>

              <View style={styles.userPanel}>
                <ScrollView>
                  <TouchableHighlight style={styles.user}>
                    <Text style={styles.text}>User One</Text>
                  </TouchableHighlight>

                  <TouchableHighlight style={styles.user}>
                    <Text style={styles.text}>User Two</Text>
                  </TouchableHighlight>

                  <TouchableHighlight style={styles.user}>
                    <Text>User Three</Text>
                  </TouchableHighlight>

                  <TouchableHighlight style={styles.user}>
                    <Text>User Four</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    style={styles.addUser}
                    onPress={() => {
                      this.setModalVisible(true);
                    }}>
                    <Text>Add +</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    style={styles.addUser}
                    onPress={() => {
                      this.saveUserDetail();
                    }}>
                    <Text>Press Me</Text>
                  </TouchableHighlight>

                </ScrollView>
              </View>

              <View style={styles.tablePanel}>
                <View style={styles.singleTableRow}>
                  <View style={styles.table}>
                    <Text style={styles.text}>Table 1A</Text>
                  </View>

                  <View style={styles.table}>
                    <Text style={styles.text}>Table 1B</Text>
                  </View>

                  <View style={styles.table}>
                    <Text>Table 1C</Text>
                  </View>
                </View>

                <View style={styles.singleTableRow}>
                  <View style={styles.table}>
                    <Text>Table 2A</Text>
                  </View>

                  <View style={styles.table}>
                    <Text>Table 2B</Text>
                  </View>

                  <View style={styles.table}>
                    <Text>Table 2C</Text>
                  </View>
                </View>

                <View style={styles.singleTableRow}>
                  <View style={styles.table}>
                    <Text>Table 3A</Text>
                  </View>

                  <View style={styles.table}>
                    <Text>Table 3B</Text>
                  </View>

                  <View style={styles.table}>
                    <Text>Table 3C</Text>
                  </View>
                </View>

              </View>

            </View>

        </Fragment>
      )
    }
}

export default HomeScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  userPanel: {
    flex: 1,
    backgroundColor: 'green',
  },

  tablePanel : {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  user: {
    padding: 10,
    margin: 10,
    backgroundColor: "orange",
    elevation: 5,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
  },

  addUser: {
    padding: 10,
    margin: 10,
    backgroundColor: "red",
    elevation: 5,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
  },

  table: {
    padding: 50,
    margin: 20,
    backgroundColor: "orange",
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
  },

  singleTableRow: {
    flex: 1,
  },

  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  modalContainer: {
    flex: 1,
    marginHorizontal: 350,
    marginVertical: 250,
    padding: 20,
    backgroundColor: 'white',
    borderRadius:20,
    borderWidth: 2,
    borderColor: '#000',
    elevation: 10,
  },

  input: {
    flex: 1,
    alignSelf: 'stretch',
    margin: 10,
    padding: 10,
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
