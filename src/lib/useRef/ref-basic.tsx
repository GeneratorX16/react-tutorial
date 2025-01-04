import { useState, useRef } from 'react';

// useRef can be used to create variables which donnot cause re-rendering when changed
// the analytics variables is updated, but there is no re-rendering as it is created by useRef (random value will nnot change on clicking reset analytx)
// using a normal variable will cause it to be reset on every render. The other way is to use a normal global variable, but that is inefficient as I want 
// the variable to be available locally, and it is more flexible this way

let userInteractionGlobal: number = 0;

export default function RefDemo() {
  const [count1, setCount1] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);
  const userInteraction = useRef<number>(0);

  function handleClick1() {
    setCount1(count1+1);
    userInteraction.current++;
    userInteractionGlobal++;
  }

  function handleClick2() {
    setCount2(count2+1);
    userInteraction.current++;
    userInteractionGlobal++;
  }

  function resetAnalytics() {
    userInteraction.current = 0;
  }

  function resetAnalyticsGlobal() {
    userInteractionGlobal=0;
  }

  function getAnalytics() {
    alert(`The user has clicked ${userInteraction.current} times`);
  }

  function getAnalyticsGlobal() {
    alert(`The user has clicked global ${userInteractionGlobal} times`);
  }

  return (
    <div>
      <p>{Math.floor(Math.random()*100)}</p>
      <button onClick={getAnalytics}>Get Analytics</button>
      <button onClick={getAnalyticsGlobal}>Get Analytics Globa;</button>
      <button onClick={handleClick1}>Button 1: {count1}</button>
      <button onClick={handleClick2}>Button 2: {count2}</button>
      <button onClick={resetAnalytics}>Reset Analytics</button>
      <button onClick={resetAnalyticsGlobal}>Reset Analytics Global</button>
    </div>
  )
}