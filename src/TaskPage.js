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

    // address public requester;
    // address public contractor;
    // address public arbiter;

    // string public agreement;
    // string public work;

    // uint public arbitrationFee;
    // uint public contractFee;

    // bool public isRejected;

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

    // try {
    //   console.log('try')
    //   console.log(contract)
    //   console.log(contract.isRejected())
    //   console.log('after contract.isRejected()')

    //   contract.isRejected().then((reject) => {
    //     console.log(reject)
    //     // this.changeButtonState(reject)
    //   })

    //   this.setState({
    //     contract: contract,
    //   })

    //   this.getAgreement()
    //   this.getWork()
    //   this.getArbiter()
    // } catch(err) {
    //   console.log('this is not ours')
    // }
      this.getAgreement(contract)
      this.getWork(contract)
      this.getArbiter(contract)
  }

  async createWallet() {
    console.log(this.state.contract)
    let contract = this.state.contract
    let privateKey = '0x120B302F901490EBC6D412F1A0D09605A01A0E033959747DA0BB2D8E0FCE2133D'
    let url = "https://sokol.poa.network";
    let provider = new ethers.providers.JsonRpcProvider(url);
    // let wallet = new ethers.Wallet(privateKey, provider);
    // console.log(wallet)

    // let contractWithSigner = contract.connect(wallet);
    // let tx = await contractWithSigner.arbiterApprove();

    // console.log(tx.hash);
    // await tx.wait();
    // let newValue = await contract.getValue();
    // console.log(currentValue);
    // 0x0da3f0c3ae840fcb8203da799733e28dbdc16b95b698ac5e3e6bbdc758862df4
    // 0xc863868db7aab0571c52d62ef128f3de46923fbdabf5ce0176312348f12987b2

    contract.functions.arbiterApprove().then(function(value) {
      console.log(value)
    }).catch(function(error) {
      console.log(error)
    })
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
          <Text>{agreement}</Text>
          <Text>{work}</Text>
        </ScrollView>

        <View>
          <TouchableOpacity
            // onPress={() => this.props.navigation.navigate('HomePage', this.state)}
            onPress={() => this.createWallet()}
            // style={styles.card}
          >
            <Text>
              Correct
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            // onPress={() => this.props.navigation.navigate('HomePage', this.state)}
            onPress={() => this.arbiterReject()}
            // style={styles.card}
          >
            <Text>
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
    padding: 25,
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
