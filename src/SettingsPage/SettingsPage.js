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
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  SegmentedControlIOS,
  Image,
  ListView
} from 'react-native';

import {CONSTANT, COLOR} from "../Utils/Constants";
import DatabaseManager from '../Utils/DatabaseManager';
import styles from "./styles";

let defaultDataSource = ['Export', 'Setting 2'];
let segmentedControls = ['Rating', 'Artist', 'Venue'];

class SettingsPage extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(defaultDataSource)
    };
  }

  clearDatabase = () => {
    DatabaseManager.clearDatabase(function(result) {
      if(result.success) {

      } else {

      }
    });
  }

  onSegmentedControlChange = () => {
    return (event) => {
      this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
    }
  }

  renderClearDatabaseButton(onPress: Function) {
    let buttonText = "Clear Database";
    return (
      <TouchableHighlight onPress={onPress}>
        <Text style={styles.clearDatabaseText}>{buttonText}</Text>
      </TouchableHighlight>
    );
  }

  renderSettingsData = () => {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(data) => <Text style={styles.listRow}>{data}</Text>}/>
    );
  }

  renderSegmentedControl = () => {
    return (
      <SegmentedControlIOS
        tintColor={COLOR.WHITE}
        values={segmentedControls}
        selectedIndex={this.state.selectedIndex}
        onChange={this.onSegmentedControlChange}/>
    ); 
  }

  render() {
    let segmentedControl = this.renderSegmentedControl();
    let settingsData = this.renderSettingsData();
    let clearDatabaseButton = this.renderClearDatabaseButton(this.clearDatabase);
    return (
    <View style={styles.container}>
      <Text style={styles.sortText}>Sort</Text>
      <View style={styles.sortContainer}>
        {segmentedControl}
        {clearDatabaseButton}
      </View>
      {settingsData}    
    </View>
    );
  }
}

module.exports = SettingsPage;
