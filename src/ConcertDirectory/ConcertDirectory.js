'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Concert Directory
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
  StatusBar,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  RefreshControl
} from 'react-native';
import {ListView} from 'realm/react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import EventEmitter from 'wolfy87-eventemitter';
import Swipeout from 'react-native-swipe-out';

import ConcertDatabase from '../Utils/Database';
import ConcertDetailView from '../ConcertDetailView';
import EditConcertPage from '../EditConcertPage';
import styles from "./styles";

let rightButtonHandler = new EventEmitter();
class ConcertDirectory extends Component {

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
      refreshing: false,
      hasConcerts: false,
      dataSource: dataSource.cloneWithRows(this.getConcertData())
    };
  }

  componentDidMount() {
    // Check if there are any concerts in the database
    let concertCheck = Array.prototype.slice.call(ConcertDatabase.objects('Concert'));
    if(concertCheck.length == 0){
      this.setState({hasConcerts: false});
    } else if(concertCheck.length > 0){
      this.setState({hasConcerts: true});
    }

  }

  componentWillReceiveProps() {
    console.log('yay this runs...');
    this.setState({dataSource: this.state.dataSource.cloneWithRows(this.getConcertData())});

    let concertCheck = Array.prototype.slice.call(ConcertDatabase.objects('Concert'));

    if(concertCheck.length == 0){
      this.setState({hasConcerts: false});
    } else if(concertCheck.length >= 1){
      this.setState({
        hasConcerts: true
      });
    }
  }

  getConcertData() {
    let concertData = Array.prototype.slice.call(ConcertDatabase.objects('Concert'));
    return concertData;
  }

  refreshListView() {
    this.setState({refreshing: true});
    this.setState({dataSource: this.state.dataSource.cloneWithRows(this.getConcertData())});
    this.setState({refreshing: false});
  }

  onSearchPressed() {
    let query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  }

  onSearchTextChanged(event) {
    console.log('onSearchTextChanged');
    this.setState({ searchString: event.nativeEvent.text });
    console.log(this.state.searchString);
  }

  rowPressed(artist) {

    let artistIndex = artist;

    function indexOfId(array, id) {
      for (let i=0; i<array.length; i++) {
         if (array[i].artist==id) return i;
      }
      console.log("Artist array out of bounds");
      return -1;
    }

    artistIndex = indexOfId(this.getConcertData(), artist)

    this.props.navigator.push({
      title: "",
      translucent: false,
      component: ConcertDetailView,
      passProps: {concerts: this.getConcertData(), row: artistIndex},
      rightButtonTitle: "Edit",
      backButtonTitle: 'Back',
      onRightButtonPress: () => this.props.navigator.push({
          title: "",
          component: EditConcertPage,
          translucent: false,
          passProps: {
            concerts: this.getConcertData(), row: artistIndex
          },
          rightButtonTitle: "Save",
          onRightButtonPress: () => this.handleSaveButton(),
          passProps: {
            events: rightButtonHandler, concerts: this.getConcertData(), row: artistIndex
          }
          })

    });
  }

  renderRow(rowData) {
    // Buttons
    let swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: '#FF5050',
        underlayColor: '#282828',
        autoClose: 'true',
        onPress: function(){
          ConcertDatabase.write(() => {
            let allConcerts = ConcertDatabase.objects('Concert');
            let stringyFilter = "guid == \""+rowData.guid+"\"";
            let selectedConcert = allConcerts.filtered(stringyFilter);
            ConcertDatabase.delete(selectedConcert);
          });
        }
      }
    ]
    let concertDate = rowData.date.toString();
    return (
      // Swipeout component
      <Swipeout right={swipeoutBtns} autoClose={true} backgroundColor={'#333333'} >
      <TouchableHighlight onPress={() => this.rowPressed(rowData.artist)}
          underlayColor='#333333'>
          <View style={styles.concertRowContainer}>
            <Image style={styles.concertThumbnail} source={{ uri: rowData.concertPhoto }} />
            <View style={styles.concertTextContainer}>
              <Text style={styles.concertTextArtist} numberOfLines={1}>{rowData.artist}</Text>
              <Text style={styles.concertTextVenue} numberOfLines={1}>{rowData.venue}</Text>
              <Text style={styles.concertTextLocationAndDate} numberOfLines={1}>{rowData.location}  {concertDate}</Text>
            </View>
            <Text style={styles.concertRating}>{rowData.rating}</Text>
          </View>
      </TouchableHighlight>
      <View style={styles.separator}/>
      </Swipeout>
    );
  }

  render() {
    let spinner = this.state.isLoading ?
      ( <ActivityIndicatorIOS
          hidden='true'
          size='large'/> ) :
      ( <View/>);

    let placeholderText = (!this.state.hasConcerts)?
        <View style={styles.placeholderTextWrapper}>
          <Image style={styles.placeholderMusicNote} resizeMode={Image.resizeMode.contain} source={require('../../images/musicnote.png')} />
          <Text style={styles.placeholderText}>
            No Concerts Added Yet
          </Text>
        </View> : null;

    let concertListView = (this.state.hasConcerts)?
        <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
         : null;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {placeholderText}
        {concertListView}
        {spinner}
      </View>
    );
  }
}

module.exports = ConcertDirectory;
