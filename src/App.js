import React, { Component } from "react";
import "./App.css";
import Expression from "./components/Expression";
import Display from "./components/Display";
import Buttons from "./components/Buttons";

const isOperator = /[+-/*]/,
      endOperator = /[+-/*]$/,
      check = /([^.0-9]0)$/;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      newValue: '0',
      oldValue: '0',
      expression: ''
    }
    this.maxInput=this.maxInput.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleOperands = this.handleOperands.bind(this);
    this.handleDecimals = this.handleDecimals.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
  }
  
  maxInput(){
    this.setState({
      newValue:'Max Limit Reached',
      oldValue:this.state.newValue
    });
    setTimeout(() => this.setState({newValue: this.state.oldValue}), 1000);
  }
  
  clearDisplay(){
    this.setState({
      newValue: '0',
      oldValue: '0',
      expression: ''
    });
  }
 
  handleOperators(e){
    if (!this.state.newValue.includes("Limit")) {
      this.setState({
        newValue: e.target.value,
        evaluated: false
      });
      if (this.state.expression.includes("=")) {
        this.setState({
          expression: this.state.oldValue + e.target.value
        });
      } else {
        this.setState({
          oldValue: !isOperator.test(this.state.newValue)
            ? this.state.expression
            : this.state.oldValue,
          expression: !isOperator.test(this.state.newValue)
            ? (this.state.expression += e.target.value)
            : (this.state.oldValue += e.target.value)
        });
      }
    }
  }
  
  handleOperands(e){
      if (!this.state.newValue.includes("Limit")) {
      this.setState({
        evaluated: false
      });
      if (this.state.newValue.length > 22) {
        this.maxInput();
      } else if (this.state.evaluated === true) {
        this.setState({
          newValue: e.target.value,
          expression: e.target.value != "0" ? e.target.value : ""
        });
      } else {
        this.setState({
          newValue:
            this.state.newValue == "0" || isOperator.test(this.state.newValue)
              ? e.target.value
              : this.state.newValue + e.target.value,
          expression:
            this.state.newValue == "0" && e.target.value == "0"
              ? this.state.expression
              : /([^.0-9]0)$/.test(this.state.expression)
                ? this.state.expression.slice(0, -1) + e.target.value
                : this.state.expression + e.target.value
        });
      }
    }
  }

  handleEvaluate(){
     if (!this.state.newValue.includes("Limit")) {
      let equation = this.state.expression;
      if (endOperator.test(equation)) {
        equation = equation.slice(0, -1);
      }
      let result = Math.round(10000000000 * eval(equation)) / 10000000000;
      this.setState({
        expression: equation + "=" + result,
        oldValue: result,
        newValue: result.toString(),
        evaluated: true
      });
    }
  } 
    
  handleDecimals(){
    if (this.state.evaluated === true) {
      this.setState({
        newValue: '0.',
        expression: '0.',
        evaluated: false});
    } else if (!this.state.newValue.includes('.') &&
      !this.state.newValue.includes('Limit')) {
      this.setState({evaluated: false});
      if (this.state.newValue.length > 22) {
        this.maxInput();
      } else if (endOperator.test(this.state.expression) || 
        this.state.newValue == '0' && this.state.expression === '') {
        this.setState({
          newValue: '0.',
          expression: this.state.expression + '0.'
        });         
      } else {
        this.setState({
          newValue: this.state.expression.match(/(-?\d+\.?\d*)$/)[0] + '.',
          expression: this.state.expression + '.',
        });
      }
    }
  }
  
  render(){
    return(
      <div>
        <div className="calculator">
          <Expression expression={this.state.expression}/>
          <Display newValue={this.state.newValue}/>
          <Buttons clear={this.clearDisplay}
                   operators={this.handleOperators}
                   operands={this.handleOperands}
                   decimal={this.handleDecimals}
                   evaluate={this.handleEvaluate}
            />
        </div>
      </div>
    );
  }
}

export default App;
