import React from 'react';

const getEmptyText = inputValue =>
  inputValue ? (
    <>
      <span>Press Enter to Add </span>
      <span style={{ fontWeight: 'bold' }}>{inputValue}</span>
    </>
  ) : (
    <span role="img" aria-label="img">
      Go out and enjoy the sun 😎🍸️
    </span>
  );

export default getEmptyText;
