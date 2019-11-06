import React from 'react';
import './App.css';
import styled from 'styled-components';

import OnboardForm from './components/Form';

const HeadingTitle = styled.h1`
  font-size: 2rem;
`;


function App() {
  return (
    <div className="App">
      <HeadingTitle>Meet Our Team</HeadingTitle>
      <OnboardForm />
    </div>
  );
}

export default App;
