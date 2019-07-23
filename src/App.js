import React from 'react';
import './clock.css';

const store = {
  player: "",
  playersFns: [],
  subscribe(playerFn) {
    this.playersFns.push(playerFn);
  },
  change() {
    this.playersFns.forEach(fn => fn());
  }
};


class Timers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 60,
      // active: false
    };

    store.subscribe(() => {
      if(store.player !== props.user){
        this.interval = setInterval(() => {
          this.setState(pastValue => ({
            time: pastValue.time - 1,
            // active: !this.state.active
          }))
        },1000)
      }
    })

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div className={this.state.active ? 'clock active' : 'clock'} onClick={this.handleClick}>
        <span className='time'>{this.state.time > 0 ? this.state.time : 'LOSE'}</span>
      </div>
    )
  }

  handleClick() {
    store.player = this.props.user;
    clearInterval(this.interval);
    store.change();
  }
}

class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Chess Clock Online</h1>
        <div className='board'>        
          <Timers user='player1' />
          <Timers user='player2' />
        </div>
      </div>
    );
  }
}

export default Clock;
