import React, { Component } from 'react';
import ReactInterval from 'react-interval';
import './App.css';

class App extends Component {
  render() {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has('t')) {
      return (<Countdown t={parseInt(urlParams.get('t'))} />);
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
        <Alarm />
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
  render() {
    return (
      <h1>Enter the Beholder!!</h1>
    )
  }
}
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      min: 0,
      sec: 0,
      url: ''
    }
  }

  makeUpdater(fieldName) {
    return (event) => {
      const update = {};
      update[fieldName] = event.target.value;
      this.setState(update);
    }
  }

  beginTimer() {
    const futureDate = Date.now() + ((this.state.hours * 60 * 60 * 1000) + (this.state.min * 60 * 1000) + (this.state.sec * 1000));
    this.setState({
      url: `${window.location.origin}/?t=${futureDate}`
    });
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
          <a href={this.state.url}>{this.state.url}</a>
        </div>
      </div>
    );
  }
}

export default App;
