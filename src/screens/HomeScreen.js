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
  KeyboardAvoidingView,
  Dimensions,
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

      })

      this.state = {
        modalVisible: false,
        name: '',
        quantity: '',
        allUsers: [],
      }
    }

    componentDidMount(){
      const db = SQLite.openDatabase("RestaurantReserve.db", "1.0", "", 1);

      db.transaction((txn) => {
        txn.executeSql("SELECT * FROM `users`", [], (tx, users) => {
          this.setState({'allUsers': users.rows._array})
        });
      });
    }



    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }


    saveUserDetail() {
      const {name, quantity, modalVisible} = this.state
      const db = SQLite.openDatabase("RestaurantReserve.db", "1.0", "", 1);

      db.transaction(function(txn) {
        txn.executeSql("INSERT INTO Users (name) VALUES (:name)", [name]);
      });

      this.setModalVisible(!modalVisible)

    }


    render() {

      const allUsers = this.state.allUsers
      console.log('allUsers', allUsers);
      console.log("Hi there how are you mate...");

      return (
        <Fragment>
            <View style={styles.container}>

              <View style={styles.userPanel}>
                <ScrollView>
                  {
                    allUsers.map((user, index) => (
                      <TouchableHighlight style={styles.user}>
                        <Text style={styles.text}>{user.name}</Text>
                      </TouchableHighlight>
                    ))
                  }

                  <TouchableHighlight
                    style={styles.addUser}
                    onPress={() => {
                      this.setModalVisible(true);
                    }}>
                    <Text>Add +</Text>
                  </TouchableHighlight>

                </ScrollView>
              </View>

              <View style={styles.tablePanel}>

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
                            onChangeText={quantity => this.setState({quantity})}
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
                          this.saveUserDetail();
                        }}>
                        <Text style={styles.text}>Add</Text>
                      </TouchableHighlight>
                    </View>
                  </KeyboardAvoidingView>
                </Modal>

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
    // marginTop: Dimensions.get('window').height/3,
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
