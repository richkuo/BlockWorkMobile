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

import {
  NavigationActions,
  createBottomTabNavigator,
} from 'react-navigation'

// import ContentCardCover from '../Content/ContentCardCover'
// import DummyData from '../DummyData'
// import Icon from 'react-native-vector-icons/FontAwesome'

export default class TaskPage extends Component<Props> {
  constructor(props) {
    super(props)

    this.state = {
      // this data needs to come in from api call
      // subjects: DummyData.userHomeDummyData,
    }

    // Toggle the state every second
    // setInterval(() => {
    //   this.setState(previousState => {
    //     return { isShowingText: !previousState.isShowingText }
    //   })
    // }, 1000)
  }

  // renderScrollViewContent = () => {
  //   let subjects = this.state.subjects

  //   return subjects.map((subject) => {
  //     return <View key={subject.title} style={{flex: 1,}}>
  //       <Text style={styles.title}>
  //         {subject.title.charAt(0).toUpperCase() + subject.title.slice(1)}
  //       </Text>

  //       <FlatList
  //         horizontal={true}
  //         // style={styles.list}
  //         data={subject.cards}
  //         extraData={this.state}
  //         keyExtractor={(item, index) => index.toString()}
  //         renderItem={(card) => {
  //           return <ContentCardCover
  //             key={card.index}
  //             card={card.item}
  //             // navigation={this.props.navigation}
  //           />
  //         }}
  //       />
  //     </View>
  //   })
  // }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('CheckoutHome', this.state)}
            // style={styles.card}
          >
            <Text>
              Correct
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('CheckoutHome', this.state)}
            // style={styles.card}
          >
            <Text>
              Incorrect
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'green',
  },
  title: {
    marginTop: 15,
    fontSize: 20,
    // textAlign: 'center',
    // marginBottom: 10,
    padding: 5,
  },
  list: {
    flex: 1,
    // backgroundColor: 'white',
    // padding: 15,
    // marginTop: 1,
    // flexDirection: 'row',
  },
  iconFlex: {
    flex: 1,
    fontSize: 15,
  },
  textFlex: {
    flex: 9,
    fontSize: 15,
  },
})
