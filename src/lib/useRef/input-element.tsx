import { useRef } from 'react';

// useRef can be used to create references to DOM element, and then you can manipulate them just like you would do for regular JS.
// when "Focus Input" is clicked, the input element is focused, a color is applied (if css exists) and the value is changed accordingly
//  same for blur

export default function RefElementDemo() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFocus(e: any) {
    inputRef.current!.focus();
    inputRef.current!.value='focused';

  }

  function handleBlur() {
    inputRef.current!.blur();
    inputRef.current!.value='blurred';
  }

  return (
    <div>
      <input 
        ref = {inputRef}
      />
      <button onClick={handleFocus}>Focus Input</button>
      <button onClick={handleBlur}>Blur Input</button>
    </div>
  )
}