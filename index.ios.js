"use strict";

import React, { Component } from "react";
import { AppRegistry } from "react-native";

import TabBarNavigation from "./src/TabBarNavigation";
export default class tourbooknew extends Component {
  state = {};
  render() {
    return <TabBarNavigation />;
  }
}

AppRegistry.registerComponent("tourbooknew", () => tourbooknew);
