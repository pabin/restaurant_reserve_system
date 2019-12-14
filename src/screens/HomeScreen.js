import React, {Component, Fragment} from 'react'

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';

import SQLite from "react-native-sqlite-2";

import User from '../components/User'
import Table from '../components/Table'
import TableModal from '../components/TableModal'
import UserModal from '../components/UserModal'


class HomeScreen extends Component {
    constructor(props) {
      super(props)

      const db = SQLite.openDatabase("RestaurantReservedb.db", "1.0", "", 1);

      var allTables = []
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

        // txn.executeSql("SELECT * FROM `tables`", [], (tx, tables) => {
        //   allTables = tables.rows._array
        // });

      })

      this.state = {
        userModalVisible: false,
        tableModalVisible: false,
        name: '',
        quantity: '',
        allUsers: [],
        allTables: [],
        showDraggable: true,
        dropAreaValues: null,
      }
    }

    componentDidMount(){
      const db = SQLite.openDatabase("RestaurantReservedb.db", "1.0", "", 1);

      db.transaction((txn) => {
        txn.executeSql("SELECT * FROM `users`", [], (tx, users) => {
          this.setState({'allUsers': users.rows._array})
        });

        txn.executeSql("SELECT * FROM `tables`", [], (tx, tables) => {
          this.setState({'allTables': tables.rows._array})
        });
      });
    }


    render() {
      const allUsers = this.state.allUsers
      const allTables = this.state.allTables

      console.log('Show User Modal: ', this.state.userModalVisible);
      console.log('Show Table Modal: ', this.state.tableModalVisible);

      console.log('allTables: ', allTables);
      console.log('allUsers: ', allUsers);

      return (
        <Fragment>
            <View style={styles.container}>
              <View style={styles.userPanel}>
                  {
                    allUsers.map((user, index) => (
                      <User
                        key = {index}
                        name={user.name} />
                    ))}

                  <TouchableHighlight
                    style={styles.addUser}
                    onPress={() => {
                      this.setState({userModalVisible: !this.state.userModalVisible});
                    }}>
                      <Text style={styles.text}>Add User +</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    style={styles.addUser}
                    onPress={() => {
                      this.setState({tableModalVisible: !this.state.tableModalVisible});
                    }}>
                      <Text style={styles.text}>Add Table +</Text>
                  </TouchableHighlight>

              </View>

              <View style={styles.tablePanel}>
                {
                  this.state.userModalVisible ?
                  <UserModal visible={this.state.userModalVisible}/>
                  :
                  null
                }

                {
                  this.state.tableModalVisible ?
                  <TableModal visible={this.state.tableModalVisible}/>
                  :
                  null
                }

                <ScrollView contentInsetAdjustmentBehavior="automatic">
                  <View style={styles.tablecontainer}>
                    <View style={styles.singleTableRow}>

                      {
                        allTables.map((table, index) => (
                          <Table
                            key = {index}
                            tableNumber={table.tablenumber}
                          />
                      ))}

                    </View>
                  </View>
                </ScrollView>
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
    backgroundColor: '#DFDFDF',
  },

  tablePanel : {
    flex: 5,
  },

  addUser: {
    padding: 10,
    margin: 10,
    marginHorizontal: 20,
    backgroundColor: "#34AFFF",
    elevation: 5,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
  },

  tablecontainer: {
    flexDirection: 'row',
  },

  singleTableRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:'center',
    justifyContent:'center',
  },

  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },

})
