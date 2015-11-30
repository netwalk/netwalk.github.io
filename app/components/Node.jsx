import React, { Component } from 'react';

export default class Node extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={"Node" + (this.props.connected ? '--connected' : '')}
                onClick={this.rotate.bind(this)}>

             <div className={"Node__" + this.props.type + "--" + this.props.direction}>
               {this.props.type} (current direction: {this.props.direction})
             </div>

           </div>;
  }

  rotate() {
    this.props.onRotate(this.props.id);
  }
}

