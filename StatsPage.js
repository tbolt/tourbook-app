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

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    paddingTop: 15
  },
  lastShowNumber: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 100,
    color: '#ffffff'
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
    color: '#ffffff',
    marginLeft: 30
  },
  pastYearGraph: {
    flex: 1
  },
  topArtistGraph: {
    flex: 1
  }
});

const chartDataHistory = [
  {
    name: 'LineChart',
    color: 'teal',
    type: "line",
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
    type: "bar",
    color: 'teal',
    lineWidth: 6,
    highlightIndices: [0,1,2,3,4,5,6,7,8,9,10,11],   // The data points at indexes 1 and 2 will be orange
    highlightColor: 'white',
    showDataPoint: true,
    dataPointRadius: 3.0,
    data: [3, 6, 2, 2, 1, 2, 4, 8, 12, 10, 3, 2]
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

calculateLastShowDate() {
  let dates = ConcertDatabase.objects('Concert').filtered('date');
  console.log(dates[0]);
}

render() {
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={this.calculateLastShowDate}>
      <Text>show db output</Text>
      </TouchableHighlight>
      <Text style={styles.lastShowNumber}>8<Text style={styles.lastShowText}>days since your last concert</Text></Text>
      <Text style={styles.showHistoryText}>Past Year</Text>
      <View style={styles.pastYearGraph}>
      </View>
      <View style={styles.topArtistGraph}>
      <Text style={styles.showHistoryText}>Top Artists</Text>
      </View>
    </View>
  );
}
}

module.exports = StatsPage;
