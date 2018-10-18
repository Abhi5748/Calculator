import React, { Component } from "react";
class Expression extends React.Component {
  render() {
    return <div className="expressionScreen">{this.props.expression}</div>;
  }
}
export default Expression;