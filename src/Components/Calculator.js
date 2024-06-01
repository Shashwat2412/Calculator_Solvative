import React, { useState, useEffect } from "react";
import "../index.css";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isOverlay, setIsOverlay] = useState(window.innerWidth < 576);

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("calculatorHistory")) || [];
    setHistory(storedHistory);

    const handleResize = () => {
      setIsOverlay(window.innerWidth < 576);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("calculatorHistory", JSON.stringify(history));
  }, [history]);

  const updateResult = (value) => {
    setResult(value);
  };

  const appendToExpression = (value) => {
    setExpression((prev) => prev + value);
    updateResult(expression + value);
  };

  const calculateResult = () => {
    try {
      const result = eval(expression); // Using eval as a last resort
      setHistory((prev) => [...prev, `${expression} = ${result}`]);
      setExpression(result.toString());
      updateResult(result.toString());
    } catch (error) {
      updateResult("Error");
      setExpression("");
    }
  };

  const clearExpression = () => {
    setExpression("");
    updateResult("0");
  };

  const clearEndExpression = () => {
    const lastOperatorIndex = Math.max(
      expression.lastIndexOf("+"),
      expression.lastIndexOf("-"),
      expression.lastIndexOf("*"),
      expression.lastIndexOf("/")
    );
    if (lastOperatorIndex !== -1) {
      setExpression(expression.slice(0, lastOperatorIndex + 1));
      updateResult(expression.slice(0, lastOperatorIndex + 1));
    } else {
      clearExpression();
    }
  };

  const backspaceExpression = () => {
    setExpression((prev) => prev.slice(0, -1));
    updateResult(expression.slice(0, -1) || "0");
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("calculatorHistory");
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">
          <span id="result">{result}</span>
        </div>
        <div className="buttons">
          <button
            className="hamburger"
            onClick={() => setShowHistory(!showHistory)}
          >
            ☰ &nbsp; &nbsp; History
          </button>
          <button className="clear" onClick={clearExpression}>
            C
          </button>
          <button className="clear-end" onClick={clearEndExpression}>
            CE
          </button>
          <button className="backspace" onClick={backspaceExpression}>
            ←
          </button>
          <button className="operator" onClick={() => appendToExpression("/")}>
            /
          </button>
          <button className="number" onClick={() => appendToExpression("7")}>
            7
          </button>
          <button className="number" onClick={() => appendToExpression("8")}>
            8
          </button>
          <button className="number" onClick={() => appendToExpression("9")}>
            9
          </button>
          <button className="operator" onClick={() => appendToExpression("*")}>
            *
          </button>
          <button className="number" onClick={() => appendToExpression("4")}>
            4
          </button>
          <button className="number" onClick={() => appendToExpression("5")}>
            5
          </button>
          <button className="number" onClick={() => appendToExpression("6")}>
            6
          </button>
          <button className="operator" onClick={() => appendToExpression("-")}>
            -
          </button>
          <button className="number" onClick={() => appendToExpression("3")}>
            3
          </button>
          <button className="number" onClick={() => appendToExpression("2")}>
            2
          </button>
          <button className="number" onClick={() => appendToExpression("1")}>
            1
          </button>

          <button className="operator" onClick={() => appendToExpression("+")}>
            +
          </button>
          <button className="decimal" onClick={() => appendToExpression(".")}>
            .
          </button>
          <button className="number" onClick={() => appendToExpression("0")}>
            0
          </button>
          <button className="equals" onClick={calculateResult}>
            =
          </button>
        </div>
      </div>
      {showHistory && (
        <div className={`history ${isOverlay ? "overlay" : ""} show`}>
          <h2>History</h2>
          <ul id="history-list">
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <button className="clear-history" onClick={clearHistory}>
            Clear History
          </button>
        </div>
      )}
    </div>
  );
};

export default Calculator;
