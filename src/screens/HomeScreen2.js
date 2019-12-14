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


// Main Screen with List of Users and Table wher main draging and dropping is done
// User create modal and table create modal will be popup in this screen
class HomeScreen extends Component {
    constructor(props) {
      super(props)

      const db = SQLite.openDatabase("RestaurantReservedb.db", "1.0", "", 1);

      var allTables = []
      db.transaction(function(txn) {
        // txn.executeSql('DROP TABLE IF EXISTS Users', []);
        // txn.executeSql('DROP TABLE IF EXISTS Tables', []);

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
        pan_x: '',
        pan_y: '',
        tableCoordinates: [],
        userPanelLen: '',
      }
    }

    componentDidMount(){
      this.readTableandUser()
      console.info('Dimensions: ', Dimensions.get('window'));
    }

    // Reads Users and Tables from Databse and update the state
    readTableandUser = () => {

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

    // Change the state of User Modal when this function is executed: true to false and viceversa
    setUserModalVisible = () => {
      this.setState({userModalVisible: !this.state.userModalVisible})
    }

    // Change the state of Table Modal when this function is executed: true to false and viceversa
    setTableModalVisible = () => {
      this.setState({tableModalVisible: !this.state.tableModalVisible})
    }


    // Gets Table component Coordinates and Width/Height
    find_table_dimesions = (layout) => {
      const {x, y, width, height} = layout;
      var coordinates = {'x1': x, 'y1': y, 'x2': x+width, 'y2': y+height }
      this.state.tableCoordinates.push(coordinates)
      // console.log('coordinates: ', coordinates);
    }

    // Gets Gesture details from panResponder when user item is released
    get_user_coordinates = (gesture) => {
      mX = gesture.moveX
      mY = gesture.moveY
      const tableCoordinates = this.state.tableCoordinates

      tableCoordinates.map((coord, index) => {
        if ((mX > coord.x1) && (mX < coord.x2) && (mY > coord.y1) && (mY < coord.y2)) {
          console.log('yes this is right location...')
          return true
        } else {
          console.log('Sorry Wrong Location...');
          return false
        }
      })

    }

    // Get Width of the UserPanel View
    find_userpanel_len = (layout) => {
      console.log('Layout: ', layout);

      const {x, y, width, height} = layout;
      this.setState({'userPanelLen': width})
      console.log('width: ', width);
    }

    render() {
      const allUsers = this.state.allUsers
      const allTables = this.state.allTables

      // console.log('allTables: ', allTables);
      // console.log('allUsers: ', allUsers);

      return (
        <Fragment>
            <View style={styles.container}>
              <View style={styles.tablePanel} onLayout={(event) => { this.find_userpanel_len(event.nativeEvent.layout) }}>
                {
                  this.state.userModalVisible ?
                  <UserModal
                    visible={this.state.userModalVisible}
                    readTableandUser = {this.readTableandUser}
                    userModalVisible={this.setUserModalVisible}/>
                  :
                  null
                }

                {
                  this.state.tableModalVisible ?
                  <TableModal
                    visible={this.state.tableModalVisible}
                    readTableandUser = {this.readTableandUser}
                    tableModalVisible={this.setTableModalVisible}/>
                  :
                  null
                }
                {
                  allTables.map((table, index) => (
                    <Table
                      find_dimesions = {this.find_table_dimesions}
                      key = {table.table_id}
                      tableNumber={table.tablenumber}
                    />
                ))}
              </View>

              <View style={styles.userPanel} onLayout={(event) => { this.find_userpanel_len(event.nativeEvent.layout) }}>
                {
                  allUsers.map((user, index) => (
                    <User
                      tableCoordinates = {this.state.tableCoordinates}
                      get_user_coordinates = {this.get_user_coordinates}
                      key = {index}
                      name={user.name} />
                  ))}

                <TouchableHighlight
                  style={styles.addUser}
                  onPress={() => {this.setState({'userModalVisible': !this.state.userModalVisible})}}>
                    <Text style={styles.text}>Add User +</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.addUser}
                  onPress={() => this.setState({'tableModalVisible': !this.state.tableModalVisible})}>
                    <Text style={styles.text}>Add Table +</Text>
                </TouchableHighlight>
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
  },

  userPanel: {
    flex: 1,
    backgroundColor: '#DFDFDF',
    // alignSelf: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },

  tablePanel: {
    flex: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'center',
    // backgroundColor: '#AFAFAF',
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

  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },

})
