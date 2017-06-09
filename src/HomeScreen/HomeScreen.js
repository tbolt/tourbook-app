'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Home Screen
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
  StatusBar,
  Text,
  View,
  ActivityIndicatorIOS,
  Image,
} from 'react-native';
import styles from "./styles";

const HomeScreen = (props: Object) => { 
  const {concerts, hasConcerts, isLoading} = props;
  let spinner = HomeScreen.renderSpinner(isLoading);
  let placeholder = HomeScreen.renderPlaceholder(hasConcerts);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {placeholder}
      {concerts}
      {spinner}
    </View>
  );
}

HomeScreen.renderSpinner = (isLoading: Boolean) => {
  return (isLoading)?<ActivityIndicatorIOS hidden='true' size='large'/>:<View/>;
}

HomeScreen.renderPlaceholder = (hasConcerts: Boolean) => {
  return (hasConcerts)?<View/>: 
    <View style={styles.placeholderTextWrapper}>
      <Image 
        style={styles.placeholderMusicNote} 
        resizeMode={Image.resizeMode.contain}
        source={require('../../images/musicnote.png')}/>
      <Text style={styles.placeholderText}>No Concerts Added Yet</Text>
    </View>;
}

export default HomeScreen;
