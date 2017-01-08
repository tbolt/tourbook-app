'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Settings Page
  *
  *   Tourbook is an app to log and track shows you have
  *   attended. You can add pictures, notes, and more details.
  *   You can also rate shows and share them to social networks.
  *
  *   Tyler Bolchoz
  *   03/05/2016
  *
*/}

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  SegmentedControlIOS,
  Image,
  ListView
} from 'react-native';

import ConcertDatabase from './Database';


let styles = StyleSheet.create({
container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    backgroundColor: '#333'
},
tempText: {
    color: '#000',
    fontSize: 100
},
listRow: {
    paddingBottom: 40
},
sortText: {
  color: '#ffffff',
  fontSize: 15
},
sortContainer: {
  paddingTop: 10,
  paddingBottom: 30
},
clearDatabaseText: {
  color: '#ffffff',
  fontSize: 15,
  margin: 10,
  backgroundColor: '#000'
}
});

class SettingsPage extends Component {

clearDatabase() {
   ConcertDatabase.write(() => {
      let all = ConcertDatabase.objects('Concert');
      ConcertDatabase.delete(all);
    });
}

constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        dataSource: ds.cloneWithRows(['Export', 'Setting 2'])
    };
}

render() {
    console.log('SettingsPage.render');
    return (
    <View style={styles.container}>
    <Text style={styles.sortText}>Sort</Text>
    <View style={styles.sortContainer}>
      <SegmentedControlIOS
        tintColor={'#fff'}
        values={['Rating', 'Artist', 'Venue']}
        selectedIndex={this.state.selectedIndex}
        onChange={(event) => {
          this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
        }}
      />
      <TouchableHighlight onPress={this.clearDatabase}>
        <Text style={styles.clearDatabaseText}>Clear Database</Text>
      </TouchableHighlight>
    </View>

    <ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData) => <Text style={styles.listRow} >{rowData}</Text>} />
    </View>
    );
  }
}

module.exports = SettingsPage;
