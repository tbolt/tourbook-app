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
  *   Tyler Bolchoz
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
import ConcertDetailPage from '../ConcertDetailPage';
import ConcertDatabase from '../Utils/Database';
import styles from "./styles";

class SearchResults extends Component {  
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({
      rowHasChanged(a, b) {
        // Always re-render items.
        return a.done !== b.done || a.text !== b.text || a.items || b.items;
      }
    });
    let concerts = this.props.concerts;
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

  rowPressed(propertyGuid) {
    let rowSelected = propertyGuid;
    console.log(rowSelected);
    this.props.navigator.push({
      title: "Details",
      component: ConcertDetailPage,
      passProps: {concerts: this.props.concerts, row: rowSelected}
    });
  }

  renderRowData(data: Object) {
    let artist = data.artist;
    let concertPhoto = data.concertPhoto;
    let location = data.location;
    let rating = data.rating;
    let venue = data.venue;
    return (
      <View>
        <View style={styles.rowContainer}>
          <Image style={styles.thumb} source={{ uri: concertPhoto }} />
          <View style={styles.textContainer}>
            <Text style={styles.price}>{artist}</Text>
            <Text style={styles.title} numberOfLines={1}>{venue}</Text>
            <Text style={styles.title} numberOfLines={1}>{location}</Text>
          </View>
          <Text style={styles.dateTemp} >{concertDate}</Text>
          <Text style={styles.ratingTemp}>{rating}</Text>
        </View>
        <View style={styles.separator}/>
      </View>
    );
  }

  renderRow(rowData, sectionID, rowID) {
    console.log(rowData);
    let artist = rowData.artist;
    let concertDate = rowData.date.toString();
    let data = this.renderRowData(rowData);
    return (
      <TouchableHighlight 
        onPress={()=>this.rowPressed(artist)}
        underlayColor='#dddddd'>
        {data}
      </TouchableHighlight>
    );
  }  

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }
}

module.exports = SearchResults;
