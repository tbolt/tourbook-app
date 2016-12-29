'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Stats Pages
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
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  RefreshControl
} from 'react-native';

import ConcertDatabase from './Database';

import {ListView} from 'realm/react-native';

var Icon = require('react-native-vector-icons/FontAwesome');

var music = (<Icon name="music" size={30} color="#900" />);

var EventEmitter = require('wolfy87-eventemitter');
var Swipeout = require('react-native-swipeout');

var rightButtonHandler = new EventEmitter();

import RNChart from 'react-native-chart';

var SearchResults = require('./SearchResults');
var ConcertDetailView = require('./ConcertDetailView');
var EditConcertPage = require('./EditConcertPage');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#333',
    paddingTop: 15,
    marginTop: 0,
  },
  lastShowNumber: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 30,
    marginBottom: 20,
    fontSize: 100,
    color: '#fff'
  },
  lastShowText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 20,
    color: '#fff'
  },
  showHistoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 30
  },
  placeholderMusicNote: {
    width: 200,
    height: 100
  },
  pastYearGraph: {
    height: 150
  },
  topArtistGraph: {
    height: 150
  },
  chartLineGraph: {
    flex: 1,
    position: 'absolute',
    marginLeft: 15,
    marginRight: 15,
    top: 16,
    left: 4,
    bottom: 4,
    right: 16
  },
  chartBarGraph: {
    position: 'absolute',
    marginLeft: 15,
    marginRight: 15,
    top: 16,
    left: 4,
    bottom: 4,
    right: 16
  }

});

const chartDataHistory = [
    {
        name: 'LineChart',
        color: 'teal',
        lineWidth: 6,
        highlightIndices: [0,1,2,3,4,5,6,7,8,9,10,11],   // The data points at indexes 1 and 2 will be orange
        highlightColor: 'white',
        showDataPoint: true,
        dataPointRadius: 3.0,
        data: [3, 6, 2, 2, 1, 2, 4, 8, 12, 10, 3, 2],
    }
];

const chartDataArtistRank = [
    {
        name: 'BarChart',
        type: 'bar',
        color: 'teal',
        lineWidth: 6,
        highlightIndices: [0,1,2,3,4,5,6,7,8,9,10,11],   // The data points at indexes 1 and 2 will be orange
        highlightColor: 'white',
        showDataPoint: true,
        dataPointRadius: 3.0,
        data: [3, 6, 2, 2, 1, 2, 4, 8, 12, 10, 3, 2],
    }
];

const xLabels = ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'];

const artistLabels = ['String Cheese Incident','Widespread Panic','Ween','Foo Fighters','Phish','My Morning Jacket','Neil Young','Bob Dylan','Cake','Rush','Red Hot Chili Peppers','Nirvana'];


class StatsPage extends Component {

constructor(props) {
  super(props);

  this.state = {
      refreshing: false,
  };

}

componentDidMount() {

}

componentWillReceiveProps() {

}



render() {

  let spinner = this.state.isLoading ?
    ( <ActivityIndicatorIOS
        hidden='true'
        size='large'/> ) :
    ( <View/>);

  return (
    <View style={styles.container}>
      <View style={styles.placeholderTextWrapper}>
          {/*<Image style={styles.placeholderMusicNote} resizeMode={Image.resizeMode.contain} source={require('image!musicnote')} /> */}
          <Text style={styles.lastShowNumber}>8<Text style={styles.lastShowText}>days since your last concert</Text></Text>
      </View>
      <Text style={styles.showHistoryText}>Past Year</Text>
      <View style={styles.pastYearGraph}>
          <RNChart style={styles.chartLineGraph}
              chartData={chartDataHistory}
              verticalGridStep={5}
              xLabels={xLabels}
           />
      </View>
      <View style={styles.topArtistGraph}>
      <Text style={styles.showHistoryText}>Top Artists</Text>
          <RNChart style={styles.chartBarGraph}
              chartData={chartDataArtistRank}
              verticalGridStep={5}
              xLabels={artistLabels}
           />
      </View>
    </View>
  );
}
}

module.exports = StatsPage;
