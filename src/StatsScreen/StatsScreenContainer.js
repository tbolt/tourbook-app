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
import ConcertDatabase from '../Utils/Database';
import StatsScreen from "./StatsScreen";
import styles from "./styles";

class StatsScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };

    this.chartData = this.getChartData.bind(this);
    this.chartDataHistory = this.getChartDataHistory.bind(this);
    this.chartDataArtistRank = this.getChartDataArtistRank.bind(this);
    this.xLabels = this.getXLabels.bind(this);
    this.artistLabels = this.getArtistLabels.bind(this);
    this.onPressLastShowDate = this.onPressLastShowDate.bind(this);
  }

  componentDidMount() {}
  componentWillReceiveProps() {}

  onPressLastShowDate() {
    let dates = ConcertDatabase.objects('Concert').filtered('date');
    console.log("onPressLastShowDate", dates[0]);
  }

  getChartData() {
    // TODO: Make dynamic
    return [[
      [0, 1],
      [1, 3],
      [3, 7],
      [4, 9],
    ]];  
  }

  getChartDataHistory() {
    // TODO: Make dynamic
    return [{
      name: 'LineChart',
      color: 'teal',
      type: "line",
      lineWidth: 6,
      highlightIndices: [0,1,2,3,4,5,6,7,8,9,10,11],   // The data points at indexes 1 and 2 will be orange
      highlightColor: 'white',
      showDataPoint: true,
      dataPointRadius: 3.0,
      data: [3, 6, 2, 2, 1, 2, 4, 8, 12, 10, 3, 2],
    }];  
  }

  getChartDataArtistRank() {
    // TODO: Make dynamic
    return [{
      name: 'BarChart',
      type: "bar",
      color: 'teal',
      lineWidth: 6,
      highlightIndices: [0,1,2,3,4,5,6,7,8,9,10,11],   // The data points at indexes 1 and 2 will be orange
      highlightColor: 'white',
      showDataPoint: true,
      dataPointRadius: 3.0,
      data: [3, 6, 2, 2, 1, 2, 4, 8, 12, 10, 3, 2]
    }];  
  }

  getXLabels() {
    // TODO: Make dynamic
    return ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'];
  }

  getArtistLabels() {
    // TODO: Make dynamic
    return ['String Cheese Incident','Widespread Panic','Ween','Foo Fighters','Phish','My Morning Jacket','Neil Young','Bob Dylan','Cake','Rush','Red Hot Chili Peppers','Nirvana']; 
  }

  render() {
    let chartData = this.getChartData();
    let chartDataHistory = this.getChartDataHistory();
    let chartDataArtistRank = this.getChartDataArtistRank();
    let xLabels = this.getXLabels();
    let artistLabels = this.getArtistLabels();
    return (
      <StatsScreen 
        chartData={chartData}
        chartDataHistory={chartDataHistory}
        chartDataArtistRank={chartDataArtistRank}
        xLabels={xLabels}
        artistLabels={artistLabels}
        onPressLastShowDate={this.onPressLastShowDate} />
    );
  }
}

export default StatsScreenContainer;
