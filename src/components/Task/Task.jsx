import React from "react";
import { useState } from "react";

function generateOperation() {
  // Генерация случайного числа в диапазоне от 1 до 10
  const operandA = Math.floor(Math.random() * 10) + 1;
  const operandB = Math.floor(Math.random() * 10) + 1;

  // Случайный выбор оператора (сложение или вычитание)
  const operators = ["+", "-"];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  // Рассчитываем результат в зависимости от оператора

  const isNegativeResult = operator === "-" && operandA - operandB < 0;
  const resultOperator = isNegativeResult ? "+" : operator;

  const operation = {
    operandA,
    operandB,
    operator: resultOperator,
    result: resultOperator === "+" ? operandA + operandB : operandA - operandB,
  };

  return operation;
}

// Пример использования функции
const generatedOperation = generateOperation();
console.log(generatedOperation);

export const Task = () => {
  const [{ operandA, operandB, operator, result }, setTask] = useState(
    generateOperation()
  );

  const [countdown, setCountdown] = useState(50);
  const [error, setError] = useState(false);
  const [errorCounter, setErrorCounter] = useState(0);

  const [decision, setDesicion] = useState(undefined);

  const handleDecisionClick = () => {
    // correct
    if (result === decision) {
      if (error) {
        setError(false);
      }
      setCountdown((prev) => prev - 1);
      setTask(() => generateOperation());
      setDesicion(undefined);
      // wrong
    } else {
      setError(true);
      setErrorCounter((prev) => prev + 1);
    }
  };

  if (countdown === 0) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "50px",
          fontWeight: "700",
          userSelect: "none",
          flexDirection: "column",
          gap: "50px",
        }}
      >
        <div>Ура! Все готово! (А ошибок было: {errorCounter})</div>
        <button
          onClick={() => {
            window.location.reload(true);
          }}
        >
          начать заново
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "150px",
        fontWeight: "700",
        userSelect: "none",
        flexDirection: "column",
        gap: "50px",
      }}
    >
      <div style={{ fontSize: "54px" }}>Осталось примеров: {countdown}</div>
      {!!errorCounter && (
        <div style={{ fontSize: "44px" }}>Всего ошибок: {errorCounter}</div>
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          {operandA}
          {operator}
          <span style={{ color: "grey" }}>{operandB}</span>=
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: "50%",
              fontSize: "50px",
              backgroundColor: "#74e374",
            }}
            onClick={() => {
              setError(false);
              setDesicion((prev) =>
                typeof prev === "undefined" || prev === 0 ? 0 : prev - 1
              );
            }}
          >
            -
          </div>
          <div style={{ color: error ? "red" : "black" }}>
            {typeof decision === "number" ? decision : "?"}
          </div>
          <div
            style={{
              width: "100px",
              height: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: "50%",
              fontSize: "50px",
              backgroundColor: "#74e374",
              userSelect: "none",
            }}
            onClick={() => {
              setError(false);
              setDesicion((prev) =>
                typeof prev === "undefined" ? 0 : prev + 1
              );
            }}
          >
            +
          </div>
        </div>
        <div
          style={{
            width: "150px",
            height: "90px",
            fontSize: "50px",
            border: "1px solid black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "12px",
            cursor: "pointer",
            borderRadius: "20px",
          }}
          onClick={handleDecisionClick}
        >
          ok
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          {new Array(operandA).fill(0).map(() => {
            return (
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "black",
                  borderRadius: "50%",
                }}
              ></div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {new Array(operandB).fill(0).map(() => {
            return (
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "grey",
                  borderRadius: "50%",
                }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
