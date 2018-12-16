import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CustomButton = ({ onPress, children }) => (<button type="button" style={{margin: '10px'}} onClick={onPress}>{children}</button>)

const LinksStyle = {
  'display': 'flex',
  'flex-direction': 'column',
  'justify-content': 'space-evenly' 
}

class ChangeInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      urls: [],
      uri: props.url,
      error: null,
      isLoaded: false
    }
  }

  componentWillMount() {
    fetch(this.state.uri)
    .then(data => data.json())
    .then(result => {
      console.log('Data arrived for ', this.state.uri)
      let data = result.data.map(value => ({uri: value, isLoaded: false, data: null, error: null}))
      this.setState({ 
        isLoaded: true,
        urls: data
      })
    }, error => {
      console.error('Error occurred', error)
      this.setState({
        isLoaded: true,
        error
      })
    })
  }

  updateURLS = ({ data, error, index }) => {
    let urlsArray = this.state.urls.map((value, i) => {
      if (index === i) {
        value.isLoaded = true
        if (error) {
          console.log(`Setting error ${error} for url ${this.state.urls[index].uri}`)
          value.error = error
          value.data = null
        } else {
          console.log(`Setting data ${JSON.stringify(data)} for url ${this.state.urls[index].uri}`)
          value.data = data
          value.error = null
        }
      }
      return value
    })
    this.setState({
      urls: urlsArray
    })
  }

  //check MD5 hash of the file
  triggerHashCheck = ({uri, isLoaded, error}, index) => event => {
    fetch(uri)
    .then(data => data.json())
    .then(data => this.updateURLS({ data, error: null, index }), error => this.updateURLS({data: null, error, index}))
  }

  render() {
    const { error, isLoaded, urls } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div style={LinksStyle}>
          {urls.map((n, i) => {
            let FAI = null
            if (n.error) {
              FAI = <FontAwesomeIcon icon="exclamation-triangle" color="red" />
            } else if (!n.isLoaded) {
              FAI = ''  
            } else {
              FAI = <FontAwesomeIcon icon="check-circle" color="green" />
            }
            return (
              <div class="links" style={{ 'padding': '10px' }} key={i}>
                <CustomButton
                  type="button"
                  onPress={this.triggerHashCheck(n, i)}
                >
                  {`Run Test ${i + 1}`}
                </CustomButton>
                {FAI}
              </div>
            )
          })}
        </div>
      );
    }
  }
}

export default ChangeInput;