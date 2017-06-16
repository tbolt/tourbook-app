'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Home Screen
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
import styles from "./styles";
import ConcertItem from "./ConcertItem";
class ConcertItemContainer extends Component { 
  constructor(props) {
    super(props);
    this.state = {}
  } 

  render() {
    const {
      data, 
      swipeoutButtons,
      onConcertPress,
      onPhotoPress
    } = this.props;

    return (
      <ConcertItem  
        data={data}
        swipeoutButtons={swipeoutButtons}
        onConcertPress={onConcertPress}
        onPhotoPress={onPhotoPress}/>
      );
  }
}
export default ConcertItemContainer;
