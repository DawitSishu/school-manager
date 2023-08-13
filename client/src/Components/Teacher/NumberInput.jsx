import React, { useEffect, useRef } from 'react';

function NumberInput({ value, onChange }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
    };

    if (inputRef.current) {
      inputRef.current.addEventListener('keydown', handleKeyDown);
      inputRef.current.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('keydown', handleKeyDown);
        inputRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <input
      ref={inputRef}
      type="number"
      value={value}
      onChange={onChange}
      style={{
        width: '70px',
        height: '50px',
        padding: '5px',
        boxSizing: 'border-box',
        border: '1px solid #ccc',
        borderRadius: '5px',
      }}
    />
  );
}

export default NumberInput;