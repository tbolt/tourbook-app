import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import styles from './styles';

class Loader extends Component { 
  constructor(props) {
    super(props);
    this.animating = this.props.animating || true;
    this.state = {
      animating: this.animating
    };
    this.customStyle = this.props.customStyle;
    this.message = this.props.message;
    this.size = this.props.size || styles.size;
    this.color = this.props.color || styles.color;
  }

  renderLoader() {
    let message = (this.message)? 
      <Text style={(this.customStyle)? 
        this.customStyle.message: styles.message}>{this.message}</Text>:null;
    return (
       <View style={{}}>        
        <View style={(this.customStyle)? 
          this.customStyle.loader : styles.loader }> 
          <ActivityIndicator 
            animating={this.animating}
            size={this.size}
            color={this.color} /> 
            {message}         
        </View>
      </View>
    );
  }

  render() {  
    let loader = this.renderLoader();
    return (loader);  
  }
}

export default Loader;