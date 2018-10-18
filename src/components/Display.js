import React, { Component } from "react";
class Display extends React.Component {
  render() {
    return <div className="displayScreen" id="display">{this.props.newValue}</div>;
  }
}
export default Display;