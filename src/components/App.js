import React, { Component } from 'react'
import logo from '../logo.png'
import './App.css'
import { create } from 'ipfs-http-client'


const ipfs = create('https://mainnet.infura.io/v3/5680b098f95145999b986f9fffd90444:5001') // (the default in Node.js)


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buffer: null,
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
  onSubmit = (event) => {
    event.preventDefault()
    ipfs.add(this.state.buffer, (error, result) => {
      //do stuff here
      console.log('ipfs-results',result);
      if(error){
        console.log(error);
        return;
      }
    });
   }

  // onSubmit = async (event) => {
  //   event.preventDefault()
  //   console.log("submitting..")
  //   const result = await ipfs.add(this.state.buffer)
  //   console.log("ipfs", result)
  // }

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
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h1>Dapp University Starter Kit</h1>
                <p>
                  Edit <code>src/components/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LEARN BLOCKCHAIN{' '}
                  <u>
                    <b>NOW! </b>
                  </u>
                </a>
                <p>&nbsp;</p>
                <h2>Change name </h2>
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
