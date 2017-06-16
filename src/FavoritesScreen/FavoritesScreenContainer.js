'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Favorites Screen
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
import FavoritesScreen from "./FavoritesScreen";

class FavoritesScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  render() {
    return (
      <FavoritesScreen isLoading={this.state.isLoading} />
    );
  }
}

export default FavoritesScreenContainer;