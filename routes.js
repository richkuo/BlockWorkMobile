'use strict'

import React, { Component } from 'react'
import {
  AsyncStorage,
  Dimensions,
  FlatList,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native'

import {createStackNavigator} from 'react-navigation'
import HomePage from './src/HomePage'
import TaskPage from './src/TaskPage'

// import Icon from 'react-native-vector-icons/FontAwesome'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
})

const HomeStack = createStackNavigator({
  HomePage: {
    screen: HomePage,
  },
  TaskPage: {
    screen: TaskPage,
  },
}, {
  headerMode: 'none',
  // mode: 'modal',
})

export default class Routes extends Component<Props> {
  constructor(props) {
    super(props)

    this.state = {
      // this data needs to come in from api call
    }

    // Toggle the state every second
    // setInterval(() => {
    //   this.setState(previousState => {
    //     return { isShowingText: !previousState.isShowingText }
    //   })
    // }, 1000)
  }

  render() {
    return <View style={{flex: 1}}>
      <HomeStack navigation={this.props.navigation} />
    </View>
  }
}
