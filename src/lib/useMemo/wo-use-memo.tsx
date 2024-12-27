import {useState, useMemo} from "react";

// If I use AppNoMemo, after the initial loading, when I increment the counter, it will always recalculate the entire function, even though
// value has not been changed. This is undesired variable, as the functino does not depend on the value of counter and should not be affected by the counter's value


export function AppNoMemo() {

  const [value, setValue] = useState<string>('40');
  const [counter, setCounter] = useState<number>(0);

  const result = useMemo(  () => {
    const numValue = Number.parseInt(value);
    if (Number.isNaN(numValue))  return;
    const result = fib(numValue);
    return result;
  }, [value]);

  // const result = (() => {
  //   const numValue = Number.parseInt(value);
  //   if (Number.isNaN(numValue))  return;
  //   const result = fib(numValue);
  //   return result;
  // })();

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
