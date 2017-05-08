'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Add Concert Page
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
import ConcertDatabase from '../Utils/Database';
import Util from "../Utils/Util";
import { COLOR, IMAGE_PICKER, MONTH_NAMES } from "../Utils/Constants";
import styles from "./styles";
import DatabaseManager from "../Utils/DatabaseManager";

let Platform = require('react-native').Platform;
let ImagePicker = require('react-native-image-picker');

class AddConcertPage extends Component {
  componentDidMount() {
    this.props.events.addListener('saveButtonPressed', this.saveConcert.bind(this));
  }

  constructor(props) {
    super(props);
    this.showConcertImagePicker = this.showConcertImagePicker.bind(this);
    this.showTicketImagePicker = this.showTicketImagePicker.bind(this);
    this.state = {
        spinner: true,
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
        concertRating: 0,
        concertRatingSlider: 50,
        date: new Date("Mar 25 2015"),
        formattedDate: '',
        timeZoneOffsetInHours: props.timeZoneOffsetInHours,
    };
  }
  saveConcert() {
    //Reminder of what a breakthrough this was...
    alert('Adding concert ... ');

    // Check to see if input fields are empty
    if(this.state.artist == '' && this.state.venue == '' && this.state.location == '' && this.state.concertRatingSlider == 0 && this.state.concertPhoto == null && this.state.ticketPhoto == null && this.state.showNotes == ''){
      alert('Nothing To Save...');
    } else {

      let concertPhoto = this.state.concertPhoto;
      let ticketPhoto = this.state.ticketPhoto;
      let concertPhotoURI = (concertPhoto && concertPhoto.uri)? concertPhoto.uri : "";
      let ticketPhotoURI = (ticketPhoto && ticketPhoto.uri)? ticketPhoto.uri : "";

      let concertData = {
        guid: Util.createGuid(), // primary key
        name: this.state.artist,
        artist: this.state.artist,
        venue: this.state.venue,
        location: this.state.location,
        date: this.state.formattedDate,
        rating: this.state.concertRatingSlider,
        showNotes: this.state.showNotes,
        concertPhoto: concertPhotoURI,
        ticketPhoto: ticketPhotoURI      
      }

      DatabaseManager.createConcert(concertData, function(result) {
        if(result.success) {
        
        } else {

        }
      });
    }
    return true;
  }

  setDateModalVisible() {
    if(!this.state.isDatePickerVisible){
      this.setState({isDatePickerVisible: true});
    } else {
      this.setState({isDatePickerVisible: false});
    }
  }

  onDateChange(date) {
    let month = MONTH_NAMES[date.getUTCMonth()];
    let day = date.getUTCDate();
    let year = date.getUTCFullYear();
    let formattedDate = month + " " + day + " " + year;
    this.setState({formattedDate: formattedDate});
    this.setState({date: date});
  }

  _toggleSpinner() {
    this.setState({spinner: !this.state.spinner});
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
    if(selector === IMAGE_PICKER.CONCERT_PHOTO){
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

  onArtistTextChanged(event) {
    console.log('onArtistTextChanged');
    this.setState({ artist: event.nativeEvent.text });
    console.log(this.state.artist);
  }
  onVenueTextChanged(event) {
    console.log('onVenueTextChanged');
    this.setState({ venue: event.nativeEvent.text });
    console.log(this.state.venue);
  }
  onLocationTextChanged(event) {
    console.log('onLocationTextChanged');
    this.setState({ location: event.nativeEvent.text });
    console.log(this.state.location);
  }
  onNotesTextChanged(event) {
    console.log('onShowNotesTextChanged');
    this.setState({ showNotes: event.nativeEvent.text });
    console.log(this.state.showNotes);
  }
  updateSliderRating(val) {
    let sliderValue = val;
    this.setState({concertRatingSlider: sliderValue});
  }

  renderConcertPhoto() {
    let cameraIconBox = 
      <View style={styles.cameraInput}>
        <TouchableHighlight style={styles.buttonCamera}
          onPress={this.showConcertImagePicker} underlayColor='#333'>
          <Icon name="camera" style={styles.iconButtons} size={60} color="#808080" />
        </TouchableHighlight>
      </View>;

    let concertPhotoBox =
      <View style={styles.cameraInput}>
        <TouchableHighlight style={styles.buttonCamera}
          onPress={this.showConcertImagePicker} underlayColor='#333'>
          <Image style={styles.uploadShowPicture} source={this.state.concertPhoto} />
        </TouchableHighlight>
        </View>;
    return (this.state.isCameraIconVisible)? cameraIconBox : concertPhotoBox;
  }

  renderTicketIconPhoto() {
    let ticketIconBox =
      <View style={styles.ticketInput}>
        <TouchableHighlight style={styles.buttonTicket}
          onPress={this.showTicketImagePicker} underlayColor='#333'>
          <Icon name="ticket" style={styles.iconButtons} size={60} color="#808080" />
        </TouchableHighlight>
      </View>;

    let ticketPhotoBox =
      <View style={styles.ticketInput}>
        <TouchableHighlight style={styles.buttonCamera}
          onPress={this.showTicketImagePicker}
          underlayColor='#333'>
          <Image style={styles.uploadShowPicture} source={this.state.ticketPhoto} />
        </TouchableHighlight>
      </View>;
    return (this.state.isTicketIconVisible)? ticketIconBox : ticketPhotoBox;
  }

  renderNotesInputField() {
    return (
      <View style={styles.lastTextInputField}>
        <TextInput
          autoFocus = {false}
          editable = {true}
          maxLength = {40}
          style={styles.notesInput}
          multiline={true}
          value={this.state.notesString}
          maxLength={400}
          placeholderTextColor={'#808080'}
          onEndEditing={this.onNotesTextChanged.bind(this)}
          placeholder='Notes' />
      </View>
    );
  }

  renderRatingInputField() {
    let ratingValue = <Text style={styles.sliderInputText}> {this.state.concertRatingSlider}</Text>
    return (
      <View style={styles.textInputFields}>
        <Text style={styles.ratingInput}>Rating{ratingValue}</Text>
        <Slider style={styles.sliderInput} minimumTrackTintColor={'#50E3C2'}
          minimumValue={0} step={1} maximumValue={100} value={50}
          onValueChange={(value)=>{this.setState({concertRatingSlider: value})}}/>
      </View>
    );
  }

  renderDatePicker() {
    return (this.state.isDatePickerVisible)? 
      <View>
        <DatePickerIOS
          date={this.state.date}
          mode="date"
          onDateChange={this.onDateChange.bind(this)} />
      </View>
    : null;    
  }

  renderDateInputField() {
    return (
      <View style={styles.dateInputField}>
        <TouchableHighlight onPress={this.setDateModalVisible.bind(this)}>
          <TextInput
            editable={false}
            style={styles.dateInput}
            placeholderTextColor={'#808080'}
            value={this.state.formattedDate.toString()}
            onFocus={this.setDateModalVisible.bind(this)}
            onEndEditing={this.setDateModalVisible.bind(this)}
            placeholder={'Date'}/>
        </TouchableHighlight>
      </View>
    );
  }

  renderInputField(autoFocus, style, value, placeholder, onChange) {
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

  renderSpinner() {
    return (this.state.isActivitySpinnerVisible)?
      <ActivityIndicatorIOS
        animating={this.state.spinner}
        style={[styles.spinner]}
        size="large" />
      : null;
  }

  render() {
    const CAMERA_ROLL_VIEW = 'camera_roll_view';
    let concertPhoto = this.renderConcertPhoto();
    let ticketIconPhoto = this.renderTicketIconPhoto();

    let artistInput = this.renderInputField(true, styles.artistInput,
      this.state.artistString, 'Artist', this.onArtistTextChanged.bind(this));

    let venueInput = this.renderInputField(false, styles.venueInput,
      this.state.venueString, 'Venue', this.onVenueTextChanged.bind(this));

    let locationInput = this.renderInputField(false, styles.locationInput,
      this.state.locationString, 'Location', this.onLocationTextChanged.bind(this));

    let dateInput = this.renderDateInputField();
    let datePicker = this.renderDatePicker();
    let ratingsInput = this.renderRatingInputField();
    let notesInput = this.renderNotesInputField();
    let activitySpinner = this.renderSpinner();
  
    return (
      <ScrollView ref='scrollView' style={styles.scrollContainer}>
      <View style={styles.container}>
          {activitySpinner}
        <View style={styles.photoInputs}>
          {concertPhoto}
          {ticketIconPhoto}
        </View>
        <View style={styles.detailInput}>
          {artistInput}
          {venueInput}
          {locationInput}
          {dateInput}
          {datePicker}
          {ratingsInput}
          {notesInput}          
        </View>
      </View>
      </ScrollView>
    );
  }
}
module.exports = AddConcertPage;
