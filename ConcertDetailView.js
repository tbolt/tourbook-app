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
  *   03/05/2016
  *
*/}

import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  Image,
  View,
  Text,
  TouchableHighlight,
  Modal
} from 'react-native';

import ConcertDatabase from './Database';

const { BlurView, VibrancyView } = require('react-native-blur');

let AddConcertPage = require('./AddConcertPage');

let Lightbox = require('react-native-lightbox');

let styles = StyleSheet.create({
  concertDetailContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#333'
  },
  concertDetailImage: {
    height: 300,
    overflow: 'hidden'
  },
  concertDetailBlurWrapper: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  concertDetailBlurBox: {
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: 10,
  },
  concertDetailArtist: {
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 40,
    flexWrap: 'nowrap',
    paddingRight: 40,
    color: '#ffffff',
    fontSize: 22,
    textShadowColor: '#4f4f4f',
    textShadowRadius: 4,
    textShadowOffset: {width: 1, height: 1}
  },
  editButton: {
    marginTop: 10,
    marginRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 5,
    paddingRight: 5,
    color: '#fff',
    backgroundColor: '#333',
    borderRadius: 3,
    fontSize: 14,
    flex: 1,
    alignSelf: 'flex-end',
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#ffffff'
  },
    descriptionShowNotes: {
    fontSize: 11,
    margin: 5,
    color: '#ffffff'
  },
  modalButton: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: 140
  },
  modalContainer: {

  },
  modalInnerContainer: {

  },
  modalText: {
    color: '#fff'
  },
  concertRatingAndTicketWrapper: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: 70,
    marginTop: -40,
    marginBottom: 10
  },
  concertDetailRatingWrapper: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    color: '#50E3C2',
    width: 85,
    height: 85,
    backgroundColor: '#333333',
    borderRadius: 100,
    overflow: 'hidden',
    marginLeft: 30,
    marginRight: 120,
    marginTop: -6,
  },
  concertDetailRating: {
    fontSize: 48,
    width: 85,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#50E3C2'
  },
  concertDetailTicketImage: {
    flex: 0 ,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    borderWidth: 3,
    borderColor: '#2B2B2B',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 0},
    width: 125,
    height: 60,
    marginTop: 0,
    marginLeft: -20
  },
  concertDetailsWrapper: {
    marginLeft: 35,
  },
  concertDetailVenue: {
    color: '#ffffff',
    fontSize: 20
  },
  concertDetailLocation: {
    color: '#ffffff',
    fontSize: 16
  },
  concertDetailDate: {
    color: '#ffffff',
    fontSize: 16
  },
  concertNotesHeaderText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  concertNotesWrapper: {
    borderTopWidth: 2,
    borderTopColor: '#fff',
    marginTop: 20,
    marginLeft: 35,
    paddingTop: 20,
    color: '#ffffff'
  },
  concertDetailShowNotes: {
    marginTop: 20,
    color: '#ffffff'
  },
  lightBoxPhoto: {
    width: 1000
  }

});


class ConcertDetailView extends Component {
  constructor(props){
    super(props);
    this.state = {
      animated: true,
      modalVisible: false,
      transparent: false
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
          <Lightbox activeProps={this.state.transparent}>
            <Image style={styles.concertDetailTicketImage} source={{uri: concerts[index].ticketPhoto}}></Image>
          </Lightbox>
        </View>
        <View style={styles.concertDetailsWrapper}>
          <Text style={styles.concertDetailVenue}>{concerts[index].venue}</Text>
          <Text style={styles.concertDetailLocation}>{concerts[index].location}</Text>
          <Text style={styles.concertDetailDate}>{concerts[index].date}</Text>
        </View>
        <View style={styles.concertNotesWrapper}>
          <Text style={styles.concertNotesHeaderText}>Notes</Text>
          <Text style={styles.concertDetailShowNotes}>{concerts[index].showNotes}</Text>
        </View>
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

module.exports = ConcertDetailView;
