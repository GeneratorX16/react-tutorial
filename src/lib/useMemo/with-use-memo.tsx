
import {useState} from "react";


// If I use AppMemo, after the inital loading, incrementing the counter will not trigger the functino to run again, even though the entire AppMemo renders. This is
// beciase the result of the funciton has been cached after the initial loading. Only if I change value, will it re-caluclate, as I have kept it as ne of the dependents.

export function AppMemo() {

  const [value, setValue] = useState<string>('40');
  const [counter, setCounter] = useState<number>(0);

  const result = (() => {
    const numValue = Number.parseInt(value);
    if (Number.isNaN(numValue))  return;
    const result = fib(numValue);
    return result;
  })();

  const calculateValue = () => {
    const numValue = Number.parseInt(value);
    if (Number.isNaN(numValue))  return;
    const result = fib(numValue);
    alert(`The result for number ${value} is ${result}`);
  }

  return (
    <div>
      <input type="text" value={value} onChange={(e: any) => setValue(e.currentTarget.value)}/>
      <button onClick={calculateValue}>Calculate</button>
      <button onClick={() => setCounter(counter+1)}>{counter}</button>
      <span>Result: {result}</span>
    </div>
  )
}

function fib(n: number): number {
  if (n < 0)  return 0;
  else if (n <= 1)  return 1;
  else {
    return fib(n-1) + fib(n-2);
  }
}