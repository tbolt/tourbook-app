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
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  RefreshControl
} from 'react-native';

import styles from "./styles";
import ConcertDatabase from '../Utils/Database';

let Icon = require('react-native-vector-icons/FontAwesome');
let music = (<Icon name="music" size={30} color="#900" />);

class FavoritesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {}
  componentWillReceiveProps() {}

  render() {

    //console.log(this.props)
    //console.log(this.props.navigator);

    let spinner = (this.state.isLoading)? 
    ( <ActivityIndicatorIOS hidden='true' size='large'/> ) : ( <View/>);
    return (
      <View style={styles.container}>
        <Text style={styles.placeholderText}>Favorites Page Coming Soon</Text>
      </View>
    );
  }
}

module.exports = FavoritesPage;
