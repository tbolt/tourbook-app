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
  *   01/10/2017
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
import EventEmitter from 'wolfy87-eventemitter';

import ConcertDirectory from './ConcertDirectory';
import AddConcertPage from './AddConcertPage';
import SettingsPage from './SettingsPage';
import FavoritesPage from './FavoritesPage';
import StatsPage from './StatsPage';

let rightButtonHandler = new EventEmitter();

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default class tourbooknew extends Component {

  state = {
    selectedTab: 'firstTab',
  };

  handleSaveButton() {
    rightButtonHandler.emitEvent('saveButtonPressed');
  };

  render() {
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
      </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('tourbooknew', () => tourbooknew);
