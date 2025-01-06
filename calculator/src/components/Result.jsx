import React, { Component } from 'react';
import '../style/result.css';
class Result extends Component {
  render() {
    const { calculatorHistory, onHistoryClick } = this.props;

    return (
      <div className="history">
        <h2>history</h2>
        <p>계산 기록</p>
        <ul>
          {calculatorHistory.length > 0 ? (
            calculatorHistory.map((record, index) => (
              <li
                key={index}
                onClick={() => onHistoryClick(record)} // 클릭 핸들러 호출
                
              >
                {record.calculation} = 
                <span className='historyResult'> {record.result}</span>
              </li>
            ))
          ) : (
            <p className='message'>계산 기록이 없습니다.</p>
          )}
        </ul>
      </div>
    );
  }
}

export default Result;
