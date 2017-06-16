'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Main View
  *
  *   Tourbook is an app to log and track shows you have
  *   attended. You can add pictures, notes, and more details.
  *   You can also rate shows and share them to social networks.
  *
  *   Tyler Bolchoz
  *   Carrington Dennis
  *   01/10/2017
  *
*/}

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import TabBarNavigation from './src/TabBarNavigation';
export default class tourbooknew extends Component {
  state = {} 
  render() {
    return (
      <TabBarNavigation />     
    );
  }
}

AppRegistry.registerComponent('tourbooknew', () => tourbooknew);