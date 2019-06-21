import React, { Component } from 'react';
import ReactInterval from 'react-interval';
import './App.css';

class App extends Component {
  render() {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has('t')) {
      let message = 'Enter The Beholder!!!';
      if (urlParams.has('m')) {
        message = urlParams.get('m');
      }
      return (<Countdown m={message} t={parseInt(urlParams.get('t'))} />);
    } else {
      /// If it doesnt hava T
      return (
        <Timer />
<<<<<<< HEAD
=======
      
>>>>>>> added message option for timer alarm component
      )
    }
  }
}
class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: Date.now()
    }
  }
  updateTimer() {
    this.setState({
      currentTime: Date.now()
    })
  }

  render() {
    if (this.state.currentTime > this.props.t) {
      return (
<<<<<<< HEAD
        <Alarm />
=======
        <Alarm message={this.props.m} />
>>>>>>> added message option for timer alarm component
      );
    }
    else {
      return (
        <div>
          <ReactInterval
            timeout={100}
            callback={() => this.updateTimer()}
            enabled={true}
          /><h1>{(this.props.t - this.state.currentTime) / 1000}</h1>
        </div>
      );
    };
  };
};
class Alarm extends Component {
<<<<<<< HEAD
  render() {
    return (
      <h1>Enter the Beholder!!</h1>
    )
=======

  render() {
    return (
      <h1>{this.props.message}</h1>
    );
>>>>>>> added message option for timer alarm component
  }
}
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      min: 0,
      sec: 0,
<<<<<<< HEAD
      url: ''
=======
      url: '',
      inputMessage:''
>>>>>>> added message option for timer alarm component
    }
  }
  changeHandler(event) {
    this.setState({
      inputMessage: event.target.value
    })
  }
  makeUpdater(fieldName) {
    return (event) => {
      const update = {};
      update[fieldName] = event.target.value;
      this.setState(update);
    }
  }

  beginTimer() {
<<<<<<< HEAD
    const futureDate = Date.now() + ((this.state.hours * 60 * 60 * 1000) + (this.state.min * 60 * 1000) + (this.state.sec * 1000));
    this.setState({
      url: `${window.location.origin}/?t=${futureDate}`
    });
=======
    const futureDate = Date.now() + ((this.state.hours * 60 * 60 * 1000) + (this.state.min * 60 * 1000) + (this.state.sec * 1000))

    this.setState({

      url: 'http://localhost:3000/?t=' + futureDate +'&m=' + this.state.inputMessage
    })
      ;

>>>>>>> added message option for timer alarm component
  };
  render() {
    return (
      <div className="App">
        <h1>Time is of the essence</h1>
        <h4>Set your timer</h4>
        <input
          type='text'
          placeholder='Hours'
          value={this.state.hours}
          onChange={this.makeUpdater('hours')}
        />
        <input
          type='text'
          placeholder='Minutes'
          value={this.state.min}
          onChange={this.makeUpdater('min')}
        />
        <input
          type='text'
          placeholder='Seconds'
          value={this.state.sec}
          onChange={this.makeUpdater('sec')}
        />
        <div>
          <button onClick={() => this.beginTimer()}>Begin</button>
        </div>
        <div>
          <input
            type='text'
            placeholder='Message'
            onChange={(event)=>{this.changeHandler(event)}}
          />
        </div>
        <div>
          <a href={this.state.url}>{this.state.url}</a>
        </div>
      </div>
    );
  }
}

export default App;
