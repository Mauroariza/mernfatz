import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
  />
));


/*

import React, { useRef } from 'react';

function TextInputWithFocusButton() {
  // Crear una ref utilizando el hook useRef
  const inputEl = useRef(null);

  const onButtonClick = () => {
    // Cuando el botón es clickeado, enfocar el campo de entrada utilizando la ref
    inputEl.current.focus();
  };

  return (
    <>
   Asignar la ref al campo de entrada 
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

export default TextInputWithFocusButton;

*/