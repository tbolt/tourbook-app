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
  *   Carrington Dennis
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

import ConcertDatabase from './src/Utils/Database';
import Icon from 'react-native-vector-icons/Entypo';
import EventEmitter from 'wolfy87-eventemitter';

import ConcertDirectory from './src/ConcertDirectory';
import AddConcertPage from './src/AddConcertPage';
import SettingsPage from './src/SettingsPage';
import FavoritesPage from './src/FavoritesPage';
import StatsPage from './src/StatsPage';
import {CONSTANT} from './src/Utils/Constants';

let rightButtonHandler = new EventEmitter();
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default class tourbooknew extends Component {
  state = {
    selectedTab: CONSTANT.HOME_TAB,
  }
  
  /****************************************************************************
  /* Actions 
  /***************************************************************************/
  onTabPress = (name: String) => {
    this.setState({
      selectedTab: name
    });
  }

  onLeftButtonPress = () => {
    this.refs.navHome.push({
      title: CONSTANT.SETTINGS,
      component: SettingsPage,
      translucent: false
    })
  }

  onRightButtonPress = () => {
    this.refs.navHome.push({
      title: "",
      component: AddConcertPage,
      rightButtonTitle: CONSTANT.SAVE,
      translucent: false,
      onRightButtonPress: () => this.handleSaveButton(),
        passProps: {
          events: rightButtonHandler
        }
    });
  }

  /****************************************************************************
  /* Helpers 
  /***************************************************************************/
  handleSaveButton = () => {
    rightButtonHandler.emitEvent('saveButtonPressed');
  }

  getHomeRoute = () => {
    let gearIcon = require('./images/gear.png');
    let addIcon = require('./images/add.png');
    return {
      backButtonTitle: CONSTANT.BACK_BUTTON_TITLE,
      navigationBarHidden: false,
      translucent: false,
      leftButtonIcon: gearIcon,
      rightButtonIcon: addIcon,
      title: CONSTANT.TITLE,
      component: ConcertDirectory,
      onLeftButtonPress: () => { this.onLeftButtonPress() },
      onRightButtonPress: () => { this.onRightButtonPress() }
    }
  }

  getFavoritesRoute = () => {
    return ({
      backButtonTitle: CONSTANT.BACK_BUTTON_TITLE,
      navigationBarHidden: false,
      translucent: false,
      title: CONSTANT.TITLE,
      component: FavoritesPage,
    });
  }

  getStatsRoute = () => {
    return ({
      backButtonTitle: CONSTANT.BACK_BUTTON_TITLE,
      navigationBarHidden: false,
      translucent: false,
      title: CONSTANT.TITLE,
      component: StatsPage
    })
  }

  getHomeTab = () => {
    // Home Page
    let selected = this.state.selectedTab === CONSTANT.HOME_TAB;
    let route = this.getHomeRoute();
    let navigator = this.renderNavigator(
      CONSTANT.HOME_NAV_REF, CONSTANT.PRIMARY_COLOR, 
      CONSTANT.SECONDARY_COLOR, CONSTANT.TERTIARY_COLOR, route);

    let tab = this.renderTabBarItem(CONSTANT.HOME_TITLE, CONSTANT.HOME_NAME, 
      CONSTANT.HOME_NAME, selected, ()=>{this.onTabPress(CONSTANT.HOME_TAB)},
      navigator);    
    return (tab);
  }

  getFavoritesTab = () => {
    // Favorites Page
    let selected = this.state.selectedTab === CONSTANT.FAVORITE_TAB;
    let route = this.getFavoritesRoute();
    let navigator = this.renderNavigator(
      CONSTANT.FAVORITES_NAV_REF, CONSTANT.PRIMARY_COLOR, 
      CONSTANT.SECONDARY_COLOR, CONSTANT.TERTIARY_COLOR, route);

    let tab = this.renderTabBarItem(CONSTANT.FAVORITES_TITLE, 
      CONSTANT.FAVORITES_NAME, CONSTANT.FAVORITES_NAME, selected, 
      ()=>{this.onTabPress(CONSTANT.FAVORITE_TAB)}, navigator);
    return (tab);
  }

  getStatsTab = () => {
    // Stats Page
    let selected = this.state.selectedTab === CONSTANT.STATS_TAB;
    let route = this.getStatsRoute();
    let navigator = this.renderNavigator(
      CONSTANT.STATS_NAV_REF, CONSTANT.PRIMARY_COLOR, 
      CONSTANT.SECONDARY_COLOR, CONSTANT.TERTIARY_COLOR, route);

    let tab = this.renderTabBarItem(CONSTANT.STATS_TITLE, 
      CONSTANT.STATS_NAME, CONSTANT.STATS_NAME, selected, 
      ()=>{this.onTabPress(CONSTANT.STATS_TAB)}, navigator);
    return (tab);
  }

  /****************************************************************************
  /* Render 
  /***************************************************************************/
  renderNavigator = (ref: String, barTintColor: String, titleTextColor: String,
    tintColor: String, route: Object) => {
    return (
      <NavigatorIOS
        style={styles.container}
        ref={ref}
        barTintColor={barTintColor}
        titleTextColor={titleTextColor}
        tintColor={tintColor}
        initialRoute={route} />
    );
  }

  renderTabBarItem = (title: String, iconName: String, selectedIconName: String,
    selected: Boolean, onPress: Function, navigation: Object) => {
    return (
      <Icon.TabBarItemIOS
        title={title}
        iconName={iconName}
        selectedIconName={selectedIconName}
        selected={selected}
        onPress={onPress}>
        {navigation}
      </Icon.TabBarItemIOS>
    );
  }

  renderTabBar = (tintColor: String, barTintColor: String, 
    translucent: Boolean) => {
    let homeTabItem = this.getHomeTab();
    let favoritesTabItem = this.getFavoritesTab();
    let statsTabItem = this.getStatsTab();
    return (
      <TabBarIOS
        tintColor={tintColor}
        barTintColor={barTintColor}
        translucent={translucent}>
        {homeTabItem}
        {favoritesTabItem}
        {statsTabItem}
      </TabBarIOS>
    );
  }

  render() {
    let tabBar = this.renderTabBar(CONSTANT.SECONDARY_COLOR, CONSTANT.PRIMARY_COLOR, false);
    return (
      tabBar     
    );
  }
}

AppRegistry.registerComponent('tourbooknew', () => tourbooknew);