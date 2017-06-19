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
  Text,
  View,
  TouchableHighlight,
  SegmentedControlIOS,
  ListView
} from 'react-native';

import {CONSTANT, COLOR} from "../Utils/Constants";
import RealmManager from '../Utils/RealmManager';
import styles from "./styles";

const SettingsScreen = (props: Object) => {
  const { data, selectedIndex, controls, onSegmentControlChange, onPressClearDatabase} = props;

  console.log("My Props", props);
  let settingsData = SettingsScreen.renderSettingsData(data);
  let clearDatabaseButton = SettingsScreen.renderClearDatabaseButton(onPressClearDatabase);
  let segmentedControl = SettingsScreen.renderSegmentedControl(controls, selectedIndex, onSegmentControlChange);
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

SettingsScreen.renderClearDatabaseButton = (onPress: Function) => {
  let buttonText = "Clear Database";
  return (
    <TouchableHighlight onPress={onPress}>
      <Text style={styles.clearDatabaseText}>{buttonText}</Text>
    </TouchableHighlight>
  );
}

SettingsScreen.renderSettingsData = (data: Object) => {
  return (
    <ListView
      dataSource={data}
      renderRow={(rowData) => <Text style={styles.listRow}>{rowData}</Text>}/>
  );
}

SettingsScreen.renderSegmentedControl = (values: Object, selectedIndex: Number, onChange: Function) => {
  return (
    <SegmentedControlIOS
      tintColor={COLOR.WHITE}
      values={values}
      selectedIndex={selectedIndex}
      onChange={onChange}/>
  ); 
}

export default SettingsScreen;
