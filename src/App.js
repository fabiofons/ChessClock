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


class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 60,
      running: false
    };

    store.subscribe(() => {
      if(store.player !== props.user) {
        this.setState({ running:true });
        this.interval = setInterval(() => {
          this.setState(state => ({ time: state.time - 1 }));
        },1000);
      }
    })

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div className={this.state.running ? 'clock active' : 'clock'} onClick={this.handleClick}>
        <span className='time'>{this.state.time > 0 ? this.state.time : 'LOSE'}</span>
      </div>
    )
  }

  handleClick() {
    if(store.player !== this.props.user){
      store.player = this.props.user;
      this.setState({ running: false });
      clearInterval(this.interval);
      store.change();
    }
  }
}

class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Chess Clock Online</h1>
        <div className='board'>        
          <Timer user='player1' />
          <Timer user='player2' />
        </div>
      </div>
    );
  }
}

export default Clock;
