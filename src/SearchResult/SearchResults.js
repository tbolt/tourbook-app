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

const SearchResults = (props: Object) => { 
  const {data} = props;
  return (
    <ListView
      dataSource={data}
      renderRow={SearchResults.renderRow}/>
  );
}

SearchResults.renderRow = (rowData: Object, sectionID, rowID) => {
  console.log(rowData);
  let artist = rowData.artist;
  let data = SearchResults.renderRowData(rowData);
  return (
    <TouchableHighlight 
      onPress={()=>{}}
      underlayColor='#DDD'>
      {data}
    </TouchableHighlight>
  );
}  

// onPress={()=>this.rowPressed(artist)}

SearchResults.renderRowData = (data: Object) => {
  let artist = data.artist;
  let concertPhoto = data.concertPhoto;
  let concertDate = data.date.toString();
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
        <Text style={styles.dateTemp}>{concertDate}</Text>
        <Text style={styles.ratingTemp}>{rating}</Text>
      </View>
      <View style={styles.separator}/>
    </View>
  );
}

export default SearchResults;
