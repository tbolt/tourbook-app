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
  *   
  *   03/05/2016
  *
*/}

import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipe-out';
import styles from "./styles";

const ConcertItem = (props: Object) => { 
  const {data, swipeoutButtons, onConcertPress, onPhotoPress} = props;
  let rating = data.rating;
  let artist = data.artist;
  let concertPhoto = ConcertItem.renderConcertPhoto(data, onPhotoPress);
  let concertDetails = ConcertItem.renderConcertDetails(data);
  return (
    // Swipeout component
    <Swipeout 
      autoClose={true} 
      right={swipeoutButtons} 
      backgroundColor={'#333333'} >
      <TouchableHighlight 
        onPress={() => {onConcertPress(artist)}}
        underlayColor='#333333' >
        <View style={styles.concertRowContainer}>
          {concertPhoto}
          {concertDetails}
          <Text style={styles.concertRating}>{rating}</Text>
        </View>
      </TouchableHighlight>
      <View style={styles.separator}/>
    </Swipeout>
  );
}

ConcertItem.renderConcertPhoto = (data: Object, onPress: Function) => {
  let concertPhoto = data.concertPhoto;
  return (concertPhoto)?
    <Image style={styles.concertThumbnail} source={{ uri: concertPhoto }} />
    : ConcertItem.renderDefaultConcertIcon(onPress);
}

ConcertItem.renderDefaultConcertIcon = (onPress: Function) => {
  return (
    <TouchableHighlight 
      style={styles.buttonCamera}
      underlayColor='transparent'
      onPress={onPress}>
      <Icon name="camera" style={styles.iconButtons} size={50} color="#808080" />
    </TouchableHighlight>
  );
}

ConcertItem.renderConcertDetails = (data: Object) => {
  let artist = data.artist;
  let venue = data.venue;
  let location = data.location;
  let date = data.date.toString();
  return (
    <View style={styles.concertTextContainer}>
      <Text style={styles.concertTextArtist} numberOfLines={1}>{artist}</Text>
      <Text style={styles.concertTextVenue} numberOfLines={1}>{venue}</Text>
      <Text style={styles.concertTextLocationAndDate} numberOfLines={1}>{location} {date}</Text>
    </View>
  );
}

export default ConcertItem;
