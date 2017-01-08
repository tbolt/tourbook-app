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

import {ListView} from 'realm/react-native';

let Icon = require('react-native-vector-icons/FontAwesome');

let music = (<Icon name="music" size={30} color="#900" />);

let EventEmitter = require('wolfy87-eventemitter');

let rightButtonHandler = new EventEmitter();

let SearchResults = require('./SearchResults');
let ConcertDetailView = require('./ConcertDetailView');
let EditConcertPage = require('./EditConcertPage');

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 15,
    marginTop: 0,
    backgroundColor: '#333'
  },
  placeholderTextWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    height: 300
  },
  placeholderText: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 20,
    color: '#656565'
  },
  placeholderMusicNote: {
    width: 200,
    height: 100
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
    <View style={styles.placeholderTextWrapper}>
        <Image style={styles.placeholderMusicNote} resizeMode={Image.resizeMode.contain} source={require('image!musicnote')} />
        <Text style={styles.placeholderText}>
          Favorites Page Coming Soon
        </Text>
      </View>
    </View>
  );
}
}

module.exports = FavoritesPage;
