'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Favorites Screen
  *
  *   Tourbook is an app to log and track shows you have
  *   attended. You can add pictures, notes, and more details.
  *   You can also rate shows and share them to social networks.
  *
  *   
  *   03/05/2016
  *
*/}

import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
} from 'react-native';

import styles from "./styles";
const FavoritesScreen = (props: Object) => {
  const { data, isLoading } = props;
  if(isLoading) {
    return <ActivityIndicatorIOS hidden='true' size='large'/>
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.placeholderText}>Favorites Screen Coming Soon</Text>
      </View>
    );
  }
}

export default FavoritesScreen;
