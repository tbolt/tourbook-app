'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Concert Detail Screen
  *
  *   Tourbook is an app to log and track shows you have
  *   attended. You can add pictures, notes, and more details.
  *   You can also rate shows and share them to social networks.
  *
  *   Tyler Bolchoz
  *   01/09/2017
  *
*/}

import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  TouchableHighlight,
  Modal
} from 'react-native';

import { BlurView } from 'react-native-blur';
import Lightbox from 'react-native-lightbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "./styles";

const ConcertDetailScreen = (props: Object) => { 
  const { data } = props;
  let artist = data.artist;
  let concertPhoto = data.concertPhoto;
  let date = data.date;
  let location = data.location;
  let rating = data.rating;
  let showNotes = data.showNotes;
  let ticketPhoto = data.ticketPhoto;
  let venue = data.venue;

  let concertImage = ConcertDetailScreen.renderConcertImage(artist, concertPhoto);
  let concertTicket = ConcertDetailScreen.renderConcertTicket(ticketPhoto);
  let notes = ConcertDetailScreen.renderConcertNotes(showNotes);

  return (
    <View style={styles.concertDetailContainer}>
      {concertImage}
      <View style={styles.concertRatingAndTicketWrapper}>
        <View style={styles.concertDetailRatingWrapper}>
          <Text style={styles.concertDetailRating}>{rating}</Text>
        </View>
        {concertTicket}
      </View>
      <View style={styles.concertDetailsWrapper}>
        <Text style={styles.concertDetailVenue}>{venue}</Text>
        <Text style={styles.concertDetailLocation}>{location}</Text>
        <Text style={styles.concertDetailDate}>{date}</Text>
      </View>
      {notes}
    </View>
  );
}

ConcertDetailScreen.renderConcertImage = (artist: String, concertPhoto: Object) => {
  return (concertPhoto)?
   (<Lightbox>
      <Image style={styles.concertDetailImage} source={{uri: concertPhoto}}>
        <View style={styles.concertDetailBlurWrapper}>
          <BlurView blurType="light" style={styles.concertDetailBlurBox}>
            <Text style={styles.concertDetailArtist}>{artist}</Text>
          </BlurView>
        </View>
      </Image>
    </Lightbox>) : ConcertDetailScreen.renderDefaultConcertIcon(()=>{});
}

ConcertDetailScreen.renderConcertTicket = (ticketPhoto: Object) => {
  return (ticketPhoto)?
   (<Lightbox>
      <Image style={styles.concertDetailTicketImage} source={{uri: ticketPhoto}}/>
    </Lightbox>): ConcertDetailScreen.renderDefaultTicketIcon(()=>{});
}

ConcertDetailScreen.renderConcertNotes = (showNotes: String) => {
  return (
    <View style={styles.concertNotesWrapper}>
      <Text style={styles.concertNotesHeaderText}>Notes</Text>
      <Text style={styles.concertDetailShowNotes}>{showNotes}</Text>
    </View>
  );
}

ConcertDetailScreen.renderDefaultConcertIcon = (onPress: Function) => {
  return (
    <TouchableHighlight 
      style={styles.buttonCamera}
      underlayColor='transparent'
      onPress={onPress}>
      <Icon name="camera" style={styles.iconButtons} size={50} color="#808080" />
    </TouchableHighlight>
  );
}

ConcertDetailScreen.renderDefaultTicketIcon = (onPress: Function) => {
  return (
    <View style={styles.ticketInput}>
      <TouchableHighlight style={styles.buttonTicket}
        onPress={onPress} 
        underlayColor='#333'>
        <Icon name="ticket" style={styles.iconButtons} size={60} color="#808080" />
      </TouchableHighlight>
    </View>
  );
}

export default ConcertDetailScreen;