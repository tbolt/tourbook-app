'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Favorites Pages
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
  Image,
  RefreshControl
} from 'react-native';

import ConcertDatabase from './Database';

let Icon = require('react-native-vector-icons/FontAwesome');
let music = (<Icon name="music" size={30} color="#900" />);

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholderText: {
    fontSize: 20,
    color: '#656565'
  }
});

class FavoritesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        refreshing: false,
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {

  }

  render() {
    let spinner = this.state.isLoading ?
      ( <ActivityIndicatorIOS
          hidden='true'
          size='large'/> ) :
      ( <View/>);

    return (
      <View style={styles.container}>
          <Text style={styles.placeholderText}>Favorites Page Coming Soon</Text>
      </View>
    );
  }
}

module.exports = FavoritesPage;
