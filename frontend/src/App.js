import React, { Component } from 'react'
import './App.css'
import Canvas from './components/Canvas'

class App extends Component {
  render() {
    return (
      <div>
        <Canvas fullscreen={true} />
      </div>
    );
  }
}

export default App;
