
import { memo, useState } from "react";


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