import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import convertToHiragana from './convertToHiragana';

function App() {
  const [romajiInput, setRomajiInput] = useState('');
  const [hiraganaOutput, setHiraganaOutput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const hiragana = convertToHiragana(romajiInput);
    setHiraganaOutput(hiragana);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Romaji:
          <input type="text" value={romajiInput} onChange={(e) => setRomajiInput(e.target.value)} />
        </label>
        <button type="submit">Convert</button>
      </form>
      <div>{hiraganaOutput}</div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
