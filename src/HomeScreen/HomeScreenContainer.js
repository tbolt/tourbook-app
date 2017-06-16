'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Home Screen
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
  View,
  TouchableHighlight,
} from 'react-native';

import {ListView} from 'realm/react-native';
import EventEmitter from 'wolfy87-eventemitter';
import RealmManager from '../Utils/RealmManager';
import ConcertDetailScreen from '../ConcertDetailScreen';
import ConcertItem from '../ConcertItem';
import EditConcertScreen from '../EditConcertScreen';
import HomeScreen from "./HomeScreen";

let rightButtonHandler = new EventEmitter();
class HomeScreenContainer extends Component {
  handleSaveButton() {
    rightButtonHandler.emitEvent('editSaveButtonPressed');
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
      isLoading: false,
      message: '',
      hasConcerts: false,
      dataSource: dataSource.cloneWithRows([{}])
    };
    this.renderRow = this.renderRow.bind(this);
    this.updateConcertData = this.updateConcertData.bind(this);
    this.onConcertPress = this.onConcertPress.bind(this);
    this.onPhotoPress = this.onPhotoPress.bind(this);
  }

  componentDidMount() {
    this.updateConcertData();   
  }

  componentWillReceiveProps() {
    this.updateConcertData();   
  }

  updateConcertData = () => {
    let concertData = this.getConcertData();
    if(concertData && concertData.length == 0) {
      this.setState({
        hasConcerts: false,
        dataSource: this.state.dataSource.cloneWithRows(concertData)
      });
    } else {
      this.setState({
        hasConcerts: true,
        dataSource: this.state.dataSource.cloneWithRows(concertData)
      });
    }
  }

  getConcertData = () => {
    let concerts = RealmManager.getConcerts();
    return Array.prototype.slice.call(concerts);
  }

  refreshListView = () => {
    this.setState({isLoading: true});
    this.setState({dataSource: this.state.dataSource.cloneWithRows(this.getConcertData())});
    this.setState({isLoading: false});
  }

  onSearchPressed = () => {
    let query = urlForQueryAndScreen('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  }

  onSearchTextChanged = (event) => {
    console.log('onSearchTextChanged');
    this.setState({ searchString: event.nativeEvent.text });
    console.log(this.state.searchString);
  }

  onConcertPress = (artist) => {
    let artistIndex = artist;
    function indexOfId(array, id) {
      for (let i=0; i<array.length; i++) {
         if (array[i].artist==id) return i;
      }
      console.log("Artist array out of bounds");
      return -1;
    }

    artistIndex = indexOfId(this.getConcertData(), artist);
    //, row: artistIndex},
    let concerts = this.getConcertData();
    let concert = concerts[artistIndex];

    this.props.navigator.push({
      title: "",
      translucent: false,
      component: ConcertDetailScreen,
      passProps: {concert: concert},
      rightButtonTitle: "Edit",
      backButtonTitle: 'Back',
      onRightButtonPress: () => this.props.navigator.push({
        title: "",
        component: EditConcertScreen,
        translucent: false,
        passProps: {concert: concert},
        rightButtonTitle: "Save",
        onRightButtonPress: () => this.handleSaveButton(),
          passProps: {
            events: rightButtonHandler, 
            concert: concert
          }
      })
    });
  }

  onPhotoPress = () => {
   console.log("PRESSED PHOTO");
  }

  getSwipeoutButtons = (data: Object) => {
    return [{
      text: 'Delete',
      backgroundColor: '#FF5050',
      underlayColor: '#282828',
      autoClose: 'true',
      onPress: ()=> {
        RealmManager.deleteConcert(data.guid, (result) => {
          if(result.success) {
            this.updateConcertData();
          }  
        });
      }
    }];
  }

  getConcertItem = (data: Object) => {
    let swipeoutButtons = this.getSwipeoutButtons(data);
    return (
      <ConcertItem 
        data={data}
        swipeoutButtons={swipeoutButtons} 
        onConcertPress={this.onConcertPress}
        onPhotoPress={this.onPhotoPress}
      />
    );    
  }

  renderConcerts = (data: Object, hasConcerts: Boolean, renderRow: Function) => {
    return (hasConcerts) ?
      <ListView dataSource={data} renderRow={renderRow}/>:<View/>;
  }

  renderRow = (rowData: Object) => {
    let concert = this.getConcertItem(rowData);
    return (concert);
  }

  render = () => {
    let data = this.state.dataSource;
    let isLoading = this.state.isLoading;
    let hasConcerts = this.state.hasConcerts;
    let concerts = this.renderConcerts(data, hasConcerts, this.renderRow);
    return (
      <HomeScreen 
        concerts={concerts}
        hasConcerts={hasConcerts} 
        isLoading={isLoading} />
    );
  }
}

export default HomeScreenContainer;
