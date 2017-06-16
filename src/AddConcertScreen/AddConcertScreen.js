'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Add Concert Screen
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
  Modal,
  Text,
  ScrollView,
  TextInput,
  Slider,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  DatePickerIOS,
  findNodeHandle
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Util from "../Utils/Util";
import { COLOR, IMAGE_PICKER, INPUT_FIELD, MONTH_NAMES } from "../Utils/Constants";
import styles from "./styles";
import Concert from '../Utils/Concert';
import Loader from '../Loader';
import DatabaseManager from "../Utils/DatabaseManager";

let Platform = require('react-native').Platform;
let ImagePicker = require('react-native-image-picker');

const AddConcertScreen = (props: Object) => {
  const {    
    data, 
    onArtistTextChange,
    onDateChange,
    onDateEndEditing,
    onDateFocus,
    onDatePress,
    onLocationTextChange,
    onRatingSliderValueChange,
    onNotesTextChange,
    onVenueTextChange,
  } = props;

 /* let isLoading = data.isLoading;
  if(isLoading) {
    let spinner = AddConcertScreen.renderSpinner();
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Loader/>
        </View>
      </ScrollView>
    );
  } else { 

  }*/
  
  let artistData = data.artist;
  let dateData = data.date;
  let showNotes = data.showNotes;
  let venueData = data.venue;
  let locationData = data.location;
  let concertRating = data.concertRating;
  let concertRatingSlider = data.concertRatingSlider;
  let isCameraIconShown = data.isCameraIconShown;
  let isTicketIconShown = data.isTicketIconShown;
  let concertPhoto = (isCameraIconShown)? () => { 
    AddConcertScreen.renderConcertIcon(onConcertIconPress);
  } : () => { 
    AddConcertScreen.renderConcertPhoto(concertPhotoUri, onConcertPhotoPress);
  };

  let ticketIconPhoto = (isTicketIconShown)? () => { 
    AddConcertScreen.renderTicketPhoto(onTicketPhotoPress) }
  : () => {
    AddConcertScreen.renderTicketIcon(ticketPhotoUri, onTicketIconPress);
  };

  let artist = AddConcertScreen.renderArtist(artistData, onArtistTextChange);
  let venue = AddConcertScreen.renderVenue(venueData, onVenueTextChange);
  let location = AddConcertScreen.renderLocation(locationData, onLocationTextChange);

  let date = AddConcertScreen.renderDateInputField(dateData, onDatePress,
    onDateFocus, onDateEndEditing);
  let datePicker = AddConcertScreen.renderDatePicker(dateData, onDateChange);
  let ratings = AddConcertScreen.renderRatingInputField(concertRatingSlider,
    concertRating, onRatingSliderValueChange);
  let notes = AddConcertScreen.renderNotesInputField(showNotes, 
    onNotesTextChange);
  return (
    <ScrollView 
      style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.photoInputs}>
          {concertPhoto}
          {ticketIconPhoto}
        </View>
        <View style={styles.detailInput}>
          {artist}
          {venue}
          {location}
          {date}
          {datePicker}
          {ratings}
          {notes}          
        </View>
      </View>
    </ScrollView>
  );
   
}

AddConcertScreen.renderConcertIcon = (onPress: Function) => {
  return ( 
    <View style={styles.cameraInput}>
      <TouchableHighlight 
        style={styles.buttonCamera}
        onPress={onPress} 
        underlayColor='#333'>
        <Icon name="camera" style={styles.iconButtons} size={60} color="#808080" />
      </TouchableHighlight>
    </View>
  );
  // this.showConcertImagePicker
}

AddConcertScreen.renderConcertPhoto = (concertPhoto: Object, onPress: Function) => {
  if(!concertPhoto) {
    return <View />
  }
  return (
    <View style={styles.cameraInput}>
      <TouchableHighlight 
        style={styles.buttonCamera}
        onPress={onPress} 
        underlayColor='#333'>
        <Image style={styles.uploadShowPicture} source={concertPhoto} />
      </TouchableHighlight>
    </View>
  );
  // this.showConcertImagePicker
}

AddConcertScreen.renderTicketPhoto = (onPress: Function) => {
  return (
    <View style={styles.ticketInput}>
      <TouchableHighlight style={styles.buttonTicket}
        onPress={onPress} 
        underlayColor='#333'>
        <Icon name="ticket" style={styles.iconButtons} size={60} color="#808080" />
      </TouchableHighlight>
    </View>
  );
  // this.showTicketImagePicker
}

AddConcertScreen.renderTicketIcon = (ticketPhoto: Object, onPress: Function) => {
  if(!ticketPhoto) {
    return <View />
  }
  return (
    <View style={styles.ticketInput}>
      <TouchableHighlight 
        style={styles.buttonCamera}
        onPress={onPress}
        underlayColor='#333'>
        <Image style={styles.uploadShowPicture} source={ticketPhoto} />
      </TouchableHighlight>
    </View>
  );
  //this.state.ticketPhoto
}

AddConcertScreen.renderArtist = (data: Object, onTextChange: Function) => {
  return AddConcertScreen.renderInputField(true, styles.artistInput,
    data, INPUT_FIELD.ARTIST, onTextChange);
}

AddConcertScreen.renderVenue = (data: Object, onTextChange: Function) => {
  return  AddConcertScreen.renderInputField(false, styles.venueInput,
    data, INPUT_FIELD.VENUE, onTextChange);
}

AddConcertScreen.renderLocation = (data: Object, onTextChange: Function) => {
  return AddConcertScreen.renderInputField(false, styles.locationInput, 
    data, INPUT_FIELD.LOCATION, onTextChange);
}

AddConcertScreen.renderNotesInputField = (notes: String, onChange: Function) => {
  return (
    <View style={styles.lastTextInputField}>
      <TextInput
        autoFocus={false}
        editable={true}
        maxLength={40}
        style={styles.notesInput}
        multiline={true}
        value={notes}
        maxLength={400}
        placeholderTextColor={'#808080'}
        onChange={onChange}
        placeholder='Notes' />
    </View>
  );
}

AddConcertScreen.renderRatingInputField = (ratingSlider, rating, onValueChange) => {
  let ratingValue = <Text style={styles.sliderInputText}>{rating}</Text>
  return (
    <View style={styles.textInputFields}>
      <Text style={styles.ratingInput}>Rating {ratingValue}</Text>
      <Slider 
        step={1} 
        style={styles.sliderInput}
        maximumValue={100} 
        minimumTrackTintColor={'#50E3C2'}
        minimumValue={0} 
        onValueChange={(value)=>{onValueChange(value)}}
        value={ratingSlider}/>
    </View>
  );
  // 
}

AddConcertScreen.renderDatePicker = (dateValue: Object, onChange: Function) => {
  return (
    <View>
      <DatePickerIOS
        date={dateValue}
        mode="date"
        onDateChange={onChange} />
    </View>
  );  
}

AddConcertScreen.renderDateInputField = (dateValue: Object, onPress: Function,
  onFocus: Function, onEndEditing: Function) => {
  return (
    <View style={styles.dateInputField}>
      <TouchableHighlight onPress={onPress}> 
        <TextInput
          editable={false}
          style={styles.dateInput}
          placeholderTextColor={'#808080'}
          value={dateValue.toDateString()}
          onFocus={onFocus}
          onEndEditing={onEndEditing}
          placeholder={'Date'}/>
      </TouchableHighlight>
    </View>
  );
}

AddConcertScreen.renderInputField = (autoFocus, style, value, placeholder, onChange) => {
  return (
    <View style={styles.textInputFields}>
      <TextInput
        autoFocus={autoFocus}
        style={style}
        placeholderTextColor={'#808080'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}/>
    </View> 
  ); 
}

AddConcertScreen.renderSpinner = () => {
  return (
    <ActivityIndicatorIOS
      animating={true}
      style={[styles.spinner]}
      size="large"/>
  );
}

export default AddConcertScreen;