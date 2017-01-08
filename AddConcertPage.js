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
  StyleSheet,
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

import ConcertDatabase from './Database';

let Platform = require('react-native').Platform;
let ImagePicker = require('react-native-image-picker');

import Icon from 'react-native-vector-icons/FontAwesome';

let styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#333'
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#333'
  },
  spinner: {
    backgroundColor: "#ffffff",
  },
  photoInputs: {
    flexDirection: 'row',
    borderBottomColor: '#979797',
    borderBottomWidth: 1
  },
  cameraInput: {
    flex: 1,
  },
  ticketInput: {
    flex: 1,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center'
  },
  buttonCamera: {
    backgroundColor: '#333',
    borderRightColor: '#979797',
    borderRightWidth: 1
  },
  buttonTicket: {
    backgroundColor: '#333',
  },
  iconButtons: {
    alignSelf: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  artistInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 22,
    color: '#fff'
  },
  venueInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 22,
    borderColor: '#979797',
    color: '#fff'
  },
  locationInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 22,
    borderColor: '#979797',
    color: '#fff'
  },
  dateInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 22,
    borderColor: '#979797',
    color: '#fff'
  },
  ratingInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 22,
    borderColor: '#979797',
    color: '#808080'
  },
  notesInput: {
    height: 150,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 22,
    borderColor: '#979797',
    color: '#fff'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  detailInput: {
    flex: 1,
    flexDirection: 'column'
  },
  textInputFields: {
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#979797'
  },
  dateInputField: {
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#979797'
  },
  lastTextInputField: {
    padding: 10,
  },
  dateView: {
    alignItems: 'center'
  },
  uploadShowPicture: {
    width: 200,
    height: 100
  },
  musicNotes: {
    width: 45,
    height: 60
  },
  sliderInput: {
    height: 40
  },
  sliderInputText: {
    fontSize: 22,
    color: '#FFFFFF'
  },
  ratingMusicNotes:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10
  }
});

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
      noteOne: require('image!musicnote'),
      noteTwo: require('image!musicnote'),
      noteThree: require('image!musicnote'),
      noteFour: require('image!musicnote'),
      noteFive: require('image!musicnote'),
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

createGuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

saveConcert() {

  //Reminder of what a breakthrough this was...
  alert('Concert Added');

  // Check to see if input fields are empty
  if(this.state.artist == '' && this.state.venue == '' && this.state.location == '' && this.state.concertRatingSlider == 0 && this.state.concertPhoto == null && this.state.ticketPhoto == null && this.state.showNotes == ''){
    alert('Nothing To Save...');
  } else {
    // Write to datebase
    ConcertDatabase.write(() => {
      ConcertDatabase.create('Concert',
        {guid: this.createGuid(), // primary key
        name: this.state.artist,
        artist: this.state.artist,
        venue: this.state.venue,
        location: this.state.location,
        date: this.state.formattedDate,
        rating: this.state.concertRatingSlider,
        showNotes: this.state.showNotes,
        concertPhoto: this.state.concertPhoto.uri,
        ticketPhoto: this.state.ticketPhoto.uri} );
      //ConcertDatabase.create('Concert', [this.createGuid(), this.state.artist, this.state.artist, this.state.venue, this.state.location, this.state.formattedDate, this.state.concertRating, this.state.showNotes, this.state.concertPhoto.uri, this.state.ticketPhoto.uri]);
      console.log('successfully wrote to the database');
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

    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = monthNames[date.getUTCMonth()];
    let day = date.getUTCDate();
    let year = date.getUTCFullYear();
    let formattedDate = month + " " + day + " " + year;
    this.setState({formattedDate: formattedDate});
    this.setState({date: date});
}

onPictureAdd(image, selector) {

  if(selector === "concertPhoto"){
    this.setState({
      concertPhoto: image,
      isCameraIconVisible: false,
      isConcertPhotoVisible: true
    });
  } else if(selector === "ticketPhoto") {
    this.setState({
      ticketPhoto: image,
      isTicketIconVisible: false,
      isTicketPhotoVisible: true
    });
  }

}

_toggleSpinner() {
  this.setState({spinner: !this.state.spinner});
}

_toggleTransparent() {
  this.setState({transparent: !this.state.transparent});
}

showConcertImagePicker() {

    let options = {
      title: '', // specify null or empty string to remove the title
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
      chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
      cameraType: 'back', // 'front' or 'back'
      mediaType: 'photo', // 'photo' or 'video'
      videoQuality: 'high', // 'low', 'medium', or 'high'
      durationLimit: 10, // video recording max time in seconds
      angle: 0, // photos only
      allowsEditing: false, // Built in functionality to resize/reposition the image
      noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
      storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
        skipBackup: true, // image will NOT be backed up to icloud
        path: 'images' // will save image at /Documents/images rather than the root
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
          // Base64 Image (on iOS)
          const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
           //const source = {uri: response.uri.replace('file://', ''), isStatic: true};
          let selector = "concertPhoto";
          this.onPictureAdd(source, selector);
      }
    });
}

showTicketImagePicker() {
    let options = {
      title: '', // specify null or empty string to remove the title
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
      chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
      cameraType: 'back', // 'front' or 'back'
      mediaType: 'photo', // 'photo' or 'video'
      videoQuality: 'high', // 'low', 'medium', or 'high'
      durationLimit: 10, // video recording max time in seconds
      angle: 0, // photos only
      allowsEditing: false, // Built in functionality to resize/reposition the image
      noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
      storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
        skipBackup: true, // image will NOT be backed up to icloud
        path: 'images' // will save image at /Documents/images rather than the root
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
          // Base64 Image (on iOS)
          const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
          let selector = "ticketPhoto";
          this.onPictureAdd(source, selector);
      }
    });
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
updateRating(note) {
  console.log('updateRating running...');
   if(note == 'zeroNote') {
    this.setState({concertRating: 0});
    this.setState({noteOne: require('image!musicnote')});
    this.setState({noteTwo: require('image!musicnote')});
    this.setState({noteThree: require('image!musicnote')});
    this.setState({noteFour: require('image!musicnote')});
    this.setState({noteFive: require('image!musicnote')});
   } else if(note == 'oneNote') {
    this.setState({concertRating: 1});
    this.setState({noteOne: require('image!musicnoteSelected')});
    this.setState({noteTwo: require('image!musicnote')});
    this.setState({noteThree: require('image!musicnote')});
    this.setState({noteFour: require('image!musicnote')});
    this.setState({noteFive: require('image!musicnote')});
   } else if (note == 'twoNote') {
    this.setState({concertRating: 2});
    this.setState({noteOne: require('image!musicnoteSelected')});
    this.setState({noteTwo: require('image!musicnoteSelected')});
    this.setState({noteThree: require('image!musicnote')});
    this.setState({noteFour: require('image!musicnote')});
    this.setState({noteFive: require('image!musicnote')});
   } else if (note == 'threeNote') {
    this.setState({concertRating: 3});
    this.setState({noteOne: require('image!musicnoteSelected')});
    this.setState({noteTwo: require('image!musicnoteSelected')});
    this.setState({noteThree: require('image!musicnoteSelected')});
    this.setState({noteFour: require('image!musicnote')});
    this.setState({noteFive: require('image!musicnote')});
   } else if (note == 'fourNote') {
    this.setState({concertRating: 4});
    this.setState({noteOne: require('image!musicnoteSelected')});
    this.setState({noteTwo: require('image!musicnoteSelected')});
    this.setState({noteThree: require('image!musicnoteSelected')});
    this.setState({noteFour: require('image!musicnoteSelected')});
    this.setState({noteFive: require('image!musicnote')});
   } else if (note == 'fiveNote') {
    this.setState({concertRating: 5});
    this.setState({noteOne: require('image!musicnoteSelected')});
    this.setState({noteTwo: require('image!musicnoteSelected')});
    this.setState({noteThree: require('image!musicnoteSelected')});
    this.setState({noteFour: require('image!musicnoteSelected')});
    this.setState({noteFive: require('image!musicnoteSelected')});
   }
   console.log(this.state.concertRating);
}

render() {

    const CAMERA_ROLL_VIEW = 'camera_roll_view';

    let cameraIconBox = (this.state.isCameraIconVisible)?
          <TouchableHighlight
              onPress={this.showConcertImagePicker}
              style={styles.buttonCamera}
              underlayColor='#333'>
              <Icon name="camera" style={styles.iconButtons} size={60} color="#808080" />
          </TouchableHighlight> : null;

    let concertPhotoBox = (this.state.isConcertPhotoVisible)?
          <TouchableHighlight
                  onPress={this.showConcertImagePicker}
                  style={styles.buttonCamera}
                  underlayColor='#333'>
          <Image style={styles.uploadShowPicture} source={this.state.concertPhoto} />
          </TouchableHighlight> : null;

    let ticketIconBox = (this.state.isTicketIconVisible)?
          <TouchableHighlight
              onPress={this.showTicketImagePicker}
              style={styles.buttonTicket}
              underlayColor='#333'>
            <Icon name="ticket" style={styles.iconButtons} size={60} color="#808080" />
          </TouchableHighlight> : null;

    let ticketPhotoBox = (this.state.isTicketPhotoVisible)?
          <TouchableHighlight
                  onPress={this.showTicketImagePicker}
                  style={styles.buttonCamera}
                  underlayColor='#333'>
          <Image style={styles.uploadShowPicture} source={this.state.ticketPhoto} />
          </TouchableHighlight> : null;

    let dateInputBox = (this.state.isDatePickerVisible)?
          <View>
            <DatePickerIOS

            date={this.state.date}
            mode="date"
            onDateChange={this.onDateChange.bind(this)} />
          </View> : null;

    let activitySpinner = (this.state.isActivitySpinnerVisible)?
          <ActivityIndicatorIOS
          animating={this.state.spinner}
          style={[styles.spinner]}
          size="large" /> : null;

    return (
      <ScrollView ref='scrollView' style={styles.scrollContainer}>
      <View style={styles.container}>
          {activitySpinner}
        <View style={styles.photoInputs}>
          <View style={styles.cameraInput}>
          {cameraIconBox}
          {concertPhotoBox}
          </View>
          <View style={styles.ticketInput}>
          {ticketIconBox}
          {ticketPhotoBox}
          </View>
        </View>
        <View style={styles.detailInput}>
          <View style={styles.textInputFields}>
          <TextInput
                style={styles.artistInput}
                placeholderTextColor={'#808080'}
                value={this.state.artistString}
                onChange={this.onArtistTextChanged.bind(this)}
                placeholder='Artist'/>
          </View>
          <View style={styles.textInputFields}>
          <TextInput
                style={styles.venueInput}
                placeholderTextColor={'#808080'}
                value={this.state.venueString}
                onChange={this.onVenueTextChanged.bind(this)}
                placeholder='Venue'/>
          </View>
          <View style={styles.textInputFields}>
          <TextInput
                style={styles.locationInput}
                placeholderTextColor={'#808080'}
                value={this.state.locationString}
                onChange={this.onLocationTextChanged.bind(this)}
                placeholder='Location'/>
          </View>
          <View style={styles.dateInputField}>
          <TouchableHighlight
              onPress={this.setDateModalVisible.bind(this)}>
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
          {dateInputBox}

          <View style={styles.textInputFields}>
            <Text style={styles.ratingInput}>Rating  <Text style={styles.sliderInputText} >{this.state.concertRatingSlider}</Text></Text>
            <Slider style={styles.sliderInput} minimumTrackTintColor={'#50E3C2'} minimumValue={0} step={1} maximumValue={100} value={50} onValueChange={(value) => {this.setState({concertRatingSlider: value})}}/>

          {/* Old rating system
            <TouchableHighlight underlayColor={'#333333'} style={styles.musicNotesHighlight} onPress={() => { this.updateRating('zeroNote') }} >
            <View style={styles.ratingMusicNotes}>
              <TouchableHighlight underlayColor={'#333333'} style={styles.musicNotesHighlight} onPress={() => { this.updateRating('oneNote') }} >
                <View style={styles.musicNoteWrapper}>
                  <Image style={styles.musicNotes} source={this.state.noteOne} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor={'#333333'} style={styles.musicNotesHighlight} onPress={() => { this.updateRating('twoNote') }} >
                <View style={styles.musicNoteWrapper}>
                  <Image style={styles.musicNotes} source={this.state.noteTwo} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor={'#333333'} style={styles.musicNotesHighlight} onPress={() => { this.updateRating('threeNote') }} >
                <View style={styles.musicNoteWrapper}>
                  <Image style={styles.musicNotes} source={this.state.noteThree} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor={'#333333'} style={styles.musicNotesHighlight} onPress={() => { this.updateRating('fourNote') }} >
                <View style={styles.musicNoteWrapper}>
                  <Image style={styles.musicNotes} source={this.state.noteFour} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor={'#333333'} style={styles.musicNotesHighlight} onPress={() => { this.updateRating('fiveNote') }} >
                <View style={styles.musicNoteWrapper}>
                  <Image style={styles.musicNotes} source={this.state.noteFive} />
                </View>
              </TouchableHighlight>
            </View>
            </TouchableHighlight>
            */}
          </View>
          <View style={styles.lastTextInputField}>
           <TextInput
              autoFocus = {true}
              editable = {true}
              maxLength = {40}
              style={styles.notesInput}
              multiline={true}
              value={this.state.notesString}
              maxLength={400}
              placeholderTextColor={'#808080'}
              onEndEditing={this.onNotesTextChanged.bind(this)}
              placeholder='Notes'
            />
          </View>
        </View>
      </View>
      </ScrollView>
    );
  }
}
module.exports = AddConcertPage;
