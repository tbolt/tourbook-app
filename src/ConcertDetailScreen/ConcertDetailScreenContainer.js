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
  *   
  *   01/09/2017
  *
*/}

import React, { Component } from 'react';
import ConcertDetailScreen from "./ConcertDetailScreen";
class ConcertDetailScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animated: true,
      modalVisible: false,
      transparent: false,
      isNotesVisible: true
    };
  }

  componentWillMount() {
    //console.log(this.state.modalVisible);
  }

  _setModalVisible(visible) {
    //console.log(this.state.modalVisible);
    this.setState({modalVisible: visible});
  }

  _toggleAnimated() {
    this.setState({animated: !this.state.animated});
  }

  _toggleTransparent() {
    this.setState({transparent: !this.state.transparent});
  }

  onTicketPhotoPress() {
    console.log('onTicketPhotoPress');
  }

  render() {
    return (
      <ConcertDetailScreen data={this.props.concert} />
    );
  }  
}

export default ConcertDetailScreenContainer;

