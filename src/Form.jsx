import React, { Component } from 'react'
export default class Form extends Component {
    constructor() {
        super()
        this.state = {
            value: ''
        }
    }

    handleChange = event => this.setState({ value: event.target.value })

    validURL = str => str.includes('.')

    handleSubmit = event => {
        event.preventDefault();
        let query = this.validURL(this.state.value) ? '?url=' : '?hash='
        fetch(`/api${query}${this.state.value}`)
        .then(data => data.json())
        .then(data => console.log('Data arrived ', data))
        .catch(error => console.error('Failure occurred ', error))
    }
    
    render = () => {
        return (
          <div style={{padding: '10px'}}>
            <form onSubmit={this.handleSubmit}>
                <label>
                    url:
                  <input type="text" 
                  value={this.state.value} 
                  onChange={this.handleChange}
                  placeholder="Enter a url"
                  >
                  </input> 
                </label>
                <input type="submit" value="Submit" />
            </form>
          </div>
        )
    }
}