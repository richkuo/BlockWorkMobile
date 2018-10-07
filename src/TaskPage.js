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

const BlockWorkContract = require('../abi/BlockWorkContract.json');
const ethers = require('ethers');

export default class TaskPage extends Component<Props> {
  constructor(props) {
    super(props)

    this.state = {
      // contract: props.navigation.state.params.contract,
      contract: {},
      agreement: '',
      work: '',
      arbiter: '',
      contractAddress: '0x7db51ba22a144c06622b5f73ca88e115a9497910',
      // contractAddress: props.navigation.state.params.contractAddress,
    }
  }

  getContract = () => {
    let url = "https://sokol.poa.network";
    let provider = new ethers.providers.JsonRpcProvider(url);

    // Connecting to an existing Contract
    // The Contract interface
    let abi = BlockWorkContract.abi;

    // The address from the above deployment example
    // this needs to come from 
    // let contractAddress = "0xe854e3b216c4360b37934f9fe5e9fad792279243";
    // let contractAddress = this.state.contractAddress;

    let contract = new ethers.Contract(this.state.contractAddress, abi, provider);

    console.log(contract)

      this.setState({
        contract: contract,
      })

      this.getAgreement(contract)
      this.getWork(contract)
      this.getArbiter(contract)
  }

  async createWallet() {
    let contract = this.state.contract
    let privateKey = '0x20B302F901490EBC6D412F1A0D09605A01A0E033959747DA0BB2D8E0FCE2133D'
    let url = "https://sokol.poa.network";
    let provider = new ethers.providers.JsonRpcProvider(url);
    console.log('create wallet')
    console.log(ethers)
    // let wallet = new ethers.Wallet(privateKey);
    let wallet = new ethers.Wallet(privateKey, provider);
    console.log('end create wallet')
    console.log(wallet)

    let contractWithSigner = contract.connect(wallet);
    let tx = await contractWithSigner.arbiterApprove();
    // let tx = await contractWithSigner.arbiterApprove().then(function(value) {
    //   console.log(value)
    //   console.log(tx.hash);
    // });

    console.log(tx);
    console.log(tx.hash);
    await tx.wait();

    // this.props.navigation.reset('HomePage', this.state)

    const resetAction = NavigationActions.reset({
      index: 0,
    });

    // this.props.navigation.dispatch(resetAction);
    this.props.navigation.goBack();
    // let newValue = await contract.getValue();
    // console.log(currentValue);

    // contract.arbiterApprove().then(function(value) {
    //   console.log(value)
    // }).catch(function(error) {
    //   console.log(error)
    // })
  }

  componentWillMount() {
    this.getContract()
  }

  getAgreement = (contract) => {
    console.log('getAgreement')
    console.log(this.state)
    // let contract = this.state.contract

    contract.agreement().then((agreement) => {
      this.setState({
        agreement: agreement,
      })
    })
  }

  getWork = (contract) => {
    console.log('getWork')
    // let contract = this.state.contract

    contract.work().then((work) => {
      this.setState({
        work: work,
      })
    })
  }

  getArbiter = (contract) => {
    console.log('getArbiter')
    // let contract = this.state.contract

    contract.arbiter().then((arbiter) => {
      this.setState({
        arbiter: arbiter,
      })
    })
  }

  arbiterApprove = () => {
    this.state.contract.arbiterApprove().then(function(value) {
      console.log(value)
    }).catch(function(error) {
      console.log(error)
    })
  }

  arbiterReject = () => {
    this.state.contract.arbiterReject().then(function(value) {
      console.log(value)
    })
  }

  render() {
    let contract = this.state.contract
    let agreement = this.state.agreement
    let work = this.state.work

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <Text style={styles.welcome}>{agreement}</Text>

          <Text style={styles.welcome}>{work}</Text>
        </ScrollView>

        <View>
          <TouchableOpacity
            // onPress={() => this.props.navigation.navigate('HomePage', this.state)}
            onPress={() => this.createWallet()}
            style={styles.buttonCorrect}
          >
            <Text style={styles.buttonText}>
              Correct
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            // onPress={() => this.props.navigation.navigate('HomePage', this.state)}
            onPress={() => this.arbiterReject()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Incorrect
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 35,
    textAlign: 'center',
    margin: 15,
    padding: 5,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#E82424',
    margin: 10,
    padding: 15,
    borderRadius: 5,
  },
  buttonCorrect: {
    backgroundColor: 'green',
    margin: 10,
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});
