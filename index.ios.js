'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Main View
  *
  *   Tourbook is an app to log and track shows you have
  *   attended. You can add pictures, notes, and more details.
  *   You can also rate shows and share them to social networks.
  *
  *   Tyler Bolchoz
  *   12/28/2016
  *
*/}

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
  Image
} from 'react-native';

import ConcertDatabase from './Database';

import Icon from 'react-native-vector-icons/Entypo';

var EventEmitter = require('wolfy87-eventemitter');

var AddConcertPage = require('./AddConcertPage');
var ConcertDirectory = require('./ConcertDirectory');
var FavoritesPage = require('./FavoritesPage');
var SettingsPage = require('./SettingsPage');
var StatsPage = require('./StatsPage');

var rightButtonHandler = new EventEmitter();

export default class tourbooknew extends Component {

  state = {
    selectedTab: 'firstTab',
  };

  handleSaveButton() {
    //console.log('handleSaveButton called');
    rightButtonHandler.emitEvent('saveButtonPressed');
  }

  render() {
    <StatusBar barStyle="light-content" />
    return (
     <TabBarIOS
      tintColor={'#50E3C2'}
      barTintColor={'#282828'}
      translucent={false}>
        {/* Home Page */}
        <Icon.TabBarItemIOS
          title="Home"
          iconName="home"
          selectedIconName="home"
          selected={this.state.selectedTab === 'firstTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'firstTab'
            });
          }}>
          <NavigatorIOS
            style={styles.container}
            ref="navHome"
            barTintColor={'#282828'}
            titleTextColor={'#50E3C2'}
            tintColor={'#4A90E2'}
            initialRoute={{
              backButtonTitle: 'Back',
              navigationBarHidden: false,
              translucent: false,
              leftButtonIcon: require('./images/gear.png'),
              rightButtonIcon: require('./images/add.png'),
              title: 'Tourbook',
              component: ConcertDirectory,
              onLeftButtonPress: () => this.refs.navHome.push({
                title: "Settings",
                component: SettingsPage,
                translucent: false
                }),
              onRightButtonPress: () => this.refs.navHome.push({
                title: "",
                component: AddConcertPage,
                rightButtonTitle: 'Save',
                translucent: false,
                onRightButtonPress: () => this.handleSaveButton(),
                passProps: {
                  events: rightButtonHandler
                }
                })
          }} />
        </Icon.TabBarItemIOS>
      {/* Favorites Page */}
        <Icon.TabBarItemIOS
          title="Favorites"
          iconName="star"
          selectedIconName="star"
          selected={this.state.selectedTab === 'secondTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'secondTab'
            });
          }}>
          <NavigatorIOS
            style={styles.container}
            ref="navFavorites"
            barTintColor={'#282828'}
            titleTextColor={'#50E3C2'}
            tintColor={'#4A90E2'}
            initialRoute={{
              backButtonTitle: 'Back',
              navigationBarHidden: false,
              translucent: false,
              title: 'Tourbook',
              component: FavoritesPage,
          }} />
        </Icon.TabBarItemIOS>
      {/* Stats Page */}
        <Icon.TabBarItemIOS
          title="Stats"
          iconName="line-graph"
          selectedIconName="line-graph"
          selected={this.state.selectedTab === 'thirdTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'thirdTab'
            });
          }}>
            <NavigatorIOS
              style={styles.container}
              ref="navStats"
              barTintColor={'#282828'}
              titleTextColor={'#50E3C2'}
              tintColor={'#4A90E2'}
              initialRoute={{
                backButtonTitle: 'Back',
                navigationBarHidden: false,
                translucent: false,
                title: 'Tourbook',
                component: StatsPage
            }} />
        </Icon.TabBarItemIOS>
      {/* Settings Page
        <Icon.TabBarItemIOS
          title=""
          iconName="sound-mix"
          selectedIconName="sound-mix"
          selected={this.state.selectedTab === 'fourthTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'fourthTab'
            });
          }}>
          <NavigatorIOS
            style={styles.container}
            ref="nav"
            barTintColor={'#282828'}
            titleTextColor={'#50E3C2'}
            tintColor={'#4A90E2'}
            initialRoute={{
              backButtonTitle: 'Back',
              navigationBarHidden: false,
              translucent: false,
              rightButtonIcon: require('image!add'),
              title: 'Tourbook',
              component: SettingsPage,
              onRightButtonPress: () => this.refs.nav.push({
                    title: "",
                    component: AddConcertPage,
                    rightButtonTitle: 'Save',
                    translucent: false,
                    onRightButtonPress: () => this.handleSaveButton(),
                    passProps: {
                      events: rightButtonHandler
                    }
                    }),
          }} />
        </Icon.TabBarItemIOS> */}
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  },
  addButton: {
    color: '#4A90E2',
  },
  nav: {
    flex: 1
  },
  Main: {
    flex: 1,
    backgroundColor: 'orange',
    paddingTop: 64
  }
});

AppRegistry.registerComponent('tourbooknew', () => tourbooknew);
