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
      contract: {},
      privateKey: '0x20B302F901490EBC6D412F1A0D09605A01A0E033959747DA0BB2D8E0FCE2133D',
      currentBlockNumber: '',
      latestBlock: {},
      transactionHash: '',
    }

    let url = "https://sokol.poa.network";
    let provider = new ethers.providers.JsonRpcProvider(url);

    setInterval(() => {
      // console.log('interval')

      // console.log('contractAddress: ' + this.state.contractAddress)

      if(this.state.contractAddress !== '') {
        this.getContract(this.state.contractAddress)
      } else {
        provider.getBlockNumber().then((blockNumber) => {
          // console.log(blockNumber)
          if(this.state.currentBlockNumber !== blockNumber) {
            this.setState({
              currentBlockNumber: blockNumber,
            })

            provider.getBlock(blockNumber).then((latestBlock) => {
              this.setState({
                latestBlock: latestBlock,
              })

              // console.log(latestBlock)

              if(latestBlock.transactions.length > 0) {
                // console.log('more than 1 transaction')
                // console.log(latestBlock.transactions[latestBlock.transactions.length - 1])

                this.setState({
                  transactionHash: latestBlock.transactions[latestBlock.transactions.length - 1],
                })

                // console.log('setState then this.getTransactionHash')
                this.getTransactionHash(latestBlock.transactions[latestBlock.transactions.length - 1])
              }
            })
          }
        })
      }
    }, 2000)
  }

  componentWillMount() {
  }

  getTransactionHash = (transactionHash) => {
    console.log('getTransactionHash')
    console.log(transactionHash)
    let url = "https://sokol.poa.network";
    let provider = new ethers.providers.JsonRpcProvider(url);

    provider.getTransaction(transactionHash).then((transaction) => {
      console.log('this is the transaction')
      console.log(transaction)
      if(transaction.creates !== null) {
        this.setState({
          contractAddress: transaction.creates,
        })

        this.getContract(transaction.creates)
      } else {
        console.log('transaction.creates is: ' + transaction.creates)
      }
    })
  }

  getContract = (contractAddress) => {
    let url = "https://sokol.poa.network";
    let provider = new ethers.providers.JsonRpcProvider(url);

    // Connecting to an existing Contract
    // The Contract interface
    let abi = BlockWorkContract.abi;

    // The address from the above deployment example
    // this needs to come from 
    // let contractAddress = "0xe854e3b216c4360b37934f9fe5e9fad792279243";
    // let contractAddress = this.state.contractAddress;

    let contract = new ethers.Contract(contractAddress, abi, provider);

    try {
      contract.isRejected().then((reject) => {
        this.changeButtonState(reject)
      })

      this.setState({
        contract: contract,
      })
    } catch(err) {
      console.log('this is not ours')
    }
  }

  changeButtonState = (reject) => {
    this.setState({
      showButton: reject,
    })
  }

  renderStartButton = () => {
    if(this.state.showButton !== true) {
      return <View>
        <Text style={styles.welcome}>You have a job available</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('TaskPage', this.state)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Lets go!
          </Text>
        </TouchableOpacity>
      </View>
    } else {
      return <Text style={styles.instructions}>To get started, enter your public key</Text>
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome</Text>

        <Text style={styles.welcome}>ETH San Francisco</Text>

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
    backgroundColor: 'blue',
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
