import React, { Component } from 'react'
import logo from '../logo.png'
import './App.css'

import { create } from 'ipfs-http-client';
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001, 
  protocol: 'https'
});


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buffer: null,
      memeHash:"QmQa7F2AczhDQTMKvz5uAEawDx65EZFnwW2RhA2mbHvTx9",
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
    event.preventDefault();
    console.log("Submitting the form...");
    const result  =await ipfs.add(this.state.buffer); 
    console.log('IPFS result', result.path);
    const memeHash = result.path;
    this.setState({memeHash}); 
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
            Meme of the day
          </a>
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
                  <img src={`https://ipfs.infura.io/ipfs/${this.state.memeHash}`} className="App-logo" alt="logo" />
                </a>
             
                <a
                  className="App-link"
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                 
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
