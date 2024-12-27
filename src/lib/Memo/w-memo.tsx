
import {memo, useState} from "react";

//Whenever you don't want a component to render everytime, and only render when it's proprs changes, use memo to wrap the component.
//The component will only render if its props have changed, else it will not.

/*
When using <ResultDisplay />, the calculation for fib is done everytime the counter is incremented, even though the input is same.
This is because when the App renders, it renders the child components too. This leads to slow rendering as fib is a pretty slow function and you 
can see the random value changes everytime the counter is incremented
-------------------------------------------------------------------------------------------
When using <MemoResultDisplay />, the Result component is only rendered when its props change, that is value. Incrementing the counter
has no effect on the random value too. It stays the same provided the input value is not changed.
*/


export default function App() {

  const [value, setValue] = useState<string>('38');
  const [counter, setCounter] = useState<number>(0);

  return (
    <div>
      <input type="text" value={value} onChange={(e: any) => setValue(e.currentTarget.value)} />
      <button onClick={() => setCounter(counter + 1)}>{counter}</button>
      <MemoResultDisplay value={value} />
    </div>
  )
}

const MemoResultDisplay = memo(function ResultDisplay({ value }: { value: string }) {
  const result = fib(Number.parseInt(value));
  return (
    <div>
      <h1>The result is {result}</h1>
      <span>Random Value: {Math.floor(Math.random() * 1000)}</span>
    </div>

  )
})

function ResultDisplay({ value }: { value: string }) {
  const result = fib((Number.parseInt(value)));
  return (
    <div>
      <h1>The result is {result}</h1>
      <span>Random Value: {Math.floor(Math.random() * 1000)}</span>
    </div>

  )
}

function fib(n: number): number {
  if (n < 0) return 0;
  else if (n <= 1) return 1;
  else {
    return fib(n - 1) + fib(n - 2);
  }
}