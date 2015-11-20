import React, { Component } from 'react';

export default class Node extends Component {
  constructor(props) {
    super(props);

    this.turn = this.turn.bind(this);
  }

  render() {
    return <div className={"Node" + (this.props.connected ? '--connected' : '')} onClick={this.turn}>
      <div className={"Node__" + this.props.type + "--" + this.props.direction}>
        {this.props.type} (current direction: {this.props.direction})
      </div>
    </div>;
  }

  turn() {
    this.props.onTurn()
  }
}

