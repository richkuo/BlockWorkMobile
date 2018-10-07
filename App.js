/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StackNavigator, createStackNavigator } from 'react-navigation'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
} from 'react-native'

import Routes from './routes.js'

export default class App extends Component<Props> {
  render() {
    return <Routes />
  }
}
