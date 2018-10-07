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

import { StackNavigator, createStackNavigator } from 'react-navigation'

const BlockWorkContract = require('../abi/BlockWorkContract.json');
const ethers = require('ethers');

type Props = {};
export default class HomePage extends Component<Props> {
  constructor(props) {
    super(props)

    this.state = {
      // this data needs to come in from api call
      showButton: false,
      contractAddress: '',
    }

    // Toggle the state every second
    // setInterval(() => {
    //   this.setState(previousState => {
    //     return { isShowingText: !previousState.isShowingText }
    //   })
    // }, 1000)
  }

  componentWillMount() {
    this.getContract()
  }

  getContract = () => {
    let url = "https://sokol.poa.network";
    let provider = new ethers.providers.JsonRpcProvider(url);

    // test if this works
    provider.getBlockNumber().then((blockNumber) => {
      console.log("Current block number: " + blockNumber);
    });

    // Connecting to an existing Contract
    // The Contract interface
    let abi = BlockWorkContract.abi;

    // The address from the above deployment example
    // this needs to come from 
    let contractAddress = "0x800fbeb2c082e024dc793dd21bcfab08dbb622a7";

    this.setState({
      contractAddress: contractAddress,
    })

    // We connect to the Contract using a Provider, so we will only
    // have read-only access to the Contract
    let contract = new ethers.Contract(contractAddress, abi, provider);

    console.log(contract)

    contract.isRejected().then((reject) => {
      this.changeButtonState(reject)
    })

    // if i am an arbiter
    // if my public key is on this contract
    // display begin task button

    // event listeners
    // contract.on("CreateJob", (author, oldValue, newValue, event) => {
    //   // Called when anyone changes the value

    //   console.log(author);
    //   // "0x14791697260E4c9A71f18484C9f997B308e59325"

    //   console.log(oldValue);
    //   // "Hello World"

    //   console.log(newValue);
    //   // "Ilike turtles."

    //   // See Event Emitter below for all properties on Event
    //   console.log(event.blockNumber);
    //   // 4115004

    //   // if the arbiter address is mine, listen to it
    //   // upon dispute, go to task page
    // });
  }

  changeButtonState = (reject) => {
    this.setState({
      showButton: reject,
    })
  }

  renderStartButton = () => {
    if(this.state.showButton == true) {
      return <TouchableOpacity
        onPress={() => this.props.navigation.navigate('TaskPage', this.state)}
        style={styles.button}
      >
        <Text>
          You have a job available
        </Text>
      </TouchableOpacity>
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to BlockWork!</Text>
        <Text style={styles.instructions}>To get started, enter your public key</Text>
        {this.renderStartButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {

  }
});
