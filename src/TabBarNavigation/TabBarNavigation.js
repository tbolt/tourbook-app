'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Tab Bar Navigation
  *
  *   Tourbook is an app to log and track shows you have
  *   attended. You can add pictures, notes, and more details.
  *   You can also rate shows and share them to social networks.
  *
  *   
  *   03/05/2016
  *
*/}

import React, { Component } from 'react';
import EventEmitter from 'wolfy87-eventemitter';
import HomeScreen from '../HomeScreen';
import AddConcertScreen from '../AddConcertScreen';
import SettingsScreen from '../SettingsScreen';
import FavoritesScreen from '../FavoritesScreen';
import StatsScreen from '../StatsScreen';
import {CONSTANT} from '../Utils/Constants';

import {
  TabBarIOS,
  NavigatorIOS,
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import styles from "./styles";

let rightButtonHandler = new EventEmitter();
class TabBarNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: CONSTANT.HOME_TAB,
    };

    /* Data methods */
    this.homeRoute = this.getHomeRoute.bind(this);
    this.favoritesRoute = this.getFavoritesRoute.bind(this);
    this.statsRoute = this.getStatsRoute.bind(this);
    
    /* Functional methods */
    this.onLeftButtonPress = this.onLeftButtonPress.bind(this);
    this.onRightButtonPress = this.onRightButtonPress.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.onTabPress = this.onTabPress.bind(this);
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
      component: SettingsScreen,
      translucent: false
    })
  }

  onRightButtonPress = () => {
    this.refs.navHome.push({
      title: "",
      component: AddConcertScreen,
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

  getHomeRoute = (onLeftButtonPressed: Function, onPressRightButtonPressed: Function) => {
    let gearIcon = require('../../images/gear.png');
    let addIcon = require('../../images/add.png');
    return {
      backButtonTitle: CONSTANT.BACK_BUTTON_TITLE,
      navigationBarHidden: false,
      translucent: false,
      leftButtonIcon: gearIcon,
      rightButtonIcon: addIcon,
      title: CONSTANT.TITLE,
      component: HomeScreen,
      onLeftButtonPress: () => { onLeftButtonPressed() },
      onRightButtonPress: () => { onPressRightButtonPressed() }
    }
  }

  getFavoritesRoute = () => {
    return ({
      backButtonTitle: CONSTANT.BACK_BUTTON_TITLE,
      navigationBarHidden: false,
      translucent: false,
      title: CONSTANT.TITLE,
      component: FavoritesScreen,
    });
  }

  getStatsRoute = () => {
    return ({
      backButtonTitle: CONSTANT.BACK_BUTTON_TITLE,
      navigationBarHidden: false,
      translucent: false,
      title: CONSTANT.TITLE,
      component: StatsScreen
    })
  }

  /******************************************************************************
  * Render Methods 
  ******************************************************************************/
  renderHomeNavigator = (route: Object) => {
    return this.renderNavigator(
      CONSTANT.HOME_NAV_REF, CONSTANT.PRIMARY_COLOR, 
      CONSTANT.SECONDARY_COLOR, CONSTANT.TERTIARY_COLOR, route);
  }

  renderFavoritesNavigator = (route: Object) => {
    return this.renderNavigator(
      CONSTANT.FAVORITES_NAV_REF, CONSTANT.PRIMARY_COLOR, 
      CONSTANT.SECONDARY_COLOR, CONSTANT.TERTIARY_COLOR, route);
  }

  renderStatsNavigator = (route: Object) => {
    return this.renderNavigator(
      CONSTANT.STATS_NAV_REF, CONSTANT.PRIMARY_COLOR, 
      CONSTANT.SECONDARY_COLOR, CONSTANT.TERTIARY_COLOR, route);
  }

  renderHomeTab = (route: Object, onPress: Function) => {
    let selected = this.state.selectedTab === CONSTANT.HOME_TAB;
    let navigator = this.renderHomeNavigator(route);
    let tab = this.renderTabBarItem(CONSTANT.HOME_TITLE, 
    CONSTANT.HOME_NAME, CONSTANT.HOME_NAME, selected, 
    ()=>{onPress(CONSTANT.HOME_TAB)}, navigator);
    return (tab);
  }

  renderFavoritesTab = (route: Object, onPress: Function) => {
    let selected = this.state.selectedTab === CONSTANT.FAVORITE_TAB;
    let navigator = this.renderFavoritesNavigator(route);
    let tab = this.renderTabBarItem(CONSTANT.FAVORITES_TITLE, 
    CONSTANT.FAVORITES_NAME, CONSTANT.FAVORITES_NAME, selected, 
    ()=>{onPress(CONSTANT.FAVORITE_TAB)}, navigator);
    return (tab);
  }

  renderStatsTab = (route: Object, onPress: Function) => {
    let selected = this.state.selectedTab === CONSTANT.STATS_TAB;
    let navigator = this.renderStatsNavigator(route);
    let tab = this.renderTabBarItem(CONSTANT.STATS_TITLE, 
    CONSTANT.STATS_NAME, CONSTANT.STATS_NAME, selected, 
    ()=>{onPress(CONSTANT.STATS_TAB)}, navigator);
    return (tab);
  }

  /******************************************************************************
  * Render Helpers 
  ******************************************************************************/
  renderNavigator = (ref: String, barTintColor: String, 
    titleTextColor: String, tintColor: String, route: Object) => {
    return (
      <NavigatorIOS
        ref={ref}
        style={styles.container}
        barTintColor={barTintColor}
        titleTextColor={titleTextColor}
        tintColor={tintColor}
        initialRoute={route} />
    );
  }

  renderTabBarItem = (title: String, iconName: String, 
    selectedIconName: String, selected: Boolean, onPress: Function,
    navigation: Object) => {
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

  renderTabBar = (homeTab: Object, favoritesTab: Object, 
    statsTab: Object, tintColor: String, barTintColor: String,
    translucent: Boolean) => {
    return (
      <TabBarIOS
        tintColor={tintColor}
        barTintColor={barTintColor}
        translucent={translucent}>
        {homeTab}
        {favoritesTab}
        {statsTab}
      </TabBarIOS>
    );
  }

  render() {    
    /* Routes*/
    let homeRoute = this.getHomeRoute(this.onLeftButtonPress, this.onRightButtonPress);
    let favoritesRoute = this.getFavoritesRoute();
    let statsRoute = this.getStatsRoute();   
   
    /* Tabs */
    let homeTab = this.renderHomeTab(homeRoute, this.onTabPress);
    let favoritesTab = this.renderFavoritesTab(favoritesRoute, this.onTabPress);
    let statsTab = this.renderStatsTab(statsRoute, this.onTabPress);

    /* Tab Bar */
    let tabBar = this.renderTabBar(homeTab, favoritesTab, statsTab,
      CONSTANT.SECONDARY_COLOR, CONSTANT.PRIMARY_COLOR, false);
    return (tabBar);
  }
}

module.exports = TabBarNavigation;
