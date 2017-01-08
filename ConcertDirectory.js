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
  StyleSheet,
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

import ConcertDatabase from './Database';
import Icon from 'react-native-vector-icons/FontAwesome';
import EventEmitter from 'wolfy87-eventemitter';

import ConcertDetailView from './ConcertDetailView';
import EditConcertPage from './EditConcertPage';
import Swipeout from 'react-native-swipeout';

let rightButtonHandler = new EventEmitter()

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 5,
    marginTop: 0,
    backgroundColor: '#333'
  },
  description: {
    marginBottom: 30,
    fontSize: 18,
    textAlign: 'center',
    color: '#fff'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8
  },
  searchInput: {
    height: 36,
    width: 60,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  placeholderTextWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    height: 300
  },
  placeholderText: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 20,
    color: '#656565'
  },
  placeholderMusicNote: {
    width: 200,
    height: 100
  },
  separator: {
    height: 1,
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: 'rgba(80, 227, 194, 0.5)'
  },
  concertRowContainer: {
    flexDirection: 'row',
    paddingLeft: 12.5,
    paddingTop: 10,
    justifyContent: 'flex-start',
    backgroundColor: '#333'
  },
  concertThumbnail: {
    width: 65,
    height: 65,
    marginRight: 10,
    borderRadius: 4
  },
  concertTextContainer: {
    width: 230,
    justifyContent: 'flex-start',
    flexWrap: 'nowrap'
  },
  concertTextArtist: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  concertTextVenue: {
    paddingTop: 3,
    fontSize: 15,
    color: '#ffffff'
  },
  concertTextLocationAndDate: {
    paddingTop: 3,
    fontSize: 12,
    color: '#ffffff'
  },
  concertRating: {
    color: "#50E3C2",
    fontSize: 30,
    alignSelf: 'center'
  }

});

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

  onDeletePressed() {
    alert('delete func called');
    /* Grab concert by guid and remove it from db */

    /* Refresh listview db */

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
        autoClose: 'yes',
        onPress: function(){
          ConcertDatabase.write(() => {
            let allConcerts = ConcertDatabase.objects('Concert');
            let stringyFilter = "guid == \""+rowData.guid+"\"";
            let selectedConcert = allConcerts.filtered(stringyFilter);
            ConcertDatabase.delete(selectedConcert);
            // Update list view
          });
          //this.refreshListView();
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
          <Image style={styles.placeholderMusicNote} resizeMode={Image.resizeMode.contain} source={require('image!musicnote')} />
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
