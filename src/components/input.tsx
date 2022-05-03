import React from 'react';
import './input.css';
type IntrinsicInputProps = JSX.IntrinsicElements['input'];

export const Input = React.forwardRef<HTMLInputElement, IntrinsicInputProps>(({...props}, ref) => {
  return (
    <>
      <input
        type="number"
        onKeyDown={(evt) => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()}
        ref={ref}
        id={props.id}
        {...props}
      />
    </>
  );
});
