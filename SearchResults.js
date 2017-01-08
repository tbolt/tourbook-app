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
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import { ListView } from 'realm/react-native';
import ConcertDatabase from './Database';

let ConcertDetailView = require('./ConcertDetailView');

let styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#333'
  },
  dateTemp: {
    fontSize: 10
  }
});

class SearchResults extends Component {

componentWillMount() {

}

constructor(props) {
    super(props);

    let dataSource = new ListView.DataSource({
        rowHasChanged(a, b) {
            // Always re-render items.
            return a.done !== b.done || a.text !== b.text || a.items || b.items;
        }
    });

    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.concerts)
    };
}

rowPressed(propertyGuid) {
  let rowSelected = propertyGuid;
  console.log(rowSelected);
  this.props.navigator.push({
    title: "Details",
    component: ConcertDetailView,
    passProps: {concerts: this.props.concerts, row: rowSelected}
  });
}

renderRow(rowData, sectionID, rowID) {
  console.log(rowData);
  //let index = rowData.map(function(e) { return e.name; }).indexOf('Tyler');
  //console.log(index);

  let concertDate = rowData.date.toString();

  return (
    <TouchableHighlight onPress={() => this.rowPressed(rowData.artist)}
        underlayColor='#dddddd'>
      <View>
        <View style={styles.rowContainer}>
          <Image style={styles.thumb} source={{ uri: rowData.concertPhoto }} />
          <View style={styles.textContainer}>
            <Text style={styles.price}>{rowData.artist}</Text>
            <Text style={styles.title}
                  numberOfLines={1}>{rowData.venue}</Text>
            <Text style={styles.title}
                  numberOfLines={1}>{rowData.location}</Text>
          </View>
          <Text style={styles.dateTemp} >{concertDate}</Text>
          <Text style={styles.ratingTemp}>{rowData.rating}</Text>
        </View>
        <View style={styles.separator}/>
      </View>
    </TouchableHighlight>
  );
}

updateDataSource(props=this.props) {
        this.setState({
            dataSource: this._cloneDataSource(this.state.dataSource, props),
        });
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
