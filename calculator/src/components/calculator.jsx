import React, { Component } from 'react';
import '../style/calculator.css';
import Result from './Result';

class CalculatorLogic {
  constructor() {
    this.result = '';
    this.prevCal = '';
    this.message = '';
  }

  inputValue(value) {
    if (value === '←') {
      return this.backSpace();
    } else if (['+', '-', '*', '/'].includes(value)) {
      return this.operator(value);
    } else if (value === 'C') {
      return this.result = 0;
    } else {
      // 숫자 입력 처리
      if (this.result === 0) {
        return this.result = value;
      } else {
        return this.result += value;
      }
    }
  }

  backSpace() {
    if (this.result === 0) {
      return this.result = 0;
    } else if (this.result.length === 1) {
      return this.result = 0;
    } else {
      return this.result = this.result.slice(0, -1);
    }
  }

  operator(value) {

    if (['+', '-', '*', '/'].includes(this.result[this.result.length - 1])) {
      return this.result = this.result.slice(0, -1) + value;
    } else {
      return this.result += value;
    }
  }

  calculate() {
    if (this.result === '' || ['+', '-', '*', '/'].includes(this.result[this.result.length - 1])) {
      throw new Error('계산 오류');
    }
    // 0으로 나누는 연산을 처리
    if (this.result.includes('/0')) {
      throw new Error('0으로 나눌 수 없습니다.');
    }

    try {
      const result = eval(this.result);
      if (isNaN(result)) {
        throw new Error('계산 오류');
      }
      return result;
    } catch (error) {
      throw new Error('계산 오류');
    }



  }

  getResult() {
    return this.result;
  }
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 0,
      prevCal: '',
      calculatorHistory: []
    };
    this.calculatorLogic = new CalculatorLogic();
  }

  onButtonClick = (e) => {
    const value = e.target.innerText;
    this.calculatorLogic.inputValue(value);
    this.setState({ result: this.calculatorLogic.getResult(), message: this.calculatorLogic.message });
  }

  handleResult = () => {
    try {
      const result = this.calculatorLogic.calculate();
      const calculatedResult = this.calculatorLogic.calculate();
      const prevCal = this.calculatorLogic.getResult();

      const newRecord = `${prevCal} = ${calculatedResult}`;
      this.setState({
        result,
        prevCal: this.state.result,
        calculatorHistory: [...this.state.calculatorHistory, newRecord]
      });
    } catch (error) {
      this.setState({ message: "계산식 오류" });
    }
  }



  render() {
    const { result, prevCal, message, calculatorHistory } = this.state;

    return (
      <div className='wrap'>
        <div className="calculator">
          <h1><a href="/">계산기</a></h1>
          <div className="resultWrap">
            <div className='message'>{this.state.message}</div>
            <div className="prevCalcul">{prevCal}</div>
            <input className='result' type="text" name="result" value={result} readOnly />
          </div>
          <div className="buttons">
            <div className="number">
              {[1, 2, 3, "←",
                4, 5, 6, "+",
                7, 8, 9, "-",
                "C", "0", "/", "*"
              ].map((num) => (
                <button key={num} onClick={this.onButtonClick}>{num}</button>
              ))}
            </div>
            <button className='equal' onClick={this.handleResult}>=</button>
          </div>
        </div>
        <Result calculatorHistory={calculatorHistory} />
      </div>
    );
  }
}

export default Calculator;
