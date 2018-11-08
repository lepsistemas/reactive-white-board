import React, { Component } from 'react'

import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'

import Dashboard from './components/Dashboard'

class App extends Component {
  render() {
    return (
      <div>
        <Dashboard />
      </div>
    );
  }
}

export default App