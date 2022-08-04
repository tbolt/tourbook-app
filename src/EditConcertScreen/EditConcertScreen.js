'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Edit Concert Screen
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
  ActivityIndicatorIOS,
  Text,
  Slider,
  ScrollView,
  TextInput,
  View,
  TouchableHighlight,
  Image,
  DatePickerIOS
} from 'react-native';

import { CONSTANT, COLOR, INPUT_FIELD, IMAGE_PICKER, MONTH_NAMES } from "../Utils/Constants";
import styles from "./styles";

let Icon = require('react-native-vector-icons/FontAwesome');
let cameraIcon = (<Icon name="camera" size={30} color="#900" />);
let ticketIcon = (<Icon name="rocket" size={30} color="#900" />);

const EditConcertScreen = (props: Object) => {
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

  console.log("PROPS LIKE ME", props);

  let artistData = data.artist;
  let dateData = data.date;
  let showNotes = data.showNotes;
  let venueData = data.venue;
  let locationData = data.location;
  let concertRating = data.concertRating;
  let concertRatingSlider = data.concertRatingSlider;
  let isCameraIconShown = data.isCameraIconShown;
  let isTicketIconShown = data.isTicketIconShown;
  let isSpinning = data.isSpinning;

  let concertPhoto = (isCameraIconShown)? () => { 
    EditConcertScreen.renderConcertIcon(onConcertIconPress);
  } : () => { 
    EditConcertScreen.renderConcertPhoto(concertPhotoUri, onConcertPhotoPress);
  };

  let ticketIconPhoto = (isTicketIconShown)? () => { 
    EditConcertScreen.renderTicketPhoto(onTicketPhotoPress) }
  : () => {
    EditConcertScreen.renderTicketIcon(ticketPhotoUri, onTicketIconPress);
  };

  let artist = EditConcertScreen.renderArtist(artistData, onArtistTextChange);
  let venue = EditConcertScreen.renderVenue(venueData, onVenueTextChange);
  let location = EditConcertScreen.renderLocation(locationData, onLocationTextChange);

  let date = EditConcertScreen.renderDateInputField(dateData, onDatePress,
    onDateFocus, onDateEndEditing);
  let datePicker = EditConcertScreen.renderDatePicker(dateData, onDateChange);
  let ratings = EditConcertScreen.renderRatingInputField(concertRatingSlider,
    concertRating, onRatingSliderValueChange);
  let notes = EditConcertScreen.renderNotesInputField(showNotes, 
    onNotesTextChange);
  let spinner = EditConcertScreen.renderSpinner();

  return (
    <ScrollView 
      //ref='scrollView' 
      style={styles.scrollContainer}>
      <View style={styles.container}>
        {spinner}
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

EditConcertScreen.renderConcertIcon = (onPress: Function) => {
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

EditConcertScreen.renderConcertPhoto = (concertPhoto: Object, onPress: Function) => {
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

EditConcertScreen.renderTicketPhoto = (onPress: Function) => {
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

EditConcertScreen.renderTicketIcon = (ticketPhoto: Object, onPress: Function) => {
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

EditConcertScreen.renderArtist = (data: Object, onTextChange: Function) => {
  return EditConcertScreen.renderInputField(true, styles.artistInput,
    data, INPUT_FIELD.ARTIST, onTextChange);
}

EditConcertScreen.renderVenue = (data: Object, onTextChange: Function) => {
  return  EditConcertScreen.renderInputField(false, styles.venueInput,
    data, INPUT_FIELD.VENUE, onTextChange);
}

EditConcertScreen.renderLocation = (data: Object, onTextChange: Function) => {
  return EditConcertScreen.renderInputField(false, styles.locationInput, 
    data, INPUT_FIELD.LOCATION, onTextChange);
}

EditConcertScreen.renderNotesInputField = (notes: String, onChange: Function) => {
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

EditConcertScreen.renderRatingInputField = (ratingSlider, rating, onValueChange) => {
  let ratingValue = <Text style={styles.sliderInputText}>{rating}</Text>
  return (
    <View style={styles.textInputFields}>
      <Text style={styles.ratingInput}>Rating{ratingValue}</Text>
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

EditConcertScreen.renderDatePicker = (dateValue: Object, onChange: Function) => {
  return (
    <View>
      <DatePickerIOS
        date={dateValue}
        mode="date"
        onDateChange={onChange} />
    </View>
  );  
}

EditConcertScreen.renderDateInputField = (dateValue: Object, onPress: Function,
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

EditConcertScreen.renderInputField = (autoFocus, style, value, placeholder, onChange) => {
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


EditConcertScreen.renderSpinner = () => {
  return 
    <ActivityIndicatorIOS
      animating={true}
      style={[styles.spinner]}
      size="large"/>
}

export default EditConcertScreen;
