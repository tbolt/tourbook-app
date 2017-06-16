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
  findNodeHandle
} from 'react-native';

import Util from "../Utils/Util";
import { IMAGE_PICKER, MONTH_NAMES } from "../Utils/Constants";
import styles from "./styles";
import AddConcertScreen from "./AddConcertScreen";
import DatabaseManager from "../Utils/DatabaseManager";

class AddConcertScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      transparent: true,
      isCameraIconVisible: true,
      isConcertPhotoVisible: false,
      isTicketIconVisible: true,
      isTicketPhotoVisible: false,
      isDatePickerVisible: false,
      isActivitySpinnerVisible: false,
      artist: '',
      venue: '',
      location: '',
      showNotes: '',
      concertPhoto: null,
      ticketPhoto: null,
      concertRating: 50,
      concertRatingSlider: 50,
      date: new Date(),
      formattedDate: '',
      timeZoneOffsetInHours: props.timeZoneOffsetInHours,
    };

    this.onArtistTextChange = this.onArtistTextChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onLocationTextChange = this.onLocationTextChange.bind(this);
    this.onRatingSliderValueChange = this.onRatingSliderValueChange.bind(this);
    this.onShowDateModal = this.onShowDateModal.bind(this);
    this.onNotesTextChange = this.onNotesTextChange.bind(this);
    this.onVenueTextChange = this.onVenueTextChange.bind(this);
    this.saveConcert = this.saveConcert.bind(this);
    this.showConcertImagePicker = this.showConcertImagePicker.bind(this);
    this.showTicketImagePicker = this.showTicketImagePicker.bind(this);
  }

  componentDidMount() {
    this.props.events.addListener('saveButtonPressed', this.saveConcert);
  }

  saveConcert() {
    //Reminder of what a breakthrough this was...
    //alert('Adding concert ... ');

    this._toggleSpinner();
    let guid = Util.createGuid();
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
        guid: guid,
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
      DatabaseManager.createConcert(concertData, function(result) {
        console.log("DatabaseManager", result);
        console.log("this.props", this.props);      
        if(result.success) {
          this.props.navigator.pop();
        } else {
        }
      }.bind(this));
    }
    return true;
  }
 
  _toggleSpinner() {
    this.setState({isLoading: !this.state.isLoading});
  }

  _toggleTransparent() {
    this.setState({transparent: !this.state.transparent});
  }

  showConcertImagePicker() {
    Util.showImagePicker(IMAGE_PICKER.OPTIONS.CONCERT_PHOTO, function(result) {
      if(result.success) {
        let source = result.data;
        this.onPictureAdd(source, IMAGE_PICKER.CONCERT_PHOTO);
      } else {

      }
    });
  }

  showTicketImagePicker() {
    Util.showImagePicker(IMAGE_PICKER.OPTIONS.TICKET_PHOTO, function(result) {
      if(result.success) {
        let source = result.data;
        this.onPictureAdd(source, IMAGE_PICKER.TICKET_PHOTO);
      } else {

      }
    });
  }

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

  // Scroll a component into view. Just pass the component ref string.
  inputFocused (refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        React.findNodeHandle(this.refs[refName]),
        110, //additionalOffset
        true
      );
    }, 50);
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


  updateSliderRating(val) {
    let sliderValue = val;
    this.setState({concertRatingSlider: sliderValue});
  }

  render() {
    let data = {
      artist: this.state.artist,
      date: this.state.date,
      showNotes: this.state.showNotes,
      venue: this.state.venue,
      location: this.state.location,
      isLoading: this.state.isLoading,
      isCameraIconShown: this.state.isCameraIconShown,
      isTicketIconShown: this.state.isTicketIconShown,
      concertRating: this.state.concertRating,
      concertRatingSlider: this.state.concertRatingSlider
    }

    return (
      <AddConcertScreen
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

export default AddConcertScreenContainer;
