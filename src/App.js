import React, { Component } from 'react';
import Payloads from './components/Payloads'
import SearchBar from './components/SearchBar'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      payloads: [],
    }
  }

  componentDidMount() {
    this.search()
  }

  search = (query) => {
    console.log(query)
    fetch(query)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          payloads: result
        });
      },
      (error) => {
        this.setState({
          error
        });
      }
    )
  }

  generateRows = () => {
    var rows = [];
    Object.values(this.state.payloads).forEach(payload => {
        var row = [];
        Object.values(payload).forEach(entry => {
            row.push(entry)
        })
        rows.push(row)
    })
    return (rows);
  }


  render() {
    return (
      <div className="App">
          <SearchBar search={this.search}/>
          <Payloads payloads={this.state.payloads} rows={this.generateRows()}/>
      </div>
    )
  }
}

const inputStyle = {
  width: '90%',
  padding: '12px 20px',
  margin: '8px 0',
  boxSizing: 'border-box',
}

const buttonStyle = {
  width: '10%',
  padding: '12px 20px',
  height: '40px',
}

export default App;
