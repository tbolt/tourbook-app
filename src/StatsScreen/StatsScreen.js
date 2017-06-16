'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Stats Screen
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
import styles from "./styles";
  
const StatsScreen = (props: Object) => { 
  const { chartData, chartDataHistory, chartDataArtistRank, xLabels, 
    artistLabels, onPressLastShowDate } = props;

  let databaseOutput = StatsScreen.renderDatabaseOutput(onPressLastShowDate);
  let lastTimeAtConert = StatsScreen.renderLastTimeAtConert(8);
  //let dataChart = StatsScreen.renderDataChart("line", chartData);
  //let pastYearChart = StatsScreen.renderPastYearChart("line", chartDataHistory, xLabels);
  let topArtistGraph = StatsScreen.renderTopArtistGraph("bar", chartDataArtistRank, artistLabels);
  return (
    <View style={styles.container}>
      {databaseOutput}
      {lastTimeAtConert}
      {/*dataChart*/}
      {/*pastYearChart*/}
      {topArtistGraph}
    </View>
  );
}

StatsScreen.renderTopArtistGraph = (type: String, chartData: Array, xLabels: Array) => {
  return (
    <View style={styles.topArtistGraph}>
      <Text style={styles.showHistoryText}>Top Artists</Text>
      <Chart 
        type={type}
        style={styles.chartBarGraph}
        chartData={chartData}
        verticalGridStep={5}
        xLabels={xLabels}/>
    </View>
  );
}

StatsScreen.renderDatabaseOutput = (onPress: Function) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <Text>show db output</Text>
    </TouchableHighlight>
  );
}

StatsScreen.renderLastTimeAtConert = (daysSinceLastConcert: Number) => {
  let daysSinceText = <Text style={styles.lastShowText}>days since your last concert</Text>;
  let daysSinceData = <Text style={styles.lastShowNumber}>{daysSinceLastConcert}{daysSinceText}</Text>;
  return (
    daysSinceData
  );
}

StatsScreen.renderDataChart = (type: String, data: Object) => {
  return (
    <Chart
      type={type}
      style={styles.chart}
      data={data}
      verticalGridStep={5}
      showDataPoint={true}/>
      //color={['#e1cd00']} TODO: AN ERROR CAME UP WITH THIS BEING AN INVALID PROP 
  );
}

StatsScreen.renderPastYearChart = (type: String, chartData: Array, xLabels: Array) => {
  return (
    <View style={styles.pastYearGraph}>
      <Chart 
        type={type}
        style={styles.chartLineGraph}
        chartData={chartData}
        verticalGridStep={5}
        xLabels={xLabels}/>
    </View>
  );
}

export default StatsScreen;

