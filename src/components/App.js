import React, { Component } from 'react'
import logo from '../logo.png'
import './App.css'
import Web3 from 'web3'
import Meme from '../abis/Meme.json'

import { create } from 'ipfs-http-client'
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
})

const web3 = new Web3(window.web3.currentProvider)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      buffer: null,
      memeHash: 'QmQa7F2AczhDQTMKvz5uAEawDx65EZFnwW2RhA2mbHvTx9',
    }
  }
  async componentWillMount() {
    await this.loadWeb3()
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Meme.networks[networkId];
    if (networkData) {
      const abi = Meme.abi;;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      this.setState({contract})
     

      const memeHash = await contract.methods.getMemeHash().call();
      this.setState({memeHash});

    } else {
      window.alert('Smart contract is not deployed to the network');
    }
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.Web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      console.log('Etherum enabled')
    }
    if (window.Web3) {
      window.Web3 = new Web3(window.web3.currentProvider)
      console.log('Web3 enabled')
    } else {
      window.alert('Please use meta mask')
    }
  }

  captureFile = (event) => {
    event.preventDefault()
    //process file for IPFS
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onload = () => {
      this.setState({ buffer: Buffer(reader.result) })
    }

    console.log(reader)
  }

  onSubmit = async (event) => {
    event.preventDefault()
    console.log('Submitting the form...')
    const result = await ipfs.add(this.state.buffer)
    console.log('IPFS result', result.path)
    const memeHash = result.path
    this.setState({ memeHash })

    this.state.contract.methods.setMemeHash(memeHash).send({ from : this.state.account})
    .then((receipt) =>{
      this.setState({memeHash})
    });


  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.state.account}
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text nowrap d-none d-dm-none d-dm-block">
              <small className="text-white">{this.state.account}</small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`https://ipfs.infura.io/ipfs/${this.state.memeHash}`}
                    className="App-logo"
                    alt="logo"
                  />
                </a>

                <p>&nbsp;</p>
                <h2>Meme </h2>
                <form onSubmit={this.onSubmit}>
                  <input type="file" onChange={this.captureFile}></input>
                  <input type="submit"></input>
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

export default App
