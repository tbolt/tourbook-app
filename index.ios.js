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
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
  Image
} from 'react-native';

import ConcertDatabase from './Database';

var Icon = require('react-native-vector-icons/Entypo');
var EventEmitter = require('wolfy87-eventemitter');

var AddConcertPage = require('./AddConcertPage');
var ConcertDirectory = require('./ConcertDirectory');
var FavoritesPage = require('./FavoritesPage');
var SettingsPage = require('./SettingsPage');
var StatsPage = require('./StatsPage');

export default class tourbooknew extends Component {

  state = {
    selectedTab: 'redTab',
    notifCount: 0,
    presses: 0,
  };

  render() {
    return (
     <TabBarIOS
       tintColor={'#50E3C2'}
       barTintColor={'#282828'}
      translucent={false}>
        {/* Home Page */}
        <TabBarIOS.Item
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
              leftButtonIcon: <Image source={require('./images/gear.png')} />,
              rightButtonIcon: <Image source={require('./images/add.png')} />,
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
        </TabBarIOS.Item>
      {/* Favorites Page */}
        <TabBarIOS.Item
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
        </TabBarIOS.Item>
      {/* Stats Page */}
        <TabBarIOS.Item
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
        </TabBarIOS.Item>
      {/* Settings Page
        <TabBarIOS.Item
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
        </TabBarIOS.Item> */}
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
