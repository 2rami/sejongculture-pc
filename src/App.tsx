import React from 'react';
import Main from './components/Main';
import SmoothScroll from './components/SmoothScroll';
import './App.css';

function App() {
  return (
    <SmoothScroll>
      <div className="App">
        <Main />
      </div>
    </SmoothScroll>
  );
}

export default App;
