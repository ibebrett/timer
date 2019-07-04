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
        <Alarm message={this.props.m} />

      );
    }
    else {
      return (
        <div >
          <ReactInterval
            timeout={100}
            callback={() => this.updateTimer()}
            enabled={true}
          /><h1 id='countdown'>{(this.props.t - this.state.currentTime) / 1000}</h1>
        </div>
      );
    };
  };
};
class Alarm extends Component {
  componentDidMount() {
    const haha = new Audio('haha.wav');
    haha.play();
  }
  render() {
    return (
      <h1>{this.props.message}</h1>
    );

  }
}
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      min: 0,
      sec: 0,
      url: '',
      inputMessage:'Enter The Beholder!!!'

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

    const futureDate = Date.now() + ((this.state.hours * 60 * 60 * 1000) + (this.state.min * 60 * 1000) + (this.state.sec * 1000))
    this.setState({

      url: `${window.location.origin}/?t=` + futureDate +'&m=' + this.state.inputMessage
    })
      ;


  };
  render() {
    return (
      <div className="App">
        <h1>Time is of the essence</h1>
        <h2>Set your timer</h2>
        <h4>Hours</h4>
        <input
          type='text'
          placeholder='Hours'
          value={this.state.hours}
          onChange={this.makeUpdater('hours')}
        /><h4>Minutes</h4>
        <input
          type='text'
          placeholder='Minutes'
          value={this.state.min}
          onChange={this.makeUpdater('min')}
        />
        <h4>Seconds</h4>
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
