import React, { Component } from 'react';
import pureRender from 'pure-render-decorator';

@pureRender
export default class Node extends Component {

  render() {
    return <div className={"NetwalkUI-node" + (this.props.connected ? '--connected' : '')}
                onClick={this.rotate.bind(this)}>

             {this.props.connections.map(connection => {
               return <div className={"NetwalkUI-node-" + connection + "link"}></div>;
             })}

            {this.props.type === 'computer' ? <div className="NetwalkUI-node-computer"></div> : ''}

            {this.props.type === 'server' ? <div className="NetwalkUI-node-server"></div> : ''}

           </div>;
  }

  rotate() {
    this.props.onRotate(this.props.id);
  }

}
