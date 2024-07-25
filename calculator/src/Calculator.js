import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Calculator.css';

const Calculator = () => {
    const [result, setResult] = useState('');
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/logs');
            setLogs(response.data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    const insertValue = (value) => {
        setResult(result + value);
    };

    const clearResult = () => {
        setResult('');
    };

    const deleteResult = () => {
        setResult(result.slice(0, -1));
    };

    const calculate = async () => {
        if (!result) {
            alert('Expression is empty');
            return;
        }

        let isValid = true;
        let output;
        try {
            output = eval(result);
            setResult(output.toString());
        } catch (e) {
            isValid = false;
            output = null;
            setResult('error');
        }

        try {
            await axios.post('http://localhost:5000/api/logs', {
                expression: result,
                is_valid: isValid, // Use `is_valid` to match the back-end field
                output
            });
            fetchLogs();
        } catch (error) {
            console.error('Error logging expression:', error);
        }
    };

    return (
        <div className="container">
            <div className="calculator">
                <div className="display">
                    <input type="text" value={result} disabled />
                </div>
                <div className="button">
                    <button onClick={clearResult}>AC</button>
                    <button onClick={deleteResult}>DEL</button>
                    <button onClick={() => insertValue('%')}>%</button>
                    <button onClick={() => insertValue('/')}>/</button>
                    <button onClick={() => insertValue('7')}>7</button>
                    <button onClick={() => insertValue('8')}>8</button>
                    <button onClick={() => insertValue('9')}>9</button>
                    <button onClick={() => insertValue('*')}>*</button>
                    <button onClick={() => insertValue('4')}>4</button>
                    <button onClick={() => insertValue('5')}>5</button>
                    <button onClick={() => insertValue('6')}>6</button>
                    <button onClick={() => insertValue('-')}>-</button>
                    <button onClick={() => insertValue('1')}>1</button>
                    <button onClick={() => insertValue('2')}>2</button>
                    <button onClick={() => insertValue('3')}>3</button>
                    <button onClick={() => insertValue('+')}>+</button>
                    <button onClick={() => insertValue('00')}>00</button>
                    <button onClick={() => insertValue('0')}>0</button>
                    <button onClick={() => insertValue('.')}>.</button>
                    <button className="eg" onClick={calculate}>=</button>
                </div>
            </div>
            <div className="log-table-container">
                <table className="log-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Expression</th>
                            <th>Is Valid</th>
                            <th>Output</th>
                            <th>Created On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map(log => (
                            <tr key={log._id}>
                                <td>{log._id}</td>
                                <td>{log.expression}</td>
                                <td>{log.is_valid ? 'Yes' : 'No'}</td>
                                <td>{log.output}</td>
                                <td>{new Date(log.created_on).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Calculator;
