import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faSpinner, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import Form from './Form';
import Tests from './Tests'
import './App.css';
library.add([faCheckCircle, faSpinner, faExclamationTriangle])

const AppStyle = {
  'display': 'flex',
  'flex-direction': 'row',
  'justify-content': 'space-evenly' 
}

class App extends Component {
  render() {
      return (
      <div className="App">
        <Form />
        <div style={AppStyle}>
          <Tests url="/api/data/clean"/>
          <Tests url="/api/data/bad"/>
        </div>
      </div>
    );
  }
}

export default App;
