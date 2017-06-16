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
  *   Tyler Bolchoz
  *   03/05/2016
  *
*/} 

import React, { Component } from 'react';
import { COLOR, IMAGE_PICKER, MONTH_NAMES } from "../Utils/Constants";
import Concert from '../Utils/Concert';
import DatabaseManager from "../Utils/DatabaseManager";
import Util from "../Utils/Util";
import EditConcertScreen from "./EditConcertScreen";
import styles from "./styles";
let ImagePickerManager = require('NativeModules').ImagePickerManager;

class EditConcertScreenContainer extends Component {
  constructor(props) {
  super(props);
    this.concert = this.props.concert;
    this.state = {
      spinner: true,
      transparent: true,
      isCameraIconVisible: false,
      isConcertPhotoVisible: true,
      isTicketIconVisible: false,
      isTicketPhotoVisible: true,
      isDatePickerVisible: false,
      isActivitySpinnerVisible: false,
      guid: this.concert.guid,
      artist: this.concert.artist,
      venue: this.concert.venue,
      location: this.concert.location,
      showNotes: this.concert.showNotes,
      concertPhoto: {uri: this.concert.concertPhoto},
      ticketPhoto: {uri: this.concert.ticketPhoto},
      concertRating: this.concert.rating,
      concertRatingSlider: this.concert.rating,
      date: new Date(this.concert.date),
      formattedDate: "",
      timeZoneOffsetInHours: props.timeZoneOffsetInHours,
    };

    console.log("EDIT STATE", this.state);

    this.onArtistTextChange = this.onArtistTextChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onLocationTextChange = this.onLocationTextChange.bind(this);
    this.onRatingSliderValueChange = this.onRatingSliderValueChange.bind(this);
    this.onShowDateModal = this.onShowDateModal.bind(this);
    this.onNotesTextChange = this.onNotesTextChange.bind(this);
    this.onVenueTextChange = this.onVenueTextChange.bind(this);
    this.updateConcert = this.updateConcert.bind(this);
    this.showConcertImagePicker = this.showConcertImagePicker.bind(this);
    this.showTicketImagePicker = this.showTicketImagePicker.bind(this);
  }

  componentDidMount() {
    let events = this.props.events;
    events.addListener('editSaveButtonPressed', this.updateConcert);
  }

  /******************************************************************************
  * Helpers 
  ******************************************************************************/
  updateConcert() {
    //Reminder of what a breakthrough this was...
    alert('Updating concert ... ');
    // Check to see if input fields are empty
    
    let guid = this.state.guid;
    let artist = this.state.artist;
    let formattedDate = this.state.formattedDate;
    let venue = this.state.venue;
    let location = this.state.location;
    let concertRatingSlider = this.state.concertRatingSlider;
    let concertPhoto = this.state.concertPhoto;
    let ticketPhoto = this.state.ticketPhoto;
    let showNotes = this.state.showNotes;
    let validInputFields = (artist == "" &&  venue == "" && location == "" 
      && concertRatingSlider == 0 &&  concertPhoto == null 
      && ticketPhoto == null && showNotes == "");   
    if(validInputFields) {
      alert('Nothing To Save...');
    } else {
      let concertPhotoURI = (concertPhoto && concertPhoto.uri)? concertPhoto.uri:"";
      let ticketPhotoURI = (ticketPhoto && ticketPhoto.uri)? ticketPhoto.uri:"";
      let concertData = {
        name: artist,
        artist: artist,
        venue: venue,
        location: location,
        date: formattedDate,
        rating: concertRatingSlider,
        showNotes: showNotes,
        concertPhoto: concertPhotoURI,
        ticketPhoto: ticketPhotoURI      
      }
      DatabaseManager.updateConcert(guid, concertData, function(result) {
        if(result.success) {
          this.props.navigator.pop();
        } else {

        }
      }.bind(this));
    }
    return true;
  }

  showConcertImagePicker() {
    Util.showImagePicker(IMAGE_PICKER.OPTIONS.CONCERT_PHOTO, function(result) {
      if(result.success) {
        let source = result.data;
        this.onPictureAdd(source, IMAGE_PICKER.CONCERT_PHOTO);
      } else {

      }
    }.bind(this));
  }

  showTicketImagePicker() {
    Util.showImagePicker(IMAGE_PICKER.OPTIONS.TICKET_PHOTO, function(result) {
      if(result.success) {
        let source = result.data;
        this.onPictureAdd(source, IMAGE_PICKER.TICKET_PHOTO);
      } else {

      }
    }.bind(this));
  }

  _toggleSpinner() {
    this.setState({spinner: !this.state.spinner});
  }

  _toggleTransparent() {
    this.setState({transparent: !this.state.transparent});
  }

  /******************************************************************************
  * Actions 
  ******************************************************************************/
  onPictureAdd(image, selector) {
    if(selector === IMAGE_PICKER.CONCERT_PHOTO) {
      this.setState({
        concertPhoto: image,
        isCameraIconVisible: false,
        isConcertPhotoVisible: true
      });
    } else if(selector === IMAGE_PICKER.TICKET_PHOTO) {
      this.setState({
        ticketPhoto: image,
        isTicketIconVisible: false,
        isTicketPhotoVisible: true
      });
    }
  }

  onArtistTextChange(event) {
    console.log('onArtistTextChange');
    this.setState({ artist: event.nativeEvent.text });
    console.log(this.state.artist);
  }

  onDateChange(date) {
    let month = MONTH_NAMES[date.getUTCMonth()];
    let day = date.getUTCDate();
    let year = date.getUTCFullYear();
    let formattedDate = month + " " + day + " " + year;
    this.setState({formattedDate: formattedDate});
    this.setState({date: date});
  }

  onShowDateModal() {
    if(!this.state.isDatePickerVisible) {
      this.setState({isDatePickerVisible: true});
    } else {
      this.setState({isDatePickerVisible: false});
    }
  }   

  onLocationTextChange(event) {
    console.log('onLocationTextChange');
    this.setState({ location: event.nativeEvent.text });
    console.log(this.state.location);
  }

  onRatingSliderValueChange(value) {
    console.log('onRatingSliderValueChange');
    this.setState({concertRatingSlider: value});
    console.log(this.state.concertRatingSlider);
  }

  onNotesTextChange(event) {
    console.log('onNotesTextChange');
    this.setState({ showNotes: event.nativeEvent.text });
    console.log(this.state.showNotes);
  }

  onVenueTextChange(event) {
    console.log('onVenueTextChange');
    this.setState({ venue: event.nativeEvent.text });
    console.log(this.state.venue);
  }

  /******************************************************************************
  * Render 
  ******************************************************************************/
  render() { 
    let data = {
      artist: this.state.artist,
      date: this.state.date,
      showNotes: this.state.showNotes,
      venue: this.state.venue,
      location: this.state.location,
      isSpinning: this.state.spinner,
      isCameraIconShown: this.state.isCameraIconShown,
      isTicketIconShown: this.state.isTicketIconShown,
      concertRating: this.state.concertRating,
      concertRatingSlider: this.state.concertRatingSlider
    }

    return (
      <EditConcertScreen
        data={data} 
        onArtistTextChange={this.onArtistTextChange}
        onDateChange={this.onDateChange}
        onDateEndEditing={this.onShowDateModal}
        onDateFocus={this.onShowDateModal}
        onDatePress={this.onShowDateModal}
        onLocationTextChange={this.onLocationTextChange}
        onRatingSliderValueChange={this.onRatingSliderValueChange}
        onNotesTextChange={this.onNotesTextChange}
        onVenueTextChange={this.onVenueTextChange}
      />
    );
  }
}

export default EditConcertScreenContainer;
