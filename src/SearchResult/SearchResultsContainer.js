'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Search Results Example
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
  Image,
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import { ListView } from 'realm/react-native';
import ConcertDetailScreen from '../ConcertDetailScreen';
import Concert from '../Utils/Concert';
import styles from "./styles";

class SearchResultsContainer extends Component {  
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({
      rowHasChanged(a, b) {
        // Always re-render items.
        return a.done !== b.done || a.text !== b.text || a.items || b.items;
      }
    });
    let concerts = this.props.concerts || [{}];
    this.state = {
      dataSource: dataSource.cloneWithRows(concerts)
    };
  }

  componentWillMount() {}

  updateDataSource(props=this.props) {
    this.setState({
      dataSource: this._cloneDataSource(this.state.dataSource, props),
    });
  }

  rowPressed(rowSelected) {
    let concert = this.props.concerts[rowSelected];
    this.props.navigator.push({
      title: "Details",
      component: ConcertDetailScreen,
      passProps: {concert: concert}
    });
  }

  render() {
    return (
      <SearchResults data={this.state.dataSource}/>
    );
  }
}

export default SearchResultsContainer;
