'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Settings Screen
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
  ListView
} from 'react-native';

import {CONSTANT, COLOR} from "../Utils/Constants";
import RealmManager from '../Utils/RealmManager';
import styles from "./styles";
import SettingsScreen from "./SettingsScreen";

class SettingsScreenContainer extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['Export', 'Setting 2'])
    };

    this.clearDatabase = this.clearDatabase.bind(this);
    this.getSegmentedControls = this.getSegmentedControls.bind();
  }

  clearDatabase = () => {
    RealmManager.clearDatabase(function(result) {
      if(result.success) {}
      else {}
    });
  }

  getSegmentedControls = () => {
    return  ['Rating', 'Artist', 'Venue'];
  }

  onSegmentControlChange = () => {
    return (event) => {
      this.setState({
        selectedIndex: event.nativeEvent.selectedSegmentIndex
      });
    }
  }

  render() {
    let data = this.state.dataSource;
    let selectedIndex = this.state.selectedIndex;
    let controls = this.getSegmentedControls();
    return (
      <SettingsScreen
        data={data} 
        selectedIndex={selectedIndex}
        controls={controls}
        onSegmentControlChange={this.onSegmentControlChange} 
        onPressClearDatabase={this.clearDatabase}/>
    );
  }
}

export default SettingsScreenContainer;
