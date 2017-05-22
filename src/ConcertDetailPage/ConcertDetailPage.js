'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Concert Detail Page
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
  Button,
  Image,
  View,
  Text,
  TouchableHighlight,
  Modal
} from 'react-native';

import {BlurView, VibrancyView} from 'react-native-blur';
import Lightbox from 'react-native-lightbox';

import ConcertDatabase from '../Utils/Database';
import AddConcertPage from '../AddConcertPage';
import styles from "./styles";

class ConcertDetailPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      animated: true,
      modalVisible: false,
      transparent: false,
      isNotesVisible: true
    };
  }
  componentWillMount() {
    console.log(this.state.modalVisible);
  }
  _setModalVisible(visible) {
    console.log(this.state.modalVisible);
    this.setState({modalVisible: visible});
  }
  _toggleAnimated() {
    this.setState({animated: !this.state.animated});
  }
  _toggleTransparent() {
    this.setState({transparent: !this.state.transparent});
  }
  ticketPhotoPressed() {
    alert('woah');
  }
  render() {
    let concerts= this.props.concerts;
    let index = this.props.row;

    if(concerts[index].showNotes == '') {
      this.state.isNotesVisible = false
    } else {
      this.state.isNotesVisible = true
    }

    let notes = (this.state.isNotesVisible)?
        <View style={styles.concertNotesWrapper}>
          <Text style={styles.concertNotesHeaderText}>Notes</Text>
          <Text style={styles.concertDetailShowNotes}>{concerts[index].showNotes}</Text>
        </View> : null;

    console.log(concerts[index].showNotes);
    return (
      <View style={styles.concertDetailContainer}>

        <Lightbox><Image style={styles.concertDetailImage} source={{uri: concerts[index].concertPhoto}}>
          <View style={styles.concertDetailBlurWrapper}>
          <BlurView blurType="light" style={styles.concertDetailBlurBox}>
            <Text style={styles.concertDetailArtist}>{concerts[index].artist}</Text>
          </BlurView>
          </View>
        </Image></Lightbox>
        <View style={styles.concertRatingAndTicketWrapper}>
          <View style={styles.concertDetailRatingWrapper}>
          <Text style={styles.concertDetailRating}>{concerts[index].rating}</Text>
          </View>
          <Lightbox>
            <Image style={styles.concertDetailTicketImage} source={{uri: concerts[index].ticketPhoto}}></Image>
          </Lightbox>
        </View>
        <View style={styles.concertDetailsWrapper}>
          <Text style={styles.concertDetailVenue}>{concerts[index].venue}</Text>
          <Text style={styles.concertDetailLocation}>{concerts[index].location}</Text>
          <Text style={styles.concertDetailDate}>{concerts[index].date}</Text>
        </View>
        {notes}
        {/* Hold off on the modal for now
        <Modal
          animated={this.state.animated}
          transparent={this.state.transparent}
          visible={this.state.modalVisible} >
            <View style={styles.modalContainer}>
              <TouchableHighlight
                onPress={() => this._setModalVisible(false)}
                style={styles.modalButton}>
                <Text style={styles.modalText}>Woah we gotta modal</Text>
              </TouchableHighlight>
            </View>
        </Modal>
        */}
      </View>
    );
  }
}

module.exports = ConcertDetailPage;
