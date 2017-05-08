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
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  RefreshControl
} from 'react-native';

import Chart from 'react-native-chart';
import ConcertDatabase from '../Utils/Database';
import styles from "./styles";
  
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

const data = [[
    [0, 1],
    [1, 3],
    [3, 7],
    [4, 9],
]];

const xLabels = ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'];
const artistLabels = ['String Cheese Incident','Widespread Panic','Ween','Foo Fighters','Phish','My Morning Jacket','Neil Young','Bob Dylan','Cake','Rush','Red Hot Chili Peppers','Nirvana'];


class StatsPage extends Component {

constructor(props) {
  super(props);
  this.state = {
    refreshing: false,
  };
}

componentDidMount() {}

componentWillReceiveProps() {}

calculateLastShowDate() {
  let dates = ConcertDatabase.objects('Concert').filtered('date');
  console.log(dates[0]);
}

renderPastYearChart() {
  return (
    <View style={styles.pastYearGraph}>
      <Chart 
        style={styles.chartLineGraph}
        chartData={chartDataHistory}
        verticalGridStep={5}
        xLabels={xLabels}/>
    </View>
  );
}

renderTopArtistGraph() {
  return (
    <View style={styles.topArtistGraph}>
      <Text style={styles.showHistoryText}>Top Artists</Text>
      <Chart 
        type="bar"
        style={styles.chartBarGraph}
        chartData={chartDataArtistRank}
        verticalGridStep={5}
        xLabels={artistLabels}/>
    </View>
  );
}

renderDataChart() {
  return (
    <Chart
      style={styles.chart}
      data={data}
      verticalGridStep={5}
      type="line"
      showDataPoint={true}/>
      //color={['#e1cd00']} TODO: AN ERROR CAME UP WITH THIS BEING AN INVALID PROP 
  );
}

renderDatabaseOutput() {
  return (
    <TouchableHighlight onPress={this.calculateLastShowDate}>
      <Text>show db output</Text>
    </TouchableHighlight>
  );
}

renderLastTimeAtConert() {
  let text = <Text style={styles.lastShowText}>days since your last concert</Text>;
  let number = <Text style={styles.lastShowNumber}>8{text}</Text>;
  return (
    <Text style={styles.lastShowNumber}>8<Text style={styles.lastShowText}>days since your last concert</Text></Text>
  );
}

render() {
  let databaseOutput = this.renderDatabaseOutput();
  let lastTimeAtConert = this.renderLastTimeAtConert();
  let dataChart = this.renderDataChart();
  let pastYearChart = this.renderPastYearChart();
  let topArtistGraph = this.renderTopArtistGraph();
  return (
    <View style={styles.container}>
      {databaseOutput}
      {lastTimeAtConert}
      {dataChart}
      {pastYearChart}
      {topArtistGraph}
    </View>
  );
}
}

module.exports = StatsPage;
